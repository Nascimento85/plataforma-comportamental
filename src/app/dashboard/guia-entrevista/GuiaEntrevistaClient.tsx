'use client'

import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface PerfilOpt { key: string; nome: string; descricao: string }

const SENIORIDADES: Array<{ value: string; label: string }> = [
  { value: 'SEM_EXPERIENCIA', label: 'Sem experiência profissional' },
  { value: 'JUNIOR',          label: 'Júnior (até 2 anos)' },
  { value: 'PLENO',           label: 'Pleno (2 a 5 anos)' },
  { value: 'SENIOR',          label: 'Sênior (5 anos ou mais)' },
  { value: 'GERENTE',         label: 'Gerência' },
  { value: 'DIRETOR',         label: 'Diretoria ou C level' },
]

const TONS: Array<{ value: string; label: string }> = [
  { value: 'FORMAL',           label: 'Formal e corporativo' },
  { value: 'CONSULTIVO',       label: 'Consultivo e exploratório' },
  { value: 'INFORMAL_HONESTO', label: 'Informal e honesto direto' },
]

export default function GuiaEntrevistaClient({ perfisOpts }: { perfisOpts: PerfilOpt[] }) {
  const [cargo, setCargo]               = useState('')
  const [senioridade, setSenioridade]   = useState<string>('PLENO')
  const [tom, setTom]                   = useState<string>('CONSULTIVO')
  const [contexto, setContexto]         = useState('')
  const [perfis, setPerfis]             = useState<Set<string>>(new Set(perfisOpts.map(p => p.key)))
  const [loading, setLoading]           = useState(false)
  const [erro, setErro]                 = useState<string | null>(null)
  const [resultado, setResultado]       = useState<string | null>(null)
  const [meta, setMeta]                 = useState<{ cargo: string; geradoEm: string } | null>(null)

  function togglePerfil(key: string) {
    setPerfis(prev => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErro(null)
    if (cargo.trim().length < 3) { setErro('Informe o cargo (mínimo 3 caracteres).'); return }
    if (perfis.size === 0) { setErro('Selecione ao menos um perfil disfuncional a investigar.'); return }

    setLoading(true)
    setResultado(null)
    try {
      const res = await fetch('/api/guia-entrevista', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          cargo:             cargo.trim(),
          senioridade,
          tom,
          perfisInvestigar:  Array.from(perfis),
          contextoAdicional: contexto.trim() || undefined,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setErro(data.error ?? 'Falha ao gerar o guia.')
        return
      }
      setResultado(data.markdown)
      setMeta({ cargo: data.cargo, geradoEm: data.geradoEm })
      // Rola pro topo do resultado
      setTimeout(() => {
        document.getElementById('resultado-guia')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    } catch {
      setErro('Erro de conexão. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  function imprimir() {
    if (typeof window !== 'undefined') window.print()
  }

  return (
    <div className="space-y-6">
      {/* Form */}
      <form onSubmit={handleSubmit} className="soul-panel space-y-4 nr1-print-hide">

        <div>
          <label className="block text-[13px] font-bold uppercase tracking-widest text-soul-ink/80 mb-1.5">
            Cargo a ser entrevistado
          </label>
          <input
            type="text"
            value={cargo}
            onChange={(e) => setCargo(e.target.value)}
            placeholder="Ex: Coordenador comercial · Desenvolvedor pleno · Gerente financeiro"
            className="soul-input w-full"
            maxLength={100}
            disabled={loading}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-[13px] font-bold uppercase tracking-widest text-soul-ink/80 mb-1.5">
              Senioridade
            </label>
            <select value={senioridade} onChange={(e) => setSenioridade(e.target.value)} className="soul-input w-full" disabled={loading}>
              {SENIORIDADES.map(s => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[13px] font-bold uppercase tracking-widest text-soul-ink/80 mb-1.5">
              Tom da entrevista
            </label>
            <select value={tom} onChange={(e) => setTom(e.target.value)} className="soul-input w-full" disabled={loading}>
              {TONS.map(t => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-[13px] font-bold uppercase tracking-widest text-soul-ink/80 mb-1.5">
            Perfis disfuncionais a investigar
          </label>
          <p className="text-[13.5px] text-soul-ink/78 font-medium italic mb-2">
            Selecione quais padrões comportamentais quer mapear nesta entrevista. Recomendado começar com todos.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {perfisOpts.map(p => {
              const checked = perfis.has(p.key)
              return (
                <label
                  key={p.key}
                  className="flex items-start gap-2 p-2.5 rounded-xl cursor-pointer transition-colors"
                  style={{
                    background: checked ? 'rgba(196,99,58,0.07)' : 'rgba(196,99,58,0.02)',
                    border:     checked ? '1px solid rgba(196,99,58,0.30)' : '1px solid rgba(196,99,58,0.10)',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => togglePerfil(p.key)}
                    className="mt-0.5 flex-shrink-0"
                    disabled={loading}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-bold text-soul-ink">{p.nome}</p>
                    <p className="text-[13px] text-soul-ink/78 font-medium leading-snug">{p.descricao}</p>
                  </div>
                </label>
              )
            })}
          </div>
        </div>

        <div>
          <label className="block text-[13px] font-bold uppercase tracking-widest text-soul-ink/80 mb-1.5">
            Contexto adicional (opcional)
          </label>
          <textarea
            value={contexto}
            onChange={(e) => setContexto(e.target.value)}
            placeholder="Ex: cultura da empresa, red flags específicos do time, último candidato que deu errado, particularidades do cargo…"
            rows={3}
            className="soul-input w-full resize-y"
            maxLength={800}
            disabled={loading}
          />
          <p className="text-[13px] text-soul-ink/72 font-medium mt-1">{contexto.length}/800</p>
        </div>

        {erro && (
          <div className="rounded-xl px-4 py-3 text-[14px] font-semibold"
               style={{ background: 'rgba(196,122,114,0.15)', border: '1px solid rgba(196,122,114,0.45)', color: '#f0a892' }}>
            {erro}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[15px] font-bold text-white shadow-terra disabled:opacity-60"
          style={{ background: 'linear-gradient(135deg, #c4633a, #d4943a)' }}
        >
          {loading ? 'Gerando guia…' : '✦ Gerar guia personalizado'}
        </button>
      </form>

      {/* Resultado */}
      {resultado && (
        <section id="resultado-guia" className="soul-panel">
          <div className="flex flex-wrap items-start justify-between gap-3 mb-4 nr1-print-hide">
            <div>
              <h2 className="font-serif font-semibold text-xl text-soul-ink">Guia de entrevista · {meta?.cargo}</h2>
              {meta?.geradoEm && (
                <p className="text-[13.5px] text-soul-ink/78 font-medium mt-0.5">
                  Gerado em {new Date(meta.geradoEm).toLocaleString('pt-BR')}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={imprimir}
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[14px] font-bold transition-colors"
              style={{
                background: 'rgba(196,99,58,0.10)',
                color:      '#8a4a26',
                border:     '1px solid rgba(196,99,58,0.30)',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 6 2 18 2 18 9" />
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                <rect x="6" y="14" width="12" height="8" />
              </svg>
              Imprimir / salvar PDF
            </button>
          </div>

          {/* Cabeçalho que aparece APENAS na impressão */}
          <div className="nr1-print-only mb-6">
            <p className="text-[12px] font-bold uppercase tracking-widest" style={{ color: '#8a4a26' }}>
              Guia de Entrevista personalizado · Psique
            </p>
            <h1 className="font-serif font-semibold text-2xl text-soul-ink mt-1">{meta?.cargo}</h1>
            {meta?.geradoEm && (
              <p className="text-[13.5px] text-soul-ink/85 font-medium mt-1">
                Gerado em {new Date(meta.geradoEm).toLocaleString('pt-BR')}
              </p>
            )}
          </div>

          <div className="nr1-narrative">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{resultado}</ReactMarkdown>
          </div>
        </section>
      )}
    </div>
  )
}
