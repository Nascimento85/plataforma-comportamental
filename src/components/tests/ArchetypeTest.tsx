'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { submitTestWithFallback } from '@/lib/submit-test'

export interface ArchetypeQuestion {
  id: number
  text: string
  archetype: string
}

interface ArchetypeAnswer {
  questionId: number
  value: number
}

const LIKERT = [1, 2, 3, 4, 5]
const PAGE_SIZE = 7

interface Props {
  assessmentId: string
  token: string
  questions: ArchetypeQuestion[]
  testType: string
}

export default function ArchetypeTest({ assessmentId, token, questions }: Props) {
  const router = useRouter()
  const [answers, setAnswers] = useState<Record<number, ArchetypeAnswer>>({})
  const [page, setPage] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const totalPages = Math.ceil(questions.length / PAGE_SIZE)
  const pageQuestions = questions.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)
  const answered = Object.keys(answers).length
  const progress = Math.round((answered / questions.length) * 100)
  const pageComplete = pageQuestions.every((q) => answers[q.id] !== undefined)

  function handleAnswer(questionId: number, value: number) {
    setAnswers((prev) => ({ ...prev, [questionId]: { questionId, value } }))
  }

  async function handleSubmit() {
    const unanswered = questions.filter((q) => !answers[q.id])
    if (unanswered.length > 0) {
      setError(unanswered.length + ' afirmacoes ainda nao respondidas.')
      return
    }
    setSubmitting(true)
    setError('')
    const outcome = await submitTestWithFallback({ token, answers: Object.values(answers) })
    if (outcome.ok) {
      router.push('/result/' + (outcome.assessmentId ?? assessmentId))
      return
    }
    setError(outcome.error)
    setSubmitting(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>{answered} de {questions.length} respondidas</span>
          <span>Pagina {page + 1} de {totalPages}</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-brand-600 rounded-full transition-all" style={{ width: progress + '%' }} />
        </div>
      </div>

      <div className="space-y-5">
        {pageQuestions.map((q) => (
          <div key={q.id} className="card p-5">
            <p className="text-sm font-medium text-gray-800 mb-4">
              <span className="text-brand-400 font-bold mr-2">{q.id}.</span>
              {q.text}
            </p>
            <div className="flex gap-2 flex-wrap">
              {LIKERT.map((v) => (
                <button
                  key={v}
                  onClick={() => handleAnswer(q.id, v)}
                  className={'flex-1 min-w-[52px] py-2 rounded-lg border text-sm font-semibold ' + (answers[q.id]?.value === v ? 'bg-brand-600 border-brand-600 text-white' : 'border-gray-200 text-gray-600')}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">{error}</div>}

      <div className="flex gap-3">
        {page > 0 && (
          <button onClick={() => setPage((p) => p - 1)} className="btn-secondary flex-1">Anterior</button>
        )}
        {page < totalPages - 1 ? (
          <button
            onClick={() => { if (pageComplete) setPage((p) => p + 1); else setError('Responda todas as afirmacoes antes de continuar.') }}
            className="btn-primary flex-1"
          >
            Proxima
          </button>
        ) : (
          <button onClick={handleSubmit} disabled={submitting} className="btn-primary flex-1">
            {submitting ? 'Enviando...' : 'Finalizar'}
          </button>
        )}
      </div>
    </div>
  )
}
