// ============================================================
// POST /api/diagnostico-pme
// Cria um diagnóstico (o Dono responde + captura de lead).
// Gera o token do líder e calcula o resultado parcial.
// Rota pública (lead gen, sem login).
// ============================================================

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { v4 as uuidv4 } from 'uuid'
import {
  PERGUNTAS_DONO, calcularDiagnostico, faixaMaturidade,
} from '@/content/pme-diagnostico/questionarios'
import { sendPmeDiagnosticoEmail } from '@/lib/email'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prismaAny = prisma as any

interface Body {
  donoNome?:     string
  donoEmail?:    string
  donoTelefone?: string
  empresa?:      string
  funcionarios?: string
  temLideres?:   boolean
  respostas?:    Record<string, number>
}

export async function POST(req: NextRequest) {
  let body: Body
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'JSON inválido.' }, { status: 400 })
  }

  const donoNome = (body.donoNome ?? '').trim()
  const donoEmail = (body.donoEmail ?? '').trim().toLowerCase()
  const empresa = (body.empresa ?? '').trim()

  const donoTelefone = (body.donoTelefone ?? '').trim()
  if (donoNome.length < 2) return NextResponse.json({ error: 'Informe seu nome.' }, { status: 400 })
  if (!donoEmail.includes('@')) return NextResponse.json({ error: 'Informe um e-mail válido.' }, { status: 400 })
  if (donoTelefone.replace(/\D/g, '').length < 10) return NextResponse.json({ error: 'Informe um WhatsApp válido com DDD.' }, { status: 400 })
  if (empresa.length < 2) return NextResponse.json({ error: 'Informe o nome da empresa.' }, { status: 400 })

  // Normaliza respostas (1 a 5)
  const validos = new Set(PERGUNTAS_DONO.map((p) => p.id))
  const respostas: Record<string, number> = {}
  for (const [k, v] of Object.entries(body.respostas ?? {})) {
    if (validos.has(k) && Number(v) >= 1 && Number(v) <= 5) respostas[k] = Number(v)
  }

  const temLideres = !!body.temLideres
  // Verifica se respondeu o mínimo (todas as obrigatórias do bloco aplicável)
  const obrigatorias = PERGUNTAS_DONO.filter((p) => temLideres || p.bloco !== 'Sua Liderança')
  const faltando = obrigatorias.filter((p) => !respostas[p.id])
  if (faltando.length > 0) {
    return NextResponse.json({ error: `Responda todas as ${obrigatorias.length} perguntas.` }, { status: 400 })
  }

  const resultado = calcularDiagnostico(respostas, temLideres, null)
  const tokenLider = uuidv4()

  const diag = await prismaAny.pmeDiagnostico.create({
    data: {
      donoNome,
      donoEmail,
      donoTelefone,
      empresa,
      funcionarios:   (body.funcionarios ?? '').trim() || null,
      temLideres,
      respostasDono:  JSON.stringify(respostas),
      tokenLider,
      scoreMaturidade: resultado.scoreMaturidade,
      cenario:         resultado.cenario,
      status:          'DONO_RESPONDEU',
    },
  })

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? ''
  const relatorioUrl = `/diagnostico-pme/relatorio/${diag.id}`
  const linkLider = temLideres ? `${appUrl}/diagnostico-pme/${tokenLider}` : null

  // Envia o relatório por e-mail (não bloqueia a resposta)
  const faixa = faixaMaturidade(resultado.scoreMaturidade)
  sendPmeDiagnosticoEmail({
    toEmail:      donoEmail,
    donoNome,
    empresa,
    relatorioUrl: `${appUrl}${relatorioUrl}`,
    faixaRotulo:  faixa.rotulo,
    score:        resultado.scoreMaturidade,
    linkLider,
  }).catch((e) => console.error('[pme] email dono falhou:', e))

  return NextResponse.json({ id: diag.id, relatorioUrl, linkLider }, { status: 201 })
}
