import { HTMLAttributes } from 'react'
import { getAvatarPalette } from './tokens'

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  name: string           // usado para inicial e seed de cor
  size?: Size
  palette?: string       // CSS gradient/color override
  paletteIndex?: number  // índice para auto-selecionar da paleta
}

const sizeClasses: Record<Size, { div: string; text: string }> = {
  xs: { div: 'w-6 h-6',   text: 'text-[10px]' },
  sm: { div: 'w-8 h-8',   text: 'text-xs' },
  md: { div: 'w-10 h-10', text: 'text-sm' },
  lg: { div: 'w-12 h-12', text: 'text-base' },
  xl: { div: 'w-16 h-16', text: 'text-xl' },
}

function getInitial(name: string): string {
  return name.trim().charAt(0).toUpperCase()
}

/** Derivar índice de paleta do nome (determinístico) */
function nameToIndex(name: string): number {
  return name
    .split('')
    .reduce((acc, ch) => acc + ch.charCodeAt(0), 0)
}

export default function Avatar({
  name,
  size = 'md',
  palette,
  paletteIndex,
  className = '',
  style,
  ...rest
}: AvatarProps) {
  const index = paletteIndex ?? nameToIndex(name)
  const bg = palette ?? getAvatarPalette(index)
  const { div: divSize, text: textSize } = sizeClasses[size]

  return (
    <div
      className={`rounded-full flex items-center justify-center flex-shrink-0 font-serif font-medium text-white ${divSize} ${textSize} ${className}`}
      style={{ background: bg, ...style }}
      aria-label={name}
      {...rest}
    >
      {getInitial(name)}
    </div>
  )
}
