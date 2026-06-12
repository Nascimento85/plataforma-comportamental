'use client'

// ============================================================
// Breadcrumb global do dashboard.
// Deriva o trail automaticamente do pathname — nenhuma página
// precisa ser editada. Esconde na raiz /dashboard.
// ============================================================

import Link from 'next/link'
import { usePathname } from 'next/navigation'

// Rótulos amigáveis por segmento de URL
const SEGMENT_LABELS: Record<string, string> = {
  dashboard:        'Início',
  behavioral:       'Comportamentais',
  career:           'Carreira',
  'love-languages': 'Relacionamentos',
  archetypes:       'Arquétipos',
  journey:          'Minha Jornada',
  candidates:       'Candidatos',
  teams:            'Times',
  reports:          'Relatórios',
  compliance:       'Compliance',
  nr1:              'NR-1 Psicossocial',
  nova:             'Nova coleta',
  downloads:        'Downloads',
  credits:          'Créditos',
  profile:          'Meu Perfil',
  settings:         'Configurações',
  assessments:      'Avaliações',
}

// Segmentos que são apenas agrupadores de URL — não têm página própria,
// então aparecem como rótulo no breadcrumb mas não viram link (evita 404).
const NON_NAVIGABLE = new Set(['compliance'])

// Detecta segmentos que são IDs (cuid/uuid/hash) — não viram link
function isDynamicId(seg: string): boolean {
  // cuid (c + 24 alfanum), uuid, ou qualquer string longa sem espaço
  return /^c[a-z0-9]{20,}$/i.test(seg) || /^[0-9a-f]{8}-[0-9a-f]{4}/i.test(seg) || seg.length >= 20
}

function labelFor(seg: string): string {
  if (isDynamicId(seg)) return 'Detalhe'
  return SEGMENT_LABELS[seg] ?? seg.charAt(0).toUpperCase() + seg.slice(1)
}

export default function Breadcrumb() {
  const pathname = usePathname()

  // Não mostra na raiz do dashboard nem fora dele
  if (!pathname || !pathname.startsWith('/dashboard')) return null
  if (pathname === '/dashboard') return null

  const segments = pathname.split('/').filter(Boolean) // ['dashboard', 'compliance', 'nr1', ...]

  // Monta os crumbs com href acumulado
  const crumbs = segments.map((seg, i) => {
    const href = '/' + segments.slice(0, i + 1).join('/')
    return {
      label:         labelFor(seg),
      href,
      isLast:        i === segments.length - 1,
      isId:          isDynamicId(seg),
      isNonNavigable: NON_NAVIGABLE.has(seg),
    }
  })

  return (
    <nav aria-label="Breadcrumb" className="mb-5 nr1-print-hide">
      <ol className="flex flex-wrap items-center gap-1.5 text-[13.5px] font-medium">
        {crumbs.map((c, i) => (
          <li key={c.href} className="flex items-center gap-1.5">
            {i > 0 && (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"
                   className="text-soul-ink/62 flex-shrink-0">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            )}
            {c.isLast || c.isId || c.isNonNavigable ? (
              <span className={c.isLast ? 'text-soul-ink font-semibold' : 'text-soul-ink/72'}>
                {c.label}
              </span>
            ) : (
              <Link
                href={c.href}
                className="text-soul-ink/72 hover:text-soul-terracota transition-colors"
              >
                {c.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
