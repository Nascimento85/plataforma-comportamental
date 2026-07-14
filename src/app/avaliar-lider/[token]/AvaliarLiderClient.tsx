'use client'

// ============================================================
// Cliente da Avaliação de Liderança anônima (pública)
// Tema escuro de alta legibilidade: fundo carvão, texto claro
// e encorpado, dourado nos destaques. Fluxo: INTRO → PERGUNTAS
// (13, agrupadas por pilar) → SCI → OK
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

// Cores dos pilares ajustadas para contraste sobre fundo escuro
const COR_PILAR_DARK: Record<PilarLiderKey, string> = {
  CLAREZA:         '#8fa6da',
  RESPEITO:        '#e0936a',
  RECONHECIMENTO:  '#d9bc6a',
  SUPORTE:         '#8fbf8f',
  DESENVOLVIMENTO: '#bb96cc',
}

const FUNDO   = 'linear-gradient(180deg, #101c30 0%, #17181c 38%)'
const CARTAO  = { background: '#1f2126', border: '1px solid rgba(255,255,255,0.09)' }
const OURO    = '#d9bc6a'

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

    // Até 3 tentativas com intervalo crescente — cobre instabilidade de
    // rede móvel e 500/502 transitório do servidor.
    const MAX_TENTATIVAS = 3
    try {
      for (let tentativa = 1; tentativa <= MAX_TENTATIVAS; tentativa++) {
        try {
          const res = await fetch('/api/lider/respostas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token, respostas, sciTexto: sciTexto.trim() || undefined }),
            cache: 'no-store',
          })
          const raw = await res.text()
          let data: { ok?: boolean; error?: string } = {}
          try { data = JSON.parse(raw) } catch { /* resposta não-JSON */ }

          if (res.ok) { setEtapa('OK'); return }
          // 410 com convite já COMPLETED = tentativa anterior gravou
          if (res.status === 410 && (data.error ?? '').includes('já respondeu')) { setEtapa('OK'); return }
          if (res.status >= 400 && res.status < 500) {
            setErro(data.error ?? `Não foi possível enviar (código ${res.status}).`)
            return
          }
          if (tentativa === MAX_TENTATIVAS) {
            setErro(data.error ?? `O servidor está instável (código ${res.status}). Aguarde alguns segundos e tente enviar novamente — suas respostas não foram perdidas.`)
            return
          }
        } catch {
          if (tentativa === MAX_TENTATIVAS) {
            setErro('Sem conexão com o servidor. Verifique sua internet e tente enviar novamente — suas respostas não foram perdidas.')
            return
          }
        }
        await new Promise((r) => setTimeout(r, tentativa * 1500))
      }
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className="min-h-screen py-8 px-4" style={{ background: FUNDO, color: '#f3efe7' }}>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-7">
          <span className="inline-block text-[13.5px] font-bold uppercase tracking-[0.18em] px-4 py-1.5 rounded-full mb-4"
                style={{ background: 'rgba(217,188,106,0.14)', color: OURO, border: '1px solid rgba(217,188,106,0.35)' }}>
            Avaliação de Liderança · Anônima
          </span>
          <h1 className="font-serif font-semibold text-3xl md:text-4xl leading-tight text-white">
            Como é trabalhar com {liderNome}?
          </h1>
          <p className="text-[15px] font-semibold mt-2" style={{ color: 'rgba(243,239,231,0.75)' }}>
            Equipe {teamNome} · {empresa}
          </p>
        </div>

        {/* Progress bar */}
        {etapa !== 'INTRO' && etapa !== 'OK' && (
          <div className="mb-7">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[14px] font-bold uppercase tracking-widest" style={{ color: 'rgba(243,239,231,0.8)' }}>
                {respondidas} de {total} perguntas
              </span>
              <span className="text-[14px] font-bold" style={{ color: OURO }}>{progresso}%</span>
            </div>
            <div className="h-2.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.10)' }}>
              <div className="h-full rounded-full transition-all duration-300"
                   style={{ width: `${progresso}%`, background: `linear-gradient(90deg, ${OURO}, #b08d3e)` }} />
            </div>
          </div>
        )}

        {/* INTRO */}
        {etapa === 'INTRO' && (
          <div className="rounded-3xl p-6 md:p-8 space-y-5" style={CARTAO}>
            <h2 className="font-serif font-semibold text-2xl text-white">Antes de começar</h2>
            <p className="text-[16px] font-medium leading-relaxed" style={{ color: 'rgba(243,239,231,0.92)' }}>
              Você vai avaliar <strong className="text-white">comportamentos observáveis</strong> de {liderNome} no
              dia a dia. Não há respostas certas ou erradas, responda pelo que você de fato vive na equipe.
            </p>
            <ul className="space-y-3 text-[15px] font-medium" style={{ color: 'rgba(243,239,231,0.88)' }}>
              <li>· São <strong className="text-white">{PERGUNTAS_LIDER.length} perguntas</strong>, cerca de 5 minutos.</li>
              <li>· Suas respostas são gravadas <strong className="text-white">sem nenhum vínculo</strong> com seu nome ou email.</li>
              <li>· O líder vê apenas a <strong className="text-white">média agregada da equipe</strong>, e somente quando houver no mínimo 3 respostas.</li>
              <li>· Ninguém consegue saber o que você respondeu, nem o RH, nem a diretoria.</li>
            </ul>
            <button onClick={() => setEtapa('PERGUNTAS')}
                    className="w-full mt-2 py-4 rounded-full text-[17px] font-bold"
                    style={{ background: `linear-gradient(135deg, ${OURO}, #b08d3e)`, color: '#17181c' }}>
              Começar avaliação →
            </button>
          </div>
        )}

        {/* PERGUNTAS */}
        {etapa === 'PERGUNTAS' && (
          <div className="space-y-6">
            {PILARES_ORDEM.map((pilar) => {
              const info = PILAR_LIDER_INFO[pilar]
              const cor = COR_PILAR_DARK[pilar]
              const perguntas = PERGUNTAS_LIDER.filter((p) => p.pilar === pilar)
              return (
                <div key={pilar} className="rounded-3xl p-5 md:p-7 space-y-6" style={CARTAO}>
                  <div>
                    <p className="text-[15px] font-bold uppercase tracking-widest" style={{ color: cor }}>
                      {info.rotulo}
                    </p>
                    <p className="text-[15px] font-semibold mt-1" style={{ color: 'rgba(243,239,231,0.65)' }}>{info.subtitulo}</p>
                  </div>
                  {perguntas.map((p) => (
                    <div key={p.id} className="pt-5 first:pt-0" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                      <p className="text-[16px] md:text-[17px] text-white font-semibold leading-relaxed mb-3.5">{p.texto}</p>
                      <div className="grid grid-cols-5 gap-2">
                        {ESCALA_LIDER.map((op) => {
                          const ativo = respostas[p.id] === op.valor
                          return (
                            <button key={op.valor} type="button"
                                    onClick={() => setResp((r) => ({ ...r, [p.id]: op.valor }))}
                                    className="flex flex-col items-center justify-center gap-1.5 rounded-2xl px-1 py-3 transition-all"
                                    style={{
                                      minHeight: '64px',
                                      background: ativo ? cor : 'rgba(255,255,255,0.06)',
                                      border: `2px solid ${ativo ? cor : 'rgba(255,255,255,0.16)'}`,
                                    }}>
                              <span className="text-[18px] font-bold leading-none"
                                    style={{ color: ativo ? '#17181c' : '#f3efe7' }}>
                                {op.valor}
                              </span>
                              <span className="text-[13px] md:text-[13.5px] font-bold leading-tight text-center"
                                    style={{ color: ativo ? 'rgba(23,24,28,0.85)' : 'rgba(243,239,231,0.78)' }}>
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
                    className="w-full py-4 rounded-full text-[17px] font-bold disabled:opacity-40"
                    style={{ background: `linear-gradient(135deg, ${OURO}, #b08d3e)`, color: '#17181c' }}>
              {completo ? 'Continuar →' : `Responda todas as perguntas (faltam ${total - respondidas})`}
            </button>
          </div>
        )}

        {/* SCI */}
        {etapa === 'SCI' && (
          <div className="rounded-3xl p-6 md:p-8 space-y-5" style={CARTAO}>
            <h2 className="font-serif font-semibold text-2xl text-white">
              {sciObrigatorio ? 'Conte um episódio (obrigatório)' : 'Quer contar um episódio? (opcional)'}
            </h2>
            <p className="text-[16px] font-medium leading-relaxed" style={{ color: 'rgba(243,239,231,0.92)' }}>
              {temNotaBaixa ? PERGUNTA_SCI.texto : PERGUNTA_SCI.textoPositivo}
            </p>
            <textarea value={sciTexto} onChange={(e) => setSciTexto(e.target.value)}
                      rows={5} maxLength={2000}
                      placeholder="Situação: ... Comportamento: ... Impacto: ..."
                      className="w-full rounded-2xl px-4 py-3.5 text-[16px] font-medium resize-none outline-none"
                      style={{ background: 'rgba(255,255,255,0.07)', border: '2px solid rgba(255,255,255,0.18)', color: '#f3efe7' }} />
            <p className="text-[15px] font-semibold" style={{ color: 'rgba(243,239,231,0.65)' }}>
              🔒 Este relato é exibido ao líder junto com outros, em ordem embaralhada, sem qualquer identificação.
            </p>
            {erro && (
              <div className="rounded-2xl px-4 py-3.5 text-[15px] font-bold"
                   style={{ background: 'rgba(224,122,95,0.16)', border: '1px solid rgba(224,122,95,0.5)', color: '#f0a892' }}>
                {erro}
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={() => setEtapa('PERGUNTAS')} disabled={enviando}
                      className="flex-1 py-4 rounded-full text-[16px] font-bold"
                      style={{ border: '2px solid rgba(243,239,231,0.4)', color: '#f3efe7' }}>
                Revisar respostas
              </button>
              <button onClick={submeter} disabled={enviando}
                      className="flex-1 py-4 rounded-full text-[16px] font-bold disabled:opacity-60"
                      style={{ background: `linear-gradient(135deg, ${OURO}, #b08d3e)`, color: '#17181c' }}>
                {enviando ? 'Enviando...' : 'Enviar avaliação ✓'}
              </button>
            </div>
          </div>
        )}

        {/* OK */}
        {etapa === 'OK' && (
          <div className="rounded-3xl p-8 space-y-5 text-center" style={CARTAO}>
            <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center text-2xl"
                 style={{ background: 'rgba(217,188,106,0.14)', border: `1px solid rgba(217,188,106,0.4)`, color: OURO }}>✓</div>
            <h2 className="font-serif font-semibold text-3xl text-white">Avaliação enviada</h2>
            <p className="text-[16px] font-medium leading-relaxed max-w-md mx-auto" style={{ color: 'rgba(243,239,231,0.9)' }}>
              Obrigado pela sua honestidade. Sua resposta foi registrada de forma
              <strong className="text-white"> 100% anônima</strong> e vai ajudar a construir uma liderança melhor no seu time.
            </p>
            <p className="text-[15px] font-semibold" style={{ color: 'rgba(243,239,231,0.6)' }}>Você já pode fechar esta página.</p>
          </div>
        )}
      </div>
    </div>
  )
}
