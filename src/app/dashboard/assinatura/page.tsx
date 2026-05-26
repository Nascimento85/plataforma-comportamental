// ============================================================
// /dashboard/assinatura — status + ativar trial + checkout + portal
// ============================================================

import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'
import { getSubscriptionStatus } from '@/lib/subscription/check'
import { PLANOS, TRIAL_DIAS } from '@/lib/subscription/plans'
import AssinaturaClient from './AssinaturaClient'

export const metadata: Metadata = { title: 'Assinatura · Psique' }

export default async function AssinaturaPage() {
  const session = await getSession()
  if (!session?.id) redirect('/login')

  const status = await getSubscriptionStatus(session.id)
  const planoAtual = status.plan ? PLANOS[status.plan] : null

  // Serializa o que o client precisa
  const initial = {
    hasActiveAccess:   status.hasActiveAccess,
    isTrialing:        status.isTrialing,
    isActive:          status.isActive,
    status:            status.status,
    planKey:           status.plan,
    planoNome:         planoAtual?.nome ?? null,
    planoPreco:        planoAtual?.precoLabel ?? null,
    employeeCap:       status.employeeCap,
    trialEnd:          status.trialEnd ? status.trialEnd.toISOString() : null,
    currentPeriodEnd:  status.currentPeriodEnd ? status.currentPeriodEnd.toISOString() : null,
    daysUntilTrialEnd: status.daysUntilTrialEnd,
    trialDias:         TRIAL_DIAS,
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <p className="text-[11px] font-bold uppercase tracking-widest text-soul-terracota mb-2">
          Conta · Assinatura
        </p>
        <h1 className="font-serif font-semibold text-3xl text-soul-ink leading-tight mb-2">
          Sua assinatura
        </h1>
        <p className="text-[14px] text-soul-ink/75 font-medium max-w-2xl">
          Gerencie seu plano, cartão e cobrança. Empresas pagam mensal e usam a plataforma sem limites.
          Pessoas físicas continuam comprando créditos avulsos.
        </p>
      </div>

      <AssinaturaClient initial={initial} isAdmin={session.isAdmin === true} />
    </div>
  )
}
