'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Shell, EscalaLegenda, PerguntaCard } from '../DonoClient'

interface Pergunta { id: string; bloco: string; texto: string }

const TEXT = '#e9eef6'
const MUTED = '#9fb0c8'
const GOLD = '#d4af37'
const BG = '#0f1826'

export default function LiderClient({
  token, empresa, donoNome, perguntas, jaRespondido,
}: {
  token: string
  empresa: string
  donoNome: string
  perguntas: Pergunta[]
  jaRespondido: boolean
  relatorioId: string
}) {
  const router = useRouter()
  const [iniciado, setIniciado] = useState(false)
  const [liderNome, setLiderNome] = useState('')
  const [liderEmail, setLiderEmail] = useState('')
  const [respostas, setRespostas] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const blocos = useMemo(() => {
    const map = new Map<string, Pergunta[]>()
    perguntas.forEach((p) => { if (!map.has(p.bloco)) map.set(p.bloco, []); map.get(p.bloco)!.push(p) })
    return Array.from(map.entries())
  }, [perguntas])

  const respondidas = perguntas.filter((p) => respostas[p.id]).length
  const progresso = Math.round((respondidas / perguntas.length) * 100)

  async function enviar() {
    setError('')
    if (liderNome.trim().length < 2) { setError('Informe o seu nome.'); return }
    const faltando = perguntas.filter((p) => !respostas[p.id])
    if (faltando.length > 0) { setError(`Faltam ${faltando.length} respostas.`); return }
    setLoading(true)
    try {
      const res = await fetch(`/api/diagnostico-pme/${token}/lider`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ liderNome, liderEmail, respostas }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error ?? 'Erro ao enviar.'); return }
      router.push(data.relatorioUrl)
    } catch {
      setError('Erro de conexão. Tente novamente.')
    } finally { setLoading(false) }
  }

  if (jaRespondido) {
    return (
      <Shell>
        <div className="max-w-md mx-auto text-center py-12">
          <div className="text-5xl mb-4">✅</div>
          <h1 className="font-serif text-2xl font-bold mb-2" style={{ color: TEXT }}>Diagnóstico já respondido</h1>
          <p className="text-[15px] font-medium" style={{ color: MUTED }}>Este questionário já foi preenchido. Obrigado pela colaboração.</p>
        </div>
      </Shell>
    )
  }

  if (!iniciado) {
    return (
      <Shell>
        <div className="max-w-lg mx-auto py-8">
          <p className="text-[13px] font-bold uppercase tracking-widest mb-3" style={{ color: GOLD }}>Convite confidencial</p>
          <h1 className="font-serif text-3xl md:text-4xl font-bold leading-tight mb-3" style={{ color: TEXT }}>
            {donoNome} pediu a sua visão sobre a equipe
          </h1>
          <p className="text-[16px] font-medium leading-relaxed mb-6" style={{ color: MUTED }}>
            Você foi convidado a responder um diagnóstico rápido (3 minutos) sobre a rotina, as metas e a motivação do
            time da <strong style={{ color: TEXT }}>{empresa}</strong>. Suas respostas são confidenciais e ajudam a construir
            um retrato real da liderança. Seja honesto, é exatamente a sua percepção do dia a dia que torna o diagnóstico valioso.
          </p>
          <div className="space-y-4 mb-5">
            <div>
              <label className="block text-[13px] font-bold uppercase tracking-wide mb-1.5" style={{ color: MUTED }}>Seu nome</label>
              <input className="pme-input" value={liderNome} onChange={(e) => setLiderNome(e.target.value)} placeholder="Nome completo" />
            </div>
            <div>
              <label className="block text-[13px] font-bold uppercase tracking-wide mb-1.5" style={{ color: MUTED }}>E-mail (opcional)</label>
              <input type="email" className="pme-input" value={liderEmail} onChange={(e) => setLiderEmail(e.target.value)} placeholder="voce@empresa.com" />
            </div>
          </div>
          <button onClick={() => { if (liderNome.trim().length >= 2) { setError(''); setIniciado(true) } else setError('Informe o seu nome.') }}
                  className="w-full py-4 rounded-full text-[16px] font-bold" style={{ background: GOLD, color: BG }}>
            Começar →
          </button>
          {error && <p className="text-[14px] font-semibold mt-3 text-center" style={{ color: '#ff9a8d' }}>{error}</p>}
        </div>
      </Shell>
    )
  }

  return (
    <Shell>
      <div className="max-w-2xl mx-auto py-4">
        <div className="sticky top-0 z-10 py-3 mb-2" style={{ background: BG }}>
          <div className="flex justify-between text-[13px] font-semibold mb-1" style={{ color: MUTED }}>
            <span>{respondidas}/{perguntas.length} respondidas</span><span>{progresso}%</span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
            <div className="h-full rounded-full transition-all" style={{ width: `${progresso}%`, background: GOLD }} />
          </div>
        </div>

        <EscalaLegenda />

        {error && <div className="rounded-xl px-4 py-3 mb-4 text-[14px] font-semibold" style={{ background: 'rgba(192,57,43,0.18)', color: '#ff9a8d' }}>{error}</div>}

        <div className="space-y-7">
          {blocos.map(([bloco, perg]) => (
            <div key={bloco}>
              <p className="font-serif text-xl font-bold mb-3" style={{ color: GOLD }}>{bloco}</p>
              <div className="space-y-3">
                {perg.map((p) => <PerguntaCard key={p.id} pergunta={p} valor={respostas[p.id]} onSelect={(v) => setRespostas((r) => ({ ...r, [p.id]: v }))} />)}
              </div>
            </div>
          ))}
        </div>

        <button onClick={enviar} disabled={loading} className="w-full mt-7 py-4 rounded-full text-[17px] font-bold shadow-lg disabled:opacity-60" style={{ background: GOLD, color: BG }}>
          {loading ? 'Enviando…' : 'Enviar minhas respostas →'}
        </button>
      </div>
    </Shell>
  )
}
