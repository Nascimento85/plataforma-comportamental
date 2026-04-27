// ============================================================
// src/lib/passport.ts
// Helpers do Passaporte de Autoconhecimento
//
// REGRA-CHAVE
//   • TODO crédito NÃO-COMPRADO (bônus) expira em 7 dias
//     a partir do momento em que foi concedido.
//   • Cada concessão é um "lote" (BonusGrant) com seu próprio
//     expiresAt. Consumo é FIFO — gasta o lote que vence antes.
//   • Crédito PAGO (Stripe) NUNCA expira.
//   • Premium NÃO pode ser desbloqueado com bônus.
// ============================================================

import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'

// ─── Tabela de preços (créditos por teste) ─────────────────
export const TEST_PRICE: Record<string, number> = {
  COMBO_BUNDLE:           10,
  DISC:                    3,
  TEMPERAMENT:             2,
  ENNEAGRAM:               2,
  MBTI:                    2,
  CAREER_ANCHOR:           1,
  LOVE_LANGUAGES:          5,
  ARCHETYPE:               3,
  EMOTIONAL_INTELLIGENCE:  2,
  PREMIUM_REPORT:         10, // só com créditos PAGOS
}

// ─── Constantes do Passaporte ──────────────────────────────
export const PASSPORT_TTL_DAYS         = 7
export const WELCOME_BONUS_AMOUNT      = 4   // 4 créditos no cadastro
export const PROFILE_COMPLETE_AMOUNT   = 6   // +6 ao completar perfil
// Total potencial: 10 créditos, todos válidos por 7 dias.

// ─── Sources possíveis ────────────────────────────────────
export type BonusSource =
  | 'WELCOME_PASSPORT'
  | 'PROFILE_COMPLETE'
  | 'REFERRAL'
  | 'GIFT'
  | 'PROMO'

export type PassportStatus = 'ACTIVE' | 'EXPIRED' | 'CONSUMED' | 'INACTIVE'

// ============================================================
// API PRINCIPAL
// ============================================================

// ─── Concede um lote genérico de bônus ────────────────────
//
// Use este helper sempre que quiser dar créditos não-comprados:
//
//   await grantBonus(tx, companyId, 6, 'PROFILE_COMPLETE',
//     'Recompensa: perfil completo')
//
export async function grantBonus(
  tx: Prisma.TransactionClient,
  companyId: string,
  amount: number,
  source: BonusSource,
  description: string,
  ttlDays = PASSPORT_TTL_DAYS,
) {
  if (amount <= 0) throw new Error('amount precisa ser > 0')

  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + ttlDays)

  // Garante CreditBalance
  let cb = await tx.creditBalance.findUnique({ where: { companyId } })
  if (!cb) {
    cb = await tx.creditBalance.create({
      data: { companyId, balance: 0, bonusBalance: 0, passportStatus: 'INACTIVE' },
    })
  }

  // Cria o lote
  const grant = await tx.bonusGrant.create({
    data: {
      companyId,
      creditBalanceId: cb.id,
      source,
      amount,
      remaining: amount,
      expiresAt,
      description,
    },
  })

  // Atualiza cache
  const newBonus = cb.bonusBalance + amount
  const nextExp  = cb.bonusNextExpiresAt && cb.bonusNextExpiresAt < expiresAt
    ? cb.bonusNextExpiresAt
    : expiresAt

  await tx.creditBalance.update({
    where: { id: cb.id },
    data: {
      bonusBalance:       newBonus,
      bonusNextExpiresAt: nextExp,
      passportStatus:     'ACTIVE',
    },
  })

  // Histórico
  await tx.creditTransaction.create({
    data: {
      companyId,
      type:        'BONUS',
      source:      'BONUS',
      amount,
      description,
      expiresAt,
      grantId:     grant.id,
    },
  })

  return { grant, expiresAt, nextExpiresAt: nextExp }
}

