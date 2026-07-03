'use client'

// ============================================================
// Catálogo de testes — filtro por categoria + busca (client).
// Cards no mesmo padrão das antigas páginas de categoria.
// ============================================================

import { useMemo, useState } from 'react'
import Link from 'next/link'
import NewAssessmentButton from '../assessments/NewAssessmentButton'
import SelfStartTestButton from '../assessments/SelfStartTestButton'
import {
  TEST_CATALOG,
  CATEGORY_META,
  type CatalogCategory,
  type CatalogTest,
} from '@/content/test-catalog'

const CATEGORIES = Object.keys(CATEGORY_META) as CatalogCategory[]

function ctaLabel(accountType: 'PF' | 'PJ', testShort: string): string {
  return accountType === 'PF' ? `Fazer teste ${testShort}` : `Enviar teste ${testShort}`
}

function normalize(s: string): string {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
}

function TestCard({ test, accountType }: { test: CatalogTest; accountType: 'PF' | 'PJ' }) {
  const cat = CATEGORY_META[test.category]

  return (
    <article className="soul-panel flex flex-col gap-4 h-full relative overflow-hidden">
      <div
        className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-[0.08] pointer-events-none"
        style={{ background: `radial-gradient(circle, ${test.color}, transparent)`, transform: 'translate(30%,-30%)' }}
      />

      <div className="flex items-start gap-3 relative">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl font-bold flex-shrink-0"
          style={{ background: `${test.color}22`, color: test.color }}
        >
          {test.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-0.5">
            <span className="text-[11.5px] font-bold uppercase tracking-widest text-soul-ink/70">
              {cat.label}
            </span>
            {test.featured && (
              <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[11.5px] font-bold"
                    style={{ background: 'rgba(212,184,92,0.2)', color: '#e8c878' }}>
                ✦ Carro chefe
              </span>
            )}
          </div>
          <p className="font-serif text-xl font-semibold text-soul-ink leading-tight">{test.name}</p>
          <p className="text-[14px] font-semibold text-soul-ink/88 italic mt-0.5">{test.tagline}</p>
        </div>
      </div>

      <div className="relative">
        <p className="text-[13px] font-bold uppercase tracking-widest text-soul-ink/80 mb-1">Pilares</p>
        <p className="text-[14px] font-semibold text-soul-ink">{test.pillar}</p>
      </div>

      <p className="text-[15px] text-soul-ink font-medium leading-relaxed relative">
        {test.description}
      </p>

      <div className="relative">
        <p className="text-[13px] font-bold uppercase tracking-widest text-soul-terracota mb-1">Aplicação</p>
        <p className="text-[14px] text-soul-ink/90 font-medium leading-snug">{test.application}</p>
      </div>

      <div className="space-y-1.5 relative">
        {test.bullets.map((b, i) => (
          <div key={i} className="flex items-start gap-2">
            <span className="mt-1 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 text-white text-[12px] font-bold"
                  style={{ background: test.color }}>✓</span>
            <p className="text-[14px] text-soul-ink font-semibold leading-snug">{b}</p>
          </div>
        ))}
      </div>

      <div className="relative pt-3 mt-auto border-t border-soul-mist/60 space-y-3">
        <div>
          <p className="text-[12px] font-bold uppercase tracking-widest text-soul-ink/72">Investimento</p>
          <p className="font-serif text-lg font-bold text-soul-ink leading-none">
            {test.credits} <span className="text-[13.5px] text-soul-ink/75 font-medium">crédito{test.credits > 1 ? 's' : ''}</span>
          </p>
        </div>
        <div className="space-y-2">
          <SelfStartTestButton testType={test.testType} label={`Fazer ${test.short} agora`} fullWidth />
          <NewAssessmentButton initialTestType={test.testType} variant="secondary" fullWidth>
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
              <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
            </svg>
            {ctaLabel(accountType, test.short)}
          </NewAssessmentButton>
        </div>
      </div>
    </article>
  )
}

export default function CatalogClient({
  accountType,
  initialCategory,
}: {
  accountType: 'PF' | 'PJ'
  initialCategory: CatalogCategory | null
}) {
  const [category, setCategory] = useState<CatalogCategory | null>(initialCategory)
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = normalize(query.trim())
    return TEST_CATALOG.filter((t) => {
      if (category && t.category !== category) return false
      if (!q) return true
      return normalize(`${t.name} ${t.short} ${t.tagline} ${t.pillar} ${t.description}`).includes(q)
    })
  }, [category, query])

  return (
    <div className="space-y-5">

      {/* ── Filtros: tabs de categoria + busca ── */}
      <div className="flex flex-wrap items-center gap-2.5">
        <button
          onClick={() => setCategory(null)}
          className={[
            'px-4 py-2 rounded-full text-[14px] font-bold transition-all',
            category === null
              ? 'text-soul-ink'
              : 'text-soul-ink/75 hover:text-soul-ink',
          ].join(' ')}
          style={category === null
            ? { background: 'linear-gradient(135deg, #c9a84c, #d4943a)', color: '#14100a' }
            : { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)' }}
        >
          Todos ({TEST_CATALOG.length})
        </button>
        {CATEGORIES.map((c) => {
          const count = TEST_CATALOG.filter((t) => t.category === c).length
          const active = category === c
          return (
            <button
              key={c}
              onClick={() => setCategory(active ? null : c)}
              className={[
                'px-4 py-2 rounded-full text-[14px] font-bold transition-all',
                active ? '' : 'text-soul-ink/75 hover:text-soul-ink',
              ].join(' ')}
              style={active
                ? { background: 'linear-gradient(135deg, #c9a84c, #d4943a)', color: '#14100a' }
                : { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)' }}
            >
              {CATEGORY_META[c].emoji} {CATEGORY_META[c].label} ({count})
            </button>
          )
        })}

        <div className="relative ml-auto w-full sm:w-64">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar teste…"
            className="w-full px-4 py-2.5 rounded-full text-[14px] font-medium text-soul-ink
                       bg-soul-parchment border border-white/10 outline-none
                       focus:border-soul-gold/50 placeholder:text-soul-ink/50 transition-colors"
          />
        </div>
      </div>

      {/* ── Link de aprofundamento da categoria ativa ── */}
      {category && (
        <p className="text-[14px] text-soul-ink/80 font-medium">
          Quer a apresentação completa da categoria?{' '}
          <Link href={CATEGORY_META[category].href}
                className="font-bold no-underline" style={{ color: '#d4b35e' }}>
            Abrir página de {CATEGORY_META[category].label} →
          </Link>
        </p>
      )}

      {/* ── Grid ── */}
      {filtered.length === 0 ? (
        <div className="soul-panel text-center py-14">
          <div className="text-4xl mb-3">🔍</div>
          <p className="font-serif text-xl font-semibold text-soul-ink mb-1">
            Nenhum teste encontrado
          </p>
          <p className="text-[15px] text-soul-ink/80 font-medium">
            Tente outro termo ou limpe o filtro de categoria.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((t) => (
            <TestCard key={t.testType} test={t} accountType={accountType} />
          ))}
        </div>
      )}
    </div>
  )
}
