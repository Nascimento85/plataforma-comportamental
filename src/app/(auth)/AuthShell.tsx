// ============================================================
// AuthShell · layout premium das telas de entrada (login/cadastro)
// Split-screen: painel de marca à esquerda (valor + prova social),
// formulário à direita. Em telas menores vira coluna única com
// cabeçalho compacto. Identidade navy/ouro alinhada à home.
// ============================================================

import type { ReactNode } from 'react'

const GOLD = '#c9a84c'
const GOLD_HI = '#e8c97a'

function PsiMark({ size = 56 }: { size?: number }) {
  return (
    <div
      className="inline-flex items-center justify-center rounded-2xl shadow-lg"
      style={{
        width: size,
        height: size,
        background: 'linear-gradient(135deg, #e8c97a, #c9a84c 55%, #a8873a)',
        boxShadow: '0 8px 28px rgba(201,168,76,0.35)',
      }}
    >
      <svg viewBox="0 0 90 90" fill="none" style={{ width: size * 0.58, height: size * 0.58 }}>
        <path
          d="M45 13L48.5 39.5L72 26L55.5 45L72 64L48.5 50.5L45 77L41.5 50.5L18 64L34.5 45L18 26L41.5 39.5Z"
          fill="rgba(255,255,255,0.3)" stroke="white" strokeWidth="1.5" strokeLinejoin="round"
        />
        <circle cx="45" cy="45" r="4" fill="white" opacity="0.9" />
      </svg>
    </div>
  )
}

export interface AuthShellProps {
  /** Título serif do painel de marca (aceita <br/> via ReactNode) */
  headline: ReactNode
  /** Parágrafo de apoio do painel de marca */
  sub: string
  /** Bullets de valor: emoji + texto (negrito opcional via <strong>) */
  bullets: { icon: string; text: ReactNode }[]
  /** Linha de prova social no rodapé do painel (ex.: stats) */
  proof?: string
  /** Título do formulário */
  formTitle: string
  /** Subtítulo do formulário */
  formSub: string
  /** Banner opcional acima do card (ex.: pós-cadastro) */
  banner?: ReactNode
  /** Conteúdo do card (o form em si) */
  children: ReactNode
  /** Linha abaixo do card (link alternativo login/cadastro) */
  belowCard: ReactNode
}

