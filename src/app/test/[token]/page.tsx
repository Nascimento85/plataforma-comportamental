import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import DISCTest from '@/components/tests/DISCTest'
import MBTITest from '@/components/tests/MBTITest'
import EnneagramTest from '@/components/tests/EnneagramTest'
import TemperamentTest from '@/components/tests/TemperamentTest'
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

  // Não encontrado
  if (!assessment) return notFound()

  // Já completou — exibe o resultado se existir
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
            <p className="text-gray-500 text-sm mt-1">
              Aqui está o resumo do seu perfil identificado:
            </p>
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

  const employeeName = assessment.employee.name.split(' ')[0]

  return (
    <TestShell>
      {/* Boas-vindas */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Olá, {employeeName}! 👋
        </h1>
        <p className="text-gray-500 mt-1">
          Complete sua avaliação <strong>{labelFor(assessment.testType)}</strong> abaixo.
          Responda com sinceridade — não há respostas certas ou erradas.
        </p>
      </div>

      {/* Componente de teste */}
      {assessment.testType === 'DISC' && (
        <DISCTest assessmentId={assessment.id} token={params.token} />
      )}
      {assessment.testType === 'MBTI' && (
        <MBTITest assessmentId={assessment.id} token={params.token} />
      )}
      {assessment.testType === 'ENNEAGRAM' && (
        <EnneagramTest assessmentId={assessment.id} token={params.token} />
      )}
      {assessment.testType === 'TEMPERAMENT' && (
        <TemperamentTest assessmentId={assessment.id} token={params.token} />
      )}
    </TestShell>
  )
}

function labelFor(type: string) {
  const m: Record<string, string> = {
    DISC: 'DISC',
    MBTI: 'MBTI',
    ENNEAGRAM: 'Eneagrama',
    TEMPERAMENT: '4 Temperamentos',
  }
  return m[type] ?? type
}

function TestShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Topbar simples */}
      <header className="bg-white border-b border-gray-200 h-14 flex items-center px-6">
        <LogoBrand size="sm" />
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">{children}</main>
    </div>
  )
}
