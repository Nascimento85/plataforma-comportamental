'use client'

import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function BuyCreditsButton({
  pack,
  priceId,
}: {
  pack: number
  priceId: string
}) {
  const [loading, setLoading] = useState(false)

  async function handleBuy() {
    setLoading(true)
    try {
      const res = await fetch('/api/credits/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId, pack }),
      })

      const { sessionId, error } = await res.json()
      if (error) {
        alert(error)
        return
      }

      const stripe = await stripePromise
      await stripe?.redirectToCheckout({ sessionId })
    } catch {
      alert('Erro ao iniciar pagamento.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleBuy}
      disabled={loading || !priceId}
      className="btn-primary w-full mt-auto"
    >
      {loading ? 'Aguarde...' : `Comprar ${pack} créditos`}
    </button>
  )
}
