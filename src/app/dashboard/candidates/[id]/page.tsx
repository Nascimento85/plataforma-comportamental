// ============================================================
// /dashboard/candidates/[id]
// Página de perfil do candidato com Devolutiva Integrada (Frente B)
// ============================================================

import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getSession } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import IntegratedReportClient from './IntegratedReportClient'
import { TEST_LABELS } from '@/lib/integrated-report/adapters'
import type { SupportedTestType } from '@/lib/integrated-report/types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prismaAny = prisma as any

export const metadata: Metadata = { title: 'Candidato — Devolutiva Integrada' }

const DEPTH_LABEL: Record<string, string> = {
  BASIC:     'Síntese Inicial',
  SYNTHETIC: 'Perfil Sintético',
  EXECUTIVE: 'Devolutiva Executiva',
  PREMIUM:   'Mapa Premium',
}

const STATUS_BADGE: Record<string, { label: string; bg: string; color: string }> = {
  PENDING:    { label: 'Pendente',  bg: 'rgba(212,148,58,0.18)', color: '#8a5c1e' },
  SENT:       { label: 'Enviado',   bg: 'rgba(61,79,124,0.18)',  color: '#2d3f6b' },
  COMPLETED:  { label: 'Concluído', bg: 'rgba(122,158,126,0.22)', color: '#4a7a4e' },
  EXPIRED:    { label: 'Expirado',  bg: 'rgba(196,122,114,0.18)', color: '#8a4a42' },
  GENERATING: { label: 'Gerando…',  bg: 'rgba(61,79,124,0.18)',  color: '#2d3f6b' },
  FAILED:     { label: 'Falhou',    bg: 'rgba(196,122,114,0.18)', color: '#8a4a42' },
}

