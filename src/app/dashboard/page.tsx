import { getSession } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Dashboard' }

export default async function DashboardPage() {
  const session = await getSession()
  const companyId = session!.id

  const [creditBalance, recentAssessments, totalCompleted] = await Promise.all([
    prisma.creditBalance.findUnique({ where: { companyId } }),
    prisma.assessment.findMany({
      where: { companyId },
      orderBy: { createdAt: 'desc' },
      take: 5,
      include: { employee: { select: { name: true } } },
    }),
    prisma.assessment.count({
      where: { companyId, status: 'COMPLETED' },
    }),
  ])

  const credits = creditBalance?.balance ?? 0

  const isNewAccount = recentAssessments.length === 0 && totalCompleted === 0
  const firstName = session!.name?.split(' ')[0] ?? 'bem-vindo'

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Visão geral da sua empresa</p>
      </div>

      {/* Banner de boas-vindas para conta nova */}
      {isNewAccount && (
        <div className="rounded-2xl bg-gradient-to-br from-brand-600 to-brand-700 text-white p-6">
          <div className="flex items-start gap-4">
            <div className="text-3xl flex-shrink-0">👋</div>
            <div className="flex-1">
              <h2 className="text-lg font-bold mb-1">Olá, {firstName}! Sua conta está pronta.</h2>
              <p className="text-brand-100 text-sm leading-relaxed mb-4">
                Você ganhou <strong className="text-white">4 créditos de bônus</strong> para testar a plataforma.
                Comece criando sua primeira avaliação — envie o link para um colaborador e receba o resultado em minutos.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/dashboard/assessments"
                  className="inline-flex items-center gap-2 bg-white text-brand-700 font-semibold text-sm px-4 py-2 rounded-lg hover:bg-brand-50 transition-colors"
                >
                  + Criar primeira avaliação
                </Link>
                <Link
                  href="/dashboard/credits"
                  className="inline-flex items-center gap-2 bg-brand-500 text-white font-semibold text-sm px-4 py-2 rounded-lg hover:bg-brand-400 transition-colors"
                >
                  Ver planos de créditos
                </Link>
              </div>
            </div>
          </div>

          {/* Passo a passo */}
          <div className="grid grid-cols-3 gap-3 mt-6 pt-5 border-t border-brand-500">
            {[
              { step: '1', text: 'Crie uma avaliação e escolha o tipo de teste' },
              { step: '2', text: 'O colaborador recebe o link por e-mail e responde' },
              { step: '3', text: 'Acesse a devolutiva completa no painel' },
            ].map((s) => (
              <div key={s.step} className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-brand-500 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  {s.step}
                </div>
                <p className="text-xs text-brand-100 leading-snug">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          label="Créditos disponíveis"
          value={credits.toString()}
          sub="relatórios disponíveis"
          accent={credits <= 3 ? 'red' : 'brand'}
          action={credits <= 3 ? { href: '/dashboard/credits', label: 'Comprar mais' } : undefined}
        />
        <MetricCard
          label="Avaliações concluídas"
          value={totalCompleted.toString()}
          sub="total histórico"
          accent="green"
        />
        <MetricCard
          label="Avaliações pendentes"
          value={recentAssessments.filter((a) => a.status === 'PENDING' || a.status === 'SENT').length.toString()}
          sub="aguardando resposta"
          accent="amber"
        />
      </div>

      <div className="card p-6">
        <h2 className="font-semibold text-gray-900 mb-4">Ações rápidas</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/dashboard/assessments" className="btn-primary">
            + Nova avaliação
          </Link>
          <Link href="/dashboard/credits" className="btn-secondary">
            Comprar créditos
          </Link>
        </div>
      </div>

      <div className="card">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">Avaliações recentes</h2>
          <Link href="/dashboard/assessments" className="text-sm text-brand-600 hover:underline">
            Ver todas →
          </Link>
        </div>

        {recentAssessments.length === 0 ? (
          <div className="px-6 py-10 text-center text-gray-400 text-sm">
            Nenhuma avaliação criada ainda.{' '}
            <Link href="/dashboard/assessments" className="text-brand-600 hover:underline">
              Criar primeira
            </Link>
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {recentAssessments.map((a) => (
              <li key={a.id} className="px-6 py-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-900">{a.employee.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {a.testType} · {new Date(a.createdAt).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                <StatusBadge status={a.status} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

function MetricCard({
  label, value, sub, accent, action,
}: {
  label: string; value: string; sub: string; accent: 'brand' | 'green' | 'amber' | 'red'
  action?: { href: string; label: string }
}) {
  const accentClasses = {
    brand: 'text-brand-600',
    green: 'text-green-600',
    amber: 'text-amber-600',
    red: 'text-red-600',
  }
  return (
    <div className="card p-5">
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</p>
      <p className={`text-3xl font-bold mt-2 ${accentClasses[accent]}`}>{value}</p>
      <p className="text-xs text-gray-400 mt-1">{sub}</p>
      {action && (
        <Link href={action.href} className="text-xs text-brand-600 hover:underline mt-2 inline-block">
          {action.label}
        </Link>
      )}
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; className: string }> = {
    PENDING:   { label: 'Pendente',   className: 'bg-gray-100 text-gray-600' },
    SENT:      { label: 'Enviado',    className: 'bg-blue-100 text-blue-700' },
    COMPLETED: { label: 'Concluído',  className: 'bg-green-100 text-green-700' },
    EXPIRED:   { label: 'Expirado',   className: 'bg-red-100 text-red-600' },
  }
  const { label, className } = map[status] ?? { label: status, className: 'bg-gray-100 text-gray-500' }
  return (
    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${className}`}>{label}</span>
  )
}
