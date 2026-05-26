// ============================================================
// POST /api/subscription/checkout
// Cria sessao Stripe Checkout para o cliente assinar um plano PJ.
// Body: { plan: 'ESSENCIAL' | 'PROFISSIONAL' }
// (ENTERPRISE eh atendido pelo time comercial, nao via checkout.)
// ============================================================

import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/session'
import { PLANOS, type PlanoKey } from '@/lib/subscription/plans'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prismaAny = prisma as any

const STRIPE_SECRET = process.env.STRIPE_SECRET_KEY
const APP_URL       = process.env.NEXT_PUBLIC_APP_URL ?? 'https://mapacomportamental.com'

interface CheckoutBody {
  plan?: PlanoKey
}

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session?.id) {
    return NextResponse.json({ error: 'Nao autorizado.' }, { status: 401 })
  }
  if (!STRIPE_SECRET) {
    return NextResponse.json({ error: 'Stripe nao configurado no servidor.' }, { status: 500 })
  }

  let body: CheckoutBody
  try { body = await req.json() } catch { return NextResponse.json({ error: 'JSON invalido.' }, { status: 400 }) }

  const planKey = body.plan
  if (!planKey || !['ESSENCIAL', 'PROFISSIONAL'].includes(planKey)) {
    return NextResponse.json({ error: 'Plano invalido. Use ESSENCIAL ou PROFISSIONAL.' }, { status: 400 })
  }

  const plano = PLANOS[planKey]
  if (!plano.stripePriceId) {
    return NextResponse.json(
      { error: `Stripe Price ID nao configurado para o plano ${planKey}. Configure STRIPE_PRICE_${planKey} nas env vars.` },
      { status: 500 },
    )
  }

  // Busca empresa + assinatura existente
  const company = await prismaAny.company.findUnique({
    where: { id: session.id },
    select: { id: true, email: true, name: true },
  })
  if (!company) return NextResponse.json({ error: 'Empresa nao encontrada.' }, { status: 404 })

  const existingSub = await prismaAny.subscription.findUnique({ where: { companyId: session.id } })

  const stripe = new Stripe(STRIPE_SECRET, { apiVersion: '2024-06-20' })

  // Reusa Stripe Customer se ja existe; senao cria
  let customerId = existingSub?.stripeCustomerId as string | null
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: company.email,
      name:  company.name,
      metadata: { companyId: company.id },
    })
    customerId = customer.id
  }

  // Cria a Checkout Session
  const checkout = await stripe.checkout.sessions.create({
    mode:                'subscription',
    customer:            customerId,
    line_items: [{ price: plano.stripePriceId, quantity: 1 }],
    success_url:         `${APP_URL}/dashboard/assinatura?success=1`,
    cancel_url:          `${APP_URL}/dashboard/assinatura?canceled=1`,
    allow_promotion_codes: true,
    subscription_data: {
      metadata: { companyId: company.id, plan: planKey },
    },
    metadata: { companyId: company.id, plan: planKey },
  })

  return NextResponse.json({ url: checkout.url })
}
