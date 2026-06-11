'use client'

// ============================================================
// Cliente da Avaliação de Liderança anônima (pública)
// Fluxo: INTRO → PERGUNTAS (13, agrupadas por pilar) → SCI → OK
// ============================================================

import { useState, useMemo } from 'react'
import {
  PERGUNTAS_LIDER, ESCALA_LIDER, PILAR_LIDER_INFO, PERGUNTA_SCI,
  type PilarLiderKey,
} from '@/content/gestao-times/avaliacao-lider'

type Etapa = 'INTRO' | 'PERGUNTAS' | 'SCI' | 'OK'

interface Props {
  token: string
  liderNome: string
  teamNome: string
  empresa: string
}

const PILARES_ORDEM: PilarLiderKey[] = ['CLAREZA', 'RESPEITO', 'RECONHECIMENTO', 'SUPORTE', 'DESENVOLVIMENTO']

export default function AvaliarLiderClient({ token, liderNome, teamNome, empresa }: Props) {
  const [etapa, setEtapa]       = useState<Etapa>('INTRO')
  const [respostas, setResp]    = useState<Record<string, number>>({})
  const [sciTexto, setSciTexto] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [erro, setErro]         = useState('')

  const total       = PERGUNTAS_LIDER.length
  const respondidas = Object.keys(respostas).length
  const progresso   = etapa === 'INTRO' ? 0 : etapa === 'OK' ? 100 : Math.round((respondidas / total) * 90)
  const completo    = respondidas === total
  const temNotaBaixa = useMemo(() => Object.values(respostas).some((v) => v <= 2), [respostas])
  const sciObrigatorio = temNotaBaixa

  async function submeter() {
    setErro('')
    if (sciObrigatorio && sciTexto.trim().length < 20) {
      setErro('Você deu notas baixas em alguns pontos. Descreva brevemente um episódio que ilustre isso (mínimo de 20 caracteres), sem se identificar.')
      return
    }
    setEnviando(true)
    try {
      const res = await fetch('/api/lider/respostas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, respostas, sciTexto: sciTexto.trim() || undefined }),
      })
      const data = await res.json()
      if (!res.ok) { setErro(data.error ?? 'Não foi possível enviar. Tente novamente.'); return }
      setEtapa('OK')
    } catch {
      setErro('Falha de conexão. Verifique sua internet e tente novamente.')
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className="min-h-screen py-8 px-4"
         style={{ background: 'linear-gradient(180deg, #faf7f2 0%, #f0ebdf 100%)' }}>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <span className="inline-block text-[10px] font-bold uppercase tracking-[0.18em] px-3 py-1 rounded-full mb-3"
                style={{ background: 'rgba(61,79,124,0.14)', color: '#3d4f7c' }}>
            Avaliação de Liderança · Anônima
          </span>
          <h1 className="font-serif font-semibold text-2xl text-soul-ink leading-tight">
            Como é trabalhar com {liderNome}?
          </h1>
          <p className="text-[13px] text-soul-ink/70 font-medium mt-1">
            Time {teamNome} · {empresa}
          </p>
        </div>

        {/* Progress bar */}
        {etapa !== 'INTRO' && etapa !== 'OK' && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-bold uppercase tracking-widest text-soul-ink/70">
                {respondidas} de {total} perguntas
              </span>
              <span className="text-[11px] font-bold text-soul-ink/70">{progresso}%</span>
            </div>
            <div className="h-2 rounded-full bg-soul-mist overflow-hidden">
              <div className="h-full rounded-full transition-all duration-300"
                   style={{ width: `${progresso}%`, background: 'linear-gradient(90deg, #3d4f7c, #c9a84c)' }} />
            </div>
          </div>
        )}

        {/* INTRO */}
        {etapa === 'INTRO' && (
          <div className="soul-panel space-y-4">
            <h2 className="font-serif font-semibold text-xl text-soul-ink">Antes de começar</h2>
            <p className="text-[14px] text-soul-ink font-medium leading-relaxed">
              Você vai avaliar <strong>comportamentos observáveis</strong> de {liderNome} no dia a dia.
              Não há respostas certas ou erradas, responda pelo que você de fato vive no time.
            </p>
            <ul className="space-y-2 text-[13px] text-soul-ink/85 font-medium">
              <li>· São <strong>13 perguntas</strong>, menos de 5 minutos.</li>
              <li>· Suas respostas são gravadas <strong>sem nenhum vínculo</strong> com seu nome ou email.</li>
              <li>· O líder vê apenas a <strong>média agregada do time</strong>, e somente quando houver no mínimo 3 respostas.</li>
              <li>· Ninguém consegue saber o que você respondeu, nem o RH, nem a diretoria.</li>
            </ul>
            <button onClick={() => setEtapa('PERGUNTAS')}
                    className="w-full mt-2 py-3 rounded-full text-[15px] font-bold text-white shadow-terra"
                    style={{ background: 'linear-gradient(135deg, #3d4f7c, #5a6f9c)' }}>
              Começar avaliação →
            </button>
          </div>
        )}

        {/* PERGUNTAS */}
        {etapa === 'PERGUNTAS' && (
          <div className="space-y-5">
            {PILARES_ORDEM.map((pilar) => {
              const info = PILAR_LIDER_INFO[pilar]
              const perguntas = PERGUNTAS_LIDER.filter((p) => p.pilar === pilar)
              return (
                <div key={pilar} className="soul-panel space-y-4">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-widest" style={{ color: info.cor }}>
                      {info.rotulo}
                    </p>
                    <p className="text-[12px] text-soul-ink/60 font-medium">{info.subtitulo}</p>
                  </div>
                  {perguntas.map((p) => (
                    <div key={p.id} className="pt-3 border-t border-soul-mist first:border-t-0 first:pt-0">
                      <p className="text-[14px] text-soul-ink font-semibold leading-relaxed mb-2.5">{p.texto}</p>
                      <div className="grid grid-cols-5 gap-1.5">
                        {ESCALA_LIDER.map((op) => {
                          const ativo = respostas[p.id] === op.valor
                          return (
                            <button key={op.valor} type="button"
                                    onClick={() => setResp((r) => ({ ...r, [p.id]: op.valor }))}
                                    className="flex flex-col items-center gap-1 rounded-xl px-1 py-2 transition-all"
                                    style={{
                                      background: ativo ? info.cor : 'rgba(28,26,23,0.04)',
                                      border: `1.5px solid ${ativo ? info.cor : 'rgba(28,26,23,0.12)'}`,
                                    }}>
                              <span className="text-[14px] font-bold" style={{ color: ativo ? '#fff' : 'rgba(28,26,23,0.7)' }}>
                                {op.valor}
                              </span>
                              <span className="text-[9px] font-semibold leading-tight text-center"
                                    style={{ color: ativo ? 'rgba(255,255,255,0.9)' : 'rgba(28,26,23,0.55)' }}>
                                {op.label}
                              </span>
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )
            })}
            <button onClick={() => setEtapa('SCI')} disabled={!completo}
                    className="w-full py-3 rounded-full text-[15px] font-bold text-white shadow-terra disabled:opacity-40"
                    style={{ background: 'linear-gradient(135deg, #3d4f7c, #5a6f9c)' }}>
              {completo ? 'Continuar →' : `Responda todas as perguntas (faltam ${total - respondidas})`}
            </button>
          </div>
        )}

        {/* SCI */}
        {etapa === 'SCI' && (
          <div className="soul-panel space-y-4">
            <h2 className="font-serif font-semibold text-xl text-soul-ink">
              {sciObrigatorio ? 'Conte um episódio (obrigatório)' : 'Quer contar um episódio? (opcional)'}
            </h2>
            <p className="text-[14px] text-soul-ink/85 font-medium leading-relaxed">
              {temNotaBaixa ? PERGUNTA_SCI.texto : PERGUNTA_SCI.textoPositivo}
            </p>
            <textarea value={sciTexto} onChange={(e) => setSciTexto(e.target.value)}
                      rows={5} maxLength={2000}
                      placeholder="Situação: ... Comportamento: ... Impacto: ..."
                      className="w-full rounded-2xl px-4 py-3 text-[14px] font-medium text-soul-ink resize-none"
                      style={{ background: 'rgba(28,26,23,0.04)', border: '1.5px solid rgba(28,26,23,0.15)' }} />
            <p className="text-[12px] text-soul-ink/55 font-medium">
              🔒 Este relato é exibido ao líder junto com outros, em ordem embaralhada, sem qualquer identificação.
            </p>
            {erro && (
              <div className="rounded-2xl px-4 py-3 text-[14px] font-semibold"
                   style={{ background: 'rgba(196,122,114,0.15)', border: '1px solid rgba(196,122,114,0.45)', color: '#7a3d35' }}>
                {erro}
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={() => setEtapa('PERGUNTAS')} disabled={enviando}
                      className="flex-1 py-3 rounded-full text-[14px] font-bold border-2"
                      style={{ borderColor: 'rgba(28,26,23,0.25)', color: 'rgba(28,26,23,0.85)' }}>
                Revisar respostas
              </button>
              <button onClick={submeter} disabled={enviando}
                      className="flex-1 py-3 rounded-full text-[14px] font-bold text-white shadow-terra disabled:opacity-60"
                      style={{ background: 'linear-gradient(135deg, #3d4f7c, #5a6f9c)' }}>
                {enviando ? 'Enviando...' : 'Enviar avaliação ✓'}
              </button>
            </div>
          </div>
        )}

        {/* OK */}
        {etapa === 'OK' && (
          <div className="soul-panel space-y-4 text-center">
            <div className="text-5xl">✦</div>
            <h2 className="font-serif font-semibold text-2xl text-soul-ink">Avaliação enviada</h2>
            <p className="text-[14px] text-soul-ink/85 font-medium leading-relaxed">
              Obrigado pela sua honestidade. Sua resposta foi registrada de forma
              <strong> 100% anônima</strong> e vai ajudar a construir uma liderança melhor no seu time.
            </p>
            <p className="text-[13px] text-soul-ink/60 font-medium">Você já pode fechar esta página.</p>
          </div>
        )}
      </div>
    </div>
  )
}
