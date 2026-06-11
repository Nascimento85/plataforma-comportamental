'use client'

import { useState, useMemo } from 'react'
import type { KarasekQuestao, ERIQuestao, CopsoqQuestao } from '@/lib/nr1/questions'

interface Props {
  token: string
  nomeFuncionario: string
  setorNome: string
  coletaNome: string
  karasekQuestoes: KarasekQuestao[]
  eriQuestoes: ERIQuestao[]
  copsoqQuestoes: CopsoqQuestao[]
}

const KARASEK_OPCOES = [
  { v: 1, label: 'Discordo fortemente' },
  { v: 2, label: 'Discordo' },
  { v: 3, label: 'Concordo' },
  { v: 4, label: 'Concordo fortemente' },
]
const ERI_OPCOES = [
  { v: 1, label: 'Discordo totalmente' },
  { v: 2, label: 'Discordo' },
  { v: 3, label: 'Neutro' },
  { v: 4, label: 'Concordo' },
  { v: 5, label: 'Concordo totalmente' },
]
const COPSOQ_OPCOES = [
  { v: 1, label: 'Nunca' },
  { v: 2, label: 'Raramente' },
  { v: 3, label: 'Às vezes' },
  { v: 4, label: 'Frequentemente' },
  { v: 5, label: 'Sempre' },
]
const SIM_NAO_OPCOES = [
  { v: 1, label: 'Sim' },
  { v: 0, label: 'Não' },
]

type Etapa = 'INTRO' | 'KARASEK' | 'ERI' | 'COPSOQ' | 'FINAL' | 'OK'

