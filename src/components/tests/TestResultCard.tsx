'use client'

// ============================================================
// TestResultCard — exibido ao colaborador após finalizar o teste
// Mostra o perfil identificado de forma visualmente rica
// ============================================================

import {
  LOVE_LANGUAGE_LABELS,
  LOVE_LANGUAGE_EMOJIS,
  LOVE_LANGUAGE_COLORS,
  type LoveLanguage,
} from '@/lib/engines/love-languages'
import {
  CAREER_ANCHOR_LABELS,
  CAREER_ANCHOR_EMOJIS,
  CAREER_ANCHOR_COLORS,
  type CareerAnchor,
} from '@/lib/engines/career-anchor'
import {
  EI_DOMAIN_LABELS,
  EI_DOMAIN_EMOJIS,
  EI_DOMAIN_COLORS,
  type EIDomain,
} from '@/lib/engines/emotional-intelligence'

interface TestResultCardProps {
  testType: string
  result: Record<string, unknown>
}

// Cores dos perfis
const DISC_COLORS: Record<string, string> = {
  D: 'bg-red-500',
  I: 'bg-amber-500',
  S: 'bg-green-500',
  C: 'bg-blue-500',
}

const TEMP_COLORS: Record<string, string> = {
  COLERICO: 'bg-red-500',
  SANGUINEO: 'bg-amber-500',
  MELANCOLICO: 'bg-violet-500',
  FLEUMATICO: 'bg-green-500',
}

const TEMP_LABELS: Record<string, string> = {
  COLERICO: 'Colérico',
  SANGUINEO: 'Sanguíneo',
  MELANCOLICO: 'Melancólico',
  FLEUMATICO: 'Fleumático',
}

