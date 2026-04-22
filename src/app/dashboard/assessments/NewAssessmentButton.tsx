'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface TestType {
  value: string
  label: string
  short: string
  credits: number
  image: string
  description: string
  badge?: string
}

const TEST_TYPES: TestType[] = [
  {
    value: 'DISC',
    label: 'DISC — Perfil Comportamental',
    short: 'DISC',
    credits: 1,
    image: '/tests/disc.jpg',
    description: 'A ferramenta de análise comportamental mais usada no mundo. Revela como a pessoa age, lidera e se comunica — e como maximizar sua performance em qualquer ambiente.',
  },
  {
    value: 'MBTI',
    label: 'MBTI — 16 Tipos de Personalidade',
    short: 'MBTI',
    credits: 1,
    image: '/tests/mbti.jpg',
    description: 'Baseado em Carl Jung, mapeia as preferências cognitivas em 4 dimensões para identificar o tipo de personalidade entre 16 possíveis.',
  },
  {
    value: 'ENNEAGRAM',
    label: 'Eneagrama — 9 Tipos',
    short: 'Eneagrama',
    credits: 1,
    image: '/tests/eneagrama.jpg',
    description: 'Utilizado pela NASA e pelo Vale do Silício. Vai além do comportamento: revela a motivação oculta por trás das ações e o caminho exato para a melhor versão.',
  },
  {
    value: 'TEMPERAMENT',
    label: '4 Temperamentos',
    short: 'Temperamentos',
    credits: 1,
    image: '/tests/temperamentos.jpg',
    description: 'Baseado em Hipócrates, identifica as quatro inclinações naturais que determinam como a pessoa reage ao mundo — sua "matéria-prima" inata.',
  },
  {
    value: 'ARCHETYPE',
    label: 'Arquétipos — Os 12 Padrões',
    short: 'Arquétipos',
    credits: 2,
    image: '/tests/arquetipo-misto.jpg',
    description: 'Baseado em Jung, descobre qual dos 12 arquétipos universais está rodando na pessoa — e como isso molda suas decisões, liderança e resultados. Relatório mais profundo.',
    badge: 'Mais completo',
  },
  {
    value: 'ARCHETYPE_FEMININE',
    label: 'Arquétipos Femininos — 7 Energias',
    short: 'Arq. Femininos',
    credits: 2,
    image: '/tests/arquetipo-feminino.jpg',
    description: 'Identifica qual das 7 energias arquetípicas femininas governa o momento atual — e qual precisa ser ativada para liderança e equilíbrio plenos.',
    badge: 'Exclusivo',
  },
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

  const selectedTest = TEST_TYPES.find((t) => t.value === form.testType) ?? TEST_TYPES[0]

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
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">

            {success ? (
              <div className="text-center">
                <div className="text-5xl mb-3">✅</div>
                <h3 className="font-bold text-lg text-gray-900 mb-1">Avaliação criada!</h3>

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

                <button onClick={handleCopy} className="btn-secondary w-full mb-3">
                  {copied ? '✓ Copiado!' : 'Copiar link'}
                </button>
                <button onClick={handleClose} className="btn-primary w-full">Fechar</button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-bold text-lg text-gray-900">Nova avaliação</h3>
                  <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 text-xl leading-none">×</button>
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de avaliação</label>
                    <div className="grid grid-cols-2 gap-2">
                      {TEST_TYPES.map((t) => (
                        <button
                          key={t.value}
                          type="button"
                          onClick={() => update('testType', t.value)}
                          className={`relative text-left rounded-xl border-2 p-3 transition-all ${
                            form.testType === t.value
                              ? 'border-brand-600 bg-brand-50'
                              : 'border-gray-200 hover:border-brand-300 bg-white'
                          }`}
                        >
                          {t.badge && (
                            <span className="absolute top-2 right-2 text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700">
                              {t.badge}
                            </span>
                          )}
                          <p className={`text-xs font-bold mb-0.5 ${form.testType === t.value ? 'text-brand-700' : 'text-gray-700'}`}>
                            {t.short}
                          </p>
                          <p className="text-[11px] text-gray-400">
                            {t.credits === 1 ? '1 crédito' : `${t.credits} créditos`}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Preview do teste selecionado */}
                  <div className="rounded-xl border border-gray-200 overflow-hidden">
                    <img
                      src={selectedTest.image}
                      alt={selectedTest.label}
                      className="w-full object-cover"
                      style={{ maxHeight: '120px', objectPosition: 'center top' }}
                    />
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-bold text-gray-900">{selectedTest.label}</p>
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                          selectedTest.credits > 1
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-brand-50 text-brand-700'
                        }`}>
                          {selectedTest.credits} crédito{selectedTest.credits > 1 ? 's' : ''}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed">{selectedTest.description}</p>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-1">
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