export default function ColetaClient(props: Props) {
  const { token, nomeFuncionario, setorNome, coletaNome, karasekQuestoes, eriQuestoes, copsoqQuestoes } = props
  const [etapa, setEtapa] = useState<Etapa>('INTRO')
  const [karasekAns, setKarasekAns] = useState<Record<number, number>>({})
  const [eriAns, setEriAns]         = useState<Record<number, number>>({})
  const [copsoqAns, setCopsoqAns]   = useState<Record<number, number>>({})
  const [enviando, setEnviando]     = useState(false)
  const [erro, setErro]             = useState('')

  const totalQuestoes = karasekQuestoes.length + eriQuestoes.length + copsoqQuestoes.length
  const respondidas = Object.keys(karasekAns).length + Object.keys(eriAns).length + Object.keys(copsoqAns).length
  const progresso = Math.round((respondidas / totalQuestoes) * 100)

  function podeAvancar(): boolean {
    if (etapa === 'KARASEK') return Object.keys(karasekAns).length === karasekQuestoes.length
    if (etapa === 'ERI')     return Object.keys(eriAns).length     === eriQuestoes.length
    if (etapa === 'COPSOQ')  return Object.keys(copsoqAns).length  === copsoqQuestoes.length
    return true
  }

  async function submeter() {
    setEnviando(true); setErro('')
    try {
      const body = {
        token,
        respostas: {
          karasek: Object.entries(karasekAns).map(([id, v]) => ({ questaoId: Number(id), valor: v })),
          eri:     Object.entries(eriAns).map(([id, v]) => ({ questaoId: Number(id), valor: v })),
          copsoq:  Object.entries(copsoqAns).map(([id, v]) => ({ questaoId: Number(id), valor: v })),
        },
      }
      const res = await fetch('/api/nr1/respostas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const data = await res.json()
      if (!res.ok) { setErro(data.error ?? 'Falha ao enviar.'); setEnviando(false); return }
      setEtapa('OK')
    } catch {
      setErro('Erro de conexão. Tente novamente.')
      setEnviando(false)
    }
  }

  return (
    <div className="min-h-screen py-8 px-4"
         style={{ background: 'linear-gradient(180deg, #17181c 0%, #101c30 100%)' }}>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <span className="inline-block text-[10px] font-bold uppercase tracking-[0.18em] px-3 py-1 rounded-full mb-3"
                style={{ background: 'rgba(196,99,58,0.15)', color: '#e09070' }}>
            Diagnóstico Psicossocial NR-1
          </span>
          <h1 className="font-serif font-semibold text-2xl text-soul-ink leading-tight">{coletaNome}</h1>
          <p className="text-[13px] text-soul-ink/70 font-medium mt-1">
            Olá, <strong>{nomeFuncionario}</strong> · Setor: {setorNome}
          </p>
        </div>

        {/* Progress bar */}
        {(etapa !== 'INTRO' && etapa !== 'OK') && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-bold uppercase tracking-widest text-soul-ink/70">
                {etapa === 'KARASEK' ? '1 de 3 · Karasek' : etapa === 'ERI' ? '2 de 3 · ERI' : '3 de 3 · COPSOQ'}
              </span>
              <span className="text-[11px] font-bold text-soul-ink/70">{progresso}%</span>
            </div>
            <div className="h-2 rounded-full bg-soul-mist overflow-hidden">
              <div className="h-full rounded-full transition-all duration-300"
                   style={{ width: `${progresso}%`, background: 'linear-gradient(90deg, #c4633a, #d4943a)' }} />
            </div>
          </div>
        )}

        {/* Conteúdo */}
        {etapa === 'INTRO' && (
          <div className="soul-panel space-y-4">
            <h2 className="font-serif font-semibold text-xl text-soul-ink">Sobre esta avaliação</h2>
            <p className="text-[14px] text-soul-ink font-medium leading-relaxed">
              Esta é uma <strong>avaliação anônima</strong> sobre as condições de trabalho do seu setor, conforme exigência da NR-1.
              Não há respostas certas ou erradas. Suas respostas são <strong>desvinculadas da sua identidade</strong> no banco de dados.
            </p>
            <ul className="space-y-2 text-[13px] text-soul-ink/85 font-medium">
              <li>· São <strong>3 questionários curtos</strong> em sequência (Karasek, ERI e COPSOQ).</li>
              <li>· Tempo estimado: <strong>10–15 minutos</strong>.</li>
              <li>· A empresa receberá apenas <strong>médias agregadas por setor</strong>, nunca respostas individuais.</li>
              <li>· Setores com menos de 5 respondentes não têm relatório liberado (proteção do anonimato).</li>
            </ul>
            <button onClick={() => setEtapa('KARASEK')}
                    className="w-full mt-2 py-3 rounded-full text-[15px] font-bold text-white shadow-terra"
                    style={{ background: 'linear-gradient(135deg, #c4633a, #d4943a)' }}>
              Começar avaliação →
            </button>
          </div>
        )}

        {etapa === 'KARASEK' && (
          <QuestoesBloco titulo="Karasek (JCQ)" subtitulo="Sobre o controle e demanda no seu trabalho"
                        questoes={karasekQuestoes} opcoes={KARASEK_OPCOES}
                        respostas={karasekAns} setRespostas={setKarasekAns}
                        onProximo={() => setEtapa('ERI')} podeAvancar={podeAvancar()} />
        )}
        {etapa === 'ERI' && (
          <QuestoesBloco titulo="ERI" subtitulo="Sobre esforço e recompensa"
                        questoes={eriQuestoes} opcoes={ERI_OPCOES}
                        respostas={eriAns} setRespostas={setEriAns}
                        onAnterior={() => setEtapa('KARASEK')}
                        onProximo={() => setEtapa('COPSOQ')} podeAvancar={podeAvancar()} />
        )}
        {etapa === 'COPSOQ' && (
          <QuestoesBloco titulo="COPSOQ II" subtitulo="Sobre a organização do trabalho e bem-estar"
                        questoes={copsoqQuestoes} opcoes={COPSOQ_OPCOES} simNaoOpcoes={SIM_NAO_OPCOES}
                        respostas={copsoqAns} setRespostas={setCopsoqAns}
                        onAnterior={() => setEtapa('ERI')}
                        onProximo={() => setEtapa('FINAL')} podeAvancar={podeAvancar()} />
        )}

        {etapa === 'FINAL' && (
          <div className="soul-panel space-y-4 text-center">
            <div className="text-5xl">✦</div>
            <h2 className="font-serif font-semibold text-2xl text-soul-ink">Tudo pronto para enviar</h2>
            <p className="text-[14px] text-soul-ink/85 font-medium">
              Suas respostas serão registradas <strong>sem vínculo com sua identidade</strong>. Apenas o setor é registrado.
            </p>
            {erro && (
              <div className="rounded-2xl px-4 py-3 text-[14px] font-semibold"
                   style={{ background: 'rgba(196,122,114,0.15)', border: '1px solid rgba(196,122,114,0.45)', color: '#f0a892' }}>
                {erro}
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={() => setEtapa('COPSOQ')} disabled={enviando}
                      className="flex-1 py-3 rounded-full text-[14px] font-bold border-2"
                      style={{ borderColor: 'rgba(240,236,227,0.25)', color: 'rgba(240,236,227,0.85)' }}>
                Revisar
              </button>
              <button onClick={submeter} disabled={enviando}
                      className="flex-[1.3] py-3 rounded-full text-[14px] font-bold text-white shadow-terra disabled:opacity-60"
                      style={{ background: 'linear-gradient(135deg, #c4633a, #d4943a)' }}>
                {enviando ? 'Enviando…' : 'Enviar respostas anônimas →'}
              </button>
            </div>
          </div>
        )}

        {etapa === 'OK' && (
          <div className="soul-panel text-center space-y-3">
            <div className="text-5xl">🌿</div>
            <h2 className="font-serif font-semibold text-2xl text-soul-ink">Obrigado pela sua participação</h2>
            <p className="text-[14px] text-soul-ink/85 font-medium">
              Suas respostas foram registradas de forma anônima. A empresa receberá apenas os indicadores agregados.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

interface BlocoProps<Q> {
  titulo: string
  subtitulo: string
  questoes: Q[]
  opcoes: Array<{ v: number; label: string }>
  simNaoOpcoes?: Array<{ v: number; label: string }>
  respostas: Record<number, number>
  setRespostas: React.Dispatch<React.SetStateAction<Record<number, number>>>
  onProximo: () => void
  onAnterior?: () => void
  podeAvancar: boolean
}

function QuestoesBloco<Q extends { id: number; texto: string; tipo?: string }>(props: BlocoProps<Q>) {
  const { titulo, subtitulo, questoes, opcoes, simNaoOpcoes, respostas, setRespostas, onProximo, onAnterior, podeAvancar } = props
  return (
    <div className="soul-panel space-y-4">
      <div>
        <h2 className="font-serif font-semibold text-xl text-soul-ink leading-tight">{titulo}</h2>
        <p className="text-[13px] text-soul-ink/75 font-medium mt-1">{subtitulo}</p>
      </div>
      <div className="space-y-4">
        {questoes.map((q, i) => {
          const usaSimNao = q.tipo === 'SIM_NAO' && simNaoOpcoes
          const opcs = usaSimNao ? simNaoOpcoes : opcoes
          return (
            <div key={q.id} className="rounded-2xl p-3" style={{ background: 'rgba(196,99,58,0.04)' }}>
              <p className="text-[14px] font-semibold text-soul-ink mb-2">
                <span className="text-soul-terracota mr-1">{i + 1}.</span> {q.texto}
              </p>
              <div className="flex flex-wrap gap-2">
                {opcs.map(o => {
                  const ativo = respostas[q.id] === o.v
                  return (
                    <button key={o.v} type="button"
                            onClick={() => setRespostas({ ...respostas, [q.id]: o.v })}
                            className="px-3 py-2 rounded-full text-[12px] font-bold transition-all"
                            style={{
                              background: ativo ? '#c4633a' : 'white',
                              color:      ativo ? 'white' : '#1c1a17',
                              border:     ativo ? '1.5px solid #c4633a' : '1.5px solid rgba(255,255,255,0.12)',
                            }}>
                      {o.label}
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
      <div className="flex gap-3 pt-2">
        {onAnterior && (
          <button onClick={onAnterior}
                  className="px-4 py-2.5 rounded-full text-[13px] font-bold border-2"
                  style={{ borderColor: 'rgba(240,236,227,0.25)', color: 'rgba(240,236,227,0.85)' }}>
            ← Anterior
          </button>
        )}
        <button onClick={onProximo} disabled={!podeAvancar}
                className="flex-1 py-2.5 rounded-full text-[13px] font-bold text-white disabled:opacity-50"
                style={{ background: 'linear-gradient(135deg, #c4633a, #d4943a)' }}>
          {podeAvancar ? 'Próximo →' : `Responda todas (${Object.keys(respostas).length}/${questoes.length})`}
        </button>
      </div>
    </div>
  )
}
