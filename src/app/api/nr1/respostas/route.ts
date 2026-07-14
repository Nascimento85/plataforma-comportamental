// ============================================================
// POST /api/nr1/respostas — submissao ANONIMA via token
// Calcula scores + grava em NR1Resposta SEM FK de usuario/convite.
// Atualiza NR1Convite.status para COMPLETED (apenas no controle, separado).
// ============================================================

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { calcKarasek } from '@/lib/nr1/engines/karasek'
import { calcERI } from '@/lib/nr1/engines/eri'
import { calcCOPSOQ } from '@/lib/nr1/engines/copsoq'
import type { NR1RespostaSubmissao } from '@/lib/nr1/types'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prismaAny = prisma as any

interface SubmitBody {
  token: string
  respostas: NR1RespostaSubmissao
}

export async function POST(req: NextRequest) {
  try {
    let body: SubmitBody
    try { body = await req.json() } catch { return NextResponse.json({ error: 'JSON invalido.' }, { status: 400 }) }
    if (!body.token || !body.respostas) {
      return NextResponse.json({ error: 'Campos obrigatorios: token, respostas.' }, { status: 400 })
    }

    // Valida token
    const convite = await prismaAny.nR1Convite.findUnique({ where: { token: body.token } })
    if (!convite) return NextResponse.json({ error: 'Convite invalido.' }, { status: 404 })
    if (convite.status === 'COMPLETED') {
      return NextResponse.json({ error: 'Voce ja respondeu esta avaliacao.' }, { status: 410 })
    }

    // Calcula scores
    const karasek = calcKarasek(body.respostas.karasek)
    const eri     = calcERI(body.respostas.eri)
    const copsoq  = calcCOPSOQ(body.respostas.copsoq)

    // Grava 3 respostas SEPARADAS por instrumento, SEM identidade.
    // Transacao em lote (nao interativa) — mais robusta com connection
    // pooling (pgbouncer) do que a versao com callback.
    await prisma.$transaction([
      prismaAny.nR1Resposta.createMany({
        data: [
          {
            coletaId: convite.coletaId, setorId: convite.setorId, companyId: convite.companyId,
            instrumento: 'KARASEK',
            respostas: JSON.stringify(body.respostas.karasek),
            scores: JSON.stringify(karasek),
          },
          {
            coletaId: convite.coletaId, setorId: convite.setorId, companyId: convite.companyId,
            instrumento: 'ERI',
            respostas: JSON.stringify(body.respostas.eri),
            scores: JSON.stringify(eri),
          },
          {
            coletaId: convite.coletaId, setorId: convite.setorId, companyId: convite.companyId,
            instrumento: 'COPSOQ',
            respostas: JSON.stringify(body.respostas.copsoq),
            scores: JSON.stringify(copsoq),
          },
        ],
      }),
      // Atualiza convite (controle separado) — NAO ha FK das respostas para este
      prismaAny.nR1Convite.update({
        where: { id: convite.id },
        data: { status: 'COMPLETED', completedAt: new Date() },
      }),
    ])

    return NextResponse.json({ ok: true })
  } catch (e) {
    // Garante resposta JSON mesmo em erro inesperado (evita HTML 500
    // que o cliente nao consegue interpretar)
    console.error('[nr1/respostas] Erro ao gravar submissao:', e)
    return NextResponse.json(
      { error: 'Erro interno ao registrar as respostas. Tente novamente em instantes.' },
      { status: 500 },
    )
  }
}
