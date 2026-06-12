// ============================================================
// POST /api/talent-teams/import — importação de colaboradores
// Recebe linhas {nome, email?, cargo?, setor} e:
//   1. cria (ou reutiliza) um TalentTeam por setor
//   2. cria TalentMember no time (idempotente por time+email/nome)
//   3. com email: registra também como Employee (candidato),
//      habilitando envio de testes e a Avaliação do Líder
// Gate: assinatura PJ ativa OU admin (mesmo da Gestão de Times).
// ============================================================

import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import { hasActiveSubscription } from '@/lib/subscription/check'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prismaAny = prisma as any

interface Linha { nome?: string; email?: string; cargo?: string; setor?: string }

const MAX_LINHAS = 500

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session?.id) return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 })

  const subscriptionOk = await hasActiveSubscription(session.id)
  if (!session.isAdmin && !subscriptionOk) {
    return NextResponse.json(
      { error: 'Recurso exclusivo de assinantes. Ative o trial de 7 dias em /dashboard/assinatura.', isPremiumOnly: true },
      { status: 403 },
    )
  }

  let body: { rows?: Linha[] }
  try { body = await req.json() } catch { return NextResponse.json({ error: 'JSON inválido.' }, { status: 400 }) }

  const rows = (body.rows ?? [])
    .map((r) => ({
      nome:  (r.nome ?? '').trim().slice(0, 80),
      email: (r.email ?? '').trim().toLowerCase().slice(0, 120),
      cargo: (r.cargo ?? '').trim().slice(0, 80),
      setor: (r.setor ?? '').trim().slice(0, 80),
    }))
    .filter((r) => r.nome.length >= 2 && r.setor.length >= 2)
    .slice(0, MAX_LINHAS)

  if (rows.length === 0) {
    return NextResponse.json({ error: 'Nenhuma linha válida. Cada linha precisa de pelo menos nome e setor.' }, { status: 400 })
  }

  const companyId = session.id
  let timesCriados = 0, membrosCriados = 0, candidatosCriados = 0, ignorados = 0

  // 1. Times por setor (case insensitive, reaproveita existentes)
  const setores = [...new Set(rows.map((r) => r.setor))]
  const existentes = await prismaAny.talentTeam.findMany({
    where: { companyId },
    select: { id: true, nome: true },
  }) as Array<{ id: string; nome: string }>
  const timePorSetor = new Map<string, string>()
  for (const t of existentes) timePorSetor.set(t.nome.toLowerCase(), t.id)
  for (const setor of setores) {
    const k = setor.toLowerCase()
    if (timePorSetor.has(k)) continue
    const novo = await prismaAny.talentTeam.create({ data: { companyId, nome: setor } })
    timePorSetor.set(k, novo.id)
    timesCriados++
  }

  // 2. Membros (idempotente) + 3. Employee quando há email
  for (const r of rows) {
    const teamId = timePorSetor.get(r.setor.toLowerCase())!

    const jaExiste = await prismaAny.talentMember.findFirst({
      where: {
        teamId,
        OR: [
          ...(r.email ? [{ email: r.email }] : []),
          { nome: { equals: r.nome, mode: 'insensitive' } },
        ],
      },
      select: { id: true },
    })
    if (jaExiste) { ignorados++; continue }

    let employeeId: string | null = null
    if (r.email && r.email.includes('@')) {
      const emp = await prisma.employee.upsert({
        where:  { companyId_email: { companyId, email: r.email } },
        update: { name: r.nome },
        create: { companyId, name: r.nome, email: r.email },
      })
      // upsert nao diz se criou; conta como candidato vinculado
      employeeId = emp.id
      candidatosCriados++
    }

    await prismaAny.talentMember.create({
      data: {
        teamId,
        companyId,
        employeeId,
        nome:  r.nome,
        cargo: r.cargo || null,
        email: r.email || null,
      },
    })
    membrosCriados++
  }

  return NextResponse.json({ timesCriados, membrosCriados, candidatosCriados, ignorados }, { status: 201 })
}
