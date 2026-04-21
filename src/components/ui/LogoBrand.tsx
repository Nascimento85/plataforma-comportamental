'use client'

/**
 * LogoBrand — exibe o logo da empresa.
 *
 * Prioridade de fonte:
 * 1. NEXT_PUBLIC_LOGO_URL  → URL externa (Locaweb, CDN, etc.)
 * 2. /logo.png             → arquivo em public/ do projeto
 * 3. Badge "PC"            → fallback texto quando nenhuma imagem carrega
 *
 * Para ativar com URL externa, adicione ao .env.local:
 *   NEXT_PUBLIC_LOGO_URL=https://seudominio.com.br/logo.png
 */

// URL vinda da variável de ambiente (definida em build time pelo Next.js)
const LOGO_URL = process.env.NEXT_PUBLIC_LOGO_URL ?? '/logo.png'

export default function LogoBrand({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const heights: Record<string, string>    = { sm: 'h-7', md: 'h-9', lg: 'h-12' }
  const textSizes: Record<string, string>  = { sm: 'text-xs', md: 'text-sm', lg: 'text-base' }
  const badgeSizes: Record<string, string> = { sm: 'w-7 h-7 text-xs', md: 'w-8 h-8 text-sm', lg: 'w-10 h-10 text-base' }

  return (
    <div className="flex items-center gap-2">
      {/* Tenta mostrar logo; se falhar, mostra o badge padrão */}
      <img
        src={LOGO_URL}
        alt="Logo"
        className={`${heights[size]} w-auto object-contain`}
        onError={(e) => {
          const target = e.currentTarget
          target.style.display = 'none'
          const fallback = target.nextElementSibling as HTMLElement | null
          if (fallback) fallback.style.display = 'flex'
        }}
      />
      {/* Fallback — visível quando nenhuma imagem carrega */}
      <div
        className={`${badgeSizes[size]} rounded-lg bg-brand-600 items-center justify-center text-white font-bold hidden`}
        aria-hidden="true"
      >
        PC
      </div>
      <span className={`font-semibold text-gray-900 ${textSizes[size]}`}>
        Plataforma Comportamental
      </span>
    </div>
  )
}
