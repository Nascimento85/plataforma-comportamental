// ============================================================
// POST /api/talent-teams/[id]/avaliacao-lider/convites
// Cria (e envia por email) convites de avaliacao do lider para
// os membros do time que tem email. Idempotente por team+email.
// ============================================================

import { NextRequest, NextResponse } from 'next/server'
import { randomBytes } from 'crypto'
import { getSession } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import { sendAvaliacaoLiderEmail } from '@/lib/email'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prismaAny = prisma as any

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getSession()
  if (!session?.id) return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 })

  const team = await prismaAny.talentTeam.findUnique({
    where: { id: params.id },
    include: { members: true },
  })
  if (!team || team.companyId !== session.id) {
    return NextResponse.json({ error: 'Time não encontrado.' }, { status: 404 })
  }
  if (!team.liderNome) {
    return NextResponse.json({ error: 'Defina primeiro o nome do líder do time.' }, { status: 400 })
  }

  let body: { memberIds?: string[]; reenviarConviteId?: string } = {}
  try { body = await req.json() } catch { /* corpo vazio = todos os membros */ }

  // ── Reenvio de convite pendente (nao cria nada, so dispara o email de novo) ──
  if (body.reenviarConviteId) {
    const convite = await prismaAny.liderConvite.findUnique({ where: { id: body.reenviarConviteId } })
    if (!convite || convite.teamId !== team.id) {
      return NextResponse.json({ error: 'Convite não encontrado.' }, { status: 404 })
    }
    if (convite.status === 'COMPLETED') {
      return NextResponse.json({ error: 'Este convite já foi respondido.' }, { status: 410 })
    }
    const { sent, error } = await sendAvaliacaoLiderEmail({
      toEmail:   convite.email,
      nome:      convite.nome,
      liderNome: team.liderNome,
      teamNome:  team.nome,
      token:     convite.token,
    })
    if (!sent) {
      return NextResponse.json({ error: `Falha no envio: ${String(error ?? 'desconhecida').slice(0, 300)}` }, { status: 502 })
    }
    return NextResponse.json({ reenviado: true, email: convite.email }, { status: 200 })
  }

  // Resolve email de cada membro: campo proprio ou do Employee vinculado
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const alvo = (team.members as any[]).filter((m) =>
    !body.memberIds || body.memberIds.includes(m.id)
  )
  const employeeIds = alvo.map((m) => m.employeeId).filter(Boolean) as string[]
  const employees = employeeIds.length
    ? await prisma.employee.findMany({ where: { id: { in: employeeIds } }, select: { id: true, email: true } })
    : []
  const emailDoEmployee = new Map(employees.map((e) => [e.id, e.email]))

  const criados: Array<{ nome: string; email: string; enviado: boolean; erro?: string }> = []
  const semEmail: string[] = []
  const liderEmailNorm = (team.liderEmail ?? '').trim().toLowerCase()
  let liderPulado = false

  for (const m of alvo) {
    const email = (m.email ?? (m.employeeId ? emailDoEmployee.get(m.employeeId) : null) ?? '').trim().toLowerCase()
    if (!email) { semEmail.push(m.nome); continue }
    // O líder não pode receber convite para avaliar a si mesmo
    if (liderEmailNorm && email === liderEmailNorm) { liderPulado = true; continue }

    // Idempotente: 1 convite ativo por team+email
    const existente = await prismaAny.liderConvite.findUnique({
      where: { teamId_email: { teamId: team.id, email } },
    })
    if (existente) continue

    const convite = await prismaAny.liderConvite.create({
      data: {
        teamId:    team.id,
        companyId: team.companyId,
        nome:      m.nome,
        email,
        token:     randomBytes(20).toString('hex'),
      },
    })

    const { sent, error } = await sendAvaliacaoLiderEmail({
      toEmail:   email,
      nome:      m.nome,
      liderNome: team.liderNome,
      teamNome:  team.nome,
      token:     convite.token,
    })
    criados.push({ nome: m.nome, email, enviado: sent, erro: sent ? undefined : String(error ?? 'desconhecido').slice(0, 300) })
  }

  return NextResponse.json({ criados, semEmail, liderPulado }, { status: 201 })
}
