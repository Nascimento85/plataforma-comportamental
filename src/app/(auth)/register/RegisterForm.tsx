'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ESPRESSO, PAPEL, TRACO, TINTA_FRACA, PLACEHOLDER } from '../tokens'

type AccountType = 'PJ' | 'PF'

// Campos e rótulos herdam o estilo de `.auth-campo`, definido no AuthShell.
// Nada de cor inline aqui: sobre o papel claro, tom herdado do tema escuro
// antigo vira texto invisível.

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
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base"
              style={{ color: PLACEHOLDER }}>{prefix}</span>
      )}
      <input
        id={id} type={type} required={required} value={value} onChange={onChange}
        placeholder={placeholder}
        style={prefix ? { paddingLeft: 30 } : undefined}
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
  const [trialCtx, setTrialCtx] = useState<{ ref: string | null; lead: string | null; src: string | null }>({ ref: null, lead: null, src: null })

  // Lê parâmetros da degustação (?ref=trial&lead=&nome=&src=) sem useSearchParams
  useEffect(() => {
    if (typeof window === 'undefined') return
    const sp = new URLSearchParams(window.location.search)
    const nome = sp.get('nome')
    if (nome) setForm((prev) => ({ ...prev, name: prev.name || nome }))
    setTrialCtx({ ref: sp.get('ref'), lead: sp.get('lead'), src: sp.get('src') })
  }, [])

  const isTrial = trialCtx.ref === 'trial'

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
          ref: isTrial ? 'trial' : undefined,
          trialLeadId: isTrial ? (trialCtx.lead ?? undefined) : undefined,
          src: isTrial ? (trialCtx.src ?? undefined) : undefined,
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
      {isTrial && (
        <div className="rounded-xl px-4 py-3 text-[15px] text-center"
             style={{ background: 'rgba(179,102,63,0.10)', border: '1px solid rgba(179,102,63,0.32)', color: ESPRESSO }}>
          🎁 Ao finalizar, você ganha <strong>7 dias de acesso premium</strong> — sem cartão.
        </div>
      )}
      {error && <div className="auth-erro">{error}</div>}

      {/* Toggle PF / PJ */}
      <div className="flex rounded-xl overflow-hidden" style={{ border: `1.5px solid ${TRACO}` }}>
        {(['PJ', 'PF'] as AccountType[]).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setAccountType(t)}
            className="flex-1 py-3 text-[15px] font-semibold transition-all"
            style={accountType === t
              ? { background: ESPRESSO, color: PAPEL, border: 'none', cursor: 'pointer' }
              : { background: 'transparent', color: TINTA_FRACA, border: 'none', cursor: 'pointer' }}
          >
            {t === 'PJ' ? '🏢 Empresa (PJ)' : '👤 Autônomo (PF)'}
          </button>
        ))}
      </div>

      {/* Nome */}
      <div>
        <label htmlFor="name">
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
        <label htmlFor="email">
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
        <label htmlFor="phone">
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
        <label htmlFor="instagram">
          Instagram <span style={{ color: PLACEHOLDER, fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(opcional)</span>
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
          <label htmlFor="birthDate">
            Data de nascimento <span style={{ color: PLACEHOLDER, fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(opcional)</span>
          </label>
          <input
            id="birthDate" type="date" value={form.birthDate}
            onChange={(e) => update('birthDate', e.target.value)}
          />
        </div>
      )}

      {/* Senha */}
      <div>
        <label htmlFor="password">
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
        <label htmlFor="confirmPassword">
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
        className="flex items-center justify-center gap-2"
        style={{ marginTop: 8 }}
      >
        {loading ? 'Criando conta…' : (
          <>
            Criar conta grátis
            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 10h12m0 0-4-4m4 4-4 4" />
            </svg>
          </>
        )}
      </button>
    </form>
  )
}
