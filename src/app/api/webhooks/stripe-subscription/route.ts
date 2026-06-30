// ============================================================
// POST /api/webhooks/stripe-subscription
// Recebe eventos do Stripe Subscription e atualiza a tabela
// Subscription da nossa base.
//
// Eventos tratados:
//   - checkout.session.completed (primeira assinatura)
//   - customer.subscription.updated (mudanca de plano, renovacao)
//   - customer.subscription.deleted (cancelamento)
//   - invoice.payment_failed (cobranca falhou -> PAST_DUE)
//
// Requer STRIPE_WEBHOOK_SECRET_SUBSCRIPTION configurado.
// Configurar endpoint no Stripe Dashboard:
//   https://mapacomportamental.com/api/webhooks/stripe-subscription
// ============================================================

import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { prisma } from '@/lib/prisma'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prismaAny = prisma as any

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const STRIPE_SECRET   = process.env.STRIPE_SECRET_KEY
const WEBHOOK_SECRET  = process.env.STRIPE_WEBHOOK_SECRET_SUBSCRIPTION

function mapStripeStatus(stripeStatus: string): string {
  switch (stripeStatus) {
    case 'trialing':           return 'TRIALING'
    case 'active':             return 'ACTIVE'
    case 'past_due':           return 'PAST_DUE'
    case 'canceled':           return 'CANCELED'
    case 'incomplete_expired': return 'EXPIRED'
    case 'unpaid':             return 'PAST_DUE'
    default:                   return 'ACTIVE'
  }
}

function planFromPriceId(priceId: string | null | undefined): string {
  if (!priceId) return 'INDIVIDUAL'
  // Mapeia o price ID do Stripe -> chave de plano interna.
  // Cobre os planos atuais (Individual + Equipes) e os legados.
  const byEnv: Array<[string | undefined, string]> = [
    [process.env.STRIPE_PRICE_INDIVIDUAL,   'INDIVIDUAL'],
    [process.env.STRIPE_PRICE_EQUIPE_5,     'EQUIPE_5'],
    [process.env.STRIPE_PRICE_EQUIPE_10,    'EQUIPE_10'],
    [process.env.STRIPE_PRICE_EQUIPE_20,    'EQUIPE_20'],
    [process.env.STRIPE_PRICE_EQUIPE_50,    'EQUIPE_50'],
    [process.env.STRIPE_PRICE_PROFISSIONAL, 'PROFISSIONAL'], // legado
    [process.env.STRIPE_PRICE_ESSENCIAL,    'ESSENCIAL'],    // legado
  ]
  for (const [env, plan] of byEnv) {
    if (env && env === priceId) return plan
  }
  return 'INDIVIDUAL'
}

async function upsertSubscriptionFromStripe(sub: Stripe.Subscription, companyId: string) {
  const data = {
    companyId,
    plan:                 planFromPriceId(sub.items.data[0]?.price.id),
    status:               mapStripeStatus(sub.status),
    source:               'STRIPE',
    stripeCustomerId:     typeof sub.customer === 'string' ? sub.customer : sub.customer.id,
    stripeSubscriptionId: sub.id,
    trialStart:           sub.trial_start ? new Date(sub.trial_start * 1000) : null,
    trialEnd:             sub.trial_end   ? new Date(sub.trial_end   * 1000) : null,
    currentPeriodStart:   sub.current_period_start ? new Date(sub.current_period_start * 1000) : null,
    currentPeriodEnd:     sub.current_period_end   ? new Date(sub.current_period_end   * 1000) : null,
    canceledAt:           sub.canceled_at ? new Date(sub.canceled_at * 1000) : null,
  }

  const existing = await prismaAny.subscription.findUnique({ where: { companyId } })
  if (existing) {
    await prismaAny.subscription.update({ where: { id: existing.id }, data })
  } else {
    await prismaAny.subscription.create({ data })
  }
}

export async function POST(req: NextRequest) {
  if (!STRIPE_SECRET || !WEBHOOK_SECRET) {
    console.error('[stripe-subscription] STRIPE_SECRET_KEY ou STRIPE_WEBHOOK_SECRET_SUBSCRIPTION ausente.')
    return NextResponse.json({ error: 'Stripe nao configurado.' }, { status: 500 })
  }

  const stripe = new Stripe(STRIPE_SECRET, { apiVersion: '2024-06-20' })
  const signature = req.headers.get('stripe-signature')
  if (!signature) return NextResponse.json({ error: 'Sem assinatura Stripe.' }, { status: 400 })

  const rawBody = await req.text()

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, WEBHOOK_SECRET)
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('[stripe-subscription] Assinatura invalida:', msg)
    return NextResponse.json({ error: 'Assinatura invalida.' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const cs = event.data.object as Stripe.Checkout.Session
        const companyId = (cs.metadata?.companyId) as string | undefined
        if (!companyId || !cs.subscription) break
        const subId = typeof cs.subscription === 'string' ? cs.subscription : cs.subscription.id
        const sub = await stripe.subscriptions.retrieve(subId)
        await upsertSubscriptionFromStripe(sub, companyId)
        break
      }
      case 'customer.subscription.updated':
      case 'customer.subscription.created':
      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription
        const companyId = (sub.metadata?.companyId) as string | undefined
        if (!companyId) break
        await upsertSubscriptionFromStripe(sub, companyId)
        break
      }
      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        if (!invoice.subscription) break
        const subId = typeof invoice.subscription === 'string' ? invoice.subscription : invoice.subscription.id
        const sub = await stripe.subscriptions.retrieve(subId)
        const companyId = (sub.metadata?.companyId) as string | undefined
        if (!companyId) break
        await upsertSubscriptionFromStripe(sub, companyId)
        break
      }
      default:
        // Outros eventos: ignora silenciosamente
        break
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('[stripe-subscription] Falha ao processar evento:', event.type, msg)
    // Mesmo com erro interno, devolvemos 200 para o Stripe nao reentregar
    // a menos que o erro seja transitivo. Aqui devolvemos 500 para o Stripe retentar.
    return NextResponse.json({ error: 'Erro interno ao processar evento.' }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}
