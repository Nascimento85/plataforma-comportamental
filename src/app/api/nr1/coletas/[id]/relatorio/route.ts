// ============================================================
// GET  /api/nr1/coletas/[id]/relatorio — busca relatorio gerado
// POST /api/nr1/coletas/[id]/relatorio — gera (ou regera) relatorio
//
// Aplica MIN_RESPONDENTES_PARA_RELATORIO=5 por setor (anonimato).
// ============================================================

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/session'
import { agregarPorSetor, MIN_RESPONDENTES_PARA_RELATORIO } from '@/lib/nr1/aggregate'
import { gerarRecomendacoes } from '@/lib/nr1/recommendations'
import type { NR1ScoresPorInstrumento, KarasekResultado, ERIResultado, CopsoqResultado } from '@/lib/nr1/types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prismaAny = prisma as any

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getSession()
  if (!session?.id) return NextResponse.json({ error: 'Nao autorizado.' }, { status: 401 })

  const relatorio = await prismaAny.nR1Relatorio.findFirst({
    where: { coletaId: params.id, companyId: session.id },
  })
  if (!relatorio) return NextResponse.json({ status: 'NAO_GERADO' })

  return NextResponse.json({
    id: relatorio.id,
    status: relatorio.status,
    content: relatorio.content ? JSON.parse(relatorio.content) : null,
    pdfUrl: relatorio.pdfUrl,
    generatedAt: relatorio.generatedAt,
  })
}

export async function POST(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getSession()
  if (!session?.id) return NextResponse.json({ error: 'Nao autorizado.' }, { status: 401 })

  // 1) Busca dados da coleta
  const coleta = await prismaAny.nR1Coleta.findFirst({
    where: { id: params.id, companyId: session.id },
    include: { respostas: true },
  })
  if (!coleta) return NextResponse.json({ error: 'Coleta nao encontrada.' }, { status: 404 })

  // 2) Busca setores da empresa
  const setores = await prismaAny.nR1Setor.findMany({ where: { companyId: session.id } })

  // 3) Reconstroi scores individuais (agrupando KARASEK+ERI+COPSOQ por createdAt+setorId)
  //    NOTA: como nao temos FK para um "respondente" (anonimato), agrupamos pela ordem cronologica
  //    triplas de respostas no mesmo setor (cada respondente gera 3 NR1Resposta sequenciais)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type Resp = { id: string; setorId: string; instrumento: string; scores: string; createdAt: Date }
  const respostas = coleta.respostas as Resp[]
  respostas.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())

  // Agrupa em triplas por setor + janela de tempo proxima
  const individuais: Array<{ setorId: string; scores: NR1ScoresPorInstrumento }> = []
  const buckets = new Map<string, { setorId: string; k?: KarasekResultado; e?: ERIResultado; c?: CopsoqResultado }>()
  for (const r of respostas) {
    // Chave: setorId + timestamp arredondado em 60s (assume submissao do mesmo individuo em <60s)
    const slot = Math.floor(r.createdAt.getTime() / 60000)
    const key = `${r.setorId}:${slot}`
    const bucket = buckets.get(key) ?? { setorId: r.setorId }
    const parsed = JSON.parse(r.scores)
    if (r.instrumento === 'KARASEK') bucket.k = parsed
    else if (r.instrumento === 'ERI') bucket.e = parsed
    else if (r.instrumento === 'COPSOQ') bucket.c = parsed
    buckets.set(key, bucket)
  }
  for (const b of buckets.values()) {
    if (b.k && b.e && b.c) {
      individuais.push({ setorId: b.setorId, scores: { karasek: b.k, eri: b.e, copsoq: b.c } })
    }
  }

  // 4) Agrega por setor (min 5 respondentes)
  const setoresInfo = setores.map((s: { id: string; nome: string; perfilDiscDominante: string | null }) => ({
    id: s.id, nome: s.nome, perfilDiscDominante: s.perfilDiscDominante,
  }))
  const agregadoPorSetor = agregarPorSetor(setoresInfo, individuais)

  if (agregadoPorSetor.length === 0) {
    return NextResponse.json({
      error: `Nenhum setor atingiu o minimo de ${MIN_RESPONDENTES_PARA_RELATORIO} respondentes (anonimato blindado).`,
    }, { status: 409 })
  }

  // 5) Gera recomendacoes
  const setoresComRecomendacoes = agregadoPorSetor.map(s => ({
    ...s,
    recomendacoes: gerarRecomendacoes(s),
  }))

  // 6) Monta conteudo do relatorio
  const content = {
    geradoEm: new Date().toISOString(),
    coletaId: params.id,
    coletaNome: coleta.nome,
    totalRespondentes: individuais.length,
    setoresAvaliados: agregadoPorSetor.length,
    minRespondentesPorSetor: MIN_RESPONDENTES_PARA_RELATORIO,
    setores: setoresComRecomendacoes,
  }

  // 7) Upsert NR1Relatorio
  const existing = await prismaAny.nR1Relatorio.findFirst({
    where: { coletaId: params.id, companyId: session.id },
  })
  let relatorio
  if (existing) {
    relatorio = await prismaAny.nR1Relatorio.update({
      where: { id: existing.id },
      data: { status: 'COMPLETED', content: JSON.stringify(content), updatedAt: new Date() },
    })
  } else {
    relatorio = await prismaAny.nR1Relatorio.create({
      data: {
        coletaId: params.id, companyId: session.id,
        status: 'COMPLETED', content: JSON.stringify(content),
      },
    })
  }

  // PDF: deixar para uma proxima sessao (geracao via Puppeteer/HTML)
  return NextResponse.json({ status: 'COMPLETED', content, relatorioId: relatorio.id })
}
