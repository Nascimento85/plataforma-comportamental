// ============================================================
// <PassportWidget /> — Substitui o antigo CreditsWidget.
// "Saldo de Créditos" → "Passaporte de Autoconhecimento"
// ============================================================
import Link from 'next/link'
import PassportBadge from './PassportBadge'
import type { PassportState } from '@/lib/passport'

interface Props {
  state: PassportState
}

export default function PassportWidget({ state }: Props) {
  const { total, paid, bonus, status, hoursRemaining } = state
  const isLow     = total <= 5
  const isExpired = status === 'EXPIRED'

  return (
    <div
      className="rounded-3xl p-5"
      style={{
        background: isExpired
          ? 'linear-gradient(135deg, #fbeae5, #faf2ee)'
          : isLow
            ? 'linear-gradient(135deg, #f5e8e1, #faf0ec)'
            : 'linear-gradient(135deg, #f5ede1, #faf0e6)',
        border: `1px solid ${isLow || isExpired ? 'rgba(196,99,58,0.2)' : 'rgba(196,99,58,0.12)'}`,
      }}
    >
      <div className="flex items-center justify-between mb-1.5">
        <div
          className="text-[11px] font-sans font-bold tracking-[0.14em] uppercase"
          style={{ color: '#8f3f1e' }}
        >
          Passaporte de Autoconhecimento
        </div>
        <PassportBadge
          status={status}
          hoursRemaining={hoursRemaining}
          bonusBalance={bonus}
        />
      </div>

      <div
        className="font-serif font-bold leading-none mb-1"
        style={{ fontSize: '46px', color: isLow ? '#8f3f1e' : '#a8522e' }}
      >
        {total}
      </div>
      <div className="text-[12px] text-soul-ink/55 font-sans">
        créditos disponíveis
      </div>

      {/* Decomposição bônus × pago */}
      <div className="flex gap-2 mb-4 mt-4">
        <div className="flex-1 bg-white/85 rounded-xl p-3 text-center border border-soul-mist/60">
          <div className="font-serif text-xl font-bold text-soul-ink">{bonus}</div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-soul-ink/75 mt-1">
            🎟️ Bônus
          </div>
        </div>
        <div className="flex-1 bg-white/85 rounded-xl p-3 text-center border border-soul-mist/60">
          <div className="font-serif text-xl font-bold text-soul-ink">{paid}</div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-soul-ink/75 mt-1">
            💳 Pagos
          </div>
        </div>
      </div>

      {isExpired && (
        <div className="text-[13px] font-sans font-bold text-soul-terracota mb-2 flex items-center gap-1">
          ⚠ Seu Passaporte expirou — recarregue para continuar
        </div>
      )}
      {!isExpired && status === 'ACTIVE' && hoursRemaining !== null && hoursRemaining < 48 && (
        <div className="text-[13px] font-sans font-semibold mb-2 flex items-center gap-1" style={{ color: '#a04a1f' }}>
          ⏳ {hoursRemaining < 24 ? `Expira em ${hoursRemaining}h` : `Expira em ${Math.ceil(hoursRemaining/24)} dias`}
        </div>
      )}

      {(isLow || isExpired) && (
        <Link
          href="/dashboard/credits"
          className="mt-3 w-full flex items-center justify-center gap-2 py-3 rounded-full
                     text-[14px] font-sans font-bold text-white transition-all duration-200
                     hover:-translate-y-px shadow-terra"
          style={{ background: 'linear-gradient(135deg, #c4633a, #d4943a)' }}
        >
          🪙 Recarregar passaporte
        </Link>
      )}
    </div>
  )
}