export default function TestResultCard({ testType, result }: TestResultCardProps) {
  if (testType === 'DISC') {
    const r = result as {
      predominant: string
      secondary: string
      combination: string
      report: { name: string; tagline: string; strengths: string[]; values: string; fear: string }
      scores: { D: number; I: number; S: number; C: number }
      percentages: { D: number; I: number; S: number; C: number }
    }

    const DISC_NAMES: Record<string, string> = { D: 'Dominante (ou Executor)', I: 'Influenciador (ou Comunicador)', S: 'Estável (ou Planejador)', C: 'Conforme (ou Analista)' }

    return (
      <div className="space-y-6">
        <div className="text-center">
          <div
            className={`inline-flex items-center justify-center w-20 h-20 rounded-full text-white text-3xl font-bold mb-4 ${DISC_COLORS[r.predominant]}`}
          >
            {r.predominant}
          </div>
          <h2 className="text-2xl font-bold text-gray-900">{r.report.name}</h2>
          <p className="text-brand-600 font-medium text-sm mt-1">{r.report.tagline}</p>
          <p className="text-gray-500 text-xs mt-1">Combinação predominante: <strong>{r.combination}</strong></p>
        </div>

        {/* Barras de percentual */}
        <div className="card p-5 space-y-3">
          <h3 className="font-semibold text-gray-800 text-sm">Distribuição do seu perfil</h3>
          {(['D', 'I', 'S', 'C'] as const).map((p) => (
            <div key={p}>
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span className="font-medium">{p} — {DISC_NAMES[p]}</span>
                <span>{Math.round(r.percentages[p] * 100)}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${DISC_COLORS[p]}`}
                  style={{ width: `${Math.round(r.percentages[p] * 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Top 3 forças */}
        <div className="card p-5">
          <h3 className="font-semibold text-gray-800 text-sm mb-3">Seus pontos fortes</h3>
          <ul className="space-y-2">
            {r.report.strengths.slice(0, 3).map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-green-500 mt-0.5">✓</span>
                {s}
              </li>
            ))}
          </ul>
        </div>

        {/* Motivação e medo */}
        <div className="grid grid-cols-2 gap-4">
          <div className="card p-4 bg-green-50 border-green-200">
            <p className="text-xs font-semibold text-green-700 mb-1">Valor Central</p>
            <p className="text-sm text-green-800">{r.report.values}</p>
          </div>
          <div className="card p-4 bg-red-50 border-red-200">
            <p className="text-xs font-semibold text-red-700 mb-1">Maior Receio</p>
            <p className="text-sm text-red-800">{r.report.fear}</p>
          </div>
        </div>
      </div>
    )
  }

  if (testType === 'MBTI') {
    const r = result as {
      type: string
      report: { name: string; tagline: string; description: string; strengths: string[]; careers: string[] }
    }

    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-brand-600 text-white text-2xl font-bold mb-4">
            {r.type}
          </div>
          <h2 className="text-2xl font-bold text-gray-900">{r.report.name}</h2>
          <p className="text-brand-600 font-medium text-sm mt-1">"{r.report.tagline}"</p>
          <p className="text-gray-500 text-sm mt-3 max-w-md mx-auto">{r.report.description}</p>
        </div>

        <div className="card p-5">
          <h3 className="font-semibold text-gray-800 text-sm mb-3">Suas principais forças</h3>
          <ul className="space-y-2">
            {r.report.strengths.slice(0, 4).map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-brand-500 mt-0.5">✓</span>
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div className="card p-5">
          <h3 className="font-semibold text-gray-800 text-sm mb-3">Carreiras que combinam com você</h3>
          <div className="flex flex-wrap gap-2">
            {r.report.careers.map((c, i) => (
              <span key={i} className="text-xs font-medium px-3 py-1 rounded-full bg-brand-50 text-brand-700 border border-brand-200">
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (testType === 'ENNEAGRAM') {
    const r = result as {
      predominant: number
      report: { name: string; motivation: string; basicFear: string; strengths: string[] }
      interpretation: Record<number, string>
    }

    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-violet-600 text-white text-3xl font-bold mb-4">
            {r.predominant}
          </div>
          <h2 className="text-2xl font-bold text-gray-900">{r.report.name}</h2>
          <p className="text-gray-500 text-sm mt-2 max-w-md mx-auto">{r.interpretation[r.predominant]}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="card p-4 bg-green-50 border-green-200">
            <p className="text-xs font-semibold text-green-700 mb-1">Motivação Central</p>
            <p className="text-sm text-green-800">{r.report.motivation}</p>
          </div>
          <div className="card p-4 bg-red-50 border-red-200">
            <p className="text-xs font-semibold text-red-700 mb-1">Medo Central</p>
            <p className="text-sm text-red-800">{r.report.basicFear}</p>
          </div>
        </div>

        <div className="card p-5">
          <h3 className="font-semibold text-gray-800 text-sm mb-3">Suas principais forças</h3>
          <ul className="space-y-2">
            {r.report.strengths.slice(0, 3).map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-violet-500 mt-0.5">✓</span>
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  if (testType === 'TEMPERAMENT') {
    const r = result as {
      primaryType: string
      secondaryType: string
      profile: { name: string; title: string; description: string; strengths: string[]; idealRoles: string[] }
      interpretation: string
      percentages: Record<string, number>
    }

    const bgColor = TEMP_COLORS[r.primaryType] ?? 'bg-brand-600'

    return (
      <div className="space-y-6">
        <div className="text-center">
          <div
            className={`inline-flex items-center justify-center w-20 h-20 rounded-full text-white text-xl font-bold mb-4 ${bgColor}`}
          >
            {r.profile.name.charAt(0)}
          </div>
          <h2 className="text-2xl font-bold text-gray-900">{r.profile.name}</h2>
          <p className="text-brand-600 font-medium text-sm mt-1">{r.profile.title}</p>
          <p className="text-gray-500 text-sm mt-3 max-w-md mx-auto">{r.interpretation}</p>
        </div>

        {/* Distribuição */}
        <div className="card p-5 space-y-3">
          <h3 className="font-semibold text-gray-800 text-sm">Distribuição dos temperamentos</h3>
          {Object.entries(r.percentages)
            .sort(([, a], [, b]) => b - a)
            .map(([type, pct]) => (
              <div key={type}>
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span className="font-medium">{TEMP_LABELS[type]}</span>
                  <span>{pct}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${TEMP_COLORS[type]}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            ))}
        </div>

        <div className="card p-5">
          <h3 className="font-semibold text-gray-800 text-sm mb-3">Seus pontos fortes</h3>
          <ul className="space-y-2">
            {r.profile.strengths.slice(0, 3).map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-green-500 mt-0.5">✓</span>
                {s}
              </li>
            ))}
          </ul>
        </div>

        {/* Cargos ideais */}
        <div className="card p-5">
          <h3 className="font-semibold text-gray-800 text-sm mb-3">Funções que combinam com você</h3>
          <div className="flex flex-wrap gap-2">
            {r.profile.idealRoles.map((role, i) => (
              <span
                key={i}
                className="text-xs font-medium px-3 py-1 rounded-full bg-brand-50 text-brand-700 border border-brand-200"
              >
                {role}
              </span>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (testType === 'ARCHETYPE') {
    const r = result as {
      dominant: string
      secondary: string
      shadow: string
      percentages: Record<string, number>
      report: { name: string; title: string; tagline: string; motivation: string; gift: string; strengths: string[] }
      secondaryReport: { name: string; title: string }
    }

    const topThree = Object.entries(r.percentages)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)

    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-brand-600 text-white text-2xl font-bold mb-4">
            {r.report.name.charAt(0)}
          </div>
          <h2 className="text-2xl font-bold text-gray-900">{r.report.name}</h2>
          <p className="text-brand-600 font-medium text-sm mt-1">{r.report.title}</p>
          <p className="text-gray-500 text-xs mt-1 italic">"{r.report.tagline}"</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="card p-4 bg-green-50 border-green-200">
            <p className="text-xs font-semibold text-green-700 mb-1">Dom Principal</p>
            <p className="text-sm text-green-800">{r.report.gift}</p>
          </div>
          <div className="card p-4 bg-brand-50 border-brand-200">
            <p className="text-xs font-semibold text-brand-700 mb-1">Motivação</p>
            <p className="text-sm text-brand-800">{r.report.motivation}</p>
          </div>
        </div>

        <div className="card p-5">
          <h3 className="font-semibold text-gray-800 text-sm mb-3">Top 3 arquétipos</h3>
          <div className="space-y-2">
            {topThree.map(([name, pct], i) => (
              <div key={name}>
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span className="font-medium">{i === 0 ? '★ ' : ''}{name}</span>
                  <span>{Math.round(pct)}%</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-600 rounded-full" style={{ width: `${pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-5">
          <h3 className="font-semibold text-gray-800 text-sm mb-3">Seus pontos fortes</h3>
          <ul className="space-y-2">
            {r.report.strengths.slice(0, 3).map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-brand-500 mt-0.5">✓</span>
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  if (testType === 'ARCHETYPE_FEMININE') {
    const r = result as {
      dominant: string
      secondary: string
      toActivate: string
      percentages: Record<string, number>
      report: { name: string; title: string; goddess: string; tagline: string; essence: string; strengths: string[] }
      secondaryReport: { name: string; title: string }
      activationReport: { name: string; activationTip: string }
    }

    const topThree = Object.entries(r.percentages)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)

    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-violet-600 text-white text-2xl font-bold mb-4">
            {r.report.name.charAt(0)}
          </div>
          <h2 className="text-2xl font-bold text-gray-900">{r.report.name}</h2>
          <p className="text-violet-600 font-medium text-sm mt-1">{r.report.title}</p>
          <p className="text-gray-400 text-xs mt-1">Deusa: {r.report.goddess} · "{r.report.tagline}"</p>
        </div>

        <div className="card p-4 bg-violet-50 border-violet-200">
          <p className="text-xs font-semibold text-violet-700 mb-1">Essência</p>
          <p className="text-sm text-violet-800">{r.report.essence}</p>
        </div>

        <div className="card p-5">
          <h3 className="font-semibold text-gray-800 text-sm mb-3">Top 3 energias</h3>
          <div className="space-y-2">
            {topThree.map(([name, pct], i) => (
              <div key={name}>
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span className="font-medium">{i === 0 ? '★ ' : ''}{name}</span>
                  <span>{Math.round(pct)}%</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-violet-600 rounded-full" style={{ width: `${pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-5">
          <h3 className="font-semibold text-gray-800 text-sm mb-3">Suas principais forças</h3>
          <ul className="space-y-2">
            {r.report.strengths.slice(0, 3).map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-violet-500 mt-0.5">✓</span>
                {s}
              </li>
            ))}
          </ul>
        </div>

        {r.activationReport && (
          <div className="card p-4 bg-amber-50 border-amber-200">
            <p className="text-xs font-semibold text-amber-700 mb-1">💫 Energia a ativar: {r.activationReport.name}</p>
            <p className="text-sm text-amber-800">{r.activationReport.activationTip}</p>
          </div>
        )}
      </div>
    )
  }

  // ── 5 Linguagens do Amor ──────────────────────────────────────
  if (testType === 'LOVE_LANGUAGES') {
    const r = result as {
      primaryLanguage: LoveLanguage
      secondaryLanguage: LoveLanguage
      ranking: LoveLanguage[]
      scores: Record<LoveLanguage, number>
      percentages: Record<LoveLanguage, number>
      report: { name: string; tagline: string; summary: string; professional: string; personal: string; tips: string[] }
    }

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full text-4xl mb-4 ${LOVE_LANGUAGE_COLORS[r.primaryLanguage]}`}>
            {LOVE_LANGUAGE_EMOJIS[r.primaryLanguage]}
          </div>
          <h2 className="text-2xl font-bold text-gray-900">{r.report.name}</h2>
          <p className="text-rose-600 font-medium text-sm mt-1">{r.report.tagline}</p>
        </div>

        {/* Distribuição */}
        <div className="card p-5 space-y-3">
          <h3 className="font-semibold text-gray-800 text-sm">Suas 5 linguagens — do mais ao menos presente</h3>
          {r.ranking.map((lang) => (
            <div key={lang}>
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span className="font-medium">{LOVE_LANGUAGE_EMOJIS[lang]} {LOVE_LANGUAGE_LABELS[lang]}</span>
                <span>{r.scores[lang]} pts</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${LOVE_LANGUAGE_COLORS[lang]}`}
                  style={{ width: `${Math.round(r.percentages[lang] * 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Resumo */}
        <div className="card p-5">
          <h3 className="font-semibold text-gray-800 text-sm mb-2">O que isso significa</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{r.report.summary}</p>
        </div>

        {/* Linguagem secundária */}
        <div className="card p-4 bg-rose-50 border-rose-100">
          <p className="text-xs font-semibold text-rose-600 mb-1">
            {LOVE_LANGUAGE_EMOJIS[r.secondaryLanguage]} Sua linguagem secundária: {LOVE_LANGUAGE_LABELS[r.secondaryLanguage]}
          </p>
          <p className="text-sm text-rose-800">Esta é a segunda forma como você mais se sente valorizado(a). Em relacionamentos próximos, ambas as linguagens contam.</p>
        </div>
      </div>
    )
  }

  if (testType === 'CAREER_ANCHOR') {
    const r = result as {
      primaryAnchor: CareerAnchor
      secondaryAnchor: CareerAnchor
      scores: Record<CareerAnchor, number>
      percentages: Record<CareerAnchor, number>
      ranking: Array<{ anchor: CareerAnchor; score: number; percentage: number }>
      primaryReport: { name: string; tagline: string; summary: string; motivation: string; idealRoles: string[] }
      secondaryReport: { name: string; tagline: string }
    }

    const primaryColor = CAREER_ANCHOR_COLORS[r.primaryAnchor]

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full text-3xl text-white mb-4"
               style={{ background: primaryColor }}>
            {CAREER_ANCHOR_EMOJIS[r.primaryAnchor]}
          </div>
          <p className="text-xs uppercase tracking-widest font-semibold mb-1" style={{ color: primaryColor }}>
            Sua Âncora de Carreira
          </p>
          <h2 className="text-2xl font-bold text-gray-900">{r.primaryReport.name}</h2>
          <p className="text-sm text-gray-500 italic mt-1">{r.primaryReport.tagline}</p>
        </div>

        {/* Ranking das 8 âncoras */}
        <div className="card p-5 space-y-3">
          <h3 className="font-semibold text-gray-800 text-sm">Suas 8 âncoras — do mais ao menos forte</h3>
          {r.ranking.map(({ anchor, score, percentage }) => (
            <div key={anchor}>
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span className="font-medium">{CAREER_ANCHOR_EMOJIS[anchor]} {CAREER_ANCHOR_LABELS[anchor]}</span>
                <span>{score} / 25</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${percentage}%`, background: CAREER_ANCHOR_COLORS[anchor] }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Resumo */}
        <div className="card p-5">
          <h3 className="font-semibold text-gray-800 text-sm mb-2">O que isso significa</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{r.primaryReport.summary}</p>
        </div>

        {/* Motivação */}
        <div className="card p-5">
          <h3 className="font-semibold text-gray-800 text-sm mb-2">O que te motiva</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{r.primaryReport.motivation}</p>
        </div>

        {/* Cargos ideais */}
        <div className="card p-5">
          <h3 className="font-semibold text-gray-800 text-sm mb-3">Cargos e ambientes alinhados</h3>
          <ul className="space-y-2">
            {r.primaryReport.idealRoles.map((role, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="font-bold mt-0.5" style={{ color: primaryColor }}>✓</span>
                {role}
              </li>
            ))}
          </ul>
        </div>

        {/* Âncora secundária */}
        <div className="card p-4" style={{ background: `${CAREER_ANCHOR_COLORS[r.secondaryAnchor]}11`, borderColor: `${CAREER_ANCHOR_COLORS[r.secondaryAnchor]}33` }}>
          <p className="text-xs font-semibold mb-1" style={{ color: CAREER_ANCHOR_COLORS[r.secondaryAnchor] }}>
            {CAREER_ANCHOR_EMOJIS[r.secondaryAnchor]} Sua âncora secundária: {r.secondaryReport.name}
          </p>
          <p className="text-sm text-gray-700">{r.secondaryReport.tagline} — Esta é a segunda força que rege suas decisões profissionais.</p>
        </div>
      </div>
    )
  }

  if (testType === 'EMOTIONAL_INTELLIGENCE') {
    const r = result as {
      primaryStrength: EIDomain
      primaryDevelopment: EIDomain
      averagePercentage: number
      globalLevel: 'high' | 'mid' | 'low'
      scores: Record<EIDomain, number>
      percentages: Record<EIDomain, number>
      domains: Array<{
        domain: EIDomain
        score: number
        percentage: number
        level: 'high' | 'mid' | 'low'
        feedback: string
      }>
      radarData: Array<{ domain: EIDomain; label: string; value: number; max: number }>
    }

    const strengthColor = EI_DOMAIN_COLORS[r.primaryStrength]

    // SVG radar chart (5 pontas)
    const cx = 130, cy = 120, R = 90
    const angles = [-Math.PI / 2, -Math.PI / 2 + (2 * Math.PI) / 5, -Math.PI / 2 + (4 * Math.PI) / 5, -Math.PI / 2 + (6 * Math.PI) / 5, -Math.PI / 2 + (8 * Math.PI) / 5]
    const radarPoints = r.radarData.map((d, i) => {
      const radius = (d.value / 100) * R
      const x = cx + Math.cos(angles[i]) * radius
      const y = cy + Math.sin(angles[i]) * radius
      return `${x},${y}`
    }).join(' ')
    const labelPositions = r.radarData.map((d, i) => {
      const labelR = R + 22
      const x = cx + Math.cos(angles[i]) * labelR
      const y = cy + Math.sin(angles[i]) * labelR
      return { x, y, label: d.label, value: d.value, color: EI_DOMAIN_COLORS[d.domain] }
    })

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full text-3xl text-white mb-4"
               style={{ background: strengthColor }}>
            {EI_DOMAIN_EMOJIS[r.primaryStrength]}
          </div>
          <p className="text-xs uppercase tracking-widest font-semibold mb-1" style={{ color: strengthColor }}>
            QE Geral · {r.averagePercentage}%
          </p>
          <h2 className="text-2xl font-bold text-gray-900">
            {r.globalLevel === 'high' ? 'Inteligência Emocional Elevada' : r.globalLevel === 'mid' ? 'IE em Desenvolvimento' : 'Espaço Importante de Crescimento'}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Sua força: <strong>{EI_DOMAIN_LABELS[r.primaryStrength]}</strong> · A desenvolver: <strong>{EI_DOMAIN_LABELS[r.primaryDevelopment]}</strong>
          </p>
        </div>

        {/* Radar de competências */}
        <div className="card p-5">
          <h3 className="font-semibold text-gray-800 text-sm mb-4 text-center">Radar das 5 dimensões de Goleman</h3>
          <div className="flex justify-center">
            <svg viewBox="0 0 260 260" className="w-full max-w-xs">
              {/* Grid pentagonal */}
              {[0.25, 0.5, 0.75, 1].map((scale) => (
                <polygon
                  key={scale}
                  points={angles.map((a) => `${cx + Math.cos(a) * R * scale},${cy + Math.sin(a) * R * scale}`).join(' ')}
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="1"
                />
              ))}
              {/* Eixos */}
              {angles.map((a, i) => (
                <line key={i}
                  x1={cx} y1={cy}
                  x2={cx + Math.cos(a) * R} y2={cy + Math.sin(a) * R}
                  stroke="#e5e7eb" strokeWidth="1"/>
              ))}
              {/* Polígono de pontuação */}
              <polygon points={radarPoints} fill={strengthColor} fillOpacity="0.25" stroke={strengthColor} strokeWidth="2"/>
              {/* Pontos */}
              {r.radarData.map((d, i) => {
                const radius = (d.value / 100) * R
                const x = cx + Math.cos(angles[i]) * radius
                const y = cy + Math.sin(angles[i]) * radius
                return <circle key={i} cx={x} cy={y} r="4" fill={EI_DOMAIN_COLORS[d.domain]}/>
              })}
              {/* Labels */}
              {labelPositions.map((p, i) => (
                <text key={i} x={p.x} y={p.y} textAnchor="middle" fontSize="10" fontWeight="700" fill={p.color}>
                  {p.label}
                  <tspan x={p.x} dy="12" fontSize="11" fill="#374151">{p.value}%</tspan>
                </text>
              ))}
            </svg>
          </div>
        </div>

        {/* Breakdown por domínio */}
        <div className="card p-5 space-y-4">
          <h3 className="font-semibold text-gray-800 text-sm">Análise por domínio</h3>
          {r.domains.map((d) => (
            <div key={d.domain} className="space-y-1.5">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold" style={{ color: EI_DOMAIN_COLORS[d.domain] }}>
                  {EI_DOMAIN_EMOJIS[d.domain]} {EI_DOMAIN_LABELS[d.domain]}
                </span>
                <span className="text-xs font-bold" style={{ color: EI_DOMAIN_COLORS[d.domain] }}>
                  {d.percentage}% · {d.level === 'high' ? 'Alto' : d.level === 'mid' ? 'Médio' : 'Baixo'}
                </span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full"
                     style={{ width: `${d.percentage}%`, background: EI_DOMAIN_COLORS[d.domain] }}/>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">{d.feedback}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="text-center py-8 text-gray-500">
      Resultado processado com sucesso.
    </div>
  )
}
