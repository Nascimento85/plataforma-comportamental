import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import { hasActiveSubscription } from '@/lib/subscription/check'
import CriarCiclo360 from './CriarCiclo360'

export const metadata: Metadata = { title: 'Avaliação 360°' }
export const dynamic = 'force-dynamic'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prismaAny = prisma as any

export default async function Avaliacao360ListPage() {
  const session = await getSession()
  if (!session?.id) redirect('/login')
  const companyId = session.id

  // Gate premium (admin isento)
  const subscriptionOk = await hasActiveSubscription(session.id)
  if (!session.isAdmin && !subscriptionOk) {
    return (
      <div className="max-w-2xl mx-auto py-10">
        <p className="text-[13px] font-bold uppercase tracking-widest text-soul-terracota mb-3">Recurso premium</p>
        <h1 className="font-serif font-semibold text-3xl text-soul-ink leading-tight mb-4">Avaliação 360°</h1>
        <p className="text-[15.5px] text-soul-ink/90 font-medium leading-relaxed mb-4">
          Avalie uma pessoa por múltiplos ângulos, a autoimagem dela, o olhar do gestor, dos pares e dos liderados,
          e revele os pontos cegos num radar comparativo. A ferramenta mais profunda de desenvolvimento de liderança.
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

  const ciclos = await prismaAny.avaliacao360.findMany({
    where: { companyId },
    orderBy: { createdAt: 'desc' },
    include: { _count: { select: { convites: true, respostas: true } } },
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif font-semibold text-3xl text-soul-ink">Avaliação 360°</h1>
        <p className="text-sm text-soul-ink/68 mt-1 font-sans max-w-2xl">
          Uma pessoa é avaliada por si mesma, pelo gestor, por pares e por liderados. O relatório cruza
          a autoimagem com a percepção dos outros e revela pontos cegos. Respostas de pares e liderados
          são anônimas e aparecem só de forma agregada.
        </p>
      </div>

      <CriarCiclo360 />

      <div>
        <h2 className="font-serif font-semibold text-xl text-soul-ink mb-3">Ciclos criados</h2>
        {ciclos.length === 0 ? (
          <div className="bg-soul-parchment rounded-3xl p-8 text-center border border-soul-mist/60">
            <div className="text-3xl mb-2">🧭</div>
            <p className="text-sm text-soul-ink/68 font-sans">Nenhuma avaliação 360° criada ainda. Comece criando um ciclo acima.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {ciclos.map((c: any) => {
              const respondidos = c._count.respostas
              const convidados = c._count.convites
              return (
                <Link key={c.id} href={`/dashboard/avaliacao-360/${c.id}`}
                  className="block bg-soul-parchment rounded-2xl p-5 border border-soul-mist/60 hover:border-soul-terracota/40 transition-colors">
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div>
                      <p className="font-serif font-semibold text-lg text-soul-ink">{c.avaliadoNome}</p>
                      <p className="text-[13px] text-soul-ink/62 font-sans">
                        {c.titulo ? `${c.titulo} · ` : ''}{convidados} convidado{convidados !== 1 ? 's' : ''} · {respondidos} resposta{respondidos !== 1 ? 's' : ''}
                      </p>
                    </div>
                    <span className="text-[12px] font-bold uppercase tracking-wider px-3 py-1 rounded-full"
                      style={c.status === 'ACTIVE'
                        ? { background: 'rgba(122,158,126,0.15)', color: '#7a9e7e' }
                        : { background: 'rgba(58,61,69,0.5)', color: 'rgba(240,236,227,0.6)' }}>
                      {c.status === 'ACTIVE' ? 'Ativo' : 'Encerrado'}
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
