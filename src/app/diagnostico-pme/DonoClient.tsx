'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ESCALA_PME } from '@/content/pme-diagnostico/questionarios'

interface Pergunta { id: string; bloco: string; texto: string }

const NAVY = '#1a2a40'
const GOLD = '#d4af37'

export default function DonoClient({ perguntas }: { perguntas: Pergunta[] }) {
  const router = useRouter()
  const [etapa, setEtapa] = useState<'intro' | 'dados' | 'questionario'>('intro')

  // Dados do lead
  const [donoNome, setDonoNome] = useState('')
  const [donoEmail, setDonoEmail] = useState('')
  const [donoTelefone, setDonoTelefone] = useState('')
  const [empresa, setEmpresa] = useState('')
  const [funcionarios, setFuncionarios] = useState('')
  const [temLideres, setTemLideres] = useState<boolean | null>(null)

  // Respostas
  const [respostas, setRespostas] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [linkLider, setLinkLider] = useState('')
  const [relatorioUrl, setRelatorioUrl] = useState('')
  const [copiado, setCopiado] = useState(false)

  // Perguntas aplicáveis (esconde bloco "Sua Liderança" se não tem líderes)
  const perguntasAplicaveis = useMemo(
    () => perguntas.filter((p) => temLideres || p.bloco !== 'Sua Liderança'),
    [perguntas, temLideres],
  )

  const blocos = useMemo(() => {
    const map = new Map<string, Pergunta[]>()
    perguntasAplicaveis.forEach((p) => {
      if (!map.has(p.bloco)) map.set(p.bloco, [])
      map.get(p.bloco)!.push(p)
    })
    return Array.from(map.entries())
  }, [perguntasAplicaveis])

  const respondidas = perguntasAplicaveis.filter((p) => respostas[p.id]).length
  const progresso = perguntasAplicaveis.length ? Math.round((respondidas / perguntasAplicaveis.length) * 100) : 0

  function validarDados(): boolean {
    if (donoNome.trim().length < 2) { setError('Informe seu nome.'); return false }
    if (!donoEmail.includes('@')) { setError('Informe um e-mail válido.'); return false }
    if (empresa.trim().length < 2) { setError('Informe o nome da empresa.'); return false }
    if (temLideres === null) { setError('Informe se a empresa tem líderes ou gestores.'); return false }
    setError('')
    return true
  }

  async function enviar() {
    setError('')
    const faltando = perguntasAplicaveis.filter((p) => !respostas[p.id])
    if (faltando.length > 0) { setError(`Faltam ${faltando.length} respostas.`); return }
    setLoading(true)
    try {
      const res = await fetch('/api/diagnostico-pme', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ donoNome, donoEmail, donoTelefone, empresa, funcionarios, temLideres, respostas }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error ?? 'Erro ao gerar o diagnóstico.'); return }
      setRelatorioUrl(data.relatorioUrl)
      if (data.linkLider) {
        setLinkLider(data.linkLider)
        setEtapa('questionario') // mantém na tela pra mostrar o gancho do líder
      } else {
        router.push(data.relatorioUrl)
      }
    } catch {
      setError('Erro de conexão. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  function copiarLink() {
    navigator.clipboard.writeText(linkLider)
    setCopiado(true)
    setTimeout(() => setCopiado(false), 2000)
  }

  // ── Tela de sucesso com gancho do líder ──
  if (linkLider && relatorioUrl) {
    return (
      <Shell>
        <div className="max-w-xl mx-auto text-center py-10">
          <div className="text-5xl mb-4">📋</div>
          <h1 className="font-serif text-3xl font-bold mb-3" style={{ color: NAVY }}>Seu diagnóstico inicial está pronto</h1>
          <p className="text-[15px] text-gray-600 font-medium leading-relaxed mb-6">
            Você já pode ver o seu raio-x de maturidade. Mas o diagnóstico fica <strong>muito mais poderoso</strong> quando
            cruzamos a sua visão com a realidade do seu principal líder. Envie o link abaixo para ele responder (leva 3 minutos)
            e libere a análise completa com os pontos de atrito da sua gestão.
          </p>
          <div className="rounded-2xl p-4 mb-4 text-left" style={{ background: '#fff', border: `1px solid ${GOLD}55` }}>
            <p className="text-[11px] font-bold uppercase tracking-widest mb-1" style={{ color: GOLD }}>Link para o seu líder</p>
            <p className="text-[13px] font-mono break-all text-gray-700">{linkLider}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={copiarLink} className="px-5 py-3 rounded-full text-[14px] font-bold border-2"
                    style={{ borderColor: GOLD, color: NAVY }}>
              {copiado ? '✓ Link copiado!' : '📋 Copiar link do líder'}
            </button>
            <button onClick={() => router.push(relatorioUrl)} className="px-5 py-3 rounded-full text-[14px] font-bold text-white"
                    style={{ background: NAVY }}>
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
          <p className="text-[12px] font-bold uppercase tracking-widest mb-3" style={{ color: GOLD }}>Diagnóstico gratuito · 3 minutos</p>
          <h1 className="font-serif text-3xl md:text-4xl font-bold leading-tight mb-4" style={{ color: NAVY }}>
            O que está travando o crescimento da sua empresa?
          </h1>
          <p className="text-[16px] text-gray-600 font-medium leading-relaxed mb-8 max-w-xl mx-auto">
            Na maioria das pequenas e médias empresas, o gargalo não é o produto nem o mercado, é a liderança (a começar
            pela do próprio dono). Responda este diagnóstico rápido e receba um raio-x da maturidade da sua gestão, com um
            plano de ação prático.
          </p>
          <div className="grid sm:grid-cols-3 gap-3 mb-8 text-left">
            {[
              { t: 'Raio-x de maturidade', d: 'Uma nota de 0 a 100 da saúde da sua liderança.' },
              { t: 'Pontos de atrito', d: 'Onde a sua visão e a do seu time não batem.' },
              { t: 'Plano de ação', d: 'O próximo passo concreto para destravar o crescimento.' },
            ].map((c, i) => (
              <div key={i} className="rounded-2xl p-4" style={{ background: '#fff', border: '1px solid #e8eaed' }}>
                <p className="text-[13.5px] font-bold mb-1" style={{ color: NAVY }}>{c.t}</p>
                <p className="text-[12.5px] text-gray-500 font-medium leading-snug">{c.d}</p>
              </div>
            ))}
          </div>
          <button onClick={() => setEtapa('dados')} className="px-8 py-4 rounded-full text-[16px] font-bold text-white shadow-lg"
                  style={{ background: `linear-gradient(135deg, ${NAVY}, #2b3a52)` }}>
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
          <h2 className="font-serif text-2xl font-bold mb-1" style={{ color: NAVY }}>Sobre você e sua empresa</h2>
          <p className="text-[14px] text-gray-500 font-medium mb-5">Para personalizar o seu diagnóstico.</p>
          {error && <div className="rounded-xl px-4 py-3 mb-4 text-[13px] font-semibold" style={{ background: '#fdecea', color: '#9b2c2c' }}>{error}</div>}
          <div className="space-y-3">
            <Field label="Seu nome"><input className="pme-input" value={donoNome} onChange={(e) => setDonoNome(e.target.value)} placeholder="Nome completo" /></Field>
            <Field label="E-mail"><input type="email" className="pme-input" value={donoEmail} onChange={(e) => setDonoEmail(e.target.value)} placeholder="voce@empresa.com" /></Field>
            <Field label="WhatsApp (opcional)"><input className="pme-input" value={donoTelefone} onChange={(e) => setDonoTelefone(e.target.value)} placeholder="(00) 00000-0000" /></Field>
            <Field label="Nome da empresa"><input className="pme-input" value={empresa} onChange={(e) => setEmpresa(e.target.value)} placeholder="Sua empresa" /></Field>
            <Field label="Quantos funcionários?">
              <select className="pme-input" value={funcionarios} onChange={(e) => setFuncionarios(e.target.value)}>
                <option value="">Selecione…</option>
                <option value="1-5">1 a 5</option>
                <option value="6-20">6 a 20</option>
                <option value="21-50">21 a 50</option>
                <option value="50+">Mais de 50</option>
              </select>
            </Field>
            <Field label="A empresa já tem líderes ou gestores?">
              <div className="flex gap-2">
                <button type="button" onClick={() => setTemLideres(true)}
                        className="flex-1 py-2.5 rounded-xl text-[13.5px] font-bold border-2 transition-all"
                        style={{ borderColor: temLideres === true ? NAVY : '#e0e3e8', background: temLideres === true ? NAVY : '#fff', color: temLideres === true ? '#fff' : '#475569' }}>
                  Sim, tenho líderes
                </button>
                <button type="button" onClick={() => setTemLideres(false)}
                        className="flex-1 py-2.5 rounded-xl text-[13.5px] font-bold border-2 transition-all"
                        style={{ borderColor: temLideres === false ? NAVY : '#e0e3e8', background: temLideres === false ? NAVY : '#fff', color: temLideres === false ? '#fff' : '#475569' }}>
                  Não, sou o único líder
                </button>
              </div>
            </Field>
          </div>
          <button onClick={() => { if (validarDados()) setEtapa('questionario') }}
                  className="w-full mt-5 py-3.5 rounded-full text-[15px] font-bold text-white" style={{ background: NAVY }}>
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
        {/* Progresso */}
        <div className="sticky top-0 z-10 py-3 mb-4" style={{ background: '#fafbfc' }}>
          <div className="flex justify-between text-[12px] font-semibold text-gray-500 mb-1">
            <span>{respondidas}/{perguntasAplicaveis.length} respondidas</span>
            <span>{progresso}%</span>
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
                    <div className="flex justify-between text-[10px] text-gray-400 font-medium mt-1 px-0.5">
                      <span>Discordo</span><span>Concordo</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button onClick={enviar} disabled={loading}
                className="w-full mt-6 py-4 rounded-full text-[16px] font-bold text-white shadow-lg disabled:opacity-60"
                style={{ background: `linear-gradient(135deg, ${NAVY}, #2b3a52)` }}>
          {loading ? 'Gerando seu diagnóstico…' : 'Gerar meu diagnóstico →'}
        </button>
      </div>
    </Shell>
  )
}

// ── Componentes auxiliares ──
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
