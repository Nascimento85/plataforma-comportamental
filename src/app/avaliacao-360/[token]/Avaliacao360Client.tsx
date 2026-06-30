'use client'

import { useMemo, useState } from 'react'
import {
  PERGUNTAS_360,
  PILAR_360_ORDER,
  PILAR_360_LABELS,
  PILAR_360_DESC,
  ESCALA_360,
  RATER_360_LABELS,
  RATER_360_INSTRUCOES,
  PERGUNTAS_ABERTAS_360,
  PERGUNTAS_ABERTAS_360_AUTO,
  textoPergunta360,
  type Rater360,
} from '@/content/gestao-times/avaliacao-360'

interface Props {
  token:        string
  role:         Rater360
  avaliadoNome: string
  titulo:       string | null
  empresa:      string
}

const BG = 'linear-gradient(180deg, #101c30 0%, #17181c 42%)'
const GOLD = '#c9a84c'

export default function Avaliacao360Client({ token, role, avaliadoNome, titulo, empresa }: Props) {
  const primeiroNome = (avaliadoNome || '').split(' ')[0]
  const isAuto = role === 'AUTO'
  const abertas = isAuto ? PERGUNTAS_ABERTAS_360_AUTO : PERGUNTAS_ABERTAS_360

  const porPilar = useMemo(
    () => PILAR_360_ORDER.map((p) => ({ pilar: p, perguntas: PERGUNTAS_360.filter((q) => q.pilar === p) })),
    [],
  )
  const totalPaginas = porPilar.length + 1 // pilares + página de abertas

  const [started, setStarted] = useState(false)
  const [page, setPage] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [continuar, setContinuar] = useState('')
  const [melhorar, setMelhorar] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  const respondidas = Object.keys(answers).length
  const progresso = Math.round((respondidas / PERGUNTAS_360.length) * 100)

  function set(qid: number, value: number) {
    setAnswers((prev) => ({ ...prev, [qid]: value }))
  }

  const isOpenPage = page === porPilar.length
  const pilarAtual = !isOpenPage ? porPilar[page] : null
  const pilarCompleta = pilarAtual ? pilarAtual.perguntas.every((q) => answers[q.id] !== undefined) : true

  async function handleSubmit() {
    const faltando = PERGUNTAS_360.filter((q) => answers[q.id] === undefined)
    if (faltando.length > 0) {
      setError(`Faltam ${faltando.length} pergunta(s).`)
      return
    }
    setSubmitting(true); setError('')
    try {
      const res = await fetch('/api/avaliacao-360/respostas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, respostas: answers, continuarTexto: continuar, melhorarTexto: melhorar }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error ?? 'Erro ao enviar.'); setSubmitting(false); return }
      setDone(true)
    } catch {
      setError('Erro ao conectar. Tente novamente.')
      setSubmitting(false)
    }
  }

  // ── Tela de conclusão ──────────────────────────────────
  if (done) {
    return (
      <Shell>
        <div className="text-center py-10">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="font-serif font-semibold text-3xl text-white mb-3">Avaliação enviada. Obrigado!</h1>
          <p className="text-[16px] font-medium" style={{ color: 'rgba(243,239,231,0.82)' }}>
            Sua contribuição é confidencial{role !== 'AUTO' ? ' e aparece apenas de forma agregada' : ''}. Ela ajuda {isAuto ? 'você' : primeiroNome} a se desenvolver.
          </p>
        </div>
      </Shell>
    )
  }

  // ── Intro ──────────────────────────────────────────────
  if (!started) {
    return (
      <Shell>
        <div className="space-y-6">
          <div className="text-center">
            <div className="text-5xl mb-3">🧭</div>
            <p className="text-[13px] font-bold uppercase tracking-[0.2em] mb-2" style={{ color: GOLD }}>
              Avaliação 360°{titulo ? ` · ${titulo}` : ''}
            </p>
            <h1 className="font-serif font-semibold text-3xl text-white leading-tight">
              {isAuto ? 'Autoavaliação' : `Você vai avaliar ${primeiroNome}`}
            </h1>
            {empresa && <p className="text-sm mt-2" style={{ color: 'rgba(243,239,231,0.6)' }}>{empresa}</p>}
          </div>

          <Card>
            <p className="text-[12px] font-bold uppercase tracking-widest mb-2" style={{ color: GOLD }}>
              Seu papel: {RATER_360_LABELS[role]}
            </p>
            <p className="text-[15px] leading-relaxed" style={{ color: 'rgba(243,239,231,0.9)' }}>
              {RATER_360_INSTRUCOES[role]}
            </p>
          </Card>

          <Card>
            <div className="grid grid-cols-3 gap-3 text-center">
              <Stat n={`${PERGUNTAS_360.length}`} l="perguntas" />
              <Stat n="6–9 min" l="duração" />
              <Stat n="1–5" l="escala" />
            </div>
            <p className="text-[13.5px] mt-4 leading-relaxed" style={{ color: 'rgba(243,239,231,0.72)' }}>
              Pense em comportamentos reais que você observa no dia a dia. Vá pela sua percepção honesta — não existe resposta certa ou errada.
            </p>
          </Card>

          <button onClick={() => setStarted(true)} className="w-full py-4 rounded-2xl font-bold text-[16px] text-soul-ink transition-transform hover:-translate-y-px"
                  style={{ background: 'linear-gradient(135deg, #c9a84c, #d4943a)' }}>
            Começar avaliação →
          </button>
        </div>
      </Shell>
    )
  }

  // ── Página de perguntas abertas ────────────────────────
  if (isOpenPage) {
    return (
      <Shell>
        <Progress page={page} total={totalPaginas} respondidas={respondidas} totalPerguntas={PERGUNTAS_360.length} progresso={progresso} />
        <div className="space-y-5">
          <Card>
            <p className="text-[15px] font-semibold text-white mb-3">{abertas.continuar}</p>
            <textarea value={continuar} onChange={(e) => setContinuar(e.target.value)} rows={4}
              className="w-full rounded-xl p-3 text-[15px]" placeholder="Opcional, mas muito valioso…"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.14)', color: '#f3efe7' }} />
          </Card>
          <Card>
            <p className="text-[15px] font-semibold text-white mb-3">{abertas.melhorar}</p>
            <textarea value={melhorar} onChange={(e) => setMelhorar(e.target.value)} rows={4}
              className="w-full rounded-xl p-3 text-[15px]" placeholder="Opcional, mas muito valioso…"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.14)', color: '#f3efe7' }} />
          </Card>

          {error && <ErrorBox>{error}</ErrorBox>}

          <div className="flex gap-3">
            <button onClick={() => { setError(''); setPage((p) => p - 1) }} className="flex-1 py-3.5 rounded-2xl font-bold text-[15px]"
              style={{ background: 'rgba(255,255,255,0.08)', color: '#f3efe7', border: '1px solid rgba(255,255,255,0.16)' }}>
              ← Voltar
            </button>
            <button onClick={handleSubmit} disabled={submitting} className="flex-[1.4] py-3.5 rounded-2xl font-bold text-[15px] text-soul-ink disabled:opacity-60"
              style={{ background: 'linear-gradient(135deg, #c9a84c, #d4943a)' }}>
              {submitting ? 'Enviando…' : '✓ Enviar avaliação'}
            </button>
          </div>
        </div>
      </Shell>
    )
  }

  // ── Página de um pilar ─────────────────────────────────
  const pilar = pilarAtual!.pilar
  return (
    <Shell>
      <Progress page={page} total={totalPaginas} respondidas={respondidas} totalPerguntas={PERGUNTAS_360.length} progresso={progresso} />
      <div className="mb-4">
        <p className="text-[12px] font-bold uppercase tracking-widest" style={{ color: GOLD }}>
          Competência {page + 1} de {porPilar.length}
        </p>
        <h2 className="font-serif font-semibold text-2xl text-white">{PILAR_360_LABELS[pilar]}</h2>
        <p className="text-[13.5px] mt-1" style={{ color: 'rgba(243,239,231,0.66)' }}>{PILAR_360_DESC[pilar]}</p>
      </div>

      <div className="space-y-3">
        {pilarAtual!.perguntas.map((q) => {
          const sel = answers[q.id]
          return (
            <Card key={q.id}>
              <p className="text-[15px] leading-relaxed mb-3" style={{ color: '#f3efe7' }}>
                {textoPergunta360(q.texto, role, primeiroNome)}
              </p>
              <div className="flex gap-2">
                {ESCALA_360.map((opt) => (
                  <button key={opt.value} onClick={() => set(q.id, opt.value)} title={opt.label}
                    className="flex-1 py-2.5 rounded-lg text-[15px] font-bold transition-all"
                    style={sel === opt.value
                      ? { background: GOLD, color: '#1c1a17', border: `2px solid ${GOLD}` }
                      : { background: 'rgba(255,255,255,0.05)', color: 'rgba(243,239,231,0.8)', border: '1px solid rgba(255,255,255,0.14)' }}>
                    {opt.value}
                  </button>
                ))}
              </div>
              <div className="flex justify-between text-[11px] mt-1.5" style={{ color: 'rgba(243,239,231,0.5)' }}>
                <span>Nunca demonstra</span>
                <span>Referência constante</span>
              </div>
            </Card>
          )
        })}
      </div>

      {error && <div className="mt-4"><ErrorBox>{error}</ErrorBox></div>}

      <div className="flex gap-3 mt-5">
        <button onClick={() => { setError(''); setPage((p) => Math.max(0, p - 1)) }} disabled={page === 0}
          className="flex-1 py-3.5 rounded-2xl font-bold text-[15px] disabled:opacity-40"
          style={{ background: 'rgba(255,255,255,0.08)', color: '#f3efe7', border: '1px solid rgba(255,255,255,0.16)' }}>
          ← Voltar
        </button>
        <button onClick={() => {
            if (!pilarCompleta) { setError('Responda todas as perguntas desta competência.'); return }
            setError(''); setPage((p) => p + 1)
          }}
          className="flex-[1.4] py-3.5 rounded-2xl font-bold text-[15px] text-soul-ink"
          style={{ background: 'linear-gradient(135deg, #c9a84c, #d4943a)' }}>
          Continuar →
        </button>
      </div>
    </Shell>
  )
}

