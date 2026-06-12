'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Props {
  employeeId: string
}

export default function IntegratedReportClient({ employeeId }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState<string | null>(null)
  const [feedbackKind, setFeedbackKind] = useState<'ok' | 'warn' | 'err'>('ok')

  async function regenerate() {
    setLoading(true)
    setFeedback(null)
    try {
      const res = await fetch(`/api/integrated-report/${employeeId}`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ force: true }),
      })
      const data = await res.json() as { status?: string; reason?: string }

      if (!res.ok) {
        if (res.status === 409) {
          setFeedbackKind('warn')
          setFeedback(data.reason ?? 'Funcionário não tem testes suficientes.')
        } else {
          setFeedbackKind('err')
          setFeedback(data.reason ?? 'Falha ao gerar.')
        }
      } else {
        setFeedbackKind('ok')
        setFeedback(
          data.status === 'GENERATED'
            ? 'Devolutiva gerada com sucesso. Recarregando…'
            : data.status === 'SKIPPED_NO_CHANGE'
              ? 'Já existe relatório com a mesma quantidade de testes.'
              : 'Geração disparada.'
        )
        setTimeout(() => router.refresh(), 800)
      }
    } catch {
      setFeedbackKind('err')
      setFeedback('Erro de conexão. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const colors = feedbackKind === 'ok'
    ? { bg: 'rgba(122,158,126,0.18)', color: '#a9d3a9' }
    : feedbackKind === 'warn'
      ? { bg: 'rgba(212,148,58,0.18)', color: '#e0c878' }
      : { bg: 'rgba(196,122,114,0.18)', color: '#f0a892' }

  return (
    <div className="flex flex-col items-end gap-2">
      <button
        onClick={regenerate}
        disabled={loading}
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-[14px] font-sans font-bold text-white transition-all hover:-translate-y-px shadow-terra disabled:opacity-60 disabled:translate-y-0"
        style={{ background: 'linear-gradient(135deg, #c4633a, #d4943a)' }}
      >
        {loading ? '⏳ Gerando…' : '✦ Gerar / Regenerar devolutiva'}
      </button>
      {feedback && (
        <p
          className="text-[13.5px] font-semibold rounded-full px-3 py-1"
          style={{ background: colors.bg, color: colors.color }}
        >
          {feedback}
        </p>
      )}
    </div>
  )
}
