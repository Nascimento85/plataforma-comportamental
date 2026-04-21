'use client'

// ============================================================
// TestResultCard — exibido ao colaborador após finalizar o teste
// Mostra o perfil identificado de forma visualmente rica
// ============================================================

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

    const DISC_NAMES: Record<string, string> = { D: 'Dominante', I: 'Influente', S: 'Estável', C: 'Cauteloso' }

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

  return (
    <div className="text-center py-8 text-gray-500">
      Resultado processado com sucesso.
    </div>
  )
}
