// ============================================================
// POST /api/talent-members/[id]/avaliacao
// Recebe as respostas do questionário 9-box, calcula as notas
// (Performance, Fit, Potencial) e salva no membro.
// ============================================================

import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import { calcularAvaliacao, CRITERIOS } from '@/content/gestao-times/avaliacao-criterios'
import { randomBytes } from 'crypto'
import { sendAvaliacaoLiderEmail } from '@/lib/email'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prismaAny = prisma as any

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getSession()
  if (!session?.id) return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 })

  const member = await prismaAny.talentMember.findUnique({ where: { id: params.id } })
  if (!member || member.companyId !== session.id) {
    return NextResponse.json({ error: 'Membro não encontrado.' }, { status: 404 })
  }

  let body: { respostas?: Record<string, number> }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'JSON inválido.' }, { status: 400 })
  }

  // Normaliza respostas: chave numérica, valor 1-5
  const respostas: Record<number, number> = {}
  const valid = new Set(CRITERIOS.map((c) => c.id))
  for (const [k, v] of Object.entries(body.respostas ?? {})) {
    const id = Number(k)
    const val = Number(v)
    if (valid.has(id) && val >= 1 && val <= 5) respostas[id] = val
  }

  if (Object.keys(respostas).length === 0) {
    return NextResponse.json({ error: 'Nenhuma resposta válida recebida.' }, { status: 400 })
  }

  const result = calcularAvaliacao(respostas)

  const avaliacaoJson = JSON.stringify({
    respostas,
    notaPerformance: result.notaPerformance,
    fitComportamental: result.fitComportamental,
    potencial: result.potencial,
    completo: result.completo,
    avaliadoEm: new Date().toISOString(),
  })

  await prismaAny.talentMember.update({
    where: { id: member.id },
    data: {
      notaPerformance:   result.notaPerformance,
      fitComportamental: result.fitComportamental,
      potencial:         result.potencial,
      avaliacaoJson,
      // Avaliação detalhada recalcula a zona automaticamente (remove override manual)
      zonaManual: false,
    },
  })

  // ── Automacao da Avaliacao de Lideranca (ascendente) ──
  // Assim que o gestor conclui a avaliacao do liderado, o liderado
  // recebe automaticamente o convite anonimo para avaliar o lider.
  const liderConvite = await criarConviteAvaliacaoLider(member)

  return NextResponse.json({
    notaPerformance: result.notaPerformance,
    fitComportamental: result.fitComportamental,
    potencial: result.potencial,
    completo: result.completo,
    liderConvite,
  }, { status: 200 })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function criarConviteAvaliacaoLider(member: any): Promise<{ enviado: boolean; motivo?: string }> {
  try {
    const team = await prismaAny.talentTeam.findUnique({ where: { id: member.teamId } })
    if (!team?.liderNome) return { enviado: false, motivo: 'SEM_LIDER' }

    // Resolve o email do liderado: campo proprio ou do Employee vinculado
    let email: string | null = (member.email ?? '').trim().toLowerCase() || null
    if (!email && member.employeeId) {
      const emp = await prisma.employee.findUnique({ where: { id: member.employeeId }, select: { email: true } })
      email = emp?.email?.trim().toLowerCase() || null
    }
    if (!email) return { enviado: false, motivo: 'SEM_EMAIL' }

    // Nao avaliar a si mesmo: pula se o email do liderado e o do lider
    if (team.liderEmail && email === team.liderEmail.trim().toLowerCase()) {
      return { enviado: false, motivo: 'PROPRIO_LIDER' }
    }

    // Idempotente: 1 convite por team+email (nao reenvia nem duplica)
    const existente = await prismaAny.liderConvite.findUnique({
      where: { teamId_email: { teamId: team.id, email } },
    })
    if (existente) return { enviado: false, motivo: 'JA_CONVIDADO' }

    const convite = await prismaAny.liderConvite.create({
      data: {
        teamId:    team.id,
        companyId: team.companyId,
        nome:      member.nome,
        email,
        token:     randomBytes(20).toString('hex'),
      },
    })

    const { sent } = await sendAvaliacaoLiderEmail({
      toEmail:   email,
      nome:      member.nome,
      liderNome: team.liderNome,
      teamNome:  team.nome,
      token:     convite.token,
    })
    return { enviado: sent }
  } catch (e) {
    console.error('[avaliacao-lider] Falha ao criar convite automatico:', e)
    return { enviado: false, motivo: 'ERRO' }
  }
}
