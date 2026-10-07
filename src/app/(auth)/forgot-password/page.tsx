'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ESPRESSO, TERRACOTA, LINHO, PAPEL, TRACO, TINTA, TINTA_FRACA } from '../tokens'

const serif = 'var(--font-newsreader), Georgia, serif'
const sans  = 'var(--font-albert), "Segoe UI", system-ui, sans-serif'

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
      className="min-h-screen flex items-center justify-center px-4 py-10"
      style={{ background: LINHO, fontFamily: sans }}
    >
      <div className="w-full max-w-md">

        {/* Marca */}
        <div className="text-center mb-7">
          <span
            aria-hidden="true"
            className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4"
            style={{ border: `1px solid ${TERRACOTA}`, color: TERRACOTA, fontFamily: serif, fontSize: 22 }}
          >
            Ψ
          </span>
          <h1 style={{ fontFamily: serif, fontWeight: 500, fontSize: 28, color: ESPRESSO, lineHeight: 1.2 }}>
            Recuperar senha
          </h1>
          <p className="mt-1.5" style={{ fontSize: 15, color: TINTA_FRACA }}>
            Digite seu e-mail para receber o link de redefinição
          </p>
        </div>

        {/* Cartão */}
        <div
          className="auth-campo rounded-2xl"
          style={{
            background: PAPEL, border: `1px solid ${TRACO}`, padding: '30px 28px',
            boxShadow: '0 1px 1px rgba(27,20,16,.03), 0 16px 40px -26px rgba(27,20,16,.32)',
          }}
        >
          {sent ? (
            <div className="text-center">
              <div className="text-5xl mb-4">📧</div>
              <h2 style={{ fontFamily: serif, fontWeight: 500, fontSize: 22, color: ESPRESSO, marginBottom: 10 }}>
                E-mail enviado!
              </h2>
              <p className="mb-6 leading-relaxed" style={{ fontSize: 15, color: TINTA }}>
                Se esse e-mail estiver cadastrado, você receberá um link para redefinir sua senha em instantes.
                Verifique também a caixa de spam.
              </p>
              <Link href="/login" className="transition-colors hover:opacity-80" style={{ fontSize: 15 }}>
                ← Voltar para o login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <div className="auth-erro">{error}</div>}

              <div>
                <label htmlFor="email">E-mail cadastrado</label>
                <input
                  id="email" type="email" autoComplete="email" required value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seuemail@empresa.com"
                />
              </div>

              <button type="submit" disabled={loading} style={{ marginTop: 8 }}>
                {loading ? 'Enviando…' : 'Enviar link de recuperação'}
              </button>

              <p className="text-center" style={{ fontSize: 15, color: TINTA }}>
                Lembrou a senha?{' '}
                <Link href="/login" className="transition-colors hover:opacity-80">Entrar</Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </main>
  )
}
