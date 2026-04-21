'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type AccountType = 'PJ' | 'PF'

export default function RegisterForm() {
  const router = useRouter()
  const [accountType, setAccountType] = useState<AccountType>('PJ')
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    instagram: '',
    birthDate: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (form.password !== form.confirmPassword) {
      setError('As senhas não coincidem.')
      return
    }
    if (form.password.length < 8) {
      setError('A senha deve ter ao menos 8 caracteres.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          type: accountType,
          phone: form.phone || undefined,
          instagram: form.instagram || undefined,
          birthDate: accountType === 'PF' && form.birthDate ? form.birthDate : undefined,
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? 'Erro ao criar conta.')
        return
      }

      router.push('/login?registered=1')
    } catch {
      setError('Erro ao conectar. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
          {error}
        </div>
      )}

      {/* Toggle PF / PJ */}
      <div className="flex rounded-lg border border-gray-200 overflow-hidden">
        <button
          type="button"
          onClick={() => setAccountType('PJ')}
          className={`flex-1 py-2 text-sm font-medium transition-colors ${
            accountType === 'PJ'
              ? 'bg-brand-600 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          🏢 Empresa (PJ)
        </button>
        <button
          type="button"
          onClick={() => setAccountType('PF')}
          className={`flex-1 py-2 text-sm font-medium transition-colors ${
            accountType === 'PF'
              ? 'bg-brand-600 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          👤 Autônomo (PF)
        </button>
      </div>

      {/* Nome */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          {accountType === 'PJ' ? 'Nome da empresa' : 'Nome completo'}
        </label>
        <input
          id="name"
          type="text"
          required
          value={form.name}
          onChange={(e) => update('name', e.target.value)}
          className="input"
          placeholder={accountType === 'PJ' ? 'Acme Ltda' : 'João da Silva'}
        />
      </div>

      {/* E-mail */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          E-mail
        </label>
        <input
          id="email"
          type="email"
          required
          value={form.email}
          onChange={(e) => update('email', e.target.value)}
          className="input"
          placeholder={accountType === 'PJ' ? 'contato@empresa.com' : 'seuemail@gmail.com'}
        />
      </div>

      {/* Telefone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          Telefone / WhatsApp
        </label>
        <input
          id="phone"
          type="tel"
          required
          value={form.phone}
          onChange={(e) => update('phone', e.target.value)}
          className="input"
          placeholder="(11) 99999-9999"
        />
      </div>

      {/* Instagram */}
      <div>
        <label htmlFor="instagram" className="block text-sm font-medium text-gray-700 mb-1">
          Instagram <span className="text-gray-400 font-normal">(opcional)</span>
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">@</span>
          <input
            id="instagram"
            type="text"
            value={form.instagram}
            onChange={(e) => update('instagram', e.target.value)}
            className="input pl-7"
            placeholder="seuperfil"
          />
        </div>
      </div>

      {/* Data de nascimento — só para PF */}
      {accountType === 'PF' && (
        <div>
          <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-1">
            Data de nascimento <span className="text-gray-400 font-normal">(opcional)</span>
          </label>
          <input
            id="birthDate"
            type="date"
            value={form.birthDate}
            onChange={(e) => update('birthDate', e.target.value)}
            className="input"
          />
        </div>
      )}

      {/* Senha */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Senha
        </label>
        <input
          id="password"
          type="password"
          required
          minLength={8}
          value={form.password}
          onChange={(e) => update('password', e.target.value)}
          className="input"
          placeholder="Mínimo 8 caracteres"
        />
      </div>

      {/* Confirmar senha */}
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
          Confirmar senha
        </label>
        <input
          id="confirmPassword"
          type="password"
          required
          minLength={8}
          value={form.confirmPassword}
          onChange={(e) => update('confirmPassword', e.target.value)}
          className="input"
          placeholder="Repita a senha"
        />
      </div>

      <button type="submit" disabled={loading} className="btn-primary w-full mt-2">
        {loading ? 'Criando conta...' : 'Criar conta'}
      </button>
    </form>
  )
}
