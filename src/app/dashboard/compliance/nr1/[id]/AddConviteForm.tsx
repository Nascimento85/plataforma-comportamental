// ============================================================
// AddConviteForm — adicionar novo convite em coleta NR-1 existente
// ============================================================

'use client'

import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'

interface Setor { id: string; nome: string }

export default function AddConviteForm({
  coletaId,
  setores,
}: {
  coletaId: string
  setores:  Setor[]
}) {
  const router = useRouter()
  const [open, setOpen]   = useState(false)
  const [nome, setNome]   = useState('')
  const [email, setEmail] = useState('')
  const [setorId, setSetorId] = useState<string>(setores[0]?.id ?? '')
  const [erro, setErro]   = useState<string | null>(null)
  const [pending, startTransition] = useTransition()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErro(null)

    const nomeT  = nome.trim()
    const emailT = email.trim()
    if (!nomeT || !emailT || !setorId) {
      setErro('Preencha nome, e-mail e setor.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailT)) {
      setErro('E-mail invalido.')
      return
    }

    try {
      const res = await fetch(`/api/nr1/coletas/${coletaId}/convites`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ nome: nomeT, email: emailT, setorId }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({} as { error?: string }))
        setErro(data.error ?? 'Falha ao adicionar convite.')
        return
      }
      // sucesso: limpa form e refaz fetch da pagina
      setNome('')
      setEmail('')
      setErro(null)
      startTransition(() => router.refresh())
    } catch {
      setErro('Erro de conexao. Tente novamente.')
    }
  }

  if (setores.length === 0) {
    return (
      <p className="text-[14px] text-soul-ink/80 font-medium italic mt-3">
        Cadastre um setor primeiro para poder adicionar convites.
      </p>
    )
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-3 inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[14px] font-bold transition-colors"
        style={{
          background: 'rgba(196,99,58,0.10)',
          color:      '#8a4a26',
          border:     '1px solid rgba(196,99,58,0.25)',
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        Adicionar convite
      </button>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 p-4 rounded-2xl space-y-3"
          style={{ background: 'rgba(196,99,58,0.04)', border: '1px solid rgba(196,99,58,0.15)' }}>
      <p className="text-[13.5px] font-bold uppercase tracking-widest text-soul-ink/80">
        Novo convite
      </p>
      <div className="flex flex-wrap gap-2">
        <input
          type="text"
          placeholder="Nome do funcionario"
          className="soul-input flex-1 min-w-[160px]"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          disabled={pending}
        />
        <input
          type="email"
          placeholder="E-mail"
          className="soul-input flex-1 min-w-[200px]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={pending}
        />
        <select
          className="soul-input"
          value={setorId}
          onChange={(e) => setSetorId(e.target.value)}
          disabled={pending}
        >
          {setores.map(s => (
            <option key={s.id} value={s.id}>{s.nome}</option>
          ))}
        </select>
      </div>
      {erro && (
        <p className="text-[13.5px] font-semibold text-red-600">{erro}</p>
      )}
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[14px] font-bold transition-colors disabled:opacity-50"
          style={{
            background: 'linear-gradient(135deg, #c4633a, #d4943a)',
            color: '#ffffff',
          }}
        >
          {pending ? 'Salvando...' : 'Salvar convite'}
        </button>
        <button
          type="button"
          onClick={() => { setOpen(false); setErro(null); setNome(''); setEmail('') }}
          disabled={pending}
          className="inline-flex items-center rounded-lg px-3 py-1.5 text-[14px] font-bold text-soul-ink/80 hover:text-soul-ink transition-colors"
        >
          Cancelar
        </button>
      </div>
    </form>
  )
}
