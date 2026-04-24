import { getSession } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import type { Metadata } from 'next'
import { StatCard } from '@/components/ui/design-system'
import DiscoveryMapCard from './_components/DiscoveryMapCard'
import RecentActivityCard from './_components/RecentActivityCard'
import CreditsWidget from './_components/CreditsWidget'
import ArchetypeHero from './_components/ArchetypeHero'
import OnboardingHero from './_components/OnboardingHero'
import NewAssessmentButton from './assessments/NewAssessmentButton'

export const metadata: Metadata = { title: 'Dashboard' }

// ─────────────────────────────────────────────────────────────────────────────
// Data Layer
// ─────────────────────────────────────────────────────────────────────────────

async function getDashboardData(companyId: string) {
  const [creditBalance, recentAssessments, totalCompleted, totalPending] =
    await Promise.all([
      prisma.creditBalance.findUnique({ where: { companyId } }),

      prisma.assessment.findMany({
        where: { companyId },
        orderBy: { createdAt: 'desc' },
        take: 8,
        include: { employee: { select: { name: true } } },
      }),

      prisma.assessment.count({
        where: { companyId, status: 'COMPLETED' },
      }),

      prisma.assessment.count({
        where: { companyId, status: { in: ['PENDING', 'SENT'] } },
      }),
    ])

  return {
    credits:           creditBalance?.balance ?? 0,
    recentAssessments,
    totalCompleted,
    totalPending,
    totalCandidates:   recentAssessments.length,
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default async function DashboardPage() {
  const session     = await getSession()
  const companyId   = session!.id
  const firstName   = session!.name?.split(' ')[0] ?? 'explorador'

  const { credits, recentAssessments, totalCompleted, totalPending, totalCandidates } =
    await getDashboardData(companyId)

  const isNewAccount = recentAssessments.length === 0

  // Hora do dia para saudação
  const hour    = new Date().getHours()
  const greeting =
    hour < 12 ? 'Bom dia' :
    hour < 18 ? 'Boa tarde' : 'Boa noite'

  // Dia e data formatados
  const today = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day:     'numeric',
    month:   'long',
  })

  return (
    <div className="space-y-6">

      {/* ══════════════════════════════════════════════════════
          TOP BAR
      ══════════════════════════════════════════════════════ */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-serif font-semibold text-3xl md:text-4xl text-soul-ink leading-tight">
            {greeting},{' '}
            <em className="not-italic text-soul-terracota">{firstName}</em>{' '}
            <span className="text-2xl">✦</span>
          </h1>
          <p className="text-[15px] text-soul-ink/75 mt-1.5 capitalize font-semibold">{today}</p>
        </div>

        <div className="flex items-center gap-2.5 flex-shrink-0">
          <Link
            href="/dashboard/candidates"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-3 rounded-full
                       border-2 border-soul-mist bg-white text-[14px] text-soul-ink font-sans font-bold
                       hover:border-soul-terracota hover:text-soul-terracota transition-all duration-200"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M13.5 8C13.5 11.04 11.04 13.5 8 13.5C4.96 13.5 2.5 11.04 2.5 8C2.5 4.96 4.96 2.5 8 2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              <path d="M11 2L14 5L11 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Ver candidatos
          </Link>

          <NewAssessmentButton />
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          HERO: onboarding para conta nova / arquétipo para conta ativa
      ══════════════════════════════════════════════════════ */}
      {isNewAccount ? (
        <OnboardingHero firstName={firstName} credits={credits} />
      ) : (
        <ArchetypeHero
          name={session!.name ?? firstName}
          totalCompleted={totalCompleted}
        />
      )}

      {/* ══════════════════════════════════════════════════════
          STATS ROW
      ══════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          value={credits}
          label="Créditos disponíveis"
          icon="🪙"
          accent={credits <= 3 ? 'rose' : 'terracota'}
          delta={credits <= 3 ? '⚠ Recarregar em breve' : undefined}
          deltaUp={credits > 3 ? true : false}
        />
        <StatCard
          value={totalCompleted}
          label="Avaliações concluídas"
          icon="✅"
          accent="sage"
          delta={totalCompleted > 0 ? `↑ histórico acumulado` : undefined}
          deltaUp={true}
        />
        <StatCard
          value={totalPending}
          label="Candidatos ativos"
          icon="👥"
          accent="indigo"
          delta={totalPending > 0 ? `${totalPending} aguardando resposta` : 'Nenhum em andamento'}
          deltaUp={totalPending === 0}
        />
        <StatCard
          value="4/12"
          label="Cartas descobertas"
          icon="🃏"
          accent="gold"
          delta="↑ Nova carta disponível!"
          deltaUp={true}
        />
      </div>

      {/* ══════════════════════════════════════════════════════
          GRID: Discovery Map + Créditos/Insight
      ══════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5">

        {/* Discovery Map */}
        <DiscoveryMapCard totalCompleted={totalCompleted} />

        {/* Lateral direita */}
        <div className="flex flex-col gap-5">
          <CreditsWidget credits={credits} />

          {/* Insight card */}
          <div
            className="rounded-3xl p-5 relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #3d4f7c, #2d3f6b)' }}
          >
            <div
              className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-[0.07]"
              style={{ background: 'radial-gradient(circle, white, transparent)', transform: 'translate(30%, -30%)' }}
            />
            <div className="text-xl mb-2">💡</div>
            <div className="font-serif font-semibold text-[15px] text-white leading-snug mb-2">
              Insight do seu arquétipo
            </div>
            <p className="text-xs text-white/55 leading-relaxed">
              Exploradores têm 40% mais engajamento quando trabalham em projetos com autonomia total. Considere isso na composição do time.
            </p>
            <Link
              href="/dashboard/reports"
              className="mt-3 inline-flex items-center gap-1 text-xs text-white/70 border-b border-white/20 pb-px hover:border-white/50 transition-colors"
            >
              Explorar compatibilidade →
            </Link>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          BOTTOM: Activity + Candidatos
      ══════════════════════════════════════════════════════ */}
      <RecentActivityCard assessments={recentAssessments} />

    </div>
  )
}
