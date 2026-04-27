// ============================================================
// <PremiumGate /> — Camada 3
// Envolve seções que SÓ aparecem após pagamento direto:
//   - Como se comunicar com este perfil
//   - Como liderar este perfil
//   - Medos inconscientes
//   - PDI (Plano de Desenvolvimento Individual)
//
// Bônus do Passaporte NÃO desbloqueia.
// ============================================================
'use client'

import { useState } from 'react'

interface Props {
  reportId:    string
  profileName: string
  priceBrl:    string  // "47,00"
  unlocked:    boolean
  children:    React.ReactNode
}

export default function PremiumGate({
  reportId, profileName, priceBrl, unlocked, children,
}: Props) {
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState<string | null>(null)

  if (unlocked) return <>{children}</>

  async function handleUnlock() {
    setError(null)
    setLoading(true)
    try {
      const res = await fetch('/api/premium/checkout', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ reportId }),
      })
      const data = await res.json()
      if (!res.ok || !data.url) throw new Error(data.error ?? 'Erro ao iniciar checkout')
      window.location.href = data.url as string
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erro inesperado')
      setLoading(false)
    }
  }

  return (
    <div className="relative">
      {/* Conteúdo borrado (preview) */}
      <div
        aria-hidden
        className="select-none pointer-events-none"
        style={{
          filter:    'blur(8px) saturate(0.7)',
          maskImage: 'linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
        }}
      >
        {children}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <div
          className="rounded-3xl bg-white/95 backdrop-blur-md p-6 sm:p-8 max-w-md text-center shadow-xl"
          style={{ border: '1px solid rgba(196,99,58,0.25)' }}
        >
          <div className="text-[10px] font-sans font-bold tracking-[0.18em] uppercase text-soul-terracota mb-2">
            Conteúdo Premium
          </div>
          <h3 className="font-serif text-2xl font-bold text-soul-ink mb-2">
            🔒 Desbloqueie o Relatório Completo
          </h3>
          <p className="text-sm text-soul-ink/70 font-sans mb-5">
            Veja como se comunicar, liderar, e o PDI completo do perfil <strong>{profileName}</strong>.
          </p>

          <ul className="text-left space-y-2 mb-6 text-sm text-soul-ink/80 font-sans">
            <li>✨ Como se comunicar com este perfil</li>
            <li>👑 Como liderar este perfil</li>
            <li>🌑 Medos inconscientes</li>
            <li>🎯 PDI — Plano de Desenvolvimento Individual</li>
          </ul>

          <button
            onClick={handleUnlock}
            disabled={loading}
            className="w-full py-4 rounded-full text-white font-bold font-sans transition-all hover:-translate-y-px shadow-terra disabled:opacity-60"
            style={{ background: 'linear-gradient(135deg, #c4633a, #d4943a)' }}
          >
            {loading ? 'Redirecionando…' : `Desbloquear Agora — R$ ${priceBrl}`}
          </button>

          <p className="text-[11px] text-soul-ink/45 mt-3 font-sans">
            Pagamento seguro via Stripe · Acesso vitalício a este relatório
          </p>
          {error && (
            <p className="text-[12px] text-red-700 mt-3 font-sans">{error}</p>
          )}
        </div>
      </div>
    </div>
  )
}
