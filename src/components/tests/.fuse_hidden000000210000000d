'use client'

import { useState } from 'react'
import {
  LOVE_LANGUAGES_QUESTIONS,
  LOVE_LANGUAGE_LABELS,
  LOVE_LANGUAGE_EMOJIS,
  LOVE_LANGUAGE_COLORS,
  type LoveLangAnswer,
} from '@/lib/engines/love-languages'
import TestResultCard from '@/components/tests/TestResultCard'

const PAGE_SIZE = 5

export default function LoveLanguagesTest({
  assessmentId,
  token,
}: {
  assessmentId: string
  token: string
}) {
  const [answers, setAnswers] = useState<Record<number, LoveLangAnswer>>({})
  const [page, setPage] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)
  const [resultData, setResultData] = useState<Record<string, unknown> | null>(null)

  const totalPages = Math.ceil(LOVE_LANGUAGES_QUESTIONS.length / PAGE_SIZE)
  const pageQuestions = LOVE_LANGUAGES_QUESTIONS.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)
  const answered = Object.keys(answers).length
  const progress = Math.round((answered / LOVE_LANGUAGES_QUESTIONS.length) * 100)
  const pageComplete = pageQuestions.every((q) => answers[q.id] !== undefined)

  function handleAnswer(questionId: number, selected: 'A' | 'B') {
    setAnswers((prev) => ({ ...prev, [questionId]: { questionId, selected } }))
  }

  async function handleSubmit() {
    const unanswered = LOVE_LANGUAGES_QUESTIONS.filter((q) => !answers[q.id])
    if (unanswered.length > 0) {
      const firstPage = Math.floor(
        LOVE_LANGUAGES_QUESTIONS.findIndex((q) => q.id === unanswered[0].id) / PAGE_SIZE
      )
      setPage(firstPage)
      setError(`${unanswered.length} questão(ões) ainda não respondida(s).`)
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
      setError('Falha na conexão. Tente novamente.')
    } finally {
      setSubmitting(false)
    }
  }

  if (done && resultData) {
    return <TestResultCard testType="LOVE_LANGUAGES" result={resultData} />
  }

  return (
    <div className="space-y-6">
      {/* Barra de progresso */}
      <div>
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>{answered} de {LOVE_LANGUAGES_QUESTIONS.length} respondidas</span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-rose-500 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Instrução */}
      <div className="bg-rose-50 border border-rose-100 rounded-xl px-4 py-3 text-sm text-rose-700">
        <strong>Instrução:</strong> Em cada par, escolha a afirmação que <em>mais</em> representa você — mesmo que ambas pareçam verdadeiras. Vá pela primeira reação.
      </div>

      {/* Questões */}
      <div className="space-y-5">
        {pageQuestions.map((q, idx) => {
          const selected = answers[q.id]?.selected
          const globalIdx = page * PAGE_SIZE + idx + 1

          return (
            <div key={q.id} className="card p-5">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                Questão {globalIdx}
              </p>
              <div className="space-y-3">
                {(['A', 'B'] as const).map((opt) => {
                  const option = opt === 'A' ? q.optionA : q.optionB
                  const isSelected = selected === opt
                  return (
                    <button
                      key={opt}
                      onClick={() => handleAnswer(q.id, opt)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-150 ${
                        isSelected
                          ? 'border-rose-500 bg-rose-50 ring-2 ring-rose-100'
                          : 'border-gray-200 hover:border-rose-300 hover:bg-rose-50/40'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                          isSelected ? 'bg-rose-500 text-white' : 'bg-gray-100 text-gray-500'
                        }`}>
                          {opt}
                        </div>
                        <p className={`text-sm leading-relaxed pt-0.5 ${isSelected ? 'text-rose-800 font-medium' : 'text-gray-700'}`}>
                          {option.text}
                        </p>
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
        <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          {error}
        </div>
      )}

      {/* Navegação */}
      <div className="flex gap-3">
        {page > 0 && (
          <button
            onClick={() => { setPage((p) => p - 1); window.scrollTo(0, 0) }}
            className="flex-1 py-3 px-4 rounded-xl border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
          >
            ← Anterior
          </button>
        )}
        {page < totalPages - 1 ? (
          <button
            onClick={() => {
              if (!pageComplete) {
                setError('Responda todas as questões desta página antes de continuar.')
                return
              }
              setError('')
              setPage((p) => p + 1)
              window.scrollTo(0, 0)
            }}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-colors ${
              pageComplete
                ? 'bg-rose-500 text-white hover:bg-rose-600'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            Próxima →
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={submitting || answered < LOVE_LANGUAGES_QUESTIONS.length}
            className="flex-1 py-3 px-4 rounded-xl font-semibold bg-rose-500 text-white hover:bg-rose-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {submitting ? 'Calculando...' : 'Ver minha Linguagem do Amor →'}
          </button>
        )}
      </div>

      {/* Paginação */}
      <div className="flex justify-center gap-1.5">
        {Array.from({ length: totalPages }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all ${
              i === page ? 'w-6 bg-rose-500' : i < page ? 'w-3 bg-rose-300' : 'w-3 bg-gray-200'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
