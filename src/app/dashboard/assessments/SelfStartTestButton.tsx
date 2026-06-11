'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

/**
 * SelfStartTestButton, botão "Fazer teste agora".
 *
 * Cria um assessment auto vinculado ao usuário logado (selfAssessment=true)
 * e redireciona direto pro fluxo do teste, sem abrir modal e sem precisar
 * digitar nome/email do candidato. Usado em todos os catálogos (behavioral,
 * leadership, career, archetypes, love-languages).
 */
export default function SelfStartTestButton({
  testType,
  label,
  variant = 'primary',
  fullWidth = false,
}: {
  testType: string
  /** Texto do botão. Ex: "Fazer teste agora", "Fazer Big Five agora". */
  label?: string
  variant?: 'primary' | 'compact'
  fullWidth?: boolean
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleClick() {
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/assessments', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ testType, selfAssessment: true }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? 'Não foi possível iniciar o teste.')
        return
      }
      // Redireciona direto pro fluxo do teste no próprio domínio
      const path = data.testLink.replace(/^https?:\/\/[^/]+/, '')
      router.push(path)
    } catch {
      setError('Erro ao conectar. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  // Mesma altura, padding e tipografia do NewAssessmentButton (primary) para
  // ficarem perfeitamente alinhados quando aparecem lado a lado.
  const baseClass = variant === 'compact'
    ? 'inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-[13px] font-sans font-bold text-white transition-all hover:-translate-y-px disabled:opacity-60 disabled:translate-y-0'
    : 'inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-[14px] font-sans font-bold text-white transition-all hover:-translate-y-px disabled:opacity-60 disabled:translate-y-0'

  const cls = `${baseClass} ${fullWidth ? 'w-full' : ''}`

  return (
    <>
      <button
        onClick={handleClick}
        disabled={loading}
        title="Fazer este teste agora mesmo, no seu próprio perfil"
        className={cls}
        style={{
          background: 'linear-gradient(135deg, #5e8762, #7a9e7e)',
          boxShadow:  '0 4px 14px rgba(122,158,126,0.30)',
        }}
      >
        <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
          <path d="M4 3l9 5-9 5V3z" />
        </svg>
        {loading ? 'Abrindo…' : (label ?? 'Fazer teste agora')}
      </button>
      {error && (
        <p className="text-[11.5px] font-semibold mt-1" style={{ color: '#e09070' }}>{error}</p>
      )}
    </>
  )
}
