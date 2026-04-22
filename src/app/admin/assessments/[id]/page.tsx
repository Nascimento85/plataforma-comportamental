import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { parseResultData } from '@/lib/parseResult'

export const metadata: Metadata = { title: 'Admin — Devolutiva' }

// ── Helpers de renderização ─────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="card p-6">
      <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">{title}</h2>
      {children}
    </div>
  )
}

function TagList({ items, color = 'brand' }: { items: string[]; color?: string }) {
  const colors: Record<string, string> = {
    brand: 'bg-brand-50 text-brand-700 border-brand-200',
    green: 'bg-green-50 text-green-700 border-green-200',
    red:   'bg-red-50 text-red-700 border-red-200',
    violet:'bg-violet-50 text-violet-700 border-violet-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
  }
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item, i) => (
        <span key={i} className={`text-xs font-medium px-3 py-1 rounded-full border ${colors[color] ?? colors.brand}`}>
          {item}
        </span>
      ))}
    </div>
  )
}

function BulletList({ items, color = 'green' }: { items: string[]; color?: 'green' | 'red' | 'brand' }) {
  const dot: Record<string, string> = { green: 'text-green-500', red: 'text-red-400', brand: 'text-brand-500' }
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
          <span className={`mt-0.5 font-bold ${dot[color]}`}>✓</span>
          {item}
        </li>
      ))}
    </ul>
  )
}

