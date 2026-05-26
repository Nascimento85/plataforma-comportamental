'use client'

import { useState, useEffect, ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SignOutButton } from '@/components/ui/SignOutButton'
import Breadcrumb from '@/components/ui/Breadcrumb'
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
// Ícones — um ícone único por item (escaneabilidade)
// ─────────────────────────────────────────────────────────────────────────────

function NavIcon({ path }: { path: string }) {
  const icons: Record<string, ReactNode> = {
    // Início — casa
    dashboard: (
      <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
        <path d="M3 10.5L10 3.5L17 10.5V17H13V13H7V17H3V10.5Z"
          stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
    // Comportamentais — bússola
    behavioral: (
      <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
        <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M12.6 7.4L11 11L7.4 12.6L9 9Z"
          stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
    // Carreira — maleta
    career: (
      <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
        <rect x="3" y="7" width="14" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M7.5 7V5.8C7.5 5.3 7.9 5 8.4 5H11.6C12.1 5 12.5 5.3 12.5 5.8V7"
          stroke="currentColor" strokeWidth="1.5"/>
        <path d="M3 11H17" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    // Relacionamentos — coração
    relationships: (
      <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
        <path d="M10 16C10 16 3.5 12.2 3.5 7.8C3.5 5.7 5.1 4 7.1 4C8.4 4 9.5 4.7 10 5.8C10.5 4.7 11.6 4 12.9 4C14.9 4 16.5 5.7 16.5 7.8C16.5 12.2 10 16 10 16Z"
          stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
    // Arquétipos — 4 quadrados
    archetypes: (
      <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
        <rect x="3" y="3" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="11" y="3" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="3" y="11" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="11" y="11" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    // Minha Jornada — linha do tempo
    journey: (
      <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
        <path d="M6 3V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="6" cy="6" r="2" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="6" cy="14" r="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M10 6H16M10 14H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    // Candidatos — pessoa com +
    candidates: (
      <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
        <circle cx="8" cy="7" r="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M3 17C3 14.2 5.2 12 8 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M13 13.5H17M15 11.5V15.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    // Times — grupo de pessoas
    teams: (
      <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
        <circle cx="7.3" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="13.6" cy="8.4" r="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M3.3 16C3.3 13.2 5 11.5 7.3 11.5C9.6 11.5 11.3 13.2 11.3 16"
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M13 11.6C15 11.6 16.7 13.1 16.7 15.4"
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    // Relatórios — gráfico de barras
    reports: (
      <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
        <rect x="3.5" y="11" width="3.2" height="5.5" rx="0.6" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="8.4" y="6.5" width="3.2" height="10" rx="0.6" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="13.3" y="9" width="3.2" height="7.5" rx="0.6" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    // NR-1 / Compliance — escudo com check
    compliance: (
      <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
        <path d="M10 3L16 5.4V9.5C16 13 13.6 15.9 10 17C6.4 15.9 4 13 4 9.5V5.4L10 3Z"
          stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M7.6 9.8L9.2 11.4L12.5 8.1"
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    // Downloads — seta para baixo
    downloads: (
      <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
        <path d="M10 3V13M10 13L6 9M10 13L14 9"
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 15V16C3 16.55 3.45 17 4 17H16C16.55 17 17 16.55 17 16V15"
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    // Créditos — moeda
    credits: (
      <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
        <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M10 6.5v7M12 8A2.2 2.2 0 0010 7a2.2 2.2 0 000 4.4 2.2 2.2 0 010 4.4A2.2 2.2 0 018 14"
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    // Configurações — engrenagem
    settings: (
      <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
        <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M10 3V4M10 16V17M3 10H4M16 10H17M5.2 5.2L5.9 5.9M14.1 14.1L14.8 14.8M5.2 14.8L5.9 14.1M14.1 5.9L14.8 5.2"
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    // Admin — estrela
    admin: (
      <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
        <path d="M10 2L12 7H17L13 10.5L14.5 16L10 12.5L5.5 16L7 10.5L3 7H8L10 2Z"
          stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
    // Entrevista — clipboard com check
    interview: (
      <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
        <rect x="5" y="4" width="10" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M8 3.5h4v2H8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M7.5 10.5L9.5 12.5L13 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  }
  return <>{icons[path] ?? null}</>
}

// ─────────────────────────────────────────────────────────────────────────────
// Estrutura de navegação — 3 grupos, ~9 itens
// ─────────────────────────────────────────────────────────────────────────────

interface NavItem {
  href:    string
  label:   string
  iconKey: string
}

interface NavGroup {
  title: string | null   // null = sem cabeçalho (item solto no topo)
  items: NavItem[]
}

const NAV_GROUPS: NavGroup[] = [
  {
    title: null,
    items: [
      { href: '/dashboard', label: 'Início', iconKey: 'dashboard' },
    ],
  },
  {
    title: 'Testes',
    items: [
      { href: '/dashboard/behavioral',     label: 'Comportamentais', iconKey: 'behavioral'    },
      { href: '/dashboard/career',         label: 'Carreira',        iconKey: 'career'        },
      { href: '/dashboard/love-languages', label: 'Relacionamentos', iconKey: 'relationships' },
      { href: '/dashboard/archetypes',     label: 'Arquétipos',      iconKey: 'archetypes'    },
      { href: '/dashboard/journey',        label: 'Minha Jornada',   iconKey: 'journey'       },
    ],
  },
  {
    title: 'Empresa',
    items: [
      { href: '/dashboard/candidates',     label: 'Candidatos',       iconKey: 'candidates' },
      { href: '/dashboard/teams',          label: 'Times',            iconKey: 'teams'      },
      { href: '/dashboard/reports',        label: 'Relatórios',       iconKey: 'reports'    },
      { href: '/dashboard/compliance/nr1', label: 'NR-1 Psicossocial', iconKey: 'compliance' },
    ],
  },
  {
    title: 'Recursos',
    items: [
      { href: '/dashboard/downloads', label: 'Downloads', iconKey: 'downloads' },
      { href: '/dashboard/credits',   label: 'Créditos',  iconKey: 'credits'   },
    ],
  },
]

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
        'flex items-center gap-3 px-6 py-2.5 text-[14.5px] transition-all duration-200',
        'relative no-underline',
        isActive
          ? 'text-white bg-white/[0.08] font-semibold'
          : 'text-white/75 hover:text-white hover:bg-white/[0.05] font-medium',
      ].join(' ')}
    >
      {isActive && (
        <span
          className="absolute left-0 top-[20%] bottom-[20%] w-0.5 rounded-r"
          style={{ background: 'linear-gradient(135deg, #c9a84c, #d4943a)' }}
        />
      )}

      <span className={isActive ? 'opacity-100' : 'opacity-65'}>
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
// Sidebar content (compartilhado entre desktop + mobile)
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
      <div className="px-6 pb-5 pt-1 flex items-center gap-3 border-b border-white/[0.12] mb-1">
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
      <nav className="flex-1 overflow-y-auto py-1.5">
        {NAV_GROUPS.map((group, gi) => (
          <div key={group.title ?? `group-${gi}`}>
            {group.title && (
              <div className="px-6 pb-1.5 pt-3.5">
                <p className="text-[10.5px] font-sans uppercase tracking-[0.16em] text-white/45 font-bold">
                  {group.title}
                </p>
              </div>
            )}
            {group.items.map(item => (
              <SidebarNavLink
                key={item.href}
                href={item.href}
                label={item.label}
                iconKey={item.iconKey}
                onClick={onNavClick}
              />
            ))}
          </div>
        ))}

        {session.isAdmin && (
          <div>
            <div className="px-6 pb-1.5 pt-3.5 flex items-center justify-between">
              <p className="text-[10.5px] font-sans uppercase tracking-[0.16em] text-white/45 font-bold">
                Premium (beta)
              </p>
              <span className="text-[8.5px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded"
                    style={{ background: 'rgba(201,168,76,0.18)', color: '#d4b85c' }}>
                PRO
              </span>
            </div>
            <SidebarNavLink href="/dashboard/guia-entrevista" label="Guia de Entrevista" iconKey="interview" onClick={onNavClick} />
          </div>
        )}

        {session.isAdmin && (
          <div>
            <div className="px-6 pb-1.5 pt-3.5">
              <p className="text-[10.5px] font-sans uppercase tracking-[0.16em] text-white/45 font-bold">
                Admin
              </p>
            </div>
            <SidebarNavLink href="/admin" label="Painel Admin" iconKey="admin" onClick={onNavClick} />
          </div>
        )}
      </nav>

      {/* ── Separador dourado ── */}
      <div className="mx-5 h-px bg-gradient-to-r from-transparent via-white/[0.10] to-transparent" />

      {/* ── Footer usuário ── */}
      <div className="p-4 space-y-1">
        {/* Card do usuário — clicável, leva ao perfil */}
        <Link
          href="/dashboard/profile"
          onClick={onNavClick}
          className="flex items-center gap-2.5 p-2.5 rounded-xl transition-colors hover:bg-white/[0.06] no-underline"
        >
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0
                       font-serif text-sm font-medium text-white"
            style={{ background: 'linear-gradient(135deg, #c47a72, #c4633a)' }}
          >
            {initial}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[14px] font-semibold text-white truncate font-sans">
              {session.name}
            </div>
            {arch ? (
              <div className="text-[12px] font-display italic font-semibold" style={{ color: '#d4b85c' }}>
                {arch.emoji} {arch.label}
              </div>
            ) : (
              <div className="text-[12px] text-white/55 font-sans font-medium truncate">
                {session.email}
              </div>
            )}
          </div>
        </Link>

        {/* Ações da conta — sempre visíveis */}
        <div className="flex flex-col">
          <Link
            href="/dashboard/settings"
            onClick={onNavClick}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-[13px] font-medium
                       text-white/60 hover:text-white hover:bg-white/[0.06] transition-colors no-underline"
          >
            <span className="opacity-70"><NavIcon path="settings" /></span>
            Configurações
          </Link>
          <SignOutButton />
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
              width: '264px',
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
      <main className="flex-1 min-w-0 md:ml-60">
        <div className="pt-14 md:pt-0">
          <div
            className="mx-auto px-5 md:px-9 py-8"
            style={{ maxWidth }}
          >
            <Breadcrumb />
            {children}
          </div>
        </div>
      </main>

    </div>
  )
}
