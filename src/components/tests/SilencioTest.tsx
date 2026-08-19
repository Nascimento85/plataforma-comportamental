'use client'

// ============================================================
// O Teste do Silêncio: uma pergunta por tela
// ============================================================
// Formato diferente dos outros testes de propósito: é a isca de topo de
// funil, quase toda a audiência chega pelo celular e cada tela a mais é
// gente que desiste. Uma pergunta por vez, avanço automático ao escolher.
// ============================================================

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getSilencioSessionQuestions } from '@/lib/engines'
import { submitTestWithFallback } from '@/lib/submit-test'

interface Resposta {
  questionId: number
  value: number // 1..4 = indice canonico da categoria
}

export default function SilencioTest({
  assessmentId,
  token,
}: {
  assessmentId: string
  token: string
}) {
  const router = useRouter()
  // Sorteio determinístico pelo token: se ela recarregar, é a mesma prova.
  const QUESTOES = useMemo(() => getSilencioSessionQuestions(token), [token])

  const [respostas, setRespostas] = useState<Record<number, Resposta>>({})
  const [i, setI] = useState(0)
  const [enviando, setEnviando] = useState(false)
  const [erro, setErro] = useState('')

  const total = QUESTOES.length
  const q = QUESTOES[i]
  const respondidas = Object.keys(respostas).length
  const progresso = Math.round((respondidas / total) * 100)
  const selecionada = respostas[q.id]?.value

  async function enviar(todas: Record<number, Resposta>) {
    setEnviando(true)
    setErro('')
    const saida = await submitTestWithFallback({ token, answers: Object.values(todas) })
    if (saida.ok) {
      router.push(`/result/${saida.assessmentId ?? assessmentId}`)
      return
    }
    setErro(saida.error)
    setEnviando(false)
  }

  function escolher(valor: number) {
    const atualizadas = { ...respostas, [q.id]: { questionId: q.id, value: valor } }
    setRespostas(atualizadas)

    if (i < total - 1) {
      // pequena pausa para a seleção ser visível antes de avançar
      window.setTimeout(() => setI((n) => n + 1), 180)
      return
    }
    if (Object.keys(atualizadas).length === total) {
      window.setTimeout(() => enviar(atualizadas), 180)
    }
  }

  return (
    <div className="space-y-6">
      {/* progresso */}
      <div>
        <div className="flex justify-between text-sm text-gray-500 mb-1">
          <span>Pergunta {i + 1} de {total}</span>
          <span>{progresso}%</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-brand-500 rounded-full transition-all duration-300"
            style={{ width: `${progresso}%` }}
          />
        </div>
      </div>

      {/* pergunta */}
      <div className="card p-5 sm:p-6">
        <p className="text-base sm:text-lg font-semibold text-gray-800 leading-relaxed mb-5">
          {q.enunciado}
        </p>

        <div className="space-y-2.5">
          {q.opcoes.map((opt) => {
            const marcada = selecionada === opt.valor
            return (
              <button
                key={opt.valor}
                type="button"
                onClick={() => escolher(opt.valor)}
                disabled={enviando}
                className={`w-full text-left px-4 py-3.5 rounded-xl border-2 text-[15px] leading-relaxed transition-all
                  ${marcada
                    ? 'border-brand-500 bg-brand-500 text-white'
                    : 'border-gray-200 text-gray-700 hover:border-brand-300 hover:bg-brand-50'}
                `}
              >
                {opt.texto}
              </button>
            )
          })}
        </div>
      </div>

      <p className="text-center text-[13px] text-gray-500">
        Vá pela primeira reação. Não existe resposta certa, existe a sua.
      </p>

      {erro && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
          {erro}
        </div>
      )}

      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => { setErro(''); setI((n) => Math.max(0, n - 1)) }}
          disabled={i === 0 || enviando}
          className="btn-secondary flex-1"
        >
          ← Voltar
        </button>

        {i === total - 1 && respondidas === total && (
          <button
            type="button"
            onClick={() => enviar(respostas)}
            disabled={enviando}
            className="btn-primary flex-1"
          >
            {enviando ? 'Preparando…' : '✓ Ver meu resultado'}
          </button>
        )}
      </div>
    </div>
  )
}
