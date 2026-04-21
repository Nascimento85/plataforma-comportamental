import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { SignOutButton } from '@/components/ui/SignOutButton'
import LogoBrand from '@/components/ui/LogoBrand'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession()
  if (!session) redirect('/login')

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <LogoBrand size="md" />
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          <NavLink href="/dashboard" label="Dashboard" icon="📊" />
          <NavLink href="/dashboard/assessments" label="Avaliações" icon="📋" />
          <NavLink href="/dashboard/credits" label="Créditos" icon="💳" />
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <div className="text-xs text-gray-500 mb-2 truncate">{session.name}</div>
          <div className="text-xs text-gray-400 mb-3 truncate">{session.email}</div>
          <SignOutButton />
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto px-6 py-8">{children}</div>
      </main>
    </div>
  )
}

function NavLink({ href, label, icon }: { href: string; label: string; icon: string }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-600
                 hover:bg-brand-50 hover:text-brand-700 transition-colors"
    >
      <span>{icon}</span>
      <span>{label}</span>
    </Link>
  )
}
