import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import AdminShell from '@/components/ui/AdminShell'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession()
  if (!session) redirect('/login')
  if (!session.isAdmin) redirect('/dashboard')

  return (
    <AdminShell session={session}>
      {children}
    </AdminShell>
  )
}
