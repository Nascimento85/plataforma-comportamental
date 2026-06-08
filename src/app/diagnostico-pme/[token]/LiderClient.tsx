'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ESCALA_PME } from '@/content/pme-diagnostico/questionarios'

interface Pergunta { id: string; bloco: string; texto: string }

const NAVY = '#1a2a40'
const GOLD = '#d4af37'

export default function LiderClient({
  token, empresa, donoNome, perguntas, jaRespondido, relatorioId,
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
    if (liderNome.trim().length < 2) { setError('Informe seu nome.'); return }
    const faltando = perguntas.filter((p) => !respostas[p.id])
    if (faltando.length > 0) { setError(`Faltam ${faltando.length} respostas.`); return }
    setLoading(true)
    try {
      const res = await fetch(`/api/diagnostico-pme/${token}/lider`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ liderNome, liderEmail, respostas }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error ?? 'Erro ao enviar.'); return }
      router.push(data.relatorioUrl)
    } catch {
      setError('Erro de conexão. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  if (jaRespondido) {
    return (
      <Shell>
        <div className="max-w-md mx-auto text-center py-12">
          <div className="text-5xl mb-4">✅</div>
          <h1 className="font-serif text-2xl font-bold mb-2" style={{ color: NAVY }}>Diagnóstico já respondido</h1>
          <p className="text-[14px] text-gray-600 font-medium">Este questionário já foi preenchido. Obrigado pela colaboração.</p>
        </div>
      </Shell>
    )
  }

  if (!iniciado) {
    return (
      <Shell>
        <div className="max-w-lg mx-auto py-8">
          <p className="text-[12px] font-bold uppercase tracking-widest mb-3" style={{ color: GOLD }}>Convite confidencial</p>
          <h1 className="font-serif text-3xl font-bold leading-tight mb-3" style={{ color: NAVY }}>
            {donoNome} pediu a sua visão sobre a equipe
          </h1>
          <p className="text-[15px] text-gray-600 font-medium leading-relaxed mb-6">
            Você foi convidado a responder um diagnóstico rápido (3 minutos) sobre a rotina, as metas e a motivação do
            time da <strong>{empresa}</strong>. Suas respostas ajudam a construir um retrato real da liderança. Seja honesto,
            é exatamente a sua percepção do dia a dia que torna o diagnóstico valioso.
          </p>
          <div className="space-y-3 mb-5">
            <Field label="Seu nome"><input className="pme-input" value={liderNome} onChange={(e) => setLiderNome(e.target.value)} placeholder="Nome completo" /></Field>
            <Field label="E-mail (opcional)"><input type="email" className="pme-input" value={liderEmail} onChange={(e) => setLiderEmail(e.target.value)} placeholder="voce@empresa.com" /></Field>
          </div>
          <button onClick={() => { if (liderNome.trim().length >= 2) { setError(''); setIniciado(true) } else setError('Informe seu nome.') }}
                  className="w-full py-3.5 rounded-full text-[15px] font-bold text-white" style={{ background: NAVY }}>
            Começar →
          </button>
          {error && <p className="text-[13px] font-semibold mt-3 text-center" style={{ color: '#9b2c2c' }}>{error}</p>}
        </div>
      </Shell>
    )
  }

  return (
    <Shell>
      <div className="max-w-2xl mx-auto py-4">
        <div className="sticky top-0 z-10 py-3 mb-4" style={{ background: '#fafbfc' }}>
          <div className="flex justify-between text-[12px] font-semibold text-gray-500 mb-1">
            <span>{respondidas}/{perguntas.length} respondidas</span><span>{progresso}%</span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#e8eaed' }}>
            <div className="h-full rounded-full transition-all" style={{ width: `${progresso}%`, background: `linear-gradient(90deg, ${NAVY}, ${GOLD})` }} />
          </div>
        </div>

        {error && <div className="rounded-xl px-4 py-3 mb-4 text-[13px] font-semibold" style={{ background: '#fdecea', color: '#9b2c2c' }}>{error}</div>}

        <div className="space-y-6">
          {blocos.map(([bloco, perg]) => (
            <div key={bloco}>
              <p className="font-serif text-lg font-bold mb-3" style={{ color: NAVY }}>{bloco}</p>
              <div className="space-y-3">
                {perg.map((p) => (
                  <div key={p.id} className="rounded-2xl p-4" style={{ background: '#fff', border: '1px solid #e8eaed' }}>
                    <p className="text-[14px] font-semibold mb-2.5" style={{ color: NAVY }}>{p.texto}</p>
                    <div className="flex gap-1.5">
                      {ESCALA_PME.map((opt) => {
                        const sel = respostas[p.id] === opt.valor
                        return (
                          <button key={opt.valor} onClick={() => setRespostas((r) => ({ ...r, [p.id]: opt.valor }))} title={opt.label}
                                  className="flex-1 py-2 rounded-lg border-2 text-[13px] font-bold transition-all"
                                  style={{ borderColor: sel ? NAVY : '#e0e3e8', background: sel ? NAVY : '#fff', color: sel ? '#fff' : '#94a3b8' }}>
                            {opt.valor}
                          </button>
                        )
                      })}
                    </div>
                    <div className="flex justify-between text-[10px] text-gray-400 font-medium mt-1 px-0.5"><span>Discordo</span><span>Concordo</span></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button onClick={enviar} disabled={loading}
                className="w-full mt-6 py-4 rounded-full text-[16px] font-bold text-white shadow-lg disabled:opacity-60"
                style={{ background: `linear-gradient(135deg, ${NAVY}, #2b3a52)` }}>
          {loading ? 'Enviando…' : 'Enviar minhas respostas →'}
        </button>
      </div>
    </Shell>
  )
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`.pme-input{width:100%;padding:0.7rem 0.9rem;border:1px solid #d8dce2;border-radius:0.75rem;font-size:14px;font-weight:500;color:#1a2a40;background:#fff;outline:none}.pme-input:focus{border-color:#1a2a40}`}</style>
      <header className="h-14 flex items-center px-6" style={{ borderBottom: '1px solid #e8eaed', background: '#fff' }}>
        <span className="font-serif font-bold text-[17px]" style={{ color: '#1a2a40' }}>Psique <span className="font-normal text-gray-400">· Diagnóstico de Liderança</span></span>
      </header>
      <main className="px-4 py-6">{children}</main>
    </>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[12px] font-bold uppercase tracking-wide text-gray-500 mb-1.5">{label}</label>
      {children}
    </div>
  )
}
