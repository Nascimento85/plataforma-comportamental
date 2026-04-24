'use client'

import { useEffect, useRef, useState } from 'react'

type Variant = 'terracota' | 'sage' | 'indigo' | 'gold' | 'amber'

interface ProgressBarProps {
  value: number           // 0–100
  max?: number
  variant?: Variant
  size?: 'xs' | 'sm' | 'md'
  animate?: boolean
  showLabel?: boolean
  label?: string
  className?: string
}

const variantGradients: Record<Variant, string> = {
  terracota: 'linear-gradient(90deg, #c4633a, #d4943a)',
  sage:      'linear-gradient(90deg, #7a9e7e, #96bf9a)',
  indigo:    'linear-gradient(90deg, #3d4f7c, #6b7fb8)',
  gold:      'linear-gradient(90deg, #c9a84c, #d4943a)',
  amber:     'linear-gradient(90deg, #d4943a, #e8b860)',
}

const sizeClasses = {
  xs: 'h-1',
  sm: 'h-1.5',
  md: 'h-2',
}

export default function ProgressBar({
  value,
  max = 100,
  variant = 'terracota',
  size = 'sm',
  animate = true,
  showLabel = false,
  label,
  className = '',
}: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))
  const [displayed, setDisplayed] = useState(animate ? 0 : pct)
  const mounted = useRef(false)

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      if (animate) {
        const t = setTimeout(() => setDisplayed(pct), 80)
        return () => clearTimeout(t)
      }
    } else {
      setDisplayed(pct)
    }
  }, [pct, animate])

  return (
    <div className={className}>
      {(showLabel || label) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && <span className="text-xs text-soul-ink/50">{label}</span>}
          {showLabel && (
            <span className="text-xs font-medium text-soul-terracota ml-auto">
              {Math.round(pct)}%
            </span>
          )}
        </div>
      )}
      <div className={`rounded-full bg-soul-mist overflow-hidden ${sizeClasses[size]}`}>
        <div
          className="h-full rounded-full"
          style={{
            width: `${displayed}%`,
            background: variantGradients[variant],
            transition: animate ? 'width 1s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
          }}
        />
      </div>
    </div>
  )
}
