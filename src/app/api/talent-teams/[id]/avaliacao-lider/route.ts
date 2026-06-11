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

  const team = await prismaAny.talentTeam.findUnique({ where: { id: params.id } })
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
      select: { respostas: true, sciTexto: true },
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
    // Relatos SCI em ordem embaralhada (nao cronologica), so com n minimo
    sciEntries = respostas
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((r: any) => r.sciTexto)
      .filter((t: string | null): t is string => !!t)
      .sort(() => Math.random() - 0.5)
  }

  return NextResponse.json({
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
