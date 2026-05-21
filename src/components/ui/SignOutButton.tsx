'use client'

import { useRouter } from 'next/navigation'

export function SignOutButton() {
  const router = useRouter()

  async function handleSignOut() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
    router.refresh()
  }

  return (
    <button
      onClick={handleSignOut}
      className="flex items-center gap-2 px-3 py-2 rounded-lg text-[13px] font-medium
                 text-white/60 hover:text-white hover:bg-white/[0.06] transition-colors w-full"
      aria-label="Sair da conta"
    >
      <svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="currentColor"
           strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7.5 17H4.5A1.5 1.5 0 013 15.5V4.5A1.5 1.5 0 014.5 3H7.5" />
        <path d="M13 14L17 10L13 6" />
        <path d="M17 10H7.5" />
      </svg>
      Sair
    </button>
  )
}
