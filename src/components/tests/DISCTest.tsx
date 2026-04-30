'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { DISC_GROUP_SETS, getDiscVersion } from '@/lib/engines/disc'
import TestResultCard from '@/components/tests/TestResultCard'
import { submitTestWithFallback } from '@/lib/submit-test'

interface DISCAnswer {
  groupId: number
  profileD: number
  profileI: number
  profileS: number
  profileC: number
}

const PROFILE_COLORS: Record<string, string> = {
  D: 'border-red-400 bg-red-50 hover:bg-red-100',
  I: 'border-amber-400 bg-amber-50 hover:bg-amber-100',
  S: 'border-green-400 bg-green-50 hover:bg-green-100',
  C: 'border-blue-400 bg-blue-50 hover:bg-blue-100',
}
const PROFILE_SELECTED: Record<string, string> = {
  D: 'border-red-500 bg-red-100 ring-2 ring-red-300',
  I: 'border-amber-500 bg-amber-100 ring-2 ring-amber-300',
  S: 'border-green-500 bg-green-100 ring-2 ring-green-300',
  C: 'border-blue-500 bg-blue-100 ring-2 ring-blue-300',
}

/**
 * Componente DISC Test
 *
 * O colaborador vê 25 grupos. Em cada grupo há 4 palavras (D/I/S/C),
 * e deve distribuir pontos 4-3-2-1 (ordem de identificação).
 *
 * Regra: cada grupo deve ter exatamente 4+3+2+1 = 10 pontos distribuídos,
 * com cada posição usada exatamente uma vez por grupo.
 */
