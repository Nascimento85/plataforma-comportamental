// ============================================================
// Rota raiz /
// Se logado, redireciona para /dashboard.
// Caso contrário, serve a nova home estática (/inicio.html) com
// tema preto + dourado, catalogo dos 9 testes, downloads abertos
// e CTAs com gatilhos de neurovendas.
// ============================================================

import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const session = await getSession()
  if (session?.id) {
    redirect('/dashboard')
  } else {
    redirect('/inicio.html')
  }
}
