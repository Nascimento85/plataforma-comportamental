'use client'

import { useState } from 'react'

// Botão para copiar o link público do teste (/test/[token]).
// Usado na lista de testes para reenviar quando o candidato ainda não fez.
export default function CopyTestLinkButton({ token }: { token: string }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    const url = `${window.location.origin}/test/${token}`
    try {
      await navigator.clipboard.writeText(url)
    } catch {
      // Fallback para navegadores/contexts sem Clipboard API
      const ta = document.createElement('textarea')
      ta.value = url
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      try { document.execCommand('copy') } catch { /* ignore */ }
      document.body.removeChild(ta)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={copy}
      title="Copiar o link do teste para reenviar ao candidato"
      className="text-xs font-medium font-sans px-3 py-1 rounded-full transition-all hover:-translate-y-px whitespace-nowrap"
      style={copied
        ? { background: 'rgba(122,158,126,0.15)', color: '#7a9e7e', border: '1px solid rgba(122,158,126,0.35)' }
        : { background: 'rgba(61,79,124,0.15)', color: '#8fa6da', border: '1px solid rgba(61,79,124,0.35)' }}
    >
      {copied ? '✓ Copiado' : '🔗 Copiar link'}
    </button>
  )
}
