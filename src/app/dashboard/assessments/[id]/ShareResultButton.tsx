'use client'

import { useState } from 'react'

/**
 * Botão que copia o link público do resultado para a área de transferência.
 * Link gerado: <origin>/result/<assessmentId>
 */
export default function ShareResultButton({ assessmentId }: { assessmentId: string }) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    const url = `${window.location.origin}/result/${assessmentId}`
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    })
  }

  return (
    <button
      onClick={handleCopy}
      className="btn-secondary text-sm px-4 py-2"
      title="Copiar link público do resultado"
    >
      {copied ? '✓ Link copiado!' : '🔗 Compartilhar resultado'}
    </button>
  )
}
