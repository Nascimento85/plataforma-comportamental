'use client'

import { useState } from 'react'

interface Props {
  /** Para onde redirecionar após o login */
  callbackUrl: string
  className?: string
  children?: React.ReactNode
}

export default function LogoutAndLoginButton({
  callbackUrl,
  className,
  children = 'Sair e entrar em outra conta',
}: Props) {
  const [loading, setLoading] = useState(false)

  async function handleClick() {
    setLoading(true)
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
    } catch {
      // ignora — vamos redirecionar mesmo assim
    }
    window.location.href = `/login?callbackUrl=${encodeURIComponent(callbackUrl)}`
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={
        className ??
        'inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-semibold border border-soul-ink/15 text-soul-ink/80 hover:bg-soul-ink/5 transition-colors disabled:opacity-60'
      }
    >
      {loading ? 'Saindo…' : children}
    </button>
  )
}
