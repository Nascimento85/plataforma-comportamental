// ============================================================
// POST /api/talent-members/[id]/pdi/ai
// Aprofunda a devolutiva com a Claude API, cruzando perfil DISC,
// zona na curva e os fatos SCI digitados pelo gestor.
// Gate: assinatura PJ ativa OU admin.
// ============================================================

import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import { hasActiveSubscription } from '@/lib/subscription/check'
import {
  PERFIS_LIDERANCA, ZONAS, classificarZona,
  type DiscKey, type ZonaKey,
} from '@/content/gestao-times/disc-lideranca'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 60

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prismaAny = prisma as any

const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages'
const MODEL = 'claude-sonnet-4-6'

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getSession()
  if (!session?.id) return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 })

  const subscriptionOk = await hasActiveSubscription(session.id)
  if (!session.isAdmin && !subscriptionOk) {
    return NextResponse.json({ error: 'Recurso exclusivo de assinantes.' }, { status: 403 })
  }

  const member = await prismaAny.talentMember.findUnique({ where: { id: params.id } })
  if (!member || member.companyId !== session.id) {
    return NextResponse.json({ error: 'Membro não encontrado.' }, { status: 404 })
  }
  if (!member.perfilDisc) {
    return NextResponse.json({ error: 'Defina o perfil DISC do colaborador antes de aprofundar com IA.' }, { status: 400 })
  }

  let body: { sciSituacao?: string; sciComportamento?: string; sciImpacto?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'JSON inválido.' }, { status: 400 })
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) return NextResponse.json({ error: 'IA não configurada no servidor.' }, { status: 500 })

  const perfil = PERFIS_LIDERANCA[member.perfilDisc as DiscKey]
  const zonaKey = (member.zonaManual && member.zona ? member.zona : classificarZona(member.notaPerformance, member.fitComportamental)) as ZonaKey | null
  const zona = zonaKey ? ZONAS[zonaKey] : null

  const prompt = `Você é um consultor sênior de desenvolvimento de liderança ajudando um gestor a preparar uma conversa de devolutiva com um liderado. Escreva em português do Brasil, linguagem clara e prática, sem jargão acadêmico. NÃO use hífens nem travessões em nenhum lugar do texto, use vírgula ou una as palavras.

DADOS DO COLABORADOR
- Nome: ${member.nome}
- Cargo: ${member.cargo ?? 'não informado'}
- Perfil comportamental: ${perfil.apelido} (DISC ${member.perfilDisc})
- Zona na curva de vitalidade: ${zona ? `${zona.rotulo} (${zona.descricao})` : 'não classificado'}

GARGALOS TÍPICOS DO PERFIL ${perfil.apelido}
${perfil.gargalos.map(g => `- ${g}`).join('\n')}

FATOS OBSERVADOS PELO GESTOR (metodologia SCI)
- Situação: ${body.sciSituacao?.trim() || 'não preenchida'}
- Comportamento: ${body.sciComportamento?.trim() || 'não preenchido'}
- Impacto: ${body.sciImpacto?.trim() || 'não preenchido'}

GUIA DE TOM PARA ESTE PERFIL
- Priorize: ${perfil.tom.priorizar}
- Evite: ${perfil.tom.evitar}

TAREFA
Produza em MARKDOWN, de forma enxuta e acionável, as seguintes seções:

## Como abrir a conversa
Uma sugestão curta de fala de abertura (2 a 3 frases) calibrada ao perfil ${perfil.apelido}, que crie segurança psicológica.

## Roteiro do feedback SCI
Transforme os fatos acima em um roteiro de feedback usando Situação, Comportamento e Impacto, conectando com o perfil do colaborador. Se algum campo SCI não foi preenchido, oriente o gestor sobre o que observar para preencher.

## 3 ações de desenvolvimento sob medida
Liste 3 ações práticas e específicas para este perfil e este caso, no formato de comprometimento mensurável (algo que ele faça já na próxima semana).

## Como cobrar sem desmotivar
Uma orientação curta de como o gestor deve acompanhar e cobrar a evolução respeitando o estilo do colaborador.

Seja direto e prático. Tamanho alvo: 350 a 600 palavras.`

  try {
    const response = await fetch(ANTHROPIC_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 2048,
        messages: [{ role: 'user', content: prompt }],
      }),
    })

    if (!response.ok) {
      const errText = await response.text().catch(() => '')
      console.error(`[talent-pdi/ai] Anthropic ${response.status}:`, errText)
      return NextResponse.json({ error: `Erro da IA (${response.status}). Tente novamente.` }, { status: 502 })
    }

    const data = await response.json() as { content: Array<{ type: string; text: string }> }
    const text = data.content?.[0]?.text ?? ''
    if (!text.trim()) return NextResponse.json({ error: 'Resposta vazia da IA.' }, { status: 502 })

    // Persiste a devolutiva para reconsulta a qualquer momento
    await prismaAny.talentMember.update({
      where: { id: member.id },
      data: { aiDevolutiva: text.trim(), aiDevolutivaEm: new Date() },
    }).catch(() => { /* não bloqueia a resposta se a persistência falhar */ })

    return NextResponse.json({ markdown: text.trim() }, { status: 200 })
  } catch (err) {
    console.error('[talent-pdi/ai] Falha:', err)
    return NextResponse.json({ error: 'Erro de conexão com a IA.' }, { status: 502 })
  }
}
