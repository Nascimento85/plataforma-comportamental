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
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-50 to-gray-100 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-600 text-white text-2xl font-bold mb-4">
            PC
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Recuperar senha</h1>
          <p className="text-gray-500 mt-1 text-sm">Digite seu e-mail para receber o link de redefinição</p>
        </div>

        <div className="card p-8">
          {sent ? (
            <div className="text-center">
              <div className="text-5xl mb-4">📧</div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">E-mail enviado!</h2>
              <p className="text-sm text-gray-500 mb-6">
                Se esse e-mail estiver cadastrado, você receberá um link para redefinir sua senha em instantes.
                Verifique também a caixa de spam.
              </p>
              <Link href="/login" className="text-brand-600 font-medium hover:underline text-sm">
                ← Voltar para o login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  E-mail cadastrado
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input"
                  placeholder="seuemail@empresa.com"
                />
              </div>

              <button type="submit" disabled={loading} className="btn-primary w-full">
                {loading ? 'Enviando...' : 'Enviar link de recuperação'}
              </button>

              <p className="text-center text-sm text-gray-500">
                Lembrou a senha?{' '}
                <Link href="/login" className="text-brand-600 font-medium hover:underline">
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
