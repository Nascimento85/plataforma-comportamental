// ============================================================
// GET /api/lider/convite/[token] — dados do convite para a
// avaliacao de lideranca publica. Sem auth (rota publica).
// ============================================================

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prismaAny = prisma as any

export async function GET(_req: NextRequest, { params }: { params: { token: string } }) {
  const convite = await prismaAny.liderConvite.findUnique({
    where: { token: params.token },
    include: {
      team:    { select: { id: true, nome: true, liderNome: true } },
      company: { select: { companyName: true, name: true } },
    },
  })

  if (!convite) return NextResponse.json({ error: 'Convite inválido.' }, { status: 404 })
  if (convite.status === 'COMPLETED') {
    return NextResponse.json({ error: 'Você já respondeu esta avaliação. Obrigado!' }, { status: 410 })
  }
  if (!convite.team.liderNome) {
    return NextResponse.json({ error: 'Esta avaliação não está mais ativa.' }, { status: 410 })
  }

  return NextResponse.json({
    liderNome: convite.team.liderNome,
    teamNome:  convite.team.nome,
    empresa:   convite.company.companyName || convite.company.name,
  })
}
