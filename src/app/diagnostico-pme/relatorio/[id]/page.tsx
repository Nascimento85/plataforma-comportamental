// ============================================================
// /diagnostico-pme/relatorio/[id] — relatório do diagnóstico (público)
// ============================================================

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import {
  PERGUNTAS_DONO, calcularDiagnostico, faixaMaturidade, CENARIO_INFO,
  type CenarioPme,
} from '@/content/pme-diagnostico/questionarios'
import RelatorioClient from './RelatorioClient'

export const metadata: Metadata = { title: 'Diagnóstico de Liderança · Relatório' }
export const dynamic = 'force-dynamic'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prismaAny = prisma as any

function mediaBloco(respostas: Record<string, number>, bloco: string): number {
  const ids = PERGUNTAS_DONO.filter((p) => p.bloco === bloco).map((p) => p.id)
  const vals = ids.map((id) => respostas[id]).filter((v) => typeof v === 'number')
  if (vals.length === 0) return 0
  return vals.reduce((a, b) => a + b, 0) / vals.length
}

export default async function RelatorioPage({ params }: { params: { id: string } }) {
  const diag = await prismaAny.pmeDiagnostico.findUnique({ where: { id: params.id } })
  if (!diag) return notFound()

  const respostasDono = JSON.parse(diag.respostasDono) as Record<string, number>
  const respostasLider = diag.respostasLider ? (JSON.parse(diag.respostasLider) as Record<string, number>) : null
  const r = calcularDiagnostico(respostasDono, diag.temLideres, respostasLider)
  const faixa = faixaMaturidade(r.scoreMaturidade)
  const cenario = CENARIO_INFO[r.cenario as CenarioPme]

  // Triângulo da PME (0 a 100 por pilar)
  const pilares = [
    { nome: 'Resultados Financeiros', pct: Math.round(((mediaBloco(respostasDono, 'Resultados e Metas') - 1) / 4) * 100) },
    { nome: 'Autonomia da Operação',  pct: Math.round(((mediaBloco(respostasDono, 'Autonomia da Operação') - 1) / 4) * 100) },
    { nome: 'Engajamento da Equipe',  pct: Math.round(((mediaBloco(respostasDono, 'Engajamento da Equipe') - 1) / 4) * 100) },
  ]

  return (
    <div className="min-h-screen" style={{ background: '#fafbfc' }}>
      <RelatorioClient
        id={diag.id}
        empresa={diag.empresa}
        donoNome={diag.donoNome}
        funcionarios={diag.funcionarios}
        temLideres={diag.temLideres}
        liderRespondeu={diag.status === 'COMPLETO'}
        tokenLider={diag.tokenLider}
        score={r.scoreMaturidade}
        faixaRotulo={faixa.rotulo}
        faixaCor={faixa.cor}
        faixaResumo={faixa.resumo}
        pilares={pilares}
        gaps={r.gaps}
        cenarioTitulo={cenario.titulo}
        cenarioDirecionamento={cenario.direcionamento}
        relatorioAiInicial={diag.relatorioAi ?? ''}
      />
    </div>
  )
}
