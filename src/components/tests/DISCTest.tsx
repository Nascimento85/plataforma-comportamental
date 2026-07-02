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

// Cores DISC vibrantes, calibradas para o tema escuro do teste
const DISC_HEX: Record<string, string> = {
  D: '#ef4444', // Dominância — vermelho
  I: '#f59e0b', // Influência — âmbar
  S: '#22c55e', // Estabilidade — verde
  C: '#3b82f6', // Conformidade — azul
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
      router.push(`/result/${outcome.assessmentId ?? assessmentId}`)
      return
    }
    setError(outcome.error)
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
        <div className="flex justify-between text-[13px] mb-1.5 font-sans" style={{ color: 'rgba(240,236,227,0.6)' }}>
          <span>Grupo {currentGroup + 1} de {DISC_GROUPS.length}</span>
          <span>{completedGroups} concluídos</span>
        </div>
        <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #c9a84c, #d4943a)' }}
          />
        </div>
      </div>

      {/* Instruções */}
      <div className="rounded-2xl p-4 text-[14px] font-sans leading-relaxed"
           style={{ background: 'rgba(61,79,124,0.12)', border: '1px solid rgba(61,79,124,0.32)', color: 'rgba(240,236,227,0.82)' }}>
        <strong style={{ color: '#a9c0f0' }}>Como responder:</strong> em cada grupo, distribua os pontos de{' '}
        <strong style={{ color: '#f0ece3' }}>4 (mais parecido com você)</strong> a{' '}
        <strong style={{ color: '#f0ece3' }}>1 (menos parecido)</strong>. Cada número é usado uma única vez por grupo.
      </div>

      {/* Card do grupo atual */}
      <div className="rounded-3xl p-5 sm:p-6" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(58,61,69,0.7)' }}>
        <h3 className="font-sans font-bold text-[12px] mb-4 uppercase tracking-[0.14em]" style={{ color: 'rgba(240,236,227,0.55)' }}>
          Grupo {group.groupNumber} — {group.theme}
        </h3>

        {/* Legenda das colunas */}
        <div className="flex items-center justify-end gap-1.5 mb-2 pr-1">
          <span className="text-[11px] font-sans" style={{ color: 'rgba(240,236,227,0.42)' }}>mais parecido</span>
          <span className="text-[11px] font-sans" style={{ color: 'rgba(240,236,227,0.3)' }}>→</span>
          <span className="text-[11px] font-sans" style={{ color: 'rgba(240,236,227,0.42)' }}>menos</span>
        </div>

        <div className="space-y-2.5">
          {(['D', 'I', 'S', 'C'] as const).map((profile) => {
            const option = group.options[profile]
            const currentVal = groupRanking?.[profile] ?? null
            const hex = DISC_HEX[profile]

            return (
              <div key={profile} className="flex items-center gap-3 rounded-2xl px-3 py-2.5"
                   style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(58,61,69,0.5)' }}>
                {/* Acento de cor da linha */}
                <span className="w-1.5 h-9 rounded-full flex-shrink-0"
                      style={{ background: hex, opacity: currentVal ? 1 : 0.45 }} />

                {/* Palavra */}
                <div className="flex-1 font-medium text-[15px]" style={{ color: '#f0ece3' }}>{option}</div>

                {/* Seletor de pontuação 4–1 */}
                <div className="flex gap-1.5 sm:gap-2">
                  {[4, 3, 2, 1].map((val) => {
                    const isSelected = currentVal === val
                    const isDisabled = !isSelected && usedValues.includes(val)

                    return (
                      <button
                        key={val}
                        onClick={() => assignRanking(profile, val)}
                        disabled={isDisabled}
                        className="w-10 h-10 rounded-xl border-2 text-[15px] font-bold transition-all hover:-translate-y-0.5 disabled:hover:translate-y-0"
                        style={isSelected
                          ? { background: hex, borderColor: hex, color: '#fff', boxShadow: `0 4px 14px ${hex}55` }
                          : isDisabled
                            ? { background: 'transparent', borderColor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.22)', cursor: 'not-allowed' }
                            : { background: `${hex}14`, borderColor: `${hex}80`, color: hex }}
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
          <div className="mt-4 text-[14px] font-sans font-semibold flex items-center gap-1.5" style={{ color: '#5fbf6a' }}>
            ✓ Grupo concluído
          </div>
        )}
      </div>

      {/* Aviso de grupos incompletos */}
      {completedGroups < DISC_GROUPS.length && currentGroup === DISC_GROUPS.length - 1 && (
        <div className="text-[14px] font-sans rounded-xl px-4 py-3"
             style={{ background: 'rgba(212,148,58,0.12)', border: '1px solid rgba(212,148,58,0.32)', color: '#e8c16a' }}>
          ⚠️ Ainda faltam {DISC_GROUPS.length - completedGroups} grupo(s) para preencher. Clique em &quot;Finalizar teste&quot; para ser direcionado ao primeiro grupo incompleto.
        </div>
      )}

      {/* Erro */}
      {error && (
        <div className="text-[14px] font-sans rounded-xl px-4 py-3"
             style={{ background: 'rgba(196,122,114,0.15)', border: '1px solid rgba(196,122,114,0.45)', color: '#f0a892' }}>
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
