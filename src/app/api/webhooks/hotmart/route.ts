// ============================================================
// Webhook Hotmart (v2) · provisionamento automático de vendas
//
// Configurar no painel Hotmart (Ferramentas > Webhook):
//   URL:    https://mapacomportamental.com/api/webhooks/hotmart
//   Versão: 2.0.0
//   Eventos: PURCHASE_APPROVED, PURCHASE_COMPLETE,
//            PURCHASE_REFUNDED, PURCHASE_CHARGEBACK,
//            PURCHASE_CANCELED, SUBSCRIPTION_CANCELLATION
//
// Segurança: o Hotmart envia o token no header X-HOTMART-HOTTOK.
// Defina HOTMART_HOTTOK no Railway com o mesmo valor do painel.
//
// Fluxo:
//   compra aprovada → acha/cria conta pelo e-mail do comprador →
//   credita pacote OU ativa assinatura → e-mail de acesso.
//   reembolso/chargeback → estorna créditos ou cancela assinatura.
//
// Idempotência: cada transação vira um CreditPurchase com
// stripeSessionId = "hotmart_{transaction}" (campo único).
// ============================================================

import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { resolveHotmartGrant, hotmartTxId, type HotmartGrant } from '@/lib/hotmart'
import { vincularDegustacao } from '@/lib/hotmart-vinculo'
import { sendHotmartWelcomeEmail, sendHotmartAdminAlert } from '@/lib/email'

export const runtime = 'nodejs'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://mapacomportamental.com'

// ── Tipos do payload (campos que usamos; o resto é ignorado) ────
interface HotmartPayload {
  id?:      string
  event?:   string
  data?: {
    product?:  { id?: number | string; name?: string }
    buyer?:    { email?: string; name?: string; checkout_phone?: string }
    purchase?: {
      transaction?:      string
      status?:           string
      price?:            { value?: number; currency_value?: string }
      offer?:            { code?: string }
      date_next_charge?: number
    }
    subscription?: {
      subscriber?: { code?: string }
      plan?:       { name?: string }
      status?:     string
    }
  }
}

export async function POST(request: NextRequest) {
  // ── 1. Autenticação do webhook ────────────────────────────
  const hottok = request.headers.get('x-hotmart-hottok')
  const expected = process.env.HOTMART_HOTTOK
  if (!expected) {
    console.error('[hotmart] HOTMART_HOTTOK não configurado no ambiente')
    return NextResponse.json({ error: 'Webhook não configurado.' }, { status: 503 })
  }
  if (hottok !== expected) {
    console.warn('[hotmart] hottok inválido recebido')
    return NextResponse.json({ error: 'Token inválido.' }, { status: 401 })
  }

  let payload: HotmartPayload
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: 'JSON inválido.' }, { status: 400 })
  }

  const event = payload.event ?? ''
  const data  = payload.data ?? {}

  try {
    switch (event) {
      case 'PURCHASE_APPROVED':
      case 'PURCHASE_COMPLETE':
        return await handleApproved(data)

      case 'PURCHASE_REFUNDED':
      case 'PURCHASE_CHARGEBACK':
      case 'PURCHASE_CANCELED':
        return await handleRevoked(data, event)

      case 'SUBSCRIPTION_CANCELLATION':
        return await handleSubscriptionCanceled(data)

      default:
        // Evento que não tratamos: confirma recebimento para o
        // Hotmart não ficar reenviando.
        return NextResponse.json({ received: true, ignored: event })
    }
  } catch (err) {
    console.error(`[hotmart] Erro processando ${event}:`, err)
    return NextResponse.json({ error: 'Erro interno.' }, { status: 500 })
  }
}

