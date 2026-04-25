import type { Metadata } from 'next'
import NewAssessmentButton from '../assessments/NewAssessmentButton'

export const metadata: Metadata = { title: 'Carreira & Performance' }

interface CareerTest {
  key: string
  name: string
  tagline: string
  description: string
  application: string
  bullets: string[]
  image: string
  credits: number
  color: string
  emoji: string
  badge?: string
}

const TESTS: CareerTest[] = [
  {
    key: 'CAREER_ANCHOR',
    name: 'Âncoras de Carreira',
    tagline: 'Edgar Schein · MIT · 1970',
    description:
      'Identifica os valores profissionais inegociáveis que sustentam suas decisões de longo prazo. As 8 âncoras clássicas de Schein revelam o que motiva, energiza e sustenta um profissional em sua trajetória — e o que faz alguém abandonar a carreira mesmo bem remunerado.',
    application:
      'Aplicado em PDI, retenção de talentos, planos de sucessão, recrutamento estratégico e mentoria. Fundamental para gestão de carreira realista e processos de transição profissional.',
    bullets: [
      '40 afirmações cobrindo as 8 âncoras (Técnica, Gerência, Autonomia, Segurança, Empreendedorismo, Serviço, Desafio, Estilo de Vida)',
      'Âncora primária + secundária com leitura integrada',
      'Estratégias práticas de gestão por âncora — como liderar cada perfil',
    ],
    image: '/tests/ancora-carreira.png',
    credits: 1,
    color: '#3d4f7c',
    emoji: '⚓',
    badge: 'Schein/MIT',
  },
  {
    key: 'EMOTIONAL_INTELLIGENCE',
    name: 'Inteligência Emocional',
    tagline: 'Daniel Goleman · 5 Domínios',
    description:
      'Baseado no modelo clássico de Goleman, avalia os 5 domínios da Inteligência Emocional: Autoconsciência, Autorregulação, Motivação, Empatia e Habilidades Sociais. Resultado em radar de competências revelando força emocional dominante e o vetor prioritário de desenvolvimento.',
    application:
      'Aplicado em formação de lideranças, processos de coaching executivo, fit cultural em recrutamento, gestão de conflitos e desenvolvimento de soft skills.',
    bullets: [
      '25 questões cobrindo os 5 domínios de Goleman',
      'Radar de competências com pontuação por dimensão',
      'Identifica força emocional dominante + vetor de desenvolvimento prioritário',
    ],
    image: '/tests/inteligencia-emocional.png',
    credits: 1,
    color: '#c4633a',
    emoji: '◈',
    badge: 'Goleman',
  },
]

