import { getSession } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import type { Metadata } from 'next'
import Link from 'next/link'
import NewAssessmentButton from './NewAssessmentButton'

export const metadata: Metadata = { title: 'Avaliações' }

const TEST_LABELS: Record<string, string> = {
  DISC:               'DISC',
  MBTI:               'MBTI',
  ENNEAGRAM:          'Eneagrama',
  TEMPERAMENT:        '4 Temperamentos',
  ARCHETYPE:          'Arquétipos',
  ARCHETYPE_FEMININE: 'Arq. Femininos',
}

const STATUS_MAP: Record<string, { label: string; className: string }> = {
  PENDING:   { label: 'Pendente',  className: 'bg-gray-100 text-gray-600' },
  SENT:      { label: 'Enviado',   className: 'bg-blue-100 text-blue-700' },
  COMPLETED: { label: 'Concluído', className: 'bg-green-100 text-green-700' },
  EXPIRED:   { label: 'Expirado',  className: 'bg-red-100 text-red-600' },
}

export default async function AssessmentsPage() {
  const session = await getSession()
  const companyId = session!.id

  const assessments = await prisma.assessment.findMany({
    where: { companyId },
    orderBy: { createdAt: 'desc' },
    include: { employee: { select: { name: true, email: true } } },
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Avaliações</h1>
          <p className="text-gray-500 mt-1">Gerencie as avaliações dos seus colaboradores</p>
        </div>
        <NewAssessmentButton />
      </div>

      <div className="card overflow-hidden">
        {assessments.length === 0 ? (
          <div className="py-16 text-center text-gray-400">
            <p className="text-5xl mb-4">📋</p>
            <p className="font-semibold text-gray-600 text-lg">Nenhuma avaliação ainda</p>
            <p className="mt-2 text-gray-400">Crie sua primeira avaliação para começar</p>
          </div>
        ) : (
          <>
            {/* ── Tabela — visível em md+ ── */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-500 uppercase tracking-wide">Colaborador</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-500 uppercase tracking-wide">Teste</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-500 uppercase tracking-wide">Criado em</th>
                    <th className="text-right px-6 py-4 text-sm font-semibold text-gray-500 uppercase tracking-wide">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {assessments.map((a) => {
                    const { label, className } = STATUS_MAP[a.status] ?? { label: a.status, className: 'bg-gray-100 text-gray-500' }
                    return (
                      <tr key={a.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <p className="font-semibold text-gray-900">{a.employee.name}</p>
                          <p className="text-sm text-gray-400 mt-0.5">{a.employee.email}</p>
                        </td>
                        <td className="px-6 py-4 text-gray-700 font-medium">
                          {TEST_LABELS[a.testType] ?? a.testType}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`text-sm font-semibold px-3 py-1 rounded-full ${className}`}>{label}</span>
                        </td>
                        <td className="px-6 py-4 text-gray-500">
                          {new Date(a.createdAt).toLocaleDateString('pt-BR')}
                        </td>
                        <td className="px-6 py-4 text-right">
                          {a.status === 'COMPLETED' && (
                            <div className="flex items-center justify-end gap-4">
                              <Link
                                href={`/dashboard/assessments/${a.id}`}
                                className="text-brand-600 hover:underline font-semibold"
                              >
                                Ver devolutiva
                              </Link>
                              <a
                                href={`/api/results/${a.id}/pdf`}
                                target="_blank"
                                className="text-gray-400 hover:text-gray-600 font-medium"
                              >
                                Baixar PDF
                              </a>
                            </div>
                          )}
                          {(a.status === 'PENDING' || a.status === 'SENT') && (
                            <span className="text-sm text-gray-400">
                              Expira em {new Date(a.expiresAt).toLocaleDateString('pt-BR')}
                            </span>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* ── Cards — visível em mobile ── */}
            <div className="md:hidden divide-y divide-gray-100">
              {assessments.map((a) => {
                const { label, className } = STATUS_MAP[a.status] ?? { label: a.status, className: 'bg-gray-100 text-gray-500' }
                return (
                  <div key={a.id} className="p-4 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-gray-900">{a.employee.name}</p>
                        <p className="text-sm text-gray-400 mt-0.5">{a.employee.email}</p>
                      </div>
                      <span className={`text-sm font-semibold px-3 py-1 rounded-full flex-shrink-0 ${className}`}>{label}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span className="font-medium text-gray-700">{TEST_LABELS[a.testType] ?? a.testType}</span>
                      <span>{new Date(a.createdAt).toLocaleDateString('pt-BR')}</span>
                    </div>
                    {a.status === 'COMPLETED' && (
                      <div className="flex gap-4 pt-1">
                        <Link
                          href={`/dashboard/assessments/${a.id}`}
                          className="text-brand-600 font-semibold hover:underline"
                        >
                          Ver devolutiva →
                        </Link>
                        <a
                          href={`/api/results/${a.id}/pdf`}
                          target="_blank"
                          className="text-gray-400 hover:text-gray-600 font-medium"
                        >
                          Baixar PDF
                        </a>
                      </div>
                    )}
                    {(a.status === 'PENDING' || a.status === 'SENT') && (
                      <p className="text-sm text-gray-400">
                        Expira em {new Date(a.expiresAt).toLocaleDateString('pt-BR')}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
