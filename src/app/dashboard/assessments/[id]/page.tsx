import { getSession } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import { notFound, redirect } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import ShareResultButton from './ShareResultButton'
import { parseResultData } from '@/lib/parseResult'

export const metadata: Metadata = { title: 'Devolutiva Comportamental' }

// ── Helpers de renderização ─────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-3xl p-6" style={{ border: '1px solid rgba(232,226,214,0.6)' }}>
      <h2 className="text-[10px] font-sans font-semibold text-soul-ink/40 uppercase tracking-[0.15em] mb-4">{title}</h2>
      {children}
    </div>
  )
}

function TagList({ items, color = 'brand' }: { items: string[]; color?: string }) {
  const styles: Record<string, React.CSSProperties> = {
    brand:  { background: 'rgba(196,99,58,0.08)',   color: '#c4633a',   border: '1px solid rgba(196,99,58,0.15)'  },
    green:  { background: 'rgba(122,158,126,0.10)',  color: '#5a8a5e',   border: '1px solid rgba(122,158,126,0.2)' },
    red:    { background: 'rgba(196,122,114,0.08)',  color: '#a05a52',   border: '1px solid rgba(196,122,114,0.15)'},
    violet: { background: 'rgba(122,100,180,0.08)',  color: '#6b5fad',   border: '1px solid rgba(122,100,180,0.15)'},
    amber:  { background: 'rgba(212,148,58,0.10)',   color: '#a0722e',   border: '1px solid rgba(212,148,58,0.2)' },
  }
  const s = styles[color] ?? styles.brand
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item, i) => (
        <span key={i} className="text-xs font-medium px-3 py-1 rounded-full font-sans" style={s}>
          {item}
        </span>
      ))}
    </div>
  )
}

function BulletList({ items, color = 'green' }: { items: string[]; color?: 'green' | 'red' | 'brand' }) {
  const dotColor: Record<string, string> = {
    green: '#7a9e7e',
    red:   '#c47a72',
    brand: '#c4633a',
  }
  return (
    <ul className="space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5 text-sm text-soul-ink/65 font-sans">
          <span className="mt-0.5 font-bold flex-shrink-0" style={{ color: dotColor[color] }}>✓</span>
          {item}
        </li>
      ))}
    </ul>
  )
}

type InfoCardVariant = 'sage' | 'terracota' | 'rose' | 'amber' | 'indigo' | 'rose-warn'

function InfoCard({ label, text, variant = 'sage' }: {
  label: string
  text: string
  variant?: InfoCardVariant
  bg?: string  // kept for backward compat, ignored
}) {
  const variantStyles: Record<InfoCardVariant, React.CSSProperties> = {
    sage:      { background: 'rgba(122,158,126,0.08)', border: '1px solid rgba(122,158,126,0.2)',  color: '#4a7a4e' },
    terracota: { background: 'rgba(196,99,58,0.07)',   border: '1px solid rgba(196,99,58,0.15)',   color: '#c4633a' },
    rose:      { background: 'rgba(196,122,114,0.07)', border: '1px solid rgba(196,122,114,0.15)', color: '#8a4a42' },
    amber:     { background: 'rgba(212,148,58,0.08)',  border: '1px solid rgba(212,148,58,0.18)',  color: '#8a622e' },
    indigo:    { background: 'rgba(61,79,124,0.07)',   border: '1px solid rgba(61,79,124,0.15)',   color: '#3d4f7c' },
    'rose-warn': { background: 'rgba(196,122,114,0.07)', border: '1px solid rgba(196,122,114,0.15)', color: '#8a4a42' },
  }
  const s = variantStyles[variant]
  return (
    <div className="rounded-2xl p-4" style={s}>
      <p className="text-[10px] font-bold uppercase tracking-[0.12em] mb-1.5 font-sans opacity-70">{label}</p>
      <p className="text-sm leading-relaxed font-sans">{text}</p>
    </div>
  )
}

// ── Devolutivas por tipo ────────────────────────────────────────

