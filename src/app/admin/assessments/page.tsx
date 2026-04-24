import { prisma } from '@/lib/prisma'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Admin — Todos os Testes' }

const TEST_LABELS: Record<string, string> = {
  DISC: 'DISC', MBTI: 'MBTI', ENNEAGRAM: 'Eneagrama', TEMPERAMENT: '4 Temperamentos',
  ARCHETYPE: 'Arquétipos', ARCHETYPE_FEMININE: 'Arq. Femininos', LOVE_LANGUAGES: 'Ling. Amor', BUNDLE: 'Bundle',
}

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; border: string }> = {
  PENDING:   { label: '📨 Pendente',  color: '#d4943a', bg: 'rgba(212,148,58,0.1)',  border: 'rgba(212,148,58,0.25)' },
  SENT:      { label: '⏳ Enviado',   color: '#3d4f7c', bg: 'rgba(61,79,124,0.1)',   border: 'rgba(61,79,124,0.25)'  },
  COMPLETED: { label: '✓ Concluído', color: '#7a9e7e', bg: 'rgba(122,158,126,0.1)', border: 'rgba(122,158,126,0.25)' },
  EXPIRED:   { label: '✕ Expirado',  color: '#c4633a', bg: 'rgba(196,99,58,0.1)',   border: 'rgba(196,99,58,0.2)'   },
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
      <div>
        <h1 className="font-serif font-light text-3xl text-soul-ink">Todos os Testes</h1>
        <p className="text-sm text-soul-ink/45 mt-1 font-sans">
          {assessments.length} resultado{assessments.length !== 1 ? 's' : ''}
          {totalCompleted > 0 && ` · ${totalCompleted} concluído${totalCompleted !== 1 ? 's' : ''}`}
        </p>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-3xl p-5" style={{ border: '1px solid rgba(232,226,214,0.6)' }}>
        <form method="GET" className="flex flex-wrap gap-3 items-end">
          <input
            name="q"
            defaultValue={q ?? ''}
            placeholder="Buscar por funcionário ou empresa…"
            className="flex-1 min-w-48 px-4 py-2.5 rounded-xl text-sm font-sans outline-none transition-all"
            style={{ background: '#faf7f2', border: '1px solid rgba(232,226,214,0.8)', color: '#1c1a17' }}
          />
          <select name="status" defaultValue={status ?? 'all'}
            className="px-4 py-2.5 rounded-xl text-sm font-sans outline-none w-44"
            style={{ background: '#faf7f2', border: '1px solid rgba(232,226,214,0.8)', color: '#1c1a17' }}>
            <option value="all">Todos os status</option>
            <option value="COMPLETED">Concluído</option>
            <option value="SENT">Enviado</option>
            <option value="PENDING">Pendente</option>
            <option value="EXPIRED">Expirado</option>
          </select>
          <select name="type" defaultValue={type ?? 'all'}
            className="px-4 py-2.5 rounded-xl text-sm font-sans outline-none w-44"
            style={{ background: '#faf7f2', border: '1px solid rgba(232,226,214,0.8)', color: '#1c1a17' }}>
            <option value="all">Todos os tipos</option>
            <option value="DISC">DISC</option>
            <option value="MBTI">MBTI</option>
            <option value="ENNEAGRAM">Eneagrama</option>
            <option value="TEMPERAMENT">4 Temperamentos</option>
            <option value="ARCHETYPE">Arquétipos</option>
            <option value="ARCHETYPE_FEMININE">Arq. Femininos</option>
          </select>
          <button type="submit"
            className="px-5 py-2.5 rounded-full text-sm font-sans font-medium text-soul-ink transition-all hover:-translate-y-px"
            style={{ background: 'linear-gradient(135deg, #c9a84c, #d4943a)', boxShadow: '0 3px 12px rgba(201,168,76,0.2)' }}>
            Filtrar
          </button>
          {(status || type || q) && (
            <Link href="/admin/assessments"
              className="text-sm font-sans transition-colors"
              style={{ color: 'rgba(28,26,23,0.4)' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#c4633a' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(28,26,23,0.4)' }}>
              Limpar filtros
            </Link>
          )}
        </form>
      </div>

      {/* Tabela */}
      <div className="bg-white rounded-3xl overflow-hidden" style={{ border: '1px solid rgba(232,226,214,0.6)' }}>
        {assessments.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-4xl mb-4">🔍</p>
            <p className="font-serif font-light text-lg text-soul-ink">Nenhum resultado encontrado</p>
            <p className="text-sm font-sans mt-1" style={{ color: 'rgba(28,26,23,0.4)' }}>Tente ajustar os filtros</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead style={{ borderBottom: '1px solid rgba(232,226,214,0.6)' }}>
                <tr style={{ background: 'rgba(250,247,242,0.8)' }}>
                  <th className="text-left px-6 py-3 text-[10px] font-sans font-semibold uppercase tracking-[0.15em]" style={{ color: 'rgba(28,26,23,0.35)' }}>Funcionário</th>
                  <th className="text-left px-6 py-3 text-[10px] font-sans font-semibold uppercase tracking-[0.15em]" style={{ color: 'rgba(28,26,23,0.35)' }}>Empresa</th>
                  <th className="text-left px-6 py-3 text-[10px] font-sans font-semibold uppercase tracking-[0.15em]" style={{ color: 'rgba(28,26,23,0.35)' }}>Teste</th>
                  <th className="text-left px-6 py-3 text-[10px] font-sans font-semibold uppercase tracking-[0.15em]" style={{ color: 'rgba(28,26,23,0.35)' }}>Status</th>
                  <th className="text-left px-6 py-3 text-[10px] font-sans font-semibold uppercase tracking-[0.15em]" style={{ color: 'rgba(28,26,23,0.35)' }}>Data</th>
                  <th className="text-right px-6 py-3 text-[10px] font-sans font-semibold uppercase tracking-[0.15em]" style={{ color: 'rgba(28,26,23,0.35)' }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {assessments.map((a) => {
                  const st = STATUS_CONFIG[a.status] ?? STATUS_CONFIG.PENDING
                  const isCompleted = a.status === 'COMPLETED'
                  return (
                    <tr key={a.id} className="transition-colors hover:bg-soul-cream/40"
                        style={{ borderBottom: '1px solid rgba(232,226,214,0.4)' }}>
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium font-sans text-soul-ink">{a.employee.name}</p>
                        <p className="text-[11px] font-sans" style={{ color: 'rgba(28,26,23,0.4)' }}>{a.employee.email}</p>
                      </td>
                      <td className="px-6 py-4 font-sans text-sm" style={{ color: 'rgba(28,26,23,0.6)' }}>{a.company.name}</td>
                      <td className="px-6 py-4 font-sans text-sm text-soul-ink">{TEST_LABELS[a.testType] ?? a.testType}</td>
                      <td className="px-6 py-4">
                        <span className="text-xs font-medium font-sans px-2.5 py-1 rounded-full"
                              style={{ background: st.bg, color: st.color, border: `1px solid ${st.border}` }}>
                          {st.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-sans" style={{ color: 'rgba(28,26,23,0.45)' }}>
                        {new Date(a.createdAt).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="px-6 py-4 text-right">
                        {isCompleted ? (
                          <div className="flex items-center justify-end gap-3">
                            <Link
                              href={`/admin/assessments/${a.id}`}
                              className="text-xs font-semibold font-sans transition-colors hover:underline"
                              style={{ color: '#c4633a' }}
                            >
                              Ver devolutiva
                            </Link>
                            <a
                              href={`/api/results/${a.id}/pdf`}
                              target="_blank"
                              className="text-xs font-medium font-sans text-white px-3 py-1 rounded-full transition-all hover:-translate-y-px"
                              style={{ background: 'linear-gradient(135deg, #c9a84c, #d4943a)' }}
                            >
                              ⬇ PDF
                            </a>
                          </div>
                        ) : (
                          <span className="text-xs font-sans" style={{ color: 'rgba(28,26,23,0.35)' }}>
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
