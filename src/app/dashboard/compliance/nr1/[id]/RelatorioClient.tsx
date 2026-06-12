'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface Props {
  coletaId: string
  algumSetorAtingiu: boolean
  relatorioExistente: {
    status: string
    content: RelatorioContent | null
    generatedAt: string
  } | null
}

interface RelatorioContent {
  geradoEm: string
  totalRespondentes: number
  setoresAvaliados: number
  setores: SetorAgregado[]
}

interface SetorAgregado {
  setorId: string
  setorNome: string
  totalRespondentes: number
  karasek: {
    mediaControle: number
    mediaDemanda: number
    quadranteDominante: string
    distribuicao: Record<string, number>
    risco: string
  }
  eri: { razaoMedia: number; pctAcimaUm: number; risco: string }
  copsoq: { dimensoes: Array<{ dimensao: string; mediaPontuacao: number; risco: string }>; riscoGlobal: string }
  perfilDiscDominante?: string
  recomendacoes: Array<{ prioridade: string; area: string; acao: string; porque: string }>
  narrativa?: string | null
}

const RISCO_COR: Record<string, { bg: string; color: string; label: string }> = {
  BAIXO:    { bg: 'rgba(122,158,126,0.22)', color: '#a9d3a9', label: 'Baixo'    },
  MODERADO: { bg: 'rgba(212,148,58,0.22)',  color: '#e0c878', label: 'Moderado' },
  ALTO:     { bg: 'rgba(196,99,58,0.22)',   color: '#e09070', label: 'Alto'     },
}

const DIM_LABEL: Record<string, string> = {
  DEMANDAS_PSICOLOGICAS:      'Demandas Psicológicas',
  ORGANIZACAO_TRABALHO:       'Organização do Trabalho',
  RELACOES_LIDERANCA:         'Relações e Liderança',
  INTERFACE_TRABALHO_FAMILIA: 'Trabalho-Família',
  SAUDE_BEM_ESTAR:            'Saúde e Bem-Estar',
  COMPORTAMENTOS_OFENSIVOS:   'Comportamentos Ofensivos',
}

