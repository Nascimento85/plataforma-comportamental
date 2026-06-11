'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  CRITERIOS, DIMENSAO_INFO, ESCALA_AVALIACAO, criteriosPorDimensao,
  calcularAvaliacao, type DimensaoKey,
} from '@/content/gestao-times/avaliacao-criterios'

interface Props {
  memberId: string
  memberNome: string
  respostasIniciais: Record<number, number>
  onClose: () => void
}

const DIMENSOES: DimensaoKey[] = ['PERFORMANCE', 'FIT', 'POTENCIAL']

export default function AvaliacaoModal({ memberId, memberNome, respostasIniciais, onClose }: Props) {
  const router = useRouter()
  const [respostas, setRespostas] = useState<Record<number, number>>(respostasIniciais ?? {})
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [feedback, setFeedback] = useState('')

  const respondidas = CRITERIOS.filter((c) => respostas[c.id]).length
  const progresso = Math.round((respondidas / CRITERIOS.length) * 100)
  const previa = calcularAvaliacao(respostas)

  function setResp(id: number, valor: number) {
    setRespostas((p) => ({ ...p, [id]: valor }))
  }

  async function salvar() {
    setError('')
    if (respondidas === 0) { setError('Pontue ao menos um critério.'); return }
    setSaving(true)
    try {
      const res = await fetch(`/api/talent-members/${memberId}/avaliacao`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ respostas }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error ?? 'Erro ao salvar avaliação.'); return }
      router.refresh()
      // Feedback da automacao de Avaliacao do Lider
      const lc = data.liderConvite as { enviado?: boolean; motivo?: string } | undefined
      if (lc?.enviado) {
        setFeedback('✓ Avaliação salva. Convite anônimo para avaliar o líder enviado por email ao colaborador.')
      } else if (lc?.motivo === 'SEM_LIDER') {
        setFeedback('Avaliação salva. O convite de avaliação do líder NÃO foi enviado: defina o líder do time na tela Avaliação do Líder e use o botão Enviar convites.')
      } else if (lc?.motivo === 'SEM_EMAIL') {
        setFeedback('Avaliação salva. O convite de avaliação do líder NÃO foi enviado: este colaborador não tem email cadastrado. Cadastre o email na tela Avaliação do Líder.')
      } else if (lc?.motivo === 'JA_CONVIDADO') {
        setFeedback('Avaliação salva. Este colaborador já recebeu o convite de avaliação do líder anteriormente.')
      } else if (lc?.motivo === 'PROPRIO_LIDER') {
        setFeedback('Avaliação salva. Convite não enviado: este membro é o próprio líder do time.')
      } else if (lc?.motivo === 'ERRO') {
        setFeedback('Avaliação salva, mas houve falha ao enviar o convite de avaliação do líder. Tente pelo botão Enviar convites na tela Avaliação do Líder.')
      } else {
        onClose()
      }
    } catch {
      setError('Erro de conexão.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center px-3 md:px-6 py-6 overflow-y-auto"
         style={{ background: 'rgba(28,26,23,0.62)', backdropFilter: 'blur(4px)' }}>
      <div className="bg-white rounded-3xl shadow-soul-xl w-full max-w-2xl my-auto" style={{ border: '1px solid rgba(232,226,214,0.6)' }}>
        {/* Header sticky */}
        <div className="sticky top-0 z-10 bg-white rounded-t-3xl px-6 md:px-7 pt-6 pb-4 border-b border-soul-mist/60">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-soul-terracota">Avaliação de desempenho</p>
              <h3 className="font-serif font-semibold text-2xl text-soul-ink leading-tight">{memberNome}</h3>
            </div>
            <button onClick={onClose} aria-label="Fechar" className="w-9 h-9 rounded-full flex items-center justify-center text-soul-ink/70 hover:bg-soul-mist/60 text-2xl leading-none flex-shrink-0">×</button>
          </div>
          {/* Progresso */}
          <div className="mt-3">
            <div className="flex justify-between text-[12px] font-semibold text-soul-ink/60 mb-1">
              <span>{respondidas}/{CRITERIOS.length} critérios</span>
              <span>{progresso}%</span>
            </div>
            <div className="h-1.5 bg-soul-mist/70 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all" style={{ width: `${progresso}%`, background: 'linear-gradient(90deg, #c4633a, #d4943a)' }} />
            </div>
          </div>
        </div>

        {/* Corpo */}
        <div className="px-6 md:px-7 py-5 space-y-6">
          {DIMENSOES.map((dim) => {
            const info = DIMENSAO_INFO[dim]
            return (
              <div key={dim}>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: info.cor }} />
                  <p className="font-serif text-lg font-semibold text-soul-ink">{info.rotulo}</p>
                </div>
                <p className="text-[12px] text-soul-ink/55 font-medium mb-3 -mt-2 ml-4.5">{info.subtitulo}</p>
                <div className="space-y-3">
                  {criteriosPorDimensao(dim).map((c) => (
                    <div key={c.id} className="rounded-2xl p-3" style={{ background: 'rgba(245,240,232,0.5)', border: '1px solid rgba(232,226,214,0.7)' }}>
                      <p className="text-[13.5px] font-semibold text-soul-ink mb-2 leading-snug">{c.texto}</p>
                      <div className="flex gap-1.5">
                        {ESCALA_AVALIACAO.map((opt) => {
                          const sel = respostas[c.id] === opt.valor
                          return (
                            <button key={opt.valor} onClick={() => setResp(c.id, opt.valor)} title={opt.label}
                                    className="flex-1 py-2 rounded-lg border-2 text-[13px] font-bold transition-all"
                                    style={{
                                      borderColor: sel ? info.cor : 'rgba(232,226,214,1)',
                                      background: sel ? info.cor : 'white',
                                      color: sel ? 'white' : 'rgba(28,26,23,0.6)',
                                    }}>
                              {opt.valor}
                            </button>
                          )
                        })}
                      </div>
                      <div className="flex justify-between text-[10px] text-soul-ink/40 font-medium mt-1 px-0.5">
                        <span>Muito abaixo</span><span>Referência</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Footer sticky com prévia + salvar */}
        <div className="sticky bottom-0 bg-white rounded-b-3xl px-6 md:px-7 py-4 border-t border-soul-mist/60">
          {error && <p className="text-[12.5px] font-semibold mb-2" style={{ color: '#a8522e' }}>{error}</p>}
          {feedback && (
            <div className="rounded-2xl px-4 py-3 mb-3 text-[13px] font-semibold leading-relaxed"
                 style={{
                   background: feedback.startsWith('✓') ? 'rgba(90,125,90,0.12)' : 'rgba(201,168,76,0.12)',
                   border: `1px solid ${feedback.startsWith('✓') ? 'rgba(90,125,90,0.4)' : 'rgba(201,168,76,0.45)'}`,
                   color: feedback.startsWith('✓') ? '#3f5c3f' : '#6d5615',
                 }}>
              {feedback}
              <button onClick={onClose} className="block mt-2 underline font-bold">Fechar</button>
            </div>
          )}
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex gap-4 text-[12px] font-bold">
              <span style={{ color: '#c4633a' }}>Perf {previa.notaPerformance.toFixed(1)}</span>
              <span style={{ color: '#3d4f7c' }}>Fit {previa.fitComportamental.toFixed(1)}</span>
              <span style={{ color: '#c9a84c' }}>Potencial {previa.potencial.toFixed(1)}</span>
            </div>
            <button onClick={salvar} disabled={saving}
                    className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[14px] font-bold text-white shadow-terra disabled:opacity-60"
                    style={{ background: 'linear-gradient(135deg, #c4633a, #d4943a)' }}>
              {saving ? 'Salvando…' : 'Salvar avaliação'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
