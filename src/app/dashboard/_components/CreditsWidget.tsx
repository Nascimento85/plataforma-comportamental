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
        className="text-[11px] font-sans font-bold tracking-[0.14em] uppercase mb-1.5"
        style={{ color: '#8f3f1e' }}
      >
        Saldo de créditos
      </div>

      <div
        className="font-serif font-bold leading-none mb-1"
        style={{ fontSize: '46px', color: isLow ? '#8f3f1e' : '#a8522e' }}
      >
        {credits}
      </div>

      {isLow && (
        <div className="text-[13px] font-sans font-bold text-soul-terracota mb-2 flex items-center gap-1">
          ⚠ Créditos baixos — recarregar em breve
        </div>
      )}

      {/* Breakdown */}
      <div className="flex gap-2 mb-4 mt-2">
        <div className="flex-1 bg-white/80 rounded-xl p-3 text-center border border-soul-mist/60">
          <div className="font-serif text-xl font-bold text-soul-ink">{Math.floor(credits * 0.63)}</div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-soul-ink/75 mt-1">Individuais</div>
        </div>
        <div className="flex-1 bg-white/80 rounded-xl p-3 text-center border border-soul-mist/60">
          <div className="font-serif text-xl font-bold text-soul-ink">{credits - Math.floor(credits * 0.63)}</div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-soul-ink/75 mt-1">Times</div>
        </div>
      </div>

      {/* Progress */}
      <div>
        <div className="flex justify-between text-[12px] text-soul-ink font-semibold mb-1.5">
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
          className="mt-3 w-full flex items-center justify-center gap-2 py-3 rounded-full
                     text-[14px] font-sans font-bold text-white transition-all duration-200
                     hover:-translate-y-px shadow-terra"
          style={{ background: 'linear-gradient(135deg, #c4633a, #d4943a)' }}
        >
          🪙 Comprar créditos
        </Link>
      )}
    </div>
  )
}
