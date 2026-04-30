'use client'

import { useCookieConsent } from '@/lib/cookie-consent'

export default function CookiePrefsButton() {
  const { clear } = useCookieConsent()

  return (
    <button
      onClick={() => clear()}
      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white shadow-terra hover:-translate-y-px transition-all"
      style={{ background: 'linear-gradient(135deg, #c4633a, #d4943a)' }}
    >
      Reabrir banner de cookies
    </button>
  )
}
