// ============================================================
// <PassportBadge /> — pequeno selo "Passaporte Ativo / Expira em Xh"
// Use no header do dashboard, sidebar, e ao lado do nome do usuário.
// ============================================================
'use client'

import { useEffect, useState } from 'react'

type Status = 'ACTIVE' | 'EXPIRED' | 'CONSUMED' | 'INACTIVE'

interface Props {
  status: Status
  hoursRemaining: number | null
  bonusBalance: number
  /** Mostra o tooltip estendido (default true) */
  withTooltip?: boolean
}

export default function PassportBadge({
  status,
  hoursRemaining,
  bonusBalance,
  withTooltip = true,
}: Props) {
  // Atualiza relógio a cada minuto enquanto a página estiver aberta
  const [now, setNow] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setNow(n => n + 1), 60_000)
    return () => clearInterval(id)
  }, [])

  if (status === 'INACTIVE') return null

  const tone = (() => {
    switch (status) {
      case 'ACTIVE':
        return hoursRemaining !== null && hoursRemaining < 24
          ? { bg: '#fff3e0', fg: '#a04a1f', dot: '#d4943a', label: '⏳ Passaporte expira em breve' }
          : { bg: '#eef6ee', fg: '#3b6e3f', dot: '#7a9e7e', label: '🎟️ Passaporte Ativo' }
      case 'EXPIRED':
        return { bg: '#fbeae5', fg: '#8c2f17', dot: '#c4633a', label: '⚠ Passaporte expirado' }
      case 'CONSUMED':
        return { bg: '#eef0f4', fg: '#3a4254', dot: '#7a8298', label: '✓ Passaporte utilizado' }
      default:
        return { bg: '#eef0f4', fg: '#3a4254', dot: '#7a8298', label: 'Passaporte' }
    }
  })()

  const subtitle = (() => {
    if (status === 'ACTIVE' && hoursRemaining !== null) {
      if (hoursRemaining < 1)  return 'expira agora'
      if (hoursRemaining < 24) return `expira em ${hoursRemaining}h`
      const days = Math.ceil(hoursRemaining / 24)
      return `expira em ${days} dia${days > 1 ? 's' : ''}`
    }
    if (status === 'CONSUMED') return 'créditos utilizados'
    if (status === 'EXPIRED')  return 'sem créditos bônus'
    return null
  })()

  return (
    <div
      className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-sans font-semibold transition-all"
      style={{ background: tone.bg, color: tone.fg, border: `1px solid ${tone.fg}20` }}
      title={withTooltip ? `Passaporte: ${bonusBalance} créditos` : undefined}
      data-clock={now}
    >
      <span
        className="h-2 w-2 rounded-full inline-block"
        style={{ background: tone.dot, boxShadow: status === 'ACTIVE' ? `0 0 0 4px ${tone.dot}26` : undefined }}
      />
      <span>{tone.label}</span>
      {subtitle && (
        <span className="text-[10px] font-medium opacity-70 border-l border-current/20 pl-2">
          {subtitle}
        </span>
      )}
    </div>
  )
}
