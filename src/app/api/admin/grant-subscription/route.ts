// ============================================================
// POST   /api/admin/grant-subscription  → libera/concede premium manual
// DELETE /api/admin/grant-subscription  → revoga premium manual
//
// Apenas admins. Cria/atualiza Subscription com source=MANUAL e
// status=ACTIVE no plano informado (default: PROFISSIONAL).
// Validade padrao: 5 anos (renovavel via novo POST).
// ============================================================

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/session'
import type { PlanoKey } from '@/lib/subscription/plans'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prismaAny = prisma as any

const PLANOS_VALIDOS: PlanoKey[] = ['ESSENCIAL', 'PROFISSIONAL', 'ENTERPRISE']

interface GrantBody {
  companyId?: string
  plan?:      PlanoKey
  anos?:      number  // duracao em anos (default 5)
  validoAte?: string  // data de expiracao explicita (YYYY-MM-DD), tem prioridade sobre anos
}

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session?.id) return NextResponse.json({ error: 'Nao autorizado.' }, { status: 401 })
  if (!session.isAdmin) return NextResponse.json({ error: 'Apenas admins.' }, { status: 403 })

  let body: GrantBody
  try { body = await req.json() } catch { return NextResponse.json({ error: 'JSON invalido.' }, { status: 400 }) }

  const companyId = (body.companyId ?? '').trim()
  if (!companyId) return NextResponse.json({ error: 'companyId obrigatorio.' }, { status: 400 })

  const plan: PlanoKey = body.plan && PLANOS_VALIDOS.includes(body.plan) ? body.plan : 'PROFISSIONAL'
  const anos = Math.max(1, Math.min(20, body.anos ?? 5))

  // Confirma que a empresa existe
  const empresa = await prismaAny.company.findUnique({
    where:  { id: companyId },
    select: { id: true, email: true, name: true },
  })
  if (!empresa) return NextResponse.json({ error: 'Empresa nao encontrada.' }, { status: 404 })

  const now = new Date()
  let periodEnd: Date
  if (body.validoAte) {
    const d = new Date(body.validoAte)
    if (isNaN(d.getTime())) return NextResponse.json({ error: 'Data de validade invalida.' }, { status: 400 })
    d.setHours(23, 59, 59, 999) // vale o dia inteiro informado
    periodEnd = d
  } else {
    periodEnd = new Date(now.getTime() + anos * 365 * 24 * 60 * 60 * 1000)
  }

  const data = {
    companyId,
    plan,
    status:             'ACTIVE',
    source:             'MANUAL',
    currentPeriodStart: now,
    currentPeriodEnd:   periodEnd,
    trialStart:         null,
    trialEnd:           null,
    canceledAt:         null,
    stripeCustomerId:     null,
    stripeSubscriptionId: null,
  }

  const existing = await prismaAny.subscription.findUnique({ where: { companyId } })
  const sub = existing
    ? await prismaAny.subscription.update({ where: { id: existing.id }, data })
    : await prismaAny.subscription.create({ data })

  return NextResponse.json({
    ok:        true,
    empresa:   { id: empresa.id, email: empresa.email, name: empresa.name },
    plan:      sub.plan,
    status:    sub.status,
    validoAte: sub.currentPeriodEnd,
    message:   `Premium manual concedido para "${empresa.name}" no plano ${plan} ate ${new Date(sub.currentPeriodEnd).toLocaleDateString('pt-BR')}.`,
  })
}

export async function DELETE(req: NextRequest) {
  const session = await getSession()
  if (!session?.id) return NextResponse.json({ error: 'Nao autorizado.' }, { status: 401 })
  if (!session.isAdmin) return NextResponse.json({ error: 'Apenas admins.' }, { status: 403 })

  const { searchParams } = new URL(req.url)
  const companyId = searchParams.get('companyId')
  if (!companyId) return NextResponse.json({ error: 'companyId obrigatorio.' }, { status: 400 })

  const existing = await prismaAny.subscription.findUnique({ where: { companyId } })
  if (!existing) return NextResponse.json({ ok: true, removed: false, message: 'Empresa nao tinha assinatura.' })

  // Se foi Stripe (paga real), nao apaga aqui — recusa
  if (existing.source === 'STRIPE') {
    return NextResponse.json(
      { error: 'Esta assinatura veio do Stripe e nao pode ser revogada manualmente. Use o portal do Stripe.' },
      { status: 409 },
    )
  }

  await prismaAny.subscription.delete({ where: { id: existing.id } })
  return NextResponse.json({ ok: true, removed: true, message: 'Premium manual revogado.' })
}
