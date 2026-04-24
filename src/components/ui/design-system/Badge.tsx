import { HTMLAttributes, ReactNode } from 'react'

type Variant = 'done' | 'pending' | 'locked' | 'new' | 'gold' | 'rose' | 'indigo'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: Variant
  leftIcon?: ReactNode
}

const variantClasses: Record<Variant, string> = {
  done:   'bg-soul-sage/[0.12] text-soul-sage',
  pending:'bg-soul-amber/[0.10] text-soul-amber',
  locked: 'bg-soul-mist/60 text-soul-ink/40',
  new:    'bg-soul-indigo/[0.10] text-soul-indigo',
  gold:   'bg-soul-gold/[0.12] text-soul-gold',
  rose:   'bg-soul-rose/[0.10] text-soul-rose',
  indigo: 'bg-soul-indigo/[0.10] text-soul-indigo',
}

export default function Badge({
  variant = 'new',
  leftIcon,
  className = '',
  children,
  ...rest
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-0.5 text-xs font-medium font-sans ${variantClasses[variant]} ${className}`}
      {...rest}
    >
      {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
      {children}
    </span>
  )
}
