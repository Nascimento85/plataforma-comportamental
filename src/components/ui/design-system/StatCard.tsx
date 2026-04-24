import { ReactNode } from 'react'

type Accent = 'terracota' | 'sage' | 'indigo' | 'rose' | 'gold' | 'amber'

interface StatCardProps {
  value: string | number
  label: string
  icon?: string
  delta?: string
  deltaUp?: boolean
  accent?: Accent
  className?: string
}

const accentStyles: Record<Accent, { bar: string; icon: string }> = {
  terracota: {
    bar:  'linear-gradient(90deg, #c4633a, #d4943a)',
    icon: 'rgba(196,99,58,0.10)',
  },
  sage: {
    bar:  'linear-gradient(90deg, #7a9e7e, #96bf9a)',
    icon: 'rgba(122,158,126,0.12)',
  },
  indigo: {
    bar:  'linear-gradient(90deg, #3d4f7c, #6b7fb8)',
    icon: 'rgba(61,79,124,0.10)',
  },
  rose: {
    bar:  'linear-gradient(90deg, #c47a72, #d4a0a0)',
    icon: 'rgba(196,122,114,0.10)',
  },
  gold: {
    bar:  'linear-gradient(90deg, #c9a84c, #d4943a)',
    icon: 'rgba(201,168,76,0.12)',
  },
  amber: {
    bar:  'linear-gradient(90deg, #d4943a, #e8b860)',
    icon: 'rgba(212,148,58,0.10)',
  },
}

export default function StatCard({
  value,
  label,
  icon,
  delta,
  deltaUp,
  accent = 'terracota',
  className = '',
}: StatCardProps) {
  const { bar, icon: iconBg } = accentStyles[accent]

  const deltaColor =
    deltaUp === undefined
      ? 'text-soul-ink/40'
      : deltaUp
      ? 'text-soul-sage'
      : 'text-soul-rose'

  return (
    <div
      className={`relative bg-white rounded-3xl border border-soul-mist/60 p-5 overflow-hidden
                  transition-all duration-200 hover:-translate-y-0.5 hover:shadow-soul-md ${className}`}
    >
      {/* Accent bar top */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 rounded-t-3xl"
        style={{ background: bar }}
      />

      {/* Icon */}
      {icon && (
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-3"
          style={{ background: iconBg }}
        >
          {icon}
        </div>
      )}

      {/* Value */}
      <div className="font-serif font-light text-4xl leading-none text-soul-ink mb-1">
        {value}
      </div>

      {/* Label */}
      <div className="text-xs text-soul-ink/45 font-sans">{label}</div>

      {/* Delta */}
      {delta && (
        <div className={`mt-2 text-xs font-medium font-sans flex items-center gap-1 ${deltaColor}`}>
          {delta}
        </div>
      )}
    </div>
  )
}
