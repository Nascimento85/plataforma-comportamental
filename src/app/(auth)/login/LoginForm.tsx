'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

/**
 * Aceita apenas caminhos relativos seguros como callbackUrl
 * (evita open redirect — nada que comece com //, http:, etc).
 */
function safeCallback(raw: string | null): string {
  if (!raw) return '/dashboard'
  if (!raw.startsWith('/')) return '/dashboard'
  if (raw.startsWith('//')) return '/dashboard'
  return raw
}

export default function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = safeCallback(searchParams.get('callbackUrl'))
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
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

      router.push(callbackUrl)
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
          className="w-full px-4 py-3.5 rounded-xl text-sm font-sans outline-none transition-all"
          style={{
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.12)',
            color: 'white',
          }}
          onFocus={e => { e.target.style.borderColor = 'rgba(201,168,76,0.55)'; e.target.style.background = 'rgba(255,255,255,0.1)'; e.target.style.boxShadow = '0 0 0 3px rgba(201,168,76,0.12)' }}
          onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.12)'; e.target.style.background = 'rgba(255,255,255,0.08)'; e.target.style.boxShadow = 'none' }}
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="password" className="block text-xs font-sans font-semibold uppercase tracking-widest"
                 style={{ color: 'rgba(255,255,255,0.4)' }}>
            Senha
          </label>
          <Link href="/forgot-password"
                className="text-[13px] font-sans transition-colors hover:opacity-80"
                style={{ color: 'rgba(201,168,76,0.7)' }}>
            Esqueci minha senha
          </Link>
        </div>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-4 py-3.5 pr-12 rounded-xl text-sm font-sans outline-none transition-all"
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: 'white',
            }}
            onFocus={e => { e.target.style.borderColor = 'rgba(201,168,76,0.55)'; e.target.style.background = 'rgba(255,255,255,0.1)'; e.target.style.boxShadow = '0 0 0 3px rgba(201,168,76,0.12)' }}
            onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.12)'; e.target.style.background = 'rgba(255,255,255,0.08)'; e.target.style.boxShadow = 'none' }}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg transition-opacity hover:opacity-80"
            style={{ color: 'rgba(255,255,255,0.45)' }}
            tabIndex={-1}
          >
            {showPassword ? (
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 rounded-xl text-[15px] font-sans font-bold mt-2 flex items-center justify-center gap-2
                   transition-all hover:-translate-y-px disabled:opacity-60 disabled:translate-y-0"
        style={{
          color: '#14100a',
          background: loading
            ? 'rgba(201,168,76,0.6)'
            : 'linear-gradient(135deg, #e8c97a, #c9a84c 55%, #a8873a)',
          boxShadow: '0 8px 24px rgba(201,168,76,0.3)',
        }}
      >
        {loading ? 'Entrando…' : (
          <>
            Entrar na plataforma
            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 10h12m0 0-4-4m4 4-4 4" />
            </svg>
          </>
        )}
      </button>
    </form>
  )
}
