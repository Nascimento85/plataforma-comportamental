'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NovoTimeButton({ variant = 'default' }: { variant?: 'default' | 'onDark' }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [nome, setNome] = useState('')
  const [descricao, setDescricao] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (nome.trim().length < 2) { setError('Informe o nome da equipe.'); return }
    setLoading(true)
    try {
      const res = await fetch('/api/talent-teams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: nome.trim(), descricao: descricao.trim() }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error ?? 'Erro ao criar a equipe.'); return }
      router.push(`/dashboard/gestao-times/${data.id}`)
    } catch {
      setError('Erro de conexão. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const triggerClass = variant === 'onDark'
    ? 'inline-flex items-center gap-2 rounded-full px-5 py-3 text-[15px] font-bold text-soul-ink bg-soul-gold hover:bg-soul-gold-light transition-all'
    : 'inline-flex items-center gap-2 rounded-full px-5 py-3 text-[15px] font-bold text-white shadow-terra transition-all hover:-translate-y-px'

  const triggerStyle = variant === 'onDark' ? {} : { background: 'linear-gradient(135deg, #c4633a, #d4943a)' }

  return (
    <>
      <button onClick={() => setOpen(true)} className={triggerClass} style={triggerStyle}>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
        </svg>
        Nova equipe
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 overflow-y-auto py-6"
             style={{ background: 'rgba(28,26,23,0.62)', backdropFilter: 'blur(4px)' }}>
          <div className="bg-soul-parchment rounded-3xl shadow-soul-xl w-full max-w-md p-6 md:p-7"
               style={{ border: '1px solid rgba(58,61,69,0.6)' }}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-serif font-semibold text-2xl text-soul-ink">Criar nova equipe</h3>
              <button onClick={() => setOpen(false)} aria-label="Fechar"
                      className="w-9 h-9 rounded-full flex items-center justify-center text-soul-ink/80 hover:bg-soul-mist/60 text-2xl leading-none">×</button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              {error && (
                <div className="rounded-xl px-4 py-3 text-[14px] font-semibold"
                     style={{ background: 'rgba(196,122,114,0.15)', border: '1px solid rgba(196,122,114,0.45)', color: '#f0a892' }}>
                  {error}
                </div>
              )}
              <div>
                <label className="block text-[13.5px] font-bold text-soul-ink/88 uppercase tracking-widest mb-2">Nome da equipe</label>
                <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} maxLength={80}
                       placeholder="Ex: Equipe Comercial, Squad Produto" className="soul-input w-full" disabled={loading} autoFocus />
              </div>
              <div>
                <label className="block text-[13.5px] font-bold text-soul-ink/88 uppercase tracking-widest mb-2">Descrição (opcional)</label>
                <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} maxLength={500} rows={2}
                          placeholder="Contexto da equipe, área, momento atual…" className="soul-input w-full resize-y" disabled={loading} />
              </div>
              <button type="submit" disabled={loading}
                      className="w-full py-3 rounded-full text-[15px] font-bold text-white shadow-terra disabled:opacity-60"
                      style={{ background: 'linear-gradient(135deg, #c4633a, #d4943a)' }}>
                {loading ? 'Criando…' : 'Criar equipe →'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
