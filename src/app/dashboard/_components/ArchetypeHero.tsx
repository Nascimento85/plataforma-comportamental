interface Props {
  name: string
  totalCompleted: number
}

// Nível calculado a partir de avaliações concluídas (lógica simples de XP)
function getLevelInfo(completed: number): {
  level: number
  xp: number
  xpNext: number
  label: string
} {
  const xp = completed * 320
  const level = Math.floor(xp / 2000) + 1
  const xpInLevel = xp % 2000
  const xpNext = 2000

  const labels = [
    'Iniciante', 'Curioso', 'Explorador', 'Descobridor',
    'Desbravador', 'Cartógrafo', 'Navegante', 'Pioneiro',
    'Visionário', 'Mestre da Alma',
  ]

  return {
    level: Math.min(level, 10),
    xp: xpInLevel,
    xpNext,
    label: labels[Math.min(level - 1, labels.length - 1)],
  }
}

export default function ArchetypeHero({ name, totalCompleted }: Props) {
  const { level, xp, xpNext, label } = getLevelInfo(totalCompleted)
  const pct = Math.round((xp / xpNext) * 100)
  // dashoffset para anel SVG (circunferência = 2π×34 ≈ 213.6)
  const dashOffset = 213.6 * (1 - pct / 100)

  return (
    <div
      className="rounded-3xl p-6 relative overflow-hidden flex items-center gap-8"
      style={{ background: 'linear-gradient(135deg, #1c1a17 0%, #2d2417 50%, #3d2a1c 100%)' }}
    >
      {/* Orb deco */}
      <div
        className="absolute top-0 right-0 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.13) 0%, transparent 70%)', transform: 'translate(20%, -30%)' }}
      />
      <div
        className="absolute bottom-0 left-1/2 w-48 h-48 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(196,99,58,0.08) 0%, transparent 70%)', transform: 'translateY(50%)' }}
      />

      {/* Mandala glyph */}
      <div className="relative z-10 flex-shrink-0 w-20 h-20">
        <svg viewBox="0 0 90 90" fill="none" className="w-full h-full">
          <circle cx="45" cy="45" r="42" stroke="rgba(201,168,76,0.18)" strokeWidth="1.5" strokeDasharray="4 6"/>
          <circle cx="45" cy="45" r="30" stroke="rgba(201,168,76,0.28)" strokeWidth="0.8"/>
          <path
            d="M45 13L48.5 39.5L72 26L55.5 45L72 64L48.5 50.5L45 77L41.5 50.5L18 64L34.5 45L18 26L41.5 39.5Z"
            fill="rgba(201,168,76,0.12)" stroke="#c9a84c" strokeWidth="1.2" strokeLinejoin="round"
          />
          <circle cx="45" cy="45" r="5" fill="#c9a84c" opacity="0.8"/>
          <circle cx="45" cy="45" r="2.5" fill="#c9a84c"/>
        </svg>
      </div>

      {/* Info */}
      <div className="flex-1 relative z-10 min-w-0">
        <div
          className="text-[10px] font-sans font-medium tracking-[0.2em] uppercase mb-1.5"
          style={{ color: '#c9a84c' }}
        >
          Seu Arquétipo Dominante
        </div>
        <div className="font-serif font-light text-4xl text-white leading-none mb-2">
          O Explorador
        </div>
        <div
          className="font-display italic text-base leading-relaxed mb-4"
          style={{ color: 'rgba(255,255,255,0.5)' }}
        >
          &ldquo;A liberdade de descobrir novos horizontes é o que move sua alma.&rdquo;
        </div>
        <div className="flex gap-2 flex-wrap">
          {['Autonomia', 'Curiosidade', 'Aventura', 'Propósito'].map((attr) => (
            <span
              key={attr}
              className="text-[11px] px-3 py-1 rounded-full font-sans"
              style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.65)' }}
            >
              {attr}
            </span>
          ))}
        </div>
      </div>

      {/* XP Ring */}
      <div className="relative z-10 flex-shrink-0 text-center hidden sm:block">
        <div className="w-20 h-20 relative mb-2">
          <svg viewBox="0 0 80 80" className="w-full h-full" style={{ transform: 'rotate(-90deg)' }}>
            <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="5"/>
            <circle
              cx="40" cy="40" r="34" fill="none"
              stroke="#c9a84c" strokeWidth="5" strokeLinecap="round"
              strokeDasharray="213.6"
              strokeDashoffset={dashOffset}
              style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-serif text-xl font-semibold text-white leading-none">
              Nv{level}
            </span>
            <span
              className="text-[9px] font-sans uppercase tracking-wide"
              style={{ color: '#c9a84c' }}
            >
              XP
            </span>
          </div>
        </div>
        <div className="text-[11px] text-white/40 font-sans whitespace-nowrap">
          {name.split(' ')[0]} · {label}
        </div>
      </div>
    </div>
  )
}
