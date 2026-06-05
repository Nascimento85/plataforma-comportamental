// ============================================================
// POST /api/talent-members/[id]/pdi
// Cria ou atualiza o PDI ativo de um membro (SCI + ações + prazo).
// ============================================================

import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/session'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prismaAny = prisma as any

const FREQ_VALIDAS = ['SEMANAL', 'QUINZENAL', 'MENSAL']

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getSession()
  if (!session?.id) return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 })

  const member = await prismaAny.talentMember.findUnique({ where: { id: params.id } })
  if (!member || member.companyId !== session.id) {
    return NextResponse.json({ error: 'Membro não encontrado.' }, { status: 404 })
  }

  let body: {
    pdiId?: string
    sciSituacao?: string
    sciComportamento?: string
    sciImpacto?: string
    acoes?: string[]
    prazo?: string
    frequencia?: string
  }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'JSON inválido.' }, { status: 400 })
  }

  const data = {
    sciSituacao:      (body.sciSituacao ?? '').trim().slice(0, 1000) || null,
    sciComportamento: (body.sciComportamento ?? '').trim().slice(0, 1000) || null,
    sciImpacto:       (body.sciImpacto ?? '').trim().slice(0, 1000) || null,
    acoes:            Array.isArray(body.acoes) ? JSON.stringify(body.acoes.slice(0, 10)) : null,
    prazo:            body.prazo ? new Date(body.prazo) : null,
    frequencia:       body.frequencia && FREQ_VALIDAS.includes(body.frequencia) ? body.frequencia : null,
  }

  // Atualiza PDI existente ou cria novo
  let pdi
  if (body.pdiId) {
    const existing = await prismaAny.talentPDI.findUnique({ where: { id: body.pdiId } })
    if (!existing || existing.companyId !== session.id || existing.memberId !== member.id) {
      return NextResponse.json({ error: 'PDI não encontrado.' }, { status: 404 })
    }
    pdi = await prismaAny.talentPDI.update({ where: { id: body.pdiId }, data })
  } else {
    pdi = await prismaAny.talentPDI.create({
      data: { memberId: member.id, companyId: session.id, ...data },
    })
  }

  return NextResponse.json({ id: pdi.id }, { status: 200 })
}
