// ============================================================
// /api/cron/process-outreach
// Cron a cada 15 min — processa ScheduledOutreach pendentes.
// ============================================================

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { deliverOutreach } from '@/lib/manychat'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const BATCH_SIZE = 25

export async function GET(request: NextRequest) {
  const auth = request.headers.get('authorization')
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const due = await prisma.scheduledOutreach.findMany({
    where: { status: 'PENDING', scheduledFor: { lte: new Date() } },
    orderBy: { scheduledFor: 'asc' },
    take: BATCH_SIZE,
  })

  const results = await Promise.allSettled(due.map(o => deliverOutreach(o.id)))

  const sent   = results.filter(r => r.status === 'fulfilled' && r.value.ok).length
  const failed = results.length - sent

  return NextResponse.json({ ok: true, processed: results.length, sent, failed })
}
