// ============================================================
// POST /api/admin/seed-demo
// Cria ou recria (idempotente, sempre limpa) a conta demo padrao
// para compartilhar com prospects. Admin-only.
// ============================================================

import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/session'
import { seedDemoAccount } from '@/lib/demo/seed-data'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 60

export async function POST(_req: NextRequest) {
  const session = await getSession()
  if (!session?.id) {
    return NextResponse.json({ error: 'Nao autorizado.' }, { status: 401 })
  }
  if (!session.isAdmin) {
    return NextResponse.json({ error: 'Acao restrita a administradores.' }, { status: 403 })
  }

  try {
    const result = await seedDemoAccount()
    return NextResponse.json({
      ok: true,
      message: result.recreated
        ? 'Conta demo recriada do zero (dados anteriores apagados).'
        : 'Conta demo criada com sucesso.',
      ...result,
    })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('[api/admin/seed-demo] Falha:', msg)
    return NextResponse.json(
      { error: 'Falha ao executar seed. ' + msg },
      { status: 500 },
    )
  }
}
