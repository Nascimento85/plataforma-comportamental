import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import TestIntroWrapper from '@/components/tests/TestIntroWrapper'
import TestResultCard from '@/components/tests/TestResultCard'
import LogoBrand from '@/components/ui/LogoBrand'
import { parseResultData } from '@/lib/parseResult'

export const metadata: Metadata = { title: 'Avaliação Comportamental' }

interface PageProps {
  params: { token: string }
}

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

    return (
      <TestShell>
        <div className="space-y-6">
          <div className="text-center">
            <div className="text-5xl mb-3">🎉</div>
            <h2 className="text-xl font-bold text-gray-900">Avaliação concluída!</h2>
            <p className="text-gray-500 text-sm mt-1">Aqui está o resumo do seu perfil identificado:</p>
          </div>
          {resultData && assessment.result && (
            <TestResultCard testType={assessment.result.testType} result={resultData} />
          )}
          <div className="rounded-xl border border-brand-200 bg-brand-50 p-4 text-center text-sm text-brand-700">
            O relatório completo será disponibilizado pela sua empresa.
          </div>
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
          <h2 className="text-xl font-bold text-gray-900">Link expirado</h2>
          <p className="text-gray-500 mt-2 text-sm">
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
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 h-14 flex items-center px-6">
        <LogoBrand size="sm" />
      </header>
      <main className="max-w-2xl mx-auto px-4 py-8">{children}</main>
    </div>
  )
}
