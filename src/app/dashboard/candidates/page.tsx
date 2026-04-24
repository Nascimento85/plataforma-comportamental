import { getSession } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import type { Metadata } from 'next'
import NewAssessmentButton from '../assessments/NewAssessmentButton'

export const metadata: Metadata = { title: 'Candidatos' }

async function getCandidates(companyId: string) {
  const employees = await prisma.employee.findMany({
    where: { companyId },
    orderBy: { createdAt: 'desc' },
    include: {
      assessments: {
        orderBy: { createdAt: 'desc' },
        take: 5,
      },
    },
  })

  return employees.map((emp) => {
    const total = emp.assessments.length
    const completed = emp.assessments.filter((a) => a.status === 'COMPLETED').length
    const pending = emp.assessments.filter((a) => a.status === 'PENDING' || a.status === 'SENT').length
    const latest = emp.assessments[0]
    return {
      id: emp.id,
      name: emp.name,
      email: emp.email,
      createdAt: emp.createdAt,
      total,
      completed,
      pending,
      latestStatus: latest?.status ?? null,
      latestTestType: latest?.testType ?? null,
    }
  })
}

function StatusBadge({ status }: { status: string | null }) {
  if (!status) return <span className="text-sm text-soul-ink/60 font-medium">—</span>
  const map: Record<string, { label: string; bg: string; color: string }> = {
    PENDING: { label: 'Pendente', bg: 'rgba(212,148,58,0.18)', color: '#8a5c1e' },
    SENT: { label: 'Enviado', bg: 'rgba(61,79,124,0.18)', color: '#2d3f6b' },
    COMPLETED: { label: 'Concluído', bg: 'rgba(122,158,126,0.22)', color: '#4a7a4e' },
    EXPIRED: { label: 'Expirado', bg: 'rgba(196,122,114,0.18)', color: '#8a4a42' },
  }
  const s = map[status] ?? map.PENDING
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[13px] font-semibold font-sans"
      style={{ background: s.bg, color: s.color }}
    >
      {s.label}
    </span>
  )
}

export default async function CandidatesPage() {
  const session = await getSession()
  const candidates = await getCandidates(session!.id)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-serif font-semibold text-4xl text-soul-ink leading-tight">
            Candidatos
          </h1>
          <p className="text-base text-soul-ink/75 mt-2 font-medium max-w-2xl">
            Todos os colaboradores cadastrados na sua empresa. Acompanhe o histórico e o status de cada avaliação.
          </p>
        </div>
        <NewAssessmentButton />
      </div>

      {/* Stats compactas */}
      <div className="grid grid-cols-3 gap-4">
        <div className="soul-panel">
          <p className="text-[12px] font-bold uppercase tracking-widest text-soul-ink/65">Total</p>
          <p className="font-serif text-3xl font-semibold text-soul-ink mt-1">{candidates.length}</p>
        </div>
        <div className="soul-panel">
          <p className="text-[12px] font-bold uppercase tracking-widest text-soul-sage">Concluíram</p>
          <p className="font-serif text-3xl font-semibold text-soul-ink mt-1">
            {candidates.filter((c) => c.completed > 0).length}
          </p>
        </div>
        <div className="soul-panel">
          <p className="text-[12px] font-bold uppercase tracking-widest text-soul-amber">Pendentes</p>
          <p className="font-serif text-3xl font-semibold text-soul-ink mt-1">
            {candidates.reduce((acc, c) => acc + c.pending, 0)}
          </p>
        </div>
      </div>

      {/* Lista */}
      {candidates.length === 0 ? (
        <div className="soul-panel text-center py-16">
          <div className="text-5xl mb-4">✦</div>
          <h2 className="font-serif text-2xl font-semibold text-soul-ink mb-2">
            Nenhum candidato ainda
          </h2>
          <p className="text-base text-soul-ink/75 font-medium mb-6 max-w-md mx-auto">
            Quando você convidar o primeiro colaborador para uma avaliação, ele aparecerá aqui.
          </p>
          <NewAssessmentButton />
        </div>
      ) : (
        <div className="soul-panel p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-soul-mist/70 bg-soul-parchment/40">
                  <th className="text-left px-6 py-4 text-[12px] font-bold uppercase tracking-widest text-soul-ink/70">
                    Candidato
                  </th>
                  <th className="text-left px-6 py-4 text-[12px] font-bold uppercase tracking-widest text-soul-ink/70 hidden md:table-cell">
                    Avaliações
                  </th>
                  <th className="text-left px-6 py-4 text-[12px] font-bold uppercase tracking-widest text-soul-ink/70 hidden lg:table-cell">
                    Última
                  </th>
                  <th className="text-left px-6 py-4 text-[12px] font-bold uppercase tracking-widest text-soul-ink/70">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {candidates.map((c) => (
                  <tr
                    key={c.id}
                    className="border-b border-soul-mist/50 hover:bg-soul-parchment/30 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="font-semibold text-[15px] text-soul-ink">{c.name}</div>
                      <div className="text-[13px] text-soul-ink/70 font-medium mt-0.5">{c.email}</div>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <div className="text-[14px] font-semibold text-soul-ink">
                        {c.completed}/{c.total}
                      </div>
                      <div className="text-[12px] text-soul-ink/65 font-medium">
                        {c.completed === c.total ? 'Todas concluídas' : `${c.pending} pendente${c.pending !== 1 ? 's' : ''}`}
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden lg:table-cell">
                      <div className="text-[14px] font-semibold text-soul-ink">
                        {c.latestTestType ?? '—'}
                      </div>
                      <div className="text-[12px] text-soul-ink/65 font-medium">
                        {c.createdAt.toLocaleDateString('pt-BR')}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={c.latestStatus} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Dica */}
      <div className="flex items-start gap-3 rounded-3xl p-5 border"
           style={{ background: 'rgba(212,148,58,0.08)', borderColor: 'rgba(212,148,58,0.22)' }}>
        <span className="text-2xl">💡</span>
        <div>
          <p className="text-[15px] font-semibold text-soul-ink">
            Em breve: agrupamento por <Link href="/dashboard/teams" className="underline decoration-soul-amber">equipes e setores</Link>
          </p>
          <p className="text-[14px] text-soul-ink/75 font-medium mt-1">
            Cadastre candidatos em departamentos e monitore o mapa comportamental de cada time em um único ambiente.
          </p>
        </div>
      </div>
    </div>
  )
}
