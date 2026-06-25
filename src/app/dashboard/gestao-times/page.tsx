// ============================================================
// /dashboard/gestao-times — landing do módulo Gestão de Equipes
// Lista as equipes do gestor e permite criar novos. Gate premium.
// ============================================================

import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getSession } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import { hasActiveSubscription } from '@/lib/subscription/check'
import NovoTimeButton from './NovoTimeButton'
import ImportClient from './ImportClient'
import DeleteTeamButton from './DeleteTeamButton'
import { agregarRespostasLider, MIN_RESPOSTAS_LIDER } from '@/content/gestao-times/avaliacao-lider'

export const metadata: Metadata = { title: 'Gestão de Equipes · Psique' }
export const dynamic = 'force-dynamic'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prismaAny = prisma as any

export default async function GestaoTimesPage() {
  const session = await getSession()
  if (!session?.id) redirect('/login')

  // Gate premium
  const subscriptionOk = await hasActiveSubscription(session.id)
  if (!session.isAdmin && !subscriptionOk) {
    return (
      <div className="max-w-2xl mx-auto py-10">
        <p className="text-[13px] font-bold uppercase tracking-widest text-soul-terracota mb-3">Recurso premium</p>
        <h1 className="font-serif font-semibold text-3xl text-soul-ink leading-tight mb-4">Gestão de Equipes</h1>
        <p className="text-[15.5px] text-soul-ink/90 font-medium leading-relaxed mb-4">
          Saia da avaliação individual e gerencie a cultura da equipe inteiro. Monte a Matriz de Talentos (modelo 20-70-10
          moderno), conduza devolutivas estruturadas e construa planos de desenvolvimento por perfil comportamental.
        </p>
        <p className="text-[15.5px] text-soul-ink/88 font-medium leading-relaxed mb-6">
          Disponível para empresas com assinatura ativa. Comece um trial de 7 dias gratuitos, sem cartão de crédito.
        </p>
        <Link href="/dashboard/assinatura"
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[15px] font-bold text-white shadow-terra no-underline"
              style={{ background: 'linear-gradient(135deg, #c4633a, #d4943a)' }}>
          ✦ Começar trial de 7 dias
        </Link>
      </div>
    )
  }

  const teams = await prismaAny.talentTeam.findMany({
    where: { companyId: session.id },
    orderBy: { updatedAt: 'desc' },
    include: { _count: { select: { members: true, liderRespostas: true } } },
  }) as Array<{ id: string; nome: string; descricao: string | null; liderNome: string | null; updatedAt: Date; _count: { members: number; liderRespostas: number } }>

  // Resultado agregado da Avaliação do Líder por equipe (libera com n minimo)
  const respostasLider = await prismaAny.liderResposta.findMany({
    where: { companyId: session.id },
    select: { teamId: true, respostas: true },
  }) as Array<{ teamId: string; respostas: string }>
  const respostasPorTime = new Map<string, Array<Record<string, number>>>()
  for (const r of respostasLider) {
    try {
      const parsed = JSON.parse(r.respostas)
      if (!respostasPorTime.has(r.teamId)) respostasPorTime.set(r.teamId, [])
      respostasPorTime.get(r.teamId)!.push(parsed)
    } catch { /* ignora */ }
  }
  const liderResumo = new Map<string, { n: number; score: number; label: string; cor: string } | { n: number }>()
  for (const t of teams) {
    const lista = respostasPorTime.get(t.id) ?? []
    if (lista.length >= MIN_RESPOSTAS_LIDER) {
      const agg = agregarRespostasLider(lista)
      if (agg) { liderResumo.set(t.id, { n: lista.length, score: agg.scoreFinal, label: agg.classificacao, cor: agg.cor }); continue }
    }
    liderResumo.set(t.id, { n: lista.length })
  }

  return (
    <div className="space-y-7">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="text-[13px] font-bold uppercase tracking-widest mb-2" style={{ color: '#c9a84c' }}>
            Gestão de Equipes
          </p>
          <h1 className="font-serif font-semibold text-4xl text-soul-ink leading-tight">
            Gestão de <span className="text-soul-terracota italic font-normal">Equipes</span>
          </h1>
          <p className="text-[15px] text-soul-ink/85 mt-2 font-medium max-w-3xl">
            Monte suas equipes, avalie cada colaborador, descubra quem são as referências e deixe o time avaliar
            a liderança de forma anônima. Tudo em um só lugar, sem cota fria de demissão, foco em desenvolvimento.
          </p>
        </div>
        <NovoTimeButton />
      </div>

      {/* Como funciona: passo a passo simples */}
      <div className="soul-panel">
        <p className="text-[13px] font-bold uppercase tracking-widest mb-4" style={{ color: '#d4b35e' }}>
          Como começar, em 4 passos
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { n: '1', t: 'Crie a equipe', d: 'Clique em Nova equipe e dê o nome do setor (ex: Comercial). Ou importe uma planilha logo abaixo, que as equipes são criadas sozinhas.' },
            { n: '2', t: 'Cadastre os colaboradores', d: 'Importe a planilha com nome, email, cargo e setor, ou adicione um a um dentro da equipe. O email é importante: é por ele que a pessoa recebe os convites.' },
            { n: '3', t: 'Defina o líder', d: 'Dentro da equipe, abra Avaliação do Líder e informe quem é o líder do setor. É ele que a equipe vai avaliar de forma anônima.' },
            { n: '4', t: 'Avalie e acompanhe', d: 'Avalie cada colaborador no botão Avaliar. Ao concluir, o colaborador recebe automaticamente o convite por email para avaliar o líder.' },
          ].map((p) => (
            <div key={p.n} className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <span className="inline-flex w-8 h-8 rounded-full items-center justify-center text-[15px] font-bold mb-2"
                    style={{ background: 'rgba(212,179,94,0.16)', color: '#d4b35e' }}>{p.n}</span>
              <p className="text-[14.5px] font-bold text-soul-ink leading-tight mb-1">{p.t}</p>
              <p className="text-[13px] text-soul-ink/75 font-medium leading-relaxed">{p.d}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Lista de times */}
      {teams.length === 0 ? (
        <div className="rounded-3xl p-8 text-center"
             style={{ background: 'linear-gradient(135deg, #1c1a17 0%, #2d2417 60%, #1f2a3d 100%)' }}>
          <div className="text-5xl mb-4">◫</div>
          <h2 className="font-serif text-2xl font-semibold text-white mb-2">Nenhuma equipe criada ainda</h2>
          <p className="text-[15.5px] text-white/85 font-medium max-w-lg mx-auto mb-6">
            Comece criando seu primeira equipe. Você adiciona os colaboradores (vinculando aos que já fizeram teste ou
            digitando avulsos), dá a nota de performance e a plataforma plota a curva de vitalidade.
          </p>
          <NovoTimeButton variant="onDark" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {teams.map((t) => (
            <div key={t.id} className="relative">
              <DeleteTeamButton teamId={t.id} teamName={t.nome} />
              <Link href={`/dashboard/gestao-times/${t.id}`}
                  className="soul-panel block no-underline transition-all hover:-translate-y-0.5"
                  style={{ borderLeft: '4px solid #c9a84c' }}>
              <p className="font-serif text-xl font-semibold text-soul-ink leading-tight pr-9">{t.nome}</p>
              {t.descricao && (
                <p className="text-[14px] text-soul-ink/80 font-medium mt-1 line-clamp-2">{t.descricao}</p>
              )}
              {(() => {
                const r = liderResumo.get(t.id)
                return (
                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-soul-mist/60 flex-wrap">
                    <span className="text-[13px] font-bold uppercase tracking-wider text-soul-ink/65">Líder</span>
                    {!t.liderNome ? (
                      <span className="text-[13.5px] font-semibold text-soul-ink/65">não definido</span>
                    ) : r && 'label' in r ? (
                      <>
                        <span className="text-[13.5px] font-bold text-soul-ink/88">{t.liderNome}</span>
                        <span className="text-[12.5px] font-bold px-2.5 py-0.5 rounded-full text-white" style={{ background: r.cor }}>
                          {r.label} · {r.score.toFixed(1)}
                        </span>
                        <span className="text-[12.5px] font-semibold text-soul-ink/65">({r.n} respostas)</span>
                      </>
                    ) : (
                      <span className="text-[13.5px] font-semibold text-soul-ink/72">
                        {t.liderNome} · aguardando respostas ({r?.n ?? 0}/{MIN_RESPOSTAS_LIDER})
                      </span>
                    )}
                  </div>
                )
              })()}
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-soul-mist/60">
                <span className="text-[13.5px] font-bold text-soul-ink/88">
                  {t._count.members} {t._count.members === 1 ? 'colaborador' : 'colaboradores'}
                </span>
                <span className="ml-auto text-[13.5px] font-semibold" style={{ color: '#c9a84c' }}>Abrir matriz →</span>
              </div>
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* Importação de colaboradores (unificado da antiga página Times) */}
      <ImportClient />
    </div>
  )
}
