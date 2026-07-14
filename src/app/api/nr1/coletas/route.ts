// ============================================================
// GET  /api/nr1/coletas         — lista coletas da empresa
// POST /api/nr1/coletas         — cria nova coleta + gera convites (tokens)
// ============================================================

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/session'
import { hasActiveSubscription } from '@/lib/subscription/check'
import { sendNR1ConviteEmail } from '@/lib/email'
import { randomBytes } from 'crypto'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prismaAny = prisma as any

interface CreateBody {
  nome: string
  expiresAt: string  // ISO
  convidados: Array<{
    setorId: string
    nome: string
    email: string
  }>
}

export async function GET() {
  const session = await getSession()
  if (!session?.id) return NextResponse.json({ error: 'Nao autorizado.' }, { status: 401 })

  const coletas = await prismaAny.nR1Coleta.findMany({
    where: { companyId: session.id },
    orderBy: { createdAt: 'desc' },
    include: {
      _count: { select: { convites: true, respostas: true } },
    },
  })

  return NextResponse.json({ coletas })
}

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session?.id) return NextResponse.json({ error: 'Nao autorizado.' }, { status: 401 })

  // Gate premium: criar coleta NR-1 requer assinatura PJ ativa (ou admin)
  const subscriptionOk = await hasActiveSubscription(session.id)
  if (!session.isAdmin && !subscriptionOk) {
    return NextResponse.json(
      { error: 'Recurso premium. Ative o trial de 7 dias em /dashboard/assinatura.', isPremiumOnly: true },
      { status: 403 },
    )
  }

  let body: CreateBody
  try { body = await req.json() } catch { return NextResponse.json({ error: 'JSON invalido.' }, { status: 400 }) }
  if (!body.nome || !body.expiresAt || !Array.isArray(body.convidados) || body.convidados.length === 0) {
    return NextResponse.json({ error: 'Campos obrigatorios: nome, expiresAt, convidados[].' }, { status: 400 })
  }

  // Cria coleta + convites em transacao
  const result = await prisma.$transaction(async (tx) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const txAny = tx as any
    const coleta = await txAny.nR1Coleta.create({
      data: {
        companyId: session.id,
        nome: body.nome,
        expiresAt: new Date(body.expiresAt),
      },
    })

    const conviteCreates = body.convidados.map(c => ({
      coletaId: coleta.id,
      setorId: c.setorId,
      companyId: session.id,
      nome: c.nome,
      email: c.email,
      token: randomBytes(20).toString('hex'),
    }))
    await txAny.nR1Convite.createMany({ data: conviteCreates })

    return { coleta, convites: conviteCreates }
  })

  // Envia os convites por e-mail (fora da transacao — falha de e-mail
  // nao desfaz a coleta; o link continua disponivel para copiar no painel)
  const company = await prismaAny.company.findUnique({
    where: { id: session.id },
    select: { name: true },
  })
  let emailsEnviados = 0
  let emailsFalha = 0
  for (const c of result.convites) {
    const r = await sendNR1ConviteEmail({
      toEmail:     c.email,
      nome:        c.nome,
      companyNome: company?.name ?? 'Sua empresa',
      coletaNome:  result.coleta.nome,
      token:       c.token,
    })
    if (r.sent) emailsEnviados++
    else emailsFalha++
    // Resend limita ~2 req/s — intervalo entre envios
    await new Promise(res => setTimeout(res, 600))
  }

  return NextResponse.json(
    {
      coleta: result.coleta,
      totalConvites: result.convites.length,
      emailsEnviados,
      emailsFalha,
    },
    { status: 201 },
  )
}
