import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { prisma } from '@/lib/prisma'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

// IMPORTANTE: desabilita o body parser padrão do Next.js
// para que o Stripe possa verificar a assinatura do webhook
export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Assinatura ausente.' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('[webhook] Assinatura inválida:', err)
    return NextResponse.json({ error: 'Assinatura inválida.' }, { status: 400 })
  }

  // Processa apenas pagamentos concluídos
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    const companyId = session.metadata?.companyId
    const pack = parseInt(session.metadata?.pack ?? '0', 10)

    if (!companyId || pack <= 0) {
      console.error('[webhook] Metadata inválida:', session.metadata)
      return NextResponse.json({ error: 'Metadata inválida.' }, { status: 400 })
    }

    try {
      await prisma.$transaction(async (tx) => {
        // Adiciona créditos ao saldo
        await tx.creditBalance.upsert({
          where: { companyId },
          create: { companyId, balance: pack },
          update: { balance: { increment: pack } },
        })

        // Registra a compra
        await tx.creditPurchase.create({
          data: {
            companyId,
            stripeSessionId: session.id,
            amount: pack,
            pricePaid: session.amount_total ?? 0,
            status: 'PAID',
          },
        })

        // Registra transação
        await tx.creditTransaction.create({
          data: {
            companyId,
            type: 'PURCHASE',
            amount: pack,
            description: `Compra de ${pack} crédito${pack > 1 ? 's' : ''}`,
          },
        })
      })

      console.log(`[webhook] +${pack} créditos adicionados para empresa ${companyId}`)
    } catch (err) {
      console.error('[webhook] Erro ao processar pagamento:', err)
      return NextResponse.json({ error: 'Erro ao processar pagamento.' }, { status: 500 })
    }
  }

  return NextResponse.json({ received: true })
}
