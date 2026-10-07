'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ESPRESSO, TERRACOTA, LINHO, PAPEL, TRACO, TINTA, TINTA_FRACA } from '../../tokens'

const serif = 'var(--font-newsreader), Georgia, serif'
const sans  = 'var(--font-albert), "Segoe UI", system-ui, sans-serif'

export default function ResetPasswordPage() {
  const params = useParams()
  const router = useRouter()
  const token = params.token as string

  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (password.length < 8) {
      setError('A senha deve ter ao menos 8 caracteres.')
      return
    }
    if (password !== confirm) {
      setError('As senhas não coincidem.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error ?? 'Erro ao redefinir senha.')
        return
      }

      setSuccess(true)
      setTimeout(() => router.push('/login'), 3000)
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
            Nova senha
          </h1>
          <p className="mt-1.5" style={{ fontSize: 15, color: TINTA_FRACA }}>
            Escolha uma senha segura para sua conta
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
          {success ? (
            <div className="text-center">
              <div className="text-5xl mb-4">✅</div>
              <h2 style={{ fontFamily: serif, fontWeight: 500, fontSize: 22, color: ESPRESSO, marginBottom: 10 }}>
                Senha redefinida!
              </h2>
              <p className="mb-6 leading-relaxed" style={{ fontSize: 15, color: TINTA }}>
                Sua senha foi atualizada com sucesso. Você será redirecionado para o login em instantes.
              </p>
              <Link href="/login" className="transition-colors hover:opacity-80" style={{ fontSize: 15 }}>
                Ir para o login agora →
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <div className="auth-erro">{error}</div>}

              <div>
                <label htmlFor="password">Nova senha</label>
                <input
                  id="password" type="password" required value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mínimo 8 caracteres"
                  autoComplete="new-password"
                />
              </div>

              <div>
                <label htmlFor="confirm">Confirmar nova senha</label>
                <input
                  id="confirm" type="password" required value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="Repita a nova senha"
                  autoComplete="new-password"
                />
              </div>

              <button type="submit" disabled={loading} style={{ marginTop: 8 }}>
                {loading ? 'Salvando…' : 'Redefinir senha'}
              </button>

              <p className="text-center" style={{ fontSize: 15 }}>
                <Link href="/login" className="transition-colors hover:opacity-80">
                  ← Voltar para o login
                </Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </main>
  )
}
