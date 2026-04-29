// ============================================================
// <UnlockPremiumButton /> — botão fixo "Desbloquear Premium"
// Aparece na página /result/[id] quando há Report mas ainda
// não tem ReportUnlock. Chama /api/premium/checkout e redireciona
// para o Stripe.
// ============================================================
'use client'

import { useState } from 'react'

interface Props {
  reportId: string
  priceBrl: string  // ex: "47,00"
}

export default function UnlockPremiumButton({ reportId, priceBrl }: Props) {
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  async function handleUnlock() {
    setLoading(true)
    setErr(null)
    try {
      const res = await fetch('/api/premium/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reportId, source: 'result_page_button' }),
      })
      const data = await res.json()
      if (!res.ok || !data.url) throw new Error(data.error ?? 'Erro ao criar checkout')
      window.location.href = data.url as string
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Erro inesperado')
      setLoading(false)
    }
  }

  return (
    <div
      className="rounded-3xl p-6 sm:p-7 text-white relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #1c1a17 0%, #2a1c15 55%, #3d2517 100%)' }}
    >
      <div
        className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-[0.12] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #c4633a, transparent)', transform: 'translate(25%,-30%)' }}
      />

      <div className="relative">
        <span
          className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-bold tracking-[0.16em] uppercase mb-3"
          style={{ background: 'rgba(212,184,92,0.22)', color: '#e8c878' }}
        >
          ✦ Premium · PDI completo
        </span>
        <h3 className="font-serif text-xl sm:text-2xl font-bold mb-2 leading-tight">
          Quer o relatório completo com PDI, sombra e plano de 21 dias?
        </h3>
        <p className="text-white/80 font-sans text-sm mb-5 leading-relaxed">
          Análise profunda do seu perfil, scripts de comunicação, comportamento sob pressão,
          medos inconscientes e roteiro personalizado de desenvolvimento.
        </p>

        <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[13px] text-white/85 font-sans mb-5">
          <li>✦ Anatomia psicológica</li>
          <li>✦ Plano de carreira</li>
          <li>✦ Guia de comunicação</li>
          <li>✦ PDI 21 dias</li>
          <li>✦ Materiais para download</li>
          <li>✦ Capa personalizada</li>
        </ul>

        <button
          onClick={handleUnlock}
          disabled={loading}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-white font-bold font-sans transition-all hover:-translate-y-px disabled:opacity-60"
          style={{ background: 'linear-gradient(135deg, #c4633a, #d4943a)' }}
        >
          {loading ? 'Redirecionando…' : `Desbloquear por R$ ${priceBrl} →`}
        </button>

        {err && (
          <p className="text-[12px] text-rose-200 mt-3 font-sans">
            {err}. Tente novamente em alguns segundos.
          </p>
        )}
      </div>
    </div>
  )
}