function InfoCard({ label, text, bg }: { label: string; text: string; bg: string }) {
  return (
    <div className={`rounded-xl border p-4 ${bg}`}>
      <p className="text-xs font-semibold mb-1 opacity-70 uppercase tracking-wide">{label}</p>
      <p className="text-sm leading-relaxed">{text}</p>
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
  const DISC_COLORS: Record<string, string> = { D: 'bg-red-500', I: 'bg-amber-500', S: 'bg-green-500', C: 'bg-blue-500' }
  const DISC_NAMES: Record<string, string> = { D: 'Dominante', I: 'Influente', S: 'Estável', C: 'Cauteloso' }

  return (
    <div className="space-y-5">
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
      <div className="grid grid-cols-2 gap-4">
        <InfoCard label="Valor central" text={r.report.values} bg="bg-green-50 border-green-200 text-green-800" />
        <InfoCard label="Maior receio" text={r.report.fear} bg="bg-red-50 border-red-200 text-red-800" />
      </div>
      <Section title="Características principais"><TagList items={r.report.characteristics} color="brand" /></Section>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Section title="Pontos fortes"><BulletList items={r.report.strengths} color="green" /></Section>
        <Section title="Pontos de desenvolvimento"><BulletList items={r.report.improvements} color="red" /></Section>
      </div>
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
        <InfoCard label="Motivação central" text={r.report.motivation} bg="bg-green-50 border-green-200 text-green-800" />
        <InfoCard label="Medo básico" text={r.report.basicFear} bg="bg-red-50 border-red-200 text-red-800" />
      </div>
      <Section title="Foco de atenção">
        <p className="text-sm text-gray-700 bg-gray-50 rounded-lg px-4 py-3">{r.report.focusOfAttention}</p>
      </Section>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Section title="Pontos fortes"><BulletList items={r.report.strengths} color="green" /></Section>
        <Section title="Desafios e pontos de desenvolvimento"><BulletList items={r.report.challenges} color="red" /></Section>
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
        <Section title="Pontos fortes"><BulletList items={r.profile.strengths} color="green" /></Section>
        <Section title="Desafios e pontos de desenvolvimento"><BulletList items={r.profile.challenges} color="red" /></Section>
      </div>
      <Section title="Estilo de trabalho">
        <p className="text-sm text-gray-700 bg-gray-50 rounded-lg px-4 py-3">{r.profile.workStyle}</p>
      </Section>
      <Section title="Estilo de comunicação">
        <p className="text-sm text-gray-700 bg-gray-50 rounded-lg px-4 py-3">{r.profile.communication}</p>
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
      <div className="card p-6 flex items-start gap-5">
        <div className="w-16 h-16 rounded-2xl bg-brand-600 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">{r.report.name.charAt(0)}</div>
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Arquétipo dominante · Secundário: {r.secondaryReport.name}</p>
          <h2 className="text-2xl font-bold text-gray-900">{r.report.name}</h2>
          <p className="text-brand-600 font-medium text-sm mt-1">{r.report.title}</p>
          <p className="text-gray-400 text-xs mt-0.5 italic">"{r.report.tagline}"</p>
        </div>
      </div>
      <Section title="Descrição"><p className="text-sm text-gray-700 leading-relaxed">{r.report.description}</p></Section>
      <div className="grid grid-cols-2 gap-4">
        <InfoCard label="Dom principal" text={r.report.gift} bg="bg-green-50 border-green-200 text-green-800" />
        <InfoCard label="Motivação central" text={r.report.motivation} bg="bg-brand-50 border-brand-200 text-brand-800" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <InfoCard label="Maior medo" text={r.report.fear} bg="bg-red-50 border-red-200 text-red-800" />
        <InfoCard label="Sombra" text={r.report.shadow} bg="bg-amber-50 border-amber-200 text-amber-800" />
      </div>
      <Section title="Palavras-chave"><TagList items={r.report.keywords} color="brand" /></Section>
      <Section title="Distribuição dos arquétipos">
        <div className="space-y-2">
          {sorted.map(([name, pct]) => (
            <div key={name}>
              <div className="flex justify-between text-xs text-gray-600 mb-1"><span className="font-medium">{name}</span><span>{Math.round(pct)}%</span></div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-brand-600 rounded-full" style={{ width: `${pct}%` }} /></div>
            </div>
          ))}
        </div>
      </Section>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Section title="Pontos fortes"><BulletList items={r.report.strengths} color="green" /></Section>
        <Section title="Desafios"><BulletList items={r.report.challenges} color="red" /></Section>
      </div>
      <Section title="Estilo de liderança"><p className="text-sm text-gray-700 bg-gray-50 rounded-lg px-4 py-3">{r.report.leadershipStyle}</p></Section>
      <Section title="Carreiras alinhadas"><TagList items={r.report.careers} color="brand" /></Section>
      <Section title={`Arquétipo secundário — ${r.secondaryReport.name}`}>
        <div className="bg-brand-50 border border-brand-200 rounded-lg px-4 py-3">
          <p className="text-xs font-semibold text-brand-700 mb-1">{r.secondaryReport.title} · "{r.secondaryReport.tagline}"</p>
          <p className="text-sm text-brand-900">{r.secondaryReport.description}</p>
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
      <div className="card p-6 flex items-start gap-5">
        <div className="w-16 h-16 rounded-full bg-violet-600 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">{r.report.name.charAt(0)}</div>
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Arquétipo dominante · Deusa: {r.report.goddess}</p>
          <h2 className="text-2xl font-bold text-gray-900">{r.report.name}</h2>
          <p className="text-violet-600 font-medium text-sm mt-1">{r.report.title}</p>
          <p className="text-gray-400 text-xs mt-0.5 italic">"{r.report.tagline}"</p>
        </div>
      </div>
      <Section title="Descrição da energia"><p className="text-sm text-gray-700 leading-relaxed">{r.report.description}</p></Section>
      <div className="grid grid-cols-2 gap-4">
        <InfoCard label="Essência" text={r.report.essence} bg="bg-violet-50 border-violet-200 text-violet-800" />
        <InfoCard label="Palavra-chave" text={r.report.keyword} bg="bg-brand-50 border-brand-200 text-brand-800" />
      </div>
      <InfoCard label="Sombra" text={r.report.shadow} bg="bg-amber-50 border-amber-200 text-amber-800" />
      <Section title="Distribuição das energias">
        <div className="space-y-2">
          {sorted.map(([name, pct]) => (
            <div key={name}>
              <div className="flex justify-between text-xs text-gray-600 mb-1"><span className="font-medium">{name}</span><span>{Math.round(pct)}%</span></div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-violet-500 rounded-full" style={{ width: `${pct}%` }} /></div>
            </div>
          ))}
        </div>
      </Section>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Section title="Pontos fortes"><BulletList items={r.report.strengths} color="green" /></Section>
        <Section title="Desafios"><BulletList items={r.report.challenges} color="red" /></Section>
      </div>
      <Section title={`Arquétipo secundário — ${r.secondaryReport.name}`}>
        <div className="bg-violet-50 border border-violet-200 rounded-lg px-4 py-3">
          <p className="text-xs font-semibold text-violet-700 mb-1">{r.secondaryReport.title} · "{r.secondaryReport.tagline}"</p>
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
        <Link href="/admin/assessments" className="text-sm text-gray-400 hover:text-gray-600">
          ← Todos os testes
        </Link>
        <div className="card p-12 text-center text-gray-400">
          <p className="text-4xl mb-4">⏳</p>
          <p className="font-medium text-gray-600">Avaliação ainda não concluída</p>
          <p className="text-sm mt-1">Status atual: <strong>{assessment.status}</strong></p>
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
        <Link href="/admin/assessments" className="text-sm text-gray-400 hover:text-gray-600">
          ← Todos os testes
        </Link>
        <a
          href={`/api/results/${assessment.id}/pdf`}
          target="_blank"
          className="btn-primary text-sm px-4 py-2"
        >
          ⬇ Baixar PDF
        </a>
      </div>

      {/* Cabeçalho */}
      <div className="card p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide">{TEST_LABELS[testType] ?? testType} · Devolutiva</p>
            <h1 className="text-2xl font-bold text-gray-900 mt-1">{assessment.employee.name}</h1>
            <p className="text-sm text-gray-500 mt-0.5">{assessment.employee.email}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-xs text-gray-400 uppercase tracking-wide">Empresa</p>
            <p className="text-sm font-semibold text-gray-700 mt-1">{assessment.company.name}</p>
            <p className="text-xs text-gray-400">{assessment.company.email}</p>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-3 pt-3 border-t border-gray-100">
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