export default function AuthShell({
  headline, sub, bullets, proof, formTitle, formSub, banner, children, belowCard,
}: AuthShellProps) {
  return (
    <main className="min-h-screen flex" style={{ background: '#090e1a' }}>
      <style>{`
        @keyframes authFadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes authPulse {
          0%, 100% { opacity: 1; }
          50%      { opacity: .35; }
        }
        .auth-anim   { animation: authFadeUp .7s cubic-bezier(.16,1,.3,1) both; }
        .auth-anim-2 { animation: authFadeUp .7s cubic-bezier(.16,1,.3,1) .12s both; }
        .auth-anim-3 { animation: authFadeUp .7s cubic-bezier(.16,1,.3,1) .22s both; }
        @media (prefers-reduced-motion: reduce) {
          .auth-anim, .auth-anim-2, .auth-anim-3 { animation: none; }
        }
      `}</style>

      {/* ── Painel de marca (desktop) ─────────────────────── */}
      <aside
        className="hidden lg:flex flex-col justify-between w-[46%] xl:w-[42%] relative overflow-hidden px-12 xl:px-16 py-12"
        style={{ background: 'linear-gradient(160deg, #0c1322 0%, #090e1a 60%)' }}
      >
        {/* Glow dourado */}
        <div
          className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.14) 0%, transparent 65%)' }}
        />
        {/* Mandala */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.05]">
          <svg width="640" height="640" viewBox="0 0 90 90" fill="none">
            <circle cx="45" cy="45" r="42" stroke={GOLD} strokeWidth="0.4" strokeDasharray="4 6" />
            <circle cx="45" cy="45" r="32" stroke={GOLD} strokeWidth="0.3" />
            <circle cx="45" cy="45" r="22" stroke={GOLD} strokeWidth="0.3" />
            <path d="M45 3L48.5 39.5L82 26L55.5 45L82 64L48.5 50.5L45 87L41.5 50.5L8 64L34.5 45L8 26L41.5 39.5Z"
              fill={GOLD} opacity="0.5" />
          </svg>
        </div>

        {/* Logo */}
        <div className="relative auth-anim flex items-center gap-3">
          <PsiMark size={44} />
          <div className="leading-tight">
            <p className="font-serif font-semibold text-xl text-white">Psique</p>
            <p className="text-[10px] font-bold uppercase tracking-[0.24em]" style={{ color: GOLD }}>
              Mapa Comportamental
            </p>
          </div>
        </div>

        {/* Mensagem central */}
        <div className="relative auth-anim-2 max-w-md">
          <h2 className="font-serif font-semibold text-4xl xl:text-[2.6rem] leading-[1.15] text-white">
            {headline}
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed font-sans" style={{ color: 'rgba(255,255,255,0.6)' }}>
            {sub}
          </p>

          <ul className="mt-8 space-y-4">
            {bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-3.5 font-sans">
                <span
                  className="flex items-center justify-center w-9 h-9 rounded-xl text-base flex-shrink-0"
                  style={{ background: 'rgba(201,168,76,0.10)', border: '1px solid rgba(201,168,76,0.25)' }}
                >
                  {b.icon}
                </span>
                <span className="text-[14.5px] leading-relaxed pt-1.5" style={{ color: 'rgba(255,255,255,0.78)' }}>
                  {b.text}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Prova social */}
        <div className="relative auth-anim-3">
          {proof && (
            <p className="text-[13px] font-sans flex items-center gap-2" style={{ color: 'rgba(255,255,255,0.4)' }}>
              <span
                className="inline-block w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: GOLD, animation: 'authPulse 2s infinite' }}
              />
              {proof}
            </p>
          )}
        </div>
      </aside>

      {/* ── Painel do formulário ──────────────────────────── */}
      <section className="flex-1 flex items-center justify-center px-5 py-10 relative overflow-hidden">
        {/* Glow sutil no lado do form */}
        <div
          className="absolute -bottom-40 -right-40 w-[420px] h-[420px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 65%)' }}
        />

        <div className="w-full max-w-[420px] relative z-10">
          {/* Cabeçalho compacto (só mobile) */}
          <div className="lg:hidden text-center mb-8 auth-anim">
            <PsiMark size={52} />
            <h1 className="font-serif font-semibold text-2xl text-white mt-3">Psique</h1>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] mt-0.5" style={{ color: GOLD }}>
              Mapa Comportamental
            </p>
          </div>

          {banner && <div className="auth-anim">{banner}</div>}

          <div
            className="rounded-3xl p-7 sm:p-8 auth-anim-2"
            style={{
              background: 'rgba(255,255,255,0.045)',
              border: '1px solid rgba(255,255,255,0.09)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 30px 80px -30px rgba(0,0,0,0.6)',
            }}
          >
            <div className="mb-6">
              <h1 className="font-serif font-semibold text-[26px] text-white">{formTitle}</h1>
              <p className="text-sm font-sans mt-1.5" style={{ color: 'rgba(255,255,255,0.55)' }}>
                {formSub}
              </p>
            </div>

            {children}
          </div>

          <div className="mt-6 text-center auth-anim-3">{belowCard}</div>

          <p className="text-center text-[12px] mt-8 font-sans lg:hidden" style={{ color: 'rgba(255,255,255,0.25)' }}>
            15 avaliações · devolutiva completa · sem cartão
          </p>
        </div>
      </section>
    </main>
  )
}

export { GOLD, GOLD_HI }
