'use client'

import { ReactNode, useState } from 'react'
import { useRouter } from 'next/navigation'

interface TestType {
  value: string
  label: string        // Nome completo — sem abreviação
  short: string
  credits: number
  image: string
  hook: string         // Linha de gancho / promessa
  description: string  // Descrição persuasiva, voltada a decisão de compra
  bullets: string[]    // Benefícios rápidos em bullets
  badge?: string
}

const TEST_TYPES: TestType[] = [
  {
    value: 'DISC',
    label: 'DISC — Perfil Comportamental Completo',
    short: 'DISC',
    credits: 1,
    image: '/tests/disc.jpg',
    hook: 'A ferramenta mais usada no mundo corporativo.',
    description:
      'Revele em minutos como o candidato decide, lidera e se comunica. O DISC identifica as quatro forças comportamentais que regem cada pessoa — e mostra exatamente como maximizar sua performance em qualquer ambiente.',
    bullets: [
      'Mapa completo de Dominância, Influência, Estabilidade e Conformidade',
      'Indica cargos e funções de alta compatibilidade',
      'Relatório PDF pronto para devolutiva com o colaborador',
    ],
  },
  {
    value: 'MBTI',
    label: 'MBTI — 16 Tipos de Personalidade',
    short: 'MBTI',
    credits: 1,
    image: '/tests/mbti.jpg',
    hook: 'Baseado em Carl Jung. Usado por Fortune 500.',
    description:
      'O MBTI decodifica as preferências cognitivas em 4 dimensões para identificar entre 16 tipos de personalidade. É o mapa mais profundo disponível para entender como cada pessoa pensa, decide e se energiza.',
    bullets: [
      '70 questões validadas cientificamente',
      'Reveste o tipo dominante, auxiliar, terciário e inferior',
      'Aplicação direta em formação de times e coaching',
    ],
  },
  {
    value: 'ENNEAGRAM',
    label: 'Eneagrama de Personalidade — Os 9 Tipos',
    short: 'Eneagrama',
    credits: 1,
    image: '/tests/eneagrama.jpg',
    hook: 'Usado pela NASA e pelo Vale do Silício.',
    description:
      'O Eneagrama vai além do comportamento aparente: revela a motivação oculta por trás de cada ação, o medo nuclear que trava o desenvolvimento e o caminho exato para a versão mais madura da pessoa. Ferramenta definitiva para líderes de alta complexidade.',
    bullets: [
      '135 afirmações cruzadas para mapear os 9 tipos',
      'Identifica motivação raiz, medo básico e vetores de crescimento',
      'Asas, instintos e níveis de saúde emocional',
    ],
  },
  {
    value: 'TEMPERAMENT',
    label: '4 Temperamentos Clássicos',
    short: 'Temperamentos',
    credits: 1,
    image: '/tests/temperamentos.jpg',
    hook: 'A base milenar de Hipócrates para o comportamento humano.',
    description:
      'Identifica as quatro inclinações inatas — Colérico, Sanguíneo, Melancólico e Fleumático — que determinam como a pessoa reage ao mundo. É a "matéria-prima" comportamental que nenhum outro teste captura com tanta precisão.',
    bullets: [
      'Teste rápido e de leitura imediata (25 questões)',
      'Perfil primário + secundário com estilo de comunicação e trabalho',
      'Indicadores de funções ideais por temperamento',
    ],
  },
  {
    value: 'ARCHETYPE',
    label: 'Arquétipos Junguianos — Os 12 Padrões Universais',
    short: 'Arquétipos',
    credits: 2,
    image: '/tests/arquetipo-misto.jpg',
    hook: 'O teste mais profundo e completo da plataforma.',
    description:
      'Baseado na psicologia analítica de Carl Jung, descobre qual dos 12 arquétipos universais está no comando da personalidade — e como isso molda decisões, liderança, relacionamentos e resultados. Esse é o mapa que revela a força-motriz invisível por trás de tudo.',
    bullets: [
      'Arquétipo dominante + secundário com leitura integrada',
      'Dom, sombra e jornada de amadurecimento de cada padrão',
      'Relatório mais extenso e detalhado da plataforma',
    ],
    badge: 'Mais completo',
  },
  {
    value: 'ARCHETYPE_FEMININE',
    label: 'Arquétipos Femininos — As 7 Energias',
    short: 'Arq. Femininos',
    credits: 2,
    image: '/tests/arquetipo-feminino.jpg',
    hook: 'Exclusivo para decodificar o feminino de lideranças.',
    description:
      'Identifica qual das 7 energias arquetípicas femininas governa o momento atual — Mãe, Virgem, Amazona, Sábia, Mística, Sacerdotisa e Feiticeira — e qual precisa ser ativada para liderança e equilíbrio plenos. Ferramenta indispensável para coaching feminino e desenvolvimento de líderes mulheres.',
    bullets: [
      'Diagnóstico de energia ativa + energia a desenvolver',
      'Aplicação direta em liderança feminina e mentoria',
      'Leitura integrada com fases de vida e ciclos profissionais',
    ],
    badge: 'Exclusivo',
  },
  {
    value: 'LOVE_LANGUAGES',
    label: 'As 5 Linguagens do Amor — Gary Chapman',
    short: 'Ling. Amor',
    credits: 4,
    image: '/tests/linguagens-amor.jpg',
    hook: 'Best-seller mundial aplicado a relacionamentos e liderança.',
    description:
      'Identifica a linguagem primária de amor de cada pessoa — como ela se sente mais valorizada e reconhecida. Tem aplicação direta em casais, mas também em liderança: revela como elogiar, reconhecer e motivar cada membro da equipe no nível emocional mais profundo.',
    bullets: [
      'Palavras de afirmação, tempo de qualidade, presentes, atos de serviço, toque físico',
      'Ranking completo das 5 linguagens com percentuais',
      'Guia prático de aplicação em relacionamentos e gestão de pessoas',
    ],
    badge: 'Novo',
  },
  {
    value: 'BUNDLE_4',
    label: 'Bundle Completo — 4 Testes Comportamentais',
    short: 'Bundle 4',
    credits: 4,
    image: '/tests/disc.jpg',
    hook: 'O raio-X comportamental definitivo. Um link, quatro testes.',
    description:
      'DISC, MBTI, Eneagrama e 4 Temperamentos em um único envio. O colaborador responde os 4 testes em sequência e você recebe uma devolutiva integrada que cruza os 4 mapas — a leitura mais rica possível sobre uma pessoa. Ideal para executivos, líderes e processos de sucessão.',
    bullets: [
      'Um único link de envio — os 4 testes em sequência',
      'Relatório integrado gerado por IA cruzando os 4 perfis',
      'Economia de 20% comparado ao envio individual',
    ],
    badge: 'Mais completo',
  },
]

