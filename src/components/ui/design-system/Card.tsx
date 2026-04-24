import { HTMLAttributes, ReactNode } from 'react'

type Variant = 'default' | 'dark' | 'parchment' | 'ghost'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: Variant
  padding?: 'sm' | 'md' | 'lg' | 'none'
  accentColor?: string   // CSS color string for top accent bar
  hover?: boolean
}

const variantClasses: Record<Variant, string> = {
  default:   'bg-white border border-soul-mist/60 shadow-soul',
  dark:      'bg-soul-hero border-transparent',
  parchment: 'bg-soul-parchment border border-soul-mist/60',
  ghost:     'bg-transparent border border-soul-mist',
}

const paddingClasses = {
  none: '',
  sm:   'p-4',
  md:   'p-6',
  lg:   'p-8',
}

export default function Card({
  variant = 'default',
  padding = 'md',
  accentColor,
  hover = false,
  className = '',
  children,
  style,
  ...rest
}: CardProps) {
  const hoverClass = hover
    ? 'transition-all duration-200 hover:-translate-y-0.5 hover:shadow-soul-md cursor-pointer'
    : ''

  return (
    <div
      className={`rounded-3xl overflow-hidden relative ${variantClasses[variant]} ${paddingClasses[padding]} ${hoverClass} ${className}`}
      style={style}
      {...rest}
    >
      {accentColor && (
        <div
          className="absolute top-0 left-0 right-0 h-0.5 rounded-t-3xl"
          style={{ background: accentColor }}
        />
      )}
      {children}
    </div>
  )
}

/** Cabeçalho padronizado de seção dentro de um Card */
export function SectionHeader({
  icon,
  title,
  action,
  className = '',
}: {
  icon?: ReactNode
  title: string
  action?: ReactNode
  className?: string
}) {
  return (
    <div className={`flex items-center justify-between mb-5 ${className}`}>
      <h2 className="font-serif font-light text-xl text-soul-ink flex items-center gap-2.5">
        {icon && (
          <span className="w-7 h-7 rounded-lg bg-soul-terracota/10 flex items-center justify-center text-sm flex-shrink-0">
            {icon}
          </span>
        )}
        {title}
      </h2>
      {action && (
        <span className="text-xs text-soul-terracota flex items-center gap-1">
          {action}
        </span>
      )}
    </div>
  )
}
