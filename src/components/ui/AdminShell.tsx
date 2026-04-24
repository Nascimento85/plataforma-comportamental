'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface Props {
  children: React.ReactNode
  session: { name: string; email: string }
}

function NavLink({ href, label, icon, onClick }: {
  href: string; label: string; icon: string; onClick?: () => void
}) {
  const pathname = usePathname()
  const isActive = pathname === href || (href !== '/admin' && pathname.startsWith(href))

  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-3 px-3 py-3 rounded-xl text-[15px] font-sans font-semibold transition-all duration-150"
      style={isActive ? {
        background: 'rgba(201,168,76,0.18)',
        color: '#e8c878',
        borderLeft: '3px solid #c9a84c',
        paddingLeft: '9px',
      } : {
        color: 'rgba(255,255,255,0.82)',
      }}
      onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,1)' }}
      onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.82)' }}
    >
      <span className="text-lg w-5 text-center flex-shrink-0">{icon}</span>
      <span>{label}</span>
    </Link>
  )
}

function SignOut() {
  async function handleSignOut() {
    await fetch('/api/auth/logout', { method: 'POST' })
    window.location.href = '/login'
  }
  return (
    <button
      onClick={handleSignOut}
      className="w-full text-left text-[13px] font-sans font-semibold transition-colors"
      style={{ color: 'rgba(255,255,255,0.65)' }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(212,148,58,1)' }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.65)' }}
    >
      Sair da conta
    </button>
  )
}

function SidebarContent({ session, onNavClick }: { session: Props['session']; onNavClick?: () => void }) {
  return (
    <div className="flex flex-col h-full">

      {/* Logo */}
      <div className="h-16 flex items-center px-5 flex-shrink-0"
           style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
               style={{ background: 'linear-gradient(135deg, #c9a84c, #d4943a)' }}>
            <svg viewBox="0 0 90 90" fill="none" className="w-4 h-4">
              <path d="M45 13L48.5 39.5L72 26L55.5 45L72 64L48.5 50.5L45 77L41.5 50.5L18 64L34.5 45L18 26L41.5 39.5Z"
                fill="rgba(255,255,255,0.3)" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
              <circle cx="45" cy="45" r="5" fill="white" opacity="0.9"/>
            </svg>
          </div>
          <div>
            <div className="text-base font-serif font-semibold text-white leading-none">Psique</div>
            <div className="text-[11px] font-sans uppercase tracking-widest mt-1 font-bold"
                 style={{ color: '#c9a84c' }}>Painel Admin</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        <div className="px-3 py-2 mb-1">
          <span className="text-[11px] font-sans font-bold uppercase tracking-[0.16em]"
                style={{ color: 'rgba(255,255,255,0.55)' }}>
            Administração
          </span>
        </div>
        <NavLink href="/admin" label="Visão geral" icon="📊" onClick={onNavClick} />
        <NavLink href="/admin/assessments" label="Todos os testes" icon="📋" onClick={onNavClick} />

        <div className="px-3 py-2 mt-3 mb-1">
          <span className="text-[11px] font-sans font-bold uppercase tracking-[0.16em]"
                style={{ color: 'rgba(255,255,255,0.55)' }}>
            Minha conta
          </span>
        </div>
        <NavLink href="/dashboard" label="Meu dashboard" icon="🏠" onClick={onNavClick} />
      </nav>

      {/* Footer */}
      <div className="p-4 flex-shrink-0" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="flex items-center gap-2.5 mb-3">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-soul-ink flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #c9a84c, #d4943a)' }}
          >
            {session.name.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <div className="text-sm font-semibold text-white truncate font-sans">{session.name}</div>
            <div className="text-[12px] font-medium truncate font-sans" style={{ color: 'rgba(255,255,255,0.62)' }}>
              {session.email}
            </div>
          </div>
        </div>
        <SignOut />
      </div>
    </div>
  )
}

export default function AdminShell({ children, session }: Props) {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 768) setMenuOpen(false) }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const sidebarBg: React.CSSProperties = {
    background: 'linear-gradient(180deg, #1c1a17 0%, #221e18 100%)',
    borderRight: '1px solid rgba(255,255,255,0.06)',
  }

  return (
    <div className="min-h-screen flex" style={{ background: '#f5f0e8' }}>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col fixed top-0 left-0 bottom-0 w-56 z-20" style={sidebarBg}>
        <SidebarContent session={session} />
      </aside>

      {/* Mobile overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-soul-ink/60 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-64 flex flex-col z-10" style={sidebarBg}>
            <SidebarContent session={session} onNavClick={() => setMenuOpen(false)} />
          </aside>
        </div>
      )}

      {/* Mobile header */}
      <header
        className="md:hidden fixed top-0 left-0 right-0 z-30 h-14 flex items-center px-4 gap-3"
        style={{ background: '#1c1a17', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <button
          onClick={() => setMenuOpen(true)}
          className="w-9 h-9 flex items-center justify-center rounded-lg transition-colors"
          style={{ color: 'rgba(255,255,255,0.6)' }}
          aria-label="Abrir menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
        <span className="font-serif font-semibold text-white text-base">Admin</span>
      </header>

      {/* Main content */}
      <main className="flex-1 md:ml-56 min-w-0">
        <div className="pt-14 md:pt-0">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
            {children}
          </div>
        </div>
      </main>

    </div>
  )
}
