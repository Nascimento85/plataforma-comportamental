// ============================================================
// <CookieBanner /> — banner LGPD de consentimento de cookies
//
// Exibido no canto inferior em todas as páginas até que o usuário
// faça uma escolha. As preferências são salvas em localStorage.
//
// Conformidade LGPD (Lei 13.709/2018):
//   - Transparência: explica categorias e finalidades
//   - Consentimento livre: 3 opções claras (Aceitar/Rejeitar/Configurar)
//   - Opção de rejeição em local de fácil acesso
//   - Direito de revisão: link "Gerenciar cookies" no footer
// ============================================================

'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useCookieConsent, type CookieCategory } from '@/lib/cookie-consent'

export default function CookieBanner() {
  const { needsDecision, acceptAll, rejectAll, update } = useCookieConsent()
  const [expanded, setExpanded] = useState(false)
  const [hidden, setHidden]     = useState(true)
  const [prefs, setPrefs]       = useState({
    analytics:   false,
    marketing:   false,
    preferences: false,
  })

  // Esconde em renderizações de PDF / impressão / Puppeteer
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const isPrint = params.get('print') === '1'
    const isHeadless =
      /HeadlessChrome/i.test(navigator.userAgent) ||
      navigator.webdriver === true
    setHidden(isPrint || isHeadless)
  }, [])

  if (hidden) return null
  if (!needsDecision) return null

  function savePrefs() {
    update({
      necessary: true,
      analytics:   prefs.analytics,
      marketing:   prefs.marketing,
      preferences: prefs.preferences,
      version:     1, // override pelo writeConsent
    })
  }

  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies"
      className="fixed inset-x-0 bottom-0 z-[70] p-3 sm:p-4 pointer-events-none print:hidden"
    >
      <div
        className="max-w-3xl mx-auto rounded-2xl shadow-2xl pointer-events-auto"
        style={{
          background: '#ffffff',
          border: '1px solid rgba(28,26,23,0.12)',
        }}
      >
        {/* Cabeçalho compacto */}
        {!expanded && (
          <div className="p-5 sm:p-6">
            <div className="flex items-start gap-3 mb-3">
              <span className="text-2xl">🍪</span>
              <div className="flex-1">
                <h3 className="font-serif font-semibold text-base sm:text-lg text-soul-ink leading-snug">
                  Sua privacidade é importante pra gente
                </h3>
                <p className="text-[13px] sm:text-sm text-soul-ink/70 mt-1 leading-relaxed">
                  Usamos cookies para melhorar sua experiência, analisar tráfego e
                  personalizar conteúdo. Você pode aceitar, recusar ou configurar suas
                  preferências.{' '}
                  <Link
                    href="/politica-de-cookies"
                    className="underline font-medium text-soul-terracota hover:text-soul-ink"
                  >
                    Saiba mais
                  </Link>
                  .
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 mt-4">
              <button
                onClick={() => rejectAll()}
                className="flex-1 px-4 py-2.5 rounded-full text-sm font-semibold border border-soul-ink/15 text-soul-ink/80 hover:bg-soul-ink/5 transition-colors"
              >
                Recusar não-essenciais
              </button>
              <button
                onClick={() => setExpanded(true)}
                className="flex-1 px-4 py-2.5 rounded-full text-sm font-semibold border border-soul-ink/15 text-soul-ink/80 hover:bg-soul-ink/5 transition-colors"
              >
                Configurar
              </button>
              <button
                onClick={() => acceptAll()}
                className="flex-1 px-4 py-2.5 rounded-full text-sm font-semibold text-white shadow-terra hover:-translate-y-px transition-all"
                style={{ background: 'linear-gradient(135deg, #c4633a, #d4943a)' }}
              >
                Aceitar todos
              </button>
            </div>
          </div>
        )}

        {/* Painel de configuração avançada */}
        {expanded && (
          <div className="p-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif font-semibold text-base sm:text-lg text-soul-ink">
                Preferências de cookies
              </h3>
              <button
                onClick={() => setExpanded(false)}
                aria-label="Voltar"
                className="text-soul-ink/50 hover:text-soul-ink text-sm"
              >
                ← Voltar
              </button>
            </div>

            <div className="space-y-3 mb-5">
              <CategoryRow
                cat="necessary"
                label="Estritamente necessários"
                desc="Essenciais para login, segurança e funcionamento básico do site. Não podem ser desativados."
                checked={true}
                disabled
                onChange={() => {}}
              />
              <CategoryRow
                cat="analytics"
                label="Análise e desempenho"
                desc="Nos ajudam a entender como o site é usado (páginas mais vistas, tempo de carregamento) — sempre de forma agregada e anônima."
                checked={prefs.analytics}
                onChange={v => setPrefs(p => ({ ...p, analytics: v }))}
              />
              <CategoryRow
                cat="marketing"
                label="Marketing e remarketing"
                desc="Personalizam anúncios e mensagens em redes sociais (Instagram, Meta) para que você veja conteúdo mais relevante."
                checked={prefs.marketing}
                onChange={v => setPrefs(p => ({ ...p, marketing: v }))}
              />
              <CategoryRow
                cat="preferences"
                label="Preferências"
                desc="Lembram das suas escolhas como idioma e tema, evitando que você precise reconfigurar a cada visita."
                checked={prefs.preferences}
                onChange={v => setPrefs(p => ({ ...p, preferences: v }))}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => rejectAll()}
                className="flex-1 px-4 py-2.5 rounded-full text-sm font-semibold border border-soul-ink/15 text-soul-ink/80 hover:bg-soul-ink/5"
              >
                Apenas necessários
              </button>
              <button
                onClick={savePrefs}
                className="flex-1 px-4 py-2.5 rounded-full text-sm font-semibold text-white shadow-terra hover:-translate-y-px transition-all"
                style={{ background: 'linear-gradient(135deg, #c4633a, #d4943a)' }}
              >
                Salvar preferências
              </button>
            </div>

            <p className="text-[11px] text-soul-ink/50 mt-4 text-center">
              Você pode alterar suas escolhas a qualquer momento na{' '}
              <Link href="/politica-de-cookies" className="underline">
                Política de Cookies
              </Link>
              .
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Linha de categoria com toggle ──────────────────────────

function CategoryRow({
  label, desc, checked, disabled, onChange,
}: {
  cat:      CookieCategory
  label:    string
  desc:     string
  checked:  boolean
  disabled?: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-xl bg-soul-mist/20 border border-soul-mist/40">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-[14px] font-semibold text-soul-ink">{label}</p>
          {disabled && (
            <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-soul-ink/10 text-soul-ink/65">
              Sempre ativo
            </span>
          )}
        </div>
        <p className="text-[12px] text-soul-ink/65 mt-1 leading-snug">{desc}</p>
      </div>
      <label className={`relative inline-flex items-center cursor-pointer flex-shrink-0 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={e => onChange(e.target.checked)}
          className="sr-only peer"
        />
        <span className="w-10 h-5 bg-soul-ink/15 peer-checked:bg-soul-terracota rounded-full transition-colors relative">
          <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${checked ? 'translate-x-5' : ''}`} />
        </span>
      </label>
    </div>
  )
}
