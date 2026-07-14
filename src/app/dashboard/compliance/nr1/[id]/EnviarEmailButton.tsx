// ============================================================
// EnviarEmailButton — (re)envia o e-mail de convite NR-1
// Client component: chama POST /api/nr1/convites/[id]/email.
// ============================================================

'use client'

import { useState } from 'react'

type Estado = 'idle' | 'enviando' | 'ok' | 'erro'

export default function EnviarEmailButton({ conviteId }: { conviteId: string }) {
  const [estado, setEstado] = useState<Estado>('idle')

  async function handleEnviar() {
    if (estado === 'enviando') return
    setEstado('enviando')
    try {
      const res = await fetch(`/api/nr1/convites/${conviteId}/email`, { method: 'POST' })
      if (res.ok) {
        setEstado('ok')
        setTimeout(() => setEstado('idle'), 2500)
      } else {
        setEstado('erro')
        setTimeout(() => setEstado('idle'), 3500)
      }
    } catch {
      setEstado('erro')
      setTimeout(() => setEstado('idle'), 3500)
    }
  }

  const label =
    estado === 'enviando' ? 'Enviando…' :
    estado === 'ok'       ? 'Enviado ✓' :
    estado === 'erro'     ? 'Falhou — tentar de novo' :
    'Enviar e-mail'

  return (
    <button
      type="button"
      onClick={handleEnviar}
      disabled={estado === 'enviando'}
      className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[13.5px] font-bold transition-colors disabled:opacity-60"
      style={{
        background: estado === 'ok' ? 'rgba(122,158,126,0.22)' : estado === 'erro' ? 'rgba(196,122,114,0.18)' : 'rgba(196,99,58,0.10)',
        color:      estado === 'ok' ? '#4a7a4e'                : estado === 'erro' ? '#a04a3a'                : '#8a4a26',
        border:     estado === 'ok' ? '1px solid rgba(122,158,126,0.35)' : estado === 'erro' ? '1px solid rgba(196,122,114,0.4)' : '1px solid rgba(196,99,58,0.20)',
      }}
      aria-label="Enviar convite por e-mail"
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-10 6L2 7" />
      </svg>
      {label}
    </button>
  )
}
