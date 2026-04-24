'use client'

import { useState } from 'react'

// ── Tipos ──────────────────────────────────────────────────────

interface ReportAction {
  prioridade: number
  area: string
  acao: string
}

interface ReportItem {
  tema: string
  descricao: string
}

interface BundleReportContent {
  perfil_sintese: {
    titulo: string
    descricao: string
  }
  convergencias: {
    titulo: string
    itens: ReportItem[]
  }
  tensoes_internas: {
    titulo: string
    itens: ReportItem[]
  }
  aplicacao_profissional: {
    titulo: string
    lideranca: string
    comunicacao: string
    ambiente_ideal: string
    pontos_de_atencao: string
  }
  aplicacao_pessoal: {
    titulo: string
    relacionamentos: string
    tomada_de_decisao: string
    padroes_a_observar: string
  }
  plano_de_desenvolvimento: {
    titulo: string
    acoes: ReportAction[]
  }
}

interface Props {
  bundleId: string
  status: string
  employeeName: string
  content: BundleReportContent | null
  pdfUrl: string | null
  createdAt: string
}

// ── Helpers ────────────────────────────────────────────────────

function initials(name: string) {
  return name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase()
}

// ── Componente principal ───────────────────────────────────────

export default function BundleReportClient({
  bundleId, status, employeeName, content, pdfUrl, createdAt
}: Props) {
  const [regenerating, setRegenerating] = useState(false)
  const [currentStatus, setCurrentStatus] = useState(status)

  async function handleRegenerate() {
    setRegenerating(true)
    try {
      const res = await fetch(`/api/bundle-reports/${bundleId}`, { method: 'POST' })
      if (res.ok) {
        setCurrentStatus('GENERATING')
        const interval = setInterval(async () => {
          const r = await fetch(`/api/bundle-reports/${bundleId}`)
          const d = await r.json()
          if (d.status === 'COMPLETED' || d.status === 'FAILED') {
            clearInterval(interval)
            window.location.reload()
          }
        }, 5000)
        setTimeout(() => clearInterval(interval), 120_000)
      }
    } finally {
      setRegenerating(false)
    }
  }

  // ── Estado: gerando ──────────────────────────────────────────

  if (currentStatus === 'GENERATING' || currentStatus === 'PENDING') {
    return (
      <div className="max-w-2xl mx-auto py-24 text-center px-4">
        {/* Spinning mandala */}
        <div className="relative w-20 h-20 mx-auto mb-8">
          <svg viewBox="0 0 90 90" className="w-full h-full animate-spin"
               style={{ animationDuration: '3s' }}>
            <circle cx="45" cy="45" r="42" stroke="rgba(196,99,58,0.2)" strokeWidth="1.5" strokeDasharray="4 6" fill="none"/>
            <circle cx="45" cy="45" r="30" stroke="rgba(196,99,58,0.12)" strokeWidth="0.8" fill="none"/>
            <path
              d="M45 13L48.5 39.5L72 26L55.5 45L72 64L48.5 50.5L45 77L41.5 50.5L18 64L34.5 45L18 26L41.5 39.5Z"
              fill="rgba(196,99,58,0.08)" stroke="#c4633a" strokeWidth="1.2" strokeLinejoin="round"
            />
            <circle cx="45" cy="45" r="5" fill="#c4633a" opacity="0.5"/>
            <circle cx="45" cy="45" r="2.5" fill="#c4633a" opacity="0.8"/>
          </svg>
        </div>
        <h2 className="font-serif font-light text-2xl text-soul-ink mb-3">
          Cruzando os resultados…
        </h2>
        <p className="text-sm text-soul-ink/50 font-sans max-w-xs mx-auto leading-relaxed mb-8">
          A inteligência artificial está integrando os 4 testes em uma devolutiva única.
          Isso pode levar até 1 minuto.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="text-sm text-soul-terracota hover:underline font-sans"
        >
          Atualizar página →
        </button>
      </div>
    )
  }

  // ── Estado: erro ─────────────────────────────────────────────

  if (currentStatus === 'FAILED' || !content) {
    return (
      <div className="max-w-2xl mx-auto py-24 text-center px-4">
        <div className="text-5xl mb-4">⚠️</div>
        <h2 className="font-serif font-light text-2xl text-soul-ink mb-3">Erro na geração</h2>
        <p className="text-sm text-soul-ink/50 font-sans mb-8">
          Ocorreu um problema ao gerar a devolutiva. Você pode tentar novamente.
        </p>
        <button
          onClick={handleRegenerate}
          disabled={regenerating}
          className="px-6 py-2.5 rounded-full text-sm font-sans font-medium text-white
                     transition-all hover:-translate-y-px shadow-terra disabled:opacity-60"
          style={{ background: 'linear-gradient(135deg, #c4633a, #d4943a)' }}
        >
          {regenerating ? 'Gerando…' : '↻ Tentar novamente'}
        </button>
      </div>
    )
  }

  // ── Relatório completo ────────────────────────────────────────

  const dateStr = new Date(createdAt).toLocaleDateString('pt-BR', {
    day: '2-digit', month: 'long', year: 'numeric'
  })

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-6">

      {/* ── Hero header ── */}
      <div
        className="rounded-3xl p-8 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1c1a17 0%, #2d2417 50%, #3d2a1c 100%)' }}
      >
        {/* Decorative orbs */}
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full pointer-events-none"
             style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.13) 0%, transparent 70%)', transform: 'translate(20%, -30%)' }}/>
        <div className="absolute bottom-0 left-1/3 w-48 h-48 rounded-full pointer-events-none"
             style={{ background: 'radial-gradient(circle, rgba(196,99,58,0.08) 0%, transparent 70%)', transform: 'translateY(40%)' }}/>

        {/* Mandala glyph (right) */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-8 pointer-events-none hidden lg:block">
          <svg width="120" height="120" viewBox="0 0 90 90" fill="none" opacity="0.15">
            <circle cx="45" cy="45" r="42" stroke="white" strokeWidth="0.5" strokeDasharray="4 6"/>
            <circle cx="45" cy="45" r="30" stroke="white" strokeWidth="0.5"/>
            <path d="M45 13L48.5 39.5L72 26L55.5 45L72 64L48.5 50.5L45 77L41.5 50.5L18 64L34.5 45L18 26L41.5 39.5Z"
              fill="white" opacity="0.4"/>
            <circle cx="45" cy="45" r="5" fill="white" opacity="0.6"/>
          </svg>
        </div>

        <div className="relative z-10 flex items-start justify-between gap-6 flex-wrap">
          <div className="flex-1">
            <div className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] mb-3"
                 style={{ color: '#c9a84c' }}>
              Devolutiva Integrada · Bundle 4 Testes
            </div>
            <h1 className="font-serif font-light text-white leading-tight mb-3"
                style={{ fontSize: '28px' }}>
              {content.perfil_sintese.titulo}
            </h1>

            {/* Employee badge */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-soul-ink flex-shrink-0"
                   style={{ background: 'linear-gradient(135deg, #c9a84c, #d4943a)' }}>
                {initials(employeeName)}
              </div>
              <div>
                <div className="text-sm font-medium text-white/80 font-sans">{employeeName}</div>
                <div className="text-[11px] text-white/35 font-sans">Gerado em {dateStr}</div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 flex-shrink-0 flex-wrap">
            {pdfUrl && (
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full text-xs font-sans font-medium border transition-all"
                style={{ borderColor: 'rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.7)' }}
              >
                📄 Baixar PDF
              </a>
            )}
            <button
              onClick={handleRegenerate}
              disabled={regenerating}
              className="px-4 py-2 rounded-full text-xs font-sans font-medium border transition-all disabled:opacity-50"
              style={{ borderColor: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.5)' }}
            >
              {regenerating ? 'Gerando…' : '↻ Regenerar'}
            </button>
          </div>
        </div>
      </div>

      {/* ── Perfil Síntese ── */}
      <ReportSection
        emoji="🧭"
        title={content.perfil_sintese.titulo}
        accent="#3d4f7c"
        accentBg="rgba(61,79,124,0.06)"
        accentBorder="rgba(61,79,124,0.15)"
      >
        <div className="space-y-4">
          {content.perfil_sintese.descricao.split('\n').map((p, i) =>
            p.trim()
              ? <p key={i} className="text-sm text-soul-ink/70 leading-relaxed font-sans">{p}</p>
              : null
          )}
        </div>
      </ReportSection>

      {/* ── Convergências ── */}
      <ReportSection
        emoji="🤝"
        title={content.convergencias.titulo}
        accent="#7a9e7e"
        accentBg="rgba(122,158,126,0.06)"
        accentBorder="rgba(122,158,126,0.15)"
      >
        <div className="space-y-4">
          {content.convergencias.itens.map((item, i) => (
            <div key={i} className="flex gap-4">
              <div className="w-1 rounded-full flex-shrink-0 mt-1" style={{ background: '#7a9e7e', minHeight: '100%' }}/>
              <div>
                <h4 className="text-sm font-semibold text-soul-ink mb-1 font-sans">{item.tema}</h4>
                <p className="text-sm text-soul-ink/60 leading-relaxed font-sans">{item.descricao}</p>
              </div>
            </div>
          ))}
        </div>
      </ReportSection>

      {/* ── Tensões Internas ── */}
      <ReportSection
        emoji="⚡"
        title={content.tensoes_internas.titulo}
        accent="#d4943a"
        accentBg="rgba(212,148,58,0.06)"
        accentBorder="rgba(212,148,58,0.15)"
      >
        <div className="space-y-4">
          {content.tensoes_internas.itens.map((item, i) => (
            <div key={i} className="flex gap-4">
              <div className="w-1 rounded-full flex-shrink-0 mt-1" style={{ background: '#d4943a', minHeight: '100%' }}/>
              <div>
                <h4 className="text-sm font-semibold text-soul-ink mb-1 font-sans">{item.tema}</h4>
                <p className="text-sm text-soul-ink/60 leading-relaxed font-sans">{item.descricao}</p>
              </div>
            </div>
          ))}
        </div>
      </ReportSection>

      {/* ── Aplicação Profissional ── */}
      <ReportSection
        emoji="💼"
        title={content.aplicacao_profissional.titulo}
        accent="#c4633a"
        accentBg="rgba(196,99,58,0.05)"
        accentBorder="rgba(196,99,58,0.12)"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SubCard title="Liderança"         text={content.aplicacao_profissional.lideranca}         />
          <SubCard title="Comunicação"       text={content.aplicacao_profissional.comunicacao}       />
          <SubCard title="Ambiente ideal"    text={content.aplicacao_profissional.ambiente_ideal}    />
          <SubCard title="Pontos de atenção" text={content.aplicacao_profissional.pontos_de_atencao} warning />
        </div>
      </ReportSection>

      {/* ── Aplicação Pessoal ── */}
      <ReportSection
        emoji="❤️"
        title={content.aplicacao_pessoal.titulo}
        accent="#c47a72"
        accentBg="rgba(196,122,114,0.05)"
        accentBorder="rgba(196,122,114,0.12)"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SubCard title="Relacionamentos"      text={content.aplicacao_pessoal.relacionamentos}      />
          <SubCard title="Tomada de decisão"    text={content.aplicacao_pessoal.tomada_de_decisao}    />
          <SubCard title="Padrões a observar"   text={content.aplicacao_pessoal.padroes_a_observar}   warning className="md:col-span-2" />
        </div>
      </ReportSection>

      {/* ── Plano de Desenvolvimento ── */}
      <ReportSection
        emoji="🚀"
        title={content.plano_de_desenvolvimento.titulo}
        accent="#c4633a"
        accentBg="rgba(196,99,58,0.04)"
        accentBorder="rgba(196,99,58,0.10)"
      >
        <ol className="space-y-5">
          {content.plano_de_desenvolvimento.acoes
            .sort((a, b) => a.prioridade - b.prioridade)
            .map((acao) => (
              <li key={acao.prioridade} className="flex gap-4">
                <div
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                  style={{ background: 'linear-gradient(135deg, #c4633a, #d4943a)' }}
                >
                  {acao.prioridade}
                </div>
                <div className="pt-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-widest font-sans"
                        style={{ color: '#c4633a' }}>
                    {acao.area}
                  </span>
                  <p className="text-sm text-soul-ink/70 mt-0.5 leading-relaxed font-sans">{acao.acao}</p>
                </div>
              </li>
            ))}
        </ol>
      </ReportSection>

      {/* ── Footer CTA ── */}
      <div
        className="rounded-3xl p-6 flex items-center justify-between gap-4 flex-wrap"
        style={{ background: 'rgba(232,226,214,0.3)', border: '1px solid rgba(232,226,214,0.6)' }}
      >
        <div>
          <div className="text-sm font-medium text-soul-ink font-sans">Gostou da devolutiva?</div>
          <div className="text-xs text-soul-ink/40 mt-0.5 font-sans">
            Compartilhe com {employeeName.split(' ')[0]} ou salve como PDF para seu arquivo.
          </div>
        </div>
        <div className="flex gap-3">
          {pdfUrl && (
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full text-sm font-sans font-medium text-white
                         transition-all hover:-translate-y-px shadow-terra"
              style={{ background: 'linear-gradient(135deg, #c4633a, #d4943a)' }}
            >
              📄 Baixar PDF
            </a>
          )}
        </div>
      </div>

    </div>
  )
}

