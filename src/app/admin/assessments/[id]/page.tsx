import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { parseResultData } from '@/lib/parseResult'

export const metadata: Metadata = { title: 'Admin — Devolutiva' }

// ── Helpers de renderização ─────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-3xl p-6" style={{ border: '1px solid rgba(232,226,214,0.6)' }}>
      <h2 className="text-[10px] font-sans font-semibold uppercase tracking-[0.15em] mb-4"
          style={{ color: 'rgba(28,26,23,0.35)' }}>{title}</h2>
      {children}
    </div>
  )
}

type TagColor = 'brand' | 'green' | 'red' | 'violet' | 'amber'
const TAG_STYLES: Record<TagColor, { color: string; bg: string; border: string }> = {
  brand:  { color: '#c4633a', bg: 'rgba(196,99,58,0.08)',   border: 'rgba(196,99,58,0.2)'   },
  green:  { color: '#5a8a5e', bg: 'rgba(122,158,126,0.1)',  border: 'rgba(122,158,126,0.25)' },
  red:    { color: '#b05a4a', bg: 'rgba(196,90,74,0.08)',   border: 'rgba(196,90,74,0.2)'   },
  violet: { color: '#6d5a9c', bg: 'rgba(109,90,156,0.08)',  border: 'rgba(109,90,156,0.2)'  },
  amber:  { color: '#a07020', bg: 'rgba(212,148,58,0.1)',   border: 'rgba(212,148,58,0.25)' },
}

function TagList({ items, color = 'brand' }: { items: string[]; color?: TagColor }) {
  const s = TAG_STYLES[color] ?? TAG_STYLES.brand
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item, i) => (
        <span key={i} className="text-xs font-medium font-sans px-3 py-1 rounded-full"
              style={{ color: s.color, background: s.bg, border: `1px solid ${s.border}` }}>
          {item}
        </span>
      ))}
    </div>
  )
}

function BulletList({ items, color = 'green' }: { items: string[]; color?: 'green' | 'red' | 'brand' }) {
  const dotColor: Record<string, string> = { green: '#7a9e7e', red: '#c4633a', brand: '#d4943a' }
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-sm font-sans" style={{ color: 'rgba(28,26,23,0.7)' }}>
          <span className="mt-0.5 font-bold flex-shrink-0" style={{ color: dotColor[color] }}>✓</span>
          {item}
        </li>
      ))}
    </ul>
  )
}

type InfoVariant = 'sage' | 'terracota' | 'rose' | 'amber' | 'indigo' | 'violet'
const INFO_STYLES: Record<InfoVariant, { color: string; bg: string; border: string }> = {
  sage:     { color: '#3d6640', bg: 'rgba(122,158,126,0.1)',  border: 'rgba(122,158,126,0.25)' },
  terracota:{ color: '#8a3520', bg: 'rgba(196,99,58,0.08)',   border: 'rgba(196,99,58,0.2)'   },
  rose:     { color: '#8a4040', bg: 'rgba(196,90,90,0.08)',   border: 'rgba(196,90,90,0.2)'   },
  amber:    { color: '#7a5010', bg: 'rgba(212,148,58,0.1)',   border: 'rgba(212,148,58,0.25)' },
  indigo:   { color: '#2a3d6c', bg: 'rgba(61,79,124,0.08)',   border: 'rgba(61,79,124,0.2)'   },
  violet:   { color: '#4a3a7c', bg: 'rgba(109,90,156,0.08)',  border: 'rgba(109,90,156,0.2)'  },
}

function InfoCard({ label, text, variant = 'sage', bg }: { label: string; text: string; variant?: InfoVariant; bg?: string }) {
  void bg // backward compat — ignored
  const s = INFO_STYLES[variant]
  return (
    <div className="rounded-2xl p-4" style={{ background: s.bg, border: `1px solid ${s.border}` }}>
      <p className="text-[10px] font-sans font-semibold uppercase tracking-[0.12em] mb-1" style={{ color: s.color, opacity: 0.7 }}>{label}</p>
      <p className="text-sm font-sans leading-relaxed" style={{ color: s.color }}>{text}</p>
    </div>
  )
}

