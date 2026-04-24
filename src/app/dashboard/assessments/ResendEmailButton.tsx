'use client'

import { useState } from 'react'

interface Props {
  assessmentId: string
}

export default function ResendEmailButton({ assessmentId }: Props) {
  const [state, setState] = useState<'idle' | 'loading' | 'ok' | 'err'>('idle')

  async function handleClick() {
    setState('loading')
    try {
      const res = await fetch(`/api/assessments/${assessmentId}/resend`, { method: 'POST' })
      if (res.ok) {
        setState('ok')
        setTimeout(() => setState('idle'), 3000)
      } else {
        setState('err')
        setTimeout(() => setState('idle'), 4000)
      }
    } catch {
      setState('err')
      setTimeout(() => setState('idle'), 4000)
    }
  }

  if (state === 'ok') {
    return <span className="text-xs font-medium font-sans" style={{ color: '#5a8a5e' }}>✓ Email enviado</span>
  }
  if (state === 'err') {
    return <span className="text-xs font-medium font-sans" style={{ color: '#a05a52' }}>Erro ao enviar</span>
  }

  return (
    <button
      onClick={handleClick}
      disabled={state === 'loading'}
      className="text-xs text-soul-ink/35 hover:text-soul-terracota font-sans font-medium
                 disabled:opacity-50 transition-colors"
    >
      {state === 'loading' ? 'Enviando…' : 'Reenviar email'}
    </button>
  )
}
