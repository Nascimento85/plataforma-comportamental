// ============================================================
// SUBSTITUI: src/app/api/webhooks/stripe/route.ts
// Trata 2 fluxos:
//   1) Compra de pacote de créditos (kind ausente / "PACK")
//   2) Desbloqueio de Relatório Premium (kind = "PREMIUM_UNLOCK")
// ============================================================

import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { prisma } from '@/lib/prisma'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2023-10-16' })

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')
  if (!signature) return NextResponse.json({ error: 'Assinatura ausente.' }, { status: 400 })

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    console.error('[webhook] Assinatura inválida:', err)
    return NextResponse.json({ error: 'Assinatura inválida.' }, { status: 400 })
  }

  if (event.type !== 'checkout.session.completed') {
    return NextResponse.json({ received: true })
  }

  const session = event.data.object as Stripe.Checkout.Session

  // Assinaturas são tratadas pelo endpoint /api/webhooks/stripe-subscription.
  // Se esse evento chegar aqui (endpoint inscrito em checkout.session.completed
  // sem filtro), ignoramos com 200 — devolver 500 causa retentativas infinitas.
  if (session.mode === 'subscription' || session.metadata?.plan) {
    return NextResponse.json({ received: true, ignored: 'subscription' })
  }

  const kind = session.metadata?.kind ?? 'PACK'

  // Sessão sem metadata que reconhecemos: não é nossa (ou foi criada à mão no
  // dashboard). Loga e devolve 200 para o Stripe não reenviar para sempre.
  if (kind !== 'PREMIUM_UNLOCK' && (!session.metadata?.companyId || !session.metadata?.pack)) {
    console.error('[webhook] checkout.session.completed sem metadata reconhecida, ignorando:', session.id, session.metadata)
    return NextResponse.json({ received: true, ignored: 'unknown-metadata' })
  }

  try {
    if (kind === 'PREMIUM_UNLOCK') {
      await handlePremiumUnlock(session)
    } else {
      await handleCreditsPack(session)
    }
  } catch (err) {
    console.error('[webhook] Erro processando', kind, err)
    return NextResponse.json({ error: 'Erro ao processar pagamento.' }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}

// ─── 1) Compra de pacote de créditos (PAGOS, sem expiração) ─────
async function handleCreditsPack(session: Stripe.Checkout.Session) {
  const companyId = session.metadata?.companyId
  const pack      = parseInt(session.metadata?.pack ?? '0', 10)

  if (!companyId || pack <= 0) {
    console.error('[webhook] Metadata pack inválida:', session.metadata)
    throw new Error('Metadata pack inválida')
  }

  // Idempotência: o Stripe reenvia o evento se a resposta atrasar. Sem esse
  // guard, o segundo envio viola o unique de stripeSessionId e devolve 500.
  const already = await prisma.creditPurchase.findUnique({
    where: { stripeSessionId: session.id },
  })
  if (already) return

  await prisma.$transaction(async (tx) => {
    await tx.creditBalance.upsert({
      where:  { companyId },
      create: { companyId, balance: pack },
      update: { balance: { increment: pack } },
    })
    await tx.creditPurchase.create({
      data: {
        companyId,
        stripeSessionId: session.id,
        amount:          pack,
        pricePaid:       session.amount_total ?? 0,
        status:          'PAID',
      },
    })
    await tx.creditTransaction.create({
      data: {
        companyId,
        type:        'PURCHASE',
        source:      'PAID',
        amount:      pack,
        description: `Compra de ${pack} crédito${pack > 1 ? 's' : ''}`,
      },
    })
  })
}

// ─── 2) Premium unlock — desbloqueia 1 relatório específico ─────
async function handlePremiumUnlock(session: Stripe.Checkout.Session) {
  const reportId  = session.metadata?.reportId
  const companyId = session.metadata?.companyId
  if (!reportId || !companyId) {
    console.error('[webhook] Metadata premium inválida:', session.metadata)
    throw new Error('Metadata premium inválida')
  }

  // Idempotência (Stripe pode reenviar o mesmo evento)
  const existing = await prisma.reportUnlock.findUnique({
    where: { stripeSessionId: session.id },
  })
  if (existing) return

  await prisma.reportUnlock.upsert({
    where:  { reportId },
    create: {
      reportId,
      companyId,
      stripeSessionId: session.id,
      amountBrl:       session.amount_total ?? 0,
    },
    update: {
      stripeSessionId: session.id,
      amountBrl:       session.amount_total ?? 0,
      unlockedAt:      new Date(),
    },
  })
}
