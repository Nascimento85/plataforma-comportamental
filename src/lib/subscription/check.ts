// ============================================================
// Helpers para verificar status de assinatura de uma empresa.
// Usados nos gates de paginas/endpoints premium.
// ============================================================

import { prisma } from '@/lib/prisma'
import { PLANOS, isStatusAtivo, type PlanoKey, type StatusAssinatura } from './plans'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prismaAny = prisma as any

export interface SubscriptionStatus {
  hasActiveAccess:   boolean
  isTrialing:        boolean
  isActive:          boolean
  status:            StatusAssinatura | null
  plan:              PlanoKey | null
  trialEnd:          Date | null
  currentPeriodEnd:  Date | null
  daysUntilTrialEnd: number | null
  employeeCap:       number | null  // null = ilimitado
}

const EMPTY: SubscriptionStatus = {
  hasActiveAccess:   false,
  isTrialing:        false,
  isActive:          false,
  status:            null,
  plan:              null,
  trialEnd:          null,
  currentPeriodEnd:  null,
  daysUntilTrialEnd: null,
  employeeCap:       null,
}

/**
 * Busca o status da assinatura de uma empresa.
 * Retorna estrutura util para gates e UI.
 */
export async function getSubscriptionStatus(companyId: string): Promise<SubscriptionStatus> {
  if (!companyId) return EMPTY

  const sub = await prismaAny.subscription.findUnique({
    where: { companyId },
  })

  if (!sub) return EMPTY

  const status: StatusAssinatura = sub.status as StatusAssinatura
  const isTrialing = status === 'TRIALING'
  const isActive   = status === 'ACTIVE'

  // Se trial venceu mas o status ainda nao foi atualizado pelo webhook,
  // tratamos como nao-ativo aqui ate o webhook chegar.
  let effectiveAccess = isStatusAtivo(status)
  if (isTrialing && sub.trialEnd && new Date(sub.trialEnd).getTime() < Date.now()) {
    effectiveAccess = false
  }

  const planInfo = sub.plan && (PLANOS as Record<string, { employeeCap: number | null }>)[sub.plan]
  const employeeCap = planInfo ? planInfo.employeeCap : null

  let daysUntilTrialEnd: number | null = null
  if (isTrialing && sub.trialEnd) {
    const ms = new Date(sub.trialEnd).getTime() - Date.now()
    daysUntilTrialEnd = ms > 0 ? Math.ceil(ms / (1000 * 60 * 60 * 24)) : 0
  }

  return {
    hasActiveAccess:   effectiveAccess,
    isTrialing,
    isActive,
    status,
    plan:              sub.plan as PlanoKey,
    trialEnd:          sub.trialEnd ? new Date(sub.trialEnd) : null,
    currentPeriodEnd:  sub.currentPeriodEnd ? new Date(sub.currentPeriodEnd) : null,
    daysUntilTrialEnd,
    employeeCap,
  }
}

/**
 * Atalho conveniente: retorna boolean simples para gates rapidos.
 */
export async function hasActiveSubscription(companyId: string): Promise<boolean> {
  const s = await getSubscriptionStatus(companyId)
  return s.hasActiveAccess
}
