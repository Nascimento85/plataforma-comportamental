'use client'

import { ReactNode, useState } from 'react'
import { useRouter } from 'next/navigation'

// ═══════════════════════════════════════════════════════════════
// CATÁLOGO DE TESTES — 3 Categorias Executivas
// ═══════════════════════════════════════════════════════════════

export type CategoryKey = 'ARCHETYPE' | 'BEHAVIORAL' | 'RELATIONSHIPS'

interface TestType {
  value: string
  label: string
  short: string
  category: CategoryKey
  credits: number
  image: string
  hook: string
  description: string
  bullets: string[]
  badge?: string
}

const TEST_TYPES: TestType[] = [
  // ── Categoria 1: Arquétipos ─────────────────────────────────
  {
    value: 'ARCHETYPE',
    label: 'Arquétipos Junguianos — Os 12 Padrões Universais',
    short: 'Arquétipos',
    category: 'ARCHETYPE',
    credits: 2,
    image: '/tests/arquetipo-misto.jpg',
    hook: 'O mapa mais profundo da plataforma.',
    description:
      'Baseado na psicologia analítica de Carl Jung. Identifica qual dos 12 padrões arquetípicos está no comando de uma pessoa — e revela a força-motriz invisível por trás de decisões, liderança e posicionamento. Leitura executiva para fundadores, C-level e líderes em transição de carreira.',
    bullets: [
      'Arquétipo dominante + secundário com leitura integrada',
      'Dom, sombra e jornada de amadurecimento de cada padrão',
      'Aplicação direta em sucessão, coaching e posicionamento de carreira',
    ],
    badge: 'Mais completo',
  },
  {
    value: 'ARCHETYPE_FEMININE',
    label: 'Arquétipos Femininos — As 7 Energias',
    short: 'Arq. Femininos',
    category: 'ARCHETYPE',
    credits: 2,
    image: '/tests/arquetipo-feminino.jpg',
    hook: 'O divino feminino aplicado à liderança.',
    description:
      'Mapeia qual das 7 energias arquetípicas femininas governa o momento atual — Mãe, Virgem, Amazona, Sábia, Mística, Sacerdotisa e Feiticeira. Diagnóstico da energia ativa e da que precisa ser ativada para plenitude de comando. Ferramenta indispensável para programas de liderança feminina.',
    bullets: [
      'Energia dominante + energia a desenvolver no ciclo atual',
      'Leitura integrada com fases profissionais e de carreira',
      'Aplicação em mentoria, coaching e desenvolvimento de líderes mulheres',
    ],
    badge: 'Exclusivo',
  },

  // ── Categoria 2: Análises Comportamentais ───────────────────
  {
    value: 'DISC',
    label: 'DISC — Perfil Comportamental Completo',
    short: 'DISC',
    category: 'BEHAVIORAL',
    credits: 1,
    image: '/tests/disc.jpg',
    hook: 'A ferramenta mais usada no mundo corporativo.',
    description:
      'Revela as quatro forças que regem o comportamento no trabalho — Dominância, Influência, Estabilidade e Conformidade. A lente de entrada para entender como cada pessoa executa, decide sob pressão e o que a trava em função. Base técnica para composição de times e alinhamento de cultura.',
    bullets: [
      'Mapa completo de D, I, S e C com perfil dominante',
      'Indica cargos, funções e ambientes de alta compatibilidade',
      'Relatório PDF pronto para devolutiva executiva',
    ],
  },
  {
    value: 'MBTI',
    label: 'MBTI — 16 Tipos de Personalidade',
    short: 'MBTI',
    category: 'BEHAVIORAL',
    credits: 1,
    image: '/tests/mbti.jpg',
    hook: 'Baseado em Carl Jung. Usado por Fortune 500.',
    description:
      'Decodifica as preferências cognitivas que moldam decisão e comunicação. Identifica 1 entre 16 tipos de personalidade e é a base para alinhar estilos de liderança, montar times complementares e conduzir coaching executivo de alta profundidade.',
    bullets: [
      '70 questões validadas cientificamente',
      'Perfil dominante, auxiliar, terciário e inferior',
      'Aplicação em formação de times e planos de sucessão',
    ],
  },
  {
    value: 'ENNEAGRAM',
    label: 'Eneagrama de Personalidade — Os 9 Tipos',
    short: 'Eneagrama',
    category: 'BEHAVIORAL',
    credits: 1,
    image: '/tests/eneagrama.jpg',
    hook: 'Usado pela NASA e pelo Vale do Silício.',
    description:
      'Vai além do comportamento visível: revela a motivação raiz e o medo nuclear que travam maturidade profissional. Adotado por lideranças de alta complexidade para acelerar desenvolvimento, identificar pontos cegos e direcionar o caminho exato para a versão mais madura do colaborador.',
    bullets: [
      '135 afirmações cruzadas para precisão dos 9 tipos',
      'Motivação raiz, medo básico e vetores de crescimento',
      'Asas, instintos e níveis de saúde emocional',
    ],
  },
  {
    value: 'TEMPERAMENT',
    label: '4 Personalidades — Temperamentos Clássicos',
    short: 'Temperamentos',
    category: 'BEHAVIORAL',
    credits: 1,
    image: '/tests/temperamentos.jpg',
    hook: 'A matéria-prima comportamental inata.',
    description:
      'Identifica as quatro inclinações naturais — Colérico, Sanguíneo, Melancólico e Fleumático — que determinam como uma pessoa reage, comunica e ocupa espaço em um time. Leitura rápida e precisa para gestores que precisam calibrar pessoas no dia a dia operacional.',
    bullets: [
      'Teste ágil e de leitura imediata (25 questões)',
      'Perfil primário + secundário com estilo de trabalho e comunicação',
      'Indica funções e dinâmicas ideais para cada temperamento',
    ],
  },
  {
    value: 'BUNDLE_4',
    label: 'Bundle Completo — 4 Testes Comportamentais',
    short: 'Bundle 4',
    category: 'BEHAVIORAL',
    credits: 4,
    image: '/tests/disc.jpg',
    hook: 'O raio-X comportamental definitivo. Um link, quatro testes.',
    description:
      'DISC, MBTI, Eneagrama e 4 Temperamentos em um único envio. O colaborador responde os 4 testes em sequência e você recebe uma devolutiva integrada gerada por IA que cruza os 4 mapas. Ideal para avaliação de executivos, processos de sucessão e contratações-chave.',
    bullets: [
      'Um único link — os 4 testes em sequência',
      'Relatório integrado gerado por IA cruzando os perfis',
      'Economia de 20% comparado ao envio individual',
    ],
    badge: 'Mais completo',
  },

  // ── Categoria: Vida Pessoal · Casais · Família ───────────────
  {
    value: 'LOVE_LANGUAGES',
    label: 'As 5 Linguagens do Amor — Gary Chapman',
    short: 'Ling. do Amor',
    category: 'RELATIONSHIPS',
    credits: 4,
    image: '/tests/linguagens-amor.jpg',
    hook: 'Como você ama — e como precisa ser amado.',
    description:
      'Baseado no best-seller mundial de Gary Chapman. Identifica como cada pessoa recebe amor: palavras de afirmação, tempo de qualidade, presentes, atos de serviço ou toque físico. Responde à pergunta mais comum dos relacionamentos: por que às vezes eu faço tudo e a pessoa que amo não se sente amada? É porque estou falando em uma língua que ela não entende.',
    bullets: [
      'Ranking completo das 5 linguagens com percentuais',
      'Linguagem primária + secundária de cada pessoa',
      'Aplicação em casais, família e relações pessoais',
    ],
  },
]

