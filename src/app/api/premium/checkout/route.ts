// ============================================================
// /api/premium/checkout — Camada 3 + 4
// Cria sessão Stripe one-shot p/ desbloquear o Relatório Premium
// de UM relatório específico. NÃO aceita créditos do Passaporte.
// ============================================================

import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2023-10-16' })

const PREMIUM_PRICE_ID = process.env.STRIPE_PRICE_PREMIUM_REPORT!  // R$ 47 por exemplo
const PREMIUM_AMOUNT_BRL_CENTS = Number(process.env.PREMIUM_REPORT_PRICE_CENTS ?? '4700')

const schema = z.object({
  reportId: z.string().min(1),
  source:   z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const json   = await request.json()
    const parsed = schema.safeParse(json)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Payload inválido' }, { status: 400 })
    }
    const { reportId, source } = parsed.data

    // Busca o relatório (pode ser anônimo - link público de devolutiva)
    const report = await prisma.report.findUnique({
      where: { id: reportId },
      include: {
        unlock:     true,
        assessment: { include: { employee: true } },
      },
    })
    if (!report) return NextResponse.json({ error: 'Relatório não encontrado' }, { status: 404 })
    if (report.unlock) {
      return NextResponse.json({ error: 'Já desbloqueado', alreadyUnlocked: true }, { status: 409 })
    }

    const successUrl = `${process.env.NEXT_PUBLIC_APP_URL}/result/${report.assessmentId}?premium=1`
    const cancelUrl  = `${process.env.NEXT_PUBLIC_APP_URL}/result/${report.assessmentId}?premium=0`

    const checkout = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        PREMIUM_PRICE_ID
          ? { price: PREMIUM_PRICE_ID, quantity: 1 }
          : {
              quantity: 1,
              price_data: {
                currency: 'brl',
                product_data: {
                  name:        'Relatório Premium + PDI',
                  description: `Acesso completo ao perfil ${report.assessment.employee.name}`,
                },
                unit_amount: PREMIUM_AMOUNT_BRL_CENTS,
              },
            },
      ],
      success_url: successUrl,
      cancel_url:  cancelUrl,
      metadata: {
        kind:      'PREMIUM_UNLOCK',
        reportId:  report.id,
        companyId: report.companyId,
        source:    source ?? 'unknown',
      },
    })

    return NextResponse.json({ url: checkout.url, sessionId: checkout.id })
  } catch (err) {
    console.error('[premium-checkout]', err)
    return NextResponse.json({ error: 'Erro ao criar checkout' }, { status: 500 })
  }
}
