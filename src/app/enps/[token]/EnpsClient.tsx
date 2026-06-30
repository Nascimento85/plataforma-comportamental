'use client'

import { useState } from 'react'
import {
  ENPS_PERGUNTA, ENPS_ESCALA_MIN, ENPS_ESCALA_MAX, ENPS_PERGUNTA_ABERTA,
  TEMPO_CASA_OPTIONS,
} from '@/content/enps'

const BG = 'linear-gradient(180deg, #101c30 0%, #17181c 42%)'
const GOLD = '#c9a84c'

export default function EnpsClient({ token, titulo, empresa }: { token: string; titulo: string | null; empresa: string }) {
  const [nota, setNota] = useState<number | null>(null)
  const [tempoCasa, setTempoCasa] = useState('')
  const [motivo, setMotivo] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  async function handleSubmit() {
    setError('')
    if (nota === null) { setError('Escolha uma nota de 0 a 10.'); return }
    if (motivo.trim().length < 3) { setError('Conte brevemente o motivo da sua nota.'); return }
    setSubmitting(true)
    try {
      const res = await fetch('/api/enps/respostas', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, nota, tempoCasa, motivo }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error ?? 'Erro ao enviar.'); setSubmitting(false); return }
      setDone(true)
    } catch { setError('Erro ao conectar.'); setSubmitting(false) }
  }

  if (done) {
    return (
      <Shell>
        <div className="text-center py-12">
          <div className="text-6xl mb-4">💚</div>
          <h1 className="font-serif font-semibold text-3xl text-white mb-3">Obrigado pela sua sinceridade!</h1>
          <p className="text-[16px] font-medium" style={{ color: 'rgba(243,239,231,0.82)' }}>
            Sua resposta é 100% anônima e ajuda a tornar a empresa um lugar melhor para todos.
          </p>
        </div>
      </Shell>
    )
  }

  const corNota = nota == null ? '#888' : nota >= 9 ? '#7a9e7e' : nota >= 7 ? '#d4b35e' : '#cf6f5e'

  return (
    <Shell>
      <div className="text-center mb-6">
        <p className="text-[13px] font-bold uppercase tracking-[0.2em] mb-2" style={{ color: GOLD }}>
          Pesquisa de clima{titulo ? ` · ${titulo}` : ''}
        </p>
        {empresa && <h1 className="font-serif font-semibold text-2xl text-white">{empresa}</h1>}
        <p className="text-[13px] mt-2 inline-block px-3 py-1 rounded-full" style={{ background: 'rgba(122,158,126,0.15)', color: '#a9d3a9' }}>
          🔒 100% anônima
        </p>
      </div>

      <Card>
        <p className="text-[16px] font-semibold text-white mb-4 leading-snug">{ENPS_PERGUNTA}</p>
        <div className="grid grid-cols-11 gap-1.5">
          {Array.from({ length: 11 }, (_, i) => i).map((v) => (
            <button key={v} onClick={() => setNota(v)}
              className="aspect-square rounded-lg text-[15px] font-bold transition-all"
              style={nota === v
                ? { background: corNota, color: '#15130f', border: `2px solid ${corNota}` }
                : { background: 'rgba(255,255,255,0.05)', color: 'rgba(243,239,231,0.8)', border: '1px solid rgba(255,255,255,0.14)' }}>
              {v}
            </button>
          ))}
        </div>
        <div className="flex justify-between text-[11px] mt-2" style={{ color: 'rgba(243,239,231,0.5)' }}>
          <span>0 · {ENPS_ESCALA_MIN}</span>
          <span>{ENPS_ESCALA_MAX} · 10</span>
        </div>
      </Card>

      <div className="mt-4">
        <Card>
          <p className="text-[15px] font-semibold text-white mb-3">{ENPS_PERGUNTA_ABERTA}</p>
          <textarea value={motivo} onChange={(e) => setMotivo(e.target.value)} rows={4}
            placeholder="Sua resposta sincera ajuda muito…"
            className="w-full rounded-xl p-3 text-[15px]"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.14)', color: '#f3efe7' }} />
        </Card>
      </div>

      <div className="mt-4">
        <Card>
          <p className="text-[15px] font-semibold text-white mb-3">Há quanto tempo você está na empresa? <span className="font-normal text-[13px]" style={{ color: 'rgba(243,239,231,0.55)' }}>(opcional)</span></p>
          <div className="grid grid-cols-2 gap-2">
            {TEMPO_CASA_OPTIONS.map((opt) => (
              <button key={opt.value} onClick={() => setTempoCasa((t) => t === opt.value ? '' : opt.value)}
                className="py-2.5 rounded-lg text-[14px] font-semibold transition-all"
                style={tempoCasa === opt.value
                  ? { background: GOLD, color: '#15130f' }
                  : { background: 'rgba(255,255,255,0.05)', color: 'rgba(243,239,231,0.8)', border: '1px solid rgba(255,255,255,0.14)' }}>
                {opt.label}
              </button>
            ))}
          </div>
        </Card>
      </div>

      {error && <div className="mt-4 rounded-xl px-4 py-3 text-[14px] font-semibold" style={{ background: 'rgba(196,122,114,0.16)', border: '1px solid rgba(196,122,114,0.45)', color: '#f0a892' }}>{error}</div>}

      <button onClick={handleSubmit} disabled={submitting}
        className="w-full mt-5 py-4 rounded-2xl font-bold text-[16px] text-soul-ink disabled:opacity-60 transition-transform hover:-translate-y-px"
        style={{ background: 'linear-gradient(135deg, #c9a84c, #d4943a)' }}>
        {submitting ? 'Enviando…' : 'Enviar resposta'}
      </button>
    </Shell>
  )
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen" style={{ background: BG }}>
      <main className="max-w-xl mx-auto px-4 py-8">{children}</main>
    </div>
  )
}
function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}>{children}</div>
}