// ── 2. Compra aprovada → provisionar ──────────────────────────
async function handleApproved(data: NonNullable<HotmartPayload['data']>) {
  const buyerEmail  = data.buyer?.email?.trim().toLowerCase()
  const buyerName   = data.buyer?.name?.trim() || 'Cliente Hotmart'
  const transaction = data.purchase?.transaction
  const offerCode   = data.purchase?.offer?.code
  const productId   = data.product?.id
  const priceCents  = Math.round((data.purchase?.price?.value ?? 0) * 100)

  if (!buyerEmail || !transaction) {
    // Payload malformado: retentativa do Hotmart nunca resolve, então
    // confirma o recebimento (200) e registra para ação manual.
    console.error('[hotmart] Payload sem e-mail do comprador ou transação', { buyerEmail, transaction })
    return NextResponse.json({ received: true, incomplete: true })
  }

  // Idempotência: o Hotmart reenvia eventos e dispara APPROVED e
  // COMPLETE para a mesma transação. Processa uma vez só.
  const alreadyProcessed = await prisma.creditPurchase.findUnique({
    where: { stripeSessionId: hotmartTxId(transaction) },
  })
  if (alreadyProcessed) {
    return NextResponse.json({ received: true, duplicated: true })
  }

  // Oferta precisa estar mapeada; sem mapa não inventamos entrega.
  const grant = resolveHotmartGrant(offerCode, productId)
  if (!grant) {
    console.error('[hotmart] Oferta não mapeada:', { offerCode, productId, transaction, buyerEmail })
    await sendHotmartAdminAlert({
      subject: 'Venda recebida com oferta NÃO mapeada',
      lines: [
        `Transação: ${transaction}`,
        `Comprador: ${buyerName} (${buyerEmail})`,
        `Produto: ${data.product?.name ?? '?'} (id ${productId ?? '?'})`,
        `Código da oferta: ${offerCode ?? 'não informado'}`,
        'Adicione a oferta em src/lib/hotmart.ts e credite manualmente esta venda.',
      ],
    })
    // 200 para não gerar tempestade de retries; o alerta cobra ação manual.
    return NextResponse.json({ received: true, unmapped: true })
  }

  // ── Acha ou cria a conta do comprador ──────────────────────
  let company = await prisma.company.findUnique({ where: { email: buyerEmail } })
  let accessLink = `${APP_URL}/login`
  const isNewAccount = !company

  if (!company) {
    // Conta criada automaticamente: senha aleatória + link de
    // definição de senha com validade de 72h.
    const randomHash = await bcrypt.hash(uuidv4(), 12)
    company = await prisma.company.create({
      data: {
        name:  buyerName,
        email: buyerEmail,
        passwordHash: randomHash,
        type:  'PF',
        phone: data.buyer?.checkout_phone ?? null,
        isOnboardingCredited: true,
      },
    })
    const token = uuidv4()
    await prisma.passwordResetToken.create({
      data: {
        companyId: company.id,
        token,
        expiresAt: new Date(Date.now() + 72 * 60 * 60 * 1000),
      },
    })
    accessLink = `${APP_URL}/reset-password/${token}`
  }

  // ── Entrega ─────────────────────────────────────────────────
  if (grant.kind === 'CREDITS') {
    await grantCredits(company.id, grant, transaction, priceCents)
  } else {
    await grantSubscription(company.id, grant, transaction, priceCents, data)
  }

  // Se ela veio do teste gratuito, o resultado migra da conta-vitrine para
  // a conta dela. Serve para os dois lados: ela encontra o que já fez, e a
  // venda deixa de ser anônima na origem.
  const vinculo = await vincularDegustacao(company.id, data.buyer?.checkout_phone)

  await sendHotmartWelcomeEmail({
    toEmail:      buyerEmail,
    name:         buyerName,
    grantLabel:   grant.label,
    credits:      grant.kind === 'CREDITS' ? grant.credits : undefined,
    accessLink,
    isNewAccount,
  })

  return NextResponse.json({
    received: true,
    granted: grant.kind,
    newAccount: isNewAccount,
    degustacaoVinculada: vinculo.vinculado,
  })
}

async function grantCredits(
  companyId: string,
  grant: Extract<HotmartGrant, { kind: 'CREDITS' }>,
  transaction: string,
  priceCents: number,
) {
  await prisma.$transaction(async (tx) => {
    await tx.creditBalance.upsert({
      where:  { companyId },
      create: { companyId, balance: grant.credits },
      update: { balance: { increment: grant.credits } },
    })
    await tx.creditPurchase.create({
      data: {
        companyId,
        stripeSessionId: hotmartTxId(transaction),
        amount:          grant.credits,
        pricePaid:       priceCents,
        status:          'PAID',
      },
    })
    await tx.creditTransaction.create({
      data: {
        companyId,
        type:        'PURCHASE',
        source:      'PAID',
        amount:      grant.credits,
        description: `Hotmart: ${grant.label} (${grant.credits} créditos)`,
      },
    })
  })
}

