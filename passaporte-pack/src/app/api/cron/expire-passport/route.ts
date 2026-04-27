// ============================================================
// /api/cron/expire-passport
// Cron diário (Vercel/Railway) — zera bônus expirados.
//
// Configurar Vercel cron em vercel.json:
//   {
//     "crons": [
//       { "path": "/api/cron/expire-passport",  "schedule": "0 3 * * *"  },
//       { "path": "/api/cron/process-outreach", "schedule": "*/15 * * * *" }
//     ]
//   }
//
// Segurança: protegido por Bearer Token (CRON_SECRET).
// ============================================================

import { NextRequest, NextResponse } from 'next/server'
import { expireOverdueGrants } from '@/lib/passport'
import { schedulePassportExpiredOutreach } from '@/lib/manychat'
import { prisma } from '@/lib/prisma'

export const runtime  = 'nodejs'
export const dynamic  = 'force-dynamic'

export async function GET(request: NextRequest) {
  // --- Auth ---
  const auth = request.headers.get('authorization')
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // --- Snapshot das empresas que terão bônus expirados (p/ outreach) ---
  const willExpire = await prisma.bonusGrant.findMany({
    where: {
      remaining: { gt: 0 },
      expiresAt: { lte: new Date() },
      expiredAt: null,
    },
    select: { companyId: true },
    distinct: ['companyId'],
  })

  // --- Expira lotes vencidos ---
  const result = await expireOverdueGrants()

  // --- Agenda outreach (cupom 50% via ManyChat) p/ quem ficou com saldo bônus 0 ---
  for (const { companyId } of willExpire) {
    const cb = await prisma.creditBalance.findUnique({ where: { companyId }, select: { bonusBalance: true } })
    if ((cb?.bonusBalance ?? 0) === 0) {
      await schedulePassportExpiredOutreach(companyId).catch(err => {
        console.error('[cron expire-passport] schedule outreach failed', companyId, err)
      })
    }
  }

  return NextResponse.json({ ok: true, ...result })
}
