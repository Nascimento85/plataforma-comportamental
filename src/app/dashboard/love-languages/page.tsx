import type { Metadata } from 'next'
import NewAssessmentButton from '../assessments/NewAssessmentButton'

export const metadata: Metadata = { title: 'Linguagem do Amor' }

interface Language {
  key: string
  name: string
  subtitle: string
  description: string
  example: string
  dayToDay: string
  color: string
  emoji: string
}

const LANGUAGES: Language[] = [
  {
    key: 'words',
    name: 'Palavras de Afirmação',
    subtitle: 'O amor dito em voz alta',
    description:
      'Para essa pessoa, ouvir "eu te amo", "você é incrível", "me orgulho de você" preenche o tanque emocional. Um elogio sincero vale mais que qualquer presente. O silêncio, por outro lado, fere — ela precisa escutar.',
    example:
      'Um bilhete deixado no espelho pela manhã. Um "você está linda hoje" antes da pessoa sair. Um "obrigado por tudo que você faz" no jantar.',
    dayToDay:
      'Verbalize o que você sente. Escreva. Envie mensagens de carinho no meio do dia. Elogie especificamente — não genericamente.',
    color: '#c4633a',
    emoji: '◈',
  },
  {
    key: 'time',
    name: 'Tempo de Qualidade',
    subtitle: 'Presença sem distração',
    description:
      'Para essa pessoa, estar junto de verdade é o idioma do amor. Não basta dividir o sofá — precisa dividir atenção plena. Celular no bolso, TV desligada, olhos nos olhos. A sensação de ser prioridade.',
    example:
      'Um jantar romântico sem celular. Uma caminhada longa conversando sobre a vida. Um fim de semana só a dois, sem agenda.',
    dayToDay:
      'Desligue o telefone nos encontros. Marque tempo exclusivo semanalmente. Escute sem interromper. Esteja realmente presente.',
    color: '#7a9e7e',
    emoji: '◉',
  },
  {
    key: 'gifts',
    name: 'Presentes',
    subtitle: 'A lembrança feita objeto',
    description:
      'O valor material não importa — o que importa é ter sido lembrado. Uma flor comprada no caminho, um chocolate favorito, uma lembrancinha de viagem. O presente é a prova física de que a pessoa pensou no outro.',
    example:
      'A flor comprada na esquina voltando do trabalho. O livro do autor preferido. A lembrança trazida de uma viagem sem aviso.',
    dayToDay:
      'Observe o que a pessoa curte. Surpreenda sem motivo especial. O gesto importa mais que o valor — um bilhete dentro da marmita já conta.',
    color: '#c9a84c',
    emoji: '✦',
  },
  {
    key: 'service',
    name: 'Atos de Serviço',
    subtitle: 'Amor que se traduz em ação',
    description:
      'Para essa pessoa, amor é visto, não dito. É o café preparado antes dela acordar, a roupa lavada, o problema resolvido sem precisar pedir. Ações falam muito mais alto que qualquer declaração.',
    example:
      'Cozinhar o prato preferido sem avisar. Lavar o carro da pessoa. Resolver uma pendência que estava pesando na cabeça dela.',
    dayToDay:
      'Observe o que pesa no dia dela. Faça sem ser pedido. Pequenos cuidados cotidianos valem mais que grandes gestos raros.',
    color: '#3d4f7c',
    emoji: '⬡',
  },
  {
    key: 'touch',
    name: 'Toque Físico',
    subtitle: 'O amor no corpo',
    description:
      'Mãos dadas, abraços apertados, carinho na nuca, o beijo sem hora marcada. Para essa pessoa, o contato físico é canal direto de amor. Um toque vale mais do que mil palavras — e a ausência dele machuca mais do que uma discussão.',
    example:
      'Segurar a mão ao andar na rua. Abraçar por trás enquanto cozinha. Um beijo demorado antes de sair para o trabalho.',
    dayToDay:
      'Toque com frequência — não só em momentos de intimidade. Abraços, carinho casual, contato físico cotidiano alimentam o tanque.',
    color: '#c47a72',
    emoji: '◎',
  },
]

