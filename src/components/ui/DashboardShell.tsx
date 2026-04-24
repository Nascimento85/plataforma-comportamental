'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SignOutButton } from '@/components/ui/SignOutButton'
import LogoBrand from '@/components/ui/LogoBrand'

interface Props {
  children: React.ReactNode
  session: { name: string; email: string; isAdmin?: boolean }
}

function NavLink({ href, label, icon, onClick }: { href: string; label: string; icon: string; onClick?: () => void }) {
  const pathname = usePathname()
  const isActive = pathname === href || (href !== '/dashboard' && pathname.startsWith(href))

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-colors ${
        isActive
          ? 'bg-brand-50 text-brand-700'
          : 'text-gray-600 hover:bg-gray-50 hover:text-brand-700'
      }`}
    >
      <span className="text-xl">{icon}</span>
      <span>{label}</span>
    </Link>
  )
}

function SidebarContent({ session, onNavClick }: { session: Props['session']; onNavClick?: () => void }) {
  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="h-16 flex items-center px-5 border-b border-gray-200 flex-shrink-0">
        <LogoBrand size="md" />
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        <NavLink href="/dashboard" label="Dashboard" icon="📊" onClick={onNavClick} />
        <NavLink href="/dashboard/assessments" label="Avaliações" icon="📋" onClick={onNavClick} />
        <NavLink href="/dashboard/credits" label="Créditos" icon="💳" onClick={onNavClick} />
        {session.isAdmin && (
          <>
            <div className="pt-4 pb-1 px-4">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Admin</p>
            </div>
            <NavLink href="/admin" label="Painel Admin" icon="🛡️" onClick={onNavClick} />
          </>
        )}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 flex-shrink-0">
        <p className="text-sm font-semibold text-gray-700 truncate">{session.name}</p>
        <p className="text-xs text-gray-400 mt-0.5 mb-3 truncate">{session.email}</p>
        <SignOutButton />
      </div>
    </div>
  )
}

export default function DashboardShell({ children, session }: Props) {
  const [menuOpen, setMenuOpen] = useState(false)

  // Fecha o menu ao redimensionar para desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Bloqueia scroll do body quando menu mobile está aberto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <div className="min-h-screen flex bg-gray-50">

      {/* ── Sidebar desktop (fixa, visível apenas em md+) ── */}
      <aside className="hidden md:flex flex-col fixed top-0 left-0 bottom-0 w-64 bg-white border-r border-gray-200 z-20">
        <SidebarContent session={session} />
      </aside>

      {/* ── Menu mobile overlay ── */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />
          {/* Drawer */}
          <aside className="absolute left-0 top-0 bottom-0 w-72 bg-white shadow-2xl flex flex-col">
            <SidebarContent session={session} onNavClick={() => setMenuOpen(false)} />
          </aside>
        </div>
      )}

      {/* ── Header mobile (fixo no topo, visível apenas em < md) ── */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-30 h-14 bg-white border-b border-gray-200 flex items-center px-4 gap-3">
        <button
          onClick={() => setMenuOpen(true)}
          className="w-10 h-10 flex items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
          aria-label="Abrir menu"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        <LogoBrand size="sm" />
      </header>

      {/* ── Conteúdo principal ── */}
      <main className="flex-1 md:ml-64 min-w-0">
        {/* Espaço para o header mobile */}
        <div className="pt-14 md:pt-0">
          <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-8">
            {children}
          </div>
        </div>
      </main>

    </div>
  )
}