export default function RelatorioClient({ coletaId, algumSetorAtingiu, relatorioExistente }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState('')
  const [conteudo, setConteudo] = useState<RelatorioContent | null>(relatorioExistente?.content ?? null)

  async function gerarRelatorio() {
    setLoading(true); setErro('')
    try {
      const res = await fetch(`/api/nr1/coletas/${coletaId}/relatorio`, { method: 'POST' })
      const data = await res.json()
      if (!res.ok) { setErro(data.error ?? 'Falha ao gerar.'); setLoading(false); return }
      setConteudo(data.content)
      router.refresh()
    } catch { setErro('Erro de conexão.') }
    finally { setLoading(false) }
  }

  const [pdfLoading, setPdfLoading] = useState(false)

  async function baixarPdfExecutivo() {
    setPdfLoading(true)
    try {
      const res = await fetch(`/api/nr1/coletas/${coletaId}/relatorio/pdf`)
      if (!res.ok) {
        const data = await res.json().catch(() => ({} as { error?: string }))
        alert(data.error ?? 'Falha ao gerar PDF. Tente atualizar o relatório antes.')
        return
      }
      const blob = await res.blob()
      // Tenta extrair filename do header; cai num padrao se nao conseguir
      const cd = res.headers.get('content-disposition') ?? ''
      const m  = cd.match(/filename="([^"]+)"/)
      const filename = m ? m[1] : `relatorio-nr1-${new Date().toISOString().slice(0, 10)}.pdf`
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      a.remove()
      setTimeout(() => URL.revokeObjectURL(url), 1000)
    } catch {
      alert('Erro de conexão ao baixar o PDF. Tente novamente.')
    } finally {
      setPdfLoading(false)
    }
  }

  return (
    <section className="soul-panel nr1-report-section">
      <div className="flex flex-wrap items-start justify-between gap-3 mb-4 nr1-print-hide">
        <div>
          <h2 className="font-serif font-semibold text-xl text-soul-ink">Relatório executivo</h2>
          {conteudo && (
            <p className="text-[13.5px] text-soul-ink/80 font-medium mt-0.5">
              Gerado em {new Date(conteudo.geradoEm).toLocaleString('pt-BR')} ·
              {' '}{conteudo.totalRespondentes} respondentes ·
              {' '}{conteudo.setoresAvaliados} setor{conteudo.setoresAvaliados !== 1 ? 'es' : ''}
            </p>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {conteudo && (
            <button
              type="button"
              onClick={baixarPdfExecutivo}
              disabled={pdfLoading}
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[14px] font-bold transition-colors disabled:opacity-60"
              style={{
                background: 'rgba(196,99,58,0.10)',
                color:      '#8a4a26',
                border:     '1px solid rgba(196,99,58,0.30)',
              }}
              aria-label="Baixar PDF executivo"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              {pdfLoading ? 'Gerando PDF…' : 'Baixar PDF executivo'}
            </button>
          )}
          <button onClick={gerarRelatorio} disabled={loading || !algumSetorAtingiu}
                  className="px-4 py-2 rounded-full text-[14px] font-bold text-white shadow-terra disabled:opacity-60"
                  style={{ background: 'linear-gradient(135deg, #c4633a, #d4943a)' }}>
            {loading ? 'Gerando…' : conteudo ? '↻ Atualizar relatório' : '✦ Gerar relatório'}
          </button>
        </div>
      </div>

      {/* Cabeçalho que aparece APENAS na impressão */}
      {conteudo && (
        <div className="nr1-print-only mb-6">
          <p className="text-[12px] font-bold uppercase tracking-widest" style={{ color: '#8a4a26' }}>
            Diagnóstico Psicossocial NR-1
          </p>
          <h1 className="font-serif font-semibold text-2xl text-soul-ink mt-1">
            Relatório Executivo
          </h1>
          <p className="text-[13.5px] text-soul-ink/85 font-medium mt-1">
            Gerado em {new Date(conteudo.geradoEm).toLocaleString('pt-BR')} ·
            {' '}{conteudo.totalRespondentes} respondentes ·
            {' '}{conteudo.setoresAvaliados} setor{conteudo.setoresAvaliados !== 1 ? 'es' : ''}
          </p>
          <p className="text-[12px] text-soul-ink/75 font-medium italic mt-2">
            Documento gerado pela plataforma Psique — Mapa Comportamental ·
            Instrumentos: Karasek JCQ + ERI Siegrist + COPSOQ II ·
            Compliance LGPD/CFP/NR-1 — coleta anônima com mínimo de 5 respondentes por setor.
          </p>
        </div>
      )}

      {!algumSetorAtingiu && !conteudo && (
        <p className="text-[15px] text-soul-ink/85 font-medium">
          Aguardando respondentes. O relatório só é liberado quando ao menos um setor atingir o mínimo de respondentes (proteção do anonimato).
        </p>
      )}

      {erro && (
        <div className="rounded-2xl px-4 py-3 text-[15px] font-semibold mt-3"
             style={{ background: 'rgba(196,122,114,0.15)', border: '1px solid rgba(196,122,114,0.45)', color: '#f0a892' }}>
          {erro}
        </div>
      )}

      {conteudo && (
        <div className="space-y-5 mt-4">
          {conteudo.setores.map(s => (
            <div key={s.setorId} className="rounded-2xl p-5"
                 style={{ background: 'rgba(196,99,58,0.04)', border: '1px solid rgba(196,99,58,0.18)' }}>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div>
                  <h3 className="font-serif font-semibold text-lg text-soul-ink">{s.setorNome}</h3>
                  <p className="text-[13.5px] text-soul-ink/78 font-medium">
                    {s.totalRespondentes} respondentes
                    {s.perfilDiscDominante ? ` · DISC ${s.perfilDiscDominante}` : ''}
                  </p>
                </div>
              </div>

              {/* Cards de risco por instrumento */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                <RiscoCard titulo="Karasek (Tensão)" risco={s.karasek.risco}
                           detalhe={`Controle ${s.karasek.mediaControle} · Demanda ${s.karasek.mediaDemanda}`}
                           extra={`${s.karasek.distribuicao.ALTA_TENSAO ?? 0}% em Alta Tensão`} />
                <RiscoCard titulo="ERI (Esforço-Recompensa)" risco={s.eri.risco}
                           detalhe={`Razão média ${s.eri.razaoMedia.toFixed(2)}`}
                           extra={`${s.eri.pctAcimaUm}% acima de 1.0`} />
                <RiscoCard titulo="COPSOQ Global" risco={s.copsoq.riscoGlobal}
                           detalhe={`${s.copsoq.dimensoes.length} dimensões avaliadas`} />
              </div>

              {/* Heatmap COPSOQ */}
              <div className="mb-4">
                <p className="text-[13px] font-bold uppercase tracking-widest text-soul-ink/80 mb-2">COPSOQ por dimensão</p>
                <div className="space-y-1.5">
                  {s.copsoq.dimensoes.map(d => {
                    const cor = RISCO_COR[d.risco] ?? RISCO_COR.BAIXO
                    return (
                      <div key={d.dimensao} className="flex items-center gap-2">
                        <span className="text-[13.5px] font-semibold text-soul-ink/90 flex-1">{DIM_LABEL[d.dimensao] ?? d.dimensao}</span>
                        <span className="text-[13.5px] font-bold text-soul-ink/88 w-10 text-right">{d.mediaPontuacao}</span>
                        <span className="inline-block rounded-full px-2 py-0.5 text-[12px] font-bold w-[70px] text-center"
                              style={{ background: cor.bg, color: cor.color }}>{cor.label}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Recomendações automáticas (snapshot rápido) */}
              {s.recomendacoes.length > 0 && (
                <div>
                  <p className="text-[13px] font-bold uppercase tracking-widest text-soul-terracota mb-2">Recomendações rápidas</p>
                  <ol className="space-y-2 list-none">
                    {s.recomendacoes.map((r, i) => (
                      <li key={i} className="rounded-xl px-3 py-2 flex gap-2 items-start"
                          style={{ background: 'rgba(122,158,126,0.10)' }}>
                        <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[12px] font-bold flex-shrink-0 mt-0.5"
                              style={{
                                background: r.prioridade === 'ALTA' ? 'rgba(196,99,58,0.25)' : 'rgba(212,148,58,0.22)',
                                color: r.prioridade === 'ALTA' ? '#a8522e' : '#8a5c1e',
                              }}>
                          {r.prioridade}
                        </span>
                        <div>
                          <p className="text-[13.5px] font-bold text-soul-ink">{r.area}</p>
                          <p className="text-[14px] text-soul-ink/90 font-medium">{r.acao}</p>
                          <p className="text-[13px] text-soul-ink/78 font-medium italic mt-0.5">{r.porque}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {/* Narrativa consultiva (Claude API) */}
              {s.narrativa && (
                <div className="mt-5 rounded-2xl p-5 nr1-narrative"
                     style={{ background: 'rgba(255,255,255,0.65)', border: '1px solid rgba(196,99,58,0.18)' }}>
                  <p className="text-[13px] font-bold uppercase tracking-widest text-soul-terracota mb-3">
                    Análise consultiva completa
                  </p>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{s.narrativa}</ReactMarkdown>
                </div>
              )}
              {s.narrativa === null && (
                <p className="mt-5 text-[13.5px] text-soul-ink/75 italic">
                  Narrativa consultiva indisponível para este setor. Tente Atualizar relatório.
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

function RiscoCard({ titulo, risco, detalhe, extra }: { titulo: string; risco: string; detalhe: string; extra?: string }) {
  const cor = RISCO_COR[risco] ?? RISCO_COR.BAIXO
  return (
    <div className="rounded-xl p-3" style={{ background: cor.bg, border: `1px solid ${cor.color}33` }}>
      <p className="text-[12px] font-bold uppercase tracking-widest" style={{ color: cor.color }}>{titulo}</p>
      <p className="text-[15px] font-bold mt-0.5" style={{ color: cor.color }}>{cor.label}</p>
      <p className="text-[13px] text-soul-ink/85 font-semibold mt-1">{detalhe}</p>
      {extra && <p className="text-[13px] text-soul-ink/78 font-medium">{extra}</p>}
    </div>
  )
}