export default function DISCTest({
  assessmentId,
  token,
}: {
  assessmentId: string
  token: string
}) {
  const router = useRouter()

  const DISC_GROUPS = DISC_GROUP_SETS[getDiscVersion(token)]

  // Para cada grupo, armazenamos o ranking atribuído a cada perfil (null = não atribuído)
  const [rankings, setRankings] = useState<Record<number, Record<string, number | null>>>(
    () =>
      Object.fromEntries(
        DISC_GROUPS.map((g) => [g.groupNumber, { D: null, I: null, S: null, C: null }])
      )
  )

  const [currentGroup, setCurrentGroup] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)
  const [resultData, setResultData] = useState<Record<string, unknown> | null>(null)

  const group = DISC_GROUPS[currentGroup]
  const groupRanking = rankings[group.groupNumber]

  // Retorna os valores já usados neste grupo
  const usedValues = Object.values(groupRanking).filter((v) => v !== null) as number[]

  function assignRanking(profile: string, value: number) {
    setRankings((prev) => {
      const groupCopy = { ...prev[group.groupNumber] }

      // Remove o valor se já estava atribuído a outro perfil
      for (const key of Object.keys(groupCopy)) {
        if (groupCopy[key] === value) groupCopy[key] = null
      }

      // Toggle: se clicar no mesmo valor já atribuído, remove
      if (groupCopy[profile] === value) {
        groupCopy[profile] = null
      } else {
        groupCopy[profile] = value
      }

      return { ...prev, [group.groupNumber]: groupCopy }
    })
  }

  function isGroupComplete(groupNumber: number) {
    const r = rankings[groupNumber]
    const vals = Object.values(r).filter((v) => v !== null) as number[]
    return vals.length === 4 && new Set(vals).size === 4
  }

  const completedGroups = DISC_GROUPS.filter((g) => isGroupComplete(g.groupNumber)).length
  const progress = Math.round((completedGroups / DISC_GROUPS.length) * 100)
  const currentComplete = isGroupComplete(group.groupNumber)

  async function handleSubmit() {
    // Verifica se todos os grupos estão completos
    const incomplete = DISC_GROUPS.find((g) => !isGroupComplete(g.groupNumber))
    if (incomplete) {
      setError(`Grupo ${incomplete.groupNumber} ainda não foi preenchido completamente.`)
      setCurrentGroup(DISC_GROUPS.findIndex((g) => g.groupNumber === incomplete.groupNumber))
      return
    }

    setSubmitting(true)
    setError('')

    // Monta o array de respostas
    const answers: DISCAnswer[] = DISC_GROUPS.map((g) => {
      const r = rankings[g.groupNumber]
      return {
        groupId: g.groupNumber,
        profileD: r.D as number,
        profileI: r.I as number,
        profileS: r.S as number,
        profileC: r.C as number,
      }
    })

    const outcome = await submitTestWithFallback({ token, answers })
    if (outcome.ok) {
      setResultData(outcome.result ?? null)
      setDone(true)
    } else {
      setError(outcome.error)
    }
    setSubmitting(false)
  }

  if (done) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="text-5xl mb-3">🎉</div>
          <h2 className="text-xl font-bold text-gray-900">Avaliação concluída!</h2>
          <p className="text-gray-500 text-sm mt-1">
            Aqui está um resumo do seu perfil identificado:
          </p>
        </div>
        {resultData && <TestResultCard testType="DISC" result={resultData} />}
        <div className="card p-4 bg-brand-50 border-brand-200 text-center text-sm text-brand-700">
          O relatório completo e detalhado será disponibilizado pela sua empresa.
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Barra de progresso */}
      <div>
        <div className="flex justify-between text-sm text-gray-500 mb-1">
          <span>Grupo {currentGroup + 1} de {DISC_GROUPS.length}</span>
          <span>{completedGroups} concluídos</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-brand-500 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Instruções */}
      <div className="bg-brand-50 border border-brand-200 rounded-xl p-4 text-sm text-brand-800">
        <strong>Como responder:</strong> Para cada grupo de 4 palavras, distribua os pontos de <strong>4 (mais parecido com você)</strong> a <strong>1 (menos parecido)</strong>. Cada número só pode ser usado uma vez por grupo.
      </div>

      {/* Card do grupo atual */}
      <div className="card p-6">
        <h3 className="font-semibold text-gray-700 text-sm mb-4 uppercase tracking-wide">
          Grupo {group.groupNumber} — {group.theme}
        </h3>

        <div className="space-y-3">
          {(['D', 'I', 'S', 'C'] as const).map((profile) => {
            const option = group.options[profile]
            const currentVal = groupRanking?.[profile] ?? null

            return (
              <div key={profile} className="flex items-center gap-3">
                {/* Palavra */}
                <div className="flex-1 text-gray-900 font-medium">{option}</div>

                {/* Seletor de pontuação 1–4 */}
                <div className="flex gap-2">
                  {[4, 3, 2, 1].map((val) => {
                    const isSelected = currentVal === val
                    const isDisabled = !isSelected && usedValues.includes(val)

                    return (
                      <button
                        key={val}
                        onClick={() => assignRanking(profile, val)}
                        disabled={isDisabled}
                        className={`w-9 h-9 rounded-lg border-2 text-sm font-bold transition-all
                          ${isSelected ? PROFILE_SELECTED[profile] : PROFILE_COLORS[profile]}
                          ${isDisabled ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}
                        `}
                      >
                        {val}
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        {currentComplete && (
          <div className="mt-4 text-green-600 text-sm font-medium flex items-center gap-1">
            ✓ Grupo concluído
          </div>
        )}
      </div>

      {/* Aviso de grupos incompletos */}
      {completedGroups < DISC_GROUPS.length && currentGroup === DISC_GROUPS.length - 1 && (
        <div className="bg-amber-50 border border-amber-200 text-amber-700 text-sm rounded-lg px-4 py-3">
          ⚠️ Ainda faltam {DISC_GROUPS.length - completedGroups} grupo(s) para preencher. Clique em "Finalizar teste" para ser direcionado ao primeiro grupo incompleto.
        </div>
      )}

      {/* Erro */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
          {error}
        </div>
      )}

      {/* Navegação */}
      <div className="flex gap-3">
        <button
          onClick={() => setCurrentGroup((prev) => Math.max(0, prev - 1))}
          disabled={currentGroup === 0}
          className="btn-secondary flex-1"
        >
          ← Anterior
        </button>

        {currentGroup < DISC_GROUPS.length - 1 ? (
          <button
            onClick={() => setCurrentGroup((prev) => prev + 1)}
            className="btn-primary flex-1"
          >
            Próximo →
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="btn-primary flex-1"
          >
            {submitting ? 'Enviando...' : '✓ Finalizar teste'}
          </button>
        )}
      </div>
    </div>
  )
}
