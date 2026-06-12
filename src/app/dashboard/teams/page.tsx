// ============================================================
// /dashboard/teams — Equipes & Setores
// Importação de colaboradores por setor + visão dos times.
// Cada setor é um TalentTeam: importar aqui alimenta a Gestão
// de Times (matriz, Team Build e Avaliação do Líder).
// ============================================================

import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import { hasActiveSubscription } from '@/lib/subscription/check'
import ImportClient from './ImportClient'

export const metadata: Metadata = { title: 'Equipes e Setores · Psique' }
export const dynamic = 'force-dynamic'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prismaAny = prisma as any

export default async function TeamsPage() {
  const session = await getSession()
  if (!session?.id) redirect('/login')

  const subscriptionOk = await hasActiveSubscription(session.id)

  const teams = subscriptionOk || session.isAdmin
    ? await prismaAny.talentTeam.findMany({
        where: { companyId: session.id },
        orderBy: { updatedAt: 'desc' },
        include: { _count: { select: { members: true } } },
      }) as Array<{ id: string; nome: string; liderNome: string | null; _count: { members: number } }>
    : []

  return (
    <div className="space-y-7">
      {/* Header */}
      <div>
        <p className="text-[13px] font-bold uppercase tracking-widest mb-2" style={{ color: '#c9a84c' }}>
          Empresa
        </p>
        <h1 className="font-serif font-semibold text-4xl text-soul-ink leading-tight">
          Equipes <span className="text-soul-terracota italic font-normal">&amp;</span> Setores
        </h1>
        <p className="text-[15px] text-soul-ink/85 mt-2 font-medium max-w-3xl">
          Importe colaboradores por departamento e monte a estrutura da empresa em minutos. Cada setor vira um
          time na Gestão de Times, pronto para a matriz 20-70-10, o Team Build e a Avaliação do Líder.
        </p>
      </div>

      {!subscriptionOk && !session.isAdmin ? (
        <div className="rounded-3xl p-8 text-center"
             style={{ background: 'linear-gradient(135deg, #1c1a17 0%, #2d2417 60%, #1f2a3d 100%)' }}>
          <div className="text-5xl mb-4">🔒</div>
          <h2 className="font-serif text-2xl font-semibold text-white mb-2">Recurso exclusivo de assinantes</h2>
          <p className="text-[15.5px] text-white/85 font-medium max-w-lg mx-auto mb-6">
            A importação de colaboradores e a gestão por setores fazem parte dos planos PJ.
            Ative o trial gratuito de 7 dias e libere agora.
          </p>
          <Link href="/dashboard/assinatura"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-bold text-white no-underline shadow-terra"
                style={{ background: 'linear-gradient(135deg, #c4633a, #d4943a)' }}>
            ✦ Começar trial de 7 dias
          </Link>
        </div>
      ) : (
        <>
          {/* Setores existentes */}
          {teams.length > 0 && (
            <div>
              <h2 className="font-serif font-semibold text-2xl text-soul-ink mb-4">Seus setores</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {teams.map((t) => (
                  <Link key={t.id} href={`/dashboard/gestao-times/${t.id}`}
                        className="soul-panel block no-underline transition-all hover:-translate-y-0.5"
                        style={{ borderLeft: '4px solid #c9a84c' }}>
                    <p className="font-serif text-xl font-semibold text-soul-ink leading-tight">{t.nome}</p>
                    <p className="text-[13.5px] text-soul-ink/72 font-medium mt-1">
                      {t.liderNome ? `Líder: ${t.liderNome}` : 'Líder não definido'}
                    </p>
                    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-soul-mist/60">
                      <span className="text-[13.5px] font-bold text-soul-ink/88">
                        {t._count.members} {t._count.members === 1 ? 'colaborador' : 'colaboradores'}
                      </span>
                      <span className="ml-auto text-[13.5px] font-semibold" style={{ color: '#c9a84c' }}>
                        Abrir matriz →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <ImportClient />
        </>
      )}
    </div>
  )
}
