import { getSession } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import type { Metadata } from 'next'
import Link from 'next/link'
import NewAssessmentButton from './NewAssessmentButton'
import ResendEmailButton from './ResendEmailButton'
import { Avatar, Badge } from '@/components/ui/design-system'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

export const metadata: Metadata = { title: 'Avaliações' }

const TEST_LABELS: Record<string, { label: string; emoji: string }> = {
  DISC:               { label: 'DISC',                emoji: '🎭' },
  MBTI:               { label: 'MBTI',                emoji: '🧩' },
  ENNEAGRAM:          { label: 'Eneagrama',           emoji: '⬡'  },
  TEMPERAMENT:        { label: '4 Temperamentos',     emoji: '🌡' },
  ARCHETYPE:          { label: 'Arquétipos',          emoji: '🧭' },
  ARCHETYPE_FEMININE: { label: 'Arq. Femininos',      emoji: '🌸' },
  LOVE_LANGUAGES:     { label: 'Ling. do Amor',       emoji: '💞' },
  BUNDLE:             { label: 'Bundle Completo',     emoji: '✨' },
}

type AssessmentStatus = 'PENDING' | 'SENT' | 'COMPLETED' | 'EXPIRED'

const STATUS_CONFIG: Record<AssessmentStatus, { label: string; variant: 'done' | 'pending' | 'locked' | 'new' }> = {
  COMPLETED: { label: '✓ Concluído',  variant: 'done'    },
  SENT:      { label: '⏳ Enviado',   variant: 'pending' },
  PENDING:   { label: '📨 Pendente',  variant: 'new'     },
  EXPIRED:   { label: '✕ Expirado',   variant: 'locked'  },
}

function timeAgo(date: Date): string {
  const diff = Date.now() - new Date(date).getTime()
  const mins  = Math.floor(diff / 60_000)
  const hours = Math.floor(diff / 3_600_000)
  const days  = Math.floor(diff / 86_400_000)
  if (days > 0)  return `${days}d atrás`
  if (hours > 0) return `${hours}h atrás`
  if (mins > 0)  return `${mins}min atrás`
  return 'agora'
}

