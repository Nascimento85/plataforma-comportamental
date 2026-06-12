// ============================================================
// CopyLinkButton — copia o link anônimo de convite p/ clipboard
// Client component porque usa navigator.clipboard.
// ============================================================

'use client'

import { useState } from 'react'

export default function CopyLinkButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // fallback p/ navegadores sem clipboard API
      const ta = document.createElement('textarea')
      ta.value = url
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      try { document.execCommand('copy'); setCopied(true); setTimeout(() => setCopied(false), 1800) } catch { /* ignore */ }
      document.body.removeChild(ta)
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[13.5px] font-bold transition-colors"
      style={{
        background: copied ? 'rgba(122,158,126,0.22)' : 'rgba(196,99,58,0.10)',
        color:      copied ? '#4a7a4e'                : '#8a4a26',
        border:     copied ? '1px solid rgba(122,158,126,0.35)' : '1px solid rgba(196,99,58,0.20)',
      }}
      aria-label={copied ? 'Link copiado' : 'Copiar link'}
    >
      {copied ? (
        <>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Copiado
        </>
      ) : (
        <>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          Copiar
        </>
      )}
    </button>
  )
}
