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
            <p className="text-[13.5px] font-bold uppercase tracking-widest mb-1" style={{ color: GOLD }}>Link para o seu líder</p>
            <p className="text-[15px] font-mono break-all" style={{ color: TEXT }}>{linkLider}</p>
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
          <p className="text-[14px] font-bold uppercase tracking-widest mb-3" style={{ color: GOLD }}>Diagnóstico gratuito · 3 minutos</p>
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
          <button onClick={() => setEtapa('dados')} className="pme-cta px-9 py-4 rounded-full text-[17px] font-bold shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #e0bb46, #c79a2c)', color: BG }}>
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
          {error && <div className="rounded-xl px-4 py-3 mb-4 text-[15px] font-semibold" style={{ background: 'rgba(192,57,43,0.18)', color: '#ff9a8d' }}>{error}</div>}
          <div className="space-y-4">
            <Field label="Seu nome"><input className="pme-input" value={donoNome} onChange={(e) => setDonoNome(e.target.value)} placeholder="Nome completo" /></Field>
            <Field label="E-mail (você receberá o resultado aqui)"><input type="email" className="pme-input" value={donoEmail} onChange={(e) => setDonoEmail(e.target.value)} placeholder="voce@empresa.com" /></Field>
            <Field label="WhatsApp com DDD">
              <input className="pme-input" value={donoTelefone} onChange={(e) => setDonoTelefone(e.target.value)} placeholder="(00) 00000-0000" />
              <p className="text-[13.5px] mt-1 font-medium" style={{ color: MUTED }}>Use um número correto, é por ele que faremos o seu acompanhamento.</p>
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
                <button type="button" onClick={() => setTemLideres(true)} className="flex-1 py-3 rounded-xl text-[15px] font-bold border-2 transition-all"
                        style={{ borderColor: temLideres === true ? GOLD : BORDER, background: temLideres === true ? GOLD : 'transparent', color: temLideres === true ? BG : TEXT }}>
                  Sim, tenho líderes
                </button>
                <button type="button" onClick={() => setTemLideres(false)} className="flex-1 py-3 rounded-xl text-[15px] font-bold border-2 transition-all"
                        style={{ borderColor: temLideres === false ? GOLD : BORDER, background: temLideres === false ? GOLD : 'transparent', color: temLideres === false ? BG : TEXT }}>
                  Não, sou o único líder
                </button>
              </div>
            </Field>
          </div>
          <button onClick={() => { if (validarDados()) setEtapa('questionario') }} className="pme-cta w-full mt-6 py-4 rounded-full text-[16px] font-bold" style={{ background: 'linear-gradient(135deg, #e0bb46, #c79a2c)', color: BG }}>
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
          <div className="flex justify-between text-[14px] font-semibold mb-1" style={{ color: MUTED }}>
            <span>{respondidas}/{perguntasAplicaveis.length} respondidas</span><span>{progresso}%</span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
            <div className="h-full rounded-full transition-all" style={{ width: `${progresso}%`, background: GOLD }} />
          </div>
        </div>

        <EscalaLegenda />

        {error && <div className="rounded-xl px-4 py-3 mb-4 text-[15px] font-semibold" style={{ background: 'rgba(192,57,43,0.18)', color: '#ff9a8d' }}>{error}</div>}

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

        <button onClick={enviar} disabled={loading} className="pme-cta w-full mt-7 py-4 rounded-full text-[17px] font-bold shadow-lg disabled:opacity-60" style={{ background: 'linear-gradient(135deg, #e0bb46, #c79a2c)', color: BG }}>
          {loading ? 'Gerando seu diagnóstico…' : 'Gerar meu diagnóstico →'}
        </button>
      </div>
    </Shell>
  )
}

