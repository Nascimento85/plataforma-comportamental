import { getSession } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import type { Metadata } from 'next'
import BuyCreditsButton from './BuyCreditsButton'
import { getPassportState } from '@/lib/passport'
import PassportWidget from '@/components/passport/PassportWidget'

export const metadata: Metadata = { title: 'Passaporte de Autoconhecimento' }

const CREDIT_PACKS = [
  { pack: 5,  price: 'R$ 49,90',  per: 'R$9,98/crédito', priceId: process.env.STRIPE_PRICE_PACK_5,  highlight: false },
  { pack: 10, price: 'R$ 89,90',  per: 'R$8,99/crédito', priceId: process.env.STRIPE_PRICE_PACK_10, highlight: true  },
  { pack: 25, price: 'R$ 199,90', per: 'R$7,99/crédito', priceId: process.env.STRIPE_PRICE_PACK_25, highlight: false },
  { pack: 50, price: 'R$ 349,90', per: 'R$6,99/crédito', priceId: process.env.STRIPE_PRICE_PACK_50, highlight: false },
]

interface PageProps {
  searchParams: { success?: string; canceled?: string }
}

export default async function CreditsPage({ searchParams }: PageProps) {
  const justPurchased = searchParams.success === '1'
  const wasCanceled   = searchParams.canceled === '1'

  const session = await getSession()
  const companyId = session!.id

  const [passport, transactions] = await Promise.all([
    getPassportState(companyId),
    prisma.creditTransaction.findMany({
      where: { companyId },
      orderBy: { createdAt: 'desc' },
      take: 10,
    }),
  ])

  const credits = passport.total
  const isLow   = credits <= 5

  return (
    <div className="space-y-6">

      {/* ── Header ── */}
      <div>
        <h1 className="font-serif font-semibold text-3xl text-soul-ink">
          Passaporte de Autoconhecimento
        </h1>
        <p className="text-sm text-soul-ink/45 mt-1 font-sans">
          Seu passe de acesso aos testes. Bônus expiram em 7 dias — créditos pagos não.
        </p>
      </div>

      {/* ── Widget do Passaporte ── */}
      <PassportWidget state={passport} />

      {/* ── Stripe feedback banners ── */}
      {justPurchased && (
        <div className="flex items-start gap-3 rounded-2xl px-5 py-4 font-sans"
             style={{ background: 'rgba(122,158,126,0.1)', border: '1px solid rgba(122,158,126,0.25)' }}>
          <span className="text-2xl flex-shrink-0">🎉</span>
          <div>
            <p className="font-semibold text-sm" style={{ color: '#4a7a4e' }}>Pagamento confirmado!</p>
            <p className="text-sm mt-0.5" style={{ color: '#5a8a5e' }}>
              Seus créditos já foram adicionados ao saldo e estão disponíveis para uso imediato.
            </p>
          </div>
        </div>
      )}
      {wasCanceled && (
        <div className="flex items-start gap-3 rounded-2xl px-5 py-4 font-sans"
             style={{ background: 'rgba(212,148,58,0.08)', border: '1px solid rgba(212,148,58,0.2)' }}>
          <span className="text-2xl flex-shrink-0">⚠️</span>
          <div>
            <p className="font-semibold text-sm" style={{ color: '#8a6020' }}>Pagamento cancelado</p>
            <p className="text-sm mt-0.5" style={{ color: '#a07030' }}>
              Nenhum valor foi cobrado. Você pode tentar novamente quando quiser.
            </p>
          </div>
        </div>
      )}

      {/* ── Credit packs ── */}
      <div>
        <h2 className="font-serif font-semibold text-xl text-soul-ink mb-4 flex items-center gap-2.5">
          <span className="w-7 h-7 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
                style={{ background: 'rgba(196,99,58,0.08)' }}>
            🛒
          </span>
          Comprar créditos
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CREDIT_PACKS.map((pack) => (
            <div
              key={pack.pack}
              className="bg-white rounded-3xl p-5 flex flex-col relative overflow-hidden"
              style={{
                border: pack.highlight
                  ? '2px solid rgba(196,99,58,0.4)'
                  : '1px solid rgba(232,226,214,0.7)',
                boxShadow: pack.highlight
                  ? '0 4px 20px rgba(196,99,58,0.12)'
                  : '0 1px 4px rgba(28,26,23,0.04)',
              }}
            >
              {pack.highlight && (
                <div
                  className="absolute top-0 left-0 right-0 h-0.5"
                  style={{ background: 'linear-gradient(90deg, #c4633a, #d4943a)' }}
                />
              )}
              {pack.highlight && (
                <span className="self-start mb-3 text-[10px] font-bold px-2.5 py-1 rounded-full font-sans uppercase tracking-wide"
                      style={{ background: 'rgba(196,99,58,0.08)', color: '#c4633a' }}>
                  Mais popular
                </span>
              )}
              <div className="font-serif font-semibold leading-none mb-0.5"
                   style={{ fontSize: '40px', color: '#1c1a17' }}>
                {pack.pack}
              </div>
              <div className="text-sm text-soul-ink/40 font-sans mb-1">créditos</div>
              <div className="text-xl font-semibold text-soul-ink mb-0.5 font-sans">{pack.price}</div>
              <div className="text-[11px] text-soul-ink/30 font-sans mb-5">{pack.per}</div>
              <BuyCreditsButton pack={pack.pack} priceId={pack.priceId ?? ''} />
            </div>
          ))}
        </div>
      </div>

      {/* ── Transaction history ── */}
      <div className="bg-white rounded-3xl border border-soul-mist/60 overflow-hidden">
        <div className="px-6 py-4 border-b border-soul-mist/40">
          <h2 className="font-serif font-semibold text-xl text-soul-ink flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg flex items-center justify-center text-sm"
                  style={{ background: 'rgba(61,79,124,0.08)' }}>
              📊
            </span>
            Histórico de transações
          </h2>
        </div>
        {transactions.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <div className="text-3xl mb-3">📭</div>
            <p className="text-sm text-soul-ink/40 font-sans">Nenhuma transação ainda.</p>
          </div>
        ) : (
          <ul className="divide-y divide-soul-mist/30">
            {transactions.map((t) => (
              <li key={t.id} className="px-6 py-4 flex items-center justify-between hover:bg-soul-cream/30 transition-colors">
                <div>
                  <p className="text-sm font-medium text-soul-ink font-sans">
                    {t.type === 'PURCHASE' ? '🪙 Compra de créditos' : '📋 Uso de crédito — relatório'}
                  </p>
                  <p className="text-[11px] text-soul-ink/35 mt-0.5 font-sans">
                    {new Date(t.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
                  </p>
                </div>
                <span
                  className="text-sm font-semibold font-sans"
                  style={{ color: t.amount > 0 ? '#5a8a5e' : '#c4633a' }}
                >
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
