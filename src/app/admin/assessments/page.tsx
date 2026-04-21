import { prisma } from '@/lib/prisma'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Admin — Todos os Testes' }

const TEST_LABELS: Record<string, string> = {
  DISC: 'DISC', MBTI: 'MBTI', ENNEAGRAM: 'Eneagrama', TEMPERAMENT: '4 Temperamentos',
}

const STATUS_MAP: Record<string, { label: string; className: string }> = {
  PENDING:   { label: 'Pendente',  className: 'bg-gray-100 text-gray-600' },
  SENT:      { label: 'Enviado',   className: 'bg-blue-100 text-blue-700' },
  COMPLETED: { label: 'Concluído', className: 'bg-green-100 text-green-700' },
  EXPIRED:   { label: 'Expirado',  className: 'bg-red-100 text-red-600' },
}

interface PageProps {
  searchParams: { status?: string; type?: string; q?: string }
}

export default async function AdminAssessmentsPage({ searchParams }: PageProps) {
  const { status, type, q } = searchParams

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: Record<string, any> = {}
  if (status && status !== 'all') where.status = status
  if (type && type !== 'all') where.testType = type
  if (q) {
    where.OR = [
      { employee: { name: { contains: q, mode: 'insensitive' } } },
      { employee: { email: { contains: q, mode: 'insensitive' } } },
      { company: { name: { contains: q, mode: 'insensitive' } } },
    ]
  }

  const assessments = await prisma.assessment.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    include: {
      employee: { select: { name: true, email: true } },
      company: { select: { name: true } },
      report: { select: { pdfUrl: true } },
    },
  })

  const totalCompleted = assessments.filter((a) => a.status === 'COMPLETED').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Todos os Testes</h1>
          <p className="text-gray-500 text-sm mt-1">
            {assessments.length} resultado{assessments.length !== 1 ? 's' : ''}
            {totalCompleted > 0 && ` · ${totalCompleted} concluído${totalCompleted !== 1 ? 's' : ''}`}
          </p>
        </div>
      </div>

      {/* Filtros */}
      <div className="card p-4 flex flex-wrap gap-3 items-end">
        <form method="GET" className="flex flex-wrap gap-3 flex-1">
          {/* Busca */}
          <input
            name="q"
            defaultValue={q ?? ''}
            placeholder="Buscar por funcionário ou empresa..."
            className="input flex-1 min-w-48 text-sm"
          />
          {/* Status */}
          <select name="status" defaultValue={status ?? 'all'} className="input text-sm w-44">
            <option value="all">Todos os status</option>
            <option value="COMPLETED">Concluído</option>
            <option value="SENT">Enviado</option>
            <option value="PENDING">Pendente</option>
            <option value="EXPIRED">Expirado</option>
          </select>
          {/* Tipo */}
          <select name="type" defaultValue={type ?? 'all'} className="input text-sm w-44">
            <option value="all">Todos os tipos</option>
            <option value="DISC">DISC</option>
            <option value="MBTI">MBTI</option>
            <option value="ENNEAGRAM">Eneagrama</option>
            <option value="TEMPERAMENT">4 Temperamentos</option>
          </select>
          <button type="submit" className="btn-primary text-sm px-5">
            Filtrar
          </button>
          {(status || type || q) && (
            <Link href="/admin/assessments" className="text-sm text-gray-400 hover:text-gray-600 self-center">
              Limpar filtros
            </Link>
          )}
        </form>
      </div>

      {/* Tabela */}
      <div className="card overflow-hidden">
        {assessments.length === 0 ? (
          <div className="py-16 text-center text-gray-400">
            <p className="text-4xl mb-4">🔍</p>
            <p className="font-medium text-gray-600">Nenhum resultado encontrado</p>
            <p className="text-sm mt-1">Tente ajustar os filtros</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Funcionário</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Empresa</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Teste</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Data</th>
                  <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {assessments.map((a) => {
                  const { label, className } = STATUS_MAP[a.status] ?? { label: a.status, className: 'bg-gray-100 text-gray-500' }
                  const isCompleted = a.status === 'COMPLETED'
                  return (
                    <tr key={a.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-900">{a.employee.name}</p>
                        <p className="text-xs text-gray-400">{a.employee.email}</p>
                      </td>
                      <td className="px-6 py-4 text-gray-600 text-sm">{a.company.name}</td>
                      <td className="px-6 py-4 text-gray-700">{TEST_LABELS[a.testType] ?? a.testType}</td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${className}`}>{label}</span>
                      </td>
                      <td className="px-6 py-4 text-gray-500">
                        {new Date(a.createdAt).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="px-6 py-4 text-right">
                        {isCompleted ? (
                          <div className="flex items-center justify-end gap-3">
                            <Link
                              href={`/admin/assessments/${a.id}`}
                              className="text-brand-600 hover:underline text-xs font-semibold"
                            >
                              Ver devolutiva
                            </Link>
                            <a
                              href={`/api/results/${a.id}/pdf`}
                              target="_blank"
                              className="text-xs font-medium text-white bg-brand-600 hover:bg-brand-700 px-3 py-1 rounded-lg transition-colors"
                            >
                              ⬇ PDF
                            </a>
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400">
                            {a.status === 'EXPIRED' ? 'Expirado' : `Expira ${new Date(a.expiresAt).toLocaleDateString('pt-BR')}`}
                          </span>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
