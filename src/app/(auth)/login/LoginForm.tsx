'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error ?? 'E-mail ou senha incorretos.')
        return
      }

      router.push('/dashboard')
      router.refresh()
    } catch {
      setError('Erro ao conectar. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div
          className="rounded-xl px-4 py-3 text-sm font-sans"
          style={{ background: 'rgba(196,122,114,0.15)', border: '1px solid rgba(196,122,114,0.3)', color: '#e09080' }}
        >
          {error}
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-xs font-sans font-semibold uppercase tracking-widest mb-2"
               style={{ color: 'rgba(255,255,255,0.4)' }}>
          E-mail
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="empresa@email.com"
          className="w-full px-4 py-3 rounded-xl text-sm font-sans outline-none transition-all"
          style={{
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.12)',
            color: 'white',
          }}
          onFocus={e => { e.target.style.borderColor = 'rgba(201,168,76,0.5)'; e.target.style.background = 'rgba(255,255,255,0.1)' }}
          onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.12)'; e.target.style.background = 'rgba(255,255,255,0.08)' }}
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="password" className="block text-xs font-sans font-semibold uppercase tracking-widest"
                 style={{ color: 'rgba(255,255,255,0.4)' }}>
            Senha
          </label>
          <Link href="/forgot-password"
                className="text-[11px] font-sans transition-colors hover:opacity-80"
                style={{ color: 'rgba(201,168,76,0.7)' }}>
            Esqueci minha senha
          </Link>
        </div>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="w-full px-4 py-3 rounded-xl text-sm font-sans outline-none transition-all"
          style={{
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.12)',
            color: 'white',
          }}
          onFocus={e => { e.target.style.borderColor = 'rgba(201,168,76,0.5)'; e.target.style.background = 'rgba(255,255,255,0.1)' }}
          onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.12)'; e.target.style.background = 'rgba(255,255,255,0.08)' }}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-full text-sm font-sans font-medium text-soul-ink mt-2
                   transition-all hover:-translate-y-px disabled:opacity-60 disabled:translate-y-0"
        style={{
          background: loading
            ? 'rgba(201,168,76,0.6)'
            : 'linear-gradient(135deg, #c9a84c, #d4943a)',
          boxShadow: '0 4px 16px rgba(201,168,76,0.22)',
        }}
      >
        {loading ? 'Entrando…' : 'Entrar na plataforma'}
      </button>
    </form>
  )
}