export default function CareerPage() {
  return (
    <div className="space-y-8">

      {/* ── Header ── */}
      <div>
        <span className="inline-block text-[11px] font-bold uppercase tracking-[0.18em] px-3 py-1 rounded-full mb-3"
              style={{ background: 'rgba(61,79,124,0.14)', color: '#2d3f6b' }}>
          Carreira &amp; Performance
        </span>
        <h1 className="font-serif font-semibold text-4xl md:text-5xl text-soul-ink leading-tight">
          Mapeie a <span className="italic text-gold-gradient" style={{ background: 'linear-gradient(135deg, #c5a059 0%, #a8843a 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>essência profissional</span> da sua equipe.
        </h1>
        <p className="text-base md:text-lg text-soul-ink/85 mt-3 font-medium max-w-3xl leading-relaxed">
          Duas ferramentas científicas para entender o que motiva, retém e desenvolve profissionais.
          Aplicação direta em PDI, sucessão, recrutamento estratégico e formação de lideranças.
        </p>
      </div>

      {/* ── 2 Testes em destaque ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {TESTS.map((test) => (
          <article key={test.key} className="soul-panel flex flex-col overflow-hidden p-0">
            {/* Imagem */}
            <div className="relative h-56 overflow-hidden" style={{ background: `${test.color}11` }}>
              <img
                src={test.image}
                alt={test.name}
                className="w-full h-full object-cover"
                style={{ objectPosition: 'center center' }}
              />
              {test.badge && (
                <span className="absolute top-3 right-3 inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold backdrop-blur-md"
                      style={{ background: 'rgba(255,255,255,0.85)', color: test.color, border: `1px solid ${test.color}40` }}>
                  ✦ {test.badge}
                </span>
              )}
            </div>

            {/* Conteúdo */}
            <div className="p-6 md:p-7 flex flex-col gap-4 flex-1">
              <div>
                <p className="text-[12px] font-bold uppercase tracking-widest mb-1" style={{ color: test.color }}>
                  {test.tagline}
                </p>
                <h2 className="font-serif text-2xl md:text-3xl font-semibold text-soul-ink leading-tight">
                  {test.name}
                </h2>
              </div>

              <p className="text-[15px] text-soul-ink font-medium leading-relaxed">
                {test.description}
              </p>

              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-soul-terracota mb-1.5">
                  Aplicação corporativa
                </p>
                <p className="text-[14px] text-soul-ink/85 font-medium leading-snug">
                  {test.application}
                </p>
              </div>

              <div className="space-y-2 pt-1">
                {test.bullets.map((b, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <span className="mt-1 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-white text-[11px] font-bold"
                          style={{ background: test.color }}>✓</span>
                    <p className="text-[13px] text-soul-ink font-semibold leading-snug">{b}</p>
                  </div>
                ))}
              </div>

              <div className="mt-auto pt-4 flex items-center justify-between border-t border-soul-mist/60">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-soul-ink/65">Investimento</p>
                  <p className="font-serif text-2xl font-semibold text-soul-ink">
                    {test.credits} <span className="text-base font-medium text-soul-ink/70">crédito{test.credits > 1 ? 's' : ''}</span>
                  </p>
                </div>
                <NewAssessmentButton initialCategory="CAREER">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
                  </svg>
                  Enviar teste
                </NewAssessmentButton>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* ── Bloco de valor ── */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="soul-panel">
          <div className="text-3xl mb-2">🎯</div>
          <p className="font-serif text-lg font-semibold text-soul-ink">Diagnóstico de carreira</p>
          <p className="text-[14px] text-soul-ink/85 font-medium mt-1.5 leading-relaxed">
            Identifica âncoras profissionais e desbloqueia conversas honestas sobre o que move cada colaborador.
          </p>
        </div>
        <div className="soul-panel">
          <div className="text-3xl mb-2">📊</div>
          <p className="font-serif text-lg font-semibold text-soul-ink">Radar de soft skills</p>
          <p className="text-[14px] text-soul-ink/85 font-medium mt-1.5 leading-relaxed">
            Visualize claramente os 5 domínios de inteligência emocional — onde a equipe é forte e onde precisa investir.
          </p>
        </div>
        <div className="soul-panel">
          <div className="text-3xl mb-2">📈</div>
          <p className="font-serif text-lg font-semibold text-soul-ink">Retenção de talentos</p>
          <p className="text-[14px] text-soul-ink/85 font-medium mt-1.5 leading-relaxed">
            Reduza turnover alinhando funções, benefícios e PDI ao que cada profissional realmente valoriza.
          </p>
        </div>
      </section>

      {/* ── CTA final ── */}
      <section
        className="rounded-3xl p-6 md:p-8 flex flex-wrap items-center justify-between gap-4"
        style={{ background: 'linear-gradient(135deg, rgba(61,79,124,0.1), rgba(196,99,58,0.12))', border: '1px solid rgba(61,79,124,0.28)' }}
      >
        <div className="max-w-2xl">
          <p className="font-serif text-xl md:text-2xl font-semibold text-soul-ink leading-tight">
            Combine os dois testes para uma leitura completa.
          </p>
          <p className="text-[15px] text-soul-ink/85 font-medium mt-1">
            <strong>Âncora de Carreira</strong> revela o &ldquo;o quê&rdquo; (o que motiva).
            <strong> Inteligência Emocional</strong> revela o &ldquo;como&rdquo; (como entrega).
            Juntos, formam o mapa executivo mais completo da plataforma.
          </p>
        </div>
        <NewAssessmentButton initialCategory="CAREER">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
          </svg>
          Iniciar mapeamento
        </NewAssessmentButton>
      </section>
    </div>
  )
}
