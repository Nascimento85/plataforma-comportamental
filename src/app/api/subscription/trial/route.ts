// ============================================================
// POST /api/subscription/trial
// Ativa trial de 7 dias SEM cartao. Cria/atualiza Subscription
// com status TRIALING e plan ESSENCIAL (padrao do trial).
// Idempotente: se ja existe assinatura ativa, retorna sem mudar.
// Se trial anterior expirou, recusa (cliente precisa assinar pago).
// ============================================================

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/session'
import { TRIAL_DIAS } from '@/lib/subscription/plans'
import { getSubscriptionStatus } from '@/lib/subscription/check'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prismaAny = prisma as any

export async function POST(_req: NextRequest) {
  const session = await getSession()
  if (!session?.id) {
    return NextResponse.json({ error: 'Nao autorizado.' }, { status: 401 })
  }

  const current = await getSubscriptionStatus(session.id)

  // Ja tem acesso ativo, nao precisa de trial.
  if (current.hasActiveAccess) {
    return NextResponse.json({
      ok: true,
      alreadyActive: true,
      message: 'Sua conta ja possui acesso ativo.',
      status: current.status,
      plan: current.plan,
    })
  }

  // Trial anterior expirou (ja teve trial alguma vez)
  const existing = await prismaAny.subscription.findUnique({
    where: { companyId: session.id },
  })
  if (existing && existing.trialEnd) {
    return NextResponse.json(
      { error: 'Voce ja utilizou o trial. Assine um plano para continuar.', code: 'TRIAL_ALREADY_USED' },
      { status: 409 },
    )
  }

  const now = new Date()
  const trialEnd = new Date(now.getTime() + TRIAL_DIAS * 24 * 60 * 60 * 1000)

  const data = {
    companyId:  session.id,
    plan:       'ESSENCIAL',
    status:     'TRIALING',
    source:     'TRIAL_INTERNO',
    trialStart: now,
    trialEnd,
  }

  const sub = existing
    ? await prismaAny.subscription.update({ where: { id: existing.id }, data })
    : await prismaAny.subscription.create({ data })

  return NextResponse.json({
    ok: true,
    status:   sub.status,
    plan:     sub.plan,
    trialEnd: sub.trialEnd,
    daysUntilTrialEnd: TRIAL_DIAS,
  }, { status: 201 })
}
