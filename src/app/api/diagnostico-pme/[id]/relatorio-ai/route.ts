// ============================================================
// POST /api/diagnostico-pme/[id]/relatorio-ai
// Gera (e persiste) a análise narrativa do relatório PME via IA,
// cruzando o cenário, o score, os gaps e o porte da empresa.
// Rota pública (o relatório é público por design de lead gen).
// ============================================================

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import {
  calcularDiagnostico, faixaMaturidade, CENARIO_INFO,
  type CenarioPme,
} from '@/content/pme-diagnostico/questionarios'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 60

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prismaAny = prisma as any

const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages'
const MODEL = 'claude-sonnet-4-6'

export async function POST(_req: NextRequest, { params }: { params: { id: string } }) {
  const diag = await prismaAny.pmeDiagnostico.findUnique({ where: { id: params.id } })
  if (!diag) return NextResponse.json({ error: 'Diagnóstico não encontrado.' }, { status: 404 })

  // Se já existe, devolve o salvo (cache)
  if (diag.relatorioAi) {
    return NextResponse.json({ markdown: diag.relatorioAi, cached: true }, { status: 200 })
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) return NextResponse.json({ error: 'Serviço indisponível.' }, { status: 500 })

  const respostasDono = JSON.parse(diag.respostasDono) as Record<string, number>
  const respostasLider = diag.respostasLider ? (JSON.parse(diag.respostasLider) as Record<string, number>) : null
  const r = calcularDiagnostico(respostasDono, diag.temLideres, respostasLider)
  const faixa = faixaMaturidade(r.scoreMaturidade)
  const cenarioInfo = CENARIO_INFO[r.cenario as CenarioPme]

  const gapsTxt = r.gaps.length
    ? r.gaps.map((g) => `- ${g.indicador}: o dono acredita que "${g.visaoDono}" (nota ${g.notaDono}), enquanto o líder relata "${g.realidadeLider}" (nota ${g.notaLider}). Atrito: ${g.atrito}.`).join('\n')
    : 'O líder ainda não respondeu, a análise é baseada apenas na visão do dono.'

  const prompt = `Você é um consultor sênior de gestão e liderança escrevendo a análise final de um diagnóstico para o dono de uma pequena ou média empresa. Escreva em português do Brasil, com tom profissional, direto e respeitoso, gerando um leve choque de realidade construtivo (sem ser duro ou ofensivo). NÃO use hífens nem travessões, use vírgula ou una as palavras. NÃO mencione que este texto foi gerado por IA.

DADOS DO DIAGNÓSTICO
- Empresa: ${diag.empresa}
- Porte: ${diag.funcionarios ?? 'não informado'} funcionários
- Tem líderes ou gestores: ${diag.temLideres ? 'sim' : 'não, o dono é o único líder'}
- Score de maturidade da liderança: ${r.scoreMaturidade} de 100 (${faixa.rotulo})
- Cenário identificado: ${cenarioInfo.titulo}
- Pontos de atrito entre a visão do dono e a realidade do líder:
${gapsTxt}

DIRECIONAMENTO BASE DO CENÁRIO (use como espinha dorsal, mas personalize):
${cenarioInfo.direcionamento}

TAREFA
Escreva em MARKDOWN, de forma enxuta e impactante, as seções:

## O que os números revelam
Um parágrafo (3 a 5 frases) interpretando o score e o cenário da empresa de forma personalizada, conectando com a dor real de um dono de PME.

## O ponto mais urgente
Aponte o gargalo principal a ser resolvido primeiro. Se houver gaps críticos, foque neles. Se o líder não respondeu, oriente o dono a enviar o diagnóstico ao líder para completar a leitura.

## Seu plano de ação para os próximos 90 dias
Liste de 3 a 4 ações concretas e específicas para o cenário desta empresa, em formato de passos práticos.

Tamanho alvo: 300 a 500 palavras. Seja específico ao porte e ao cenário da empresa.`

  try {
    const response = await fetch(ANTHROPIC_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model: MODEL, max_tokens: 1800, messages: [{ role: 'user', content: prompt }] }),
    })
    if (!response.ok) {
      const t = await response.text().catch(() => '')
      console.error(`[pme/relatorio-ai] Anthropic ${response.status}:`, t)
      return NextResponse.json({ error: 'Não foi possível gerar a análise agora.' }, { status: 502 })
    }
    const data = await response.json() as { content: Array<{ type: string; text: string }> }
    const text = data.content?.[0]?.text ?? ''
    if (!text.trim()) return NextResponse.json({ error: 'Resposta vazia.' }, { status: 502 })

    await prismaAny.pmeDiagnostico.update({
      where: { id: diag.id },
      data: { relatorioAi: text.trim() },
    }).catch(() => { /* não bloqueia */ })

    return NextResponse.json({ markdown: text.trim(), cached: false }, { status: 200 })
  } catch (err) {
    console.error('[pme/relatorio-ai] Falha:', err)
    return NextResponse.json({ error: 'Erro de conexão.' }, { status: 502 })
  }
}
