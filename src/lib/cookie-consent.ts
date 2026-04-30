// ============================================================
// Cookie Consent — gestão de consentimento conforme LGPD
// ============================================================
// Estado é persistido em localStorage no client.
// Categorias:
//   - necessary  : sempre true (cookies essenciais p/ funcionamento)
//   - analytics  : medição de uso (PostHog, Plausible, GA, etc.)
//   - marketing  : Meta Pixel, ManyChat, remarketing
//   - preferences: idioma, tema (não usados hoje, mas pré-definidos)
// ============================================================

'use client'

import { useEffect, useState, useCallback } from 'react'

export type CookieCategory = 'necessary' | 'analytics' | 'marketing' | 'preferences'

export interface CookieConsent {
  necessary:   true                  // sempre true
  analytics:   boolean
  marketing:   boolean
  preferences: boolean
  /** Timestamp da decisão (ms) */
  decidedAt:   number
  /** Versão da política aceita — incrementar quando atualizar a Política */
  version:     number
}

export const COOKIE_POLICY_VERSION = 1
const STORAGE_KEY = 'mc:cookie-consent'

const DEFAULT_REJECT: CookieConsent = {
  necessary:   true,
  analytics:   false,
  marketing:   false,
  preferences: false,
  decidedAt:   0,
  version:     COOKIE_POLICY_VERSION,
}

const DEFAULT_ACCEPT_ALL: Omit<CookieConsent, 'decidedAt'> = {
  necessary:   true,
  analytics:   true,
  marketing:   true,
  preferences: true,
  version:     COOKIE_POLICY_VERSION,
}

// ─── Acesso ao localStorage ─────────────────────────────────

export function readConsent(): CookieConsent | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as CookieConsent
    // Se a versão da política mudou, reabre o banner
    if (parsed.version !== COOKIE_POLICY_VERSION) return null
    return parsed
  } catch {
    return null
  }
}

export function writeConsent(consent: Omit<CookieConsent, 'decidedAt'>): CookieConsent {
  const fullConsent: CookieConsent = {
    ...consent,
    necessary: true,
    decidedAt: Date.now(),
    version:   COOKIE_POLICY_VERSION,
  }
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fullConsent))
    // Dispara evento global pra outros componentes saberem
    window.dispatchEvent(new CustomEvent('mc:cookie-consent-changed', { detail: fullConsent }))
  }
  return fullConsent
}

export function clearConsent() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY)
    window.dispatchEvent(new CustomEvent('mc:cookie-consent-changed', { detail: null }))
  }
}

export function acceptAll() {
  return writeConsent(DEFAULT_ACCEPT_ALL)
}

export function rejectAll() {
  return writeConsent(DEFAULT_REJECT)
}

// ─── Hook React ─────────────────────────────────────────────

export function useCookieConsent() {
  const [consent, setConsent] = useState<CookieConsent | null>(null)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setConsent(readConsent())
    setHydrated(true)
    const onChange = (e: Event) => {
      const detail = (e as CustomEvent).detail as CookieConsent | null
      setConsent(detail)
    }
    window.addEventListener('mc:cookie-consent-changed', onChange)
    return () => window.removeEventListener('mc:cookie-consent-changed', onChange)
  }, [])

  const update = useCallback((next: Omit<CookieConsent, 'decidedAt'>) => {
    setConsent(writeConsent(next))
  }, [])

  return {
    consent,
    hydrated,
    needsDecision: hydrated && !consent,
    acceptAll:     () => setConsent(acceptAll()),
    rejectAll:     () => setConsent(rejectAll()),
    update,
    clear:         () => { clearConsent(); setConsent(null) },
    can: (cat: CookieCategory) => consent ? consent[cat] === true : cat === 'necessary',
  }
}
