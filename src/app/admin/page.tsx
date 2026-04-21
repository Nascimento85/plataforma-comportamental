import { prisma } from '@/lib/prisma'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Admin — Visão Geral' }

function StatCard({ label, value, sub, color = 'brand' }: { label: string; value: number | string; sub?: string; color?: string }) {
  const colors: Record<string, string> = {
    brand: 'bg-brand-50 border-brand-200 text-brand-700',
    green: 'bg-green-50 border-green-200 text-green-700',
    amber: 'bg-amber-50 border-amber-200 text-amber-700',
    red:   'bg-red-50 border-red-200 text-red-700',
    gray:  'bg-gray-50 border-gray-200 text-gray-600',
  }
  return (
    <div className={`rounded-xl border p-5 ${colors[color] ?? colors.gray}`}>
      <p className="text-xs font-semibold uppercase tracking-wide opacity-70 mb-1">{label}</p>
      <p className="text-3xl font-bold">{value}</p>
      {sub && <p className="text-xs mt-1 opacity-60">{sub}</p>}
    </div>
  )
}

export default async function AdminPage() {
  const [
    totalCompanies,
    totalAssessments,
    completedCount,
    pendingCount,
    discCount,
    mbtiCount,
    enneagramCount,
    temperamentCount,
    recentAssessments,
    recentCompanies,
  ] = await Promise.all([
    prisma.company.count({ where: { isAdmin: false } }),
    prisma.assessment.count(),
    prisma.assessment.count({ where: { status: 'COMPLETED' } }),
    prisma.assessment.count({ where: { status: { in: ['PENDING', 'SENT'] } } }),
    prisma.assessment.count({ where: { testType: 'DISC' } }),
    prisma.assessment.count({ where: { testType: 'MBTI' } }),
    prisma.assessment.count({ where: { testType: 'ENNEAGRAM' } }),
    prisma.assessment.count({ where: { testType: 'TEMPERAMENT' } }),
    prisma.assessment.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      where: { status: 'COMPLETED' },
      include: {
        employee: { select: { name: true } },
        company: { select: { name: true } },
      },
    }),
    prisma.company.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      where: { isAdmin: false },
      select: { id: true, name: true, email: true, createdAt: true, _count: { select: { assessments: true } } },
    }),
  ])

  const TEST_LABELS: Record<string, string> = {
    DISC: 'DISC', MBTI: 'MBTI', ENNEAGRAM: 'Eneagrama', TEMPERAMENT: '4 Temperamentos',
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Painel Administrativo</h1>
        <p className="text-gray-500 text-sm mt-1">Visão geral de toda a plataforma</p>
      </div>

      {/* Stats principais */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Empresas cadastradas" value={totalCompanies} color="brand" />
        <StatCard label="Testes realizados" value={completedCount} sub={`de ${totalAssessments} criados`} color="green" />
        <StatCard label="Aguardando resposta" value={pendingCount} color="amber" />
        <StatCard label="Taxa de conclusão" value={totalAssessments > 0 ? `${Math.round((completedCount / totalAssessments) * 100)}%` : '—'} color="gray" />
      </div>

      {/* Por tipo de teste */}
      <div>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Testes por tipo</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="DISC" value={discCount} color="brand" />
          <StatCard label="MBTI" value={mbtiCount} color="green" />
          <StatCard label="Eneagrama" value={enneagramCount} color="amber" />
          <StatCard label="4 Temperamentos" value={temperamentCount} color="red" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Testes recentes concluídos */}
        <div className="card overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-700">Últimos testes concluídos</h2>
            <Link href="/admin/assessments" className="text-xs text-brand-600 hover:underline">Ver todos →</Link>
          </div>
          <div className="divide-y divide-gray-50">
            {recentAssessments.length === 0 ? (
              <p className="text-center text-sm text-gray-400 py-8">Nenhum teste concluído ainda.</p>
            ) : recentAssessments.map((a) => (
              <Link
                key={a.id}
                href={`/admin/assessments/${a.id}`}
                className="flex items-center justify-between px-6 py-3 hover:bg-gray-50 transition-colors"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">{a.employee.name}</p>
                  <p className="text-xs text-gray-400">{a.company.name}</p>
                </div>
                <span className="text-xs font-medium bg-green-100 text-green-700 px-2.5 py-1 rounded-full">
                  {TEST_LABELS[a.testType] ?? a.testType}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Empresas mais recentes */}
        <div className="card overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-700">Empresas mais recentes</h2>
          </div>
          <div className="divide-y divide-gray-50">
            {recentCompanies.length === 0 ? (
              <p className="text-center text-sm text-gray-400 py-8">Nenhuma empresa cadastrada.</p>
            ) : recentCompanies.map((c) => (
              <div key={c.id} className="flex items-center justify-between px-6 py-3">
                <div>
                  <p className="text-sm font-medium text-gray-900">{c.name}</p>
                  <p className="text-xs text-gray-400">{c.email}</p>
                </div>
                <span className="text-xs text-gray-400">
                  {c._count.assessments} teste{c._count.assessments !== 1 ? 's' : ''}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
