// ============================================================
// SeedRespostasButton — botao admin-only para gerar respostas
// mockadas em um setor (QA + demos comerciais).
// ============================================================

'use client'

import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'

interface Setor { id: string; nome: string }

type Profile = 'BAIXO' | 'MODERADO' | 'ALTO' | 'RANDOM'

const PROFILE_LABEL: Record<Profile, string> = {
  BAIXO:    'Baixo risco (cenario saudavel)',
  MODERADO: 'Moderado (mais realista p/ demo)',
  ALTO:     'Alto risco (cenario critico)',
  RANDOM:   'Aleatorio (mix dos 3)',
}

export default function SeedRespostasButton({
  coletaId,
  setores,
}: {
  coletaId: string
  setores:  Setor[]
}) {
  const router = useRouter()
  const [open, setOpen]   = useState(false)
  const [setorId, setSetorId] = useState<string>(setores[0]?.id ?? '')
  const [n, setN]         = useState<number>(5)
  const [profile, setProfile] = useState<Profile>('MODERADO')
  const [erro, setErro]   = useState<string | null>(null)
  const [okMsg, setOkMsg] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()

  if (setores.length === 0) return null

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErro(null)
    setOkMsg(null)

    if (!setorId) {
      setErro('Selecione um setor.')
      return
    }
    if (n < 1 || n > 20) {
      setErro('Quantidade entre 1 e 20.')
      return
    }

    try {
      const res = await fetch(`/api/nr1/coletas/${coletaId}/seed-respostas`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ setorId, n, profile }),
      })
      const data = await res.json().catch(() => ({} as { error?: string; seeded?: number }))
      if (!res.ok) {
        setErro(data.error ?? 'Falha ao gerar respostas.')
        return
      }
      setOkMsg(`${data.seeded ?? n} respostas geradas no setor. Clique em "Atualizar relatorio" para reprocessar.`)
      startTransition(() => router.refresh())
    } catch {
      setErro('Erro de conexao. Tente novamente.')
    }
  }

  if (!open) {
    return (
      <div className="mt-6">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[13.5px] font-bold transition-colors"
          style={{
            background: 'rgba(122,99,196,0.10)',
            color:      '#5a4a8a',
            border:     '1px dashed rgba(122,99,196,0.40)',
          }}
          aria-label="Gerar respostas de teste"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
          </svg>
          Gerar respostas de teste (admin)
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 p-4 rounded-2xl space-y-3"
      style={{ background: 'rgba(122,99,196,0.04)', border: '1px dashed rgba(122,99,196,0.30)' }}
    >
      <div className="flex items-center justify-between">
        <p className="text-[13px] font-bold uppercase tracking-widest" style={{ color: '#5a4a8a' }}>
          Seed admin · QA / Demo
        </p>
        <span className="text-[12px] text-soul-ink/72 font-medium italic">
          Visivel apenas para administradores
        </span>
      </div>

      <p className="text-[13.5px] text-soul-ink/85 font-medium">
        Gera respostas mockadas (Karasek + ERI + COPSOQ) em um setor para validar o fluxo end-to-end
        sem precisar mobilizar pessoas reais.
      </p>

      <div className="flex flex-wrap gap-2">
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

        <input
          type="number"
          min={1}
          max={20}
          className="soul-input"
          style={{ width: 90 }}
          value={n}
          onChange={(e) => setN(parseInt(e.target.value || '0', 10))}
          disabled={pending}
          aria-label="Quantidade de respondentes"
        />

        <select
          className="soul-input flex-1 min-w-[200px]"
          value={profile}
          onChange={(e) => setProfile(e.target.value as Profile)}
          disabled={pending}
        >
          {(Object.keys(PROFILE_LABEL) as Profile[]).map(p => (
            <option key={p} value={p}>{PROFILE_LABEL[p]}</option>
          ))}
        </select>
      </div>

      {erro && (
        <p className="text-[13.5px] font-semibold text-red-600">{erro}</p>
      )}
      {okMsg && (
        <p className="text-[13.5px] font-semibold" style={{ color: '#a9d3a9' }}>{okMsg}</p>
      )}

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[14px] font-bold transition-colors disabled:opacity-50"
          style={{ background: 'linear-gradient(135deg, #7a63c4, #5a4a8a)', color: '#ffffff' }}
        >
          {pending ? 'Gerando...' : 'Gerar respostas'}
        </button>
        <button
          type="button"
          onClick={() => { setOpen(false); setErro(null); setOkMsg(null) }}
          disabled={pending}
          className="inline-flex items-center rounded-lg px-3 py-1.5 text-[14px] font-bold text-soul-ink/80 hover:text-soul-ink transition-colors"
        >
          Fechar
        </button>
      </div>
    </form>
  )
}
