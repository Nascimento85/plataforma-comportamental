// ============================================================
// POST /api/nr1/coletas/[id]/seed-respostas
// Gera N respostas mockadas em um setor para QA/Demo.
//
// Protegido: APENAS usuarios com session.isAdmin = true podem chamar.
// Body: { setorId: string, n?: number, profile?: 'BAIXO' | 'MODERADO' | 'ALTO' | 'RANDOM' }
// ============================================================

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/session'
import { calcKarasek } from '@/lib/nr1/engines/karasek'
import { calcERI } from '@/lib/nr1/engines/eri'
import { calcCOPSOQ } from '@/lib/nr1/engines/copsoq'
import { gerarSubmissaoMockada, type SeedProfile } from '@/lib/nr1/seed'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prismaAny = prisma as any

const PROFILES_VALIDOS: SeedProfile[] = ['BAIXO', 'MODERADO', 'ALTO', 'RANDOM']
const MAX_N = 20  // limite por chamada para evitar abuso

interface SeedBody {
  setorId: string
  n?:      number
  profile?: SeedProfile
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getSession()
  if (!session?.id) {
    return NextResponse.json({ error: 'Nao autorizado.' }, { status: 401 })
  }
  if (!session.isAdmin) {
    return NextResponse.json({ error: 'Apenas administradores podem usar o seed.' }, { status: 403 })
  }

  let body: SeedBody
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'JSON invalido.' }, { status: 400 })
  }

  const setorId = (body.setorId ?? '').trim()
  const n       = Math.min(Math.max(body.n ?? 5, 1), MAX_N)
  const profile: SeedProfile = body.profile && PROFILES_VALIDOS.includes(body.profile)
    ? body.profile
    : 'MODERADO'

  if (!setorId) {
    return NextResponse.json({ error: 'setorId obrigatorio.' }, { status: 400 })
  }

  // Coleta da empresa logada
  const coleta = await prismaAny.nR1Coleta.findFirst({
    where: { id: params.id, companyId: session.id },
    select: { id: true, companyId: true, expiresAt: true },
  })
  if (!coleta) {
    return NextResponse.json({ error: 'Coleta nao encontrada.' }, { status: 404 })
  }
  if (new Date(coleta.expiresAt).getTime() < Date.now()) {
    return NextResponse.json({ error: 'Coleta expirada.' }, { status: 410 })
  }

  // Setor da empresa logada
  const setor = await prismaAny.nR1Setor.findFirst({
    where: { id: setorId, companyId: session.id },
    select: { id: true },
  })
  if (!setor) {
    return NextResponse.json({ error: 'Setor invalido para esta empresa.' }, { status: 400 })
  }

  // Gera N respondentes mockados (cada um produz 3 NR1Resposta: KARASEK + ERI + COPSOQ)
  const allRows: Array<{
    coletaId:    string
    setorId:     string
    companyId:   string
    instrumento: string
    respostas:   string
    scores:      string
    createdAt:   Date
  }> = []

  const now = Date.now()

  for (let i = 0; i < n; i++) {
    const submissao = gerarSubmissaoMockada(profile)

    const karasek = calcKarasek(submissao.karasek)
    const eri     = calcERI(submissao.eri)
    const copsoq  = calcCOPSOQ(submissao.copsoq)

    // Timestamps espacados em segundos para nao agrupar por janela de 60s
    // (o agregador agrupa triplas por slot de tempo; espacar evita conflitos)
    const ts = new Date(now + i * 70_000)

    allRows.push(
      {
        coletaId:    coleta.id,
        setorId:     setor.id,
        companyId:   session.id,
        instrumento: 'KARASEK',
        respostas:   JSON.stringify(submissao.karasek),
        scores:      JSON.stringify(karasek),
        createdAt:   ts,
      },
      {
        coletaId:    coleta.id,
        setorId:     setor.id,
        companyId:   session.id,
        instrumento: 'ERI',
        respostas:   JSON.stringify(submissao.eri),
        scores:      JSON.stringify(eri),
        createdAt:   new Date(ts.getTime() + 100),
      },
      {
        coletaId:    coleta.id,
        setorId:     setor.id,
        companyId:   session.id,
        instrumento: 'COPSOQ',
        respostas:   JSON.stringify(submissao.copsoq),
        scores:      JSON.stringify(copsoq),
        createdAt:   new Date(ts.getTime() + 200),
      },
    )
  }

  await prismaAny.nR1Resposta.createMany({ data: allRows })

  return NextResponse.json({
    seeded:     n,
    instrumentos: allRows.length,
    profile,
    setorId,
    note:       'Respostas mockadas geradas para QA/Demo. Use o botao Atualizar relatorio na pagina da coleta.',
  }, { status: 201 })
}
