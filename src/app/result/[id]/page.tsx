// ============================================================
// Página pública de resultado — /result/[id]
// Acesso sem login. Qualquer pessoa com o link pode ver.
// ============================================================

import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import CopyLinkButton from './CopyLinkButton'
import { parseResultData } from '@/lib/parseResult'

// ── Helpers de cor por tipo ──────────────────────────────────
const DISC_COLORS: Record<string, { bg: string; text: string; light: string }> = {
  D: { bg: '#ef4444', text: '#ffffff', light: '#fef2f2' },
  I: { bg: '#f59e0b', text: '#ffffff', light: '#fffbeb' },
  S: { bg: '#22c55e', text: '#ffffff', light: '#f0fdf4' },
  C: { bg: '#3b82f6', text: '#ffffff', light: '#eff6ff' },
}
const DISC_NAMES: Record<string, string> = {
  D: 'Dominante', I: 'Influente', S: 'Estável', C: 'Cauteloso',
}
const TEMP_COLORS: Record<string, { bg: string; text: string; light: string }> = {
  COLERICO:    { bg: '#ef4444', text: '#ffffff', light: '#fef2f2' },
  SANGUINEO:   { bg: '#f59e0b', text: '#ffffff', light: '#fffbeb' },
  MELANCOLICO: { bg: '#8b5cf6', text: '#ffffff', light: '#f5f3ff' },
  FLEUMATICO:  { bg: '#22c55e', text: '#ffffff', light: '#f0fdf4' },
}
const TEMP_LABELS: Record<string, string> = {
  COLERICO: 'Colérico', SANGUINEO: 'Sanguíneo',
  MELANCOLICO: 'Melancólico', FLEUMATICO: 'Fleumático',
}
const TEST_LABELS: Record<string, string> = {
  DISC: 'DISC — Perfil Comportamental',
  MBTI: 'MBTI — 16 Tipos de Personalidade',
  ENNEAGRAM: 'Eneagrama — 9 Tipos',
  TEMPERAMENT: '4 Temperamentos',
}

// ── Metadata dinâmica ────────────────────────────────────────
export async function generateMetadata(
  { params }: { params: { id: string } }
): Promise<Metadata> {
  const assessment = await prisma.assessment.findUnique({
    where: { id: params.id },
    include: { employee: { select: { name: true } } },
  })
  if (!assessment) return { title: 'Resultado não encontrado' }
  return {
    title: `Resultado de ${assessment.employee.name} — ${TEST_LABELS[assessment.testType] ?? assessment.testType}`,
    description: 'Relatório de avaliação comportamental.',
  }
}

