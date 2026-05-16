// ============================================================
// GET /api/nr1/coletas/[id] — detalhe + taxa de adesao por setor
// ============================================================

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/session'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prismaAny = prisma as any

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getSession()
  if (!session?.id) return NextResponse.json({ error: 'Nao autorizado.' }, { status: 401 })

  const coleta = await prismaAny.nR1Coleta.findFirst({
    where: { id: params.id, companyId: session.id },
    include: {
      convites: { select: { id: true, setorId: true, status: true } },
      respostas: { select: { id: true, setorId: true } },
    },
  })

  if (!coleta) return NextResponse.json({ error: 'Coleta nao encontrada.' }, { status: 404 })

  // Taxa de adesao por setor (apenas contagens, sem nomes)
  const setores = await prismaAny.nR1Setor.findMany({
    where: { companyId: session.id },
    select: { id: true, nome: true, perfilDiscDominante: true },
  })

  const porSetor = setores.map((s: { id: string; nome: string; perfilDiscDominante: string | null }) => {
    const convidadosSetor = coleta.convites.filter((c: { setorId: string }) => c.setorId === s.id)
    const respostasSetor = coleta.respostas.filter((r: { setorId: string }) => r.setorId === s.id)
    return {
      setorId: s.id,
      setorNome: s.nome,
      perfilDiscDominante: s.perfilDiscDominante,
      totalConvidados: convidadosSetor.length,
      totalRespondentes: respostasSetor.length,
      taxaAdesao: convidadosSetor.length > 0
        ? Math.round((respostasSetor.length / convidadosSetor.length) * 100)
        : 0,
    }
  })

  return NextResponse.json({
    coleta: {
      id: coleta.id,
      nome: coleta.nome,
      status: coleta.status,
      expiresAt: coleta.expiresAt,
      createdAt: coleta.createdAt,
    },
    porSetor,
  })
}