// ── Subcomponentes ───────────────────────────────────────
function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen" style={{ background: BG }}>
      <main className="max-w-2xl mx-auto px-4 py-8">{children}</main>
    </div>
  )
}
function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}>{children}</div>
}
function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <p className="font-serif font-semibold text-xl" style={{ color: '#e6c869' }}>{n}</p>
      <p className="text-[12px]" style={{ color: 'rgba(243,239,231,0.6)' }}>{l}</p>
    </div>
  )
}
function ErrorBox({ children }: { children: React.ReactNode }) {
  return <div className="rounded-xl px-4 py-3 text-[14px] font-semibold" style={{ background: 'rgba(196,122,114,0.16)', border: '1px solid rgba(196,122,114,0.45)', color: '#f0a892' }}>{children}</div>
}
function Progress({ page, total, respondidas, totalPerguntas, progresso }: { page: number; total: number; respondidas: number; totalPerguntas: number; progresso: number }) {
  return (
    <div className="mb-5">
      <div className="flex justify-between text-[13px] mb-1.5" style={{ color: 'rgba(243,239,231,0.66)' }}>
        <span>Etapa {page + 1} de {total}</span>
        <span>{respondidas}/{totalPerguntas} respondidas</span>
      </div>
      <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
        <div className="h-full rounded-full transition-all" style={{ width: `${progresso}%`, background: 'linear-gradient(90deg, #c9a84c, #d4943a)' }} />
      </div>
    </div>
  )
}
