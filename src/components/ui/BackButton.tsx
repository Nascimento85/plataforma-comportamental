'use client'

import { useRouter, usePathname } from 'next/navigation'

/**
 * Botão "Voltar" flutuante no canto inferior direito.
 * Aparece em todas as páginas do dashboard, exceto na própria home.
 */
export default function BackButton() {
  const router = useRouter()
  const pathname = usePathname()

  // Não mostra na home do dashboard (não há pra onde voltar)
  if (pathname === '/dashboard') return null

  return (
    <button
      onClick={() => router.back()}
      aria-label="Voltar"
      title="Voltar para a página anterior"
      className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 rounded-full px-4 py-3 text-[13px] font-bold text-white transition-all hover:-translate-y-0.5 print:hidden"
      style={{ background: 'linear-gradient(135deg, #1f2a3d, #2b2b30)', boxShadow: '0 6px 20px rgba(28,26,23,0.28)' }}
    >
      <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
        <path d="M12 15L7 10L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Voltar
    </button>
  )
}
