'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ESCALA_PME } from '@/content/pme-diagnostico/questionarios'

interface Pergunta { id: string; bloco: string; texto: string }

const BG = '#0f1826'
const CARD = '#1a2740'
const BORDER = 'rgba(212,175,55,0.20)'
const TEXT = '#e9eef6'
const MUTED = '#9fb0c8'
const GOLD = '#d4af37'

export default function DonoClient({ perguntas }: { perguntas: Pergunta[] }) {
  const router = useRouter()
  const [etapa, setEtapa] = useState<'intro' | 'dados' | 'questionario'>('intro')

  const [donoNome, setDonoNome] = useState('')
  const [donoEmail, setDonoEmail] = useState('')
  const [donoTelefone, setDonoTelefone] = useState('')
  const [empresa, setEmpresa] = useState('')
  const [funcionarios, setFuncionarios] = useState('')
  const [temLideres, setTemLideres] = useState<boolean | null>(null)

  const [respostas, setRespostas] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [linkLider, setLinkLider] = useState('')
  const [relatorioUrl, setRelatorioUrl] = useState('')
  const [copiado, setCopiado] = useState(false)

  const perguntasAplicaveis = useMemo(
    () => perguntas.filter((p) => temLideres || p.bloco !== 'Sua Liderança'),
    [perguntas, temLideres],
  )
  const blocos = useMemo(() => {
    const map = new Map<string, Pergunta[]>()
    perguntasAplicaveis.forEach((p) => { if (!map.has(p.bloco)) map.set(p.bloco, []); map.get(p.bloco)!.push(p) })
    return Array.from(map.entries())
  }, [perguntasAplicaveis])

  const respondidas = perguntasAplicaveis.filter((p) => respostas[p.id]).length
  const progresso = perguntasAplicaveis.length ? Math.round((respondidas / perguntasAplicaveis.length) * 100) : 0

  function validarDados(): boolean {
    if (donoNome.trim().length < 2) { setError('Informe o seu nome.'); return false }
    if (!donoEmail.includes('@')) { setError('Informe um e-mail válido. O seu resultado será enviado para ele.'); return false }
    if (donoTelefone.replace(/\D/g, '').length < 10) { setError('Informe um WhatsApp válido com DDD.'); return false }
    if (empresa.trim().length < 2) { setError('Informe o nome da empresa.'); return false }
    if (temLideres === null) { setError('Informe se a empresa tem líderes ou gestores.'); return false }
    setError('')
    return true
  }

  async function enviar() {
    setError('')
    const faltando = perguntasAplicaveis.filter((p) => !respostas[p.id])
    if (faltando.length > 0) { setError(`Faltam ${faltando.length} respostas para concluir.`); return }
    setLoading(true)
    try {
      const res = await fetch('/api/diagnostico-pme', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ donoNome, donoEmail, donoTelefone, empresa, funcionarios, temLideres, respostas }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error ?? 'Erro ao gerar o diagnóstico.'); return }
      setRelatorioUrl(data.relatorioUrl)
      if (data.linkLider) { setLinkLider(data.linkLider) }
      else { router.push(data.relatorioUrl) }
    } catch {
      setError('Erro de conexão. Tente novamente.')
    } finally { setLoading(false) }
  }

  function copiarLink() {
    navigator.clipboard.writeText(linkLider); setCopiado(true); setTimeout(() => setCopiado(false), 2000)
  }

  // ── Sucesso com gancho do líder ──
  if (linkLider && relatorioUrl) {
    return (
      <Shell>
        <div className="max-w-xl mx-auto text-center py-10">
          <div className="text-5xl mb-4">📋</div>
          <h1 className="font-serif text-3xl font-bold mb-3" style={{ color: TEXT }}>Seu diagnóstico inicial está pronto</h1>
          <p className="text-[16px] font-medium leading-relaxed mb-6" style={{ color: MUTED }}>
            Enviamos uma cópia para o seu e-mail. Mas o diagnóstico fica <strong style={{ color: GOLD }}>muito mais poderoso</strong> quando
            cruzamos a sua visão com a realidade do seu principal líder. Envie o link abaixo para ele responder (leva 3 minutos)
            e libere a análise completa com os pontos de atrito da sua gestão.
          </p>
          <div className="rounded-2xl p-4 mb-4 text-left" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
            <p className="text-[12px] font-bold uppercase tracking-widest mb-1" style={{ color: GOLD }}>Link para o seu líder</p>
            <p className="text-[14px] font-mono break-all" style={{ color: TEXT }}>{linkLider}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={copiarLink} className="px-6 py-3.5 rounded-full text-[15px] font-bold border-2" style={{ borderColor: GOLD, color: GOLD }}>
              {copiado ? '✓ Link copiado!' : '📋 Copiar link do líder'}
            </button>
            <button onClick={() => router.push(relatorioUrl)} className="px-6 py-3.5 rounded-full text-[15px] font-bold" style={{ background: GOLD, color: BG }}>
              Ver meu diagnóstico →
            </button>
          </div>
        </div>
      </Shell>
    )
  }

  // ── Intro ──
  if (etapa === 'intro') {
    return (
      <Shell>
        <div className="max-w-2xl mx-auto text-center py-8">
          <p className="text-[13px] font-bold uppercase tracking-widest mb-3" style={{ color: GOLD }}>Diagnóstico gratuito · 3 minutos</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold leading-tight mb-5" style={{ color: TEXT }}>
            O que está travando o crescimento da sua empresa?
          </h1>
          <p className="text-[18px] font-medium leading-relaxed mb-7 max-w-xl mx-auto" style={{ color: MUTED }}>
            Na maioria das pequenas e médias empresas, o gargalo não é o produto nem o mercado, é a liderança, a começar
            pela do próprio dono. Responda este diagnóstico rápido e receba um raio-x da maturidade da sua gestão.
          </p>
          <div className="rounded-2xl px-5 py-4 mb-7 text-[15px] font-semibold flex items-center justify-center gap-2"
               style={{ background: 'rgba(212,175,55,0.10)', border: `1px solid ${BORDER}`, color: GOLD }}>
            <span className="text-xl">✉️</span> O resultado completo será enviado direto para o seu e-mail.
          </div>
          <button onClick={() => setEtapa('dados')} className="px-9 py-4 rounded-full text-[17px] font-bold shadow-lg"
                  style={{ background: GOLD, color: BG }}>
            Começar diagnóstico →
          </button>
        </div>
      </Shell>
    )
  }

  // ── Dados do lead ──
  if (etapa === 'dados') {
    return (
      <Shell>
        <div className="max-w-md mx-auto py-6">
          <h2 className="font-serif text-3xl font-bold mb-1" style={{ color: TEXT }}>Sobre você e sua empresa</h2>
          <p className="text-[15px] font-medium mb-5" style={{ color: MUTED }}>Para personalizar e enviar o seu diagnóstico.</p>
          {error && <div className="rounded-xl px-4 py-3 mb-4 text-[14px] font-semibold" style={{ background: 'rgba(192,57,43,0.18)', color: '#ff9a8d' }}>{error}</div>}
          <div className="space-y-4">
            <Field label="Seu nome"><input className="pme-input" value={donoNome} onChange={(e) => setDonoNome(e.target.value)} placeholder="Nome completo" /></Field>
            <Field label="E-mail (você receberá o resultado aqui)"><input type="email" className="pme-input" value={donoEmail} onChange={(e) => setDonoEmail(e.target.value)} placeholder="voce@empresa.com" /></Field>
            <Field label="WhatsApp com DDD">
              <input className="pme-input" value={donoTelefone} onChange={(e) => setDonoTelefone(e.target.value)} placeholder="(00) 00000-0000" />
              <p className="text-[12px] mt-1 font-medium" style={{ color: MUTED }}>Use um número correto, é por ele que faremos o seu acompanhamento.</p>
            </Field>
            <Field label="Nome da empresa"><input className="pme-input" value={empresa} onChange={(e) => setEmpresa(e.target.value)} placeholder="Sua empresa" /></Field>
            <Field label="Quantos funcionários?">
              <select className="pme-input" value={funcionarios} onChange={(e) => setFuncionarios(e.target.value)}>
                <option value="">Selecione…</option>
                <option value="1-5">1 a 5</option><option value="6-20">6 a 20</option><option value="21-50">21 a 50</option><option value="50+">Mais de 50</option>
              </select>
            </Field>
            <Field label="A empresa já tem líderes ou gestores?">
              <div className="flex gap-2">
                <button type="button" onClick={() => setTemLideres(true)} className="flex-1 py-3 rounded-xl text-[14px] font-bold border-2 transition-all"
                        style={{ borderColor: temLideres === true ? GOLD : BORDER, background: temLideres === true ? GOLD : 'transparent', color: temLideres === true ? BG : TEXT }}>
                  Sim, tenho líderes
                </button>
                <button type="button" onClick={() => setTemLideres(false)} className="flex-1 py-3 rounded-xl text-[14px] font-bold border-2 transition-all"
                        style={{ borderColor: temLideres === false ? GOLD : BORDER, background: temLideres === false ? GOLD : 'transparent', color: temLideres === false ? BG : TEXT }}>
                  Não, sou o único líder
                </button>
              </div>
            </Field>
          </div>
          <button onClick={() => { if (validarDados()) setEtapa('questionario') }} className="w-full mt-6 py-4 rounded-full text-[16px] font-bold" style={{ background: GOLD, color: BG }}>
            Continuar →
          </button>
        </div>
      </Shell>
    )
  }

  // ── Questionário ──
  return (
    <Shell>
      <div className="max-w-2xl mx-auto py-4">
        <div className="sticky top-0 z-10 py-3 mb-2" style={{ background: BG }}>
          <div className="flex justify-between text-[13px] font-semibold mb-1" style={{ color: MUTED }}>
            <span>{respondidas}/{perguntasAplicaveis.length} respondidas</span><span>{progresso}%</span>
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
          {loading ? 'Gerando seu diagnóstico…' : 'Gerar meu diagnóstico →'}
        </button>
      </div>
    </Shell>
  )
}

