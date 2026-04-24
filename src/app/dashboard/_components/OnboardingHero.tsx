import Link from 'next/link'

interface Props {
  firstName: string
  credits: number
}

export default function OnboardingHero({ firstName, credits }: Props) {
  return (
    <div
      className="rounded-3xl p-7 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #1c1a17 0%, #2d2417 50%, #3d2a1c 100%)' }}
    >
      {/* Decorative orbs */}
      <div
        className="absolute top-0 right-0 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)', transform: 'translate(20%, -30%)' }}
      />
      <div
        className="absolute bottom-0 left-1/3 w-48 h-48 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(196,99,58,0.08) 0%, transparent 70%)', transform: 'translateY(40%)' }}
      />

      {/* Mandala glyph */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none hidden lg:block">
        <svg width="160" height="160" viewBox="0 0 90 90" fill="none">
          <circle cx="45" cy="45" r="42" stroke="white" strokeWidth="0.5" strokeDasharray="4 6"/>
          <circle cx="45" cy="45" r="30" stroke="white" strokeWidth="0.5"/>
          <path d="M45 13L48.5 39.5L72 26L55.5 45L72 64L48.5 50.5L45 77L41.5 50.5L18 64L34.5 45L18 26L41.5 39.5Z"
            fill="white" opacity="0.4"/>
          <circle cx="45" cy="45" r="5" fill="white" opacity="0.6"/>
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-xl">
        <div
          className="text-[10px] font-sans font-medium tracking-[0.2em] uppercase mb-3"
          style={{ color: '#c9a84c' }}
        >
          Bem-vindo ao Mapa da Alma
        </div>

        <h2 className="font-serif font-light text-3xl text-white leading-tight mb-3">
          Olá, <em className="not-italic" style={{ color: '#c9a84c' }}>{firstName}</em>!
          <br/>Sua jornada começa aqui.
        </h2>

        <p className="text-sm text-white/55 leading-relaxed mb-6 max-w-md">
          Você tem <strong className="text-white font-medium">{credits} créditos</strong> prontos para usar.
          Convide candidatos e descubra os arquétipos que constroem times extraordinários.
        </p>

        {/* Steps */}
        <div className="flex gap-6 mb-7 flex-wrap">
          {[
            { num: '1', text: 'Convide um candidato por email ou link' },
            { num: '2', text: 'Ele responde os testes no próprio ritmo' },
            { num: '3', text: 'Você recebe o perfil arquetípico completo' },
          ].map((s) => (
            <div key={s.num} className="flex items-start gap-2.5">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-semibold text-soul-ink flex-shrink-0 mt-0.5"
                style={{ background: 'linear-gradient(135deg, #c9a84c, #d4943a)' }}
              >
                {s.num}
              </div>
              <p className="text-xs text-white/50 leading-snug max-w-[140px]">{s.text}</p>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex gap-3 flex-wrap">
          <Link
            href="/dashboard/assessments/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-sans font-medium text-soul-ink
                       shadow-gold transition-all duration-200 hover:-translate-y-px hover:brightness-105"
            style={{ background: 'linear-gradient(135deg, #c9a84c, #d4943a)' }}
          >
            ✦ Criar primeira avaliação
          </Link>
          <Link
            href="/dashboard/credits"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-sans font-medium
                       border border-white/20 text-white/75 hover:border-white/40 hover:text-white transition-all duration-200"
          >
            Ver planos de crédito
          </Link>
        </div>
      </div>
    </div>
  )
}
