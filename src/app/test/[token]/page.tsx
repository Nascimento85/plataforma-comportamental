import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import TestIntroWrapper from '@/components/tests/TestIntroWrapper'
import TestResultCard from '@/components/tests/TestResultCard'
import { parseResultData } from '@/lib/parseResult'

export const metadata: Metadata = { title: 'Avaliação Comportamental' }

interface PageProps {
  params: { token: string }
}

// Nomes dos testes do bundle em português
const BUNDLE_TEST_LABELS: Record<string, string> = {
  DISC:        'DISC — Perfil Comportamental',
  MBTI:        'MBTI — 16 Tipos de Personalidade',
  ENNEAGRAM:   'Eneagrama — 9 Tipos',
  TEMPERAMENT: '4 Temperamentos',
}

const BUNDLE_TEST_ORDER = ['DISC', 'MBTI', 'ENNEAGRAM', 'TEMPERAMENT']

export default async function TestPage({ params }: PageProps) {
  const assessment = await prisma.assessment.findUnique({
    where: { token: params.token },
    include: {
      employee: { select: { name: true } },
      result: true,
    },
  })

  if (!assessment) return notFound()

  // Já completou
  if (assessment.status === 'COMPLETED') {
    const resultData = assessment.result?.resultData
      ? parseResultData(assessment.result.resultData)
      : null

    // ── Lógica de bundle: redireciona para próximo teste ──────
    let nextToken: string | null = null
    let nextTestLabel: string | null = null
    let bundleProgress: { testType: string; completed: boolean }[] = []

    if (assessment.bundleId) {
      const bundleAssessments = await prisma.assessment.findMany({
        where: { bundleId: assessment.bundleId },
        orderBy: { bundleOrder: 'asc' },
        select: { token: true, testType: true, status: true, bundleOrder: true },
      })

      bundleProgress = bundleAssessments.map((a) => ({
        testType: a.testType,
        completed: a.status === 'COMPLETED',
      }))

      const nextAssessment = bundleAssessments.find((a) => a.status !== 'COMPLETED')
      if (nextAssessment) {
        nextToken = nextAssessment.token
        nextTestLabel = BUNDLE_TEST_LABELS[nextAssessment.testType] ?? nextAssessment.testType
      }
    }

    const allBundleDone = assessment.bundleId && bundleProgress.length > 0 && bundleProgress.every((a) => a.completed)

    return (
      <TestShell>
        <div className="space-y-5">
          <div className="text-center">
            <div className="text-5xl mb-3">{allBundleDone ? '🏆' : '✅'}</div>
            <h2 className="font-serif font-semibold text-2xl text-soul-ink">
              {allBundleDone ? 'Bundle concluído!' : 'Teste concluído!'}
            </h2>
            <p className="text-sm font-sans mt-1" style={{ color: 'rgba(28,26,23,0.5)' }}>
              {allBundleDone
                ? 'Você completou todos os 4 testes comportamentais!'
                : 'Aqui está o resumo do seu perfil identificado:'}
            </p>
          </div>

          {resultData && assessment.result && (
            <TestResultCard testType={assessment.result.testType} result={resultData} />
          )}

          {/* Progresso do bundle */}
          {assessment.bundleId && bundleProgress.length > 0 && (
            <div className="bg-white rounded-3xl p-5" style={{ border: '1px solid rgba(232,226,214,0.6)' }}>
              <p className="text-[10px] font-sans font-semibold uppercase tracking-[0.15em] mb-3"
                 style={{ color: 'rgba(28,26,23,0.35)' }}>
                Progresso do bundle
              </p>
              <div className="space-y-2.5">
                {bundleProgress.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold font-sans flex-shrink-0"
                         style={item.completed ? {
                           background: 'rgba(122,158,126,0.15)', color: '#5a8a5e', border: '1px solid rgba(122,158,126,0.3)',
                         } : {
                           background: 'rgba(232,226,214,0.5)', color: 'rgba(28,26,23,0.35)', border: '1px solid rgba(232,226,214,0.8)',
                         }}>
                      {item.completed ? '✓' : i + 1}
                    </div>
                    <span className="text-sm font-sans"
                          style={{ color: item.completed ? 'rgba(28,26,23,0.8)' : 'rgba(28,26,23,0.35)', fontWeight: item.completed ? 500 : 400 }}>
                      {BUNDLE_TEST_LABELS[item.testType] ?? item.testType}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA para próximo teste do bundle */}
          {nextToken && nextTestLabel && (
            <a
              href={`/test/${nextToken}`}
              className="block w-full text-center font-sans font-medium text-soul-ink py-4 px-6 rounded-2xl transition-all hover:-translate-y-px"
              style={{ background: 'linear-gradient(135deg, #c9a84c, #d4943a)', boxShadow: '0 4px 16px rgba(201,168,76,0.25)' }}
            >
              Próximo teste: {nextTestLabel} →
            </a>
          )}

          {/* Mensagem final */}
          {allBundleDone ? (
            <div className="rounded-2xl p-4 text-center text-sm font-sans"
                 style={{ background: 'rgba(122,158,126,0.1)', border: '1px solid rgba(122,158,126,0.25)', color: '#3d6640' }}>
              🎉 Parabéns! Você completou todos os 4 testes. Os relatórios completos serão disponibilizados pela sua empresa.
            </div>
          ) : !nextToken && (
            <div className="rounded-2xl p-4 text-center text-sm font-sans"
                 style={{ background: 'rgba(196,99,58,0.07)', border: '1px solid rgba(196,99,58,0.2)', color: '#8a3520' }}>
              O relatório completo será disponibilizado pela sua empresa.
            </div>
          )}
        </div>
      </TestShell>
    )
  }

  // Expirado
  if (assessment.status === 'EXPIRED' || new Date() > new Date(assessment.expiresAt)) {
    return (
      <TestShell>
        <div className="text-center py-16">
          <div className="text-6xl mb-4">⏰</div>
          <h2 className="font-serif font-semibold text-2xl text-soul-ink">Link expirado</h2>
          <p className="text-sm font-sans mt-2" style={{ color: 'rgba(28,26,23,0.5)' }}>
            Este link de avaliação expirou. Solicite um novo link à sua empresa.
          </p>
        </div>
      </TestShell>
    )
  }

  return (
    <TestShell>
      <TestIntroWrapper
        testType={assessment.testType}
        assessmentId={assessment.id}
        token={params.token}
        employeeName={assessment.employee.name}
      />
    </TestShell>
  )
}

function TestShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen" style={{ background: '#faf7f2' }}>
      <header className="h-14 flex items-center px-6" style={{ background: 'rgba(250,247,242,0.9)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(232,226,214,0.7)' }}>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
               style={{ background: 'linear-gradient(135deg, #c9a84c, #d4943a)' }}>
            <svg viewBox="0 0 90 90" fill="none" className="w-4 h-4">
              <path d="M45 13L48.5 39.5L72 26L55.5 45L72 64L48.5 50.5L45 77L41.5 50.5L18 64L34.5 45L18 26L41.5 39.5Z"
                fill="rgba(255,255,255,0.3)" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
              <circle cx="45" cy="45" r="5" fill="white" opacity="0.9"/>
            </svg>
          </div>
          <span className="font-serif font-semibold text-base text-soul-ink">Psique <span className="text-soul-ink/60 font-normal">— Mapa Comportamental</span></span>
        </div>
      </header>
      <main className="max-w-2xl mx-auto px-4 py-8">{children}</main>
    </div>
  )
}
