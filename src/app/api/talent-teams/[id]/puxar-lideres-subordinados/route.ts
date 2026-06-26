// ============================================================
// POST /api/talent-teams/[id]/puxar-lideres-subordinados
// Adiciona, como membros (avaliadores) da equipe atual, os líderes
// de TODAS as equipes abaixo dela no organograma (todos os níveis).
// Usado para que a diretoria/gerência seja avaliada por quem lidera
// os níveis subordinados. Idempotente por email (ou nome, se sem email).
// ============================================================

import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/session'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prismaAny = prisma as any

const norm = (s?: string | null) => (s ?? '').trim().toLowerCase()

export async function POST(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getSession()
  if (!session?.id) return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 })

  const team = await prismaAny.talentTeam.findUnique({ where: { id: params.id } })
  if (!team || team.companyId !== session.id) {
    return NextResponse.json({ error: 'Equipe não encontrada.' }, { status: 404 })
  }

  // Todas as equipes da empresa
  const todas = await prismaAny.talentTeam.findMany({
    where: { companyId: session.id },
    select: { id: true, nome: true, parentTeamId: true, liderNome: true, liderEmail: true },
  }) as Array<{ id: string; nome: string; parentTeamId: string | null; liderNome: string | null; liderEmail: string | null }>

  // Descendentes (todos os níveis) da equipe atual
  const filhosDe = new Map<string, typeof todas>()
  for (const t of todas) {
    if (t.parentTeamId) {
      const arr = filhosDe.get(t.parentTeamId) ?? []
      arr.push(t)
      filhosDe.set(t.parentTeamId, arr)
    }
  }
  const descendentes: typeof todas = []
  const visit = new Set<string>([team.id])
  const stack = [team.id]
  let guard = 0
  while (stack.length && guard++ < 1000) {
    const cur = stack.pop()!
    for (const f of filhosDe.get(cur) ?? []) {
      if (visit.has(f.id)) continue
      visit.add(f.id)
      descendentes.push(f)
      stack.push(f.id)
    }
  }

  // Membros já existentes na equipe atual (para dedupe)
  const membrosAtuais = await prismaAny.talentMember.findMany({
    where: { teamId: team.id },
    select: { email: true, nome: true },
  }) as Array<{ email: string | null; nome: string }>
  const emailsExistentes = new Set(membrosAtuais.map((m) => norm(m.email)).filter(Boolean))
  const nomesExistentes = new Set(membrosAtuais.map((m) => norm(m.nome)))
  const liderAtualEmail = norm(team.liderEmail)

  let adicionados = 0
  let jaExistiam = 0
  let semLider = 0

  for (const sub of descendentes) {
    if (!sub.liderNome || sub.liderNome.trim().length < 2) { semLider++; continue }
    const emailNorm = norm(sub.liderEmail)

    // Não adicionar o próprio líder da equipe atual como avaliador dele mesmo
    if (emailNorm && emailNorm === liderAtualEmail) { continue }

    // Dedupe: por email quando houver, senão por nome
    if (emailNorm && emailsExistentes.has(emailNorm)) { jaExistiam++; continue }
    if (!emailNorm && nomesExistentes.has(norm(sub.liderNome))) { jaExistiam++; continue }

    await prismaAny.talentMember.create({
      data: {
        teamId: team.id,
        companyId: team.companyId,
        nome: sub.liderNome.trim().slice(0, 80),
        email: sub.liderEmail ? sub.liderEmail.trim().toLowerCase().slice(0, 120) : null,
        cargo: `Líder · ${sub.nome}`.slice(0, 80),
      },
    })
    if (emailNorm) emailsExistentes.add(emailNorm)
    nomesExistentes.add(norm(sub.liderNome))
    adicionados++
  }

  return NextResponse.json({ adicionados, jaExistiam, semLider, subordinadas: descendentes.length }, { status: 201 })
}