const CATEGORY_META: Record<CategoryKey, { title: string; subtitle: string }> = {
  ARCHETYPE: {
    title: 'Arquétipos',
    subtitle: 'O mapa profundo da motivação',
  },
  BEHAVIORAL: {
    title: 'Análises Comportamentais',
    subtitle: 'Foco em performance e produtividade',
  },
  RELATIONSHIPS: {
    title: 'Linguagem do Amor',
    subtitle: 'Casais, família e vida pessoal',
  },
}

// Ordem corporativa: Performance (DISC = carro chefe) → Cultura (Linguagem = campeão) → Profundidade (Arquétipos = premium)
const CATEGORY_ORDER: CategoryKey[] = ['BEHAVIORAL', 'RELATIONSHIPS', 'ARCHETYPE']

// ═══════════════════════════════════════════════════════════════
// Componente
// ═══════════════════════════════════════════════════════════════

interface SuccessState {
  link: string
  emailSent: boolean
  employeeEmail: string
}

interface Props {
  children?: ReactNode
  variant?: 'primary' | 'secondary'
  /** Pré-seleciona a primeira avaliação da categoria ao abrir o modal */
  initialCategory?: CategoryKey
}

export default function NewAssessmentButton({ children, variant = 'primary', initialCategory }: Props) {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  // Default corporativo: DISC (carro chefe). Se initialCategory for passado, usa o primeiro teste da categoria.
  const defaultTest =
    (initialCategory && TEST_TYPES.find((t) => t.category === initialCategory)?.value) ?? 'DISC'

  const [form, setForm] = useState({
    employeeName: '',
    employeeEmail: '',
    testType: defaultTest,
  })
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
    setForm({ employeeName: '', employeeEmail: '', testType: defaultTest })
  }

  function handleOpen() {
    setForm((prev) => ({ ...prev, testType: defaultTest }))
    setOpen(true)
  }

  const triggerClasses = variant === 'secondary'
    ? 'inline-flex items-center gap-2 px-5 py-3 rounded-full text-[14px] font-sans font-bold border-2 transition-all'
    : 'inline-flex items-center gap-2 px-5 py-3 rounded-full text-[14px] font-sans font-bold text-white transition-all duration-200 hover:-translate-y-px shadow-terra'

  const triggerStyle = variant === 'secondary'
    ? { borderColor: 'rgba(196,99,58,0.45)', color: '#a8522e' }
    : { background: 'linear-gradient(135deg, #c4633a, #d4943a)' }

  return (
    <>
      <button onClick={handleOpen} className={triggerClasses} style={triggerStyle}>
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
            className="bg-white rounded-3xl shadow-soul-xl w-full max-w-5xl my-auto"
            style={{ border: '1px solid rgba(232,226,214,0.6)' }}
          >
            {success ? (
              /* ──────────────── Sucesso ──────────────── */
              <div className="p-6 md:p-10 text-center">
                <div className="text-6xl mb-5">✨</div>
                <h3 className="font-serif font-semibold text-3xl md:text-4xl text-soul-ink mb-3 leading-tight">
                  Avaliação criada com sucesso!
                </h3>
                <p className="text-[16px] text-soul-ink font-medium mb-6 max-w-lg mx-auto">
                  O link único foi gerado e está pronto para ser enviado ao candidato.
                </p>

                {success.emailSent ? (
                  <div className="flex items-center justify-center gap-2 rounded-2xl px-5 py-4 mb-6 text-[15px] font-sans font-semibold"
                       style={{ background: 'rgba(122,158,126,0.18)', border: '1px solid rgba(122,158,126,0.4)', color: '#2f5c33' }}>
                    <span className="text-xl">📧</span>
                    <span>E-mail enviado para <strong>{success.employeeEmail}</strong></span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2 rounded-2xl px-5 py-4 mb-6 text-[15px] font-sans font-semibold"
                       style={{ background: 'rgba(212,148,58,0.15)', border: '1px solid rgba(212,148,58,0.4)', color: '#7a4f17' }}>
                    <span className="text-xl">⚠</span>
                    <span>E-mail não enviado — compartilhe o link manualmente</span>
                  </div>
                )}

                <p className="text-[13px] font-bold uppercase tracking-widest text-soul-ink/75 mb-2">Link do teste</p>
                <div className="rounded-2xl p-4 text-[13px] font-mono break-all text-soul-ink mb-6 text-left font-semibold"
                     style={{ background: 'rgba(232,226,214,0.5)', border: '1px solid rgba(232,226,214,0.9)' }}>
                  {success.link}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleCopy}
                    className="flex-1 py-3 rounded-full text-[14px] font-sans font-bold border-2 transition-all"
                    style={{ borderColor: 'rgba(196,99,58,0.5)', color: '#a8522e' }}
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

                {/* ── Coluna esquerda: formulário + categorias ── */}
                <div className="lg:w-[46%] p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-soul-mist/70">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="font-serif font-semibold text-2xl md:text-3xl text-soul-ink leading-tight">
                        Nova avaliação
                      </h3>
                      <p className="text-[14px] text-soul-ink/80 font-medium mt-1">
                        Envie um teste em menos de 30 segundos.
                      </p>
                    </div>
                    <button
                      onClick={handleClose}
                      className="w-9 h-9 rounded-full flex items-center justify-center text-soul-ink/70 hover:text-soul-ink hover:bg-soul-mist/60 transition-all text-2xl leading-none font-medium"
                      aria-label="Fechar"
                    >
                      ×
                    </button>
                  </div>

                  <form onSubmit={handleCreate} className="space-y-5">
                    {error && (
                      <div className="rounded-2xl px-4 py-3 text-[14px] font-sans font-semibold"
                           style={{ background: 'rgba(196,122,114,0.15)', border: '1px solid rgba(196,122,114,0.45)', color: '#7a3d35' }}>
                        {error}
                      </div>
                    )}

                    <div>
                      <label className="block text-[12px] font-sans font-bold text-soul-ink/80 uppercase tracking-widest mb-2">
                        Nome do candidato
                      </label>
                      <input
                        type="text" required value={form.employeeName}
                        onChange={(e) => update('employeeName', e.target.value)}
                        className="soul-input text-[15px] font-semibold py-3.5" placeholder="João Silva"
                      />
                    </div>

                    <div>
                      <label className="block text-[12px] font-sans font-bold text-soul-ink/80 uppercase tracking-widest mb-2">
                        E-mail do candidato
                      </label>
                      <input
                        type="email" required value={form.employeeEmail}
                        onChange={(e) => update('employeeEmail', e.target.value)}
                        className="soul-input text-[15px] font-semibold py-3.5" placeholder="joao@empresa.com"
                      />
                    </div>

                    <div>
                      <label className="block text-[12px] font-sans font-bold text-soul-ink/80 uppercase tracking-widest mb-3">
                        Categoria e avaliação
                      </label>

                      <div className="space-y-4">
                        {CATEGORY_ORDER.map((catKey) => {
                          const meta = CATEGORY_META[catKey]
                          const tests = TEST_TYPES.filter((t) => t.category === catKey)
                          return (
                            <div key={catKey}>
                              <div className="flex items-baseline justify-between mb-2">
                                <p className="font-serif text-[15px] font-semibold text-soul-ink leading-tight">
                                  {meta.title}
                                </p>
                                <span className="text-[11px] font-bold uppercase tracking-widest text-soul-terracota">
                                  {tests.length} {tests.length === 1 ? 'teste' : 'testes'}
                                </span>
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                {tests.map((t) => {
                                  const active = form.testType === t.value
                                  return (
                                    <button
                                      key={t.value}
                                      type="button"
                                      onClick={() => update('testType', t.value)}
                                      className="relative text-left rounded-2xl p-3 transition-all duration-150"
                                      style={{
                                        border: active ? '2px solid #c4633a' : '1.5px solid rgba(232,226,214,1)',
                                        background: active ? 'rgba(196,99,58,0.08)' : 'white',
                                      }}
                                    >
                                      {t.badge && (
                                        <span className="absolute top-1.5 right-1.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full font-sans"
                                              style={{ background: 'rgba(212,148,58,0.25)', color: '#7a4f17' }}>
                                          {t.badge}
                                        </span>
                                      )}
                                      <p className="text-[14px] font-bold mb-0.5 font-sans leading-tight"
                                         style={{ color: active ? '#a8522e' : '#1c1a17' }}>
                                        {t.short}
                                      </p>
                                      <p className="text-[12px] font-sans font-semibold" style={{ color: 'rgba(28,26,23,0.75)' }}>
                                        {t.credits === 1 ? '1 crédito' : `${t.credits} créditos`}
                                      </p>
                                    </button>
                                  )
                                })}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button
                        type="button" onClick={handleClose}
                        className="flex-1 py-3 rounded-full text-[14px] font-sans font-bold border-2 transition-all"
                        style={{ borderColor: 'rgba(28,26,23,0.25)', color: 'rgba(28,26,23,0.85)' }}
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
                <div className="lg:w-[54%] p-6 md:p-8 relative overflow-hidden"
                     style={{ background: 'linear-gradient(180deg, #faf7f2 0%, #f0ebdf 100%)' }}>

                  {/* Imagem */}
                  <div className="rounded-2xl overflow-hidden mb-5 border border-soul-mist">
                    <img
                      src={selectedTest.image}
                      alt={selectedTest.label}
                      className="w-full object-cover"
                      style={{ maxHeight: '180px', objectPosition: 'center center' }}
                    />
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="inline-flex items-center rounded-full px-3 py-1 text-[12px] font-bold"
                          style={{ background: 'rgba(196,99,58,0.15)', color: '#a8522e' }}>
                      {selectedTest.credits} crédito{selectedTest.credits > 1 ? 's' : ''}
                    </span>
                    <span className="inline-flex items-center rounded-full px-3 py-1 text-[12px] font-bold uppercase tracking-wider"
                          style={{ background: 'rgba(28,26,23,0.1)', color: '#1c1a17' }}>
                      {CATEGORY_META[selectedTest.category].title}
                    </span>
                    {selectedTest.badge && (
                      <span className="inline-flex items-center rounded-full px-3 py-1 text-[12px] font-bold"
                            style={{ background: 'rgba(212,148,58,0.22)', color: '#7a4f17' }}>
                        ✦ {selectedTest.badge}
                      </span>
                    )}
                  </div>

                  {/* Nome completo */}
                  <h4 className="font-serif font-semibold text-[22px] md:text-[26px] text-soul-ink leading-tight mb-2">
                    {selectedTest.label}
                  </h4>

                  {/* Gancho */}
                  <p className="text-[15px] font-bold text-soul-terracota mb-4 leading-snug italic">
                    {selectedTest.hook}
                  </p>

                  {/* Descrição executiva */}
                  <p className="text-[15px] text-soul-ink leading-relaxed font-medium mb-5">
                    {selectedTest.description}
                  </p>

                  {/* Bullets */}
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
