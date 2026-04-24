import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import AppShell from '@/components/ui/AppShell'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession()
  if (!session) redirect('/login')

  return (
    <AppShell session={session}>
      {children}
    </AppShell>
  )
}