async function grantSubscription(
  companyId: string,
  grant: Extract<HotmartGrant, { kind: 'SUBSCRIPTION' }>,
  transaction: string,
  priceCents: number,
  data: NonNullable<HotmartPayload['data']>,
) {
  const subscriberCode = data.subscription?.subscriber?.code
  const nextCharge     = data.purchase?.date_next_charge
  const now            = new Date()

  await prisma.$transaction(async (tx) => {
    await tx.subscription.upsert({
      where:  { companyId },
      create: {
        companyId,
        plan:   grant.plan,
        status: 'ACTIVE',
        source: 'HOTMART',
        // Reuso do campo: guarda o código do assinante Hotmart para
        // conseguir cancelar quando vier SUBSCRIPTION_CANCELLATION.
        stripeCustomerId:   subscriberCode ? `hotmart_${subscriberCode}` : null,
        currentPeriodStart: now,
        currentPeriodEnd:   nextCharge ? new Date(nextCharge) : null,
      },
      update: {
        plan:   grant.plan,
        status: 'ACTIVE',
        source: 'HOTMART',
        stripeCustomerId:   subscriberCode ? `hotmart_${subscriberCode}` : undefined,
        currentPeriodStart: now,
        currentPeriodEnd:   nextCharge ? new Date(nextCharge) : null,
        canceledAt:         null,
      },
    })
    // Registro da transação para idempotência e trilha de auditoria
    // (amount 0: assinatura não mexe no saldo de créditos).
    await tx.creditPurchase.create({
      data: {
        companyId,
        stripeSessionId: hotmartTxId(transaction),
        amount:          0,
        pricePaid:       priceCents,
        status:          'PAID',
      },
    })
  })
}

// ── 3. Reembolso / chargeback / cancelamento de compra ────────
async function handleRevoked(data: NonNullable<HotmartPayload['data']>, event: string) {
  const transaction = data.purchase?.transaction
  if (!transaction) {
    console.warn(`[hotmart] ${event} sem código de transação; nada a estornar`)
    return NextResponse.json({ received: true, incomplete: true })
  }

  const purchase = await prisma.creditPurchase.findUnique({
    where: { stripeSessionId: hotmartTxId(transaction) },
  })
  if (!purchase || purchase.status === 'REFUNDED') {
    // Nunca foi processada aqui (ou já estornada): só confirma.
    return NextResponse.json({ received: true, nothingToRevoke: true })
  }

  await prisma.$transaction(async (tx) => {
    await tx.creditPurchase.update({
      where: { id: purchase.id },
      data:  { status: 'REFUNDED' },
    })

    if (purchase.amount > 0) {
      // Compra de créditos: estorna do saldo (pode ficar negativo se
      // o cliente já consumiu; fica registrado como débito).
      await tx.creditBalance.update({
        where: { companyId: purchase.companyId },
        data:  { balance: { decrement: purchase.amount } },
      })
      await tx.creditTransaction.create({
        data: {
          companyId:   purchase.companyId,
          type:        'REFUND',
          source:      'PAID',
          amount:      -purchase.amount,
          description: `Hotmart: estorno (${event}) da transação ${transaction}`,
        },
      })
    } else {
      // Assinatura: cancela.
      await tx.subscription.updateMany({
        where: { companyId: purchase.companyId, source: 'HOTMART' },
        data:  { status: 'CANCELED', canceledAt: new Date() },
      })
    }
  })

  await sendHotmartAdminAlert({
    subject: `Estorno processado (${event})`,
    lines: [
      `Transação: ${transaction}`,
      `Conta: ${purchase.companyId}`,
      purchase.amount > 0
        ? `${purchase.amount} créditos removidos do saldo.`
        : 'Assinatura Hotmart cancelada.',
    ],
  })

  return NextResponse.json({ received: true, revoked: true })
}

// ── 4. Cancelamento de assinatura (fim da recorrência) ────────
async function handleSubscriptionCanceled(data: NonNullable<HotmartPayload['data']>) {
  const subscriberCode = data.subscription?.subscriber?.code
  if (!subscriberCode) {
    // Sem código do assinante não há o que cancelar (acontece nos
    // eventos de teste do painel). 200 evita retentativas inúteis.
    console.warn('[hotmart] SUBSCRIPTION_CANCELLATION sem subscriber code; ignorado')
    return NextResponse.json({ received: true, incomplete: true })
  }

  const updated = await prisma.subscription.updateMany({
    where: { stripeCustomerId: `hotmart_${subscriberCode}`, source: 'HOTMART' },
    data:  { status: 'CANCELED', canceledAt: new Date() },
  })

  return NextResponse.json({ received: true, canceled: updated.count })
}