// ─── Atalho para o bônus de cadastro ──────────────────────
export function grantWelcomePassport(tx: Prisma.TransactionClient, companyId: string) {
  return grantBonus(
    tx, companyId, WELCOME_BONUS_AMOUNT, 'WELCOME_PASSPORT',
    'Passaporte de Autoconhecimento — bônus de boas-vindas (7 dias)',
  )
}

// ─── Atalho para gamificação de perfil ────────────────────
export function grantProfileCompleteBonus(tx: Prisma.TransactionClient, companyId: string) {
  return grantBonus(
    tx, companyId, PROFILE_COMPLETE_AMOUNT, 'PROFILE_COMPLETE',
    'Recompensa: perfil completado (válido por 7 dias)',
  )
}

// ============================================================
// LEITURA
// ============================================================

export interface PassportState {
  total:  number
  paid:   number
  bonus:  number
  bonusNextExpiresAt: Date | null
  status: PassportStatus
  hoursRemaining: number | null
  // Detalhamento dos lotes ativos (UI pode mostrar "5 expiram em 3d, 2 em 6d")
  grants: Array<{ id: string; remaining: number; expiresAt: Date; source: BonusSource }>
}

export async function getPassportState(companyId: string): Promise<PassportState> {
  const cb = await prisma.creditBalance.findUnique({
    where: { companyId },
    include: {
      bonusGrants: {
        where: { remaining: { gt: 0 }, expiresAt: { gt: new Date() } },
        orderBy: { expiresAt: 'asc' },
      },
    },
  })

  if (!cb) {
    return { total: 0, paid: 0, bonus: 0, bonusNextExpiresAt: null, status: 'INACTIVE', hoursRemaining: null, grants: [] }
  }

  const now      = Date.now()
  const grants   = cb.bonusGrants
  const bonus    = grants.reduce((s, g) => s + g.remaining, 0)
  const nextExp  = grants[0]?.expiresAt ?? null
  const hoursRem = nextExp ? Math.max(0, Math.round((nextExp.getTime() - now) / 36e5)) : null

  // Resolve status correto na leitura (lazy correction)
  let status = cb.passportStatus as PassportStatus
  if (bonus === 0) {
    // sem lotes válidos
    if (cb.bonusBalance > 0) status = 'EXPIRED' // havia, expirou
    else if (status === 'ACTIVE') status = 'CONSUMED'
  } else {
    status = 'ACTIVE'
  }

  return {
    total:  cb.balance + bonus,
    paid:   cb.balance,
    bonus,
    bonusNextExpiresAt: nextExp,
    status,
    hoursRemaining: hoursRem,
    grants: grants.map(g => ({
      id: g.id, remaining: g.remaining, expiresAt: g.expiresAt, source: g.source as BonusSource,
    })),
  }
}

// ============================================================
// CONSUMO (FIFO — lote que vence antes vai primeiro)
// ============================================================

export class InsufficientCreditsError extends Error {
  constructor(public required: number, public available: number) {
    super(`Créditos insuficientes: necessário ${required}, disponível ${available}`)
    this.name = 'InsufficientCreditsError'
  }
}

