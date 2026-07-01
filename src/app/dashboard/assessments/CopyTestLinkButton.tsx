'use client'

import { useState } from 'react'

// Botão para copiar o link público do teste (/test/[token]).
// Permite reenviar o link (WhatsApp, e-mail manual etc.) quantas vezes precisar.
export default function CopyTestLinkButton({ token }: { token: string }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    const url = `${window.location.origin}/test/${token}`
    try {
      await navigator.clipboard.writeText(url)
    } catch {
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
      className="text-[14px] font-bold font-sans transition-colors hover:underline"
      style={{ color: copied ? '#7a9e7e' : '#8fa6da' }}
    >
      {copied ? '✓ Link copiado' : '🔗 Copiar link'}
    </button>
  )
}
