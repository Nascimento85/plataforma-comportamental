'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function DeleteTeamButton({ teamId, teamName }: { teamId: string; teamName: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleDelete(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    if (!confirm(`Excluir a equipe "${teamName}"? Isso remove a equipe e os membros dela. Os candidatos já cadastrados não são apagados. Não dá para desfazer.`)) return
    setLoading(true)
    try {
      const res = await fetch(`/api/talent-teams/${teamId}`, { method: 'DELETE' })
      if (!res.ok) {
        const d = await res.json().catch(() => ({}))
        alert(d.error ?? 'Não foi possível excluir a equipe.')
        setLoading(false)
        return
      }
      router.refresh()
    } catch {
      alert('Erro de conexão. Tente novamente.')
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      title="Excluir equipe"
      aria-label="Excluir equipe"
      className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-colors disabled:opacity-50"
      style={{ background: 'rgba(192,57,43,0.14)', color: '#e58a7d', border: '1px solid rgba(192,57,43,0.30)' }}
    >
      {loading ? (
        <span className="text-xs">…</span>
      ) : (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path d="M3 4h10M6.5 4V3a1 1 0 011-1h1a1 1 0 011 1v1M5 4l.4 9a1 1 0 001 1h3.2a1 1 0 001-1L11 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </button>
  )
}
