import type { Metadata } from 'next'
import NewAssessmentButton from '../assessments/NewAssessmentButton'
import { getSession } from '@/lib/session'
import { prisma } from '@/lib/prisma'

export const metadata: Metadata = { title: 'Análises Comportamentais' }

interface Lens {
  key: string
  name: string
  tagline: string
  short: string
  credits: number
  pillar: string
  description: string
  application: string
  bullets: string[]
  color: string
  emoji: string
  /** Identificador do teste no NewAssessmentButton (ex: "MBTI", "ENNEAGRAM", "TEMPERAMENT") */
  testType: string
}

// CTA label condicional ao tipo de conta (PJ envia para funcionário, PF faz pra si)
function ctaLabel(accountType: 'PF' | 'PJ', testShort: string): string {
  return accountType === 'PF' ? `Fazer teste ${testShort}` : `Enviar teste ${testShort}`
}

// ═══════════════════════════════════════════════════════════════════
// DISC — Carro chefe. Apresentado separadamente como hero.
// ═══════════════════════════════════════════════════════════════════

const DISC: Lens = {
  key: 'disc',
  testType: 'DISC',
  name: 'DISC — Perfil Comportamental',
  tagline: 'A ferramenta mais usada no mundo corporativo',
  short: 'DISC',
  credits: 1,
  pillar: 'Dominância · Influência · Estabilidade · Conformidade',
  description:
    'O mapa comportamental mais amplamente adotado pelas maiores organizações do mundo. Revela as quatro forças que regem como uma pessoa age no trabalho — como decide sob pressão, comunica, lidera, executa e o que a trava em função. É a lente de entrada para qualquer processo sério de gestão de pessoas.',
  application:
    'Aplicado em processos seletivos, composição de times, planos de desenvolvimento, coaching executivo, treinamentos de liderança e alinhamento cultural. Base obrigatória para RH estratégico.',
  bullets: [
    'Perfil dominante + secundário com cruzamento dos 4 fatores',
    'Indica cargos, funções e ambientes de alta compatibilidade',
    'Aponta pontos cegos e vetores de desenvolvimento',
    'Relatório PDF pronto para devolutiva executiva',
  ],
  color: '#c4633a',
  emoji: '◉',
}

// ═══════════════════════════════════════════════════════════════════
// Lentes complementares
// ═══════════════════════════════════════════════════════════════════

const LENSES: Lens[] = [
  {
    key: 'mbti',
    testType: 'MBTI',
    name: 'MBTI — 16 Tipos de Personalidade',
    tagline: 'Baseado em Carl Jung. Usado por Fortune 500.',
    short: 'MBTI',
    credits: 1,
    pillar: 'Extroversão · Sensação · Pensamento · Julgamento',
    description:
      'Decodifica as preferências cognitivas em 4 dimensões para identificar entre 16 tipos de personalidade. Revela como cada pessoa pensa, decide, se energiza e absorve informação — o sistema operacional cognitivo do colaborador.',
    application:
      'Fundamental para montagem de times complementares, planos de sucessão e coaching executivo de alta profundidade.',
    bullets: [
      '70 questões validadas cientificamente',
      'Tipo dominante, auxiliar, terciário e inferior',
      'Compatibilidades entre os 16 tipos',
      'Aplicação em liderança situacional',
    ],
    color: '#3d4f7c',
    emoji: '◆',
  },
  {
    key: 'enneagram',
    testType: 'ENNEAGRAM',
    name: 'Eneagrama — 9 Tipos',
    tagline: 'Usado pela NASA e pelo Vale do Silício.',
    short: 'Eneagrama',
    credits: 1,
    pillar: '9 tipos · asas · instintos · níveis de saúde',
    description:
      'Vai além do comportamento visível: revela a motivação raiz e o medo nuclear que travam maturidade profissional. Adotado por lideranças de alta complexidade para acelerar desenvolvimento, identificar pontos cegos e direcionar o caminho exato para a versão mais madura da pessoa.',
    application:
      'Executivos, fundadores, líderes em transição. Ferramenta preferida de coaches de alta performance.',
    bullets: [
      '135 afirmações para precisão diagnóstica',
      'Motivação raiz, medo básico e fixação',
      'Asas, instintos e níveis de saúde emocional',
      'Vetores de crescimento e desintegração',
    ],
    color: '#c9a84c',
    emoji: '✧',
  },
  {
    key: 'temperament',
    testType: 'TEMPERAMENT',
    name: '4 Personalidades — Temperamentos',
    tagline: 'A matéria-prima comportamental inata.',
    short: 'Temperamentos',
    credits: 1,
    pillar: 'Colérico · Sanguíneo · Melancólico · Fleumático',
    description:
      'Identifica as quatro inclinações naturais baseadas em Hipócrates — a "matéria-prima" comportamental que nenhum outro teste captura com tanta precisão. Como alguém reage ao mundo de forma inata, antes de qualquer verniz profissional.',
    application:
      'Leitura rápida e precisa para gestores que precisam calibrar pessoas no dia a dia operacional. Ideal como diagnóstico inicial.',
    bullets: [
      'Teste ágil de 25 questões',
      'Perfil primário + secundário',
      'Estilo de trabalho e comunicação',
      'Funções e dinâmicas ideais por temperamento',
    ],
    color: '#7a9e7e',
    emoji: '⬢',
  },
]