export default async function AssessmentsPage() {
  const session = await getSession()
  const companyId = session!.id

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const prismaAny = prisma as any

  const [assessments, bundleReports] = await Promise.all([
    prisma.assessment.findMany({
      where: { companyId },
      orderBy: { createdAt: 'desc' },
      include: { employee: { select: { name: true, email: true } } },
    }),
    prismaAny.bundleReport.findMany({
      where: { companyId },
      select: { bundleId: true, status: true },
    }) as Promise<Array<{ bundleId: string; status: string }>>,
  ])

  const bundleReportMap: Record<string, string> = Object.fromEntries(
    bundleReports.map((r: { bundleId: string; status: string }) => [r.bundleId, r.status])
  )

  // bundleId exists in DB after migration but not yet in generated Prisma types
  type AssessmentRow = typeof assessments[0] & { bundleId?: string | null }

  // Stats
  const total     = assessments.length
  const completed = assessments.filter((a: AssessmentRow) => a.status === 'COMPLETED').length
  const pending   = assessments.filter((a: AssessmentRow) => a.status === 'PENDING' || a.status === 'SENT').length
  const expired   = assessments.filter((a: AssessmentRow) => a.status === 'EXPIRED').length

  const stats = [
    { label: 'Total',      value: total,     color: 'bg-soul-indigo/10 text-soul-indigo',     dot: 'bg-soul-indigo'    },
    { label: 'Concluídas', value: completed, color: 'bg-soul-sage/12 text-soul-sage',          dot: 'bg-soul-sage'     },
    { label: 'Em aberto',  value: pending,   color: 'bg-soul-amber/10 text-soul-amber',        dot: 'bg-soul-amber'    },
    { label: 'Expiradas',  value: expired,   color: 'bg-soul-mist text-soul-ink/40',           dot: 'bg-soul-mist'     },
  ]

  return (
    <div className="space-y-6">

      {/* ── Header ── */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-serif font-light text-3xl text-soul-ink">Avaliações</h1>
          <p className="text-sm text-soul-ink/45 mt-1 font-sans">
            Gerencie os convites e acompanhe o progresso de cada colaborador
          </p>
        </div>
        <NewAssessmentButton />
      </div>

      {/* ── Stats row ── */}
      {total > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {stats.map((s) => (
            <div key={s.label} className="bg-white rounded-2xl border border-soul-mist/60 px-4 py-3 flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full flex-shrink-0 ${s.dot}`} />
              <div>
                <div className="font-serif font-light text-2xl text-soul-ink leading-none">{s.value}</div>
                <div className="text-[11px] text-soul-ink/40 mt-0.5 font-sans">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Empty state ── */}
      {assessments.length === 0 && (
        <div className="bg-white rounded-3xl border border-soul-mist/60 py-20 text-center">
          <div className="text-5xl mb-4">🗺️</div>
          <p className="font-serif font-light text-xl text-soul-ink mb-2">Nenhuma avaliação ainda</p>
          <p className="text-sm text-soul-ink/45 mb-7 max-w-xs mx-auto font-sans">
            Convide o primeiro colaborador para descobrir seu arquétipo e começar a mapear seu time.
          </p>
          <NewAssessmentButton />
        </div>
      )}

      {/* ── List ── */}
      {assessments.length > 0 && (
        <div className="bg-white rounded-3xl border border-soul-mist/60 overflow-hidden">

          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-soul-mist/50">
                  <th className="text-left px-6 py-4 text-[11px] font-sans font-semibold text-soul-ink/40 uppercase tracking-widest">
                    Colaborador
                  </th>
                  <th className="text-left px-6 py-4 text-[11px] font-sans font-semibold text-soul-ink/40 uppercase tracking-widest">
                    Avaliação
                  </th>
                  <th className="text-left px-6 py-4 text-[11px] font-sans font-semibold text-soul-ink/40 uppercase tracking-widest">
                    Status
                  </th>
                  <th className="text-left px-6 py-4 text-[11px] font-sans font-semibold text-soul-ink/40 uppercase tracking-widest">
                    Data
                  </th>
                  <th className="text-right px-6 py-4 text-[11px] font-sans font-semibold text-soul-ink/40 uppercase tracking-widest">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {assessments.map((a: AssessmentRow, i: number) => {
                  const cfg   = STATUS_CONFIG[a.status as AssessmentStatus] ?? { label: a.status, variant: 'locked' as const }
                  const tInfo = TEST_LABELS[a.testType] ?? { label: a.testType, emoji: '📊' }

                  return (
                    <tr
                      key={a.id}
                      className="border-b border-soul-mist/30 last:border-b-0 hover:bg-soul-cream/40 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Avatar name={a.employee.name} size="sm" paletteIndex={i} />
                          <div>
                            <div className="text-sm font-medium text-soul-ink">{a.employee.name}</div>
                            <div className="text-[11px] text-soul-ink/35 mt-0.5">{a.employee.email}</div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-base">{tInfo.emoji}</span>
                          <span className="text-sm text-soul-ink/70">{tInfo.label}</span>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <Badge variant={cfg.variant}>{cfg.label}</Badge>
                      </td>

                      <td className="px-6 py-4">
                        <div className="text-[12px] text-soul-ink/40 font-sans">
                          {new Date(a.createdAt).toLocaleDateString('pt-BR')}
                        </div>
                        <div className="text-[11px] text-soul-ink/25 mt-0.5">
                          {timeAgo(a.createdAt)}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-3 flex-wrap">
                          {a.status === 'COMPLETED' && (
                            <>
                              <Link
                                href={`/dashboard/assessments/${a.id}`}
                                className="text-xs font-medium text-soul-terracota hover:underline font-sans"
                              >
                                Ver devolutiva →
                              </Link>
                              <a
                                href={`/api/results/${a.id}/pdf`}
                                target="_blank"
                                className="text-xs text-soul-ink/35 hover:text-soul-ink/60 font-sans transition-colors"
                              >
                                Baixar PDF
                              </a>
                              {a.bundleId && bundleReportMap[a.bundleId] === 'COMPLETED' && (
                                <Link
                                  href={`/dashboard/reports/${a.bundleId}`}
                                  className="text-xs font-semibold px-3 py-1 rounded-full font-sans
                                             bg-soul-indigo text-white hover:bg-soul-indigo/80 transition-colors"
                                >
                                  ✦ Relatório Cruzado
                                </Link>
                              )}
                              {a.bundleId && bundleReportMap[a.bundleId] === 'GENERATING' && (
                                <span className="text-xs text-soul-indigo font-medium animate-pulse font-sans">
                                  Gerando relatório…
                                </span>
                              )}
                            </>
                          )}
                          {(a.status === 'PENDING' || a.status === 'SENT') && (
                            <>
                              <a
                                href={`${APP_URL}/test/${a.token}`}
                                target="_blank"
                                className="text-xs font-medium text-soul-terracota hover:underline font-sans"
                              >
                                {a.status === 'SENT' ? 'Retomar →' : 'Iniciar →'}
                              </a>
                              <ResendEmailButton assessmentId={a.id} />
                            </>
                          )}
                          {a.status === 'EXPIRED' && (
                            <ResendEmailButton assessmentId={a.id} />
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden divide-y divide-soul-mist/40">
            {assessments.map((a: AssessmentRow, i: number) => {
              const cfg   = STATUS_CONFIG[a.status as AssessmentStatus] ?? { label: a.status, variant: 'locked' as const }
              const tInfo = TEST_LABELS[a.testType] ?? { label: a.testType, emoji: '📊' }

              return (
                <div key={a.id} className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <Avatar name={a.employee.name} size="sm" paletteIndex={i} />
                      <div>
                        <div className="text-sm font-medium text-soul-ink">{a.employee.name}</div>
                        <div className="text-[11px] text-soul-ink/35">{a.employee.email}</div>
                      </div>
                    </div>
                    <Badge variant={cfg.variant}>{cfg.label}</Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span>{tInfo.emoji}</span>
                      <span className="text-sm text-soul-ink/60 font-sans">{tInfo.label}</span>
                    </div>
                    <span className="text-[11px] text-soul-ink/30 font-sans">
                      {new Date(a.createdAt).toLocaleDateString('pt-BR')}
                    </span>
                  </div>

                  {a.status === 'COMPLETED' && (
                    <div className="flex items-center gap-4 pt-1">
                      <Link
                        href={`/dashboard/assessments/${a.id}`}
                        className="text-sm text-soul-terracota font-medium hover:underline font-sans"
                      >
                        Ver devolutiva →
                      </Link>
                      <a
                        href={`/api/results/${a.id}/pdf`}
                        target="_blank"
                        className="text-sm text-soul-ink/35 hover:text-soul-ink/60 font-sans"
                      >
                        Baixar PDF
                      </a>
                      {a.bundleId && bundleReportMap[a.bundleId] === 'COMPLETED' && (
                        <Link
                          href={`/dashboard/reports/${a.bundleId}`}
                          className="text-xs font-bold px-3 py-1 rounded-full bg-soul-indigo text-white font-sans"
                        >
                          ✦ Relatório Cruzado
                        </Link>
                      )}
                    </div>
                  )}

                  {(a.status === 'PENDING' || a.status === 'SENT') && (
                    <div className="flex items-center gap-4 pt-1">
                      <a
                        href={`${APP_URL}/test/${a.token}`}
                        target="_blank"
                        className="text-sm text-soul-terracota font-medium hover:underline font-sans"
                      >
                        {a.status === 'SENT' ? 'Retomar →' : 'Iniciar →'}
                      </a>
                      <ResendEmailButton assessmentId={a.id} />
                    </div>
                  )}

                  {a.status === 'EXPIRED' && (
                    <div className="pt-1">
                      <ResendEmailButton assessmentId={a.id} />
                    </div>
                  )}
                </div>
              )
            })}
          </div>

        </div>
      )}
    </div>
  )
}
