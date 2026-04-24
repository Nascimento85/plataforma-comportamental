import { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'ghost' | 'dark' | 'gold'
type Size    = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  loading?: boolean
}

const variantClasses: Record<Variant, string> = {
  primary: [
    'bg-soul-terracota text-white border-transparent',
    'hover:bg-soul-terracota-dark hover:-translate-y-px',
    'active:scale-[0.98]',
    'shadow-[0_4px_12px_rgba(196,99,58,0.22)]',
    'hover:shadow-[0_6px_18px_rgba(196,99,58,0.30)]',
  ].join(' '),

  ghost: [
    'bg-transparent text-soul-ink border border-soul-mist',
    'hover:border-soul-terracota hover:text-soul-terracota',
  ].join(' '),

  dark: [
    'bg-soul-ink text-white border-transparent',
    'hover:bg-soul-ink/90',
  ].join(' '),

  gold: [
    'text-soul-ink border-transparent',
    'hover:brightness-105 hover:-translate-y-px',
    'shadow-gold',
  ].join(' '),
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-4 py-2 text-xs gap-1.5',
  md: 'px-5 py-2.5 text-sm gap-2',
  lg: 'px-6 py-3 text-base gap-2.5',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      leftIcon,
      rightIcon,
      loading = false,
      disabled,
      className = '',
      children,
      ...rest
    },
    ref,
  ) => {
    const base = [
      'inline-flex items-center justify-center font-sans font-medium',
      'rounded-full transition-all duration-200',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
    ].join(' ')

    const goldBg =
      variant === 'gold'
        ? 'bg-gradient-to-r from-soul-gold to-soul-amber'
        : ''

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`${base} ${variantClasses[variant]} ${sizeClasses[size]} ${goldBg} ${className}`}
        {...rest}
      >
        {loading ? (
          <svg
            className="animate-spin h-4 w-4 flex-shrink-0"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              className="opacity-25"
              cx="12" cy="12" r="10"
              stroke="currentColor" strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        ) : leftIcon ? (
          <span className="flex-shrink-0">{leftIcon}</span>
        ) : null}

        {children}

        {!loading && rightIcon && (
          <span className="flex-shrink-0">{rightIcon}</span>
        )}
      </button>
    )
  },
)

Button.displayName = 'Button'
export default Button
