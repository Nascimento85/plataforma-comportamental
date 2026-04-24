import { prisma } from '@/lib/prisma'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Admin — Visão Geral' }

const TEST_LABELS: Record<string, string> = {
  DISC: 'DISC', MBTI: 'MBTI', ENNEAGRAM: 'Eneagrama', TEMPERAMENT: '4 Temperamentos',
  ARCHETYPE: 'Arquétipos', ARCHETYPE_FEMININE: 'Arq. Femininos', LOVE_LANGUAGES: 'Ling. Amor',
  BUNDLE: 'Bundle',
}

const TEST_EMOJI: Record<string, string> = {
  DISC: '🎭', MBTI: '🧩', ENNEAGRAM: '⬡', TEMPERAMENT: '🌡',
  ARCHETYPE: '🧭', ARCHETYPE_FEMININE: '🌸', LOVE_LANGUAGES: '💞', BUNDLE: '✨',
}

export default async function AdminPage() {
  const [
    totalCompanies,
    totalAssessments,
    completedCount,
    pendingCount,
    discCount,
    mbtiCount,
    enneagramCount,
    temperamentCount,
    recentAssessments,
    recentCompanies,
  ] = await Promise.all([
    prisma.company.count({ where: { isAdmin: false } }),
    prisma.assessment.count(),
    prisma.assessment.count({ where: { status: 'COMPLETED' } }),
    prisma.assessment.count({ where: { status: { in: ['PENDING', 'SENT'] } } }),
    prisma.assessment.count({ where: { testType: 'DISC' } }),
    prisma.assessment.count({ where: { testType: 'MBTI' } }),
    prisma.assessment.count({ where: { testType: 'ENNEAGRAM' } }),
    prisma.assessment.count({ where: { testType: 'TEMPERAMENT' } }),
    prisma.assessment.findMany({
      take: 6,
      orderBy: { createdAt: 'desc' },
      where: { status: 'COMPLETED' },
      include: {
        employee: { select: { name: true } },
        company:  { select: { name: true } },
      },
    }),
    prisma.company.findMany({
      take: 6,
      orderBy: { createdAt: 'desc' },
      where: { isAdmin: false },
      select: { id: true, name: true, email: true, createdAt: true, _count: { select: { assessments: true } } },
    }),
  ])

  const conclusionRate = totalAssessments > 0
    ? `${Math.round((completedCount / totalAssessments) * 100)}%`
    : '—'

  return (
    <div className="space-y-7">

      {/* Header */}
      <div>
        <h1 className="font-serif font-semibold text-3xl text-soul-ink">Painel Administrativo</h1>
        <p className="text-sm text-soul-ink/45 mt-1 font-sans">Visão geral de toda a plataforma</p>
      </div>

      {/* Stats principais */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Empresas',       value: totalCompanies, emoji: '🏢', color: '#3d4f7c', bg: 'rgba(61,79,124,0.07)',   border: 'rgba(61,79,124,0.15)'   },
          { label: 'Concluídos',     value: completedCount, emoji: '✓',  color: '#7a9e7e', bg: 'rgba(122,158,126,0.07)', border: 'rgba(122,158,126,0.15)' },
          { label: 'Aguardando',     value: pendingCount,   emoji: '⏳', color: '#d4943a', bg: 'rgba(212,148,58,0.07)',  border: 'rgba(212,148,58,0.15)'  },
          { label: 'Taxa conclusão', value: conclusionRate, emoji: '📊', color: '#c4633a', bg: 'rgba(196,99,58,0.07)',   border: 'rgba(196,99,58,0.12)'   },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-3xl p-5"
               style={{ border: `1px solid ${s.border}` }}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-base">{s.emoji}</span>
              <span className="text-[10px] font-sans font-semibold uppercase tracking-widest"
                    style={{ color: 'rgba(28,26,23,0.4)' }}>{s.label}</span>
            </div>
            <div className="font-serif font-semibold leading-none" style={{ fontSize: '36px', color: s.color }}>
              {s.value}
            </div>
          </div>
        ))}
      </div>

      {/* Por tipo de teste */}
      <div>
        <h2 className="text-[10px] font-sans font-semibold text-soul-ink/35 uppercase tracking-[0.15em] mb-3">
          Testes por tipo
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'DISC',           value: discCount,        dot: 'bg-soul-terracota' },
            { label: 'MBTI',           value: mbtiCount,        dot: 'bg-soul-sage'      },
            { label: 'Eneagrama',      value: enneagramCount,   dot: 'bg-soul-amber'     },
            { label: '4 Temperamentos',value: temperamentCount, dot: 'bg-soul-indigo'    },
          ].map((t) => (
            <div key={t.label} className="bg-white rounded-2xl px-4 py-3 flex items-center gap-3"
                 style={{ border: '1px solid rgba(232,226,214,0.6)' }}>
              <div className={`w-2 h-2 rounded-full flex-shrink-0 ${t.dot}`} />
              <div>
                <div className="font-serif font-semibold text-2xl text-soul-ink leading-none">{t.value}</div>
                <div className="text-[11px] text-soul-ink/40 mt-0.5 font-sans">{t.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Listas recentes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* Testes recentes */}
        <div className="bg-white rounded-3xl overflow-hidden" style={{ border: '1px solid rgba(232,226,214,0.6)' }}>
          <div className="flex items-center justify-between px-6 py-4"
               style={{ borderBottom: '1px solid rgba(232,226,214,0.5)' }}>
            <h2 className="font-serif font-semibold text-lg text-soul-ink flex items-center gap-2">
              <span>📋</span> Últimos concluídos
            </h2>
            <Link href="/admin/assessments"
                  className="text-xs text-soul-terracota font-sans hover:underline">
              Ver todos →
            </Link>
          </div>
          <div className="divide-y divide-soul-mist/30">
            {recentAssessments.length === 0 ? (
              <p className="text-center text-sm text-soul-ink/35 py-8 font-sans">Nenhum teste concluído ainda.</p>
            ) : recentAssessments.map((a) => (
              <Link
                key={a.id}
                href={`/admin/assessments/${a.id}`}
                className="flex items-center justify-between px-6 py-3 hover:bg-soul-cream/40 transition-colors"
              >
                <div>
                  <p className="text-sm font-medium text-soul-ink font-sans">{a.employee.name}</p>
                  <p className="text-[11px] text-soul-ink/35 font-sans">{a.company.name}</p>
                </div>
                <span className="text-xs font-medium px-2.5 py-1 rounded-full font-sans flex-shrink-0"
                      style={{ background: 'rgba(122,158,126,0.1)', color: '#5a8a5e' }}>
                  {TEST_EMOJI[a.testType] ?? '📊'} {TEST_LABELS[a.testType] ?? a.testType}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Empresas recentes */}
        <div className="bg-white rounded-3xl overflow-hidden" style={{ border: '1px solid rgba(232,226,214,0.6)' }}>
          <div className="px-6 py-4" style={{ borderBottom: '1px solid rgba(232,226,214,0.5)' }}>
            <h2 className="font-serif font-semibold text-lg text-soul-ink flex items-center gap-2">
              <span>🏢</span> Empresas recentes
            </h2>
          </div>
          <div className="divide-y divide-soul-mist/30">
            {recentCompanies.length === 0 ? (
              <p className="text-center text-sm text-soul-ink/35 py-8 font-sans">Nenhuma empresa cadastrada.</p>
            ) : recentCompanies.map((c) => (
              <div key={c.id} className="flex items-center justify-between px-6 py-3 hover:bg-soul-cream/40 transition-colors">
                <div>
                  <p className="text-sm font-medium text-soul-ink font-sans">{c.name}</p>
                  <p className="text-[11px] text-soul-ink/35 font-sans">{c.email}</p>
                </div>
                <span className="text-[11px] text-soul-ink/30 font-sans flex-shrink-0">
                  {c._count.assessments} teste{c._count.assessments !== 1 ? 's' : ''}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
