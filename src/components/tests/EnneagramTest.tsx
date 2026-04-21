'use client'

import { useState } from 'react'
import { ENNEAGRAM_QUESTIONS } from '@/lib/engines/enneagram'
import TestResultCard from '@/components/tests/TestResultCard'

interface EnneagramAnswer {
  questionId: number
  value: number // 1 a 5
}

const LIKERT = [
  { value: 1, label: 'Discordo totalmente' },
  { value: 2, label: 'Discordo' },
  { value: 3, label: 'Neutro' },
  { value: 4, label: 'Concordo' },
  { value: 5, label: 'Concordo totalmente' },
]

// 135 questões divididas em 9 blocos (1 por tipo, 15 questões cada)
const QUESTIONS_PER_TYPE = 15
const PAGE_SIZE = QUESTIONS_PER_TYPE // Uma página por tipo

export default function EnneagramTest({
  assessmentId,
  token,
}: {
  assessmentId: string
  token: string
}) {
  const [answers, setAnswers] = useState<Record<number, EnneagramAnswer>>({})
  const [page, setPage] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)
  const [resultData, setResultData] = useState<Record<string, unknown> | null>(null)

  const totalPages = Math.ceil(ENNEAGRAM_QUESTIONS.length / PAGE_SIZE)
  const pageQuestions = ENNEAGRAM_QUESTIONS.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)
  const currentTypeNumber = page + 1

  const answered = Object.keys(answers).length
  const progress = Math.round((answered / ENNEAGRAM_QUESTIONS.length) * 100)
  const pageComplete = pageQuestions.every((q) => answers[q.id] !== undefined)

  function handleAnswer(questionId: number, value: number) {
    setAnswers((prev) => ({ ...prev, [questionId]: { questionId, value } }))
  }

  async function handleSubmit() {
    const unanswered = ENNEAGRAM_QUESTIONS.filter((q) => !answers[q.id])
    if (unanswered.length > 0) {
      setError(`${unanswered.length} afirmação(ões) ainda não respondida(s).`)
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
        {resultData && <TestResultCard testType="ENNEAGRAM" result={resultData} />}
        <div className="card p-4 bg-brand-50 border-brand-200 text-center text-sm text-brand-700">
          O relatório completo será disponibilizado pela sua empresa.
        </div>
      </div>
    )
  }

  // BLOCO ANTIGO REMOVIDO — era:
  return (
    <div className="space-y-6">
      {/* Progresso */}
      <div>
        <div className="flex justify-between text-sm text-gray-500 mb-1">
          <span>Bloco {page + 1} de {totalPages}</span>
          <span>{answered}/{ENNEAGRAM_QUESTIONS.length} respondidas</span>
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
        <strong>Bloco {currentTypeNumber} de {totalPages}:</strong> Leia cada afirmação e indique o quanto ela descreve você, de <strong>1 (discordo totalmente)</strong> a <strong>5 (concordo totalmente)</strong>.
      </div>

      {/* Questões */}
      <div className="space-y-3">
        {pageQuestions.map((q, idx) => {
          const selected = answers[q.id]?.value

          return (
            <div key={q.id} className="card p-5">
              <p className="text-sm text-gray-800 mb-4 leading-relaxed">
                <span className="text-xs text-gray-400 mr-2 font-mono">
                  {page * PAGE_SIZE + idx + 1}.
                </span>
                {q.text}
              </p>

              <div className="flex gap-2 flex-wrap">
                {LIKERT.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleAnswer(q.id, opt.value)}
                    title={opt.label}
                    className={`flex-1 min-w-[48px] py-2 rounded-lg border-2 text-sm font-semibold transition-all
                      ${
                        selected === opt.value
                          ? 'border-brand-500 bg-brand-500 text-white'
                          : 'border-gray-200 text-gray-600 hover:border-brand-300 hover:bg-brand-50'
                      }
                    `}
                  >
                    {opt.value}
                  </button>
                ))}
              </div>

              {/* Labels extremos */}
              <div className="flex justify-between text-xs text-gray-400 mt-1 px-0.5">
                <span>Discordo totalmente</span>
                <span>Concordo totalmente</span>
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
                setError('Responda todas as afirmações deste bloco antes de continuar.')
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
            disabled={submitting || answered < ENNEAGRAM_QUESTIONS.length}
            className="btn-primary flex-1"
          >
            {submitting ? 'Enviando...' : '✓ Finalizar teste'}
          </button>
        )}
      </div>
    </div>
  )
}
