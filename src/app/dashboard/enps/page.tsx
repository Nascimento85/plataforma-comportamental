import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import { hasActiveSubscription } from '@/lib/subscription/check'
import CriarColetaEnps from './CriarColetaEnps'

export const metadata: Metadata = { title: 'eNPS — Pesquisa de Clima' }
export const dynamic = 'force-dynamic'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prismaAny = prisma as any

export default async function EnpsListPage() {
  const session = await getSession()
  if (!session?.id) redirect('/login')
  const companyId = session.id

  // Gate premium (admin isento)
  const subscriptionOk = await hasActiveSubscription(session.id)
  if (!session.isAdmin && !subscriptionOk) {
    return (
      <div className="max-w-2xl mx-auto py-10">
        <p className="text-[13px] font-bold uppercase tracking-widest text-soul-terracota mb-3">Recurso premium</p>
        <h1 className="font-serif font-semibold text-3xl text-soul-ink leading-tight mb-4">eNPS — Pesquisa de Clima</h1>
        <p className="text-[15.5px] text-soul-ink/90 font-medium leading-relaxed mb-4">
          Meça o engajamento e a lealdade do time com uma pergunta simples e 100% anônima. Acompanhe o índice
          de −100 a +100, a leitura por zona e o cruzamento por tempo de casa, para agir onde o clima esfria primeiro.
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

  const coletas = await prismaAny.enpsColeta.findMany({
    where: { companyId },
    orderBy: { createdAt: 'desc' },
    include: { _count: { select: { convites: true, respostas: true } } },
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif font-semibold text-3xl text-soul-ink">eNPS — Pesquisa de Clima</h1>
        <p className="text-sm text-soul-ink/68 mt-1 font-sans max-w-2xl">
          Meça o engajamento e a lealdade do time com uma pergunta simples (0 a 10) de forma 100% anônima.
          O resultado vira um índice de −100 a +100, com leitura por zona e cruzamento por tempo de casa.
        </p>
      </div>

      <CriarColetaEnps />

      <div>
        <h2 className="font-serif font-semibold text-xl text-soul-ink mb-3">Pesquisas criadas</h2>
        {coletas.length === 0 ? (
          <div className="bg-soul-parchment rounded-3xl p-8 text-center border border-soul-mist/60">
            <div className="text-3xl mb-2">💚</div>
            <p className="text-sm text-soul-ink/68 font-sans">Nenhuma pesquisa criada ainda. Crie a primeira acima.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {coletas.map((c: any) => (
              <Link key={c.id} href={`/dashboard/enps/${c.id}`}
                className="block bg-soul-parchment rounded-2xl p-5 border border-soul-mist/60 hover:border-soul-terracota/40 transition-colors">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <p className="font-serif font-semibold text-lg text-soul-ink">{c.titulo || 'Pesquisa de clima'}</p>
                    <p className="text-[13px] text-soul-ink/62 font-sans">
                      {c._count.convites} convidado{c._count.convites !== 1 ? 's' : ''} · {c._count.respostas} resposta{c._count.respostas !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <span className="text-[12px] font-bold uppercase tracking-wider px-3 py-1 rounded-full"
                    style={c.status === 'ACTIVE'
                      ? { background: 'rgba(122,158,126,0.15)', color: '#7a9e7e' }
                      : { background: 'rgba(58,61,69,0.5)', color: 'rgba(240,236,227,0.6)' }}>
                    {c.status === 'ACTIVE' ? 'Ativa' : 'Encerrada'}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