export default async function CandidateDetailPage({ params }: { params: { id: string } }) {
  const session = await getSession()
  if (!session?.id) redirect('/login')

  const employee = await prisma.employee.findUnique({
    where:   { id: params.id },
    include: {
      assessments: {
        orderBy: { createdAt: 'desc' },
        include: { result: { select: { id: true, primaryProfile: true } } },
      },
    },
  })

  if (!employee || employee.companyId !== session.id) notFound()

  const integrated = await prismaAny.employeeIntegratedReport.findUnique({
    where: { companyId_employeeId: { companyId: session.id, employeeId: employee.id } },
  })

  const completedCount = employee.assessments.filter(a => a.status === 'COMPLETED').length

  const includedTests: SupportedTestType[] = integrated?.includedTests
    ? JSON.parse(integrated.includedTests)
    : []

  const content = integrated?.content ? JSON.parse(integrated.content) : null

  return (
    <div className="space-y-6">
      <div>
        <Link href="/dashboard/candidates" className="text-[13px] font-semibold text-soul-terracota hover:underline">
          ← Candidatos
        </Link>
        <h1 className="font-serif font-semibold text-4xl text-soul-ink leading-tight mt-2">
          {employee.name}
        </h1>
        <p className="text-[15px] text-soul-ink/70 font-medium mt-1">{employee.email}</p>
      </div>

      <section className="soul-panel">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-soul-terracota mb-1">
              Devolutiva Integrada
            </p>
            <h2 className="font-serif font-semibold text-2xl text-soul-ink leading-tight">
              {integrated && integrated.status === 'COMPLETED'
                ? (content?.sections as { titulo?: string })?.titulo ?? 'Relatório pronto'
                : 'Aguardando dados suficientes'}
            </h2>
            {integrated && (
              <div className="flex items-center gap-3 mt-2 flex-wrap">
                <span
                  className="inline-flex items-center rounded-full px-3 py-1 text-[12px] font-bold"
                  style={{
                    background: STATUS_BADGE[integrated.status]?.bg ?? 'rgba(0,0,0,0.08)',
                    color:      STATUS_BADGE[integrated.status]?.color ?? '#1c1a17',
                  }}
                >
                  {STATUS_BADGE[integrated.status]?.label ?? integrated.status}
                </span>
                <span className="text-[13px] text-soul-ink/70 font-semibold">
                  Profundidade: <strong>{DEPTH_LABEL[integrated.depth] ?? integrated.depth}</strong>
                </span>
                <span className="text-[13px] text-soul-ink/70 font-semibold">
                  Baseado em <strong>{integrated.testCount}</strong> testes
                </span>
              </div>
            )}
          </div>

          <IntegratedReportClient employeeId={employee.id} />
        </div>

        {!integrated && (
          <p className="text-[15px] text-soul-ink/80 font-medium">
            Esta pessoa ainda não tem uma devolutiva integrada.
            {completedCount < 2
              ? ` Precisa concluir pelo menos 2 testes (hoje tem ${completedCount}).`
              : ' Use o botão "Gerar" acima para começar.'}
          </p>
        )}

        {integrated?.status === 'GENERATING' && (
          <p className="text-[15px] text-soul-ink/80 font-medium animate-pulse">
            Gerando a devolutiva integrada via IA…
          </p>
        )}

        {integrated?.status === 'FAILED' && (
          <p className="text-[15px] font-medium" style={{ color: '#8a4a42' }}>
            A última tentativa falhou. Use o botão acima para tentar de novo.
          </p>
        )}

        {integrated?.status === 'COMPLETED' && content && (
          <div className="space-y-5">
            <div className="flex flex-wrap gap-2">
              {includedTests.map((t) => (
                <span key={t} className="inline-flex items-center rounded-full px-3 py-1 text-[12px] font-semibold"
                      style={{ background: 'rgba(196,99,58,0.10)', color: '#e09070' }}>
                  {TEST_LABELS[t] ?? t}
                </span>
              ))}
            </div>

            <ContentRenderer sections={content.sections as Record<string, unknown>} />
          </div>
        )}
      </section>

      <section className="soul-panel">
        <h3 className="font-serif font-semibold text-xl text-soul-ink mb-3">Testes realizados</h3>
        {employee.assessments.length === 0 ? (
          <p className="text-[14px] text-soul-ink/70 font-medium">Nenhum teste enviado ainda.</p>
        ) : (
          <div className="space-y-2">
            {employee.assessments.map((a) => (
              <div key={a.id} className="flex items-center justify-between gap-3 py-2 border-b border-soul-mist/60 last:border-0">
                <div>
                  <p className="text-[14px] font-semibold text-soul-ink">{a.testType}</p>
                  <p className="text-[12px] text-soul-ink/65 font-medium">
                    {new Date(a.createdAt).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className="inline-flex items-center rounded-full px-3 py-1 text-[12px] font-bold"
                    style={{
                      background: STATUS_BADGE[a.status]?.bg ?? 'rgba(0,0,0,0.08)',
                      color:      STATUS_BADGE[a.status]?.color ?? '#1c1a17',
                    }}
                  >
                    {STATUS_BADGE[a.status]?.label ?? a.status}
                  </span>
                  {a.status === 'COMPLETED' && (
                    <Link href={`/dashboard/assessments/${a.id}`} className="text-[13px] font-bold text-soul-terracota hover:underline">
                      Ver devolutiva →
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

function ContentRenderer({ sections }: { sections: Record<string, unknown> }) {
  return (
    <div className="space-y-6">
      {Object.entries(sections).map(([key, value]) => {
        if (key === 'titulo') return null
        return <SectionBlock key={key} sectionKey={key} value={value} />
      })}
    </div>
  )
}

const SECTION_TITLES: Record<string, string> = {
  sintese:                       'Síntese',
  perfil_sintese:                'Perfil — Síntese',
  convergencia_principal:        'Convergência Principal',
  convergencias:                 'Convergências',
  ponto_de_atencao:              'Ponto de Atenção',
  tensoes_internas:              'Tensões Internas',
  tensoes_criativas:             'Tensões Criativas',
  tres_dimensoes:                'Três Dimensões',
  aplicacao_pratica:             'Aplicação Prática',
  aplicacao_profissional:        'Aplicação Profissional',
  leitura_estrategica_corporativa: 'Leitura Estratégica Corporativa',
  leitura_humana:                'Leitura Humana',
  plano_de_desenvolvimento:      'Plano de Desenvolvimento',
  proximo_passo:                 'Próximo Passo',
  manifesto_final:               'Manifesto',
}

function SectionBlock({ sectionKey, value }: { sectionKey: string; value: unknown }) {
  const title = SECTION_TITLES[sectionKey] ?? prettify(sectionKey)

  if (typeof value === 'string') {
    return (
      <div>
        <h4 className="font-serif font-semibold text-lg text-soul-ink mb-2">{title}</h4>
        <p className="text-[15px] text-soul-ink/90 font-medium leading-relaxed whitespace-pre-line">{value}</p>
      </div>
    )
  }

  if (value && typeof value === 'object' && !Array.isArray(value)) {
    const obj = value as Record<string, unknown>

    if (Array.isArray(obj.itens)) {
      return (
        <div>
          <h4 className="font-serif font-semibold text-lg text-soul-ink mb-2">
            {(obj.titulo as string) ?? title}
          </h4>
          <div className="space-y-3">
            {(obj.itens as Array<Record<string, unknown>>).map((item, i) => (
              <div key={i} className="rounded-2xl px-4 py-3" style={{ background: 'rgba(196,99,58,0.06)' }}>
                {!!item.tema && (
                  <p className="text-[14px] font-bold text-soul-ink mb-1">{String(item.tema)}</p>
                )}
                {!!item.descricao && (
                  <p className="text-[14px] text-soul-ink/85 font-medium leading-relaxed">{String(item.descricao)}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )
    }

    if (Array.isArray(obj.acoes)) {
      return (
        <div>
          <h4 className="font-serif font-semibold text-lg text-soul-ink mb-2">
            {(obj.titulo as string) ?? title}
          </h4>
          <ol className="space-y-2 list-none">
            {(obj.acoes as Array<Record<string, unknown>>).map((acao, i) => (
              <li key={i} className="rounded-2xl px-4 py-3 flex gap-3 items-start"
                  style={{ background: 'rgba(122,158,126,0.10)' }}>
                <span className="w-6 h-6 rounded-full text-white text-[12px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: '#7a9e7e' }}>
                  {(acao.prioridade as number) ?? i + 1}
                </span>
                <div>
                  {!!acao.area && (
                    <p className="text-[12px] font-bold uppercase tracking-widest text-soul-ink/70 mb-0.5">
                      {String(acao.area)}
                    </p>
                  )}
                  <p className="text-[14px] text-soul-ink font-semibold leading-snug">
                    {String(acao.acao ?? '')}
                  </p>
                  {!!acao.porque && (
                    <p className="text-[13px] text-soul-ink/75 font-medium mt-1 leading-snug italic">
                      {String(acao.porque)}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      )
    }

    return (
      <div>
        <h4 className="font-serif font-semibold text-lg text-soul-ink mb-2">
          {(obj.titulo as string) ?? title}
        </h4>
        <div className="space-y-3">
          {Object.entries(obj).map(([k, v]) => {
            if (k === 'titulo') return null
            if (typeof v === 'string') {
              return (
                <div key={k}>
                  <p className="text-[12px] font-bold uppercase tracking-widest text-soul-ink/70 mb-1">
                    {prettify(k)}
                  </p>
                  <p className="text-[14px] text-soul-ink/90 font-medium leading-relaxed whitespace-pre-line">{v}</p>
                </div>
              )
            }
            if (v && typeof v === 'object') {
              const sub = v as Record<string, unknown>
              return (
                <div key={k}>
                  <p className="text-[12px] font-bold uppercase tracking-widest text-soul-ink/70 mb-1">
                    {(sub.titulo as string) ?? prettify(k)}
                  </p>
                  {typeof sub.descricao === 'string' && (
                    <p className="text-[14px] text-soul-ink/90 font-medium leading-relaxed whitespace-pre-line">{sub.descricao}</p>
                  )}
                </div>
              )
            }
            return null
          })}
        </div>
      </div>
    )
  }

  return null
}

function prettify(s: string): string {
  return s.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}
