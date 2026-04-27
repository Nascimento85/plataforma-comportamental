// ============================================================
// src/lib/passport-triggers.ts
// Camada 5 — gatilhos que agendam o outreach do ManyChat
//
// Chame estes helpers nos pontos certos do fluxo:
//   • completeAssessment()  → onAssessmentCompleted()
//   • consumeCredits()      → no fim, se total bônus chegou a 0
// ============================================================

import { prisma } from '@/lib/prisma'
import {
  scheduleZeroBalanceOutreach,
  scheduleFirstTestOutreach,
} from '@/lib/manychat'

// Disparado após um assessment ficar COMPLETED (lib/engines/result.ts)
export async function onAssessmentCompleted(assessmentId: string) {
  const a = await prisma.assessment.findUnique({
    where: { id: assessmentId },
    select: { companyId: true, completedAt: true },
  })
  if (!a) return

  // É o primeiro completed desta empresa?
  const completedCount = await prisma.assessment.count({
    where: { companyId: a.companyId, status: 'COMPLETED' },
  })
  if (completedCount === 1) {
    await scheduleFirstTestOutreach(a.companyId).catch(err => {
      console.error('[trigger] firstTest', err)
    })
  }
}

// Disparado após consumeCredits — se bônus zerou pelo uso (e não pela expiração)
export async function onPassportConsumed(companyId: string) {
  await scheduleZeroBalanceOutreach(companyId).catch(err => {
    console.error('[trigger] zeroBalance', err)
  })
}
