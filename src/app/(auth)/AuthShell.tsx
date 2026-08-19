// ============================================================
// AuthShell · telas de entrada (login, cadastro, senha)
// ============================================================
// Direção 1b do canvas de identidade: espresso quente, âmbar e terracota,
// Newsreader nos títulos e Albert Sans na interface, cantos suaves.
//
// A tela anterior era um cartão de vidro fosco sobre navy com brilho
// dourado, e não dava à pessoa nenhum motivo para criar conta. Aqui o
// painel da esquerda existe para uma coisa só: fazer ela querer ver o
// próprio resultado antes de preencher o formulário.
// ============================================================

import type { ReactNode } from 'react'

const ESPRESSO   = '#1B1410'
const ESPRESSO_2 = '#2B2018'
const AMBAR      = '#E0B368'
const TERRACOTA  = '#B3663F'
const LINHO      = '#F5ECDD'
const PAPEL      = '#FDF8EF'
const TRACO      = '#DCCDB6'

const serif = 'var(--font-newsreader), Georgia, serif'
const sans  = 'var(--font-albert), "Segoe UI", system-ui, sans-serif'

function MarcaPsi({ size = 44, cor = AMBAR }: { size?: number; cor?: string }) {
  return (
    <span
      aria-hidden="true"
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: size, height: size, borderRadius: '50%',
        border: `1px solid ${cor}`, color: cor,
        fontFamily: serif, fontSize: size * 0.46, lineHeight: 1,
        paddingBottom: size * 0.04, flexShrink: 0,
      }}
    >
      Ψ
    </span>
  )
}

