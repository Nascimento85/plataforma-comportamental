// ============================================================
// /dashboard/downloads — Hub central de PDFs Premium
//
// Lista todos os PDFs Premium personalizados disponíveis para o
// usuário. Os 3 materiais de cada perfil DISC só ficam baixáveis
// quando o Report tem ReportUnlock pago. Caso contrário, mostra
// CTA para desbloquear.
// ============================================================

import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import { DISC_PREMIUM, type DiscProfileKey } from '@/content/disc'
import { PLAYBOOK_LIST } from '@/content/playbooks'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Meus Downloads' }

// ─── Helpers ────────────────────────────────────────────────

const TEST_LABELS: Record<string, string> = {
  DISC: 'DISC — Perfil Comportamental',
  MBTI: 'MBTI — 16 Tipos de Personalidade',
  ENNEAGRAM: 'Eneagrama',
  TEMPERAMENT: '4 Temperamentos',
  ARCHETYPE: 'Arquétipos Junguianos',
  ARCHETYPE_FEMININE: 'Arquétipos Femininos',
  LOVE_LANGUAGES: '5 Linguagens do Amor',
  CAREER_ANCHOR: 'Âncoras de Carreira',
  EMOTIONAL_INTELLIGENCE: 'Inteligência Emocional',
}

function isDiscProfile(s: string | null | undefined): s is DiscProfileKey {
  return s === 'D' || s === 'I' || s === 'S' || s === 'C'
}

function fmtDate(d: Date): string {
  return new Date(d).toLocaleDateString('pt-BR', {
    day: '2-digit', month: 'long', year: 'numeric',
  })
}

// ─── Page ───────────────────────────────────────────────────

export default async function DownloadsPage() {
  const session = await getSession()
  if (!session) redirect('/login')

  // Carrega todos os Reports da empresa, com unlock + dados do assessment
  const reports = await prisma.report.findMany({
    where: { companyId: session.id },
    orderBy: { createdAt: 'desc' },
    include: {
      unlock:     { select: { id: true, unlockedAt: true } },
      assessment: {
        include: { employee: { select: { name: true, email: true } } },
      },
      result:     { select: { primaryProfile: true, testType: true } },
    },
  })

  // Particiona em desbloqueados vs bloqueados
  const unlocked = reports.filter(r => r.unlock !== null)
  const locked   = reports.filter(r => r.unlock === null)

  // Conta total de PDFs disponíveis (3 por Report DISC desbloqueado, 0 pra demais)
  const totalPdfs = unlocked.reduce((acc, r) => {
    const profile = r.result?.primaryProfile
    if (r.assessment.testType === 'DISC' && isDiscProfile(profile)) {
      return acc + DISC_PREMIUM[profile].downloads.length
    }
    return acc
  }, 0)

  return (
    <div className="space-y-8">

      {/* ── Header ── */}
      <div>
        <span className="inline-block text-[11px] font-bold uppercase tracking-[0.18em] px-3 py-1 rounded-full mb-3"
              style={{ background: 'rgba(196,99,58,0.15)', color: '#e09070' }}>
          Premium · Downloads
        </span>
        <h1 className="font-serif font-semibold text-3xl md:text-4xl text-soul-ink leading-tight">
          Meus <span className="text-soul-terracota italic font-normal">Downloads</span>
        </h1>
        <p className="text-base md:text-lg text-soul-ink/85 mt-3 font-medium max-w-3xl leading-relaxed">
          PDFs personalizados com seu nome, prontos para imprimir e levar pra reunião.
          Cada material é gerado dinamicamente — capa, sumário e capítulos com sua marca.
        </p>
      </div>

      {/* ── Stats ── */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="PDFs disponíveis" value={totalPdfs} tone="positive" />
        <StatCard label="Relatórios Premium" value={unlocked.length} />
        <StatCard label="Aguardando desbloqueio" value={locked.length} tone={locked.length > 0 ? 'warning' : 'neutral'} />
        <StatCard label="Total de testes" value={reports.length} />
      </section>

      {/* ── Materiais Gratuitos ── */}
      <section>
        <SectionHeading
          title="Materiais gratuitos"
          subtitle="Playbooks completos disponíveis para você baixar e compartilhar livremente."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PLAYBOOK_LIST.map((pb) => (
            <Link key={pb.slug} href={`/playbook/${pb.slug}`}
                  className="soul-panel block hover:shadow-soul-lg transition-shadow group">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 text-xl"
                     style={{ background: 'rgba(196,99,58,0.12)' }}>
                  📘
                </div>
                <div className="flex-1 min-w-0">
                  <span className="inline-block text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full mb-1"
                        style={{ background: 'rgba(122,158,126,0.18)', color: '#4a7a4e' }}>
                    {pb.badge}
                  </span>
                  <h3 className="font-serif font-semibold text-lg text-soul-ink leading-tight">{pb.titulo}</h3>
                </div>
              </div>
              <p className="text-[13px] text-soul-ink/80 font-medium leading-relaxed mb-3">{pb.subtitulo}</p>
              <p className="text-[12px] font-bold text-soul-terracota group-hover:underline">
                Ler playbook →
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Disponíveis ── */}
      {unlocked.length > 0 && (
        <section>
          <SectionHeading
            title="Disponíveis para download"
            subtitle="Materiais Premium liberados — clique para baixar o PDF personalizado."
          />
          <div className="space-y-6">
            {unlocked.map(r => (
              <ReportDownloadGroup
                key={r.id}
                reportId={r.id}
                testType={r.assessment.testType}
                primaryProfile={r.result?.primaryProfile ?? null}
                employeeName={r.assessment.employee.name}
                createdAt={r.createdAt}
                unlocked
              />
            ))}
          </div>
        </section>
      )}

      {/* ── Bloqueados ── */}
      {locked.length > 0 && (
        <section>
          <SectionHeading
            title="Em Premium (a desbloquear)"
            subtitle="Relatórios concluídos cujos materiais Premium ainda não foram liberados."
          />
          <div className="space-y-6">
            {locked.map(r => (
              <ReportDownloadGroup
                key={r.id}
                reportId={r.id}
                testType={r.assessment.testType}
                primaryProfile={r.result?.primaryProfile ?? null}
                employeeName={r.assessment.employee.name}
                createdAt={r.createdAt}
                unlocked={false}
                assessmentId={r.assessmentId}
              />
            ))}
          </div>
        </section>
      )}

      {/* ── Empty state ── */}
      {reports.length === 0 && (
        <div className="rounded-3xl border-2 border-dashed border-soul-mist p-10 text-center">
          <div className="text-5xl mb-4">🎟️</div>
          <h2 className="font-serif text-xl font-semibold text-soul-ink mb-2">
            Nenhum download ainda
          </h2>
          <p className="text-soul-ink/70 max-w-md mx-auto mb-6">
            Quando você concluir um teste e desbloquear o Premium, todos os
            materiais aparecem aqui prontos para baixar.
          </p>
          <Link
            href="/dashboard/behavioral"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-soul-terracota text-white font-semibold hover:opacity-90 transition-opacity"
          >
            Começar pelo DISC →
          </Link>
        </div>
      )}

      {/* ── Footer info ── */}
      {reports.length > 0 && (
        <p className="text-[12px] text-soul-ink/50 italic pt-2">
          Cada PDF tem capa personalizada com seu nome e é gerado sob demanda.
          Distribuição autorizada apenas para o usuário avaliado.
        </p>
      )}
    </div>
  )
}

// ─── Sub-componentes ────────────────────────────────────────

function StatCard({
  label, value, tone = 'neutral',
}: {
  label: string
  value: number | string
  tone?: 'neutral' | 'positive' | 'warning'
}) {
  const toneClass = {
    neutral:  'border-soul-mist/60 bg-soul-parchment',
    positive: 'border-emerald-200 bg-emerald-50',
    warning:  'border-amber-200 bg-amber-50',
  }[tone]
  return (
    <div className={`rounded-3xl p-5 border ${toneClass}`}>
      <p className="text-[11px] font-bold uppercase tracking-widest text-soul-ink/55">{label}</p>
      <p className="font-serif text-3xl font-semibold text-soul-ink mt-2 leading-none">{value}</p>
    </div>
  )
}

function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-3">
      <h2 className="font-serif text-2xl font-semibold text-soul-ink">{title}</h2>
      {subtitle && <p className="text-[14px] text-soul-ink/65 font-medium">{subtitle}</p>}
    </div>
  )
}