function DiscDevolutiva({ result, employee }: { result: Record<string, unknown>; employee: string }) {
  const r = result as {
    predominant: string
    secondary: string
    combination: string
    scores: { D: number; I: number; S: number; C: number }
    percentages: { D: number; I: number; S: number; C: number }
    report: {
      name: string; tagline: string; characteristics: string[]; strengths: string[]
      teamValue: string[]; idealEnvironment: string[]; underPressure: string[]
      motivations: string[]; improvements: string[]; values: string; fear: string; decisionStyle: string
    }
  }

  const DISC_COLORS: Record<string, string> = { D: 'bg-red-500', I: 'bg-amber-500', S: 'bg-green-500', C: 'bg-blue-500' }
  const DISC_NAMES: Record<string, string> = { D: 'Dominante', I: 'Influente', S: 'Estável', C: 'Cauteloso' }

  return (
    <div className="space-y-5">
      {/* Header do perfil */}
      <div className="card p-6 flex items-start gap-5">
        <div className={`w-16 h-16 rounded-2xl ${DISC_COLORS[r.predominant]} flex items-center justify-center text-white text-2xl font-bold flex-shrink-0`}>
          {r.predominant}
        </div>
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Perfil predominante · {r.combination}</p>
          <h2 className="text-2xl font-bold text-gray-900">{r.report.name}</h2>
          <p className="text-brand-600 font-medium text-sm mt-1">{r.report.tagline}</p>
        </div>
      </div>

      {/* Distribuição */}
      <Section title="Distribuição do perfil">
        <div className="space-y-3">
          {(['D', 'I', 'S', 'C'] as const).map((p) => (
            <div key={p}>
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span className="font-medium">{p} — {DISC_NAMES[p]}</span>
                <span>{Math.round(r.percentages[p] * 100)}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${DISC_COLORS[p]}`} style={{ width: `${Math.round(r.percentages[p] * 100)}%` }} />
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Valores e Medo */}
      <div className="grid grid-cols-2 gap-4">
        <InfoCard label="Valor central" text={r.report.values} variant="sage" />
        <InfoCard label="Maior receio" text={r.report.fear} variant="rose" />
      </div>

      {/* Características */}
      <Section title="Características principais">
        <TagList items={r.report.characteristics} color="brand" />
      </Section>

      {/* Forças e Pontos de melhoria */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Section title="Pontos fortes">
          <BulletList items={r.report.strengths} color="green" />
        </Section>
        <Section title="Pontos de desenvolvimento">
          <BulletList items={r.report.improvements} color="red" />
        </Section>
      </div>

      {/* Estilo de trabalho */}
      <Section title="Estilo de trabalho e ambiente ideal">
        <div className="space-y-3">
          <div>
            <p className="text-xs font-semibold text-gray-500 mb-2">Ambiente que favorece</p>
            <TagList items={r.report.idealEnvironment} color="green" />
          </div>
          <div className="mt-3">
            <p className="text-xs font-semibold text-gray-500 mb-2">Estilo de decisão</p>
            <p className="text-sm text-gray-700 bg-gray-50 rounded-lg px-4 py-3">{r.report.decisionStyle}</p>
          </div>
        </div>
      </Section>

      {/* Comunicação e equipe */}
      <Section title="Contribuição para a equipe">
        <TagList items={r.report.teamValue} color="brand" />
      </Section>

      {/* Sob pressão */}
      <Section title="Comportamento sob pressão">
        <TagList items={r.report.underPressure} color="red" />
      </Section>

      {/* Motivações */}
      <Section title="O que motiva este perfil">
        <BulletList items={r.report.motivations} color="brand" />
      </Section>
    </div>
  )
}

function MbtiDevolutiva({ result, employee }: { result: Record<string, unknown>; employee: string }) {
  const r = result as {
    type: string
    report: { name: string; tagline: string; description: string; strengths: string[]; weaknesses: string[]; careers: string[] }
  }

  return (
    <div className="space-y-5">
      <div className="card p-6 flex items-start gap-5">
        <div className="w-16 h-16 rounded-2xl bg-brand-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
          {r.type}
        </div>
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Tipo MBTI</p>
          <h2 className="text-2xl font-bold text-gray-900">{r.report.name}</h2>
          <p className="text-brand-600 font-medium text-sm mt-1">"{r.report.tagline}"</p>
        </div>
      </div>

      <Section title="Descrição do perfil">
        <p className="text-sm text-gray-700 leading-relaxed">{r.report.description}</p>
      </Section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Section title="Pontos fortes">
          <BulletList items={r.report.strengths} color="green" />
        </Section>
        <Section title="Pontos de desenvolvimento">
          <BulletList items={r.report.weaknesses} color="red" />
        </Section>
      </div>

      <Section title="Carreiras e funções ideais">
        <TagList items={r.report.careers} color="brand" />
      </Section>
    </div>
  )
}

function EnneagramDevolutiva({ result, employee }: { result: Record<string, unknown>; employee: string }) {
  const r = result as {
    predominant: number
    secondary: number
    scores: Record<number, number>
    percentages: Record<number, number>
    report: {
      name: string; altName: string; tagline: string; motivation: string; basicFear: string
      focusOfAttention: string; strengths: string[]; challenges: string[]
      wings: { wing: string; description: string }[]; development: string[]
    }
    interpretation: Record<number, string>
  }

  return (
    <div className="space-y-5">
      <div className="card p-6 flex items-start gap-5">
        <div className="w-16 h-16 rounded-full bg-violet-600 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
          {r.predominant}
        </div>
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Tipo {r.predominant} · {r.report.altName}</p>
          <h2 className="text-2xl font-bold text-gray-900">{r.report.name}</h2>
          <p className="text-brand-600 font-medium text-sm mt-1">{r.report.tagline}</p>
        </div>
      </div>

      <Section title="Interpretação">
        <p className="text-sm text-gray-700 leading-relaxed">{r.interpretation[r.predominant]}</p>
      </Section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InfoCard label="Motivação central" text={r.report.motivation} variant="sage" />
        <InfoCard label="Medo básico" text={r.report.basicFear} variant="rose" />
      </div>

      <Section title="Foco de atenção">
        <p className="text-sm text-gray-700 bg-gray-50 rounded-lg px-4 py-3">{r.report.focusOfAttention}</p>
      </Section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Section title="Pontos fortes">
          <BulletList items={r.report.strengths} color="green" />
        </Section>
        <Section title="Desafios e pontos de desenvolvimento">
          <BulletList items={r.report.challenges} color="red" />
        </Section>
      </div>

      <Section title="Asas (influências secundárias)">
        <div className="space-y-3">
          {r.report.wings.map((w, i) => (
            <div key={i} className="bg-violet-50 border border-violet-200 rounded-lg px-4 py-3">
              <p className="text-xs font-semibold text-violet-700 mb-1">Tipo {w.wing}</p>
              <p className="text-sm text-violet-900">{w.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Caminhos de desenvolvimento">
        <BulletList items={r.report.development} color="brand" />
      </Section>
    </div>
  )
}

function TemperamentDevolutiva({ result, employee }: { result: Record<string, unknown>; employee: string }) {
  const r = result as {
    primaryType: string
    secondaryType: string
    profile: { name: string; title: string; description: string; strengths: string[]; challenges: string[]; workStyle: string; communication: string; idealRoles: string[]; color: string }
    secondaryProfile: { name: string; title: string }
    interpretation: string
    percentages: Record<string, number>
  }

  const TEMP_COLORS: Record<string, string> = {
    COLERICO: 'bg-red-500', SANGUINEO: 'bg-amber-500', MELANCOLICO: 'bg-violet-500', FLEUMATICO: 'bg-green-500',
  }
  const TEMP_BAR: Record<string, string> = {
    COLERICO: 'bg-red-500', SANGUINEO: 'bg-amber-500', MELANCOLICO: 'bg-violet-500', FLEUMATICO: 'bg-green-500',
  }
  const TEMP_LABELS: Record<string, string> = {
    COLERICO: 'Colérico', SANGUINEO: 'Sanguíneo', MELANCOLICO: 'Melancólico', FLEUMATICO: 'Fleumático',
  }

  return (
    <div className="space-y-5">
      <div className="card p-6 flex items-start gap-5">
        <div className={`w-16 h-16 rounded-full ${TEMP_COLORS[r.primaryType]} flex items-center justify-center text-white text-xl font-bold flex-shrink-0`}>
          {r.profile.name.charAt(0)}
        </div>
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
            {r.profile.name} · Secundário: {r.secondaryProfile.name}
          </p>
          <h2 className="text-2xl font-bold text-gray-900">{r.profile.title}</h2>
          <p className="text-gray-500 text-sm mt-1 max-w-lg">{r.interpretation}</p>
        </div>
      </div>

      <Section title="Distribuição dos temperamentos">
        <div className="space-y-3">
          {Object.entries(r.percentages).sort(([,a],[,b]) => b-a).map(([type, pct]) => (
            <div key={type}>
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span className="font-medium">{TEMP_LABELS[type]}</span>
                <span>{pct}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${TEMP_BAR[type]}`} style={{ width: `${pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Descrição do perfil">
        <p className="text-sm text-gray-700 leading-relaxed">{r.profile.description}</p>
      </Section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Section title="Pontos fortes">
          <BulletList items={r.profile.strengths} color="green" />
        </Section>
        <Section title="Desafios e pontos de desenvolvimento">
          <BulletList items={r.profile.challenges} color="red" />
        </Section>
      </div>

      <Section title="Estilo de trabalho">
        <p className="text-sm text-gray-700 bg-gray-50 rounded-lg px-4 py-3">{r.profile.workStyle}</p>
      </Section>

      <Section title="Estilo de comunicação">
        <p className="text-sm text-gray-700 bg-gray-50 rounded-lg px-4 py-3">{r.profile.communication}</p>
      </Section>

      <Section title="Funções e cargos ideais">
        <TagList items={r.profile.idealRoles} color="brand" />
      </Section>
    </div>
  )
}

function ArchetypeDevolutiva({ result }: { result: Record<string, unknown> }) {
  const r = result as {
    dominant: string
    secondary: string
    shadow: string
    scores: Record<string, number>
    percentages: Record<string, number>
    report: {
      name: string; title: string; tagline: string; motivation: string; fear: string
      gift: string; shadow: string; keywords: string[]; strengths: string[]; challenges: string[]
      careers: string[]; leadershipStyle: string; description: string
    }
    secondaryReport: { name: string; title: string; tagline: string; description: string }
  }

  const sorted = Object.entries(r.percentages).sort(([, a], [, b]) => b - a)

  return (
    <div className="space-y-5">
      <div className="card p-6 flex items-start gap-5">
        <div className="w-16 h-16 rounded-2xl bg-brand-600 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
          {r.report.name.charAt(0)}
        </div>
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Arquétipo dominante · Secundário: {r.secondaryReport.name}</p>
          <h2 className="text-2xl font-bold text-gray-900">{r.report.name}</h2>
          <p className="text-brand-600 font-medium text-sm mt-1">{r.report.title}</p>
          <p className="text-gray-400 text-xs mt-0.5 italic">"{r.report.tagline}"</p>
        </div>
      </div>

      <Section title="Descrição do arquétipo">
        <p className="text-sm text-gray-700 leading-relaxed">{r.report.description}</p>
      </Section>

      <div className="grid grid-cols-2 gap-4">
        <InfoCard label="Dom principal" text={r.report.gift} variant="sage" />
        <InfoCard label="Motivação central" text={r.report.motivation} variant="terracota" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <InfoCard label="Maior medo" text={r.report.fear} variant="rose" />
        <InfoCard label="Sombra (ponto cego)" text={r.report.shadow} variant="amber" />
      </div>

      <Section title="Palavras-chave do arquétipo">
        <TagList items={r.report.keywords} color="brand" />
      </Section>

      <Section title="Distribuição dos arquétipos">
        <div className="space-y-2">
          {sorted.map(([name, pct]) => (
            <div key={name}>
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span className="font-medium">{name}</span>
                <span>{Math.round(pct)}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-brand-600 rounded-full" style={{ width: `${pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </Section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Section title="Pontos fortes">
          <BulletList items={r.report.strengths} color="green" />
        </Section>
        <Section title="Desafios e desenvolvimento">
          <BulletList items={r.report.challenges} color="red" />
        </Section>
      </div>

      <Section title="Estilo de liderança">
        <p className="text-sm text-gray-700 bg-gray-50 rounded-lg px-4 py-3">{r.report.leadershipStyle}</p>
      </Section>

      <Section title="Carreiras e funções alinhadas">
        <TagList items={r.report.careers} color="brand" />
      </Section>

      <Section title={`Arquétipo secundário — ${r.secondaryReport.name}`}>
        <div className="bg-brand-50 border border-brand-200 rounded-lg px-4 py-3">
          <p className="text-xs font-semibold text-brand-700 mb-1">{r.secondaryReport.title} · &ldquo;{r.secondaryReport.tagline}&rdquo;</p>
          <p className="text-sm text-brand-900">{r.secondaryReport.description}</p>
        </div>
      </Section>
    </div>
  )
}

function ArchetypeFeminineDevolutiva({ result }: { result: Record<string, unknown> }) {
  const r = result as {
    dominant: string
    secondary: string
    toActivate: string
    scores: Record<string, number>
    percentages: Record<string, number>
    report: {
      name: string; title: string; goddess: string; tagline: string; essence: string
      keyword: string; shadow: string; strengths: string[]; challenges: string[]; description: string; activationTip: string
    }
    secondaryReport: { name: string; title: string; tagline: string; description: string }
    activationReport: { name: string; title: string; tagline: string; activationTip: string }
  }

  const sorted = Object.entries(r.percentages).sort(([, a], [, b]) => b - a)

  return (
    <div className="space-y-5">
      <div className="card p-6 flex items-start gap-5">
        <div className="w-16 h-16 rounded-full bg-violet-600 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
          {r.report.name.charAt(0)}
        </div>
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Arquétipo dominante · Deusa: {r.report.goddess}</p>
          <h2 className="text-2xl font-bold text-gray-900">{r.report.name}</h2>
          <p className="text-violet-600 font-medium text-sm mt-1">{r.report.title}</p>
          <p className="text-gray-400 text-xs mt-0.5 italic">"{r.report.tagline}"</p>
        </div>
      </div>

      <Section title="Descrição da energia">
        <p className="text-sm text-gray-700 leading-relaxed">{r.report.description}</p>
      </Section>

      <div className="grid grid-cols-2 gap-4">
        <InfoCard label="Essência" text={r.report.essence} variant="indigo" />
        <InfoCard label="Palavra-chave" text={r.report.keyword} variant="terracota" />
      </div>

      <InfoCard label="Sombra (ponto cego)" text={r.report.shadow} variant="amber" />

      <Section title="Distribuição das energias">
        <div className="space-y-2">
          {sorted.map(([name, pct]) => (
            <div key={name}>
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span className="font-medium">{name}</span>
                <span>{Math.round(pct)}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-violet-500 rounded-full" style={{ width: `${pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </Section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Section title="Pontos fortes">
          <BulletList items={r.report.strengths} color="green" />
        </Section>
        <Section title="Desafios e desenvolvimento">
          <BulletList items={r.report.challenges} color="red" />
        </Section>
      </div>

      <Section title={`Arquétipo secundário — ${r.secondaryReport.name}`}>
        <div className="bg-violet-50 border border-violet-200 rounded-lg px-4 py-3">
          <p className="text-xs font-semibold text-violet-700 mb-1">{r.secondaryReport.title} · &ldquo;{r.secondaryReport.tagline}&rdquo;</p>
          <p className="text-sm text-violet-900">{r.secondaryReport.description}</p>
        </div>
      </Section>

      {r.activationReport && (
        <div className="card p-5 bg-amber-50 border-amber-200">
          <h3 className="text-sm font-semibold text-amber-800 mb-2">💫 Energia a ativar: {r.activationReport.name}</h3>
          <p className="text-xs text-amber-600 italic mb-2">"{r.activationReport.tagline}"</p>
          <p className="text-sm text-amber-800">{r.activationReport.activationTip}</p>
        </div>
      )}
    </div>
  )
}

// ── Página principal ────────────────────────────────────────────

interface PageProps {
  params: { id: string }
}

const TEST_LABELS: Record<string, string> = {
  DISC: 'DISC', MBTI: 'MBTI', ENNEAGRAM: 'Eneagrama', TEMPERAMENT: '4 Temperamentos',
  ARCHETYPE: 'Arquétipos', ARCHETYPE_FEMININE: 'Arquétipos Femininos',
}

export default async function AssessmentDetailPage({ params }: PageProps) {
  const session = await getSession()
  if (!session) redirect('/login')
  const companyId = session.id

  const assessment = await prisma.assessment.findUnique({
    where: { id: params.id },
    include: {
      employee: { select: { name: true, email: true } },
      result: true,
    },
  })

  if (!assessment || assessment.companyId !== companyId) return notFound()

  if (assessment.status !== 'COMPLETED' || !assessment.result) {
    return (
      <div className="space-y-6">
        <Link href="/dashboard/assessments" className="text-sm text-soul-ink/40 hover:text-soul-ink/70 font-sans transition-colors">
          ← Avaliações
        </Link>
        <div className="bg-white rounded-3xl py-16 text-center" style={{ border: '1px solid rgba(232,226,214,0.6)' }}>
          <div className="text-4xl mb-4">⏳</div>
          <p className="font-serif font-semibold text-xl text-soul-ink mb-2">Avaliação ainda não concluída</p>
          <p className="text-sm text-soul-ink/45 font-sans">A devolutiva estará disponível após o colaborador finalizar o teste.</p>
        </div>
      </div>
    )
  }

  const resultData = parseResultData(assessment.result.resultData)
  const testType = assessment.testType
  const employeeName = assessment.employee.name

  return (
    <div className="space-y-5 max-w-3xl">
      {/* Navegação */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <Link href="/dashboard/assessments" className="text-sm text-soul-ink/40 hover:text-soul-ink/70 font-sans transition-colors">
          ← Avaliações
        </Link>
        <div className="flex items-center gap-2">
          <ShareResultButton assessmentId={assessment.id} />
          <a
            href={`/api/results/${assessment.id}/pdf`}
            target="_blank"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-sans font-medium text-white
                       transition-all hover:-translate-y-px shadow-terra"
            style={{ background: 'linear-gradient(135deg, #c4633a, #d4943a)' }}
          >
            ⬇ Baixar PDF
          </a>
        </div>
      </div>

      {/* Cabeçalho */}
      <div>
        <p className="text-[10px] font-sans font-semibold uppercase tracking-[0.15em] text-soul-ink/35 mb-1">
          {TEST_LABELS[testType] ?? testType} · Devolutiva
        </p>
        <h1 className="font-serif font-semibold text-3xl text-soul-ink">{employeeName}</h1>
        <p className="text-sm text-soul-ink/40 mt-1 font-sans">
          {assessment.employee.email} · Concluído em {new Date(assessment.completedAt!).toLocaleDateString('pt-BR')}
        </p>
      </div>

      {/* Conteúdo da devolutiva por tipo */}
      {testType === 'DISC'               && <DiscDevolutiva             result={resultData} employee={employeeName} />}
      {testType === 'MBTI'               && <MbtiDevolutiva             result={resultData} employee={employeeName} />}
      {testType === 'ENNEAGRAM'          && <EnneagramDevolutiva        result={resultData} employee={employeeName} />}
      {testType === 'TEMPERAMENT'        && <TemperamentDevolutiva      result={resultData} employee={employeeName} />}
      {testType === 'ARCHETYPE'          && <ArchetypeDevolutiva        result={resultData} />}
      {testType === 'ARCHETYPE_FEMININE' && <ArchetypeFeminineDevolutiva result={resultData} />}
    </div>
  )
}
