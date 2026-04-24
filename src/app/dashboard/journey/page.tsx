import { getSession } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Minha Jornada' }

const TEST_LABELS: Record<string, { label: string; short: string; color: string; emoji: string }> = {
  DISC:               { label: 'DISC — Perfil Comportamental',     short: 'DISC',         color: '#c4633a', emoji: '◉' },
  MBTI:               { label: 'MBTI — 16 Tipos de Personalidade', short: 'MBTI',         color: '#3d4f7c', emoji: '◆' },
  ENNEAGRAM:          { label: 'Eneagrama — 9 Tipos',              short: 'Eneagrama',    color: '#c9a84c', emoji: '✧' },
  TEMPERAMENT:        { label: '4 Temperamentos',                  short: 'Temperamentos',color: '#7a9e7e', emoji: '⬢' },
  ARCHETYPE:          { label: 'Arquétipos — Os 12 Padrões',       short: 'Arquétipos',   color: '#c47a72', emoji: '❀' },
  ARCHETYPE_FEMININE: { label: 'Arquétipos Femininos',             short: 'Arq. Fem.',    color: '#d4943a', emoji: '☽' },
  LOVE_LANGUAGES:     { label: '5 Linguagens do Amor',             short: 'Ling. Amor',   color: '#c47a72', emoji: '❤' },
}

async function getJourney(companyId: string) {
  const assessments = await prisma.assessment.findMany({
    where: { companyId },
    orderBy: { createdAt: 'desc' },
    include: {
      employee: { select: { name: true } },
    },
  })

  const completed = assessments.filter((a) => a.status === 'COMPLETED')
  const inProgress = assessments.filter((a) => a.status === 'PENDING' || a.status === 'SENT')
  const expired = assessments.filter((a) => a.status === 'EXPIRED')

  return { all: assessments, completed, inProgress, expired }
}

export default async function JourneyPage() {
  const session = await getSession()
  const { all, completed, inProgress, expired } = await getJourney(session!.id)

  const completionRate = all.length > 0 ? Math.round((completed.length / all.length) * 100) : 0

  return (
    <div className="space-y-7">
      {/* Header */}
      <div>
        <h1 className="font-serif font-semibold text-4xl text-soul-ink leading-tight">
          Minha Jornada
        </h1>
        <p className="text-base text-soul-ink/75 mt-2 font-medium max-w-2xl">
          O registro completo de cada avaliação enviada — concluídas, em andamento e pendentes.
          Acompanhe o progresso do mapeamento comportamental da sua empresa.
        </p>
      </div>

      {/* Resumo */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="soul-panel">
          <p className="text-[12px] font-bold uppercase tracking-widest text-soul-ink/65">Total</p>
          <p className="font-serif text-3xl font-semibold text-soul-ink mt-1">{all.length}</p>
        </div>
        <div className="soul-panel">
          <p className="text-[12px] font-bold uppercase tracking-widest text-soul-sage">Concluídas</p>
          <p className="font-serif text-3xl font-semibold text-soul-ink mt-1">{completed.length}</p>
        </div>
        <div className="soul-panel">
          <p className="text-[12px] font-bold uppercase tracking-widest text-soul-amber">Em andamento</p>
          <p className="font-serif text-3xl font-semibold text-soul-ink mt-1">{inProgress.length}</p>
        </div>
        <div className="soul-panel">
          <p className="text-[12px] font-bold uppercase tracking-widest text-soul-rose">Expiradas</p>
          <p className="font-serif text-3xl font-semibold text-soul-ink mt-1">{expired.length}</p>
        </div>
      </div>

      {/* Progress */}
      <div className="soul-panel">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-[13px] font-bold uppercase tracking-widest text-soul-ink/65">Taxa de conclusão</p>
            <p className="font-serif text-3xl font-semibold text-soul-ink mt-1">{completionRate}%</p>
          </div>
          <p className="text-[14px] text-soul-ink/70 font-medium">
            {completed.length} de {all.length} avaliações finalizadas
          </p>
        </div>
        <div className="h-3 rounded-full bg-soul-mist/60 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{
              width: `${completionRate}%`,
              background: 'linear-gradient(90deg, #c4633a, #d4943a, #c9a84c)',
            }}
          />
        </div>
      </div>

      {/* Em andamento */}
      {inProgress.length > 0 && (
        <section className="space-y-3">
          <h2 className="font-serif text-2xl font-semibold text-soul-ink">
            Em andamento
          </h2>
          <div className="space-y-2">
            {inProgress.map((a) => {
              const t = TEST_LABELS[a.testType] ?? { label: a.testType, short: a.testType, color: '#c4633a', emoji: '✦' }
              return (
                <div key={a.id} className="soul-panel flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-bold flex-shrink-0"
                    style={{ background: `${t.color}22`, color: t.color }}
                  >
                    {t.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-[15px] text-soul-ink truncate">{a.employee.name}</p>
                    <p className="text-[13px] text-soul-ink/70 font-medium">{t.label}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="inline-flex items-center rounded-full px-3 py-1 text-[12px] font-bold"
                          style={{ background: 'rgba(212,148,58,0.18)', color: '#8a5c1e' }}>
                      {a.status === 'PENDING' ? 'Pendente' : 'Enviado'}
                    </span>
                    <p className="text-[12px] text-soul-ink/60 font-medium mt-1">
                      Expira {a.expiresAt.toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* Concluídas — timeline */}
      {completed.length > 0 && (
        <section className="space-y-3">
          <h2 className="font-serif text-2xl font-semibold text-soul-ink">
            Histórico de conclusões
          </h2>
          <div className="soul-panel p-0 overflow-hidden">
            {completed.map((a, i) => {
              const t = TEST_LABELS[a.testType] ?? { label: a.testType, short: a.testType, color: '#c4633a', emoji: '✦' }
              return (
                <div
                  key={a.id}
                  className={`flex items-center gap-4 px-6 py-4 ${i > 0 ? 'border-t border-soul-mist/50' : ''} hover:bg-soul-parchment/40 transition-colors`}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold flex-shrink-0"
                    style={{ background: `${t.color}22`, color: t.color }}
                  >
                    {t.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-[15px] text-soul-ink truncate">{a.employee.name}</p>
                    <p className="text-[13px] text-soul-ink/70 font-medium">{t.label}</p>
                  </div>
                  <div className="text-right hidden sm:block">
                    <p className="text-[13px] text-soul-ink font-semibold">
                      {a.completedAt?.toLocaleDateString('pt-BR')}
                    </p>
                    <p className="text-[12px] text-soul-ink/60 font-medium">
                      {a.completedAt?.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  <Link
                    href={`/dashboard/assessments/${a.id}`}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-[12px] font-bold
                               border-2 transition-colors hover:border-soul-terracota hover:text-soul-terracota"
                    style={{ borderColor: 'rgba(232,226,214,0.9)', color: '#1c1a17' }}
                  >
                    Ver →
                  </Link>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* Empty state */}
      {all.length === 0 && (
        <div className="soul-panel text-center py-16">
          <div className="text-5xl mb-4">✦</div>
          <h2 className="font-serif text-2xl font-semibold text-soul-ink mb-2">
            Sua jornada começa aqui
          </h2>
          <p className="text-base text-soul-ink/75 font-medium max-w-md mx-auto mb-6">
            Ainda não há avaliações. Envie o primeiro teste e comece a mapear o perfil comportamental da sua equipe.
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
    </div>
  )
}
