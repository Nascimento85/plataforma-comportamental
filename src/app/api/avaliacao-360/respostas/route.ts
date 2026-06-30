// ============================================================
// POST /api/avaliacao-360/respostas — submissão via token
// Mesmo padrão anônimo do Líder/NR-1: calcula scores e grava em
// Avaliacao360Resposta ligada apenas ao CICLO + papel (sem FK de
// convite). Atualiza Avaliacao360Convite.status na tabela de controle.
// ============================================================

import { NextRequest, NextResponse } from 'next/server'
import { createHmac } from 'crypto'
import { prisma } from '@/lib/prisma'
import { calcResposta360 } from '@/content/gestao-times/avaliacao-360'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prismaAny = prisma as any

interface SubmitBody {
  token:          string
  respostas:      Record<string, number>
  continuarTexto?: string
  melhorarTexto?:  string
}

export async function POST(req: NextRequest) {
  let body: SubmitBody
  try { body = await req.json() } catch { return NextResponse.json({ error: 'JSON inválido.' }, { status: 400 }) }
  if (!body.token || !body.respostas) {
    return NextResponse.json({ error: 'Campos obrigatórios: token, respostas.' }, { status: 400 })
  }

  // Valida token (tabela de controle) + ciclo
  const convite = await prismaAny.avaliacao360Convite.findUnique({
    where: { token: body.token },
    include: { avaliacao: { select: { id: true, status: true, expiresAt: true } } },
  })
  if (!convite) return NextResponse.json({ error: 'Convite inválido.' }, { status: 404 })
  if (convite.status === 'COMPLETED') {
    return NextResponse.json({ error: 'Você já respondeu esta avaliação.' }, { status: 410 })
  }
  if (!convite.avaliacao || convite.avaliacao.status !== 'ACTIVE' || new Date() > new Date(convite.avaliacao.expiresAt)) {
    return NextResponse.json({ error: 'Esta avaliação não está mais ativa.' }, { status: 410 })
  }

  // Exige as 24 respostas completas (1 a 5)
  const calc = calcResposta360(body.respostas)
  if (!calc) {
    return NextResponse.json({ error: 'Responda todas as perguntas antes de enviar.' }, { status: 400 })
  }

  const continuar = (body.continuarTexto ?? '').trim().slice(0, 2000)
  const melhorar  = (body.melhorarTexto ?? '').trim().slice(0, 2000)

  // Impressão digital irreversível (antifraude), sem identificar o respondente
  const ip = (req.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'sem-ip'
  const ua = req.headers.get('user-agent') ?? 'sem-ua'
  const segredo = process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET ?? 'psique-360'
  const deviceHash = createHmac('sha256', segredo).update(`${ip}|${ua}`).digest('hex').slice(0, 32)

  await prisma.$transaction(async (tx) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const txAny = tx as any
    // Tabela B: resposta ligada ao ciclo + papel, SEM FK de identidade
    await txAny.avaliacao360Resposta.create({
      data: {
        avaliacaoId:    convite.avaliacaoId,
        companyId:      convite.companyId,
        role:           convite.role,
        respostas:      JSON.stringify(body.respostas),
        scores:         JSON.stringify(calc),
        continuarTexto: continuar.length > 0 ? continuar : null,
        melhorarTexto:  melhorar.length > 0 ? melhorar : null,
        deviceHash,
      },
    })
    // Tabela A: marca o convite como respondido (controle separado)
    await txAny.avaliacao360Convite.update({
      where: { id: convite.id },
      data: { status: 'COMPLETED', completedAt: new Date() },
    })
  })

  return NextResponse.json({ ok: true })
}
