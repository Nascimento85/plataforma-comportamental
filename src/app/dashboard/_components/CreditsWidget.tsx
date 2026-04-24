import Link from 'next/link'

interface Props {
  credits: number
  planMax?: number
}

export default function CreditsWidget({ credits, planMax = 200 }: Props) {
  const pct = Math.min(100, Math.round((credits / planMax) * 100))
  const isLow = credits <= 5

  return (
    <div
      className="rounded-3xl p-5"
      style={{
        background: isLow
          ? 'linear-gradient(135deg, #f5e8e1, #faf0ec)'
          : 'linear-gradient(135deg, #f5ede1, #faf0e6)',
        border: `1px solid ${isLow ? 'rgba(196,99,58,0.2)' : 'rgba(196,99,58,0.12)'}`,
      }}
    >
      <div
        className="text-[10px] font-sans font-medium tracking-[0.12em] uppercase mb-1"
        style={{ color: 'rgba(196,99,58,0.6)' }}
      >
        Saldo de créditos
      </div>

      <div
        className="font-serif font-light leading-none mb-1"
        style={{ fontSize: '42px', color: isLow ? '#b3522e' : '#c4633a' }}
      >
        {credits}
      </div>

      {isLow && (
        <div className="text-xs font-sans text-soul-terracota mb-2 flex items-center gap-1">
          ⚠ Créditos baixos — recarregar em breve
        </div>
      )}

      {/* Breakdown */}
      <div className="flex gap-2 mb-4 mt-2">
        <div className="flex-1 bg-white/70 rounded-xl p-3 text-center">
          <div className="font-serif text-xl text-soul-ink">{Math.floor(credits * 0.63)}</div>
          <div className="text-[10px] text-soul-ink/40 mt-0.5">Individuais</div>
        </div>
        <div className="flex-1 bg-white/70 rounded-xl p-3 text-center">
          <div className="font-serif text-xl text-soul-ink">{credits - Math.floor(credits * 0.63)}</div>
          <div className="text-[10px] text-soul-ink/40 mt-0.5">Times</div>
        </div>
      </div>

      {/* Progress */}
      <div>
        <div className="flex justify-between text-[10.5px] text-soul-ink/40 mb-1.5">
          <span>Plano Profissional</span>
          <span>{credits} / {planMax}</span>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(28,26,23,0.08)' }}>
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{
              width: `${pct}%`,
              background: 'linear-gradient(90deg, #c4633a, #d4943a)',
            }}
          />
        </div>
      </div>

      {isLow && (
        <Link
          href="/dashboard/credits"
          className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 rounded-full
                     text-sm font-sans font-medium text-white transition-all duration-200
                     hover:-translate-y-px shadow-terra"
          style={{ background: 'linear-gradient(135deg, #c4633a, #d4943a)' }}
        >
          🪙 Comprar créditos
        </Link>
      )}
    </div>
  )
}
