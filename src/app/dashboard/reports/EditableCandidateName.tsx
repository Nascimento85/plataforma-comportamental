'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function EditableCandidateName({
  employeeId,
  name,
  email,
}: {
  employeeId: string
  name: string
  email: string
}) {
  const router = useRouter()
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState(name)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function save() {
    const novo = value.trim()
    if (novo.length < 2) {
      setError('Mínimo 2 caracteres.')
      return
    }
    if (novo === name) {
      setEditing(false)
      return
    }
    setSaving(true)
    setError('')
    try {
      const res = await fetch(`/api/employees/${employeeId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: novo }),
      })
      if (!res.ok) {
        const d = await res.json().catch(() => ({}))
        setError(d.error ?? 'Não foi possível salvar.')
        setSaving(false)
        return
      }
      setEditing(false)
      setSaving(false)
      router.refresh()
    } catch {
      setError('Erro de conexão.')
      setSaving(false)
    }
  }

  function cancel() {
    setValue(name)
    setError('')
    setEditing(false)
  }

  if (editing) {
    return (
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <input
            autoFocus
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') save()
              if (e.key === 'Escape') cancel()
            }}
            disabled={saving}
            className="px-2.5 py-1.5 rounded-lg text-[15px] font-semibold w-[200px] outline-none"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(196,99,58,0.5)', color: '#f0ece3' }}
          />
          <button
            onClick={save}
            disabled={saving}
            className="px-2.5 py-1.5 rounded-lg text-[13px] font-bold text-white disabled:opacity-50"
            style={{ background: 'linear-gradient(135deg, #c4633a, #d4943a)' }}
          >
            {saving ? '…' : 'Salvar'}
          </button>
          <button
            onClick={cancel}
            disabled={saving}
            className="px-2 py-1.5 rounded-lg text-[13px] font-semibold disabled:opacity-50"
            style={{ color: 'rgba(240,236,227,0.7)' }}
          >
            Cancelar
          </button>
        </div>
        {error && <span className="text-[12.5px] font-semibold" style={{ color: '#e58a7d' }}>{error}</span>}
        <span className="text-[14px] text-soul-ink/80 font-medium">{email}</span>
      </div>
    )
  }

  return (
    <div className="group flex flex-col">
      <div className="flex items-center gap-2">
        <span className="font-semibold text-[15px] text-soul-ink">{name}</span>
        <button
          onClick={() => setEditing(true)}
          title="Editar nome do candidato"
          aria-label="Editar nome do candidato"
          className="opacity-60 hover:opacity-100 transition-opacity"
          style={{ color: '#e09070' }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M11.5 2.5l2 2L6 12l-2.5.5L4 10l7.5-7.5z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      <span className="text-[14px] text-soul-ink/80 font-medium mt-0.5">{email}</span>
    </div>
  )
}
