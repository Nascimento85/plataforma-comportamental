import { getSession } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import type { Metadata } from 'next'
import BuyCreditsButton from './BuyCreditsButton'

export const metadata: Metadata = { title: 'Créditos' }

const CREDIT_PACKS = [
  { pack: 5,  price: 'R$ 49,90',  priceId: process.env.STRIPE_PRICE_PACK_5,  highlight: false },
  { pack: 10, price: 'R$ 89,90',  priceId: process.env.STRIPE_PRICE_PACK_10, highlight: true },
  { pack: 25, price: 'R$ 199,90', priceId: process.env.STRIPE_PRICE_PACK_25, highlight: false },
  { pack: 50, price: 'R$ 349,90', priceId: process.env.STRIPE_PRICE_PACK_50, highlight: false },
]

export default async function CreditsPage() {
  const session = await getSession()
  const companyId = session!.id

  const [creditBalance, transactions] = await Promise.all([
    prisma.creditBalance.findUnique({ where: { companyId } }),
    prisma.creditTransaction.findMany({
      where: { companyId },
      orderBy: { createdAt: 'desc' },
      take: 10,
    }),
  ])

  const credits = creditBalance?.balance ?? 0

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Créditos</h1>
        <p className="text-gray-500 mt-1">Cada crédito gera um relatório completo</p>
      </div>

      <div className="card p-6 flex items-center justify-between">
        <div>
          <p className="font-medium text-gray-500">Saldo atual</p>
          <p className="text-5xl font-bold text-brand-600 mt-1">{credits}</p>
          <p className="text-gray-400 mt-1">créditos disponíveis</p>
        </div>
        <div className="text-6xl">💳</div>
      </div>

      <div>
        <h2 className="font-semibold text-gray-900 mb-4">Comprar créditos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CREDIT_PACKS.map((pack) => (
            <div key={pack.pack} className={`card p-5 flex flex-col ${pack.highlight ? 'border-brand-400 ring-2 ring-brand-200' : ''}`}>
              {pack.highlight && (
                <span className="text-xs font-semibold text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full self-start mb-3">Mais popular</span>
              )}
              <p className="text-3xl font-bold text-gray-900">{pack.pack}</p>
              <p className="text-gray-500 mb-1">créditos</p>
              <p className="text-xl font-semibold text-gray-800 mb-4">{pack.price}</p>
              <BuyCreditsButton pack={pack.pack} priceId={pack.priceId ?? ''} />
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Histórico de transações</h2>
        </div>
        {transactions.length === 0 ? (
          <div className="px-6 py-8 text-center text-gray-400 text-sm">Nenhuma transação ainda.</div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {transactions.map((t) => (
              <li key={t.id} className="px-6 py-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">
                    {t.type === 'PURCHASE' ? 'Compra de créditos' : 'Uso de crédito — relatório'}
                  </p>
                  <p className="text-sm text-gray-400 mt-0.5">
                    {new Date(t.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
                  </p>
                </div>
                <span className={`text-sm font-semibold ${t.amount > 0 ? 'text-green-600' : 'text-red-500'}`}>
                  {t.amount > 0 ? `+${t.amount}` : t.amount}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
