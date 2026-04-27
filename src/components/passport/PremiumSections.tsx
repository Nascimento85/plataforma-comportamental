// ============================================================
// <PremiumSections /> — Camada 3
// Renderiza o conteúdo Premium do perfil DISC dentro do gate.
// Recebe o profileKey (D|I|S|C) e busca o conteúdo em DISC_PREMIUM.
// ============================================================

import { DISC_PREMIUM, type DiscProfileKey } from '@/content/disc'

interface Props { profileKey: DiscProfileKey }

export default function PremiumSections({ profileKey }: Props) {
  const c = DISC_PREMIUM[profileKey]
  if (!c) return null

  return (
    <article className="space-y-10 font-sans">
      {/* HERO */}
      <header
        className="rounded-3xl p-7 sm:p-9"
        style={{ background: `linear-gradient(135deg, ${c.paletteHex}18, ${c.paletteHex}05)`,
                 border: `1px solid ${c.paletteHex}33` }}
      >
        <div className="text-[10px] font-bold tracking-[0.18em] uppercase mb-2" style={{ color: c.paletteHex }}>
          Relatório Premium
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-soul-ink mb-3">{c.label}</h2>
        <p className="text-soul-ink/75 text-lg">{c.pitchLine}</p>
      </header>

      {/* 1) ANATOMIA */}
      <Section number={1} title="Análise Profunda" accent={c.paletteHex}>
        <SubSection title={c.analysis.motor.title}>
          <p className="text-soul-ink/75 mb-4">{c.analysis.motor.summary}</p>
          <BulletList items={c.analysis.motor.insights} />
        </SubSection>

        <SubSection title={c.analysis.shadow.title}>
          <p className="text-soul-ink/75 mb-4">{c.analysis.shadow.summary}</p>
          <div className="space-y-4">
            {c.analysis.shadow.blindspots.map((b, i) => (
              <div key={i} className="rounded-2xl bg-white p-5 border border-soul-mist/60">
                <h4 className="font-serif text-lg font-semibold text-soul-ink mb-2">{b.name}</h4>
                <KV label="Como aparece"  value={b.whatItLooksLike} />
                <KV label="Custo na carreira" value={b.careerCost} accent={c.paletteHex} />
                <KV label="Reframe"      value={b.reframe} />
              </div>
            ))}
          </div>
        </SubSection>

        <SubSection title={c.analysis.fears.title}>
          <p className="text-soul-ink/75 mb-4">{c.analysis.fears.summary}</p>
          <div className="grid sm:grid-cols-3 gap-4">
            {c.analysis.fears.items.map((f, i) => (
              <div key={i} className="rounded-2xl p-5 bg-white border border-soul-mist/60">
                <h4 className="font-bold text-soul-ink mb-2">{f.fear}</h4>
                <p className="text-sm text-soul-ink/65 mb-3">{f.manifestation}</p>
                <p className="text-sm font-semibold" style={{ color: c.paletteHex }}>{f.decisionImpact}</p>
              </div>
            ))}
          </div>
        </SubSection>
      </Section>

      {/* 2) CARREIRA */}
      <Section number={2} title="Consultoria de Carreira" accent={c.paletteHex}>
        <div className="space-y-6">
          {c.career.map((play, i) => (
            <div key={i} className="rounded-2xl bg-white p-6 border border-soul-mist/60">
              <div className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: c.paletteHex }}>
                {play.context}
              </div>
              <h3 className="font-serif text-xl font-bold text-soul-ink mb-2">{play.headline}</h3>
              <p className="text-soul-ink/70 text-sm mb-4">{play.diagnosis}</p>
              <div className="space-y-4">
                {play.plays.map((p, j) => (
                  <div key={j} className="rounded-xl p-4" style={{ background: '#fafaf6' }}>
                    <h4 className="font-semibold text-soul-ink mb-2">{p.title}</h4>
                    <DoDont dos={p.do} donts={p.dont} />
                    {p.script && (
                      <div className="mt-3 rounded-lg p-3 text-sm italic" style={{ background: '#fff', borderLeft: `3px solid ${c.paletteHex}` }}>
                        Script: {p.script}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 3) COMUNICAÇÃO */}
      <Section number={3} title="Guia de Comunicação Estratégica" accent={c.paletteHex}>
        <div className="grid md:grid-cols-2 gap-5">
          <div className="rounded-2xl bg-white p-6 border border-soul-mist/60">
            <h3 className="font-serif text-xl font-bold mb-2">{c.communication.selfTalk.title}</h3>
            <p className="text-soul-ink/70 text-sm mb-4">{c.communication.selfTalk.summary}</p>
            <div className="space-y-3">
              {c.communication.selfTalk.techniques.map((t, i) => (
                <div key={i}>
                  <div className="font-semibold text-soul-ink">{t.name}</div>
                  <p className="text-sm text-soul-ink/70">{t.how}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl bg-white p-6 border border-soul-mist/60">
            <h3 className="font-serif text-xl font-bold mb-2">{c.communication.manualForOthers.title}</h3>
            <p className="text-soul-ink/70 text-sm mb-4">{c.communication.manualForOthers.summary}</p>
            <BulletList items={c.communication.manualForOthers.rules} />
            <h4 className="text-sm font-bold mt-4 mb-2 text-soul-ink">Scripts</h4>
            <div className="space-y-2">
              {c.communication.manualForOthers.scripts.map((s, i) => (
                <div key={i} className="rounded-xl p-3 text-sm" style={{ background: '#fafaf6' }}>
                  <div className="font-semibold mb-1">{s.situation}</div>
                  <p className="text-soul-ink/75"><span className="font-semibold" style={{ color: c.paletteHex }}>Diga:</span> "{s.sayThis}"</p>
                  <p className="text-soul-ink/55 line-through mt-1">"{s.notThis}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* 4) PDI */}
      <Section number={4} title="PDI — Desafio dos 21 Dias" accent={c.paletteHex}>
        <div className="space-y-5">
          {c.pdi.weeks.map(w => (
            <div key={w.week} className="rounded-2xl bg-white p-6 border border-soul-mist/60">
              <div className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: c.paletteHex }}>
                Semana {w.week}
              </div>
              <h3 className="font-serif text-xl font-bold mb-1">{w.theme}</h3>
              <p className="text-soul-ink/70 text-sm mb-4">{w.summary}</p>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-soul-ink/55 border-b border-soul-mist/60">
                    <th className="py-2 pr-2 w-12">#</th>
                    <th className="py-2 pr-2 w-32">Foco</th>
                    <th className="py-2 pr-2">Tarefa</th>
                    <th className="py-2 pr-2 w-32">Métrica</th>
                    <th className="py-2 w-12 text-center">✔</th>
                  </tr>
                </thead>
                <tbody>
                  {w.days.map(d => (
                    <tr key={d.day} className="border-b border-soul-mist/40 last:border-0 align-top">
                      <td className="py-2 pr-2 font-semibold">{d.day}</td>
                      <td className="py-2 pr-2 text-soul-ink/70">{d.focus}</td>
                      <td className="py-2 pr-2 text-soul-ink/85">{d.task}</td>
                      <td className="py-2 pr-2 text-soul-ink/55 italic">{d.metric}</td>
                      <td className="py-2 text-center">
                        <input type="checkbox" className="h-4 w-4 accent-current" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </Section>

      {/* 5) DOWNLOADS */}
      <Section number={5} title="Materiais para Download" accent={c.paletteHex}>
        <div className="grid sm:grid-cols-3 gap-4">
          {c.downloads.map(d => (
            <a key={d.slug} href={d.signedUrl ?? '#'}
               className="block rounded-2xl bg-white p-5 border border-soul-mist/60 hover:-translate-y-0.5 transition-all">
              <div className="text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: c.paletteHex }}>
                {d.kind} · {d.pages} pp
              </div>
              <h4 className="font-serif text-lg font-bold text-soul-ink mb-2">{d.title}</h4>
              <p className="text-sm text-soul-ink/65 mb-3">{d.pitch}</p>
              <ul className="text-[12px] text-soul-ink/55 space-y-0.5">
                {d.toc.slice(0, 4).map((t, i) => <li key={i}>· {t}</li>)}
                {d.toc.length > 4 && <li className="italic">+ {d.toc.length - 4} tópicos</li>}
              </ul>
              <div className="mt-3 text-sm font-bold" style={{ color: c.paletteHex }}>↓ Baixar PDF</div>
            </a>
          ))}
        </div>
      </Section>
    </article>
  )
}

// ─── helpers visuais ────────────────────────────────────────
function Section({ number, title, accent, children }: { number: number; title: string; accent: string; children: React.ReactNode }) {
  return (
    <section>
      <div className="flex items-baseline gap-3 mb-5">
        <div className="font-serif font-bold text-3xl" style={{ color: accent }}>{number}</div>
        <h2 className="font-serif text-2xl font-bold text-soul-ink">{title}</h2>
      </div>
      <div className="space-y-6">{children}</div>
    </section>
  )
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-serif text-xl font-semibold mb-3 text-soul-ink">{title}</h3>
      {children}
    </div>
  )
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 text-soul-ink/80">
      {items.map((it, i) => (
        <li key={i} className="flex gap-2 leading-relaxed"><span className="font-bold opacity-50 mt-0.5">·</span>{it}</li>
      ))}
    </ul>
  )
}

function KV({ label, value, accent }: { label: string; value: string; accent?: string }) {
  return (
    <div className="mt-3">
      <div className="text-[10px] font-bold tracking-widest uppercase" style={{ color: accent ?? '#0009' }}>{label}</div>
      <p className="text-sm text-soul-ink/80">{value}</p>
    </div>
  )
}

function DoDont({ dos, donts }: { dos: string[]; donts: string[] }) {
  return (
    <div className="grid sm:grid-cols-2 gap-3 mt-2">
      <div>
        <div className="text-[10px] font-bold tracking-widest uppercase text-emerald-700 mb-1.5">✓ Faça</div>
        <ul className="space-y-1 text-sm text-soul-ink/80">{dos.map((d, i) => <li key={i}>· {d}</li>)}</ul>
      </div>
      <div>
        <div className="text-[10px] font-bold tracking-widest uppercase text-rose-700 mb-1.5">✗ Não faça</div>
        <ul className="space-y-1 text-sm text-soul-ink/80">{donts.map((d, i) => <li key={i}>· {d}</li>)}</ul>
      </div>
    </div>
  )
}
