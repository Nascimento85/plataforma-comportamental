'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const TEST_TYPES = [
  { value: 'DISC', label: 'DISC — Perfil Comportamental' },
  { value: 'MBTI', label: 'MBTI — 16 Tipos de Personalidade' },
  { value: 'ENNEAGRAM', label: 'Eneagrama — 9 Tipos' },
  { value: 'TEMPERAMENT', label: '4 Temperamentos' },
]

interface SuccessState {
  link: string
  emailSent: boolean
  employeeEmail: string
}

export default function NewAssessmentButton() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ employeeName: '', employeeEmail: '', testType: 'DISC' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState<SuccessState | null>(null)
  const [copied, setCopied] = useState(false)

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/assessments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error ?? 'Erro ao criar avaliação.'); return }
      setSuccess({
        link: data.testLink,
        emailSent: data.emailSent ?? false,
        employeeEmail: form.employeeEmail,
      })
      router.refresh()
    } catch {
      setError('Erro ao conectar. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  function handleCopy() {
    if (!success) return
    navigator.clipboard.writeText(success.link)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function handleClose() {
    setOpen(false); setSuccess(null); setError(''); setCopied(false)
    setForm({ employeeName: '', employeeEmail: '', testType: 'DISC' })
  }

  return (
    <>
      <button onClick={() => setOpen(true)} className="btn-primary">+ Nova avaliação</button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">

            {success ? (
              <div className="text-center">
                <div className="text-5xl mb-3">✅</div>
                <h3 className="font-bold text-lg text-gray-900 mb-1">Avaliação criada!</h3>

                {/* Status do e-mail */}
                {success.emailSent ? (
                  <div className="flex items-center justify-center gap-2 text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-2 mb-4 text-sm">
                    <span>📧</span>
                    <span>E-mail enviado para <strong>{success.employeeEmail}</strong></span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2 text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-4 py-2 mb-4 text-sm">
                    <span>⚠️</span>
                    <span>E-mail não enviado — compartilhe o link manualmente</span>
                  </div>
                )}

                <p className="text-sm text-gray-500 mb-2">Link do teste:</p>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-xs font-mono break-all text-gray-700 mb-4 text-left">
                  {success.link}
                </div>

                <button
                  onClick={handleCopy}
                  className="btn-secondary w-full mb-3"
                >
                  {copied ? '✓ Copiado!' : 'Copiar link'}
                </button>
                <button onClick={handleClose} className="btn-primary w-full">Fechar</button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-bold text-lg text-gray-900">Nova avaliação</h3>
                  <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 text-xl">×</button>
                </div>
                <form onSubmit={handleCreate} className="space-y-4">
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
                      {error}
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nome do colaborador</label>
                    <input
                      type="text" required value={form.employeeName}
                      onChange={(e) => update('employeeName', e.target.value)}
                      className="input" placeholder="João Silva"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">E-mail do colaborador</label>
                    <input
                      type="email" required value={form.employeeEmail}
                      onChange={(e) => update('employeeEmail', e.target.value)}
                      className="input" placeholder="joao@empresa.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de teste</label>
                    <select
                      value={form.testType}
                      onChange={(e) => update('testType', e.target.value)}
                      className="input"
                    >
                      {TEST_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                    </select>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button type="button" onClick={handleClose} className="btn-secondary flex-1">Cancelar</button>
                    <button type="submit" disabled={loading} className="btn-primary flex-1">
                      {loading ? 'Criando...' : 'Criar e enviar link'}
                    </button>
                  </div>
                </form>
              </>
            )}

          </div>
        </div>
      )}
    </>
  )
}
