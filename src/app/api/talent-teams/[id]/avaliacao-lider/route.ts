// ============================================================
// GET /api/talent-teams/[id]/avaliacao-lider
// Resultado agregado da Avaliacao de Lideranca do time.
// So libera scores com n >= MIN_RESPOSTAS_LIDER (anonimato).
// ============================================================

import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import { agregarRespostasLider, MIN_RESPOSTAS_LIDER } from '@/content/gestao-times/avaliacao-lider'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prismaAny = prisma as any

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getSession()
  if (!session?.id) return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 })

  const team = await prismaAny.talentTeam.findUnique({
    where: { id: params.id },
    include: { members: { orderBy: { createdAt: 'asc' } } },
  })
  if (!team || team.companyId !== session.id) {
    return NextResponse.json({ error: 'Time não encontrado.' }, { status: 404 })
  }

  const [convites, respostas] = await Promise.all([
    prismaAny.liderConvite.findMany({
      where: { teamId: team.id },
      select: { id: true, nome: true, email: true, status: true, token: true, createdAt: true },
      orderBy: { createdAt: 'asc' },
    }),
    prismaAny.liderResposta.findMany({
      where: { teamId: team.id },
      select: { respostas: true, sciTexto: true, deviceHash: true },
    }),
  ])

  const n = respostas.length
  const liberado = n >= MIN_RESPOSTAS_LIDER

  let resultado = null
  let sciEntries: string[] = []
  if (liberado) {
    const parsed = respostas
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((r: any) => { try { return JSON.parse(r.respostas) } catch { return null } })
      .filter(Boolean)
    resultado = agregarRespostasLider(parsed)
    // Antifraude (deviceHash): a deteccao de respostas repetidas do mesmo
    // dispositivo NAO aparece para a empresa — somente no painel /admin
    // (decisao de produto: evitar acusacoes internas por falso positivo).
    // Relatos SCI em ordem embaralhada (nao cronologica), so com n minimo
    sciEntries = respostas
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((r: any) => r.sciTexto)
      .filter((t: string | null): t is string => !!t)
      .sort(() => Math.random() - 0.5)
  }

  // Situacao de cada membro: email resolvido (proprio ou do Employee) + convite
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const membersRaw = team.members as any[]
  const employeeIds = membersRaw.map((m) => m.employeeId).filter(Boolean) as string[]
  const employees = employeeIds.length
    ? await prisma.employee.findMany({ where: { id: { in: employeeIds } }, select: { id: true, email: true } })
    : []
  const emailDoEmployee = new Map(employees.map((e) => [e.id, e.email]))
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const conviteDoEmail = new Map(convites.map((c: any) => [c.email, c.status]))
  const membros = membersRaw.map((m) => {
    const email = (m.email ?? (m.employeeId ? emailDoEmployee.get(m.employeeId) : null) ?? '').trim().toLowerCase() || null
    return {
      id: m.id,
      nome: m.nome,
      email,
      conviteStatus: email ? (conviteDoEmail.get(email) ?? null) : null,
    }
  })

  return NextResponse.json({
    membros,
    liderNome:    team.liderNome,
    liderEmail:   team.liderEmail,
    minRespostas: MIN_RESPOSTAS_LIDER,
    nRespostas:   n,
    liberado,
    convites,
    resultado,
    sciEntries,
  })
}
