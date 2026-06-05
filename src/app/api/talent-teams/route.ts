// ============================================================
// POST /api/talent-teams  — cria um novo time (Gestão de Times)
// Gate: assinatura PJ ativa OU admin.
// ============================================================

import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import { hasActiveSubscription } from '@/lib/subscription/check'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prismaAny = prisma as any

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session?.id) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 })
  }

  // Gate premium (admin sempre passa)
  const subscriptionOk = await hasActiveSubscription(session.id)
  if (!session.isAdmin && !subscriptionOk) {
    return NextResponse.json(
      { error: 'Recurso exclusivo de assinantes. Ative o trial de 7 dias em /dashboard/assinatura.', isPremiumOnly: true },
      { status: 403 },
    )
  }

  let body: { nome?: string; descricao?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'JSON inválido.' }, { status: 400 })
  }

  const nome = (body.nome ?? '').trim()
  if (nome.length < 2 || nome.length > 80) {
    return NextResponse.json({ error: 'Informe o nome do time (2 a 80 caracteres).' }, { status: 400 })
  }

  const team = await prismaAny.talentTeam.create({
    data: {
      companyId: session.id,
      nome,
      descricao: (body.descricao ?? '').trim().slice(0, 500) || null,
    },
  })

  return NextResponse.json({ id: team.id, nome: team.nome }, { status: 201 })
}
