'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type AccountType = 'PJ' | 'PF'

const inputStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.08)',
  border: '1px solid rgba(255,255,255,0.12)',
  color: 'white',
}
const inputFocusStyle: React.CSSProperties = {
  borderColor: 'rgba(201,168,76,0.5)',
  background: 'rgba(255,255,255,0.1)',
}
const inputBlurStyle: React.CSSProperties = {
  borderColor: 'rgba(255,255,255,0.12)',
  background: 'rgba(255,255,255,0.08)',
}
const labelStyle: React.CSSProperties = {
  color: 'rgba(255,255,255,0.4)',
}

function SoulInput({
  id, type = 'text', required, value, onChange, placeholder, prefix,
}: {
  id: string; type?: string; required?: boolean; value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string; prefix?: string
}) {
  return (
    <div className="relative">
      {prefix && (
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-sans"
              style={{ color: 'rgba(255,255,255,0.3)' }}>{prefix}</span>
      )}
      <input
        id={id} type={type} required={required} value={value} onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl text-sm font-sans outline-none transition-all"
        style={{ ...inputStyle, ...(prefix ? { paddingLeft: '2rem' } : {}) }}
        onFocus={e => Object.assign(e.target.style, inputFocusStyle)}
        onBlur={e => Object.assign(e.target.style, inputBlurStyle)}
      />
    </div>
  )
}

export default function RegisterForm() {
  const router = useRouter()
  const [accountType, setAccountType] = useState<AccountType>('PJ')
  const [form, setForm] = useState({
    name: '', email: '', phone: '', instagram: '', birthDate: '', password: '', confirmPassword: '',
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
        <div className="rounded-xl px-4 py-3 text-sm font-sans"
             style={{ background: 'rgba(196,122,114,0.15)', border: '1px solid rgba(196,122,114,0.3)', color: '#e09080' }}>
          {error}
        </div>
      )}

      {/* Toggle PF / PJ */}
      <div className="flex rounded-xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.12)' }}>
        {(['PJ', 'PF'] as AccountType[]).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setAccountType(t)}
            className="flex-1 py-2.5 text-sm font-medium font-sans transition-all"
            style={accountType === t ? {
              background: 'linear-gradient(135deg, #c9a84c, #d4943a)',
              color: '#1c1a17',
            } : {
              background: 'transparent',
              color: 'rgba(255,255,255,0.45)',
            }}
          >
            {t === 'PJ' ? '🏢 Empresa (PJ)' : '👤 Autônomo (PF)'}
          </button>
        ))}
      </div>

      {/* Nome */}
      <div>
        <label htmlFor="name" className="block text-xs font-sans font-semibold uppercase tracking-widest mb-2"
               style={labelStyle}>
          {accountType === 'PJ' ? 'Nome da empresa' : 'Nome completo'}
        </label>
        <SoulInput
          id="name" required value={form.name}
          onChange={(e) => update('name', e.target.value)}
          placeholder={accountType === 'PJ' ? 'Acme Ltda' : 'João da Silva'}
        />
      </div>

      {/* E-mail */}
      <div>
        <label htmlFor="email" className="block text-xs font-sans font-semibold uppercase tracking-widest mb-2"
               style={labelStyle}>
          E-mail
        </label>
        <SoulInput
          id="email" type="email" required value={form.email}
          onChange={(e) => update('email', e.target.value)}
          placeholder={accountType === 'PJ' ? 'contato@empresa.com' : 'seuemail@gmail.com'}
        />
      </div>

      {/* Telefone */}
      <div>
        <label htmlFor="phone" className="block text-xs font-sans font-semibold uppercase tracking-widest mb-2"
               style={labelStyle}>
          Telefone / WhatsApp
        </label>
        <SoulInput
          id="phone" type="tel" required value={form.phone}
          onChange={(e) => update('phone', e.target.value)}
          placeholder="(11) 99999-9999"
        />
      </div>

      {/* Instagram */}
      <div>
        <label htmlFor="instagram" className="block text-xs font-sans font-semibold uppercase tracking-widest mb-2"
               style={labelStyle}>
          Instagram <span style={{ color: 'rgba(255,255,255,0.2)', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(opcional)</span>
        </label>
        <SoulInput
          id="instagram" value={form.instagram}
          onChange={(e) => update('instagram', e.target.value)}
          placeholder="seuperfil"
          prefix="@"
        />
      </div>

      {/* Data de nascimento — só para PF */}
      {accountType === 'PF' && (
        <div>
          <label htmlFor="birthDate" className="block text-xs font-sans font-semibold uppercase tracking-widest mb-2"
                 style={labelStyle}>
            Data de nascimento <span style={{ color: 'rgba(255,255,255,0.2)', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(opcional)</span>
          </label>
          <input
            id="birthDate" type="date" value={form.birthDate}
            onChange={(e) => update('birthDate', e.target.value)}
            className="w-full px-4 py-3 rounded-xl text-sm font-sans outline-none transition-all"
            style={inputStyle}
            onFocus={e => Object.assign(e.target.style, inputFocusStyle)}
            onBlur={e => Object.assign(e.target.style, inputBlurStyle)}
          />
        </div>
      )}

      {/* Senha */}
      <div>
        <label htmlFor="password" className="block text-xs font-sans font-semibold uppercase tracking-widest mb-2"
               style={labelStyle}>
          Senha
        </label>
        <SoulInput
          id="password" type="password" required value={form.password}
          onChange={(e) => update('password', e.target.value)}
          placeholder="Mínimo 8 caracteres"
        />
      </div>

      {/* Confirmar senha */}
      <div>
        <label htmlFor="confirmPassword" className="block text-xs font-sans font-semibold uppercase tracking-widest mb-2"
               style={labelStyle}>
          Confirmar senha
        </label>
        <SoulInput
          id="confirmPassword" type="password" required value={form.confirmPassword}
          onChange={(e) => update('confirmPassword', e.target.value)}
          placeholder="Repita a senha"
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
        {loading ? 'Criando conta…' : 'Criar conta'}
      </button>
    </form>
  )
}
