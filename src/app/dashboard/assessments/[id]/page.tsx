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
        <InfoCard label="Valor central" text={r.report.values} bg="bg-green-50 border-green-200 text-green-800" />
        <InfoCard label="Maior receio" text={r.report.fear} bg="bg-red-50 border-red-200 text-red-800" />
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
        <InfoCard label="Motivação central" text={r.report.motivation} bg="bg-green-50 border-green-200 text-green-800" />
        <InfoCard label="Medo básico" text={r.report.basicFear} bg="bg-red-50 border-red-200 text-red-800" />
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

// ── Página principal ────────────────────────────────────────────

interface PageProps {
  params: { id: string }
}

const TEST_LABELS: Record<string, string> = {
  DISC: 'DISC', MBTI: 'MBTI', ENNEAGRAM: 'Eneagrama', TEMPERAMENT: '4 Temperamentos',
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
        <div className="flex items-center gap-3">
          <Link href="/dashboard/assessments" className="text-sm text-gray-400 hover:text-gray-600">← Avaliações</Link>
        </div>
        <div className="card p-12 text-center text-gray-400">
          <p className="text-4xl mb-4">⏳</p>
          <p className="font-medium text-gray-600">Avaliação ainda não concluída</p>
          <p className="text-sm mt-1">A devolutiva estará disponível após o colaborador finalizar o teste.</p>
        </div>
      </div>
    )
  }

  const resultData = parseResultData(assessment.result.resultData)
  const testType = assessment.testType
  const employeeName = assessment.employee.name

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Navegação */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <Link href="/dashboard/assessments" className="text-sm text-gray-400 hover:text-gray-600">
          ← Voltar para avaliações
        </Link>
        <div className="flex items-center gap-2">
          {/* Link compartilhável — abre a página pública /result/[id] */}
          <ShareResultButton assessmentId={assessment.id} />
          <a
            href={`/api/results/${assessment.id}/pdf`}
            target="_blank"
            className="btn-primary text-sm px-4 py-2"
          >
            ⬇ Baixar PDF
          </a>
        </div>
      </div>

      {/* Cabeçalho */}
      <div>
        <p className="text-xs text-gray-400 uppercase tracking-wide">{TEST_LABELS[testType] ?? testType} · Devolutiva</p>
        <h1 className="text-2xl font-bold text-gray-900 mt-1">{employeeName}</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          {assessment.employee.email} · Concluído em {new Date(assessment.completedAt!).toLocaleDateString('pt-BR')}
        </p>
      </div>

      {/* Conteúdo da devolutiva por tipo */}
      {testType === 'DISC'        && <DiscDevolutiva        result={resultData} employee={employeeName} />}
      {testType === 'MBTI'        && <MbtiDevolutiva        result={resultData} employee={employeeName} />}
      {testType === 'ENNEAGRAM'   && <EnneagramDevolutiva   result={resultData} employee={employeeName} />}
      {testType === 'TEMPERAMENT' && <TemperamentDevolutiva result={resultData} employee={employeeName} />}
    </div>
  )
}
