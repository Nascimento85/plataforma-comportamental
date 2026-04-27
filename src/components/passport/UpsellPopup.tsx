// ============================================================
// <UpsellPopup /> — Camada 4
// Pop-up dinâmico que aparece após o usuário ver o Relatório Básico.
//
// Regras de exibição:
//   - Mostra UMA vez por (assessmentId) — guarda em sessionStorage
//   - Espera 6s após o primeiro paint p/ não interromper a leitura
//   - Possui contagem regressiva visual (escassez)
// ============================================================
'use client'

import { useEffect, useRef, useState } from 'react'

interface Props {
  reportId:    string
  assessmentId:string
  profileName: string
  priceBrl:    string         // "47,00"
  /** Tempo até abrir o pop-up (ms). Default: 6000 */
  delayMs?:    number
}

const STORAGE_PREFIX = 'soul:upsell-shown:'

export default function UpsellPopup({
  reportId, assessmentId, profileName, priceBrl, delayMs = 6000,
}: Props) {
  const [open,    setOpen]    = useState(false)
  const [secs,    setSecs]    = useState(15 * 60) // 15 min
  const [loading, setLoading] = useState(false)
  const fired = useRef(false)

  // Abrir uma vez
  useEffect(() => {
    if (fired.current) return
    if (typeof window === 'undefined') return
    const key = STORAGE_PREFIX + assessmentId
    if (sessionStorage.getItem(key)) return
    const id = setTimeout(() => {
      setOpen(true)
      sessionStorage.setItem(key, '1')
      fired.current = true
    }, delayMs)
    return () => clearTimeout(id)
  }, [assessmentId, delayMs])

  // Contagem regressiva
  useEffect(() => {
    if (!open) return
    const id = setInterval(() => setSecs(s => Math.max(0, s - 1)), 1000)
    return () => clearInterval(id)
  }, [open])

  // ESC fecha
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  async function handleUnlock() {
    setLoading(true)
    try {
      const res = await fetch('/api/premium/checkout', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ reportId, source: 'upsell_popup' }),
      })
      const data = await res.json()
      if (!res.ok || !data.url) throw new Error(data.error ?? 'Erro')
      window.location.href = data.url as string
    } catch {
      setLoading(false)
    }
  }

  if (!open) return null

  const mm = String(Math.floor(secs / 60)).padStart(2, '0')
  const ss = String(secs % 60).padStart(2, '0')

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-3"
      style={{ background: 'rgba(28,26,23,0.55)', backdropFilter: 'blur(4px)' }}
      onClick={() => setOpen(false)}
    >
      <div
        onClick={e => e.stopPropagation()}
        className="relative bg-white w-full max-w-lg rounded-3xl p-7 sm:p-8 shadow-2xl"
        style={{ border: '1px solid rgba(196,99,58,0.25)' }}
      >
        {/* Fechar */}
        <button
          onClick={() => setOpen(false)}
          aria-label="Fechar"
          className="absolute top-3 right-3 h-8 w-8 rounded-full text-soul-ink/60 hover:bg-soul-mist/40"
        >
          ×
        </button>

        {/* Tag de escassez */}
        <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-bold tracking-[0.16em] uppercase mb-4"
             style={{ background: '#fff3e0', color: '#a04a1f' }}>
          <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
          Oferta termina em {mm}:{ss}
        </div>

        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-soul-ink leading-tight mb-3">
          Você acaba de descobrir que seu perfil é <span style={{ color: '#a8522e' }}>{profileName}</span>.
        </h3>
        <p className="text-soul-ink/75 font-sans text-base mb-5">
          Quer saber como usar isso para vender 2x mais e liderar com maestria?
          Desbloqueie seu <strong>Relatório Premium + PDI</strong> agora por apenas{' '}
          <strong>R$ {priceBrl}</strong>.
        </p>

        <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-soul-ink/80 font-sans mb-6">
          <li>✨ Como se comunicar</li>
          <li>👑 Como liderar este perfil</li>
          <li>🌑 Medos inconscientes</li>
          <li>🎯 PDI completo</li>
        </ul>

        <button
          onClick={handleUnlock}
          disabled={loading}
          className="w-full py-4 rounded-full text-white font-bold font-sans transition-all hover:-translate-y-px shadow-terra disabled:opacity-60"
          style={{ background: 'linear-gradient(135deg, #c4633a, #d4943a)' }}
        >
          {loading ? 'Redirecionando…' : 'Desbloquear Agora →'}
        </button>

        <button
          onClick={() => setOpen(false)}
          className="block w-full text-center text-[12px] text-soul-ink/45 mt-3 font-sans hover:text-soul-ink/70"
        >
          Continuar com o relatório básico
        </button>
      </div>
    </div>
  )
}
