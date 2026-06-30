'use client'

import { useState } from 'react'

export default function CopyLinkButton() {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    })
  }

  return (
    <button
      onClick={handleCopy}
      className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white bg-white/15 border border-white/35 hover:bg-white/25 transition-colors"
    >
      {copied ? '✓ Link copiado!' : '🔗 Copiar link desta página'}
    </button>
  )
}
