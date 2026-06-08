// ============================================================
// POST /api/diagnostico-pme/[token]/lider
// O líder responde via token. Cruza com as respostas do dono,
// recalcula score, cenário e gaps, e marca como COMPLETO.
// Rota pública.
// ============================================================

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import {
  PERGUNTAS_LIDER, calcularDiagnostico, faixaMaturidade,
} from '@/content/pme-diagnostico/questionarios'
import { sendPmeDiagnosticoEmail } from '@/lib/email'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prismaAny = prisma as any

export async function POST(req: NextRequest, { params }: { params: { ref: string } }) {
  const diag = await prismaAny.pmeDiagnostico.findUnique({ where: { tokenLider: params.ref } })
  if (!diag) return NextResponse.json({ error: 'Diagnóstico não encontrado.' }, { status: 404 })
  if (diag.status === 'COMPLETO') {
    return NextResponse.json({ error: 'Este diagnóstico já foi respondido pelo líder.', id: diag.id }, { status: 409 })
  }

  let body: { liderNome?: string; liderEmail?: string; respostas?: Record<string, number> }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'JSON inválido.' }, { status: 400 })
  }

  const validos = new Set(PERGUNTAS_LIDER.map((p) => p.id))
  const respostas: Record<string, number> = {}
  for (const [k, v] of Object.entries(body.respostas ?? {})) {
    if (validos.has(k) && Number(v) >= 1 && Number(v) <= 5) respostas[k] = Number(v)
  }
  const faltando = PERGUNTAS_LIDER.filter((p) => !respostas[p.id])
  if (faltando.length > 0) {
    return NextResponse.json({ error: `Responda todas as ${PERGUNTAS_LIDER.length} perguntas.` }, { status: 400 })
  }

  const respostasDono = JSON.parse(diag.respostasDono) as Record<string, number>
  const resultado = calcularDiagnostico(respostasDono, diag.temLideres, respostas)

  await prismaAny.pmeDiagnostico.update({
    where: { id: diag.id },
    data: {
      respostasLider:  JSON.stringify(respostas),
      liderNome:       (body.liderNome ?? '').trim() || null,
      liderEmail:      (body.liderEmail ?? '').trim().toLowerCase() || null,
      scoreMaturidade: resultado.scoreMaturidade,
      cenario:         resultado.cenario,
      status:          'COMPLETO',
      liderRespondeuEm: new Date(),
      // Invalida o relatório IA anterior para ser regenerado com os dados cruzados
      relatorioAi:     null,
    },
  })

  // Reenvia o relatório ATUALIZADO (com os gaps cruzados) ao dono
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? ''
  const faixa = faixaMaturidade(resultado.scoreMaturidade)
  sendPmeDiagnosticoEmail({
    toEmail:      diag.donoEmail,
    donoNome:     diag.donoNome,
    empresa:      diag.empresa,
    relatorioUrl: `${appUrl}/diagnostico-pme/relatorio/${diag.id}`,
    faixaRotulo:  faixa.rotulo,
    score:        resultado.scoreMaturidade,
    linkLider:    null,
  }).catch((e) => console.error('[pme] email dono (pós líder) falhou:', e))

  return NextResponse.json({
    id: diag.id,
    relatorioUrl: `/diagnostico-pme/relatorio/${diag.id}`,
  }, { status: 200 })
}