export async function consumeCredits(
  companyId: string,
  amount: number,
  description: string,
): Promise<{ usedBonus: number; usedPaid: number; passportNowConsumed: boolean }> {
  if (amount <= 0) throw new Error('amount precisa ser positivo')

  return prisma.$transaction(async (tx) => {
    const cb = await tx.creditBalance.findUnique({
      where: { companyId },
      include: {
        bonusGrants: {
          where: { remaining: { gt: 0 }, expiresAt: { gt: new Date() } },
          orderBy: { expiresAt: 'asc' }, // FIFO
        },
      },
    })
    if (!cb) throw new InsufficientCreditsError(amount, 0)

    const bonusAvail = cb.bonusGrants.reduce((s, g) => s + g.remaining, 0)
    const total      = cb.balance + bonusAvail
    if (total < amount) throw new InsufficientCreditsError(amount, total)

    let need      = amount
    let usedBonus = 0
    let usedPaid  = 0

    // 1) Consome dos lotes (mais velho primeiro)
    for (const g of cb.bonusGrants) {
      if (need === 0) break
      const take = Math.min(g.remaining, need)

      await tx.bonusGrant.update({
        where: { id: g.id },
        data:  { remaining: { decrement: take } },
      })

      await tx.creditTransaction.create({
        data: {
          companyId,
          type:        'DEBIT',
          source:      'BONUS',
          amount:      -take,
          description: `${description} (Passaporte)`,
          grantId:     g.id,
        },
      })

      usedBonus += take
      need      -= take
    }

    // 2) Consome do saldo pago
    if (need > 0) {
      usedPaid = need
      await tx.creditTransaction.create({
        data: {
          companyId, type: 'DEBIT', source: 'PAID',
          amount: -usedPaid, description,
        },
      })
    }

    // 3) Atualiza cache
    const newPaid     = cb.balance - usedPaid
    const newBonus    = bonusAvail  - usedBonus
    const remaining   = await tx.bonusGrant.findFirst({
      where:   { companyId, remaining: { gt: 0 }, expiresAt: { gt: new Date() } },
      orderBy: { expiresAt: 'asc' },
      select:  { expiresAt: true },
    })
    const passportNowConsumed = bonusAvail > 0 && newBonus === 0

    await tx.creditBalance.update({
      where: { companyId },
      data: {
        balance:            newPaid,
        bonusBalance:       newBonus,
        bonusNextExpiresAt: remaining?.expiresAt ?? null,
        passportStatus:     newBonus > 0
          ? 'ACTIVE'
          : passportNowConsumed
            ? 'CONSUMED'
            : cb.passportStatus,
      },
    })

    return { usedBonus, usedPaid, passportNowConsumed }
  })
}

// ============================================================
// EXPIRAÇÃO (cron diário)
// ============================================================
export async function expireOverdueGrants(): Promise<{ expiredGrants: number; affectedCompanies: number }> {
  const now = new Date()

  const overdue = await prisma.bonusGrant.findMany({
    where: {
      remaining: { gt: 0 },
      expiresAt: { lte: now },
      expiredAt: null,
    },
    select: { id: true, companyId: true, remaining: true, source: true },
  })

  if (overdue.length === 0) return { expiredGrants: 0, affectedCompanies: 0 }

  const affected = new Set<string>()

  for (const g of overdue) {
    affected.add(g.companyId)
    await prisma.$transaction([
      prisma.bonusGrant.update({
        where: { id: g.id },
        data:  { remaining: 0, expiredAt: now },
      }),
      prisma.creditTransaction.create({
        data: {
          companyId:   g.companyId,
          type:        'EXPIRE',
          source:      'BONUS',
          amount:      -g.remaining,
          description: `Bônus expirado (${g.source}) — 7 dias`,
          grantId:     g.id,
        },
      }),
    ])
  }

  // Recalcula caches por empresa afetada
  for (const companyId of affected) {
    const stillActive = await prisma.bonusGrant.findMany({
      where:   { companyId, remaining: { gt: 0 }, expiresAt: { gt: now } },
      orderBy: { expiresAt: 'asc' },
      select:  { remaining: true, expiresAt: true },
    })
    const sumBonus = stillActive.reduce((s, g) => s + g.remaining, 0)
    const nextExp  = stillActive[0]?.expiresAt ?? null

    await prisma.creditBalance.update({
      where: { companyId },
      data: {
        bonusBalance:       sumBonus,
        bonusNextExpiresAt: nextExp,
        passportStatus:     sumBonus > 0
          ? 'ACTIVE'
          : 'EXPIRED', // tinha bônus, expiraram
      },
    })
  }

  return { expiredGrants: overdue.length, affectedCompanies: affected.size }
}

// ============================================================
// HELPER: pode pagar com bônus?
//   Premium e produtos especiais não aceitam bônus.
// ============================================================
export function canUseBonusFor(productKey: keyof typeof TEST_PRICE | 'PREMIUM_REPORT'): boolean {
  return productKey !== 'PREMIUM_REPORT'
}