// ── Componentes compartilhados ──
export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="pme-root" style={{ minHeight: '100vh', background: '#0c1422', position: 'relative', overflow: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        .pme-root, .pme-root button, .pme-root input, .pme-root select { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; }
        .pme-glow { position:absolute; top:-180px; left:50%; transform:translateX(-50%); width:760px; height:760px; border-radius:9999px; pointer-events:none;
          background: radial-gradient(circle, rgba(212,175,55,0.13) 0%, rgba(12,20,34,0) 62%); }
        .pme-input{ width:100%; padding:0.95rem 1.1rem; border:1px solid rgba(212,175,55,0.20); border-radius:14px; font-size:16px; font-weight:500; color:#eef2f9; background:#16223a; outline:none; transition:border-color .2s ease, box-shadow .2s ease; }
        .pme-input:focus{ border-color:#d4af37; box-shadow:0 0 0 4px rgba(212,175,55,0.10); }
        .pme-input::placeholder{ color:#6f819b; }
        .pme-input option{ background:#16223a; color:#eef2f9; }
        .pme-cta{ transition: transform .25s ease, box-shadow .25s ease; }
        .pme-cta:hover{ transform: translateY(-2px); box-shadow: 0 16px 38px -12px rgba(212,175,55,0.55); }
        .pme-qcard{ transition: border-color .25s ease, box-shadow .25s ease, transform .25s ease; }
        .pme-qcard:hover{ border-color: rgba(212,175,55,0.22); box-shadow: 0 18px 40px -24px rgba(0,0,0,0.6); }
        .pme-opt{ transition: all .18s ease; }
        .pme-opt:hover{ transform: translateY(-1px); }
      `}</style>
      <div className="pme-glow" />
      <header className="relative h-16 flex items-center px-6 lg:px-8" style={{ borderBottom: '1px solid rgba(212,175,55,0.16)' }}>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #d4af37, #b8902a)' }}>
            <svg viewBox="0 0 90 90" fill="none" className="w-4 h-4"><path d="M45 13L48.5 39.5L72 26L55.5 45L72 64L48.5 50.5L45 77L41.5 50.5L18 64L34.5 45L18 26L41.5 39.5Z" fill="rgba(12,20,34,0.4)" stroke="#0c1422" strokeWidth="2" strokeLinejoin="round"/><circle cx="45" cy="45" r="5" fill="#0c1422"/></svg>
          </div>
          <span className="font-bold text-[17px]" style={{ color: '#eef2f9' }}>Psique <span className="font-medium" style={{ color: '#8c9db6' }}>· Diagnóstico de Liderança</span></span>
        </div>
      </header>
      <main className="relative px-4 py-8 lg:py-10">{children}</main>
    </div>
  )
}

export function EscalaLegenda() {
  return (
    <div className="rounded-2xl px-5 py-4 mb-6" style={{ background: 'rgba(212,175,55,0.07)', border: '1px solid rgba(212,175,55,0.22)' }}>
      <p className="text-[13.5px] font-bold uppercase tracking-widest mb-1.5" style={{ color: '#d4af37' }}>Como responder</p>
      <p className="text-[15px] font-medium leading-relaxed" style={{ color: '#c9d6e8' }}>
        Dê uma nota de <strong style={{ color: '#eef2f9' }}>1 a 5</strong> para cada frase, pensando na sua realidade de hoje.
        <strong style={{ color: '#eef2f9' }}> 1 = Discordo totalmente</strong> (não é nada assim) e
        <strong style={{ color: '#eef2f9' }}> 5 = Concordo totalmente</strong> (é exatamente assim). O número 3 é o meio termo.
      </p>
    </div>
  )
}

export function PerguntaCard({ pergunta, valor, onSelect }: { pergunta: { id: string; texto: string }; valor?: number; onSelect: (v: number) => void }) {
  return (
    <div className="pme-qcard rounded-3xl p-5 md:p-6" style={{ background: '#16223a', border: '1px solid rgba(255,255,255,0.07)' }}>
      <p className="text-[17px] md:text-[18px] font-semibold mb-4 leading-snug" style={{ color: '#eef2f9' }}>{pergunta.texto}</p>
      <div className="flex gap-2 md:gap-2.5">
        {ESCALA_PME.map((opt) => {
          const sel = valor === opt.valor
          return (
            <button key={opt.valor} onClick={() => onSelect(opt.valor)} title={opt.label}
                    className="pme-opt flex-1 py-3.5 rounded-2xl border-2 text-[17px] font-bold"
                    style={{
                      borderColor: sel ? '#d4af37' : 'rgba(255,255,255,0.12)',
                      background: sel ? 'linear-gradient(135deg, #e0bb46, #c79a2c)' : 'transparent',
                      color: sel ? '#0c1422' : '#90a0b8',
                      boxShadow: sel ? '0 8px 22px -8px rgba(212,175,55,0.55)' : 'none',
                    }}>
              {opt.valor}
            </button>
          )
        })}
      </div>
      <div className="flex justify-between text-[13.5px] font-medium mt-2 px-0.5" style={{ color: '#6f819b' }}>
        <span>Discordo totalmente</span><span>Concordo totalmente</span>
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[14px] font-bold uppercase tracking-wide mb-1.5" style={{ color: '#9fb0c8' }}>{label}</label>
      {children}
    </div>
  )
}