// ── Devolutivas por tipo ────────────────────────────────────────

function DiscDevolutiva({ result }: { result: Record<string, unknown> }) {
  const r = result as {
    predominant: string; secondary: string; combination: string
    scores: { D: number; I: number; S: number; C: number }
    percentages: { D: number; I: number; S: number; C: number }
    report: {
      name: string; tagline: string; characteristics: string[]; strengths: string[]
      teamValue: string[]; idealEnvironment: string[]; underPressure: string[]
      motivations: string[]; improvements: string[]; values: string; fear: string; decisionStyle: string
    }
  }
  const DISC_HEX: Record<string, string> = { D: '#c4633a', I: '#d4943a', S: '#7a9e7e', C: '#3d4f7c' }
  const DISC_NAMES: Record<string, string> = { D: 'Dominante', I: 'Influente', S: 'Estável', C: 'Cauteloso' }

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-3xl p-6 flex items-start gap-5" style={{ border: '1px solid rgba(232,226,214,0.6)' }}>
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-bold font-sans flex-shrink-0"
             style={{ background: DISC_HEX[r.predominant] ?? '#c4633a' }}>
          {r.predominant}
        </div>
        <div>
          <p className="text-[10px] font-sans font-semibold uppercase tracking-[0.15em] mb-1" style={{ color: 'rgba(28,26,23,0.4)' }}>
            Perfil predominante · {r.combination}
          </p>
          <h2 className="font-serif font-light text-2xl text-soul-ink">{r.report.name}</h2>
          <p className="text-sm font-sans mt-1" style={{ color: '#c4633a' }}>{r.report.tagline}</p>
        </div>
      </div>
      <Section title="Distribuição do perfil">
        <div className="space-y-3">
          {(['D', 'I', 'S', 'C'] as const).map((p) => (
            <div key={p}>
              <div className="flex justify-between text-xs font-sans mb-1" style={{ color: 'rgba(28,26,23,0.6)' }}>
                <span className="font-medium">{p} — {DISC_NAMES[p]}</span>
                <span>{Math.round(r.percentages[p] * 100)}%</span>
              </div>
              <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(232,226,214,0.5)' }}>
                <div className="h-full rounded-full" style={{ width: `${Math.round(r.percentages[p] * 100)}%`, background: DISC_HEX[p] }} />
              </div>
            </div>
          ))}
        </div>
      </Section>
      <div className="grid grid-cols-2 gap-4">
        <InfoCard label="Valor central" text={r.report.values} variant="sage" />
        <InfoCard label="Maior receio" text={r.report.fear} variant="rose" />
      </div>
      <Section title="Características principais"><TagList items={r.report.characteristics} color="brand" /></Section>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Section title="Pontos fortes"><BulletList items={r.report.strengths} color="green" /></Section>
        <Section title="Pontos de desenvolvimento"><BulletList items={r.report.improvements} color="red" /></Section>
      </div>
      <Section title="Estilo de trabalho e ambiente ideal">
        <div className="space-y-3">
          <div>
            <p className="text-[10px] font-sans font-semibold uppercase tracking-[0.12em] mb-2" style={{ color: 'rgba(28,26,23,0.4)' }}>Ambiente que favorece</p>
            <TagList items={r.report.idealEnvironment} color="green" />
          </div>
          <div className="mt-3">
            <p className="text-[10px] font-sans font-semibold uppercase tracking-[0.12em] mb-2" style={{ color: 'rgba(28,26,23,0.4)' }}>Estilo de decisão</p>
            <p className="text-sm font-sans leading-relaxed rounded-2xl px-4 py-3" style={{ background: '#faf7f2', color: 'rgba(28,26,23,0.7)' }}>{r.report.decisionStyle}</p>
          </div>
        </div>
      </Section>
      <Section title="Contribuição para a equipe"><TagList items={r.report.teamValue} color="brand" /></Section>
      <Section title="Comportamento sob pressão"><TagList items={r.report.underPressure} color="red" /></Section>
      <Section title="O que motiva este perfil"><BulletList items={r.report.motivations} color="brand" /></Section>
    </div>
  )
}

