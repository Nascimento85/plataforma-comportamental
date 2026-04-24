import { getSession } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Relatórios' }

async function getReports(companyId: string) {
  const [bundleReports, individualResults] = await Promise.all([
    prisma.bundleReport.findMany({
      where: { companyId },
      orderBy: { createdAt: 'desc' },
      include: { employee: { select: { name: true, email: true } } },
    }),
    prisma.assessment.findMany({
      where: { companyId, status: 'COMPLETED', bundleId: null },
      orderBy: { completedAt: 'desc' },
      take: 50,
      include: {
        employee: { select: { name: true, email: true } },
        result: true,
      },
    }),
  ])

  return { bundleReports, individualResults }
}

const TEST_LABELS: Record<string, string> = {
  DISC: 'DISC — Perfil Comportamental',
  MBTI: 'MBTI — 16 Tipos de Personalidade',
  ENNEAGRAM: 'Eneagrama — 9 Tipos',
  TEMPERAMENT: '4 Temperamentos',
  ARCHETYPE: 'Arquétipos Junguianos',
  ARCHETYPE_FEMININE: 'Arquétipos Femininos',
  LOVE_LANGUAGES: '5 Linguagens do Amor',
}

export default async function ReportsPage() {
  const session = await getSession()
  const { bundleReports, individualResults } = await getReports(session!.id)

  const totalReports = bundleReports.length + individualResults.length

  return (
    <div className="space-y-7">
      {/* Header */}
      <div>
        <h1 className="font-serif font-semibold text-4xl text-soul-ink leading-tight">
          Relatórios
        </h1>
        <p className="text-base text-soul-ink/75 mt-2 font-medium max-w-2xl">
          Todas as devolutivas concluídas da sua empresa — individuais e integradas. Baixe em PDF ou abra a leitura completa.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="soul-panel">
          <p className="text-[12px] font-bold uppercase tracking-widest text-soul-ink/65">Total</p>
          <p className="font-serif text-3xl font-semibold text-soul-ink mt-1">{totalReports}</p>
        </div>
        <div className="soul-panel">
          <p className="text-[12px] font-bold uppercase tracking-widest text-soul-terracota">Integrados (Bundle)</p>
          <p className="font-serif text-3xl font-semibold text-soul-ink mt-1">{bundleReports.length}</p>
        </div>
        <div className="soul-panel">
          <p className="text-[12px] font-bold uppercase tracking-widest text-soul-indigo">Individuais</p>
          <p className="font-serif text-3xl font-semibold text-soul-ink mt-1">{individualResults.length}</p>
        </div>
      </div>

      {/* Empty state */}
      {totalReports === 0 && (
        <div className="soul-panel text-center py-16">
          <div className="text-5xl mb-4">📄</div>
          <h2 className="font-serif text-2xl font-semibold text-soul-ink mb-2">
            Nenhum relatório concluído ainda
          </h2>
          <p className="text-base text-soul-ink/75 font-medium max-w-md mx-auto mb-6">
            Quando um candidato concluir uma avaliação, o relatório aparecerá aqui pronto para download.
          </p>
          <Link
            href="/dashboard/assessments"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-[14px] font-semibold text-white
                       shadow-terra hover:-translate-y-px transition-all"
            style={{ background: 'linear-gradient(135deg, #c4633a, #d4943a)' }}
          >
            Enviar primeira avaliação →
          </Link>
        </div>
      )}

      {/* Bundle reports */}
      {bundleReports.length > 0 && (
        <section className="space-y-4">
          <div>
            <h2 className="font-serif text-2xl font-semibold text-soul-ink">
              Devolutivas integradas
            </h2>
            <p className="text-[14px] text-soul-ink/70 font-medium">
              Relatórios que cruzam múltiplos testes em uma leitura unificada.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bundleReports.map((br) => (
              <div key={br.id} className="soul-panel hover:-translate-y-0.5 transition-transform">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <p className="font-serif text-lg font-semibold text-soul-ink leading-tight">
                      {br.employee.name}
                    </p>
                    <p className="text-[13px] text-soul-ink/70 font-medium mt-0.5">{br.employee.email}</p>
                  </div>
                  <span
                    className="inline-flex items-center rounded-full px-3 py-1 text-[12px] font-semibold"
                    style={{
                      background: br.status === 'COMPLETED' ? 'rgba(122,158,126,0.22)' : 'rgba(212,148,58,0.18)',
                      color: br.status === 'COMPLETED' ? '#4a7a4e' : '#8a5c1e',
                    }}
                  >
                    {br.status === 'COMPLETED' ? 'Pronto' : br.status === 'GENERATING' ? 'Gerando…' : 'Pendente'}
                  </span>
                </div>
                <p className="text-[13px] text-soul-ink/65 font-medium mb-4">
                  {br.createdAt.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
                </p>
                <Link
                  href={`/dashboard/reports/${br.bundleId}`}
                  className="inline-flex items-center gap-2 w-full justify-center py-2.5 rounded-full text-[13px] font-bold
                             border-2 transition-all"
                  style={{ borderColor: 'rgba(196,99,58,0.4)', color: '#c4633a' }}
                >
                  Abrir devolutiva integrada →
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Individual results */}
      {individualResults.length > 0 && (
        <section className="space-y-4">
          <div>
            <h2 className="font-serif text-2xl font-semibold text-soul-ink">
              Relatórios individuais
            </h2>
            <p className="text-[14px] text-soul-ink/70 font-medium">
              Devolutivas geradas a partir de um único teste.
            </p>
          </div>
          <div className="soul-panel p-0 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-soul-mist/70 bg-soul-parchment/40">
                    <th className="text-left px-6 py-4 text-[12px] font-bold uppercase tracking-widest text-soul-ink/70">
                      Candidato
                    </th>
                    <th className="text-left px-6 py-4 text-[12px] font-bold uppercase tracking-widest text-soul-ink/70 hidden md:table-cell">
                      Teste
                    </th>
                    <th className="text-left px-6 py-4 text-[12px] font-bold uppercase tracking-widest text-soul-ink/70 hidden lg:table-cell">
                      Concluído
                    </th>
                    <th className="text-right px-6 py-4 text-[12px] font-bold uppercase tracking-widest text-soul-ink/70">
                      Ação
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {individualResults.map((r) => (
                    <tr key={r.id} className="border-b border-soul-mist/50 hover:bg-soul-parchment/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-[15px] text-soul-ink">{r.employee.name}</div>
                        <div className="text-[13px] text-soul-ink/70 font-medium mt-0.5">{r.employee.email}</div>
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        <div className="text-[14px] font-semibold text-soul-ink">
                          {TEST_LABELS[r.testType] ?? r.testType}
                        </div>
                      </td>
                      <td className="px-6 py-4 hidden lg:table-cell">
                        <div className="text-[14px] font-medium text-soul-ink/85">
                          {r.completedAt?.toLocaleDateString('pt-BR') ?? '—'}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="inline-flex gap-2">
                          <Link
                            href={`/result/${r.id}`}
                            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-[12px] font-bold
                                       border transition-colors hover:border-soul-terracota hover:text-soul-terracota"
                            style={{ borderColor: 'rgba(232,226,214,0.9)', color: '#1c1a17' }}
                          >
                            Ver
                          </Link>
                          <a
                            href={`/api/results/${r.id}/pdf`}
                            target="_blank"
                            rel="noopener"
                            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-[12px] font-bold text-white
                                       shadow-terra hover:-translate-y-px transition-all"
                            style={{ background: 'linear-gradient(135deg, #c4633a, #d4943a)' }}
                          >
                            PDF ↓
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
