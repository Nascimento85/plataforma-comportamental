import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import AppShell from '@/components/ui/AppShell'
import BackButton from '@/components/ui/BackButton'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prismaAny = prisma as any

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession()
  if (!session) redirect('/login')

  // Tipo da conta (PF/PJ) + avaliações pendentes (badge de Candidatos na sidebar)
  const [company, pendingCount] = await Promise.all([
    prismaAny.company.findUnique({
      where:  { id: session.id },
      select: { type: true },
    }),
    prisma.assessment.count({
      where: { companyId: session.id, status: { in: ['PENDING', 'SENT'] } },
    }),
  ])

  const enrichedSession = {
    ...session,
    accountType: (company?.type === 'PF' ? 'PF' : 'PJ') as 'PF' | 'PJ',
    pendingCount,
  }

  return (
    <AppShell session={enrichedSession}>
      {children}
      <BackButton />
    </AppShell>
  )
}
