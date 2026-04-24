'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error ?? 'Erro ao enviar e-mail.')
        return
      }

      setSent(true)
    } catch {
      setError('Erro ao conectar. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #1c1a17 0%, #2d2417 55%, #3d2a1c 100%)' }}
    >
      {/* Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
           style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 65%)', transform: 'translate(25%, -30%)' }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
           style={{ background: 'radial-gradient(circle, rgba(196,99,58,0.10) 0%, transparent 65%)', transform: 'translate(-30%, 30%)' }} />

      <div className="w-full max-w-sm relative z-10">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4"
               style={{ background: 'linear-gradient(135deg, #c9a84c, #d4943a)' }}>
            <svg viewBox="0 0 90 90" fill="none" className="w-8 h-8">
              <path d="M45 13L48.5 39.5L72 26L55.5 45L72 64L48.5 50.5L45 77L41.5 50.5L18 64L34.5 45L18 26L41.5 39.5Z"
                fill="rgba(255,255,255,0.3)" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
              <circle cx="45" cy="45" r="4" fill="white" opacity="0.9"/>
            </svg>
          </div>
          <h1 className="font-serif font-light text-2xl text-white mb-1">Recuperar senha</h1>
          <p className="text-[12px] font-sans" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Digite seu e-mail para receber o link de redefinição
          </p>
        </div>

        {/* Card */}
        <div className="rounded-3xl p-7"
             style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)' }}>
          {sent ? (
            <div className="text-center">
              <div className="text-5xl mb-4">📧</div>
              <h2 className="font-serif font-light text-xl text-white mb-2">E-mail enviado!</h2>
              <p className="text-sm font-sans mb-6 leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Se esse e-mail estiver cadastrado, você receberá um link para redefinir sua senha em instantes.
                Verifique também a caixa de spam.
              </p>
              <Link href="/login" className="text-sm font-sans font-medium transition-colors hover:opacity-80"
                    style={{ color: '#c9a84c' }}>
                ← Voltar para o login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="rounded-xl px-4 py-3 text-sm font-sans"
                     style={{ background: 'rgba(196,122,114,0.15)', border: '1px solid rgba(196,122,114,0.3)', color: '#e09080' }}>
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-xs font-sans font-semibold uppercase tracking-widest mb-2"
                       style={{ color: 'rgba(255,255,255,0.4)' }}>
                  E-mail cadastrado
                </label>
                <input
                  id="email" type="email" required value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seuemail@empresa.com"
                  className="w-full px-4 py-3 rounded-xl text-sm font-sans outline-none transition-all"
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', color: 'white' }}
                  onFocus={e => { e.target.style.borderColor = 'rgba(201,168,76,0.5)'; e.target.style.background = 'rgba(255,255,255,0.1)' }}
                  onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.12)'; e.target.style.background = 'rgba(255,255,255,0.08)' }}
                />
              </div>

              <button
                type="submit" disabled={loading}
                className="w-full py-3 rounded-full text-sm font-sans font-medium text-soul-ink
                           transition-all hover:-translate-y-px disabled:opacity-60 disabled:translate-y-0"
                style={{
                  background: loading ? 'rgba(201,168,76,0.6)' : 'linear-gradient(135deg, #c9a84c, #d4943a)',
                  boxShadow: '0 4px 16px rgba(201,168,76,0.22)',
                }}
              >
                {loading ? 'Enviando…' : 'Enviar link de recuperação'}
              </button>

              <p className="text-center text-xs font-sans" style={{ color: 'rgba(255,255,255,0.35)' }}>
                Lembrou a senha?{' '}
                <Link href="/login" className="font-medium transition-colors hover:opacity-80"
                      style={{ color: '#c9a84c' }}>
                  Entrar
                </Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </main>
  )
}