function MbtiDevolutiva({ result }: { result: Record<string, unknown> }) {
  const r = result as {
    type: string
    report: { name: string; tagline: string; description: string; strengths: string[]; weaknesses: string[]; careers: string[] }
  }
  return (
    <div className="space-y-5">
      <div className="bg-white rounded-3xl p-6 flex items-start gap-5" style={{ border: '1px solid rgba(232,226,214,0.6)' }}>
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-xl font-bold font-sans flex-shrink-0"
             style={{ background: '#3d4f7c' }}>
          {r.type}
        </div>
        <div>
          <p className="text-[10px] font-sans font-semibold uppercase tracking-[0.15em] mb-1" style={{ color: 'rgba(28,26,23,0.4)' }}>Tipo MBTI</p>
          <h2 className="font-serif font-light text-2xl text-soul-ink">{r.report.name}</h2>
          <p className="text-sm font-sans mt-1 italic" style={{ color: '#c4633a' }}>"{r.report.tagline}"</p>
        </div>
      </div>
      <Section title="Descrição do perfil">
        <p className="text-sm font-sans leading-relaxed" style={{ color: 'rgba(28,26,23,0.7)' }}>{r.report.description}</p>
      </Section>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Section title="Pontos fortes"><BulletList items={r.report.strengths} color="green" /></Section>
        <Section title="Pontos de desenvolvimento"><BulletList items={r.report.weaknesses} color="red" /></Section>
      </div>
      <Section title="Carreiras e funções ideais"><TagList items={r.report.careers} color="brand" /></Section>
    </div>
  )
}

