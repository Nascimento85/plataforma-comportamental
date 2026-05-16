// ============================================================
// /dashboard/compliance/nr1/[id] — detalhe da coleta
// ============================================================

import type { Metadata } from 'next'
import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { getSession } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import RelatorioClient from './RelatorioClient'
import CopyLinkButton from './CopyLinkButton'
import { MIN_RESPONDENTES_PARA_RELATORIO } from '@/lib/nr1/aggregate'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prismaAny = prisma as any

export const metadata: Metadata = { title: 'Coleta NR-1' }

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

export default async function ColetaDetalhePage({ params }: { params: { id: string } }) {
  const session = await getSession()
  if (!session?.id) redirect('/login')

  const coleta = await prismaAny.nR1Coleta.findFirst({
    where: { id: params.id, companyId: session.id },
    include: { convites: true, respostas: { select: { setorId: true } } },
  })
  if (!coleta) notFound()

  const setores = await prismaAny.nR1Setor.findMany({ where: { companyId: session.id } })
  const relatorio = await prismaAny.nR1Relatorio.findFirst({
    where: { coletaId: params.id, companyId: session.id },
  })

  // Calcula taxa de adesao por setor (sem identificar quem respondeu)
  const respondentesPorSetor = new Map<string, number>()
  for (const r of coleta.respostas as Array<{ setorId: string }>) {
    respondentesPorSetor.set(r.setorId, (respondentesPorSetor.get(r.setorId) ?? 0) + 1)
  }

  const porSetor = setores.map((s: { id: string; nome: string; perfilDiscDominante: string | null }) => {
    const conv = coleta.convites.filter((c: { setorId: string }) => c.setorId === s.id)
    // 1 respondente gera 3 NR1Resposta (KARASEK + ERI + COPSOQ)
    const respCount = Math.floor((respondentesPorSetor.get(s.id) ?? 0) / 3)
    return {
      id: s.id, nome: s.nome, perfilDisc: s.perfilDiscDominante,
      totalConvidados: conv.length,
      totalRespondentes: respCount,
      taxaAdesao: conv.length > 0 ? Math.round((respCount / conv.length) * 100) : 0,
      atingiuMinimo: respCount >= MIN_RESPONDENTES_PARA_RELATORIO,
    }
  }).filter((s: { totalConvidados: number }) => s.totalConvidados > 0)

  const algumSetorAtingiu = porSetor.some((s: { atingiuMinimo: boolean }) => s.atingiuMinimo)

  return (
    <div className="space-y-6">
      <div>
        <Link href="/dashboard/compliance/nr1" className="text-[13px] font-semibold text-soul-terracota hover:underline">
          ← Coletas NR-1
        </Link>
        <h1 className="font-serif font-semibold text-3xl text-soul-ink mt-2 leading-tight">{coleta.nome}</h1>
        <div className="flex flex-wrap items-center gap-3 mt-2">
          <span className="text-[13px] text-soul-ink/70 font-medium">
            Validade: {new Date(coleta.expiresAt).toLocaleDateString('pt-BR')}
          </span>
          <span className="text-[13px] text-soul-ink/70 font-medium">·</span>
          <span className="text-[13px] text-soul-ink/70 font-medium">
            Criado em {new Date(coleta.createdAt).toLocaleDateString('pt-BR')}
          </span>
        </div>
      </div>

      {/* Adesão por setor */}
      <section className="soul-panel">
        <h2 className="font-serif font-semibold text-xl text-soul-ink mb-3">Adesão por setor</h2>
        <p className="text-[13px] text-soul-ink/75 font-medium mb-4">
          Mínimo de <strong>{MIN_RESPONDENTES_PARA_RELATORIO} respondentes</strong> por setor para liberar o relatório.
        </p>
        {porSetor.length === 0 ? (
          <p className="text-[14px] text-soul-ink/70 font-medium">Nenhum setor convidado.</p>
        ) : (
          <div className="space-y-3">
            {porSetor.map((s: { id: string; nome: string; perfilDisc: string | null; totalConvidados: number; totalRespondentes: number; taxaAdesao: number; atingiuMinimo: boolean }) => (
              <div key={s.id} className="rounded-2xl p-4" style={{ background: 'rgba(196,99,58,0.04)', border: '1px solid rgba(196,99,58,0.12)' }}>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div>
                    <p className="font-serif font-semibold text-lg text-soul-ink">{s.nome}</p>
                    {s.perfilDisc && (
                      <p className="text-[12px] text-soul-ink/70 font-semibold">DISC dominante: {s.perfilDisc}</p>
                    )}
                  </div>
                  <span className="inline-flex items-center rounded-full px-3 py-1 text-[12px] font-bold"
                        style={{
                          background: s.atingiuMinimo ? 'rgba(122,158,126,0.22)' : 'rgba(212,148,58,0.18)',
                          color: s.atingiuMinimo ? '#4a7a4e' : '#8a5c1e',
                        }}>
                    {s.atingiuMinimo ? '✓ Pronto p/ relatório' : `Faltam ${MIN_RESPONDENTES_PARA_RELATORIO - s.totalRespondentes}`}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 rounded-full bg-soul-mist overflow-hidden">
                    <div className="h-full rounded-full"
                         style={{ width: `${s.taxaAdesao}%`, background: 'linear-gradient(90deg, #c4633a, #d4943a)' }} />
                  </div>
                  <span className="text-[13px] font-bold text-soul-ink">
                    {s.totalRespondentes}/{s.totalConvidados} · {s.taxaAdesao}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Convites: lista de links anônimos */}
      <section className="soul-panel">
        <h2 className="font-serif font-semibold text-xl text-soul-ink mb-2">Links anônimos</h2>
        <p className="text-[13px] text-soul-ink/75 font-medium mb-4">
          Envie estes links individualmente. Cada link é único por funcionário; depois de respondido, expira automaticamente.
        </p>
        <div className="space-y-2 max-h-[400px] overflow-y-auto">
          {coleta.convites.map((c: { id: string; nome: string; email: string; token: string; status: string }) => {
            const fullUrl = `${APP_URL}/nr1/${c.token}`
            return (
              <div key={c.id} className="flex flex-wrap items-center gap-3 py-2 border-b border-soul-mist/60 last:border-0">
                <div className="flex-1 min-w-[200px]">
                  <p className="text-[14px] font-semibold text-soul-ink">{c.nome}</p>
                  <p className="text-[12px] text-soul-ink/65 font-medium">{c.email}</p>
                </div>
                <code
                  className="text-[12px] text-soul-ink/70 font-mono truncate max-w-[240px] select-all cursor-text"
                  title={fullUrl}
                >
                  {fullUrl}
                </code>
                <CopyLinkButton url={fullUrl} />
                <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold"
                      style={{
                        background: c.status === 'COMPLETED' ? 'rgba(122,158,126,0.22)' : 'rgba(212,148,58,0.18)',
                        color: c.status === 'COMPLETED' ? '#4a7a4e' : '#8a5c1e',
                      }}>
                  {c.status === 'COMPLETED' ? 'Respondeu' : 'Pendente'}
                </span>
              </div>
            )
          })}
        </div>
      </section>

      {/* Relatório */}
      <RelatorioClient
        coletaId={params.id}
        relatorioExistente={relatorio ? {
          status: relatorio.status,
          content: relatorio.content ? JSON.parse(relatorio.content) : null,
          generatedAt: relatorio.generatedAt.toISOString(),
        } : null}
        algumSetorAtingiu={algumSetorAtingiu}
      />
    </div>
  )
}
