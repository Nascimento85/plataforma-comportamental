'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getQmtSessionQuestions } from '@/lib/engines'
import { submitTestWithFallback } from '@/lib/submit-test'

interface QmtAnswer {
  questionId: number
  value:      number // 1=C, 2=I, 3=P
}

// dimensão -> valor salvo (mesmo mapa do banco)
const DIM_VALUE: Record<'C' | 'I' | 'P', number> = { C: 1, I: 2, P: 3 }
const LETTER = ['A', 'B', 'C']

const PAGE_SIZE = 9 // 27 questões / 9 = 3 páginas

export default function QMTTest({
  assessmentId,
  token,
}: {
  assessmentId: string
  token: string
}) {
  const router = useRouter()
  // Sorteio determinístico pelo token: mesmo candidato, mesma sessão se reabrir.
  const QUESTIONS = useMemo(() => getQmtSessionQuestions(token), [token])

  const [answers, setAnswers] = useState<Record<number, QmtAnswer>>({})
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
        <strong>Bloco {page + 1} de {totalPages}:</strong> Para cada situação, escolha a opção que mais combina com o seu jeito <strong>natural e espontâneo</strong>. Não existe certo ou errado, só a sua preferência. Vá pela primeira reação.
      </div>

      <div className="space-y-3">
        {pageQuestions.map((q, idx) => {
          const selected = answers[q.id]?.value
          return (
            <div key={q.id} className="card p-5">
              <p className="text-sm font-semibold text-gray-800 mb-4 leading-relaxed">
                <span className="text-xs text-gray-400 mr-2 font-mono">
                  {page * PAGE_SIZE + idx + 1}.
                </span>
                {q.enunciado}
              </p>

              <div className="space-y-2">
                {q.opcoes.map((opt, oi) => {
                  const val = DIM_VALUE[opt.dim]
                  const isSel = selected === val
                  return (
                    <button
                      key={opt.dim}
                      onClick={() => handleAnswer(q.id, val)}
                      className={`w-full text-left px-4 py-3 rounded-lg border-2 text-sm leading-relaxed transition-all flex gap-3 items-start
                        ${
                          isSel
                            ? 'border-brand-500 bg-brand-500 text-white'
                            : 'border-gray-200 text-gray-700 hover:border-brand-300 hover:bg-brand-50'
                        }
                      `}
                    >
                      <span className={`font-bold flex-shrink-0 ${isSel ? 'text-white' : 'text-brand-500'}`}>{LETTER[oi]})</span>
                      <span>{opt.texto}</span>
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
            {submitting ? 'Enviando…' : '✓ Ver meu perfil mental'}
          </button>
        )}
      </div>
    </div>
  )
}
