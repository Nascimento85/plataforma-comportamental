// ============================================================
// /dashboard/gestao-times/[id]/devolutiva/[memberId]
// Copiloto de devolutiva: guia de tom + gargalos + ações por perfil,
// SCI editável, criação de PDI, timeline de check-ins e botão de IA.
// ============================================================

import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { getSession } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import { hasActiveSubscription } from '@/lib/subscription/check'
import {
  ZONAS, PERFIS_LIDERANCA, classificarZona,
  type ZonaKey, type DiscKey,
} from '@/content/gestao-times/disc-lideranca'
import { lerResultado } from '@/content/gestao-times/avaliacao-criterios'
import PdiClient from './PdiClient'

export const metadata: Metadata = { title: 'Preparar Devolutiva · Psique' }
export const dynamic = 'force-dynamic'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prismaAny = prisma as any

export default async function DevolutivaPage({ params }: { params: { id: string; memberId: string } }) {
  const session = await getSession()
  if (!session?.id) redirect('/login')
  const subscriptionOk = await hasActiveSubscription(session.id)
  if (!session.isAdmin && !subscriptionOk) redirect('/dashboard/gestao-times')

  const member = await prismaAny.talentMember.findUnique({ where: { id: params.memberId } })
  if (!member || member.companyId !== session.id || member.teamId !== params.id) return notFound()

  const zonaKey = (member.zonaManual && member.zona ? member.zona : classificarZona(member.notaPerformance, member.fitComportamental)) as ZonaKey | null
  const zona = zonaKey ? ZONAS[zonaKey] : null
  const perfil = member.perfilDisc ? PERFIS_LIDERANCA[member.perfilDisc as DiscKey] : null
  const leitura = lerResultado(zonaKey, member.potencial ?? 0)

  // PDI ativo mais recente + check-ins
  const pdiRaw = await prismaAny.talentPDI.findFirst({
    where: { memberId: member.id, companyId: session.id, status: { not: 'ARQUIVADO' } },
    orderBy: { createdAt: 'desc' },
    include: { checkIns: { orderBy: { createdAt: 'desc' } } },
  })

  const pdi = pdiRaw ? {
    id: pdiRaw.id,
    sciSituacao: pdiRaw.sciSituacao ?? '',
    sciComportamento: pdiRaw.sciComportamento ?? '',
    sciImpacto: pdiRaw.sciImpacto ?? '',
    acoes: pdiRaw.acoes ? (JSON.parse(pdiRaw.acoes) as string[]) : [],
    prazo: pdiRaw.prazo ? new Date(pdiRaw.prazo).toISOString().slice(0, 10) : '',
    frequencia: pdiRaw.frequencia ?? '',
    status: pdiRaw.status as string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    checkIns: (pdiRaw.checkIns as any[]).map((c) => ({
      id: c.id, nota: c.nota, statusMeta: c.statusMeta, tendencia: c.tendencia,
      createdAt: new Date(c.createdAt).toISOString(),
    })),
  } : null

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="rounded-3xl p-6 relative overflow-hidden"
           style={{ background: 'linear-gradient(135deg, #1f2a3d 0%, #2b2b30 100%)' }}>
        <Link href={`/dashboard/gestao-times/${params.id}`} className="text-[13.5px] font-semibold text-white/75 hover:text-white/90 no-underline">
          ← Voltar para a matriz
        </Link>
        <div className="flex items-center gap-4 mt-3">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-xl font-bold flex-shrink-0"
               style={{ background: perfil?.cor ?? '#94a3b8' }}>
            {member.nome.split(' ').slice(0, 2).map((s: string) => s[0]).join('').toUpperCase()}
          </div>
          <div>
            <h1 className="font-serif text-2xl md:text-3xl font-semibold text-white leading-tight">{member.nome}</h1>
            <p className="text-[14px] text-white/80 font-medium mt-0.5">
              {member.cargo ? `${member.cargo} · ` : ''}
              {perfil ? `${perfil.apelido} (${member.perfilDisc})` : 'Perfil pendente'}
              {zona ? ` · ${zona.rotulo}` : ''}
            </p>
          </div>
        </div>
      </div>

      {!perfil ? (
        <div className="soul-panel text-center py-8">
          <p className="text-[15px] text-soul-ink/80 font-medium">
            Este colaborador ainda não tem perfil DISC definido. Aplique o teste DISC ou informe o perfil
            na matriz para liberar o roteiro de devolutiva personalizado.
          </p>
        </div>
      ) : (
        <>
          {/* Zona + ação estratégica */}
          {zona && (
            <div className="soul-panel" style={{ borderLeft: `4px solid ${zona.cor}` }}>
              <p className="text-[13px] font-bold uppercase tracking-widest" style={{ color: zona.cor }}>{zona.rotulo} · {zona.faixa}</p>
              <p className="text-[15px] text-soul-ink/90 font-medium mt-1 leading-relaxed">{zona.descricao}</p>
              <p className="text-[14px] text-soul-ink/80 font-medium mt-2"><strong>Ação estratégica:</strong> {zona.acaoEstrategica}</p>
              {/* Notas da avaliação */}
              {(member.notaPerformance != null || member.potencial != null) && (
                <div className="flex gap-4 mt-3 pt-3 border-t border-soul-mist/60 text-[13.5px] font-bold">
                  {member.notaPerformance != null && <span style={{ color: '#e09070' }}>Performance {member.notaPerformance.toFixed(1)}</span>}
                  {member.fitComportamental != null && <span style={{ color: '#8fa6da' }}>Fit {member.fitComportamental.toFixed(1)}</span>}
                  {member.potencial != null && member.potencial > 0 && <span style={{ color: '#c9a84c' }}>Potencial {member.potencial.toFixed(1)}</span>}
                </div>
              )}
            </div>
          )}

          {/* Leitura do resultado: validação / desenvolvimento / diagnóstico */}
          {leitura && (
            <div className="soul-panel" style={{
              background: leitura.tom === 'VALIDACAO' ? 'rgba(201,168,76,0.08)' : leitura.tom === 'DIAGNOSTICO' ? 'rgba(196,122,114,0.07)' : 'rgba(61,79,124,0.05)',
              border: `1px solid ${leitura.tom === 'VALIDACAO' ? 'rgba(201,168,76,0.35)' : leitura.tom === 'DIAGNOSTICO' ? 'rgba(196,122,114,0.35)' : 'rgba(61,79,124,0.25)'}`,
            }}>
              <p className="text-[13px] font-bold uppercase tracking-widest mb-1"
                 style={{ color: leitura.tom === 'VALIDACAO' ? '#7a5f17' : leitura.tom === 'DIAGNOSTICO' ? '#7a3d35' : '#3d4f7c' }}>
                {leitura.tom === 'VALIDACAO' ? '✦ Validação' : leitura.tom === 'DIAGNOSTICO' ? '⚠ Diagnóstico' : '↗ Desenvolvimento'} · {leitura.titulo}
              </p>
              <p className="font-serif text-lg font-semibold text-soul-ink leading-snug">{leitura.veredito}</p>
              <p className="text-[14.5px] text-soul-ink/88 font-medium mt-2 leading-relaxed">{leitura.diagnostico}</p>
              <p className="text-[13.5px] font-bold uppercase tracking-wide text-soul-ink/78 mt-4 mb-2">Próximos passos</p>
              <ul className="space-y-1.5">
                {leitura.proximosPassos.map((p, i) => (
                  <li key={i} className="flex items-start gap-2 text-[14.5px] text-soul-ink/90 font-medium">
                    <span className="font-bold mt-0.5" style={{ color: zona?.cor ?? '#c4633a' }}>{i + 1}.</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Guia de tom */}
          <div className="soul-panel">
            <h2 className="font-serif text-xl font-semibold text-soul-ink mb-3">Guia de tom para a conversa</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-2xl p-4" style={{ background: 'rgba(122,158,126,0.10)', border: '1px solid rgba(122,158,126,0.30)' }}>
                <p className="text-[13px] font-bold uppercase tracking-wide mb-1" style={{ color: '#a9d3a9' }}>Priorize</p>
                <p className="text-[14.5px] text-soul-ink/90 font-medium leading-relaxed">{perfil.tom.priorizar}</p>
              </div>
              <div className="rounded-2xl p-4" style={{ background: 'rgba(196,122,114,0.10)', border: '1px solid rgba(196,122,114,0.30)' }}>
                <p className="text-[13px] font-bold uppercase tracking-wide mb-1" style={{ color: '#f0a892' }}>Evite</p>
                <p className="text-[14.5px] text-soul-ink/90 font-medium leading-relaxed">{perfil.tom.evitar}</p>
              </div>
            </div>
          </div>

          {/* Gargalos típicos */}
          <div className="soul-panel">
            <h2 className="font-serif text-xl font-semibold text-soul-ink mb-3">Onde o perfil {perfil.apelido} costuma travar</h2>
            <ul className="space-y-2">
              {perfil.gargalos.map((g, i) => (
                <li key={i} className="flex items-start gap-2 text-[15px] text-soul-ink/90 font-medium">
                  <span className="mt-1 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 text-white text-[12px] font-bold" style={{ background: perfil.cor }}>!</span>
                  {g}
                </li>
              ))}
            </ul>
          </div>

          {/* SCI editável + PDI + Timeline + IA (client) */}
          <PdiClient
            memberId={member.id}
            perfilCor={perfil.cor}
            perfilApelido={perfil.apelido}
            acoesSugeridas={perfil.acoesPdi}
            pdi={pdi}
            aiInicial={member.aiDevolutiva ?? ''}
            aiInicialEm={member.aiDevolutivaEm ? new Date(member.aiDevolutivaEm).toISOString() : ''}
          />
        </>
      )}
    </div>
  )
}
