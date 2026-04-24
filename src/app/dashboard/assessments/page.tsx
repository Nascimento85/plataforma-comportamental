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

  type AssessmentRow = typeof assessments[0] & { bundleId?: string | null }

  // Stats
  const total     = assessments.length
  const completed = assessments.filter((a: AssessmentRow) => a.status === 'COMPLETED').length
  const pending   = assessments.filter((a: AssessmentRow) => a.status === 'PENDING' || a.status === 'SENT').length
  const expired   = assessments.filter((a: AssessmentRow) => a.status === 'EXPIRED').length

  return (
    <div className="space-y-8">

      {/* ── Header ────────────────────────────────────────────── */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-serif font-semibold text-4xl text-soul-ink leading-tight">
            Avaliações
          </h1>
          <p className="text-[16px] text-soul-ink/85 mt-2 font-medium max-w-2xl">
            Escolha a categoria mais adequada ao que você precisa decifrar — arquétipo, performance ou relacionamento — e envie o teste em menos de 30 segundos.
          </p>
        </div>
        <NewAssessmentButton />
      </div>

      {/* ── 3 CATEGORIAS (HERO) ───────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* ── Categoria 1: Arquétipos ── */}
        <article
          className="relative overflow-hidden rounded-3xl p-7 text-white flex flex-col"
          style={{
            background: 'linear-gradient(135deg, #1c1a17 0%, #2a2015 55%, #3d2a1c 100%)',
            minHeight: '340px',
          }}
        >
          <div
            className="absolute top-0 right-0 w-60 h-60 rounded-full opacity-[0.1] pointer-events-none"
            style={{ background: 'radial-gradient(circle, #c9a84c, transparent)', transform: 'translate(30%,-30%)' }}
          />
          <div className="relative z-10 flex flex-col h-full">
            <span className="inline-block w-fit text-[11px] font-bold uppercase tracking-[0.18em] px-3 py-1 rounded-full mb-4"
                  style={{ background: 'rgba(201,168,76,0.2)', color: '#e8c878' }}>
              Categoria 1 · Profundidade
            </span>

            <h2 className="font-serif font-semibold text-2xl md:text-3xl leading-tight mb-3">
              Arquétipos Junguianos
            </h2>

            <p className="text-[15px] leading-relaxed font-medium text-white/90 mb-5 flex-1">
              Os padrões psíquicos universais que Carl Jung mapeou. Não descrevem o que a pessoa faz — descrevem a força invisível que decide por ela. A lente mais profunda da plataforma para posicionamento de carreira, sucessão e liderança de alta complexidade.
            </p>

            <div className="space-y-1.5 mb-5 text-[13px] font-semibold text-white/85">
              <p>· Arquétipos Junguianos (12 padrões universais)</p>
              <p>· Arquétipos Femininos (7 energias de liderança)</p>
            </div>

            <NewAssessmentButton initialCategory="ARCHETYPE">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
              </svg>
              Descobrir Arquétipo
            </NewAssessmentButton>
          </div>
        </article>

        {/* ── Categoria 2: Análises Comportamentais ── */}
        <article
          className="relative overflow-hidden rounded-3xl p-7 flex flex-col"
          style={{
            background: 'linear-gradient(135deg, #faf7f2 0%, #f5ebd9 100%)',
            border: '1px solid rgba(196,99,58,0.22)',
            minHeight: '340px',
          }}
        >
          <div
            className="absolute top-0 right-0 w-60 h-60 rounded-full opacity-[0.18] pointer-events-none"
            style={{ background: 'radial-gradient(circle, #c4633a, transparent)', transform: 'translate(30%,-30%)' }}
          />
          <div className="relative z-10 flex flex-col h-full">
            <span className="inline-block w-fit text-[11px] font-bold uppercase tracking-[0.18em] px-3 py-1 rounded-full mb-4"
                  style={{ background: 'rgba(196,99,58,0.15)', color: '#a8522e' }}>
              Categoria 2 · Performance
            </span>

            <h2 className="font-serif font-semibold text-2xl md:text-3xl leading-tight mb-1 text-soul-ink">
              Análises Comportamentais
            </h2>
            <p className="font-display italic text-[15px] text-soul-terracota font-semibold mb-3">
              Foco em produtividade e dinâmica de trabalho
            </p>

            <p className="text-[15px] leading-relaxed font-medium text-soul-ink mb-5 flex-1">
              As quatro lentes clássicas para ler o comportamento em ambiente corporativo. Revelam como cada líder e colaborador decide sob pressão, comunica, conduz conflito e sustenta cultura. Material bruto para formar times de alta performance e calibrar lideranças.
            </p>

            <div className="space-y-1.5 mb-5 text-[13px] font-semibold text-soul-ink/85">
              <p>· DISC — Perfil Comportamental</p>
              <p>· MBTI — 16 Tipos de Personalidade</p>
              <p>· Eneagrama de Personalidade</p>
              <p>· 4 Personalidades (Temperamentos)</p>
            </div>

            <NewAssessmentButton initialCategory="BEHAVIORAL">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
              </svg>
              Testes Comportamentais
            </NewAssessmentButton>
          </div>
        </article>

        {/* ── Categoria 3: Inteligência em Relacionamentos ── */}
        <article
          className="relative overflow-hidden rounded-3xl p-7 flex flex-col"
          style={{
            background: 'linear-gradient(135deg, #faf5f4 0%, #f0dcd6 100%)',
            border: '1px solid rgba(196,122,114,0.3)',
            minHeight: '340px',
          }}
        >
          <div
            className="absolute top-0 right-0 w-60 h-60 rounded-full opacity-[0.18] pointer-events-none"
            style={{ background: 'radial-gradient(circle, #c47a72, transparent)', transform: 'translate(30%,-30%)' }}
          />
          <div className="relative z-10 flex flex-col h-full">
            <span className="inline-block w-fit text-[11px] font-bold uppercase tracking-[0.18em] px-3 py-1 rounded-full mb-4"
                  style={{ background: 'rgba(196,122,114,0.18)', color: '#7a3d35' }}>
              Categoria 3 · Cultura
            </span>

            <h2 className="font-serif font-semibold text-2xl md:text-3xl leading-tight mb-1 text-soul-ink">
              Inteligência em Relacionamentos
            </h2>
            <p className="font-display italic text-[15px] font-semibold mb-3" style={{ color: '#9b4d43' }}>
              Harmonia, pertencimento e comunicação afetiva
            </p>

            <p className="text-[15px] leading-relaxed font-medium text-soul-ink mb-5 flex-1">
              Como um colaborador se sente reconhecido é o que define engajamento, retenção e espírito de equipe. Esta categoria mapeia a dimensão afetiva — a linguagem em que cada pessoa recebe valorização — e converte cultura em resultado operacional.
            </p>

            <div className="space-y-1.5 mb-5 text-[13px] font-semibold text-soul-ink/85">
              <p>· 5 Linguagens do Amor aplicadas à liderança</p>
              <p>· Guia de reconhecimento individualizado</p>
              <p>· Aplicação em retenção e cultura</p>
            </div>

            <NewAssessmentButton initialCategory="RELATIONSHIPS">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
              </svg>
              Relacionamentos
            </NewAssessmentButton>
          </div>
        </article>
      </div>

      {/* ── Stats row ─────────────────────────────────────────── */}
      {total > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Total',      value: total,     dot: 'bg-soul-indigo'    },
            { label: 'Concluídas', value: completed, dot: 'bg-soul-sage'      },
            { label: 'Em aberto',  value: pending,   dot: 'bg-soul-amber'     },
            { label: 'Expiradas',  value: expired,   dot: 'bg-soul-rose'      },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl border border-soul-mist px-4 py-3.5 flex items-center gap-3">
              <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${s.dot}`} />
              <div>
                <div className="font-serif font-semibold text-2xl text-soul-ink leading-none">{s.value}</div>
                <div className="text-[12px] text-soul-ink/75 mt-1 font-bold uppercase tracking-wider">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Histórico title ───────────────────────────────────── */}
      {assessments.length > 0 && (
        <div>
          <h2 className="font-serif font-semibold text-2xl text-soul-ink mb-1">
            Histórico de envios
          </h2>
          <p className="text-[14px] text-soul-ink/75 font-medium">
            Todas as avaliações enviadas pela sua empresa, com status e ações.
          </p>
        </div>
      )}

      {/* ── Empty state ───────────────────────────────────────── */}
      {assessments.length === 0 && (
        <div className="bg-white rounded-3xl border border-soul-mist py-16 text-center">
          <div className="text-5xl mb-4">🗺️</div>
          <p className="font-serif font-semibold text-2xl text-soul-ink mb-2">Nenhuma avaliação enviada ainda</p>
          <p className="text-[15px] text-soul-ink/80 mb-7 max-w-md mx-auto font-medium">
            Escolha uma das três categorias acima e envie a primeira avaliação para começar a mapear sua empresa.
          </p>
          <NewAssessmentButton />
        </div>
      )}

      {/* ── Lista ─────────────────────────────────────────────── */}
      {assessments.length > 0 && (
        <div className="bg-white rounded-3xl border border-soul-mist overflow-hidden">

          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-soul-mist bg-soul-parchment/40">
                  <th className="text-left px-6 py-4 text-[12px] font-sans font-bold text-soul-ink/75 uppercase tracking-widest">
                    Colaborador
                  </th>
                  <th className="text-left px-6 py-4 text-[12px] font-sans font-bold text-soul-ink/75 uppercase tracking-widest">
                    Avaliação
                  </th>
                  <th className="text-left px-6 py-4 text-[12px] font-sans font-bold text-soul-ink/75 uppercase tracking-widest">
                    Status
                  </th>
                  <th className="text-left px-6 py-4 text-[12px] font-sans font-bold text-soul-ink/75 uppercase tracking-widest">
                    Data
                  </th>
                  <th className="text-right px-6 py-4 text-[12px] font-sans font-bold text-soul-ink/75 uppercase tracking-widest">
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
                      className="border-b border-soul-mist/60 last:border-b-0 hover:bg-soul-parchment/40 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Avatar name={a.employee.name} size="sm" paletteIndex={i} />
                          <div>
                            <div className="text-[15px] font-semibold text-soul-ink">{a.employee.name}</div>
                            <div className="text-[13px] text-soul-ink/75 mt-0.5 font-medium">{a.employee.email}</div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-base">{tInfo.emoji}</span>
                          <span className="text-[14px] text-soul-ink font-semibold">{tInfo.label}</span>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <Badge variant={cfg.variant}>{cfg.label}</Badge>
                      </td>

                      <td className="px-6 py-4">
                        <div className="text-[13px] text-soul-ink font-semibold">
                          {new Date(a.createdAt).toLocaleDateString('pt-BR')}
                        </div>
                        <div className="text-[12px] text-soul-ink/70 mt-0.5 font-medium">
                          {timeAgo(a.createdAt)}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-3 flex-wrap">
                          {a.status === 'COMPLETED' && (
                            <>
                              <Link
                                href={`/dashboard/assessments/${a.id}`}
                                className="text-[13px] font-bold text-soul-terracota hover:underline font-sans"
                              >
                                Ver devolutiva →
                              </Link>
                              <a
                                href={`/api/results/${a.id}/pdf`}
                                target="_blank"
                                className="text-[13px] text-soul-ink/80 hover:text-soul-ink font-sans font-semibold transition-colors"
                              >
                                Baixar PDF
                              </a>
                              {a.bundleId && bundleReportMap[a.bundleId] === 'COMPLETED' && (
                                <Link
                                  href={`/dashboard/reports/${a.bundleId}`}
                                  className="text-[12px] font-bold px-3 py-1.5 rounded-full font-sans
                                             bg-soul-indigo text-white hover:bg-soul-indigo/85 transition-colors"
                                >
                                  ✦ Relatório Cruzado
                                </Link>
                              )}
                              {a.bundleId && bundleReportMap[a.bundleId] === 'GENERATING' && (
                                <span className="text-[12px] text-soul-indigo font-bold animate-pulse font-sans">
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
                                className="text-[13px] font-bold text-soul-terracota hover:underline font-sans"
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
          <div className="md:hidden divide-y divide-soul-mist">
            {assessments.map((a: AssessmentRow, i: number) => {
              const cfg   = STATUS_CONFIG[a.status as AssessmentStatus] ?? { label: a.status, variant: 'locked' as const }
              const tInfo = TEST_LABELS[a.testType] ?? { label: a.testType, emoji: '📊' }

              return (
                <div key={a.id} className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <Avatar name={a.employee.name} size="sm" paletteIndex={i} />
                      <div>
                        <div className="text-[15px] font-semibold text-soul-ink">{a.employee.name}</div>
                        <div className="text-[13px] text-soul-ink/75 font-medium">{a.employee.email}</div>
                      </div>
                    </div>
                    <Badge variant={cfg.variant}>{cfg.label}</Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span>{tInfo.emoji}</span>
                      <span className="text-[14px] text-soul-ink font-semibold">{tInfo.label}</span>
                    </div>
                    <span className="text-[12px] text-soul-ink/75 font-semibold">
                      {new Date(a.createdAt).toLocaleDateString('pt-BR')}
                    </span>
                  </div>

                  {a.status === 'COMPLETED' && (
                    <div className="flex items-center gap-4 pt-1 flex-wrap">
                      <Link
                        href={`/dashboard/assessments/${a.id}`}
                        className="text-[14px] text-soul-terracota font-bold hover:underline font-sans"
                      >
                        Ver devolutiva →
                      </Link>
                      <a
                        href={`/api/results/${a.id}/pdf`}
                        target="_blank"
                        className="text-[14px] text-soul-ink font-bold hover:text-soul-terracota font-sans"
                      >
                        Baixar PDF
                      </a>
                      {a.bundleId && bundleReportMap[a.bundleId] === 'COMPLETED' && (
                        <Link
                          href={`/dashboard/reports/${a.bundleId}`}
                          className="text-[12px] font-bold px-3 py-1.5 rounded-full bg-soul-indigo text-white font-sans"
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
                        className="text-[14px] text-soul-terracota font-bold hover:underline font-sans"
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