// ── Componente de barra de progresso ────────────────────────
function Bar({ label, pct, color }: { label: string; pct: number; color: string }) {
  const rounded = Math.round(pct)
  return (
    <div>
      <div className="flex justify-between text-xs text-gray-600 mb-1">
        <span className="font-medium">{label}</span>
        <span className="font-semibold">{rounded}%</span>
      </div>
      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${rounded}%`, backgroundColor: color }}
        />
      </div>
    </div>
  )
}

// ── Lista de forças / desafios ───────────────────────────────
function ItemList({ items, color, icon }: { items: string[]; color: string; icon: string }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
          <span style={{ color }} className="mt-0.5 flex-shrink-0 font-bold">{icon}</span>
          {item}
        </li>
      ))}
    </ul>
  )
}

// ── Coluna de forças / desenvolvimento ──────────────────────
function TwoColumns({
  strengths,
  dev,
  devLabel = 'Pontos de Desenvolvimento',
}: {
  strengths: string[]
  dev: string[]
  devLabel?: string
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="bg-green-50 border border-green-200 rounded-xl p-4">
        <h3 className="text-xs font-bold text-green-700 uppercase tracking-wide mb-3">
          Pontos Fortes
        </h3>
        <ItemList items={strengths} color="#16a34a" icon="+" />
      </div>
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <h3 className="text-xs font-bold text-amber-700 uppercase tracking-wide mb-3">
          {devLabel}
        </h3>
        <ItemList items={dev} color="#d97706" icon="!" />
      </div>
    </div>
  )
}

// ── Badge de tipo ────────────────────────────────────────────
function TypeBadge({
  label, bgColor, textColor, shape = 'circle',
}: {
  label: string; bgColor: string; textColor: string; shape?: 'circle' | 'rounded'
}) {
  const base = 'inline-flex items-center justify-center w-20 h-20 text-2xl font-bold mb-4'
  const radius = shape === 'circle' ? 'rounded-full' : 'rounded-2xl'
  return (
    <div
      className={`${base} ${radius}`}
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {label}
    </div>
  )
}

// ── Resultado DISC ───────────────────────────────────────────
function DiscResult({ data }: { data: Record<string, unknown> }) {
  const r = data as {
    predominant: string
    secondary: string
    combination: string
    report: {
      name: string; tagline: string; description?: string
      strengths: string[]; improvements: string[]
      values: string; fear: string
    }
    percentages: Record<string, number>
  }
  const color = DISC_COLORS[r.predominant] ?? { bg: '#2a47f5', text: '#fff', light: '#f0f4ff' }

  return (
    <div className="space-y-5">
      {/* Hero */}
      <div className="text-center">
        <TypeBadge label={r.predominant} bgColor={color.bg} textColor={color.text} />
        <h2 className="text-2xl font-bold text-gray-900">{r.report.name}</h2>
        <p className="text-sm mt-1 font-medium" style={{ color: color.bg }}>{r.report.tagline}</p>
        <p className="text-xs text-gray-400 mt-1">Combinação: <strong>{r.combination}</strong></p>
      </div>

      {/* Descrição */}
      {r.report.description && (
        <div className="rounded-xl p-4 border-l-4 text-sm text-gray-700 leading-relaxed"
          style={{ backgroundColor: color.light, borderColor: color.bg }}>
          {r.report.description}
        </div>
      )}

      {/* Barras */}
      <div className="bg-white border border-gray-100 rounded-xl p-4 space-y-3">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Distribuição do Perfil</h3>
        {(['D', 'I', 'S', 'C'] as const).map((p) => (
          <Bar
            key={p}
            label={`${p} — ${DISC_NAMES[p]}`}
            pct={(r.percentages[p] ?? 0) * 100}
            color={DISC_COLORS[p]?.bg ?? '#2a47f5'}
          />
        ))}
      </div>

      {/* Forças / Desenvolvimento */}
      <TwoColumns strengths={r.report.strengths} dev={r.report.improvements} />

      {/* Valor / Medo */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <p className="text-xs font-bold text-green-700 uppercase tracking-wide mb-1">Valor Central</p>
          <p className="text-sm text-green-800">{r.report.values}</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-xs font-bold text-red-700 uppercase tracking-wide mb-1">Maior Receio</p>
          <p className="text-sm text-red-800">{r.report.fear}</p>
        </div>
      </div>
    </div>
  )
}

// ── Resultado MBTI ───────────────────────────────────────────
function MbtiResult({ data }: { data: Record<string, unknown> }) {
  const r = data as {
    type: string
    report: {
      name: string; tagline: string; description: string
      strengths: string[]; weaknesses: string[]; careers: string[]
    }
    scores: Record<string, number>
  }
  const BRAND = '#2a47f5'

  return (
    <div className="space-y-5">
      <div className="text-center">
        <TypeBadge label={r.type} bgColor={BRAND} textColor="#fff" shape="rounded" />
        <h2 className="text-2xl font-bold text-gray-900">{r.report.name}</h2>
        <p className="text-sm mt-1 font-medium" style={{ color: BRAND }}>"{r.report.tagline}"</p>
      </div>

      {/* Descrição */}
      <div className="rounded-xl p-4 border-l-4 text-sm text-gray-700 leading-relaxed bg-blue-50 border-blue-400">
        {r.report.description}
      </div>

      {/* Barras das dimensões */}
      {r.scores && (
        <div className="bg-white border border-gray-100 rounded-xl p-4 space-y-3">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Dimensões do Perfil</h3>
          {[
            { a: 'E', b: 'I', labelA: 'Extroversão', labelB: 'Introversão' },
            { a: 'N', b: 'S', labelA: 'Intuição', labelB: 'Sensação' },
            { a: 'T', b: 'F', labelA: 'Pensamento', labelB: 'Sentimento' },
            { a: 'J', b: 'P', labelA: 'Julgamento', labelB: 'Percepção' },
          ].map(({ a, b, labelA, labelB }) => {
            const valA = r.scores[a] ?? 0
            const valB = r.scores[b] ?? 0
            const total = valA + valB || 1
            const pctA = Math.round((valA / total) * 100)
            const pctB = 100 - pctA
            const dominant = valA >= valB ? a : b
            return (
              <div key={a}>
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span className={dominant === a ? 'font-bold text-gray-800' : ''}>{a} — {labelA} ({pctA}%)</span>
                  <span className={dominant === b ? 'font-bold text-gray-800' : ''}>{b} — {labelB} ({pctB}%)</span>
                </div>
                <div className="h-3 rounded-full overflow-hidden flex" style={{ backgroundColor: '#e5e7eb' }}>
                  <div className="h-full" style={{ width: `${pctA}%`, backgroundColor: BRAND }} />
                  <div className="h-full" style={{ width: `${pctB}%`, backgroundColor: '#93c5fd' }} />
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Forças / Fraquezas */}
      <TwoColumns
        strengths={r.report.strengths}
        dev={r.report.weaknesses}
        devLabel="Pontos de Atenção"
      />

      {/* Carreiras */}
      {r.report.careers?.length > 0 && (
        <div className="bg-white border border-gray-100 rounded-xl p-4">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Carreiras que Combinam</h3>
          <div className="flex flex-wrap gap-2">
            {r.report.careers.map((c, i) => (
              <span key={i} className="text-xs font-medium px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                {c}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ── Resultado Eneagrama ──────────────────────────────────────
function EnneagramResult({ data }: { data: Record<string, unknown> }) {
  const r = data as {
    predominant: number
    report: {
      name: string; motivation: string; basicFear: string
      strengths: string[]; challenges: string[]
    }
    interpretation: Record<number | string, string>
    scores: Record<string, number>
  }
  const VIOLET = '#7c3aed'

  return (
    <div className="space-y-5">
      <div className="text-center">
        <TypeBadge label={String(r.predominant)} bgColor={VIOLET} textColor="#fff" />
        <h2 className="text-2xl font-bold text-gray-900">{r.report.name}</h2>
        <p className="text-sm mt-2 text-gray-600 max-w-md mx-auto">
          {r.interpretation?.[r.predominant] ?? r.interpretation?.[String(r.predominant)]}
        </p>
      </div>

      {/* Motivação / Medo */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <p className="text-xs font-bold text-green-700 uppercase tracking-wide mb-1">Motivação Central</p>
          <p className="text-sm text-green-800">{r.report.motivation}</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-xs font-bold text-red-700 uppercase tracking-wide mb-1">Medo Central</p>
          <p className="text-sm text-red-800">{r.report.basicFear}</p>
        </div>
      </div>

      {/* Barras de pontuação */}
      {r.scores && (
        <div className="bg-white border border-gray-100 rounded-xl p-4 space-y-3">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Pontuação por Tipo</h3>
          {Array.from({ length: 9 }, (_, i) => i + 1).map((t) => {
            const score = r.scores[String(t)] ?? 0
            const maxScore = Math.max(...Object.values(r.scores).map(Number))
            const pct = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0
            const isMain = t === r.predominant
            return (
              <Bar
                key={t}
                label={`Tipo ${t}${isMain ? ' (predominante)' : ''}`}
                pct={pct}
                color={isMain ? VIOLET : '#c4b5fd'}
              />
            )
          })}
        </div>
      )}

      {/* Forças / Desafios */}
      <TwoColumns
        strengths={r.report.strengths}
        dev={r.report.challenges}
        devLabel="Desafios"
      />
    </div>
  )
}

// ── Resultado Temperamentos ──────────────────────────────────
function TemperamentResult({ data }: { data: Record<string, unknown> }) {
  const r = data as {
    primaryType: string
    secondaryType: string
    profile: {
      name: string; title: string; description: string
      strengths: string[]; challenges: string[]; idealRoles: string[]
    }
    interpretation: string
    percentages: Record<string, number>
  }
  const color = TEMP_COLORS[r.primaryType] ?? { bg: '#2a47f5', text: '#fff', light: '#f0f4ff' }

  return (
    <div className="space-y-5">
      <div className="text-center">
        <TypeBadge
          label={r.profile.name.charAt(0)}
          bgColor={color.bg}
          textColor={color.text}
        />
        <h2 className="text-2xl font-bold text-gray-900">{r.profile.name}</h2>
        <p className="text-sm mt-1 font-medium" style={{ color: color.bg }}>{r.profile.title}</p>
        {r.secondaryType && (
          <p className="text-xs text-gray-400 mt-1">
            Influência secundária: <strong>{TEMP_LABELS[r.secondaryType]}</strong>
          </p>
        )}
      </div>

      {/* Interpretação */}
      <div className="rounded-xl p-4 border-l-4 text-sm text-gray-700 leading-relaxed"
        style={{ backgroundColor: color.light, borderColor: color.bg }}>
        {r.interpretation}
      </div>

      {/* Barras */}
      <div className="bg-white border border-gray-100 rounded-xl p-4 space-y-3">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Distribuição dos Temperamentos</h3>
        {Object.entries(r.percentages)
          .sort(([, a], [, b]) => (b as number) - (a as number))
          .map(([type, pct]) => (
            <Bar
              key={type}
              label={TEMP_LABELS[type] ?? type}
              pct={pct as number}
              color={TEMP_COLORS[type]?.bg ?? '#6b7280'}
            />
          ))}
      </div>

      {/* Forças / Desafios */}
      <TwoColumns
        strengths={r.profile.strengths}
        dev={r.profile.challenges}
        devLabel="Desafios"
      />

      {/* Funções ideais */}
      {r.profile.idealRoles?.length > 0 && (
        <div className="bg-white border border-gray-100 rounded-xl p-4">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Funções que Combinam</h3>
          <div className="flex flex-wrap gap-2">
            {r.profile.idealRoles.map((role, i) => (
              <span key={i} className="text-xs font-medium px-3 py-1 rounded-full border"
                style={{ backgroundColor: color.light, color: color.bg, borderColor: color.bg + '40' }}>
                {role}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ── Página principal ─────────────────────────────────────────
export default async function PublicResultPage({
  params,
}: {
  params: { id: string }
}) {
  // Busca o assessment com dados do colaborador, empresa e resultado
  const assessment = await prisma.assessment.findUnique({
    where: { id: params.id },
    include: {
      employee: { select: { name: true, email: true } },
      company:  { select: { name: true } },
      result:   true,
    },
  })

  // Não encontrado ou sem resultado ainda
  if (!assessment) notFound()

  if (!assessment.result) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 max-w-md w-full p-8 text-center">
          <div className="text-4xl mb-4">⏳</div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">Avaliação ainda não concluída</h1>
          <p className="text-gray-500 text-sm">
            {assessment.employee.name} ainda não completou este teste.
            O resultado aparecerá aqui assim que a avaliação for finalizada.
          </p>
        </div>
      </div>
    )
  }

  // Faz o parse dos dados do resultado (armazenado como JSON string)
  let resultData: Record<string, unknown>
  try {
    resultData = parseResultData(assessment.result.resultData)
  } catch {
    notFound()
  }

  const testLabel  = TEST_LABELS[assessment.testType] ?? assessment.testType
  const pdfUrl     = `/api/results/${assessment.id}/pdf`
  const finishedAt = assessment.result.createdAt
    ? new Date(assessment.result.createdAt).toLocaleDateString('pt-BR', {
        day: '2-digit', month: 'long', year: 'numeric',
      })
    : null

  const LOGO_URL = process.env.NEXT_PUBLIC_LOGO_URL ?? null

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Top bar ── */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          {/* Logo ou nome da empresa */}
          <div className="flex items-center gap-3">
            {LOGO_URL ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={LOGO_URL} alt="Logo" className="h-8 w-auto object-contain" />
            ) : (
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                PC
              </div>
            )}
            <span className="text-sm font-semibold text-gray-700">
              {assessment.company.name}
            </span>
          </div>
          <span className="text-xs text-gray-400 hidden sm:block">Relatório Comportamental</span>
        </div>
      </header>

      {/* ── Conteúdo ── */}
      <main className="max-w-2xl mx-auto px-4 py-8 space-y-6">

        {/* Card de identidade */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
          <div className="flex items-start justify-between flex-wrap gap-3">
            <div>
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-0.5">
                Avaliação de
              </p>
              <h1 className="text-xl font-bold text-gray-900">{assessment.employee.name}</h1>
              <p className="text-sm text-gray-500 mt-0.5">{assessment.employee.email}</p>
            </div>
            <div className="text-right">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                {testLabel}
              </span>
              {finishedAt && (
                <p className="text-xs text-gray-400 mt-1">Concluído em {finishedAt}</p>
              )}
            </div>
          </div>
        </div>

        {/* Resultado por tipo */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
          {assessment.testType === 'DISC'        && <DiscResult        data={resultData} />}
          {assessment.testType === 'MBTI'        && <MbtiResult        data={resultData} />}
          {assessment.testType === 'ENNEAGRAM'   && <EnneagramResult   data={resultData} />}
          {assessment.testType === 'TEMPERAMENT' && <TemperamentResult data={resultData} />}
        </div>

        {/* Botão de PDF */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#2a47f5' }}
          >
            <span>↓</span>
            Baixar Relatório Completo em PDF
          </a>
          <CopyLinkButton />
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-400 pb-6">
          Relatório gerado pela <strong>Plataforma Comportamental</strong> ·{' '}
          <Link href="/" className="underline underline-offset-2">
            Saiba mais
          </Link>
        </div>

      </main>

    </div>
  )
}
