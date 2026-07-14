// ============================================================
// POST /api/lider/respostas — submissao ANONIMA via token
// Mesmo padrao do NR-1: calcula scores e grava em LiderResposta
// SEM FK de usuario/convite. Atualiza LiderConvite.status apenas
// na tabela de controle, separada.
// ============================================================

import { NextRequest, NextResponse } from 'next/server'
import { createHmac } from 'crypto'
import { prisma } from '@/lib/prisma'
import { calcRespostaLider } from '@/content/gestao-times/avaliacao-lider'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prismaAny = prisma as any

interface SubmitBody {
  token: string
  respostas: Record<string, number>
  sciTexto?: string
}

export async function POST(req: NextRequest) {
  try {
  let body: SubmitBody
  try { body = await req.json() } catch { return NextResponse.json({ error: 'JSON inválido.' }, { status: 400 }) }
  if (!body.token || !body.respostas) {
    return NextResponse.json({ error: 'Campos obrigatórios: token, respostas.' }, { status: 400 })
  }

  // Valida token (tabela de controle)
  const convite = await prismaAny.liderConvite.findUnique({ where: { token: body.token } })
  if (!convite) return NextResponse.json({ error: 'Convite inválido.' }, { status: 404 })
  if (convite.status === 'COMPLETED') {
    return NextResponse.json({ error: 'Você já respondeu esta avaliação.' }, { status: 410 })
  }

  // Exige as 13 respostas completas (1 a 5)
  const calc = calcRespostaLider(body.respostas)
  if (!calc) {
    return NextResponse.json({ error: 'Responda todas as perguntas antes de enviar.' }, { status: 400 })
  }

  // SCI obrigatorio quando ha nota 1 ou 2 (nota baixa sem contexto nao gera mudanca)
  const temNotaBaixa = Object.values(body.respostas).some((v) => Number(v) <= 2)
  const sci = (body.sciTexto ?? '').trim()
  if (temNotaBaixa && sci.length < 20) {
    return NextResponse.json({
      error: 'Você deu notas baixas em alguns pontos. Descreva brevemente um episódio que ilustre isso, sem se identificar. É o que transforma sua avaliação em mudança real.',
    }, { status: 400 })
  }

  // Impressao digital do dispositivo: HMAC irreversivel de IP+UserAgent.
  // Nao ha caminho de volta para a pessoa; serve apenas para detectar
  // varias respostas do mesmo dispositivo no mesmo time (antifraude).
  const ip = (req.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'sem-ip'
  const ua = req.headers.get('user-agent') ?? 'sem-ua'
  const segredo = process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET ?? 'psique-lider'
  const deviceHash = createHmac('sha256', segredo).update(`${ip}|${ua}`).digest('hex').slice(0, 32)

  await prisma.$transaction(async (tx) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const txAny = tx as any
    // Tabela B: resposta anonima, SEM FK de identidade
    await txAny.liderResposta.create({
      data: {
        teamId:    convite.teamId,
        companyId: convite.companyId,
        respostas: JSON.stringify(body.respostas),
        scores:    JSON.stringify(calc),
        sciTexto:  sci.length > 0 ? sci.slice(0, 2000) : null,
        deviceHash,
      },
    })
    // Tabela A: marca o convite como respondido (controle separado)
    await txAny.liderConvite.update({
      where: { id: convite.id },
      data: { status: 'COMPLETED', completedAt: new Date() },
    })
  })

  return NextResponse.json({ ok: true })
  } catch (e) {
    // Garante resposta JSON mesmo em erro inesperado (evita HTML 500)
    console.error('[lider/respostas] Erro ao gravar submissão:', e)
    return NextResponse.json(
      { error: 'Erro interno ao registrar as respostas. Tente novamente em instantes.' },
      { status: 500 },
    )
  }
}
