'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FREE_TRIAL_TESTS } from '@/lib/experimente'

export default function ExperimenteClient({ src }: { src: string | null }) {
  const router = useRouter()
  const [selected, setSelected] = useState<string[]>([])
  const [firstName, setFirstName] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function toggle(testType: string) {
    setError('')
    setSelected((prev) => {
      if (prev.includes(testType)) return prev.filter((t) => t !== testType)
      if (prev.length >= 2) return prev // máximo 2
      return [...prev, testType]
    })
  }

  async function start() {
    setError('')
    if (selected.length === 0) { setError('Escolha 1 ou 2 testes para começar.'); return }
    if (firstName.trim().length < 2) { setError('Digite seu primeiro nome.'); return }
    if (whatsapp.trim().length < 8) { setError('Digite um WhatsApp válido (com DDD).'); return }
    setLoading(true)
    try {
      const res = await fetch('/api/experimente/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName: firstName.trim(), whatsapp: whatsapp.trim(), src, testTypes: selected }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error ?? 'Erro ao iniciar. Tente novamente.'); setLoading(false); return }
      router.push(data.redirect as string)
    } catch {
      setError('Erro de conexão. Verifique sua internet e tente de novo.')
      setLoading(false)
    }
  }

  const canStart = selected.length >= 1 && selected.length <= 2

  return (
    <div className="space-y-6">
      {/* Seleção de testes */}
      <div>
        <p className="text-[12px] font-sans font-bold uppercase tracking-[0.15em] mb-3" style={{ color: '#e8c878' }}>
          Passo 1 · Escolha até 2 testes
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {FREE_TRIAL_TESTS.map((t) => {
            const on = selected.includes(t.testType)
            const disabled = !on && selected.length >= 2
            return (
              <button
                key={t.testType}
                onClick={() => toggle(t.testType)}
                disabled={disabled}
                className="text-left rounded-2xl p-4 transition-all"
                style={{
                  background: on ? 'rgba(201,168,76,0.12)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${on ? 'rgba(201,168,76,0.55)' : 'rgba(58,61,69,0.7)'}`,
                  opacity: disabled ? 0.4 : 1,
                  cursor: disabled ? 'not-allowed' : 'pointer',
                }}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-2xl">{t.emoji}</span>
                  <span className="w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0"
                        style={{ background: on ? 'linear-gradient(135deg,#c9a84c,#d4943a)' : 'transparent', border: on ? 'none' : '1px solid rgba(240,236,227,0.3)', color: on ? '#1c1a17' : 'transparent' }}>
                    {on ? '✓' : ''}
                  </span>
                </div>
                <p className="font-serif font-semibold text-[15px] mt-2" style={{ color: '#f0ece3' }}>{t.label}</p>
                <p className="text-[13px] font-sans mt-1" style={{ color: 'rgba(240,236,227,0.62)' }}>{t.tagline}</p>
                <p className="text-[12px] font-sans mt-2" style={{ color: 'rgba(240,236,227,0.45)' }}>⏱ {t.duration}</p>
              </button>
            )
          })}
        </div>
        <p className="text-[12px] font-sans mt-2" style={{ color: 'rgba(240,236,227,0.5)' }}>
          {selected.length}/2 selecionados
        </p>
      </div>

      {/* Dados */}
      <div>
        <p className="text-[12px] font-sans font-bold uppercase tracking-[0.15em] mb-3" style={{ color: '#e8c878' }}>
          Passo 2 · Pra te enviar o resultado
        </p>
        <div className="space-y-3">
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Seu primeiro nome"
            className="w-full px-4 py-3 rounded-xl text-sm font-sans outline-none"
            style={{ background: '#17181c', border: '1px solid rgba(58,61,69,0.8)', color: '#f0ece3' }}
          />
          <input
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            placeholder="WhatsApp com DDD (ex.: 11 99999-9999)"
            inputMode="tel"
            className="w-full px-4 py-3 rounded-xl text-sm font-sans outline-none"
            style={{ background: '#17181c', border: '1px solid rgba(58,61,69,0.8)', color: '#f0ece3' }}
          />
        </div>
      </div>

      {error && (
        <div className="rounded-xl px-4 py-3 text-[14px] font-sans font-semibold text-center"
             style={{ background: 'rgba(196,122,114,0.15)', border: '1px solid rgba(196,122,114,0.45)', color: '#f0a892' }}>
          {error}
        </div>
      )}

      <button
        onClick={start}
        disabled={loading || !canStart}
        className="w-full text-center font-sans font-semibold py-4 px-6 rounded-2xl transition-all hover:-translate-y-px disabled:opacity-50"
        style={{ background: 'linear-gradient(135deg, #c9a84c, #d4943a)', color: '#1c1a17', boxShadow: '0 6px 20px rgba(201,168,76,0.28)' }}
      >
        {loading ? 'Preparando seus testes…' : 'Começar agora →'}
      </button>

      <p className="text-center text-[12px] font-sans" style={{ color: 'rgba(240,236,227,0.5)' }}>
        Grátis, sem cadastro. Ao final, você pode criar sua conta e desbloquear o relatório completo.
      </p>
    </div>
  )
}
