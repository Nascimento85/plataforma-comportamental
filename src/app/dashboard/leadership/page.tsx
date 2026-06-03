import type { Metadata } from 'next'
import NewAssessmentButton from '../assessments/NewAssessmentButton'
import SelfStartTestButton from '../assessments/SelfStartTestButton'
import { getSession } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import { TEST_PRICE } from '@/lib/passport'

export const metadata: Metadata = { title: 'Testes de Liderança' }

interface LeadershipLens {
  key:         string
  testType:    string
  name:        string
  tagline:     string
  short:       string
  credits:     number
  pillar:      string
  description: string
  application: string
  bullets:     string[]
  color:       string
  emoji:       string
}

function ctaLabel(accountType: 'PF' | 'PJ', testShort: string): string {
  return accountType === 'PF' ? `Fazer teste ${testShort}` : `Enviar teste ${testShort}`
}

// ═══════════════════════════════════════════════════════════════════
// Testes de Liderança
// ═══════════════════════════════════════════════════════════════════

const LEADERSHIP_TESTS: LeadershipLens[] = [
  {
    key: 'big-five',
    testType: 'BIG_FIVE',
    name: 'Big Five — Estilo de Liderança',
    tagline: 'A ciência por trás do seu jeito de liderar. Usado por Google, McKinsey e Hogan.',
    short: 'Big Five',
    credits: TEST_PRICE.BIG_FIVE,
    pillar: 'Influência · Empatia · Execução · Estabilidade · Inovação',
    description:
      'O Big Five é o modelo de personalidade mais cientificamente validado do mundo. Esta versão Liderança traduz os 5 fatores em 4 arquétipos corporativos (Inovador, Executor, Humano, Especialista) e entrega um plano de ação concreto para o próximo trimestre.',
    application:
      'Planos de sucessão (Succession Planning), assessments de promoção, mapeamento de high potentials, alocação de gestores por arquétipo (Inovador para inovação, Executor para operações, Humano para CS, Especialista para áreas técnicas) e PDIs com Superpoderes, Pontos Cegos e ações trimestrais prontos.',
    bullets: [
      'Teste com 44 questões validadas',
      'Cálculo científico com inversão de itens',
      '4 arquétipos comerciais de liderança',
      'Devolutiva consultiva com cruzamento de dados',
    ],
    color: '#3d4f7c',
    emoji: '🎯',
  },
]

// ═══════════════════════════════════════════════════════════════════
// UI
// ═══════════════════════════════════════════════════════════════════

function LeadershipCard({ lens, accountType }: { lens: LeadershipLens; accountType: 'PF' | 'PJ' }) {
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
        <p className="text-[11px] font-bold uppercase tracking-widest text-soul-ink/70 mb-1">Fatores avaliados</p>
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

      <div className="relative pt-3 mt-auto border-t border-soul-mist/60 space-y-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-soul-ink/55">Investimento</p>
          <p className="font-serif text-lg font-bold text-soul-ink leading-none">
            {lens.credits} <span className="text-[12px] text-soul-ink/60 font-medium">crédito{lens.credits > 1 ? 's' : ''}</span>
          </p>
        </div>
        <div className="space-y-2">
          <SelfStartTestButton testType={lens.testType} label={`Fazer ${lens.short} agora`} fullWidth />
          <NewAssessmentButton initialTestType={lens.testType} variant="secondary" fullWidth>
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
              <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
            </svg>
            {ctaLabel(accountType, lens.short)}
          </NewAssessmentButton>
        </div>
      </div>
    </article>
  )
}

// ═══════════════════════════════════════════════════════════════════
// Página
// ═══════════════════════════════════════════════════════════════════

export default async function LeadershipPage() {
  const session = await getSession()
  const company = await prisma.company.findUnique({
    where: { id: session!.id },
    select: { type: true },
  })
  const accountType: 'PF' | 'PJ' = (company?.type as 'PF' | 'PJ' | undefined) ?? 'PJ'

  return (
    <div className="space-y-8">
      {/* Header */}
      <header className="space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-widest"
             style={{ background: 'rgba(61,79,124,0.10)', color: '#3d4f7c' }}>
          🎯 Liderança
        </div>
        <h1 className="font-serif text-3xl md:text-4xl font-semibold text-soul-ink leading-tight">
          Testes de Liderança e Gestão
        </h1>
        <p className="text-[15px] text-soul-ink/80 font-medium max-w-3xl">
          Ferramentas voltadas para mapeamento de estilos de liderança, planos de sucessão e desenvolvimento de gestores. Cada teste cruza fatores científicos em arquétipos comerciais de alta clareza para o RH executivo.
        </p>
      </header>

      {/* Grid de testes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {LEADERSHIP_TESTS.map((lens) => (
          <LeadershipCard key={lens.key} lens={lens} accountType={accountType} />
        ))}
      </div>

      {/* Card "Em breve" */}
      <div className="soul-panel relative overflow-hidden"
           style={{ background: 'linear-gradient(135deg, rgba(232,226,214,0.4), rgba(245,240,232,0.7))', border: '1px dashed rgba(122,158,126,0.4)' }}>
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-xl"
               style={{ background: 'rgba(122,158,126,0.15)', color: '#5a7e60' }}>
            ✨
          </div>
          <div>
            <p className="font-serif text-lg font-semibold text-soul-ink">Em breve, mais testes de liderança</p>
            <p className="text-[13.5px] text-soul-ink/75 font-medium leading-snug mt-1">
              Estamos preparando inventários complementares de gestão executiva, prontidão para promoção e diagnósticos 360 graus. Acompanhe esta área para novidades.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