// ═══════════════════════════════════════════════════════════════════
// UI
// ═══════════════════════════════════════════════════════════════════

function LensCard({ lens, accountType }: { lens: Lens; accountType: 'PF' | 'PJ' }) {
  return (
    <article className="soul-panel flex flex-col gap-4 h-full relative overflow-hidden">
      <div
        className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-[0.08] pointer-events-none"
        style={{ background: `radial-gradient(circle, ${lens.color}, transparent)`, transform: 'translate(30%,-30%)' }}
      />

      <div className="flex items-start gap-3 relative">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl font-bold flex-shrink-0"
          style={{ background: `${lens.color}22`, color: lens.color }}
        >
          {lens.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-serif text-xl font-semibold text-soul-ink leading-tight">{lens.name}</p>
          <p className="text-[13px] font-semibold text-soul-ink/80 italic mt-0.5">{lens.tagline}</p>
        </div>
      </div>

      <div className="relative">
        <p className="text-[11px] font-bold uppercase tracking-widest text-soul-ink/70 mb-1">Pilares</p>
        <p className="text-[13px] font-semibold text-soul-ink">{lens.pillar}</p>
      </div>

      <p className="text-[14px] text-soul-ink font-medium leading-relaxed relative">
        {lens.description}
      </p>

      <div className="relative">
        <p className="text-[11px] font-bold uppercase tracking-widest text-soul-terracota mb-1">Aplicação corporativa</p>
        <p className="text-[13px] text-soul-ink/90 font-medium leading-snug">{lens.application}</p>
      </div>

      <div className="space-y-1.5 relative">
        {lens.bullets.map((b, i) => (
          <div key={i} className="flex items-start gap-2">
            <span className="mt-1 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 text-white text-[10px] font-bold"
                  style={{ background: lens.color }}>✓</span>
            <p className="text-[13px] text-soul-ink font-semibold leading-snug">{b}</p>
          </div>
        ))}
      </div>

      {/* ── CTA: nomenclatura condicional PJ/PF ── */}
      <div className="relative pt-3 mt-auto border-t border-soul-mist/60 flex items-center justify-between gap-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-soul-ink/55">Investimento</p>
          <p className="font-serif text-lg font-bold text-soul-ink leading-none">
            {lens.credits} <span className="text-[12px] text-soul-ink/60 font-medium">crédito{lens.credits > 1 ? 's' : ''}</span>
          </p>
        </div>
        <NewAssessmentButton initialTestType={lens.testType}>
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
            <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
          </svg>
          {ctaLabel(accountType, lens.short)}
        </NewAssessmentButton>
      </div>
    </article>
  )
}

async function getAccountType(): Promise<'PF' | 'PJ'> {
  const session = await getSession()
  if (!session) return 'PJ' // fallback seguro
  const company = await prisma.company.findUnique({
    where: { id: session.id },
    select: { type: true },
  })
  return (company?.type === 'PF' ? 'PF' : 'PJ')
}

export default async function BehavioralPage() {
  const accountType = await getAccountType()
  const discCtaLabel = ctaLabel(accountType, 'DISC')

  return (
    <div className="space-y-8">

      {/* ── Header ── */}
      <div>
        <span className="inline-block text-[11px] font-bold uppercase tracking-[0.18em] px-3 py-1 rounded-full mb-3"
              style={{ background: 'rgba(196,99,58,0.15)', color: '#a8522e' }}>
          Categoria 1 · Performance
        </span>
        <h1 className="font-serif font-semibold text-4xl md:text-5xl text-soul-ink leading-tight">
          Análises <span className="text-soul-terracota italic font-normal">Comportamentais</span>
        </h1>
        <p className="text-base md:text-lg text-soul-ink/85 mt-3 font-medium max-w-3xl leading-relaxed">
          Quatro lentes clássicas para ler o comportamento no trabalho. Revelam como cada líder e colaborador decide sob pressão, comunica, conduz conflito e sustenta cultura — o material bruto para formar times de alta performance e calibrar lideranças.
        </p>
      </div>

      {/* ── HERO: DISC (carro chefe) ── */}
      <section
        className="relative overflow-hidden rounded-3xl p-7 md:p-10 text-white"
        style={{ background: 'linear-gradient(135deg, #1c1a17 0%, #2a1c15 55%, #3d2517 100%)' }}
      >
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-[0.12] pointer-events-none"
          style={{ background: 'radial-gradient(circle, #c4633a, transparent)', transform: 'translate(25%,-30%)' }}
        />
        <div
          className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-[0.08] pointer-events-none"
          style={{ background: 'radial-gradient(circle, #d4943a, transparent)', transform: 'translate(-25%,30%)' }}
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-8">
          <div>
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.18em] px-3 py-1 rounded-full mb-4"
                  style={{ background: 'rgba(212,184,92,0.22)', color: '#e8c878' }}>
              ✦ Carro chefe · Mais solicitado
            </span>

            <h2 className="font-serif font-semibold text-3xl md:text-4xl leading-tight mb-2">
              {DISC.name}
            </h2>
            <p className="font-display italic text-lg md:text-xl font-semibold text-soul-terracota mb-5"
               style={{ color: '#e8b860' }}>
              {DISC.tagline}
            </p>

            <p className="text-[12px] font-bold uppercase tracking-widest text-white/70 mb-1">Pilares</p>
            <p className="text-[15px] font-semibold text-white/95 mb-5">{DISC.pillar}</p>

            <p className="text-[16px] text-white/90 font-medium leading-relaxed mb-5">
              {DISC.description}
            </p>

            <p className="text-[12px] font-bold uppercase tracking-widest text-soul-gold mb-1">Aplicação corporativa</p>
            <p className="text-[15px] text-white/85 font-medium leading-relaxed">
              {DISC.application}
            </p>
          </div>

          <div className="flex flex-col justify-center">
            <div className="rounded-2xl p-5 mb-5"
                 style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}>
              <p className="text-[12px] font-bold uppercase tracking-widest text-soul-gold mb-3">O que entrega</p>
              <div className="space-y-2.5">
                {DISC.bullets.map((b, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <span className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-white text-[11px] font-bold"
                          style={{ background: 'linear-gradient(135deg, #c4633a, #d4943a)' }}>✓</span>
                    <p className="text-[14px] text-white font-semibold leading-snug">{b}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[12px] font-bold uppercase tracking-widest text-white/60">Investimento</p>
                <p className="font-serif text-3xl font-semibold text-white mt-1">1 <span className="text-lg font-medium text-white/75">crédito</span></p>
              </div>
              <span className="inline-flex items-center rounded-full px-3 py-1.5 text-[12px] font-bold"
                    style={{ background: 'rgba(212,184,92,0.2)', color: '#e8c878' }}>
                ✦ Entrada recomendada
              </span>
            </div>

            <NewAssessmentButton initialTestType="DISC">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
              </svg>
              {discCtaLabel}
            </NewAssessmentButton>
          </div>
        </div>
      </section>

      {/* ── Lentes complementares ── */}
      <section className="space-y-4">
        <div>
          <h2 className="font-serif font-semibold text-2xl md:text-3xl text-soul-ink leading-tight">
            Lentes complementares
          </h2>
          <p className="text-[15px] text-soul-ink/80 font-medium mt-1 max-w-3xl">
            Ferramentas de aprofundamento para casos onde o DISC não responde sozinho. Combine para leituras mais ricas ou use individualmente em diagnósticos específicos.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {LENSES.map((l) => <LensCard key={l.key} lens={l} accountType={accountType} />)}
        </div>
      </section>

      {/* ── CTA final ── */}
      <section
        className="rounded-3xl p-6 md:p-8 flex flex-wrap items-center justify-between gap-4"
        style={{ background: 'linear-gradient(135deg, rgba(196,99,58,0.1), rgba(212,148,58,0.14))', border: '1px solid rgba(196,99,58,0.28)' }}
      >
        <div className="max-w-2xl">
          <p className="font-serif text-xl md:text-2xl font-semibold text-soul-ink leading-tight">
            Quer aplicar mais de uma lente?
          </p>
          <p className="text-[15px] text-soul-ink/85 font-medium mt-1">
            Envie o <strong>Bundle Completo</strong>: DISC + MBTI + Eneagrama + Temperamentos em um único link, com devolutiva integrada cruzando os 4 mapas.
          </p>
        </div>
        <NewAssessmentButton initialCategory="BEHAVIORAL">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
          </svg>
          Nova avaliação
        </NewAssessmentButton>
      </section>
    </div>
  )
}