// ── Componentes compartilhados ──
export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', background: '#0f1826' }}>
      <style>{`
        .pme-input{width:100%;padding:0.85rem 1rem;border:1px solid rgba(212,175,55,0.22);border-radius:0.8rem;font-size:16px;font-weight:500;color:#e9eef6;background:#1a2740;outline:none}
        .pme-input:focus{border-color:#d4af37}
        .pme-input::placeholder{color:#6f819b}
        .pme-input option{background:#1a2740;color:#e9eef6}
      `}</style>
      <header className="h-14 flex items-center px-6" style={{ borderBottom: '1px solid rgba(212,175,55,0.18)' }}>
        <span className="font-serif font-bold text-[18px]" style={{ color: '#e9eef6' }}>Psique <span className="font-normal" style={{ color: '#9fb0c8' }}>· Diagnóstico de Liderança</span></span>
      </header>
      <main className="px-4 py-7">{children}</main>
    </div>
  )
}

export function EscalaLegenda() {
  return (
    <div className="rounded-2xl px-4 py-3 mb-5" style={{ background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.20)' }}>
      <p className="text-[13px] font-bold mb-1" style={{ color: '#d4af37' }}>Como responder</p>
      <p className="text-[14px] font-medium leading-snug" style={{ color: '#c4d2e6' }}>
        Dê uma nota de <strong style={{ color: '#e9eef6' }}>1 a 5</strong> para cada frase, pensando na sua realidade de hoje.
        <strong style={{ color: '#e9eef6' }}> 1 = Discordo totalmente</strong> (não é nada assim) e
        <strong style={{ color: '#e9eef6' }}> 5 = Concordo totalmente</strong> (é exatamente assim). O número 3 é o meio termo.
      </p>
    </div>
  )
}

export function PerguntaCard({ pergunta, valor, onSelect }: { pergunta: { id: string; texto: string }; valor?: number; onSelect: (v: number) => void }) {
  return (
    <div className="rounded-2xl p-4 md:p-5" style={{ background: '#1a2740', border: '1px solid rgba(255,255,255,0.06)' }}>
      <p className="text-[16px] md:text-[17px] font-semibold mb-3.5 leading-snug" style={{ color: '#e9eef6' }}>{pergunta.texto}</p>
      <div className="flex gap-2">
        {ESCALA_PME.map((opt) => {
          const sel = valor === opt.valor
          return (
            <button key={opt.valor} onClick={() => onSelect(opt.valor)} title={opt.label}
                    className="flex-1 py-3 rounded-xl border-2 text-[16px] font-bold transition-all"
                    style={{ borderColor: sel ? '#d4af37' : 'rgba(255,255,255,0.12)', background: sel ? '#d4af37' : 'transparent', color: sel ? '#0f1826' : '#8c9db6' }}>
              {opt.valor}
            </button>
          )
        })}
      </div>
      <div className="flex justify-between text-[11.5px] font-medium mt-1.5 px-0.5" style={{ color: '#6f819b' }}>
        <span>Discordo totalmente</span><span>Concordo totalmente</span>
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[13px] font-bold uppercase tracking-wide mb-1.5" style={{ color: '#9fb0c8' }}>{label}</label>
      {children}
    </div>
  )
}
