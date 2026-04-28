// ============================================================
// /admin/passaporte — Dashboard de métricas do Passaporte
// Visível apenas para usuários com isAdmin=true.
// Mostra: passaportes ativos/expirados/consumidos/inativos,
// conversão Premium, agendamentos de outreach, bônus
// expirados vs consumidos.
// ============================================================

import type { Metadata } from 'next'
import { prisma } from '@/lib/prisma'

// Auth (sessão + isAdmin) é validada no layout /admin/layout.tsx
export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Passaporte · Admin' }

// ─── Queries (todas em paralelo) ────────────────────────────

async function loadMetrics() {
  const [
    statusGroups,
    totalReports,
    totalUnlocks,
    unlocksRevenue,
    outreachGroups,
    bonusConsumed,
    bonusExpired,
    grantsRecent,
    upcomingExpirations,
    failingOutreach,
  ] = await Promise.all([
    prisma.creditBalance.groupBy({
      by: ['passportStatus'],
      _count: { _all: true },
    }),
    prisma.report.count(),
    prisma.reportUnlock.count(),
    prisma.reportUnlock.aggregate({ _sum: { amountBrl: true } }),
    prisma.scheduledOutreach.groupBy({
      by: ['status'],
      _count: { _all: true },
    }),
    prisma.creditTransaction.aggregate({
      _sum: { amount: true },
      where: { type: 'DEBIT', source: 'BONUS' },
    }),
    prisma.creditTransaction.aggregate({
      _sum: { amount: true },
      where: { type: 'EXPIRE' },
    }),
    prisma.bonusGrant.findMany({
      orderBy: { grantedAt: 'desc' },
      take: 10,
      select: {
        id: true,
        source: true,
        amount: true,
        remaining: true,
        grantedAt: true,
        expiresAt: true,
        expiredAt: true,
        company: { select: { name: true, email: true } },
      },
    }),
    prisma.bonusGrant.findMany({
      where: {
        remaining: { gt: 0 },
        expiresAt: { gt: new Date(), lte: new Date(Date.now() + 48 * 60 * 60 * 1000) },
      },
      orderBy: { expiresAt: 'asc' },
      take: 10,
      select: {
        id: true,
        amount: true,
        remaining: true,
        expiresAt: true,
        company: { select: { name: true, email: true } },
      },
    }),
    prisma.scheduledOutreach.findMany({
      where: { status: 'FAILED' },
      orderBy: { createdAt: 'desc' },
      take: 8,
      select: {
        id: true,
        type: true,
        scheduledFor: true,
        attempts: true,
        errorMsg: true,
        company: { select: { name: true, email: true } },
      },
    }),
  ])

  const status = {
    ACTIVE:    0,
    EXPIRED:   0,
    CONSUMED:  0,
    INACTIVE:  0,
  } as Record<string, number>
  for (const g of statusGroups) status[g.passportStatus] = g._count._all

  const outreach = {
    PENDING:  0,
    SENT:     0,
    FAILED:   0,
    CANCELED: 0,
  } as Record<string, number>
  for (const g of outreachGroups) outreach[g.status] = g._count._all

  const conversionRate = totalReports > 0
    ? (totalUnlocks / totalReports) * 100
    : 0

  return {
    status,
    totalReports,
    totalUnlocks,
    unlocksRevenueBrl: unlocksRevenue._sum.amountBrl ?? 0,
    conversionRate,
    outreach,
    bonusConsumedTotal: Math.abs(bonusConsumed._sum.amount ?? 0),
    bonusExpiredTotal:  Math.abs(bonusExpired._sum.amount  ?? 0),
    grantsRecent,
    upcomingExpirations,
    failingOutreach,
  }
}

// ─── Helpers ────────────────────────────────────────────────