/** Amostra real de devolutiva. Mostra o produto em vez de descrevê-lo. */
function AmostraDevolutiva() {
  const barras = [
    { rotulo: 'Assertiva',          pct: 38, cor: AMBAR },
    { rotulo: 'Passivo-agressiva',  pct: 37, cor: TERRACOTA },
    { rotulo: 'Passiva',            pct: 25, cor: 'rgba(245,236,221,.34)' },
  ]
  return (
    <div
      style={{
        background: ESPRESSO_2, border: '1px solid rgba(224,179,104,.22)',
        borderRadius: 16, padding: '20px 22px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
        <span style={{ fontFamily: sans, fontSize: 10.5, fontWeight: 600, letterSpacing: '.14em', textTransform: 'uppercase', color: AMBAR }}>
          Amostra de devolutiva
        </span>
        <span style={{ fontFamily: sans, fontSize: 10.5, color: 'rgba(245,236,221,.42)' }}>
          O Teste do Silêncio
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
        {barras.map((b) => (
          <div key={b.rotulo} style={{ display: 'grid', gridTemplateColumns: '1fr 34px', gap: 12, alignItems: 'center' }}>
            <div>
              <span style={{ fontFamily: sans, fontSize: 12, color: 'rgba(245,236,221,.82)' }}>{b.rotulo}</span>
              <div style={{ height: 6, borderRadius: 99, background: 'rgba(245,236,221,.10)', marginTop: 5 }}>
                <div style={{ width: `${b.pct}%`, height: 6, borderRadius: 99, background: b.cor }} />
              </div>
            </div>
            <span style={{ fontFamily: sans, fontSize: 11, color: 'rgba(245,236,221,.55)', textAlign: 'right' }}>
              {b.pct}%
            </span>
          </div>
        ))}
      </div>

      <p style={{
        marginTop: 15, paddingTop: 13, borderTop: '1px solid rgba(245,236,221,.10)',
        fontFamily: serif, fontStyle: 'italic', fontSize: 14, lineHeight: 1.5,
        color: 'rgba(245,236,221,.86)',
      }}>
        "Você não engole nem explode: manda o recado pelo tom. Ele sente que errou e não sabe em quê."
      </p>
    </div>
  )
}

export interface AuthShellProps {
  headline: ReactNode
  sub: string
  /** O `icon` é aceito por compatibilidade, mas não é renderizado. */
  bullets: { icon: string; text: ReactNode }[]
  proof?: string
  formTitle: string
  formSub: string
  banner?: ReactNode
  children: ReactNode
  belowCard: ReactNode
}

export default function AuthShell({
  headline, sub, bullets, proof, formTitle, formSub, banner, children, belowCard,
}: AuthShellProps) {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', background: LINHO, fontFamily: sans }}>
      <style>{`
        @keyframes authSobe { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
        .an1 { animation: authSobe .6s cubic-bezier(.16,1,.3,1) both; }
        .an2 { animation: authSobe .6s cubic-bezier(.16,1,.3,1) .1s both; }
        .an3 { animation: authSobe .6s cubic-bezier(.16,1,.3,1) .2s both; }
        @media (prefers-reduced-motion: reduce) { .an1,.an2,.an3 { animation: none; } }
        .auth-campo input {
          width: 100%; padding: 12px 2px; font-size: 16px; font-family: ${sans};
          color: ${ESPRESSO}; background: transparent;
          border: none; border-bottom: 1px solid ${TRACO}; border-radius: 0;
          transition: border-color .2s;
        }
        .auth-campo input:focus { outline: none; border-bottom-color: ${TERRACOTA}; }
        .auth-campo label {
          display: block; font-size: 11px; font-weight: 600; letter-spacing: .1em;
          text-transform: uppercase; color: #8A7359; margin-bottom: 4px;
        }
        .auth-campo button[type="submit"] {
          width: 100%; padding: 15px 22px; border: none; border-radius: 999px; cursor: pointer;
          font-family: ${sans}; font-size: 15px; font-weight: 600;
          background: ${ESPRESSO}; color: ${PAPEL}; transition: background .2s, transform .12s;
        }
        .auth-campo button[type="submit"]:hover:not(:disabled) { background: ${TERRACOTA}; transform: translateY(-1px); }
        .auth-campo button[type="submit"]:disabled { opacity: .55; cursor: wait; }
        .auth-campo a { color: ${TERRACOTA}; }
      `}</style>

      {/* ── Painel da marca ─────────────────────────────────── */}
      <aside
        className="hidden lg:flex"
        style={{
          width: '46%', maxWidth: 620, flexDirection: 'column', justifyContent: 'space-between',
          gap: 40, padding: '48px 56px', background: ESPRESSO, color: LINHO,
        }}
      >
        <div className="an1" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <MarcaPsi size={40} />
          <div style={{ lineHeight: 1.2 }}>
            <p style={{ fontFamily: serif, fontSize: 20, color: LINHO }}>Mapa Comportamental</p>
            <p style={{ fontSize: 9.5, fontWeight: 600, letterSpacing: '.22em', textTransform: 'uppercase', color: AMBAR, marginTop: 2 }}>
              entenda pessoas de verdade
            </p>
          </div>
        </div>

        <div className="an2" style={{ maxWidth: 460 }}>
          <h2 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(2rem, 2.9vw, 2.7rem)', lineHeight: 1.12, color: LINHO }}>
            {headline}
          </h2>
          <p style={{ marginTop: 18, fontSize: 15, lineHeight: 1.65, color: 'rgba(245,236,221,.66)' }}>
            {sub}
          </p>

          <ul style={{ marginTop: 26, listStyle: 'none', padding: 0, borderTop: '1px solid rgba(245,236,221,.12)' }}>
            {bullets.map((b, i) => (
              <li
                key={i}
                style={{
                  padding: '13px 0', borderBottom: '1px solid rgba(245,236,221,.12)',
                  fontSize: 14.5, lineHeight: 1.55, color: 'rgba(245,236,221,.8)',
                }}
              >
                {b.text}
              </li>
            ))}
          </ul>
        </div>

        <div className="an3">
          <AmostraDevolutiva />
          {proof && (
            <p style={{ marginTop: 16, fontSize: 12.5, color: 'rgba(245,236,221,.42)' }}>{proof}</p>
          )}
        </div>
      </aside>

      {/* ── Painel do formulário ────────────────────────────── */}
      <section
        style={{
          flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '40px 20px', background: LINHO,
        }}
      >
        <div style={{ width: '100%', maxWidth: 420 }}>
          <div className="lg:hidden an1" style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 28 }}>
            <MarcaPsi size={36} cor={TERRACOTA} />
            <p style={{ fontFamily: serif, fontSize: 19, color: ESPRESSO }}>Mapa Comportamental</p>
          </div>

          {banner && <div className="an1">{banner}</div>}

          <div
            className="an2 auth-campo"
            style={{
              background: PAPEL, border: `1px solid ${TRACO}`, borderRadius: 16,
              padding: '30px 28px',
              boxShadow: '0 1px 1px rgba(27,20,16,.03), 0 16px 40px -26px rgba(27,20,16,.32)',
            }}
          >
            <div style={{ marginBottom: 22 }}>
              <h1 style={{ fontFamily: serif, fontWeight: 400, fontSize: 26, color: ESPRESSO, lineHeight: 1.2 }}>
                {formTitle}
              </h1>
              <p style={{ fontSize: 14, marginTop: 6, color: '#8A7359' }}>{formSub}</p>
            </div>
            {children}
          </div>

          <div className="an3" style={{ marginTop: 22, textAlign: 'center', color: '#5A4838' }}>
            {belowCard}
          </div>
        </div>
      </section>
    </main>
  )
}

export { ESPRESSO, AMBAR, TERRACOTA, LINHO }
