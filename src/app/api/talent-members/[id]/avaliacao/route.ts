// ============================================================
// POST /api/talent-members/[id]/avaliacao
// Recebe as respostas do questionário 9-box, calcula as notas
// (Performance, Fit, Potencial) e salva no membro.
// ============================================================

import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import { calcularAvaliacao, CRITERIOS } from '@/content/gestao-times/avaliacao-criterios'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prismaAny = prisma as any

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getSession()
  if (!session?.id) return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 })

  const member = await prismaAny.talentMember.findUnique({ where: { id: params.id } })
  if (!member || member.companyId !== session.id) {
    return NextResponse.json({ error: 'Membro não encontrado.' }, { status: 404 })
  }

  let body: { respostas?: Record<string, number> }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'JSON inválido.' }, { status: 400 })
  }

  // Normaliza respostas: chave numérica, valor 1-5
  const respostas: Record<number, number> = {}
  const valid = new Set(CRITERIOS.map((c) => c.id))
  for (const [k, v] of Object.entries(body.respostas ?? {})) {
    const id = Number(k)
    const val = Number(v)
    if (valid.has(id) && val >= 1 && val <= 5) respostas[id] = val
  }

  if (Object.keys(respostas).length === 0) {
    return NextResponse.json({ error: 'Nenhuma resposta válida recebida.' }, { status: 400 })
  }

  const result = calcularAvaliacao(respostas)

  const avaliacaoJson = JSON.stringify({
    respostas,
    notaPerformance: result.notaPerformance,
    fitComportamental: result.fitComportamental,
    potencial: result.potencial,
    completo: result.completo,
    avaliadoEm: new Date().toISOString(),
  })

  await prismaAny.talentMember.update({
    where: { id: member.id },
    data: {
      notaPerformance:   result.notaPerformance,
      fitComportamental: result.fitComportamental,
      potencial:         result.potencial,
      avaliacaoJson,
      // Avaliação detalhada recalcula a zona automaticamente (remove override manual)
      zonaManual: false,
    },
  })

  return NextResponse.json({
    notaPerformance: result.notaPerformance,
    fitComportamental: result.fitComportamental,
    potencial: result.potencial,
    completo: result.completo,
  }, { status: 200 })
}
