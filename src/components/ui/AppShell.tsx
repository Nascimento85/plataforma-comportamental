'use client'

import { useState, useEffect, ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SignOutButton } from '@/components/ui/SignOutButton'
import { archetypes, ArchetypeKey } from '@/components/ui/design-system/tokens'

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface AppShellSession {
  name: string
  email: string
  isAdmin?: boolean
  archetype?: ArchetypeKey  // arquétipo dominante do usuário (para exibir na sidebar)
  credits?: number          // créditos disponíveis (badge opcional)
}

interface AppShellProps {
  children: ReactNode
  session: AppShellSession
  /** Largura máxima da área de conteúdo (padrão: 1180px) */
  maxWidth?: string
}

// ─────────────────────────────────────────────────────────────────────────────
// Nav items config
// ─────────────────────────────────────────────────────────────────────────────

interface NavItem {
  href: string
  label: string
  icon: ReactNode
  badgeCount?: number
}

function NavIcon({ path }: { path: string }) {
  const icons: Record<string, ReactNode> = {
    dashboard: (
      <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
        <path d="M3 10.5L10 3.5L17 10.5V17H13V13H7V17H3V10.5Z"
          stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
    assessments: (
      <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
        <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M10 6V10L13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    archetypes: (
      <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
        <rect x="3" y="3" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="11" y="3" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="3" y="11" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="11" y="11" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    candidates: (
      <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
        <circle cx="8" cy="7" r="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M3 17C3 14.2 5.2 12 8 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="14" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M11 18H17M14 15V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    reports: (
      <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
        <path d="M4 5H16M4 10H16M4 15H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    credits: (
      <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
        <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M10 7v6M7.5 9.5A2.5 2.5 0 0110 7a2.5 2.5 0 012.5 2.5 2.5 2.5 0 01-2.5 2.5"
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    settings: (
      <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
        <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M10 3V4M10 16V17M3 10H4M16 10H17M5.2 5.2L5.9 5.9M14.1 14.1L14.8 14.8M5.2 14.8L5.9 14.1M14.1 5.9L14.8 5.2"
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    profile: (
      <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
        <circle cx="10" cy="7" r="3.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M3.5 17C3.5 13.96 6.46 11.5 10 11.5C13.54 11.5 16.5 13.96 16.5 17"
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    admin: (
      <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
        <path d="M10 2L12 7H17L13 10.5L14.5 16L10 12.5L5.5 16L7 10.5L3 7H8L10 2Z"
          stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
  }
  return <>{icons[path] ?? null}</>
}

// ─────────────────────────────────────────────────────────────────────────────
// NavLink
// ─────────────────────────────────────────────────────────────────────────────

function SidebarNavLink({
  href,
  label,
  iconKey,
  badge,
  onClick,
}: {
  href: string
  label: string
  iconKey: string
  badge?: number
  onClick?: () => void
}) {
  const pathname = usePathname()
  const isActive =
    href === '/dashboard'
      ? pathname === '/dashboard'
      : pathname.startsWith(href)

  return (
    <Link
      href={href}
      onClick={onClick}
      className={[
        'flex items-center gap-3 px-6 py-3 text-[15px] transition-all duration-200',
        'relative no-underline',
        isActive
          ? 'text-white bg-white/[0.08] font-semibold'
          : 'text-white/80 hover:text-white hover:bg-white/[0.05] font-medium',
      ].join(' ')}
    >
      {/* Active indicator */}
      {isActive && (
        <span
          className="absolute left-0 top-[20%] bottom-[20%] w-0.5 rounded-r"
          style={{ background: 'linear-gradient(135deg, #c9a84c, #d4943a)' }}
        />
      )}

      <span className={isActive ? 'opacity-100' : 'opacity-70'}>
        <NavIcon path={iconKey} />
      </span>

      <span className="flex-1">{label}</span>

      {badge !== undefined && badge > 0 && (
        <span className="bg-soul-terracota text-white text-[11px] font-bold px-2 py-0.5 rounded-full leading-none">
          {badge}
        </span>
      )}
    </Link>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Sidebar content (shared between desktop + mobile)
// ─────────────────────────────────────────────────────────────────────────────

function SidebarContent({
  session,
  onNavClick,
}: {
  session: AppShellSession
  onNavClick?: () => void
}) {
  const arch = session.archetype ? archetypes[session.archetype] : null
  const initial = session.name.trim().charAt(0).toUpperCase()

  return (
    <div className="flex flex-col h-full">

      {/* ── Logo ── */}
      <div className="px-6 pb-7 pt-1 flex items-center gap-3 border-b border-white/[0.12] mb-2">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0
                     font-serif text-xl font-bold text-soul-ink"
          style={{ background: 'linear-gradient(135deg, #c9a84c, #d4943a)' }}
        >
          Ψ
        </div>
        <div>
          <div className="font-serif text-[17px] font-semibold text-white leading-none mb-1">
            Psique
          </div>
          <div className="text-[11px] font-sans uppercase tracking-[0.14em] text-soul-gold font-bold">
            Mapa Comportamental
          </div>
        </div>
      </div>

      {/* ── Nav principal ── */}
      <nav className="flex-1 overflow-y-auto py-2">
        <div className="px-6 pb-2 pt-2">
          <p className="text-[11px] font-sans uppercase tracking-[0.16em] text-white/55 font-bold">
            Principal
          </p>
        </div>

        <SidebarNavLink href="/dashboard"              label="Dashboard"      iconKey="dashboard"   onClick={onNavClick} />
        <SidebarNavLink href="/dashboard/journey"      label="Minha Jornada"  iconKey="assessments" onClick={onNavClick} />

        <div className="px-6 pb-2 pt-4">
          <p className="text-[11px] font-sans uppercase tracking-[0.16em] text-white/55 font-bold">
            Avaliações
          </p>
        </div>

        <SidebarNavLink href="/dashboard/behavioral"     label="Comportamentais"  iconKey="assessments" onClick={onNavClick} />
        <SidebarNavLink href="/dashboard/career"         label="Carreira"         iconKey="reports"     onClick={onNavClick} />
        <SidebarNavLink href="/dashboard/love-languages" label="Linguagem do Amor" iconKey="reports"    onClick={onNavClick} />
        <SidebarNavLink href="/dashboard/archetypes"     label="Arquétipos"       iconKey="archetypes"  onClick={onNavClick} />

        <div className="px-6 pb-2 pt-4">
          <p className="text-[11px] font-sans uppercase tracking-[0.16em] text-white/55 font-bold">
            Gestão
          </p>
        </div>

        <SidebarNavLink href="/dashboard/candidates"   label="Candidatos"    iconKey="candidates"  onClick={onNavClick} />
        <SidebarNavLink href="/dashboard/teams"        label="Times"         iconKey="archetypes"  onClick={onNavClick} />
        <SidebarNavLink href="/dashboard/reports"      label="Relatórios"    iconKey="reports"     onClick={onNavClick} />

        <div className="px-6 pb-2 pt-4">
          <p className="text-[11px] font-sans uppercase tracking-[0.16em] text-white/55 font-bold">
            Conta
          </p>
        </div>

        <SidebarNavLink href="/dashboard/profile"      label="Meu Perfil"    iconKey="profile"     onClick={onNavClick} />
        <SidebarNavLink href="/dashboard/credits"      label="Créditos"      iconKey="credits"     onClick={onNavClick} />
        <SidebarNavLink href="/dashboard/settings"     label="Configurações" iconKey="settings"    onClick={onNavClick} />

        {session.isAdmin && (
          <>
            <div className="px-6 pb-2 pt-4">
              <p className="text-[11px] font-sans uppercase tracking-[0.16em] text-white/55 font-bold">
                Admin
              </p>
            </div>
            <SidebarNavLink href="/admin"              label="Painel Admin"   iconKey="admin"       onClick={onNavClick} />
          </>
        )}
      </nav>

      {/* ── Separador dourado ── */}
      <div className="mx-5 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

      {/* ── Footer usuário ── */}
      <div className="p-5">
        <div className="flex items-center gap-2.5 p-3 rounded-xl cursor-pointer transition-colors hover:bg-white/[0.05] group">
          {/* Avatar */}
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0
                       font-serif text-sm font-medium text-white"
            style={{ background: 'linear-gradient(135deg, #c47a72, #c4633a)' }}
          >
            {initial}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="text-[14px] font-semibold text-white truncate font-sans">
              {session.name}
            </div>
            {arch ? (
              <div
                className="text-[12px] font-display italic font-semibold"
                style={{ color: '#d4b85c' }}
              >
                {arch.emoji} {arch.label}
              </div>
            ) : (
              <div className="text-[12px] text-white/60 font-sans font-medium truncate">
                {session.email}
              </div>
            )}
          </div>

          {/* Sign out (aparece no hover) */}
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <SignOutButton />
          </div>
        </div>
      </div>

    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// AppShell principal
// ─────────────────────────────────────────────────────────────────────────────

export default function AppShell({ children, session, maxWidth = '1180px' }: AppShellProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  // Fecha ao redimensionar para desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Bloqueia scroll do body quando menu está aberto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--soul-cream)' }}>

      {/* ── Sidebar desktop ── */}
      <aside
        className="hidden md:flex flex-col fixed top-0 left-0 bottom-0 z-20"
        style={{
          width: 'var(--sidebar-width)',
          background: 'linear-gradient(180deg, #1c1a17 0%, #221e18 100%)',
        }}
      >
        {/* Linha dourada à direita */}
        <div
          className="absolute right-0 top-0 bottom-0 w-px"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(201,168,76,0.25) 30%, rgba(201,168,76,0.25) 70%, transparent)' }}
        />
        <SidebarContent session={session} />
      </aside>

      {/* ── Menu mobile overlay ── */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />
          <aside
            className="absolute left-0 top-0 bottom-0 flex flex-col shadow-soul-xl"
            style={{
              width: '260px',
              background: 'linear-gradient(180deg, #1c1a17 0%, #221e18 100%)',
            }}
          >
            <SidebarContent session={session} onNavClick={() => setMenuOpen(false)} />
          </aside>
        </div>
      )}

      {/* ── Header mobile ── */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-30 h-14 flex items-center px-4 gap-3 border-b border-soul-mist/60 bg-soul-cream/95 backdrop-blur-sm">
        <button
          onClick={() => setMenuOpen(true)}
          className="w-9 h-9 flex items-center justify-center rounded-xl text-soul-ink/60 hover:bg-soul-mist/60 transition-colors"
          aria-label="Abrir menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>

        {/* Logo inline mobile */}
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center font-serif text-base font-bold text-soul-ink"
            style={{ background: 'linear-gradient(135deg, #c9a84c, #d4943a)' }}
          >
            Ψ
          </div>
          <span className="font-serif text-base font-semibold text-soul-ink">Psique</span>
        </div>
      </header>

      {/* ── Conteúdo principal ── */}
      {/* md:ml-60 = 240px = var(--sidebar-width) */}
      <main className="flex-1 min-w-0 md:ml-60">
        <div className="pt-14 md:pt-0">
          <div
            className="mx-auto px-5 md:px-9 py-8"
            style={{ maxWidth }}
          >
            {children}
          </div>
        </div>
      </main>

    </div>
  )
}
