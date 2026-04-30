// ============================================================
// /api/results/check?token=xxx
// Endpoint de fallback para mobile: quando o POST /api/results
// retorna sucesso mas o client não recebe a resposta (rede móvel
// caiu, timeout do navegador), o client chama este GET pra
// confirmar se o teste já foi salvo no servidor.
// ============================================================

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { parseResultData } from '@/lib/parseResult'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token')
  if (!token) {
    return NextResponse.json({ error: 'token obrigatório' }, { status: 400 })
  }

  const assessment = await prisma.assessment.findUnique({
    where: { token },
    select: {
      id: true,
      status: true,
      testType: true,
      result: { select: { id: true, resultData: true } },
    },
  })

  if (!assessment) {
    return NextResponse.json({ error: 'Avaliação não encontrada' }, { status: 404 })
  }

  // Se já está concluído E tem Result salvo, retorna o resultado
  if (assessment.status === 'COMPLETED' && assessment.result) {
    return NextResponse.json({
      completed: true,
      assessmentId: assessment.id,
      resultId: assessment.result.id,
      result: parseResultData(assessment.result.resultData),
    })
  }

  // Ainda não concluído — client deve continuar tentando o POST
  return NextResponse.json({
    completed: false,
    assessmentId: assessment.id,
  })
}
