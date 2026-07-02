// ============================================================
// /dashboard/gestao-times/[id]/team-build
// Team Build: mapa de calor + pontos cegos + manual + dinâmicas.
// ============================================================

import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { getSession } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import { hasActiveSubscription } from '@/lib/subscription/check'
import TeamBuildClient from './TeamBuildClient'
import { analisarTime } from '@/content/gestao-times/team-build'

export const metadata: Metadata = { title: 'Team Build' }
export const dynamic = 'force-dynamic'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prismaAny = prisma as any

export default async function TeamBuildPage({ params }: { params: { id: string } }) {
  const session = await getSession()
  if (!session?.id) redirect('/login')
  const subscriptionOk = await hasActiveSubscription(session.id)
  if (!session.isAdmin && !subscriptionOk) redirect('/dashboard/gestao-times')

  const team = await prismaAny.talentTeam.findUnique({
    where: { id: params.id },
    include: { members: { orderBy: { createdAt: 'asc' } } },
  })
  if (!team || team.companyId !== session.id) return notFound()

  type RawMember = { id: string; nome: string; cargo: string | null; perfilDisc: string | null }
  const members = (team.members as RawMember[]).map((m) => ({
    id: m.id, nome: m.nome, cargo: m.cargo, perfilDisc: m.perfilDisc,
  }))

  const analise = analisarTime(members.map((m) => m.perfilDisc))

  return (
    <TeamBuildClient
      teamId={team.id}
      teamNome={team.nome}
      faseTuckman={team.faseTuckman ?? null}
      members={members}
      analise={analise}
    />
  )
}