export default function LoveLanguagesPage() {
  return (
    <div className="space-y-8">

      {/* ── Header ── */}
      <div>
        <span className="inline-block text-[11px] font-bold uppercase tracking-[0.18em] px-3 py-1 rounded-full mb-3"
              style={{ background: 'rgba(196,122,114,0.18)', color: '#7a3d35' }}>
          Vida Pessoal · Casais · Família
        </span>
        <h1 className="font-serif font-semibold text-4xl md:text-5xl text-soul-ink leading-tight">
          As 5 <span className="italic font-normal" style={{ color: '#9b4d43' }}>Linguagens</span> do Amor
        </h1>
        <p className="font-display italic text-lg md:text-xl font-semibold mt-2" style={{ color: '#9b4d43' }}>
          &ldquo;Cada pessoa recebe amor de um jeito diferente — e ninguém te contou o seu.&rdquo;
        </p>
        <p className="text-base md:text-lg text-soul-ink/85 mt-4 font-medium max-w-3xl leading-relaxed">
          Baseado no best-seller mundial de Gary Chapman. Este teste responde à pergunta mais frequente em qualquer relação:
          <strong> &ldquo;por que às vezes eu faço tudo pela pessoa que amo e ela não se sente amada?&rdquo;</strong>
          A resposta é simples — você está falando amor em uma língua que ela não entende.
        </p>
      </div>

      {/* ── HERO: Venda do teste ── */}
      <section
        className="relative overflow-hidden rounded-3xl p-7 md:p-10"
        style={{
          background: 'linear-gradient(135deg, #faf5f4 0%, #f0dcd6 60%, #e8c8c0 100%)',
          border: '1px solid rgba(196,122,114,0.35)',
        }}
      >
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-[0.16] pointer-events-none"
          style={{ background: 'radial-gradient(circle, #c47a72, transparent)', transform: 'translate(25%,-30%)' }}
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-8">
          <div>
            <span className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4"
                  style={{ background: '#9b4d43', color: 'white' }}>
              ♥ Baseado em Gary Chapman
            </span>

            <h2 className="font-serif font-semibold text-3xl md:text-4xl leading-tight text-soul-ink mb-3">
              Descubra como você ama — e como precisa ser amado.
            </h2>

            <p className="text-[16px] text-soul-ink font-medium leading-relaxed mb-5">
              Gary Chapman descobriu que existem apenas <strong>5 linguagens do amor</strong>, e cada pessoa tem uma primária.
              Quando você ama em uma linguagem e sua parceria recebe em outra, o amor existe — mas não chega.
              Esse teste revela qual é a sua, qual é a dela, e abre o canal de verdade.
            </p>

            <p className="text-[15px] text-soul-ink/85 font-medium leading-relaxed mb-5">
              Transforma relacionamentos reais: casais que se reconectam, filhos que se sentem vistos,
              amigos que finalmente entendem uns aos outros. Um teste que muda a forma como você se relaciona.
            </p>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/70 rounded-2xl p-4 border border-white">
                <p className="text-[11px] font-bold uppercase tracking-widest text-soul-ink/75">Para casais</p>
                <p className="text-[14px] font-semibold text-soul-ink mt-1 leading-snug">
                  Reconectar afeto, encerrar mal-entendidos crônicos
                </p>
              </div>
              <div className="bg-white/70 rounded-2xl p-4 border border-white">
                <p className="text-[11px] font-bold uppercase tracking-widest text-soul-ink/75">Para família</p>
                <p className="text-[14px] font-semibold text-soul-ink mt-1 leading-snug">
                  Saber como cada filho, irmão ou pai recebe amor
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <div className="rounded-2xl p-5 mb-5 bg-white/80 border border-white">
              <p className="text-[12px] font-bold uppercase tracking-widest mb-3" style={{ color: '#9b4d43' }}>
                O que o relatório entrega
              </p>
              <div className="space-y-2.5">
                {[
                  'Ranking das 5 linguagens com percentuais',
                  'Linguagem primária + secundária',
                  'Como você prefere receber amor',
                  'Guia prático de como amar cada linguagem',
                ].map((b, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <span className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-white text-[11px] font-bold"
                          style={{ background: '#c47a72' }}>♥</span>
                    <p className="text-[14px] text-soul-ink font-semibold leading-snug">{b}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[12px] font-bold uppercase tracking-widest text-soul-ink/75">Investimento</p>
                <p className="font-serif text-3xl font-semibold text-soul-ink mt-1">4 <span className="text-lg font-medium text-soul-ink/75">créditos</span></p>
              </div>
              <span className="inline-flex items-center rounded-full px-3 py-1.5 text-[12px] font-bold"
                    style={{ background: 'rgba(155,77,67,0.15)', color: '#9b4d43' }}>
                ♥ Premium
              </span>
            </div>

            <NewAssessmentButton initialCategory="RELATIONSHIPS">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
              </svg>
              Descobrir minha linguagem
            </NewAssessmentButton>
          </div>
        </div>
      </section>

      {/* ── As 5 Linguagens detalhadas ── */}
      <section className="space-y-5">
        <div>
          <h2 className="font-serif font-semibold text-2xl md:text-3xl text-soul-ink leading-tight">
            As 5 Linguagens — como cada pessoa recebe amor
          </h2>
          <p className="text-[15px] text-soul-ink/80 font-medium mt-1 max-w-3xl">
            Descubra aqui como cada linguagem se manifesta no dia a dia. Entenda a sua — e principalmente a de quem você ama.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {LANGUAGES.map((l) => (
            <article key={l.key} className="soul-panel flex flex-col gap-4 relative overflow-hidden">
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-[0.08] pointer-events-none"
                style={{ background: `radial-gradient(circle, ${l.color}, transparent)`, transform: 'translate(30%,-30%)' }}
              />

              <div className="flex items-start gap-3 relative">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl font-bold flex-shrink-0"
                  style={{ background: `${l.color}22`, color: l.color }}
                >
                  {l.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-serif text-xl font-semibold text-soul-ink leading-tight">{l.name}</p>
                  <p className="text-[13px] font-bold italic mt-0.5" style={{ color: l.color }}>
                    {l.subtitle}
                  </p>
                </div>
              </div>

              <p className="text-[14px] text-soul-ink font-medium leading-relaxed relative">
                {l.description}
              </p>

              <div className="relative">
                <p className="text-[11px] font-bold uppercase tracking-widest text-soul-terracota mb-1">Como amar no dia a dia</p>
                <p className="text-[13px] text-soul-ink/90 font-medium leading-snug">{l.dayToDay}</p>
              </div>

              <div className="rounded-2xl p-3 relative"
                   style={{ background: `${l.color}12`, border: `1px solid ${l.color}35` }}>
                <p className="text-[11px] font-bold uppercase tracking-widest mb-1" style={{ color: l.color }}>Exemplo</p>
                <p className="text-[13px] text-soul-ink font-medium italic leading-snug">{l.example}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── CTA final ── */}
      <section
        className="rounded-3xl p-6 md:p-8 flex flex-wrap items-center justify-between gap-4"
        style={{ background: 'linear-gradient(135deg, #9b4d43 0%, #c47a72 60%, #d4a0a0 100%)' }}
      >
        <div className="max-w-2xl text-white">
          <p className="font-serif text-xl md:text-2xl font-semibold leading-tight">
            Presenteie quem você ama com a sua linguagem.
          </p>
          <p className="text-[15px] font-medium mt-1" style={{ color: 'rgba(255,255,255,0.92)' }}>
            Envie para a sua parceria, para sua família, para alguém que importa — e descubram juntos como se amam.
          </p>
        </div>
        <NewAssessmentButton initialCategory="RELATIONSHIPS" variant="secondary">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
          </svg>
          Criar avaliação
        </NewAssessmentButton>
      </section>
    </div>
  )
}
