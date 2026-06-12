'use client'

import { useMemo, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'

interface EmpresaRow {
  id:           string
  name:         string
  email:        string
  type:         string
  isAdmin:      boolean
  createdAt:    string
  subStatus:    string | null
  subPlan:      string | null
  subSource:    string | null
  subValidoAte: string | null
  totalAssessments: number
}

const STATUS_BADGE: Record<string, { bg: string; color: string; label: string }> = {
  ACTIVE:   { bg: 'rgba(122,158,126,0.20)', color: '#3d6b40', label: 'Ativa' },
  TRIALING: { bg: 'rgba(201,168,76,0.22)',  color: '#8a6517', label: 'Trial' },
  PAST_DUE: { bg: 'rgba(212,148,58,0.22)',  color: '#e0c878', label: 'Em atraso' },
  CANCELED: { bg: 'rgba(196,99,58,0.18)',   color: '#8a3a1f', label: 'Cancelada' },
  EXPIRED:  { bg: 'rgba(196,99,58,0.18)',   color: '#8a3a1f', label: 'Expirada' },
}

export default function EmpresasClient({ empresas }: { empresas: EmpresaRow[] }) {
  const router = useRouter()
  const [busca, setBusca] = useState('')
  const [loading, setLoading] = useState<string | null>(null)
  const [erro, setErro] = useState<string | null>(null)
  const [okMsg, setOkMsg] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()

  const filtradas = useMemo(() => {
    const q = busca.trim().toLowerCase()
    if (!q) return empresas
    return empresas.filter(e =>
      e.name.toLowerCase().includes(q) ||
      e.email.toLowerCase().includes(q) ||
      e.id.toLowerCase().includes(q)
    )
  }, [busca, empresas])

  async function liberarPremium(empresa: EmpresaRow) {
    if (!confirm(`Conceder Premium PROFISSIONAL manual para "${empresa.name}" por 5 anos?`)) return
    setLoading(empresa.id); setErro(null); setOkMsg(null)
    try {
      const res = await fetch('/api/admin/grant-subscription', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ companyId: empresa.id, plan: 'PROFISSIONAL', anos: 5 }),
      })
      const data = await res.json()
      if (!res.ok) { setErro(data.error ?? 'Falha.'); return }
      setOkMsg(data.message ?? 'Premium concedido.')
      startTransition(() => router.refresh())
    } catch { setErro('Erro de conexão.') }
    finally { setLoading(null) }
  }

  async function revogarPremium(empresa: EmpresaRow) {
    if (!confirm(`Revogar premium manual de "${empresa.name}"?`)) return
    setLoading(empresa.id); setErro(null); setOkMsg(null)
    try {
      const res = await fetch(`/api/admin/grant-subscription?companyId=${empresa.id}`, { method: 'DELETE' })
      const data = await res.json()
      if (!res.ok) { setErro(data.error ?? 'Falha.'); return }
      setOkMsg(data.message ?? 'Revogado.')
      startTransition(() => router.refresh())
    } catch { setErro('Erro de conexão.') }
    finally { setLoading(null) }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2 items-center">
        <input
          type="text"
          placeholder="Buscar por nome, email ou ID…"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="soul-input flex-1"
        />
        <span className="text-[14px] text-soul-ink/75 font-medium whitespace-nowrap">
          {filtradas.length} de {empresas.length}
        </span>
      </div>

      {erro  && <div className="rounded-xl px-4 py-3 text-[14px] font-semibold" style={{ background: 'rgba(196,122,114,0.15)', border: '1px solid rgba(196,122,114,0.45)', color: '#f0a892' }}>{erro}</div>}
      {okMsg && <div className="rounded-xl px-4 py-3 text-[14px] font-semibold" style={{ background: 'rgba(122,158,126,0.15)', border: '1px solid rgba(122,158,126,0.40)', color: '#3d6b40' }}>{okMsg}</div>}

      <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(196,99,58,0.18)' }}>
        <table className="w-full text-[14px]">
          <thead>
            <tr style={{ background: 'rgba(196,99,58,0.06)' }}>
              <th className="text-left px-4 py-3 font-bold text-soul-ink/88 uppercase text-[13px] tracking-wider">Empresa</th>
              <th className="text-left px-3 py-3 font-bold text-soul-ink/88 uppercase text-[13px] tracking-wider">Tipo</th>
              <th className="text-left px-3 py-3 font-bold text-soul-ink/88 uppercase text-[13px] tracking-wider">Assinatura</th>
              <th className="text-right px-3 py-3 font-bold text-soul-ink/88 uppercase text-[13px] tracking-wider">Testes</th>
              <th className="text-right px-4 py-3 font-bold text-soul-ink/88 uppercase text-[13px] tracking-wider">Ação</th>
            </tr>
          </thead>
          <tbody>
            {filtradas.map(e => {
              const badge = e.subStatus ? STATUS_BADGE[e.subStatus] : null
              const isLoadingThis = loading === e.id || pending
              const isManual = e.subSource === 'MANUAL'
              const isStripe = e.subSource === 'STRIPE'
              const ativa = e.subStatus === 'ACTIVE' || e.subStatus === 'TRIALING'
              return (
                <tr key={e.id} className="border-t" style={{ borderColor: 'rgba(196,99,58,0.10)' }}>
                  <td className="px-4 py-3">
                    <div className="font-bold text-soul-ink">{e.name} {e.isAdmin && <span className="text-[12px] uppercase tracking-wider font-bold ml-1" style={{ color: '#d4943a' }}>· ADMIN</span>}</div>
                    <div className="text-[13.5px] text-soul-ink/75 font-medium">{e.email}</div>
                  </td>
                  <td className="px-3 py-3">
                    <span className="inline-block px-2 py-0.5 rounded-full text-[12px] font-bold uppercase tracking-wider"
                          style={{
                            background: e.type === 'PJ' ? 'rgba(196,99,58,0.12)' : 'rgba(122,99,196,0.12)',
                            color:      e.type === 'PJ' ? '#8a4a26' : '#5a4a8a',
                          }}>
                      {e.type}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    {badge ? (
                      <div>
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-[13px] font-bold"
                              style={{ background: badge.bg, color: badge.color }}>
                          {badge.label}
                        </span>
                        <div className="text-[13px] text-soul-ink/75 font-medium mt-0.5">
                          {e.subPlan} {isManual && <span className="italic">(manual)</span>}
                          {isStripe && <span className="italic"> (Stripe)</span>}
                          {e.subValidoAte && ` · até ${new Date(e.subValidoAte).toLocaleDateString('pt-BR')}`}
                        </div>
                      </div>
                    ) : (
                      <span className="text-[13.5px] text-soul-ink/68 font-medium italic">sem assinatura</span>
                    )}
                  </td>
                  <td className="px-3 py-3 text-right font-bold text-soul-ink">{e.totalAssessments}</td>
                  <td className="px-4 py-3 text-right">
                    {ativa && isManual ? (
                      <button
                        type="button"
                        onClick={() => revogarPremium(e)}
                        disabled={isLoadingThis}
                        className="text-[13px] font-bold px-2.5 py-1 rounded-lg disabled:opacity-50"
                        style={{ background: 'rgba(196,99,58,0.10)', color: '#8a3a1f', border: '1px solid rgba(196,99,58,0.30)' }}
                      >
                        {isLoadingThis ? '…' : 'Revogar'}
                      </button>
                    ) : isStripe ? (
                      <span className="text-[13px] text-soul-ink/68 italic">Stripe</span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => liberarPremium(e)}
                        disabled={isLoadingThis}
                        className="text-[13px] font-bold px-2.5 py-1 rounded-lg disabled:opacity-50"
                        style={{ background: 'rgba(122,158,126,0.15)', color: '#3d6b40', border: '1px solid rgba(122,158,126,0.40)' }}
                      >
                        {isLoadingThis ? '…' : '✦ Liberar Premium'}
                      </button>
                    )}
                  </td>
                </tr>
              )
            })}
            {filtradas.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-soul-ink/72 font-medium italic">Nenhuma empresa encontrada.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
