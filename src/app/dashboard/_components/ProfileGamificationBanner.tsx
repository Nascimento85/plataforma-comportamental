// ============================================================
// ProfileGamificationBanner — banner do Dashboard
// ============================================================
// Mostra progresso do perfil + CTA pra ganhar +6 créditos.
// Só renderiza se o bônus AINDA não foi resgatado.
// É um Server Component (recebe dados já calculados).
// ============================================================

import Link from 'next/link'

interface Props {
  completion: number   // 0-100
  bonusAmount?: number // default 6
}

export default function ProfileGamificationBanner({ completion, bonusAmount = 6 }: Props) {
  const isComplete = completion === 100

  return (
    <div
      className="rounded-3xl p-5 sm:p-6 relative overflow-hidden"
      style={{
        background: isComplete
          ? 'linear-gradient(135deg, #fff8e7, #fdecd2)'
          : 'linear-gradient(135deg, #1c1a17 0%, #2d2417 60%, #3d2a1c 100%)',
        border: isComplete ? '2px solid rgba(201,168,76,0.5)' : 'none',
      }}
    >
      {/* Decoração circular dourada */}
      <div
        className="absolute -right-16 -top-16 w-64 h-64 rounded-full opacity-25 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #c9a84c, transparent 65%)' }}
      />
      <div
        className="absolute -left-12 -bottom-16 w-56 h-56 rounded-full opacity-15 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #c4633a, transparent 70%)' }}
      />

      <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 items-center">
        <div>
          {/* Tag */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">🎁</span>
            <span
              className="text-[10px] font-bold uppercase tracking-[0.18em]"
              style={{ color: isComplete ? '#8f3f1e' : 'rgba(201,168,76,0.95)' }}
            >
              Bônus exclusivo
            </span>
          </div>

          {/* Título */}
          <h2
            className="font-serif font-bold text-2xl sm:text-3xl leading-tight mb-2"
            style={{ color: isComplete ? '#1c1a17' : 'white' }}
          >
            Ganhe <span style={{ color: isComplete ? '#a8522e' : '#e8c878' }}>+{bonusAmount} créditos</span> extras
          </h2>

          {/* Descrição */}
          <p
            className="text-[14px] sm:text-[15px] leading-relaxed font-medium mb-4 max-w-xl"
            style={{ color: isComplete ? 'rgba(28,26,23,0.75)' : 'rgba(255,255,255,0.7)' }}
          >
            {isComplete
              ? '🎉 Seu perfil está completo! Solicite o código de validação no perfil para liberar seus créditos extras.'
              : 'Complete seu perfil agora e libere o bônus em segundos. Apenas alguns campos faltam.'}
          </p>

          {/* Barra de progresso */}
          <div className="max-w-md">
            <div className="flex items-center justify-between mb-1.5">
              <span
                className="text-[11px] font-bold uppercase tracking-widest"
                style={{ color: isComplete ? 'rgba(28,26,23,0.65)' : 'rgba(255,255,255,0.55)' }}
              >
                Preenchimento
              </span>
              <span
                className="font-serif text-lg font-bold"
                style={{ color: isComplete ? '#4a7a4e' : '#e8c878' }}
              >
                {completion}%
              </span>
            </div>
            <div
              className="h-2 rounded-full overflow-hidden"
              style={{ background: isComplete ? 'rgba(28,26,23,0.1)' : 'rgba(255,255,255,0.12)' }}
            >
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${completion}%`,
                  background: isComplete
                    ? 'linear-gradient(90deg, #7a9e7e, #96bf9a)'
                    : 'linear-gradient(90deg, #c9a84c, #d4943a)',
                }}
              />
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col items-stretch lg:items-end gap-2">
          <Link
            href="/dashboard/profile"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-[14px] font-bold whitespace-nowrap
                       shadow-terra hover:-translate-y-px transition-all"
            style={{
              background: isComplete
                ? 'linear-gradient(135deg, #c4633a, #d4943a)'
                : 'linear-gradient(135deg, #c9a84c, #d4943a)',
              color: isComplete ? 'white' : '#1c1a17',
            }}
          >
            {isComplete ? 'Solicitar código →' : 'Completar perfil →'}
          </Link>
          {!isComplete && (
            <p className="text-[11px] text-white/50 font-medium text-center lg:text-right">
              Leva menos de 2 minutos
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