function fmtBrl(cents: number): string {
  return (cents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function fmtDateTime(d: Date): string {
  return new Date(d).toLocaleString('pt-BR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

function fmtDate(d: Date): string {
  return new Date(d).toLocaleDateString('pt-BR', {
    day: '2-digit', month: 'short', year: 'numeric',
  })
}

function fmtRelative(d: Date): string {
  const diffMs = new Date(d).getTime() - Date.now()
  const hours = Math.round(diffMs / (1000 * 60 * 60))
  if (Math.abs(hours) < 24) return `${hours > 0 ? 'em' : 'há'} ${Math.abs(hours)}h`
  const days = Math.round(hours / 24)
  return `${days > 0 ? 'em' : 'há'} ${Math.abs(days)} dia${Math.abs(days) > 1 ? 's' : ''}`
}

// ─── UI Components ──────────────────────────────────────────

function MetricCard({
  label, value, sub, tone = 'neutral',
}: {
  label: string
  value: string | number
  sub?: string
  tone?: 'neutral' | 'positive' | 'warning' | 'danger'
}) {
  const toneClass = {
    neutral:  'border-soul-mist/60 bg-white',
    positive: 'border-emerald-200 bg-emerald-50',
    warning:  'border-amber-200 bg-amber-50',
    danger:   'border-rose-200 bg-rose-50',
  }[tone]

  return (
    <div className={`rounded-3xl p-5 border ${toneClass}`}>
      <p className="text-[11px] font-bold uppercase tracking-widest text-soul-ink/55">{label}</p>
      <p className="font-serif text-3xl font-semibold text-soul-ink mt-2 leading-none">{value}</p>
      {sub && <p className="text-[12px] text-soul-ink/65 font-medium mt-2">{sub}</p>}
    </div>
  )
}

function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-3">
      <h2 className="font-serif text-xl font-semibold text-soul-ink">{title}</h2>
      {subtitle && <p className="text-[13px] text-soul-ink/65 font-medium">{subtitle}</p>}
    </div>
  )
}

// ─── Page ───────────────────────────────────────────────────

export default async function AdminPassaportePage() {
  const m = await loadMetrics()

  const totalPassaportes =
    m.status.ACTIVE + m.status.EXPIRED + m.status.CONSUMED + m.status.INACTIVE
  const activePct = totalPassaportes > 0
    ? (m.status.ACTIVE / totalPassaportes) * 100
    : 0

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <span className="inline-block text-[11px] font-bold uppercase tracking-[0.18em] px-3 py-1 rounded-full mb-3"
              style={{ background: 'rgba(196,99,58,0.15)', color: '#a8522e' }}>
          Admin · Passaporte
        </span>
        <h1 className="font-serif font-semibold text-3xl md:text-4xl text-soul-ink leading-tight">
          Dashboard do <span className="text-soul-terracota italic font-normal">Passaporte de Autoconhecimento</span>
        </h1>
        <p className="text-[14px] text-soul-ink/75 mt-2 font-medium max-w-3xl">
          Saúde do funil de bônus, conversão Premium e agendamentos de outreach.
        </p>
      </div>

      {/* Bloco 1: Status dos passaportes */}
      <section>
        <SectionHeading
          title="Status dos passaportes"
          subtitle={`${totalPassaportes.toLocaleString('pt-BR')} contas com saldo bônus já registrado.`}
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <MetricCard
            label="Ativos"
            value={m.status.ACTIVE.toLocaleString('pt-BR')}
            sub={`${activePct.toFixed(1)}% do total`}
            tone="positive"
          />
          <MetricCard
            label="Expirados"
            value={m.status.EXPIRED.toLocaleString('pt-BR')}
            sub="passaporte venceu sem uso"
            tone="warning"
          />
          <MetricCard
            label="Consumidos"
            value={m.status.CONSUMED.toLocaleString('pt-BR')}
            sub="zerou tudo antes do prazo"
            tone="positive"
          />
          <MetricCard
            label="Inativos"
            value={m.status.INACTIVE.toLocaleString('pt-BR')}
            sub="nunca recebeu bônus"
          />
        </div>
      </section>

      {/* Bloco 2: Conversão Premium */}
      <section>
        <SectionHeading
          title="Conversão Premium"
          subtitle="Quantos relatórios concluídos viraram desbloqueio Premium pago."
        />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <MetricCard
            label="Relatórios gerados"
            value={m.totalReports.toLocaleString('pt-BR')}
            sub="testes concluídos com Report"
          />
          <MetricCard
            label="Premium desbloqueado"
            value={m.totalUnlocks.toLocaleString('pt-BR')}
            sub="ReportUnlock total"
            tone="positive"
          />
          <MetricCard
            label="Taxa de conversão"
            value={`${m.conversionRate.toFixed(1)}%`}
            sub="unlocks / relatórios"
            tone={m.conversionRate >= 5 ? 'positive' : 'warning'}
          />
          <MetricCard
            label="Receita Premium"
            value={fmtBrl(m.unlocksRevenueBrl)}
            sub="soma de unlocks pagos"
            tone="positive"
          />
        </div>
      </section>

      {/* Bloco 3: Bônus consumidos vs expirados */}
      <section>
        <SectionHeading
          title="Eficiência dos bônus"
          subtitle="Quanto crédito de Passaporte foi efetivamente usado vs perdido por expiração."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MetricCard
            label="Créditos consumidos"
            value={m.bonusConsumedTotal.toLocaleString('pt-BR')}
            sub="usados em testes"
            tone="positive"
          />
          <MetricCard
            label="Créditos expirados"
            value={m.bonusExpiredTotal.toLocaleString('pt-BR')}
            sub="perdidos no vencimento"
            tone="danger"
          />
          <MetricCard
            label="Taxa de aproveitamento"
            value={
              m.bonusConsumedTotal + m.bonusExpiredTotal > 0
                ? `${((m.bonusConsumedTotal / (m.bonusConsumedTotal + m.bonusExpiredTotal)) * 100).toFixed(1)}%`
                : '—'
            }
            sub="consumidos / total liberado"
            tone="warning"
          />
        </div>
      </section>

      {/* Bloco 4: Outreach (ManyChat) */}
      <section>
        <SectionHeading
          title="Outreach agendado (ManyChat)"
          subtitle="Reengajamento automático quando o passaporte expira ou zera."
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <MetricCard
            label="Pendentes"
            value={m.outreach.PENDING.toLocaleString('pt-BR')}
            sub="aguardando o gatilho"
          />
          <MetricCard
            label="Enviados"
            value={m.outreach.SENT.toLocaleString('pt-BR')}
            sub="entregues com sucesso"
            tone="positive"
          />
          <MetricCard
            label="Falhos"
            value={m.outreach.FAILED.toLocaleString('pt-BR')}
            sub="precisam de retry/atenção"
            tone={m.outreach.FAILED > 0 ? 'danger' : 'neutral'}
          />
          <MetricCard
            label="Cancelados"
            value={m.outreach.CANCELED.toLocaleString('pt-BR')}
            sub="usuário converteu antes"
          />
        </div>
      </section>

      {/* Bloco 5: Bônus prestes a expirar (próx 48h) */}
      {m.upcomingExpirations.length > 0 && (
        <section>
          <SectionHeading
            title="Vencendo nas próximas 48h"
            subtitle="Bônus com saldo > 0 que vão expirar em breve. Bom alvo de outreach manual."
          />
          <div className="rounded-3xl border border-soul-mist/60 bg-white overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-soul-mist/40 text-soul-ink/65 text-[11px] font-bold uppercase tracking-wider">
                <tr>
                  <th className="text-left px-5 py-3">Empresa</th>
                  <th className="text-left px-5 py-3">Email</th>
                  <th className="text-right px-5 py-3">Saldo</th>
                  <th className="text-right px-5 py-3">Expira em</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-soul-mist/40">
                {m.upcomingExpirations.map((g) => (
                  <tr key={g.id}>
                    <td className="px-5 py-3 font-medium text-soul-ink">{g.company.name}</td>
                    <td className="px-5 py-3 text-soul-ink/70">{g.company.email}</td>
                    <td className="px-5 py-3 text-right font-semibold text-soul-ink">
                      {g.remaining}/{g.amount}
                    </td>
                    <td className="px-5 py-3 text-right text-soul-ink/80">
                      {fmtRelative(g.expiresAt)} · {fmtDateTime(g.expiresAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Bloco 6: Outreach com falha */}
      {m.failingOutreach.length > 0 && (
        <section>
          <SectionHeading
            title="Outreach com falha"
            subtitle="Mensagens ManyChat que não chegaram. Verificar tag, externalId e payload."
          />
          <div className="rounded-3xl border border-rose-200 bg-rose-50/50 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-rose-100/60 text-rose-900/80 text-[11px] font-bold uppercase tracking-wider">
                <tr>
                  <th className="text-left px-5 py-3">Empresa</th>
                  <th className="text-left px-5 py-3">Tipo</th>
                  <th className="text-right px-5 py-3">Tentativas</th>
                  <th className="text-left px-5 py-3">Erro</th>
                  <th className="text-right px-5 py-3">Agendado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rose-200/60">
                {m.failingOutreach.map((o) => (
                  <tr key={o.id}>
                    <td className="px-5 py-3">
                      <p className="font-medium text-soul-ink">{o.company.name}</p>
                      <p className="text-[12px] text-soul-ink/60">{o.company.email}</p>
                    </td>
                    <td className="px-5 py-3 font-mono text-[12px] text-rose-900">{o.type}</td>
                    <td className="px-5 py-3 text-right font-semibold">{o.attempts}</td>
                    <td className="px-5 py-3 text-[12px] text-rose-900/85 max-w-md truncate">
                      {o.errorMsg ?? '—'}
                    </td>
                    <td className="px-5 py-3 text-right text-soul-ink/70 text-[12px]">
                      {fmtDateTime(o.scheduledFor)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Bloco 7: Concessões recentes */}
      <section>
        <SectionHeading
          title="Últimas concessões de bônus"
          subtitle="Quem ganhou crédito de Passaporte mais recentemente."
        />
        <div className="rounded-3xl border border-soul-mist/60 bg-white overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-soul-mist/40 text-soul-ink/65 text-[11px] font-bold uppercase tracking-wider">
              <tr>
                <th className="text-left px-5 py-3">Empresa</th>
                <th className="text-left px-5 py-3">Origem</th>
                <th className="text-right px-5 py-3">Quantidade</th>
                <th className="text-right px-5 py-3">Restante</th>
                <th className="text-right px-5 py-3">Concedido</th>
                <th className="text-right px-5 py-3">Expira</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-soul-mist/40">
              {m.grantsRecent.map((g) => (
                <tr key={g.id}>
                  <td className="px-5 py-3">
                    <p className="font-medium text-soul-ink">{g.company.name}</p>
                    <p className="text-[12px] text-soul-ink/60">{g.company.email}</p>
                  </td>
                  <td className="px-5 py-3 font-mono text-[12px] text-soul-ink/80">{g.source}</td>
                  <td className="px-5 py-3 text-right font-semibold text-soul-ink">{g.amount}</td>
                  <td className="px-5 py-3 text-right text-soul-ink/80">{g.remaining}</td>
                  <td className="px-5 py-3 text-right text-soul-ink/70 text-[12px]">{fmtDate(g.grantedAt)}</td>
                  <td className="px-5 py-3 text-right text-soul-ink/70 text-[12px]">
                    {g.expiredAt
                      ? <span className="text-rose-700">expirado</span>
                      : fmtDate(g.expiresAt)}
                  </td>
                </tr>
              ))}
              {m.grantsRecent.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-8 text-center text-soul-ink/55 text-[13px]">
                    Nenhuma concessão registrada ainda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <div className="text-[12px] text-soul-ink/50 italic pt-2">
        Atualizado a cada carregamento. Página dinâmica — sem cache.
      </div>
    </div>
  )
}
