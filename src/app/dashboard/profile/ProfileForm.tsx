'use client'

// ============================================================
// ProfileForm — formulário interativo do perfil
// ============================================================
// - Mobile-first com 2 colunas em sm+
// - Glassmorphism leve (bg-white + ring suave)
// - Cálculo dinâmico de preenchimento (sincroniza com REQUIRED_PROFILE_FIELDS)
// - Card de validação por código aparece quando perfil 100%
// ============================================================

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { calculateProfileCompletion, REQUIRED_PROFILE_FIELDS } from '@/lib/profile'

interface FormState {
  name:          string
  email:         string
  phone:         string
  whatsapp:      string
  instagram:     string
  linkedin:      string
  birthDate:     string
  addressStreet: string
  addressCity:   string
  addressState:  string
  addressZip:    string
  jobTitle:      string
  companyName:   string
}

interface Props {
  initial: FormState
  completion: number
  balance: number
  alreadyRewarded: boolean
}

// Campos obrigatórios em formato de Set para lookup rápido nos labels
const REQUIRED_SET = new Set<string>(REQUIRED_PROFILE_FIELDS as string[])

export default function ProfileForm({ initial, completion: initialCompletion, balance, alreadyRewarded }: Props) {
  const router = useRouter()

  // ── Form state ────────────────────────────────────────────
  const [form, setForm] = useState<FormState>(initial)
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState('')
  const [saveOk, setSaveOk] = useState(false)

  // ── Validation code state ─────────────────────────────────
  const [requesting, setRequesting] = useState(false)
  const [codeSent, setCodeSent] = useState(false)
  const [requestError, setRequestError] = useState('')
  const [code, setCode] = useState('')
  const [validating, setValidating] = useState(false)
  const [validateError, setValidateError] = useState('')
  const [rewarded, setRewarded] = useState(alreadyRewarded)
  const [devCode, setDevCode] = useState<string | null>(null)

  // Cálculo dinâmico
  const completion = useMemo(() => calculateProfileCompletion(form), [form])
  const isComplete = completion === 100

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
    setSaveOk(false)
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaveError('')
    setSaveOk(false)
    setSaving(true)
    try {
      const res = await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) {
        setSaveError(data.error ?? 'Erro ao salvar perfil.')
        return
      }
      setSaveOk(true)
      router.refresh() // revalida o server component (atualiza saldo/flags se mudou)
    } catch {
      setSaveError('Erro ao conectar. Tente novamente.')
    } finally {
      setSaving(false)
    }
  }

  async function handleRequestCode() {
    setRequestError('')
    setRequesting(true)
    try {
      const res = await fetch('/api/profile/request-code', { method: 'POST' })
      const data = await res.json()
      if (!res.ok) {
        setRequestError(data.error ?? 'Erro ao solicitar código.')
        return
      }
      setCodeSent(true)
      if (data.devCode) setDevCode(data.devCode) // só em dev sem Resend
    } catch {
      setRequestError('Erro ao conectar. Tente novamente.')
    } finally {
      setRequesting(false)
    }
  }

  async function handleValidateCode(e: React.FormEvent) {
    e.preventDefault()
    setValidateError('')
    if (!/^\d{6}$/.test(code)) {
      setValidateError('Digite os 6 dígitos do código.')
      return
    }
    setValidating(true)
    try {
      const res = await fetch('/api/profile/validate-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      })
      const data = await res.json()
      if (!res.ok) {
        setValidateError(data.error ?? 'Erro ao validar código.')
        return
      }
      setRewarded(true)
      router.refresh()
    } catch {
      setValidateError('Erro ao conectar. Tente novamente.')
    } finally {
      setValidating(false)
    }
  }

  // ──────────────────────────────────────────────────────────
  // Render
  // ──────────────────────────────────────────────────────────

  return (
    <>
      {/* ════════════════════════════════════════════════════════
          BANNER DE PROGRESSO + SALDO
      ════════════════════════════════════════════════════════ */}
      <ProgressBanner completion={completion} balance={balance} rewarded={rewarded} />

      {/* ════════════════════════════════════════════════════════
          FORMULÁRIO
      ════════════════════════════════════════════════════════ */}
      <form onSubmit={handleSave} className="space-y-5">

        {/* ── Seção: Dados pessoais ───────────────────────── */}
        <Section
          title="Informações pessoais"
          subtitle="Como você é identificado na plataforma."
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="Nome completo"
              required
              value={form.name}
              onChange={(v) => update('name', v)}
              placeholder="Seu nome completo"
            />
            <Field
              label="E-mail"
              value={form.email}
              readOnly
              hint="Para alterar o e-mail, fale com o suporte."
            />
            <Field
              label="Data de nascimento"
              type="date"
              value={form.birthDate}
              onChange={(v) => update('birthDate', v)}
              optional
            />
          </div>
        </Section>

        {/* ── Seção: Contato ──────────────────────────────── */}
        <Section
          title="Contato"
          subtitle="Onde podemos falar com você."
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="Telefone"
              type="tel"
              required
              value={form.phone}
              onChange={(v) => update('phone', v)}
              placeholder="(11) 99999-9999"
            />
            <Field
              label="WhatsApp"
              type="tel"
              required
              value={form.whatsapp}
              onChange={(v) => update('whatsapp', v)}
              placeholder="(11) 99999-9999"
            />
            <Field
              label="Instagram"
              value={form.instagram}
              onChange={(v) => update('instagram', v)}
              placeholder="@seuusuario"
              optional
            />
            <Field
              label="LinkedIn"
              value={form.linkedin}
              onChange={(v) => update('linkedin', v)}
              placeholder="linkedin.com/in/seunome"
              optional
            />
          </div>
        </Section>

        {/* ── Seção: Endereço ─────────────────────────────── */}
        <Section
          title="Endereço"
          subtitle="Para emissão de notas fiscais e entregas."
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <Field
                label="Rua / Logradouro"
                required
                value={form.addressStreet}
                onChange={(v) => update('addressStreet', v)}
                placeholder="Rua, número, complemento"
              />
            </div>
            <Field
              label="Cidade"
              required
              value={form.addressCity}
              onChange={(v) => update('addressCity', v)}
              placeholder="Sua cidade"
            />
            <Field
              label="Estado"
              required
              value={form.addressState}
              onChange={(v) => update('addressState', v)}
              placeholder="UF"
            />
            <Field
              label="CEP"
              required
              value={form.addressZip}
              onChange={(v) => update('addressZip', v)}
              placeholder="00000-000"
            />
          </div>
        </Section>

        {/* ── Seção: Profissional ─────────────────────────── */}
        <Section
          title="Profissional"
          subtitle="Onde você atua e qual seu papel."
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="Empresa"
              required
              value={form.companyName}
              onChange={(v) => update('companyName', v)}
              placeholder="Nome da empresa"
            />
            <Field
              label="Cargo"
              required
              value={form.jobTitle}
              onChange={(v) => update('jobTitle', v)}
              placeholder="Seu cargo atual"
            />
          </div>
        </Section>

        {/* ── Mensagens + Botão Salvar ────────────────────── */}
        <div className="soul-panel">
          {saveError && (
            <div className="rounded-xl px-4 py-3 text-sm font-sans font-semibold mb-4"
                 style={{ background: 'rgba(196,99,58,0.1)', border: '1px solid rgba(196,99,58,0.25)', color: '#8f3f1e' }}>
              {saveError}
            </div>
          )}
          {saveOk && (
            <div className="rounded-xl px-4 py-3 text-sm font-sans font-semibold mb-4"
                 style={{ background: 'rgba(122,158,126,0.15)', border: '1px solid rgba(122,158,126,0.3)', color: '#4a7a4e' }}>
              ✓ Perfil salvo com sucesso!
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-[13px] text-soul-ink/70 font-medium">
              {isComplete
                ? '🎉 Perfil 100% completo! Solicite seu código de validação abaixo.'
                : `Faltam ${REQUIRED_PROFILE_FIELDS.length - Math.round((completion / 100) * REQUIRED_PROFILE_FIELDS.length)} campos para completar.`}
            </p>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[14px] font-bold text-white
                         shadow-terra hover:-translate-y-px transition-all disabled:opacity-60 disabled:translate-y-0"
              style={{ background: 'linear-gradient(135deg, #c4633a, #d4943a)' }}
            >
              {saving ? 'Salvando…' : 'Salvar perfil'}
            </button>
          </div>
        </div>
      </form>

      {/* ════════════════════════════════════════════════════════
          CARD DE VALIDAÇÃO POR CÓDIGO (Gamificação +6 créditos)
      ════════════════════════════════════════════════════════ */}
      {!rewarded && (
        <div
          className="rounded-3xl p-6 mt-6 relative overflow-hidden"
          style={{
            background: isComplete
              ? 'linear-gradient(135deg, #fff8e7, #fdecd2)'
              : 'linear-gradient(135deg, #f5f0e8, #faf7f2)',
            border: `2px solid ${isComplete ? 'rgba(201,168,76,0.45)' : 'rgba(28,26,23,0.08)'}`,
          }}
        >
          {/* Decoração */}
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-30 pointer-events-none"
               style={{ background: 'radial-gradient(circle, #c9a84c, transparent 70%)', transform: 'translate(30%, -30%)' }} />

          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🎁</span>
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-soul-ink/70">
                Bônus exclusivo de onboarding
              </span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-soul-ink leading-tight mb-2">
              Ganhe +6 créditos extras
            </h3>
            <p className="text-[14px] text-soul-ink/75 font-medium leading-relaxed mb-5 max-w-2xl">
              Complete todos os campos obrigatórios, solicite o código por e-mail e valide aqui — pronto, +6 créditos caem na sua conta na hora.
            </p>

            {!codeSent ? (
              <>
                {requestError && (
                  <div className="rounded-xl px-4 py-3 text-sm font-sans font-semibold mb-4"
                       style={{ background: 'rgba(196,99,58,0.1)', border: '1px solid rgba(196,99,58,0.25)', color: '#8f3f1e' }}>
                    {requestError}
                  </div>
                )}
                <button
                  type="button"
                  disabled={!isComplete || requesting}
                  onClick={handleRequestCode}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[14px] font-bold transition-all disabled:cursor-not-allowed"
                  style={{
                    background: isComplete && !requesting
                      ? 'linear-gradient(135deg, #c9a84c, #d4943a)'
                      : 'rgba(28,26,23,0.1)',
                    color: isComplete ? '#1c1a17' : 'rgba(28,26,23,0.45)',
                    boxShadow: isComplete ? '0 4px 16px rgba(201,168,76,0.3)' : 'none',
                  }}
                >
                  {requesting ? 'Enviando…' : isComplete ? 'Solicitar código por e-mail' : 'Complete o perfil para liberar'}
                </button>
              </>
            ) : (
              <form onSubmit={handleValidateCode} className="space-y-4">
                <div className="rounded-xl px-4 py-3 text-sm font-sans font-semibold"
                     style={{ background: 'rgba(122,158,126,0.15)', border: '1px solid rgba(122,158,126,0.3)', color: '#4a7a4e' }}>
                  ✓ Código enviado para o seu e-mail. Verifique a caixa de entrada (e o spam).
                  {devCode && (
                    <div className="mt-1 text-xs font-mono font-bold">DEV: código = {devCode}</div>
                  )}
                </div>

                {validateError && (
                  <div className="rounded-xl px-4 py-3 text-sm font-sans font-semibold"
                       style={{ background: 'rgba(196,99,58,0.1)', border: '1px solid rgba(196,99,58,0.25)', color: '#8f3f1e' }}>
                    {validateError}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3 sm:items-end">
                  <div className="flex-1">
                    <label className="block text-[12px] font-bold uppercase tracking-widest text-soul-ink/70 mb-2">
                      Código de 6 dígitos
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      value={code}
                      onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      placeholder="000000"
                      className="w-full px-4 py-3 rounded-xl text-2xl font-mono font-bold text-center tracking-[0.4em]
                                 border-2 outline-none transition-all bg-white"
                      style={{ borderColor: 'rgba(201,168,76,0.4)', color: '#a8522e' }}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={validating || code.length !== 6}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-[14px] font-bold text-white
                               shadow-terra hover:-translate-y-px transition-all disabled:opacity-60 disabled:translate-y-0"
                    style={{ background: 'linear-gradient(135deg, #c4633a, #d4943a)' }}
                  >
                    {validating ? 'Validando…' : 'Validar e ganhar +6'}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleRequestCode}
                  disabled={requesting}
                  className="text-[12px] font-semibold text-soul-ink/60 hover:text-soul-ink transition-colors underline-offset-2 hover:underline"
                >
                  {requesting ? 'Reenviando…' : 'Não recebi — reenviar código'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {rewarded && (
        <div
          className="rounded-3xl p-6 mt-6 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #e8f5e9, #f0faf1)',
            border: '2px solid rgba(122,158,126,0.4)',
          }}
        >
          <div className="flex items-center gap-3">
            <span className="text-4xl">✅</span>
            <div>
              <h3 className="font-serif text-xl font-bold text-soul-ink leading-tight">
                Bônus de perfil já recebido
              </h3>
              <p className="text-[14px] text-soul-ink/75 font-medium mt-0.5">
                Os 6 créditos extras já foram adicionados à sua conta. Obrigado por completar seu perfil!
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// ──────────────────────────────────────────────────────────────
// Componentes auxiliares
// ──────────────────────────────────────────────────────────────

function Section({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle?: string
  children: React.ReactNode
}) {
  return (
    <section className="soul-panel">
      <div className="mb-5 pb-4 border-b border-soul-mist/60">
        <h2 className="font-serif text-xl font-semibold text-soul-ink leading-tight">{title}</h2>
        {subtitle && (
          <p className="text-[13px] text-soul-ink/70 font-medium mt-0.5">{subtitle}</p>
        )}
      </div>
      {children}
    </section>
  )
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  required,
  optional,
  readOnly,
  hint,
}: {
  label: string
  value: string
  onChange?: (v: string) => void
  type?: string
  placeholder?: string
  required?: boolean
  optional?: boolean
  readOnly?: boolean
  hint?: string
}) {
  return (
    <div>
      <label className="block text-[12px] font-bold uppercase tracking-widest mb-2"
             style={{ color: required ? '#8f3f1e' : 'rgba(28,26,23,0.6)' }}>
        {label}
        {required && <span className="text-soul-terracota ml-1">*</span>}
        {optional && <span className="text-soul-ink/40 normal-case font-medium tracking-normal ml-1.5">(opcional)</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        readOnly={readOnly}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl text-[14px] font-sans font-medium text-soul-ink outline-none transition-all"
        style={{
          background: readOnly ? 'rgba(28,26,23,0.05)' : 'white',
          border: '1.5px solid rgba(28,26,23,0.1)',
          cursor: readOnly ? 'not-allowed' : 'text',
          color: readOnly ? 'rgba(28,26,23,0.6)' : '#1c1a17',
        }}
        onFocus={(e) => { if (!readOnly) e.target.style.borderColor = 'rgba(196,99,58,0.5)' }}
        onBlur={(e) => { e.target.style.borderColor = 'rgba(28,26,23,0.1)' }}
      />
      {hint && (
        <p className="text-[11px] text-soul-ink/55 font-medium mt-1.5">{hint}</p>
      )}
    </div>
  )
}

function ProgressBanner({
  completion,
  balance,
  rewarded,
}: {
  completion: number
  balance: number
  rewarded: boolean
}) {
  return (
    <div
      className="rounded-3xl p-5 sm:p-6 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #f5ede1 0%, #faf0e6 100%)',
        border: '1px solid rgba(196,99,58,0.15)',
      }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-5 items-center">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-soul-ink/70">
              Preenchimento do perfil
            </span>
            <span
              className="font-serif text-2xl font-bold"
              style={{ color: completion === 100 ? '#4a7a4e' : '#a8522e' }}
            >
              {completion}%
            </span>
          </div>

          {/* Barra de progresso */}
          <div className="h-2 rounded-full overflow-hidden mt-2"
               style={{ background: 'rgba(28,26,23,0.08)' }}>
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${completion}%`,
                background: completion === 100
                  ? 'linear-gradient(90deg, #7a9e7e, #96bf9a)'
                  : 'linear-gradient(90deg, #c4633a, #d4943a)',
              }}
            />
          </div>

          <p className="text-[13px] text-soul-ink/70 font-medium mt-2.5 leading-snug">
            {rewarded
              ? '✓ Bônus de perfil já recebido'
              : completion === 100
                ? 'Perfil completo — solicite seu código abaixo para ganhar +6 créditos'
                : `Complete os campos obrigatórios para liberar +6 créditos extras`}
          </p>
        </div>

        {/* Saldo atual */}
        <div className="text-right sm:text-left sm:border-l sm:border-soul-mist/60 sm:pl-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-soul-ink/55">
            Saldo atual
          </p>
          <p className="font-serif text-3xl sm:text-4xl font-bold leading-none mt-1"
             style={{ color: '#a8522e' }}>
            {balance}
          </p>
          <p className="text-[12px] text-soul-ink/60 font-medium mt-0.5">
            créditos
          </p>
        </div>
      </div>
    </div>
  )
}
