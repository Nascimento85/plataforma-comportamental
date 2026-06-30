'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getQiSessionQuestions } from '@/lib/engines'
import { submitTestWithFallback } from '@/lib/submit-test'

interface QiAnswer {
  questionId: number
  value:      number // 1..4 — índice da alternativa escolhida
}

const LETRAS = ['A', 'B', 'C', 'D']
const PAGE_SIZE = 5 // 20 questões / 5 = 4 páginas

export default function QITest({
  assessmentId,
  token,
}: {
  assessmentId: string
  token: string
}) {
  const router = useRouter()
  // Sorteio determinístico pelo token: mesmo candidato, mesmas questões se reabrir.
  const QUESTIONS = useMemo(() => getQiSessionQuestions(token), [token])

  const [answers, setAnswers] = useState<Record<number, QiAnswer>>({})
  const [page, setPage] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const totalPages = Math.ceil(QUESTIONS.length / PAGE_SIZE)
  const pageQuestions = QUESTIONS.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)

  const answered = Object.keys(answers).length
  const progress = Math.round((answered / QUESTIONS.length) * 100)
  const pageComplete = pageQuestions.every((q) => answers[q.id] !== undefined)

  function handleAnswer(questionId: number, value: number) {
    setAnswers((prev) => ({ ...prev, [questionId]: { questionId, value } }))
  }

  async function handleSubmit() {
    const unanswered = QUESTIONS.filter((q) => !answers[q.id])
    if (unanswered.length > 0) {
      setError(`${unanswered.length} questão(ões) ainda não respondida(s).`)
      return
    }
    setSubmitting(true)
    setError('')
    const outcome = await submitTestWithFallback({ token, answers: Object.values(answers) })
    if (outcome.ok) {
      router.push(`/result/${outcome.assessmentId ?? assessmentId}`)
      return
    }
    setError(outcome.error)
    setSubmitting(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="flex justify-between text-sm text-gray-500 mb-1">
          <span>Bloco {page + 1} de {totalPages}</span>
          <span>{answered}/{QUESTIONS.length} respondidas</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-brand-500 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="bg-brand-50 border border-brand-200 rounded-xl p-4 text-sm text-brand-800">
        <strong>Bloco {page + 1} de {totalPages}:</strong> Leia cada problema com atenção e escolha a <strong>única</strong> alternativa correta. Existe resposta certa — não há tempo cronometrado, mas evite a pressa, que costuma levar ao erro.
      </div>

      <div className="space-y-3">
        {pageQuestions.map((q, idx) => {
          const selected = answers[q.id]?.value
          return (
            <div key={q.id} className="card p-5">
              <p className="text-sm text-gray-800 mb-4 leading-relaxed">
                <span className="text-xs text-gray-400 mr-2 font-mono">
                  {page * PAGE_SIZE + idx + 1}.
                </span>
                {q.enunciado}
              </p>

              <div className="space-y-2">
                {q.alternativas.map((alt, i) => {
                  const optValue = i + 1
                  const isSel = selected === optValue
                  return (
                    <button
                      key={i}
                      onClick={() => handleAnswer(q.id, optValue)}
                      className={`w-full text-left flex items-start gap-3 py-2.5 px-3 rounded-lg border-2 text-sm transition-all
                        ${
                          isSel
                            ? 'border-brand-500 bg-brand-500 text-white'
                            : 'border-gray-200 text-gray-700 hover:border-brand-300 hover:bg-brand-50'
                        }
                      `}
                    >
                      <span className={`flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold
                        ${isSel ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'}`}>
                        {LETRAS[i]}
                      </span>
                      <span className="leading-snug pt-0.5">{alt}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
          {error}
        </div>
      )}

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
                setError('Responda todas as questões deste bloco antes de continuar.')
                return
              }
              setError('')
              setPage((p) => p + 1)
            }}
            className="btn-primary flex-1"
          >
            Próximo bloco →
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={submitting || answered < QUESTIONS.length}
            className="btn-primary flex-1"
          >
            {submitting ? 'Corrigindo…' : '✓ Ver meu resultado'}
          </button>
        )}
      </div>
    </div>
  )
}
