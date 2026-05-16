// ============================================================
// GET /api/nr1/convite/[token] — dados do convite para a coleta publica
// Publica, sem auth. Retorna nome+setor+coleta para o cabecalho da pagina.
// ============================================================

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prismaAny = prisma as any

export async function GET(_req: NextRequest, { params }: { params: { token: string } }) {
  const convite = await prismaAny.nR1Convite.findUnique({
    where: { token: params.token },
    include: {
      coleta: { select: { id: true, nome: true, status: true, expiresAt: true } },
      setor:  { select: { id: true, nome: true } },
    },
  })

  if (!convite) return NextResponse.json({ error: 'Convite invalido.' }, { status: 404 })
  if (convite.status === 'COMPLETED') {
    return NextResponse.json({ error: 'Voce ja respondeu esta avaliacao.' }, { status: 410 })
  }
  if (convite.coleta.status !== 'ACTIVE' || new Date() > new Date(convite.coleta.expiresAt)) {
    return NextResponse.json({ error: 'Esta coleta nao esta mais ativa.' }, { status: 410 })
  }

  return NextResponse.json({
    nome: convite.nome,
    setor: { id: convite.setor.id, nome: convite.setor.nome },
    coleta: { id: convite.coleta.id, nome: convite.coleta.nome },
  })
}
