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
  {
    value: 'LOVE_LANGUAGES',
    label: '5 Linguagens do Amor',
    short: 'Ling. Amor',
    credits: 4,
    image: '/tests/linguagens-amor.jpg',
    description: 'Baseado no best-seller de Gary Chapman. Identifica a linguagem primária do amor da pessoa — como ela se sente mais amada e valorizada — com aplicação direta em relacionamentos e liderança.',
    badge: 'Novo',
  },
  {
    value: 'BUNDLE_4',
    label: 'Bundle — 4 Testes Comportamentais',
    short: 'Bundle 4',
    credits: 4,
    image: '/tests/disc.jpg',
    description: 'DISC + MBTI + Eneagrama + Temperamentos num único link. O colaborador realiza os 4 testes em sequência, um após o outro, com apenas 1 envio.',
    badge: 'Completo',
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
      const isBundle = form.testType === 'BUNDLE_4'
      const endpoint = isBundle ? '/api/bundles' : '/api/assessments'
      const payload = isBundle
        ? { employeeName: form.employeeName, employeeEmail: form.employeeEmail }
        : form

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
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
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-sans font-medium text-white
                   transition-all duration-200 hover:-translate-y-px shadow-terra"
        style={{ background: 'linear-gradient(135deg, #c4633a, #d4943a)' }}
      >
        ✦ Nova avaliação
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-soul-ink/40 px-4 backdrop-blur-sm">
          <div
            className="bg-white rounded-3xl shadow-soul-xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto"
            style={{ border: '1px solid rgba(232,226,214,0.6)' }}
          >

            {success ? (
              <div className="text-center py-4">
                <div className="text-5xl mb-4">✨</div>
                <h3 className="font-serif font-light text-2xl text-soul-ink mb-2">Avaliação criada!</h3>

                {success.emailSent ? (
                  <div className="flex items-center justify-center gap-2 rounded-2xl px-4 py-3 mb-5 text-sm font-sans"
                       style={{ background: 'rgba(122,158,126,0.1)', border: '1px solid rgba(122,158,126,0.2)', color: '#5a8a5e' }}>
                    <span>📧</span>
                    <span>E-mail enviado para <strong>{success.employeeEmail}</strong></span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2 rounded-2xl px-4 py-3 mb-5 text-sm font-sans"
                       style={{ background: 'rgba(212,148,58,0.08)', border: '1px solid rgba(212,148,58,0.2)', color: '#a0722e' }}>
                    <span>⚠️</span>
                    <span>E-mail não enviado — compartilhe o link manualmente</span>
                  </div>
                )}

                <p className="text-xs text-soul-ink/40 mb-2 font-sans">Link do teste:</p>
                <div className="rounded-2xl p-3 text-xs font-mono break-all text-soul-ink/60 mb-5 text-left"
                     style={{ background: 'rgba(232,226,214,0.3)', border: '1px solid rgba(232,226,214,0.6)' }}>
                  {success.link}
                </div>

                <button
                  onClick={handleCopy}
                  className="w-full py-2.5 rounded-full text-sm font-sans font-medium border transition-all mb-3"
                  style={{ borderColor: 'rgba(196,99,58,0.3)', color: '#c4633a' }}
                >
                  {copied ? '✓ Link copiado!' : '📋 Copiar link'}
                </button>
                <button
                  onClick={handleClose}
                  className="w-full py-2.5 rounded-full text-sm font-sans font-medium text-white transition-all hover:-translate-y-px shadow-terra"
                  style={{ background: 'linear-gradient(135deg, #c4633a, #d4943a)' }}
                >
                  Fechar
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-serif font-light text-xl text-soul-ink">Nova avaliação</h3>
                  <button
                    onClick={handleClose}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-soul-ink/40 hover:text-soul-ink/70 hover:bg-soul-mist/40 transition-all text-lg leading-none"
                  >
                    ×
                  </button>
                </div>

                <form onSubmit={handleCreate} className="space-y-5">
                  {error && (
                    <div className="rounded-2xl px-4 py-3 text-sm font-sans"
                         style={{ background: 'rgba(196,122,114,0.08)', border: '1px solid rgba(196,122,114,0.2)', color: '#a05a52' }}>
                      {error}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-sans font-semibold text-soul-ink/50 uppercase tracking-widest mb-2">
                      Nome do colaborador
                    </label>
                    <input
                      type="text" required value={form.employeeName}
                      onChange={(e) => update('employeeName', e.target.value)}
                      className="soul-input" placeholder="João Silva"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-sans font-semibold text-soul-ink/50 uppercase tracking-widest mb-2">
                      E-mail do colaborador
                    </label>
                    <input
                      type="email" required value={form.employeeEmail}
                      onChange={(e) => update('employeeEmail', e.target.value)}
                      className="soul-input" placeholder="joao@empresa.com"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-sans font-semibold text-soul-ink/50 uppercase tracking-widest mb-3">
                      Tipo de avaliação
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {TEST_TYPES.map((t) => {
                        const active = form.testType === t.value
                        return (
                          <button
                            key={t.value}
                            type="button"
                            onClick={() => update('testType', t.value)}
                            className="relative text-left rounded-2xl p-3 transition-all duration-150"
                            style={{
                              border: active ? '2px solid #c4633a' : '1.5px solid rgba(232,226,214,0.8)',
                              background: active ? 'rgba(196,99,58,0.05)' : 'white',
                            }}
                          >
                            {t.badge && (
                              <span className="absolute top-2 right-2 text-[10px] font-bold px-1.5 py-0.5 rounded-full font-sans"
                                    style={{ background: 'rgba(212,148,58,0.15)', color: '#a0722e' }}>
                                {t.badge}
                              </span>
                            )}
                            <p className="text-sm font-semibold mb-0.5 font-sans"
                               style={{ color: active ? '#c4633a' : '#1c1a17' }}>
                              {t.short}
                            </p>
                            <p className="text-[11px] font-sans" style={{ color: 'rgba(28,26,23,0.4)' }}>
                              {t.credits === 1 ? '1 crédito' : `${t.credits} créditos`}
                            </p>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Preview */}
                  <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(232,226,214,0.6)' }}>
                    <img
                      src={selectedTest.image}
                      alt={selectedTest.label}
                      className="w-full object-cover"
                      style={{ maxHeight: '100px', objectPosition: 'center top' }}
                    />
                    <div className="p-4" style={{ background: 'rgba(250,247,242,0.6)' }}>
                      <div className="flex items-center justify-between mb-1.5">
                        <p className="text-sm font-semibold text-soul-ink font-sans">{selectedTest.label}</p>
                        <span className="text-xs font-semibold px-2 py-1 rounded-full font-sans"
                              style={{
                                background: selectedTest.credits > 1 ? 'rgba(212,148,58,0.12)' : 'rgba(196,99,58,0.08)',
                                color: selectedTest.credits > 1 ? '#a0722e' : '#c4633a',
                              }}>
                          {selectedTest.credits} crédito{selectedTest.credits > 1 ? 's' : ''}
                        </span>
                      </div>
                      <p className="text-xs text-soul-ink/50 leading-relaxed font-sans">{selectedTest.description}</p>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-1">
                    <button
                      type="button" onClick={handleClose}
                      className="flex-1 py-2.5 rounded-full text-sm font-sans font-medium border transition-all"
                      style={{ borderColor: 'rgba(232,226,214,0.8)', color: 'rgba(28,26,23,0.5)' }}
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit" disabled={loading}
                      className="flex-1 py-2.5 rounded-full text-sm font-sans font-medium text-white transition-all hover:-translate-y-px shadow-terra disabled:opacity-60 disabled:translate-y-0"
                      style={{ background: 'linear-gradient(135deg, #c4633a, #d4943a)' }}
                    >
                      {loading ? 'Criando…' : 'Criar e enviar link'}
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
