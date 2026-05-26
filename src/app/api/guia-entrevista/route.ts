// ============================================================
// POST /api/guia-entrevista
// Gera roteiro personalizado de entrevista. Gate temporario admin-only
// (futuramente trocar para session.hasActiveSubscription quando Task #43 sair).
// ============================================================

import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/session'
import { gerarGuiaEntrevista } from '@/lib/entrevista/generate'
import type { BuildGuiaInput, Senioridade, TomEntrevista } from '@/lib/entrevista/prompt-builder'
import { PERFIS_DISFUNCIONAIS_MAP, type PerfilDisfuncionalKey } from '@/content/entrevista/perfis-disfuncionais'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 60

const SENIORIDADE_VALIDA: Senioridade[] = ['JUNIOR', 'PLENO', 'SENIOR', 'GERENTE', 'DIRETOR']
const TOM_VALIDO: TomEntrevista[] = ['FORMAL', 'CONSULTIVO', 'INFORMAL_HONESTO']

interface InputBody {
  cargo?:              string
  senioridade?:        string
  perfisInvestigar?:   string[]
  tom?:                string
  contextoAdicional?:  string
}

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session?.id) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 })
  }
  // Gate temporário: só admins. Trocar para session.hasActiveSubscription quando #43 estiver pronta.
  if (!session.isAdmin) {
    return NextResponse.json(
      { error: 'Recurso exclusivo de assinantes Pro.', isPremiumOnly: true },
      { status: 403 },
    )
  }

  let body: InputBody
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'JSON inválido.' }, { status: 400 })
  }

  // Validações
  const cargo = (body.cargo ?? '').trim()
  if (!cargo || cargo.length < 3 || cargo.length > 100) {
    return NextResponse.json({ error: 'Informe o cargo (3 a 100 caracteres).' }, { status: 400 })
  }

  if (!body.senioridade || !SENIORIDADE_VALIDA.includes(body.senioridade as Senioridade)) {
    return NextResponse.json({ error: 'Senioridade inválida.' }, { status: 400 })
  }

  if (!body.tom || !TOM_VALIDO.includes(body.tom as TomEntrevista)) {
    return NextResponse.json({ error: 'Tom inválido.' }, { status: 400 })
  }

  if (!Array.isArray(body.perfisInvestigar) || body.perfisInvestigar.length === 0) {
    return NextResponse.json({ error: 'Selecione ao menos um perfil disfuncional a investigar.' }, { status: 400 })
  }

  const perfisValidos = body.perfisInvestigar.filter(
    (k): k is PerfilDisfuncionalKey => k in PERFIS_DISFUNCIONAIS_MAP,
  )
  if (perfisValidos.length === 0) {
    return NextResponse.json({ error: 'Nenhum perfil disfuncional válido informado.' }, { status: 400 })
  }

  const contextoAdicional = (body.contextoAdicional ?? '').trim().slice(0, 800)

  const input: BuildGuiaInput = {
    cargo,
    senioridade:      body.senioridade as Senioridade,
    perfisInvestigar: perfisValidos,
    tom:              body.tom as TomEntrevista,
    contextoAdicional: contextoAdicional || undefined,
  }

  const result = await gerarGuiaEntrevista(input)
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 502 })
  }

  return NextResponse.json({
    markdown: result.markdown,
    cargo,
    senioridade: input.senioridade,
    perfisInvestigados: perfisValidos,
    tom: input.tom,
    geradoEm: new Date().toISOString(),
  })
}
