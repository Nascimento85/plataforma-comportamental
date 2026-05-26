import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import AppShell from '@/components/ui/AppShell'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prismaAny = prisma as any

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession()
  if (!session) redirect('/login')

  // Busca o tipo da conta (PF ou PJ) — afeta o que aparece na sidebar
  const company = await prismaAny.company.findUnique({
    where:  { id: session.id },
    select: { type: true },
  })

  const enrichedSession = {
    ...session,
    accountType: (company?.type === 'PF' ? 'PF' : 'PJ') as 'PF' | 'PJ',
  }

  return (
    <AppShell session={enrichedSession}>
      {children}
    </AppShell>
  )
}