function EnneagramDevolutiva({ result }: { result: Record<string, unknown> }) {
  const r = result as {
    predominant: number; secondary: number
    scores: Record<number, number>; percentages: Record<number, number>
    report: {
      name: string; altName: string; tagline: string; motivation: string; basicFear: string
      focusOfAttention: string; strengths: string[]; challenges: string[]
      wings: { wing: string; description: string }[]; development: string[]
    }
    interpretation: Record<number, string>
  }
  return (
    <div className="space-y-5">
      <div className="bg-white rounded-3xl p-6 flex items-start gap-5" style={{ border: '1px solid rgba(232,226,214,0.6)' }}>
        <div className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold font-sans flex-shrink-0"
             style={{ background: '#6d5a9c' }}>
          {r.predominant}
        </div>
        <div>
          <p className="text-[10px] font-sans font-semibold uppercase tracking-[0.15em] mb-1" style={{ color: 'rgba(28,26,23,0.4)' }}>
            Tipo {r.predominant} · {r.report.altName}
          </p>
          <h2 className="font-serif font-light text-2xl text-soul-ink">{r.report.name}</h2>
          <p className="text-sm font-sans mt-1" style={{ color: '#c4633a' }}>{r.report.tagline}</p>
        </div>
      </div>
      <Section title="Interpretação">
        <p className="text-sm font-sans leading-relaxed" style={{ color: 'rgba(28,26,23,0.7)' }}>{r.interpretation[r.predominant]}</p>
      </Section>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InfoCard label="Motivação central" text={r.report.motivation} variant="sage" />
        <InfoCard label="Medo básico" text={r.report.basicFear} variant="rose" />
      </div>
      <Section title="Foco de atenção">
        <p className="text-sm font-sans leading-relaxed rounded-2xl px-4 py-3" style={{ background: '#faf7f2', color: 'rgba(28,26,23,0.7)' }}>{r.report.focusOfAttention}</p>
      </Section>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Section title="Pontos fortes"><BulletList items={r.report.strengths} color="green" /></Section>
        <Section title="Desafios e pontos de desenvolvimento"><BulletList items={r.report.challenges} color="red" /></Section>
      </div>
      <Section title="Asas (influências secundárias)">
        <div className="space-y-3">
          {r.report.wings.map((w, i) => (
            <div key={i} className="rounded-2xl px-4 py-3" style={{ background: 'rgba(109,90,156,0.08)', border: '1px solid rgba(109,90,156,0.2)' }}>
              <p className="text-xs font-sans font-semibold mb-1" style={{ color: '#4a3a7c' }}>Tipo {w.wing}</p>
              <p className="text-sm font-sans" style={{ color: '#3d2d6c' }}>{w.description}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Caminhos de desenvolvimento"><BulletList items={r.report.development} color="brand" /></Section>
    </div>
  )
}

function TemperamentDevolutiva({ result }: { result: Record<string, unknown> }) {
  const r = result as {
    primaryType: string; secondaryType: string
    profile: { name: string; title: string; description: string; strengths: string[]; challenges: string[]; workStyle: string; communication: string; idealRoles: string[]; color: string }
    secondaryProfile: { name: string; title: string }
    interpretation: string
    percentages: Record<string, number>
  }
  const TEMP_HEX: Record<string, string> = {
    COLERICO: '#c4633a', SANGUINEO: '#d4943a', MELANCOLICO: '#6d5a9c', FLEUMATICO: '#7a9e7e',
  }
  const TEMP_LABELS: Record<string, string> = {
    COLERICO: 'Colérico', SANGUINEO: 'Sanguíneo', MELANCOLICO: 'Melancólico', FLEUMATICO: 'Fleumático',
  }
  return (
    <div className="space-y-5">
      <div className="bg-white rounded-3xl p-6 flex items-start gap-5" style={{ border: '1px solid rgba(232,226,214,0.6)' }}>
        <div className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold font-sans flex-shrink-0"
             style={{ background: TEMP_HEX[r.primaryType] ?? '#c4633a' }}>
          {r.profile.name.charAt(0)}
        </div>
        <div>
          <p className="text-[10px] font-sans font-semibold uppercase tracking-[0.15em] mb-1" style={{ color: 'rgba(28,26,23,0.4)' }}>
            {r.profile.name} · Secundário: {r.secondaryProfile.name}
          </p>
          <h2 className="font-serif font-light text-2xl text-soul-ink">{r.profile.title}</h2>
          <p className="text-sm font-sans mt-1 max-w-lg" style={{ color: 'rgba(28,26,23,0.5)' }}>{r.interpretation}</p>
        </div>
      </div>
      <Section title="Distribuição dos temperamentos">
        <div className="space-y-3">
          {Object.entries(r.percentages).sort(([,a],[,b]) => b-a).map(([type, pct]) => (
            <div key={type}>
              <div className="flex justify-between text-xs font-sans mb-1" style={{ color: 'rgba(28,26,23,0.6)' }}>
                <span className="font-medium">{TEMP_LABELS[type]}</span>
                <span>{pct}%</span>
              </div>
              <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(232,226,214,0.5)' }}>
                <div className="h-full rounded-full" style={{ width: `${pct}%`, background: TEMP_HEX[type] }} />
              </div>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Descrição do perfil">
        <p className="text-sm font-sans leading-relaxed" style={{ color: 'rgba(28,26,23,0.7)' }}>{r.profile.description}</p>
      </Section>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Section title="Pontos fortes"><BulletList items={r.profile.strengths} color="green" /></Section>
        <Section title="Desafios e pontos de desenvolvimento"><BulletList items={r.profile.challenges} color="red" /></Section>
      </div>
      <Section title="Estilo de trabalho">
        <p className="text-sm font-sans leading-relaxed rounded-2xl px-4 py-3" style={{ background: '#faf7f2', color: 'rgba(28,26,23,0.7)' }}>{r.profile.workStyle}</p>
      </Section>
      <Section title="Estilo de comunicação">
        <p className="text-sm font-sans leading-relaxed rounded-2xl px-4 py-3" style={{ background: '#faf7f2', color: 'rgba(28,26,23,0.7)' }}>{r.profile.communication}</p>
      </Section>
      <Section title="Funções e cargos ideais"><TagList items={r.profile.idealRoles} color="brand" /></Section>
    </div>
  )
}

function ArchetypeDevolutiva({ result }: { result: Record<string, unknown> }) {
  const r = result as {
    dominant: string; secondary: string; shadow: string
    scores: Record<string, number>; percentages: Record<string, number>
    report: { name: string; title: string; tagline: string; motivation: string; fear: string; gift: string; shadow: string; keywords: string[]; strengths: string[]; challenges: string[]; careers: string[]; leadershipStyle: string; description: string }
    secondaryReport: { name: string; title: string; tagline: string; description: string }
  }
  const sorted = Object.entries(r.percentages).sort(([, a], [, b]) => b - a)
  return (
    <div className="space-y-5">
      <div className="bg-white rounded-3xl p-6 flex items-start gap-5" style={{ border: '1px solid rgba(232,226,214,0.6)' }}>
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-bold font-sans flex-shrink-0"
             style={{ background: 'linear-gradient(135deg, #c9a84c, #d4943a)' }}>{r.report.name.charAt(0)}</div>
        <div>
          <p className="text-[10px] font-sans font-semibold uppercase tracking-[0.15em] mb-1" style={{ color: 'rgba(28,26,23,0.4)' }}>
            Arquétipo dominante · Secundário: {r.secondaryReport.name}
          </p>
          <h2 className="font-serif font-light text-2xl text-soul-ink">{r.report.name}</h2>
          <p className="text-sm font-sans mt-1" style={{ color: '#c4633a' }}>{r.report.title}</p>
          <p className="text-[11px] font-sans mt-0.5 italic" style={{ color: 'rgba(28,26,23,0.4)' }}>"{r.report.tagline}"</p>
        </div>
      </div>
      <Section title="Descrição"><p className="text-sm font-sans leading-relaxed" style={{ color: 'rgba(28,26,23,0.7)' }}>{r.report.description}</p></Section>
      <div className="grid grid-cols-2 gap-4">
        <InfoCard label="Dom principal" text={r.report.gift} variant="sage" />
        <InfoCard label="Motivação central" text={r.report.motivation} variant="amber" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <InfoCard label="Maior medo" text={r.report.fear} variant="rose" />
        <InfoCard label="Sombra" text={r.report.shadow} variant="amber" />
      </div>
      <Section title="Palavras-chave"><TagList items={r.report.keywords} color="brand" /></Section>
      <Section title="Distribuição dos arquétipos">
        <div className="space-y-2">
          {sorted.map(([name, pct]) => (
            <div key={name}>
              <div className="flex justify-between text-xs font-sans mb-1" style={{ color: 'rgba(28,26,23,0.6)' }}>
                <span className="font-medium">{name}</span><span>{Math.round(pct)}%</span>
              </div>
              <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(232,226,214,0.5)' }}>
                <div className="h-full rounded-full" style={{ width: `${pct}%`, background: '#d4943a' }} />
              </div>
            </div>
          ))}
        </div>
      </Section>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Section title="Pontos fortes"><BulletList items={r.report.strengths} color="green" /></Section>
        <Section title="Desafios"><BulletList items={r.report.challenges} color="red" /></Section>
      </div>
      <Section title="Estilo de liderança">
        <p className="text-sm font-sans leading-relaxed rounded-2xl px-4 py-3" style={{ background: '#faf7f2', color: 'rgba(28,26,23,0.7)' }}>{r.report.leadershipStyle}</p>
      </Section>
      <Section title="Carreiras alinhadas"><TagList items={r.report.careers} color="brand" /></Section>
      <Section title={`Arquétipo secundário — ${r.secondaryReport.name}`}>
        <div className="rounded-2xl px-4 py-3" style={{ background: 'rgba(196,99,58,0.07)', border: '1px solid rgba(196,99,58,0.2)' }}>
          <p className="text-xs font-sans font-semibold mb-1" style={{ color: '#8a3520' }}>{r.secondaryReport.title} · "{r.secondaryReport.tagline}"</p>
          <p className="text-sm font-sans" style={{ color: 'rgba(28,26,23,0.7)' }}>{r.secondaryReport.description}</p>
        </div>
      </Section>
    </div>
  )
}

function ArchetypeFeminineDevolutiva({ result }: { result: Record<string, unknown> }) {
  const r = result as {
    dominant: string; secondary: string; toActivate: string
    scores: Record<string, number>; percentages: Record<string, number>
    report: { name: string; title: string; goddess: string; tagline: string; essence: string; keyword: string; shadow: string; strengths: string[]; challenges: string[]; description: string; activationTip: string }
    secondaryReport: { name: string; title: string; tagline: string; description: string }
    activationReport: { name: string; title: string; tagline: string; activationTip: string }
  }
  const sorted = Object.entries(r.percentages).sort(([, a], [, b]) => b - a)
  return (
    <div className="space-y-5">
      <div className="bg-white rounded-3xl p-6 flex items-start gap-5" style={{ border: '1px solid rgba(232,226,214,0.6)' }}>
        <div className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold font-sans flex-shrink-0"
             style={{ background: '#6d5a9c' }}>{r.report.name.charAt(0)}</div>
        <div>
          <p className="text-[10px] font-sans font-semibold uppercase tracking-[0.15em] mb-1" style={{ color: 'rgba(28,26,23,0.4)' }}>
            Arquétipo dominante · Deusa: {r.report.goddess}
          </p>
          <h2 className="font-serif font-light text-2xl text-soul-ink">{r.report.name}</h2>
          <p className="text-sm font-sans mt-1" style={{ color: '#6d5a9c' }}>{r.report.title}</p>
          <p className="text-[11px] font-sans mt-0.5 italic" style={{ color: 'rgba(28,26,23,0.4)' }}>"{r.report.tagline}"</p>
        </div>
      </div>
      <Section title="Descrição da energia"><p className="text-sm font-sans leading-relaxed" style={{ color: 'rgba(28,26,23,0.7)' }}>{r.report.description}</p></Section>
      <div className="grid grid-cols-2 gap-4">
        <InfoCard label="Essência" text={r.report.essence} variant="violet" />
        <InfoCard label="Palavra-chave" text={r.report.keyword} variant="amber" />
      </div>
      <InfoCard label="Sombra" text={r.report.shadow} variant="amber" />
      <Section title="Distribuição das energias">
        <div className="space-y-2">
          {sorted.map(([name, pct]) => (
            <div key={name}>
              <div className="flex justify-between text-xs font-sans mb-1" style={{ color: 'rgba(28,26,23,0.6)' }}>
                <span className="font-medium">{name}</span><span>{Math.round(pct)}%</span>
              </div>
              <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(232,226,214,0.5)' }}>
                <div className="h-full rounded-full" style={{ width: `${pct}%`, background: '#6d5a9c' }} />
              </div>
            </div>
          ))}
        </div>
      </Section>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Section title="Pontos fortes"><BulletList items={r.report.strengths} color="green" /></Section>
        <Section title="Desafios"><BulletList items={r.report.challenges} color="red" /></Section>
      </div>
      <Section title={`Arquétipo secundário — ${r.secondaryReport.name}`}>
        <div className="rounded-2xl px-4 py-3" style={{ background: 'rgba(109,90,156,0.08)', border: '1px solid rgba(109,90,156,0.2)' }}>
          <p className="text-xs font-sans font-semibold mb-1" style={{ color: '#4a3a7c' }}>{r.secondaryReport.title} · "{r.secondaryReport.tagline}"</p>
          <p className="text-sm font-sans" style={{ color: 'rgba(28,26,23,0.7)' }}>{r.secondaryReport.description}</p>
        </div>
      </Section>
      {r.activationReport && (
        <div className="rounded-3xl p-5" style={{ background: 'rgba(212,148,58,0.08)', border: '1px solid rgba(212,148,58,0.25)' }}>
          <h3 className="text-sm font-sans font-semibold mb-2" style={{ color: '#7a5010' }}>💫 Energia a ativar: {r.activationReport.name}</h3>
          <p className="text-xs font-sans italic mb-2" style={{ color: 'rgba(122,80,16,0.7)' }}>"{r.activationReport.tagline}"</p>
          <p className="text-sm font-sans" style={{ color: '#7a5010' }}>{r.activationReport.activationTip}</p>
        </div>
      )}
    </div>
  )
}

// ── Página principal ────────────────────────────────────────────

const TEST_LABELS: Record<string, string> = {
  DISC: 'DISC', MBTI: 'MBTI', ENNEAGRAM: 'Eneagrama', TEMPERAMENT: '4 Temperamentos',
  ARCHETYPE: 'Arquétipos', ARCHETYPE_FEMININE: 'Arquétipos Femininos',
}

interface PageProps {
  params: { id: string }
}

export default async function AdminAssessmentDetailPage({ params }: PageProps) {
  const assessment = await prisma.assessment.findUnique({
    where: { id: params.id },
    include: {
      employee: { select: { name: true, email: true } },
      company: { select: { name: true, email: true } },
      result: true,
    },
  })

  if (!assessment) return notFound()

  if (assessment.status !== 'COMPLETED' || !assessment.result) {
    return (
      <div className="space-y-6">
        <Link href="/admin/assessments" className="text-sm font-sans transition-colors"
              style={{ color: 'rgba(28,26,23,0.4)' }}>
          ← Todos os testes
        </Link>
        <div className="bg-white rounded-3xl p-12 text-center" style={{ border: '1px solid rgba(232,226,214,0.6)' }}>
          <p className="text-4xl mb-4">⏳</p>
          <p className="font-serif font-light text-lg text-soul-ink">Avaliação ainda não concluída</p>
          <p className="text-sm font-sans mt-1" style={{ color: 'rgba(28,26,23,0.45)' }}>
            Status atual: <strong>{assessment.status}</strong>
          </p>
        </div>
      </div>
    )
  }

  const resultData = parseResultData(assessment.result.resultData)
  const testType = assessment.testType

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Navegação */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <Link href="/admin/assessments" className="text-sm font-sans transition-colors"
              style={{ color: 'rgba(28,26,23,0.4)' }}>
          ← Todos os testes
        </Link>
        <a
          href={`/api/results/${assessment.id}/pdf`}
          target="_blank"
          className="px-4 py-2 rounded-full text-sm font-sans font-medium text-soul-ink transition-all hover:-translate-y-px"
          style={{ background: 'linear-gradient(135deg, #c9a84c, #d4943a)', boxShadow: '0 3px 12px rgba(201,168,76,0.2)' }}
        >
          ⬇ Baixar PDF
        </a>
      </div>

      {/* Cabeçalho */}
      <div className="bg-white rounded-3xl p-5" style={{ border: '1px solid rgba(232,226,214,0.6)' }}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-sans font-semibold uppercase tracking-[0.15em]" style={{ color: 'rgba(28,26,23,0.4)' }}>
              {TEST_LABELS[testType] ?? testType} · Devolutiva
            </p>
            <h1 className="font-serif font-light text-2xl text-soul-ink mt-1">{assessment.employee.name}</h1>
            <p className="text-sm font-sans mt-0.5" style={{ color: 'rgba(28,26,23,0.5)' }}>{assessment.employee.email}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-[10px] font-sans font-semibold uppercase tracking-[0.15em]" style={{ color: 'rgba(28,26,23,0.4)' }}>Empresa</p>
            <p className="text-sm font-medium font-sans text-soul-ink mt-1">{assessment.company.name}</p>
            <p className="text-xs font-sans" style={{ color: 'rgba(28,26,23,0.4)' }}>{assessment.company.email}</p>
          </div>
        </div>
        <p className="text-[11px] font-sans mt-3 pt-3" style={{ borderTop: '1px solid rgba(232,226,214,0.6)', color: 'rgba(28,26,23,0.4)' }}>
          Concluído em {new Date(assessment.completedAt!).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
        </p>
      </div>

      {/* Conteúdo da devolutiva por tipo */}
      {testType === 'DISC'               && <DiscDevolutiva             result={resultData} />}
      {testType === 'MBTI'               && <MbtiDevolutiva             result={resultData} />}
      {testType === 'ENNEAGRAM'          && <EnneagramDevolutiva        result={resultData} />}
      {testType === 'TEMPERAMENT'        && <TemperamentDevolutiva      result={resultData} />}
      {testType === 'ARCHETYPE'          && <ArchetypeDevolutiva        result={resultData} />}
      {testType === 'ARCHETYPE_FEMININE' && <ArchetypeFeminineDevolutiva result={resultData} />}
    </div>
  )
}
