'use client'

import { useState } from 'react'
import { TEMPERAMENT_QUESTIONS } from '@/lib/engines/temperament'
import type { TemperamentOption } from '@/lib/engines/temperament'
import TestResultCard from '@/components/tests/TestResultCard'

interface TemperamentAnswer {
  questionId: number
  selected: TemperamentOption
}

const OPTION_STYLES: Record<TemperamentOption, { base: string; selected: string; label: string }> = {
  A: {
    base: 'border-red-200 hover:border-red-400 hover:bg-red-50',
    selected: 'border-red-500 bg-red-50 ring-2 ring-red-200',
    label: 'Colérico',
  },
  C: {
    base: 'border-amber-200 hover:border-amber-400 hover:bg-amber-50',
    selected: 'border-amber-500 bg-amber-50 ring-2 ring-amber-200',
    label: 'Sanguíneo',
  },
  I: {
    base: 'border-violet-200 hover:border-violet-400 hover:bg-violet-50',
    selected: 'border-violet-500 bg-violet-50 ring-2 ring-violet-200',
    label: 'Melancólico',
  },
  O: {
    base: 'border-green-200 hover:border-green-400 hover:bg-green-50',
    selected: 'border-green-500 bg-green-50 ring-2 ring-green-200',
    label: 'Fleumático',
  },
}

const PAGE_SIZE = 5
const OPTION_ORDER: TemperamentOption[] = ['A', 'C', 'I', 'O']

export default function TemperamentTest({
  assessmentId,
  token,
}: {
  assessmentId: string
  token: string
}) {
  const [answers, setAnswers] = useState<Record<number, TemperamentAnswer>>({})
  const [page, setPage] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)
  const [resultData, setResultData] = useState<Record<string, unknown> | null>(null)

  const totalPages = Math.ceil(TEMPERAMENT_QUESTIONS.length / PAGE_SIZE)
  const pageQuestions = TEMPERAMENT_QUESTIONS.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)

  const answered = Object.keys(answers).length
  const progress = Math.round((answered / TEMPERAMENT_QUESTIONS.length) * 100)
  const pageComplete = pageQuestions.every((q) => answers[q.id] !== undefined)

  function handleAnswer(questionId: number, selected: TemperamentOption) {
    setAnswers((prev) => ({ ...prev, [questionId]: { questionId, selected } }))
  }

  async function handleSubmit() {
    const unanswered = TEMPERAMENT_QUESTIONS.filter((q) => !answers[q.id])
    if (unanswered.length > 0) {
      const firstMissingPage = Math.floor(
        TEMPERAMENT_QUESTIONS.findIndex((q) => q.id === unanswered[0].id) / PAGE_SIZE
      )
      setPage(firstMissingPage)
      setError(`Ainda há ${unanswered.length} questão(ões) sem resposta.`)
      return
    }

    setSubmitting(true)
    setError('')

    try {
      const res = await fetch('/api/results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, answers: Object.values(answers) }),
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error ?? 'Erro ao enviar respostas.')
        return
      }

      const data = await res.json()
      setResultData(data.result ?? null)
      setDone(true)
    } catch {
      setError('Erro de conexão. Tente novamente.')
    } finally {
      setSubmitting(false)
    }
  }

  if (done) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="text-5xl mb-3">🎉</div>
          <h2 className="text-xl font-bold text-gray-900">Avaliação concluída!</h2>
          <p className="text-gray-500 text-sm mt-1">Aqui está um resumo do seu perfil identificado:</p>
        </div>
        {resultData && <TestResultCard testType="TEMPERAMENT" result={resultData} />}
        <div className="card p-4 bg-brand-50 border-brand-200 text-center text-sm text-brand-700">
          O relatório completo será disponibilizado pela sua empresa.
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Progresso */}
      <div>
        <div className="flex justify-between text-sm text-gray-500 mb-1">
          <span>Página {page + 1} de {totalPages}</span>
          <span>{answered}/{TEMPERAMENT_QUESTIONS.length} respondidas</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-brand-500 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Instrução */}
      <div className="bg-brand-50 border border-brand-200 rounded-xl p-4 text-sm text-brand-800">
        <strong>Como responder:</strong> Para cada pergunta, escolha a opção que <strong>mais se identifica</strong> com você. Não existem respostas certas ou erradas.
      </div>

      {/* Questões */}
      <div className="space-y-5">
        {pageQuestions.map((q, idx) => {
          const selectedOpt = answers[q.id]?.selected

          return (
            <div key={q.id} className="card p-5">
              <p className="text-sm font-semibold text-gray-800 mb-4">
                <span className="text-xs text-gray-400 font-normal mr-2">
                  {page * PAGE_SIZE + idx + 1}.
                </span>
                {q.question}
              </p>

              <div className="space-y-2">
                {OPTION_ORDER.map((opt) => {
                  const style = OPTION_STYLES[opt]
                  const isSelected = selectedOpt === opt
                  const text = q.options[opt]

                  return (
                    <button
                      key={opt}
                      onClick={() => handleAnswer(q.id, opt)}
                      className={`w-full text-left px-4 py-3 rounded-lg border-2 text-sm transition-all
                        ${isSelected ? style.selected : style.base}
                      `}
                    >
                      <div className="flex items-center gap-3">
                        {/* Radio visual */}
                        <div
                          className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all
                            ${isSelected
                              ? opt === 'A' ? 'border-red-500 bg-red-500'
                              : opt === 'C' ? 'border-amber-500 bg-amber-500'
                              : opt === 'I' ? 'border-violet-500 bg-violet-500'
                              : 'border-green-500 bg-green-500'
                              : 'border-gray-300 bg-white'
                            }`}
                        >
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                        <span className={isSelected ? 'text-gray-900 font-medium' : 'text-gray-700'}>
                          {text}
                        </span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {/* Erro */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
          {error}
        </div>
      )}

      {/* Navegação */}
      <div className="flex gap-3">
        <button
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          disabled={page === 0}
          className="btn-secondary flex-1"
        >
          ← Anterior
        </button>

        {page < totalPages - 1 ? (
          <button
            onClick={() => {
              if (!pageComplete) {
                setError('Responda todas as questões desta página antes de continuar.')
                return
              }
              setError('')
              setPage((p) => p + 1)
            }}
            className="btn-primary flex-1"
          >
            Próxima →
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={submitting || answered < TEMPERAMENT_QUESTIONS.length}
            className="btn-primary flex-1"
          >
            {submitting ? 'Enviando...' : '✓ Finalizar teste'}
          </button>
        )}
      </div>
    </div>
  )
}
