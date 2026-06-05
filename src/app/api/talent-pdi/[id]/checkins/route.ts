// ============================================================
// POST /api/talent-pdi/[id]/checkins  — adiciona check-in à timeline
// ============================================================

import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/session'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prismaAny = prisma as any

const STATUS_META = ['EM_ANDAMENTO', 'CONCLUIDO', 'EM_ATRASO']
const TENDENCIAS  = ['SUBINDO', 'ESTAVEL', 'DESCENDO']

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getSession()
  if (!session?.id) return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 })

  const pdi = await prismaAny.talentPDI.findUnique({ where: { id: params.id } })
  if (!pdi || pdi.companyId !== session.id) {
    return NextResponse.json({ error: 'PDI não encontrado.' }, { status: 404 })
  }

  let body: { nota?: string; statusMeta?: string; tendencia?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'JSON inválido.' }, { status: 400 })
  }

  const nota = (body.nota ?? '').trim()
  if (nota.length < 2) {
    return NextResponse.json({ error: 'Escreva uma nota de acompanhamento.' }, { status: 400 })
  }

  const checkin = await prismaAny.talentCheckIn.create({
    data: {
      pdiId:      pdi.id,
      companyId:  session.id,
      nota:       nota.slice(0, 1000),
      statusMeta: body.statusMeta && STATUS_META.includes(body.statusMeta) ? body.statusMeta : 'EM_ANDAMENTO',
      tendencia:  body.tendencia && TENDENCIAS.includes(body.tendencia) ? body.tendencia : null,
    },
  })

  // Sincroniza o status do PDI com o último check-in
  if (body.statusMeta === 'CONCLUIDO') {
    await prismaAny.talentPDI.update({ where: { id: pdi.id }, data: { status: 'CONCLUIDO' } })
  } else if (body.statusMeta === 'EM_ATRASO') {
    await prismaAny.talentPDI.update({ where: { id: pdi.id }, data: { status: 'ATRASADO' } })
  }

  return NextResponse.json({ id: checkin.id }, { status: 201 })
}
