'use client'

import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { GapCruzamento } from '@/content/pme-diagnostico/questionarios'

const NAVY = '#1a2a40'
const GOLD = '#d4af37'

interface Props {
  id: string
  empresa: string
  donoNome: string
  funcionarios: string | null
  temLideres: boolean
  liderRespondeu: boolean
  tokenLider: string
  score: number
  faixaRotulo: string
  faixaCor: string
  faixaResumo: string
  pilares: Array<{ nome: string; pct: number }>
  gaps: GapCruzamento[]
  cenarioTitulo: string
  cenarioDirecionamento: string
  relatorioAiInicial: string
}

const ATRITO_COR: Record<string, { bg: string; cor: string; label: string }> = {
  CRITICO:  { bg: '#fdecea', cor: '#c0392b', label: 'CRÍTICO' },
  MEDIO:    { bg: '#fff6e0', cor: '#b8860b', label: 'MÉDIO' },
  ALINHADO: { bg: '#eaf6ec', cor: '#2e7d32', label: 'ALINHADO' },
}

export default function RelatorioClient(p: Props) {
  const [ai, setAi] = useState(p.relatorioAiInicial)
  const [aiLoading, setAiLoading] = useState(false)
  const [copiado, setCopiado] = useState(false)
  const appUrl = typeof window !== 'undefined' ? window.location.origin : ''

  // Gera a análise automaticamente se ainda não existir
  useEffect(() => {
    if (ai) return
    let cancel = false
    setAiLoading(true)
    fetch(`/api/diagnostico-pme/${p.id}/relatorio-ai`, { method: 'POST' })
      .then((r) => r.json())
      .then((d) => { if (!cancel && d.markdown) setAi(d.markdown) })
      .catch(() => {})
      .finally(() => { if (!cancel) setAiLoading(false) })
    return () => { cancel = true }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function copiarLink() {
    navigator.clipboard.writeText(`${appUrl}/diagnostico-pme/${p.tokenLider}`)
    setCopiado(true); setTimeout(() => setCopiado(false), 2000)
  }

  return (
    <>
      <style>{`
        @media print { .pme-noprint { display:none !important } body { background:#fff !important } }
        .pme-card { background:#fff; border:1px solid #e8eaed; border-radius:16px }
        .pme-narrative h2 { font-family:Georgia,serif; font-size:17px; font-weight:700; color:${NAVY}; margin:18px 0 8px }
        .pme-narrative h2:first-child { margin-top:0 }
        .pme-narrative p { margin:0 0 10px }
        .pme-narrative ul,.pme-narrative ol { margin:0 0 10px; padding-left:20px }
        .pme-narrative li { margin-bottom:5px }
        .pme-narrative strong { color:${NAVY} }
      `}</style>

      {/* Barra de ações */}
      <div className="pme-noprint sticky top-0 z-20 flex items-center justify-between px-5 h-14" style={{ background: NAVY }}>
        <span className="font-serif font-bold text-[16px] text-white">Psique <span className="font-normal text-white/70">· Diagnóstico</span></span>
        <button onClick={() => window.print()} className="px-4 py-2 rounded-full text-[14px] font-bold" style={{ background: GOLD, color: NAVY }}>
          ↓ Salvar PDF
        </button>
      </div>

      <main className="max-w-3xl mx-auto px-4 py-7 space-y-5">
        {/* Cabeçalho */}
        <div className="rounded-2xl p-6 md:p-8 text-white relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${NAVY}, #2b3a52)` }}>
          <p className="text-[13px] font-bold uppercase tracking-widest mb-2" style={{ color: GOLD }}>Diagnóstico de Liderança</p>
          <h1 className="font-serif text-3xl md:text-4xl font-bold leading-tight">{p.empresa}</h1>
          <p className="text-[15px] text-white/80 font-medium mt-1">Responsável: {p.donoNome}{p.funcionarios ? ` · ${p.funcionarios} funcionários` : ''}</p>
        </div>

        {/* BLOCO 1: Raio-X de maturidade */}
        <div className="pme-card p-6">
          <p className="text-[13px] font-bold uppercase tracking-widest mb-3" style={{ color: GOLD }}>Bloco 1 · Raio-X de Maturidade</p>
          <div className="flex items-center gap-6 flex-wrap">
            <div className="flex-shrink-0">
              <div className="relative" style={{ width: 120, height: 120 }}>
                <svg viewBox="0 0 120 120" width="120" height="120">
                  <circle cx="60" cy="60" r="50" fill="none" stroke="#eceef1" strokeWidth="12" />
                  <circle cx="60" cy="60" r="50" fill="none" stroke={p.faixaCor} strokeWidth="12" strokeLinecap="round"
                          strokeDasharray={`${(p.score / 100) * 314} 314`} transform="rotate(-90 60 60)" />
                  <text x="60" y="58" textAnchor="middle" fontSize="30" fontWeight="700" fill={NAVY}>{p.score}</text>
                  <text x="60" y="76" textAnchor="middle" fontSize="10" fill="#94a3b8" fontWeight="600">de 100</text>
                </svg>
              </div>
            </div>
            <div className="flex-1 min-w-[220px]">
              <span className="inline-block px-3 py-1 rounded-full text-[13.5px] font-bold mb-2" style={{ background: `${p.faixaCor}22`, color: p.faixaCor }}>{p.faixaRotulo}</span>
              <p className="text-[15.5px] text-gray-700 font-medium leading-relaxed">{p.faixaResumo}</p>
            </div>
          </div>
        </div>

        {/* BLOCO 2: Triângulo da PME */}
        <div className="pme-card p-6">
          <p className="text-[13px] font-bold uppercase tracking-widest mb-1" style={{ color: GOLD }}>Bloco 2 · O Triângulo da PME</p>
          <p className="text-[14px] text-gray-500 font-medium mb-4">Os três pilares vitais do seu negócio, na sua percepção.</p>
          <div className="space-y-3">
            {p.pilares.map((pi) => (
              <div key={pi.nome}>
                <div className="flex justify-between text-[14.5px] mb-1">
                  <span className="font-semibold" style={{ color: NAVY }}>{pi.nome}</span>
                  <span className="font-bold" style={{ color: NAVY }}>{pi.pct}%</span>
                </div>
                <div className="h-3 rounded-full overflow-hidden" style={{ background: '#eceef1' }}>
                  <div className="h-full rounded-full" style={{ width: `${pi.pct}%`, background: pi.pct >= 60 ? '#7a9e7e' : pi.pct >= 40 ? GOLD : '#c0392b' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BLOCO 3: Tabela de atrito (só se líder respondeu) */}
        {p.liderRespondeu && p.gaps.length > 0 ? (
          <div className="pme-card p-6">
            <p className="text-[13px] font-bold uppercase tracking-widest mb-1" style={{ color: GOLD }}>Bloco 3 · Alinhamento de Expectativas</p>
            <p className="text-[14px] text-gray-500 font-medium mb-4">Onde a visão da direção colide com a realidade do líder.</p>
            <div className="space-y-2.5">
              {p.gaps.map((g, i) => {
                const a = ATRITO_COR[g.atrito]
                return (
                  <div key={i} className="rounded-xl p-3.5" style={{ background: '#fafbfc', border: '1px solid #e8eaed' }}>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <p className="text-[14.5px] font-bold" style={{ color: NAVY }}>{g.indicador}</p>
                      <span className="text-[12px] font-bold px-2 py-0.5 rounded-full flex-shrink-0" style={{ background: a.bg, color: a.cor }}>{a.label}</span>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-2 text-[13.5px]">
                      <p className="text-gray-600"><strong style={{ color: NAVY }}>Dono:</strong> {g.visaoDono}</p>
                      <p className="text-gray-600"><strong style={{ color: NAVY }}>Líder:</strong> {g.realidadeLider}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ) : !p.liderRespondeu && p.temLideres ? (
          <div className="pme-card p-6 pme-noprint" style={{ borderColor: `${GOLD}66`, background: '#fffdf5' }}>
            <p className="text-[13px] font-bold uppercase tracking-widest mb-1" style={{ color: GOLD }}>Libere a análise completa</p>
            <p className="font-serif text-lg font-bold mb-1" style={{ color: NAVY }}>Falta a visão do seu líder</p>
            <p className="text-[14.5px] text-gray-600 font-medium leading-relaxed mb-3">
              Este diagnóstico fica muito mais poderoso quando cruzamos a sua visão com a realidade de quem está no
              chão da operação. Envie o link abaixo para o seu principal líder responder.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input readOnly value={`${appUrl}/diagnostico-pme/${p.tokenLider}`} className="flex-1 px-3 py-2 rounded-lg text-[13.5px] font-mono text-gray-600" style={{ border: '1px solid #e0e3e8', background: '#fff' }} />
              <button onClick={copiarLink} className="px-4 py-2 rounded-full text-[14px] font-bold text-white" style={{ background: NAVY }}>
                {copiado ? '✓ Copiado' : 'Copiar link'}
              </button>
            </div>
          </div>
        ) : null}

        {/* BLOCO 4: Análise + plano (IA) */}
        <div className="pme-card p-6">
          <p className="text-[13px] font-bold uppercase tracking-widest mb-1" style={{ color: GOLD }}>Bloco 4 · Análise e Plano de Ação</p>
          <p className="text-[14px] text-gray-500 font-medium mb-4">Cenário identificado: <strong style={{ color: NAVY }}>{p.cenarioTitulo}</strong></p>
          {ai ? (
            <div className="pme-narrative text-[15px] text-gray-700 leading-relaxed">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{ai}</ReactMarkdown>
            </div>
          ) : aiLoading ? (
            <p className="text-[15px] text-gray-500 font-medium py-4">Montando a sua análise personalizada…</p>
          ) : (
            <p className="text-[15px] text-gray-700 font-medium leading-relaxed">{p.cenarioDirecionamento}</p>
          )}
        </div>

        {/* CTA comercial */}
        <div className="rounded-2xl p-6 text-center" style={{ border: `2px solid ${GOLD}`, background: '#fffdf5' }}>
          <p className="font-serif text-xl font-bold mb-2" style={{ color: NAVY }}>Próximo passo estratégico</p>
          <p className="text-[15px] text-gray-600 font-medium leading-relaxed mb-4 max-w-lg mx-auto">
            Este diagnóstico identificou pontos que estão travando o crescimento e centralizando a operação. Que tal desenhar
            o plano de desenvolvimento ideal para corrigir esses desvios na sua empresa?
          </p>
          <a href="https://wa.me/?text=Quero%20agendar%20uma%20sessao%20estrategica%20de%20lideranca"
             target="_blank" rel="noopener noreferrer"
             className="inline-block px-7 py-3.5 rounded-full text-[15px] font-bold text-white no-underline"
             style={{ background: `linear-gradient(135deg, ${NAVY}, #2b3a52)` }}>
            Agendar sessão estratégica →
          </a>
        </div>

        <p className="text-center text-[13px] text-gray-400 font-medium pb-6">Diagnóstico gerado por Psique · Mapa Comportamental</p>
      </main>
    </>
  )
}
