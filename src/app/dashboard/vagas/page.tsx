import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import { hasActiveSubscription } from '@/lib/subscription/check'
import NovaVagaForm from './NovaVagaForm'

export const metadata: Metadata = { title: 'Perfil Ideal da Vaga' }
export const dynamic = 'force-dynamic'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prismaAny = prisma as any

export default async function VagasPage() {
  const session = await getSession()
  if (!session?.id) redirect('/login')

  const subscriptionOk = await hasActiveSubscription(session.id)
  if (!session.isAdmin && !subscriptionOk) {
    return (
      <div className="max-w-2xl mx-auto py-10">
        <p className="text-[13px] font-bold uppercase tracking-widest text-soul-terracota mb-3">Recurso premium</p>
        <h1 className="font-serif font-semibold text-3xl text-soul-ink leading-tight mb-4">Perfil Ideal da Vaga</h1>
        <p className="text-[15.5px] text-soul-ink/90 font-medium leading-relaxed mb-4">
          Descreva a vaga com suas palavras e receba, na hora, o perfil comportamental ideal do candidato:
          o balanço DISC recomendado, o que procurar, os sinais de alerta e as perguntas certas para a entrevista.
          Você tem as ferramentas de análise, e agora sabe exatamente contra qual alvo comparar.
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

  const vagas = await prismaAny.jobProfile.findMany({
    where: { companyId: session.id },
    orderBy: { createdAt: 'desc' },
    select: { id: true, titulo: true, createdAt: true },
  }) as Array<{ id: string; titulo: string; createdAt: Date }>

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif font-semibold text-3xl text-soul-ink">Perfil Ideal da Vaga</h1>
        <p className="text-sm text-soul-ink/68 mt-1 font-sans max-w-2xl">
          Não sabe qual perfil comportamental combina com a vaga? Descreva a função e a IA recomenda o alvo ideal
          (DISC + cruzamento com os outros testes), o que procurar, os sinais de alerta e perguntas de entrevista.
        </p>
      </div>

      <NovaVagaForm />

      <div>
        <h2 className="font-serif font-semibold text-xl text-soul-ink mb-3">Vagas analisadas</h2>
        {vagas.length === 0 ? (
          <div className="bg-soul-parchment rounded-3xl p-8 text-center border border-soul-mist/60">
            <div className="text-3xl mb-2">🎯</div>
            <p className="text-sm text-soul-ink/68 font-sans">Nenhuma vaga analisada ainda. Descreva a primeira acima.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {vagas.map((v) => (
              <Link key={v.id} href={`/dashboard/vagas/${v.id}`}
                className="block bg-soul-parchment rounded-2xl p-5 border border-soul-mist/60 hover:border-soul-terracota/40 transition-colors">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <p className="font-serif font-semibold text-lg text-soul-ink">{v.titulo}</p>
                  <span className="text-[13px] text-soul-ink/62 font-sans">
                    {new Date(v.createdAt).toLocaleDateString('pt-BR')}
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