function ReportDownloadGroup({
  reportId, testType, primaryProfile, employeeName, createdAt, unlocked, assessmentId,
}: {
  reportId:       string
  testType:       string
  primaryProfile: string | null
  employeeName:   string
  createdAt:      Date
  unlocked:       boolean
  assessmentId?:  string
}) {
  const testLabel = TEST_LABELS[testType] ?? testType
  const isDISC = testType === 'DISC' && isDiscProfile(primaryProfile)
  const profile = isDISC ? DISC_PREMIUM[primaryProfile as DiscProfileKey] : null

  return (
    <article className="rounded-3xl bg-soul-parchment border border-soul-mist/60 overflow-hidden">

      {/* Header do grupo */}
      <header
        className="px-6 py-5 flex flex-wrap items-center justify-between gap-3"
        style={{
          background: profile
            ? `linear-gradient(135deg, ${profile.paletteHex}11, ${profile.paletteHex}03)`
            : '#fafaf6',
          borderBottom: '1px solid rgba(240,236,227,0.06)',
        }}
      >
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] mb-1"
             style={{ color: profile?.paletteHex ?? '#a8522e' }}>
            {testLabel}
          </p>
          <h3 className="font-serif text-xl font-bold text-soul-ink">
            {profile ? profile.label : 'Relatório'}
            {primaryProfile && !isDISC && <span className="text-soul-ink/55 font-medium"> · {primaryProfile}</span>}
          </h3>
          <p className="text-[13px] text-soul-ink/60 mt-1">
            {employeeName} · {fmtDate(createdAt)}
          </p>
        </div>

        {!unlocked && assessmentId && (
          <Link
            href={`/result/${assessmentId}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-soul-terracota text-white text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            🔒 Desbloquear Premium
          </Link>
        )}
      </header>

      {/* Lista de PDFs */}
      <div className="p-6">
        {profile && unlocked && (
          <div className="grid sm:grid-cols-3 gap-4">
            {profile.downloads.map(d => (
              <a
                key={d.slug}
                href={`/api/downloads/${d.slug}?reportId=${encodeURIComponent(reportId)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-2xl border border-soul-mist/60 p-5 hover:border-soul-terracota/40 hover:-translate-y-0.5 transition-all bg-soul-parchment"
              >
                <div className="text-[10px] font-bold tracking-widest uppercase mb-2"
                     style={{ color: profile.paletteHex }}>
                  {d.kind} · {d.pages} pp
                </div>
                <h4 className="font-serif text-lg font-bold text-soul-ink mb-2 leading-tight">{d.title}</h4>
                <p className="text-sm text-soul-ink/65 mb-3 line-clamp-3">{d.pitch}</p>
                <p className="text-[12px] font-bold text-soul-terracota">Baixar PDF →</p>
              </a>
            ))}
          </div>
        )}
        {!profile && (
          <p className="text-[14px] text-soul-ink/65 font-medium">
            PDFs personalizados ainda não estão disponíveis para este tipo de teste.
          </p>
        )}
      </div>
    </article>
  )
}
