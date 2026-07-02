import { getSession } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import type { Metadata } from 'next'
import FerramentasShowcase from './_components/FerramentasShowcase'
import PlaybooksHome from './_components/PlaybooksHome'
import RecentActivityCard from './_components/RecentActivityCard'
import PassportWidget from '@/components/passport/PassportWidget'
import { getPassportState, WELCOME_BONUS_AMOUNT, PROFILE_COMPLETE_AMOUNT } from '@/lib/passport'
import ArchetypeHero from './_components/ArchetypeHero'
import OnboardingHero from './_components/OnboardingHero'
import WelcomeModal from './_components/WelcomeModal'
import ProfileGamificationBanner from './_components/ProfileGamificationBanner'
import NewAssessmentButton from './assessments/NewAssessmentButton'
import { calculateProfileCompletion } from '@/lib/profile'

export const metadata: Metadata = { title: 'Dashboard' }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prismaAny = prisma as any

// ─────────────────────────────────────────────────────────────────────────────
// Data Layer
// ─────────────────────────────────────────────────────────────────────────────

async function getDashboardData(companyId: string) {
  const weekAgo = new Date(Date.now() - 7 * 86_400_000)

  const [
    company,
    recentAssessments,
    totalCompleted,
    completedThisWeek,
    totalPending,
    employeeCount,
    teamsCount,
    passport,
  ] = await Promise.all([
    prisma.company.findUnique({
      where: { id: companyId },
      include: { creditBalance: true },
    }),

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
      where: { companyId, status: 'COMPLETED', completedAt: { gte: weekAgo } },
    }),

    prisma.assessment.count({
      where: { companyId, status: { in: ['PENDING', 'SENT'] } },
    }),

    prisma.employee.count({ where: { companyId } }),

    prismaAny.talentTeam.count({ where: { companyId } }) as Promise<number>,

    getPassportState(companyId),
  ])

  const profileCompletion = company ? calculateProfileCompletion(company) : 0

  return {
    company,
    credits:           passport.total,
    passport,
    profileCompletion,
    isProfileRewarded: company?.isProfileCompletedRewarded ?? false,
    recentAssessments,
    totalCompleted,
    completedThisWeek,
    totalPending,
    employeeCount,
    teamsCount,
    accountType:       (company?.type === 'PF' ? 'PF' : 'PJ') as 'PF' | 'PJ',
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// KPI acionável — número + unidade + próximo passo
// ─────────────────────────────────────────────────────────────────────────────

function KpiCard({
  label,
  value,
  unit,
  ctaLabel,
  ctaHref,
  alert = false,
}: {
  label: string
  value: number | string
  unit: string
  ctaLabel: string
  ctaHref: string
  alert?: boolean
}) {
  return (
    <div
      className="soul-panel !p-5 flex flex-col"
      style={alert ? { borderLeft: '2px solid rgba(212,148,58,0.7)' } : undefined}
    >
      <div className="flex items-start justify-between gap-2">
        <p
          className="text-[12.5px] font-bold tracking-[0.14em] uppercase"
          style={{ color: alert ? '#e0c878' : undefined }}
        >
          <span className={alert ? '' : 'text-soul-ink/78'}>{label}</span>
        </p>
        {alert && <span className="w-2 h-2 mt-1 rounded-full bg-soul-amber animate-pulse flex-shrink-0" />}
      </div>
      <p className="font-serif text-4xl font-semibold text-soul-ink mt-2">{value}</p>
      <p className="text-[13.5px] text-soul-ink/78 font-medium mt-1 flex-1">{unit}</p>
      <Link
        href={ctaHref}
        className="inline-flex items-center gap-1.5 mt-3 text-[13.5px] font-bold no-underline transition-colors"
        style={{ color: '#d4b35e' }}
      >
        {ctaLabel} →
      </Link>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Page — hierarquia: o que precisa de você → ações → atividade → ferramentas
// ─────────────────────────────────────────────────────────────────────────────

export default async function DashboardPage() {
  const session     = await getSession()
  const companyId   = session!.id
  const firstName   = session!.name?.split(' ')[0] ?? 'explorador'

  const {
    credits,
    passport,
    profileCompletion,
    isProfileRewarded,
    recentAssessments,
    totalCompleted,
    completedThisWeek,
    totalPending,
    employeeCount,
    teamsCount,
    accountType,
  } = await getDashboardData(companyId)

  const isNewAccount = recentAssessments.length === 0
  const isPJ = accountType === 'PJ'

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
    <div className="space-y-7">

      {/* ══════════════════════════════════════════════════════
          WELCOME MODAL — só aparece no primeiro login
          (controlado por localStorage no cliente)
      ══════════════════════════════════════════════════════ */}
      {!isProfileRewarded && (
        <WelcomeModal
          companyId={companyId}
          firstName={firstName}
          initialCredits={WELCOME_BONUS_AMOUNT}
          bonusCredits={PROFILE_COMPLETE_AMOUNT}
        />
      )}

      {/* ══════════════════════════════════════════════════════
          TOPBAR compacta: saudação + badge de créditos + CTAs
      ══════════════════════════════════════════════════════ */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-serif font-semibold text-3xl md:text-4xl text-soul-ink leading-tight">
            {greeting},{' '}
            <em className="not-italic text-soul-terracota">{firstName}</em>{' '}
            <span className="text-2xl">✦</span>
          </h1>
          <p className="text-[15px] text-soul-ink/85 mt-1.5 font-semibold">{today}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 flex-shrink-0">
          <Link
            href={isPJ ? '/dashboard/assinatura' : '/dashboard/credits'}
            className="inline-flex items-center gap-2 px-4 py-3 rounded-full text-[14px] font-bold no-underline transition-colors"
            style={{
              color: '#e0c878',
              background: 'rgba(201,168,76,0.10)',
              border: '1px solid rgba(201,168,76,0.28)',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#d4b35e' }} />
            {credits} {credits === 1 ? 'crédito' : 'créditos'}
          </Link>

          <Link
            href="/dashboard/candidates"
            className="hidden sm:inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full
                       border-2 border-soul-mist bg-soul-parchment text-[15px] text-soul-ink font-sans font-bold
                       hover:border-soul-terracota hover:text-soul-terracota transition-all duration-200"
          >
            Ver candidatos
          </Link>

          <div className="w-full sm:w-[210px]">
            <NewAssessmentButton fullWidth />
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          BANNER GAMIFICAÇÃO — só PF (PJ usa modelo de assinatura)
      ══════════════════════════════════════════════════════ */}
      {!isPJ && !isProfileRewarded && (
        <ProfileGamificationBanner completion={profileCompletion} bonusAmount={PROFILE_COMPLETE_AMOUNT} />
      )}

      {/* Onboarding só para conta PF recém-criada, antes dos KPIs zerados */}
      {!isPJ && isNewAccount && (
        <OnboardingHero firstName={firstName} credits={credits} />
      )}

      {/* ══════════════════════════════════════════════════════
          1. PULSO DO DIA — o que mudou, o que precisa de você
      ══════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KpiCard
          label="Aguardando resposta"
          value={totalPending}
          unit={totalPending === 1 ? 'avaliação com convite enviado' : 'avaliações com convite enviado'}
          ctaLabel={totalPending > 0 ? 'Reenviar convites' : 'Convidar candidato'}
          ctaHref="/dashboard/assessments"
          alert={totalPending > 0}
        />
        <KpiCard
          label="Avaliações concluídas"
          value={totalCompleted}
          unit={completedThisWeek > 0
            ? `↑ ${completedThisWeek} nesta semana`
            : 'histórico acumulado'}
          ctaLabel="Ver relatórios"
          ctaHref="/dashboard/reports"
        />
        <KpiCard
          label="Candidatos"
          value={employeeCount}
          unit={employeeCount === 1 ? 'pessoa cadastrada' : 'pessoas cadastradas'}
          ctaLabel="Gerenciar"
          ctaHref="/dashboard/candidates"
        />
        <KpiCard
          label="Equipes"
          value={teamsCount}
          unit={teamsCount === 1 ? 'equipe na Matriz de Talentos' : 'equipes na Matriz de Talentos'}
          ctaLabel={teamsCount > 0 ? 'Abrir gestão' : 'Criar a primeira'}
          ctaHref="/dashboard/gestao-times"
        />
      </div>

      {/* ══════════════════════════════════════════════════════
          2. AÇÕES RÁPIDAS — uma linha, sem banner
      ══════════════════════════════════════════════════════ */}
      <div className="flex flex-wrap items-center gap-3">
        <Link href="/dashboard/behavioral"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-[14.5px] font-bold text-soul-ink no-underline transition-transform hover:-translate-y-px"
              style={{ background: 'linear-gradient(135deg, #c9a84c, #d4943a)' }}>
          ▶ Iniciar teste
        </Link>
        {[
          { label: 'Mapear NR-1 do time',  href: '/dashboard/compliance/nr1' },
          { label: 'Gestão de Equipes',    href: '/dashboard/gestao-times' },
          { label: 'Guia de Entrevistas',  href: '/dashboard/guia-entrevista' },
          { label: 'Baixar playbooks',     href: '/dashboard/downloads' },
        ].map((a) => (
          <Link key={a.href} href={a.href}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-[14.5px] font-semibold text-soul-ink no-underline
                           bg-soul-parchment border border-white/10 transition-all hover:-translate-y-px hover:border-soul-gold/40">
            {a.label}
          </Link>
        ))}
      </div>

      {/* Nível/arquétipo — só PF ativa; vem depois dos dados, não antes */}
      {!isPJ && !isNewAccount && (
        <ArchetypeHero
          name={session!.name ?? firstName}
          totalCompleted={totalCompleted}
        />
      )}

      {/* ══════════════════════════════════════════════════════
          3. ATIVIDADE (⅔) + PASSAPORTE / LEITURA CRUZADA (⅓)
      ══════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
        <div className="lg:col-span-2">
          <RecentActivityCard assessments={recentAssessments} />
        </div>

        <div className="space-y-5">
          <PassportWidget state={passport} />

          {/* Leitura cruzada — único acento azul permitido no dashboard */}
          <div
            className="rounded-3xl p-5 relative overflow-hidden flex flex-col"
            style={{ background: 'linear-gradient(135deg, #3d4f7c, #2d3f6b)' }}
          >
            <div
              className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-[0.07]"
              style={{ background: 'radial-gradient(circle, white, transparent)', transform: 'translate(30%, -30%)' }}
            />
            <p className="text-[12px] font-bold tracking-[0.18em] uppercase mb-2" style={{ color: '#a8bce8' }}>
              Leitura cruzada
            </p>
            <div className="font-serif font-semibold text-[17px] text-white leading-snug mb-1.5">
              Compare os perfis do seu time
            </div>
            <p className="text-[13.5px] text-white/85 leading-relaxed flex-1">
              Cruze DISC, MBTI e Eneagrama entre membros e descubra atritos antes que virem conflito.
            </p>
            <Link
              href="/dashboard/gestao-times"
              className="mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-full text-[14.5px] font-bold text-white no-underline transition-all hover:-translate-y-px"
              style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.28)' }}
            >
              Explorar compatibilidade →
            </Link>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          4. FERRAMENTAS — catálogo compacto, sem copy de venda
      ══════════════════════════════════════════════════════ */}
      <FerramentasShowcase />

      {/* ══════════════════════════════════════════════════════
          5. PLAYBOOKS — faixa única com chips
      ══════════════════════════════════════════════════════ */}
      <PlaybooksHome />

    </div>
  )
}