// ── Sub-componentes ────────────────────────────────────────────

function ReportSection({
  emoji, title, accent, accentBg, accentBorder, children
}: {
  emoji: string
  title: string
  accent: string
  accentBg: string
  accentBorder: string
  children: React.ReactNode
}) {
  return (
    <div
      className="rounded-3xl p-6"
      style={{ background: accentBg, border: `1px solid ${accentBorder}` }}
    >
      <h2 className="font-serif font-light text-xl text-soul-ink mb-5 flex items-center gap-2.5">
        <span
          className="w-8 h-8 rounded-xl flex items-center justify-center text-base flex-shrink-0"
          style={{ background: `${accent}18` }}
        >
          {emoji}
        </span>
        {title}
      </h2>
      {children}
    </div>
  )
}

function SubCard({
  title, text, warning = false, className = ''
}: {
  title: string
  text: string
  warning?: boolean
  className?: string
}) {
  return (
    <div
      className={`bg-white rounded-2xl p-4 ${className}`}
      style={{ border: '1px solid rgba(232,226,214,0.6)' }}
    >
      <h4
        className="text-[10px] font-bold uppercase tracking-[0.12em] mb-2 font-sans"
        style={{ color: warning ? '#c4633a' : 'rgba(28,26,23,0.4)' }}
      >
        {warning ? '⚠ ' : ''}{title}
      </h4>
      <p className="text-sm text-soul-ink/65 leading-relaxed font-sans">{text}</p>
    </div>
  )
}
