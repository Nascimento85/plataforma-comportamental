// ============================================================
// /dashboard/gestao-times/[id]/avaliacao-lider
// Resultado agregado da Avaliação de Liderança + gestão de
// convites. Acesso premium (mesmo gate da Matriz).
// ============================================================

import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { getSession } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import { hasActiveSubscription } from '@/lib/subscription/check'
import AvaliacaoLiderClient from './AvaliacaoLiderClient'

export const metadata: Metadata = { title: 'Avaliação do Líder' }
export const dynamic = 'force-dynamic'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prismaAny = prisma as any

export default async function AvaliacaoLiderPage({ params }: { params: { id: string } }) {
  const session = await getSession()
  if (!session?.id) redirect('/login')

  const subscriptionOk = await hasActiveSubscription(session.id)
  if (!session.isAdmin && !subscriptionOk) redirect('/dashboard/gestao-times')

  const team = await prismaAny.talentTeam.findUnique({
    where: { id: params.id },
    select: { id: true, nome: true, companyId: true, liderNome: true, liderEmail: true },
  })
  if (!team || team.companyId !== session.id) return notFound()

  return (
    <AvaliacaoLiderClient
      teamId={team.id}
      teamNome={team.nome}
      liderNomeInicial={team.liderNome}
      liderEmailInicial={team.liderEmail}
    />
  )
}
