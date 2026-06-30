// ============================================================
// POST /api/enps/respostas — submissão ANÔNIMA via token
// Grava em EnpsResposta (nota, categoria, tempo de casa, motivo)
// sem FK de identidade. Atualiza EnpsConvite.status (controle).
// ============================================================

import { NextRequest, NextResponse } from 'next/server'
import { createHmac } from 'crypto'
import { prisma } from '@/lib/prisma'
import { categoriaFromNota, type TempoCasa } from '@/content/enps'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prismaAny = prisma as any

const TEMPOS = ['ATE_3M', 'DE_3M_1A', 'DE_1A_2A', 'MAIS_2A']

interface Body {
  token:    string
  nota:     number
  tempoCasa?: string
  motivo?:  string
}

export async function POST(req: NextRequest) {
  let body: Body
  try { body = await req.json() } catch { return NextResponse.json({ error: 'JSON inválido.' }, { status: 400 }) }
  if (!body.token) return NextResponse.json({ error: 'Token obrigatório.' }, { status: 400 })

  const nota = Math.round(Number(body.nota))
  if (!Number.isFinite(nota) || nota < 0 || nota > 10) {
    return NextResponse.json({ error: 'Escolha uma nota de 0 a 10.' }, { status: 400 })
  }
  const motivo = (body.motivo ?? '').trim()
  if (motivo.length < 3) {
    return NextResponse.json({ error: 'Conte brevemente o motivo da sua nota.' }, { status: 400 })
  }
  const tempoCasa = TEMPOS.includes(body.tempoCasa ?? '') ? (body.tempoCasa as TempoCasa) : null

  // Valida token (controle) + coleta
  const convite = await prismaAny.enpsConvite.findUnique({
    where: { token: body.token },
    include: { coleta: { select: { id: true, status: true, expiresAt: true } } },
  })
  if (!convite) return NextResponse.json({ error: 'Convite inválido.' }, { status: 404 })
  if (convite.status === 'COMPLETED') {
    return NextResponse.json({ error: 'Você já respondeu esta pesquisa.' }, { status: 410 })
  }
  if (!convite.coleta || convite.coleta.status !== 'ACTIVE' || new Date() > new Date(convite.coleta.expiresAt)) {
    return NextResponse.json({ error: 'Esta pesquisa não está mais ativa.' }, { status: 410 })
  }

  const ip = (req.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'sem-ip'
  const ua = req.headers.get('user-agent') ?? 'sem-ua'
  const segredo = process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET ?? 'psique-enps'
  const deviceHash = createHmac('sha256', segredo).update(`${ip}|${ua}`).digest('hex').slice(0, 32)

  await prisma.$transaction(async (tx) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const txAny = tx as any
    await txAny.enpsResposta.create({
      data: {
        coletaId:  convite.coletaId,
        companyId: convite.companyId,
        nota,
        categoria: categoriaFromNota(nota),
        tempoCasa,
        motivo:    motivo.slice(0, 2000),
        deviceHash,
      },
    })
    await txAny.enpsConvite.update({
      where: { id: convite.id },
      data: { status: 'COMPLETED', completedAt: new Date() },
    })
  })

  return NextResponse.json({ ok: true })
}
