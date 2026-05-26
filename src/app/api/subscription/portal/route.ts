// ============================================================
// POST /api/subscription/portal
// Gera link para o cliente acessar o Stripe Customer Portal,
// onde pode trocar cartao, baixar invoices, cancelar assinatura, etc.
// ============================================================

import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/session'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prismaAny = prisma as any

const STRIPE_SECRET = process.env.STRIPE_SECRET_KEY
const APP_URL       = process.env.NEXT_PUBLIC_APP_URL ?? 'https://mapacomportamental.com'

export async function POST(_req: NextRequest) {
  const session = await getSession()
  if (!session?.id) {
    return NextResponse.json({ error: 'Nao autorizado.' }, { status: 401 })
  }
  if (!STRIPE_SECRET) {
    return NextResponse.json({ error: 'Stripe nao configurado no servidor.' }, { status: 500 })
  }

  const sub = await prismaAny.subscription.findUnique({
    where: { companyId: session.id },
    select: { stripeCustomerId: true },
  })

  if (!sub?.stripeCustomerId) {
    return NextResponse.json(
      { error: 'Voce ainda nao possui assinatura paga. Use o checkout para iniciar.' },
      { status: 400 },
    )
  }

  const stripe = new Stripe(STRIPE_SECRET, { apiVersion: '2024-06-20' })

  const portal = await stripe.billingPortal.sessions.create({
    customer:    sub.stripeCustomerId,
    return_url:  `${APP_URL}/dashboard/assinatura`,
  })

  return NextResponse.json({ url: portal.url })
}