interface SuccessState {
  link: string
  emailSent: boolean
  employeeEmail: string
}

interface Props {
  children?: ReactNode
  variant?: 'primary' | 'secondary'
}

export default function NewAssessmentButton({ children, variant = 'primary' }: Props) {
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

  const triggerClasses = variant === 'secondary'
    ? 'inline-flex items-center gap-2 px-5 py-3 rounded-full text-[14px] font-sans font-bold border-2 transition-all'
    : 'inline-flex items-center gap-2 px-5 py-3 rounded-full text-[14px] font-sans font-bold text-white transition-all duration-200 hover:-translate-y-px shadow-terra'

  const triggerStyle = variant === 'secondary'
    ? { borderColor: 'rgba(196,99,58,0.4)', color: '#c4633a' }
    : { background: 'linear-gradient(135deg, #c4633a, #d4943a)' }

  return (
    <>
      <button onClick={() => setOpen(true)} className={triggerClasses} style={triggerStyle}>
        {children ?? (
          <>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
            </svg>
            Convidar candidato
          </>
        )}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-start md:items-center justify-center bg-soul-ink/60 px-3 md:px-6 py-6 backdrop-blur-sm overflow-y-auto">
          <div
            className="bg-white rounded-3xl shadow-soul-xl w-full max-w-4xl my-auto"
            style={{ border: '1px solid rgba(232,226,214,0.6)' }}
          >

            {success ? (
              /* ──────────────── Sucesso ──────────────── */
              <div className="p-6 md:p-10 text-center">
                <div className="text-6xl mb-5">✨</div>
                <h3 className="font-serif font-semibold text-3xl md:text-4xl text-soul-ink mb-3 leading-tight">
                  Avaliação criada com sucesso!
                </h3>
                <p className="text-[16px] text-soul-ink/75 font-medium mb-6 max-w-lg mx-auto">
                  O link único foi gerado e está pronto para ser enviado ao candidato.
                </p>

                {success.emailSent ? (
                  <div className="flex items-center justify-center gap-2 rounded-2xl px-5 py-4 mb-6 text-[15px] font-sans font-semibold"
                       style={{ background: 'rgba(122,158,126,0.15)', border: '1px solid rgba(122,158,126,0.35)', color: '#3a6b3e' }}>
                    <span className="text-xl">📧</span>
                    <span>E-mail enviado para <strong>{success.employeeEmail}</strong></span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2 rounded-2xl px-5 py-4 mb-6 text-[15px] font-sans font-semibold"
                       style={{ background: 'rgba(212,148,58,0.12)', border: '1px solid rgba(212,148,58,0.35)', color: '#8a5c1e' }}>
                    <span className="text-xl">⚠</span>
                    <span>E-mail não enviado — compartilhe o link manualmente</span>
                  </div>
                )}

                <p className="text-[13px] font-bold uppercase tracking-widest text-soul-ink/60 mb-2">Link do teste</p>
                <div className="rounded-2xl p-4 text-[13px] font-mono break-all text-soul-ink/85 mb-6 text-left font-semibold"
                     style={{ background: 'rgba(232,226,214,0.4)', border: '1px solid rgba(232,226,214,0.8)' }}>
                  {success.link}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleCopy}
                    className="flex-1 py-3 rounded-full text-[14px] font-sans font-bold border-2 transition-all"
                    style={{ borderColor: 'rgba(196,99,58,0.4)', color: '#c4633a' }}
                  >
                    {copied ? '✓ Link copiado!' : '📋 Copiar link'}
                  </button>
                  <button
                    onClick={handleClose}
                    className="flex-1 py-3 rounded-full text-[14px] font-sans font-bold text-white transition-all hover:-translate-y-px shadow-terra"
                    style={{ background: 'linear-gradient(135deg, #c4633a, #d4943a)' }}
                  >
                    Fechar
                  </button>
                </div>
              </div>
            ) : (
              /* ──────────────── Formulário ──────────────── */
              <div className="flex flex-col lg:flex-row">

                {/* ── Coluna esquerda: formulário ── */}
                <div className="lg:w-[44%] p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-soul-mist/60">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="font-serif font-semibold text-2xl md:text-3xl text-soul-ink leading-tight">
                        Nova avaliação
                      </h3>
                      <p className="text-[14px] text-soul-ink/70 font-medium mt-1">
                        Envie um teste em menos de 30 segundos.
                      </p>
                    </div>
                    <button
                      onClick={handleClose}
                      className="w-9 h-9 rounded-full flex items-center justify-center text-soul-ink/50 hover:text-soul-ink hover:bg-soul-mist/60 transition-all text-2xl leading-none font-light"
                      aria-label="Fechar"
                    >
                      ×
                    </button>
                  </div>

                  <form onSubmit={handleCreate} className="space-y-5">
                    {error && (
                      <div className="rounded-2xl px-4 py-3 text-[14px] font-sans font-semibold"
                           style={{ background: 'rgba(196,122,114,0.12)', border: '1px solid rgba(196,122,114,0.35)', color: '#8a4a42' }}>
                        {error}
                      </div>
                    )}

                    <div>
                      <label className="block text-[12px] font-sans font-bold text-soul-ink/70 uppercase tracking-widest mb-2">
                        Nome do candidato
                      </label>
                      <input
                        type="text" required value={form.employeeName}
                        onChange={(e) => update('employeeName', e.target.value)}
                        className="soul-input text-[15px] font-medium py-3.5" placeholder="João Silva"
                      />
                    </div>

                    <div>
                      <label className="block text-[12px] font-sans font-bold text-soul-ink/70 uppercase tracking-widest mb-2">
                        E-mail do candidato
                      </label>
                      <input
                        type="email" required value={form.employeeEmail}
                        onChange={(e) => update('employeeEmail', e.target.value)}
                        className="soul-input text-[15px] font-medium py-3.5" placeholder="joao@empresa.com"
                      />
                    </div>

                    <div>
                      <label className="block text-[12px] font-sans font-bold text-soul-ink/70 uppercase tracking-widest mb-2">
                        Tipo de avaliação
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {TEST_TYPES.map((t) => {
                          const active = form.testType === t.value
                          return (
                            <button
                              key={t.value}
                              type="button"
                              onClick={() => update('testType', t.value)}
                              className="relative text-left rounded-2xl p-3 transition-all duration-150"
                              style={{
                                border: active ? '2px solid #c4633a' : '1.5px solid rgba(232,226,214,0.9)',
                                background: active ? 'rgba(196,99,58,0.06)' : 'white',
                              }}
                            >
                              {t.badge && (
                                <span className="absolute top-1.5 right-1.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full font-sans"
                                      style={{ background: 'rgba(212,148,58,0.2)', color: '#8a5c1e' }}>
                                  {t.badge}
                                </span>
                              )}
                              <p className="text-[14px] font-bold mb-0.5 font-sans leading-tight"
                                 style={{ color: active ? '#c4633a' : '#1c1a17' }}>
                                {t.short}
                              </p>
                              <p className="text-[12px] font-sans font-semibold" style={{ color: 'rgba(28,26,23,0.55)' }}>
                                {t.credits === 1 ? '1 crédito' : `${t.credits} créditos`}
                              </p>
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button
                        type="button" onClick={handleClose}
                        className="flex-1 py-3 rounded-full text-[14px] font-sans font-bold border-2 transition-all"
                        style={{ borderColor: 'rgba(232,226,214,1)', color: 'rgba(28,26,23,0.7)' }}
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit" disabled={loading}
                        className="flex-[1.3] py-3 rounded-full text-[14px] font-sans font-bold text-white transition-all hover:-translate-y-px shadow-terra disabled:opacity-60 disabled:translate-y-0"
                        style={{ background: 'linear-gradient(135deg, #c4633a, #d4943a)' }}
                      >
                        {loading ? 'Criando link…' : 'Criar e enviar link ✦'}
                      </button>
                    </div>
                  </form>
                </div>

                {/* ── Coluna direita: preview vendedor ── */}
                <div className="lg:w-[56%] p-6 md:p-8 relative overflow-hidden"
                     style={{ background: 'linear-gradient(180deg, #faf7f2 0%, #f5f0e8 100%)' }}>

                  {/* Imagem */}
                  <div className="rounded-2xl overflow-hidden mb-5 border border-soul-mist/70">
                    <img
                      src={selectedTest.image}
                      alt={selectedTest.label}
                      className="w-full object-cover"
                      style={{ maxHeight: '180px', objectPosition: 'center center' }}
                    />
                  </div>

                  {/* Badge de créditos */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="inline-flex items-center rounded-full px-3 py-1 text-[12px] font-bold"
                          style={{ background: 'rgba(196,99,58,0.12)', color: '#c4633a' }}>
                      {selectedTest.credits} crédito{selectedTest.credits > 1 ? 's' : ''}
                    </span>
                    {selectedTest.badge && (
                      <span className="inline-flex items-center rounded-full px-3 py-1 text-[12px] font-bold"
                            style={{ background: 'rgba(212,148,58,0.18)', color: '#8a5c1e' }}>
                        ✦ {selectedTest.badge}
                      </span>
                    )}
                  </div>

                  {/* Nome completo — fonte grande */}
                  <h4 className="font-serif font-semibold text-[22px] md:text-[26px] text-soul-ink leading-tight mb-2">
                    {selectedTest.label}
                  </h4>

                  {/* Gancho de vendas */}
                  <p className="text-[15px] font-bold text-soul-terracota mb-4 leading-snug italic">
                    {selectedTest.hook}
                  </p>

                  {/* Descrição persuasiva */}
                  <p className="text-[15px] text-soul-ink/85 leading-relaxed font-medium mb-5">
                    {selectedTest.description}
                  </p>

                  {/* Bullets de benefícios */}
                  <div className="space-y-2.5">
                    {selectedTest.bullets.map((b, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="mt-1 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-white text-[11px] font-bold"
                              style={{ background: 'linear-gradient(135deg, #c4633a, #d4943a)' }}>
                          ✓
                        </span>
                        <p className="text-[14px] text-soul-ink font-semibold leading-snug">{b}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </>
  )
}
