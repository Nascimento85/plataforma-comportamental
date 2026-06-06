// ============================================================
// /dashboard/gestao-times/[id] — Matriz de Talentos de um time
// ============================================================

import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { getSession } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import { hasActiveSubscription } from '@/lib/subscription/check'
import MatrizClient from './MatrizClient'
import { scoreCombinado, classificarZona } from '@/content/gestao-times/disc-lideranca'

export const metadata: Metadata = { title: 'Matriz de Talentos · Psique' }
export const dynamic = 'force-dynamic'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prismaAny = prisma as any

export default async function MatrizPage({ params }: { params: { id: string } }) {
  const session = await getSession()
  if (!session?.id) redirect('/login')

  const subscriptionOk = await hasActiveSubscription(session.id)
  if (!session.isAdmin && !subscriptionOk) redirect('/dashboard/gestao-times')

  const team = await prismaAny.talentTeam.findUnique({
    where: { id: params.id },
    include: { members: { orderBy: { createdAt: 'asc' } } },
  })
  if (!team || team.companyId !== session.id) return notFound()

  // Employees da empresa com perfil DISC concluído, disponíveis para vincular
  const discAssessments = await prisma.assessment.findMany({
    where: { companyId: session.id, testType: 'DISC', status: 'COMPLETED' },
    orderBy: { completedAt: 'desc' },
    include: {
      employee: { select: { id: true, name: true } },
      result: { select: { primaryProfile: true } },
    },
  })

  // Dedup por employee (mantém o mais recente) e formata
  const seen = new Set<string>()
  const employeesDisponiveis: Array<{ employeeId: string; nome: string; perfilDisc: string }> = []
  for (const a of discAssessments) {
    if (!a.employee || seen.has(a.employee.id)) continue
    const p = a.result?.primaryProfile?.toUpperCase().charAt(0)
    if (!p || !['D', 'I', 'S', 'C'].includes(p)) continue
    seen.add(a.employee.id)
    employeesDisponiveis.push({ employeeId: a.employee.id, nome: a.employee.name, perfilDisc: p })
  }

  // Classifica cada membro (zona automática, a menos que o gestor tenha fixado manualmente)
  type RawMember = {
    id: string; nome: string; cargo: string | null; perfilDisc: string | null
    notaPerformance: number | null; fitComportamental: number | null; potencial: number | null
    avaliacaoJson: string | null
    zona: string | null; zonaManual: boolean
  }
  const members = (team.members as RawMember[]).map((m) => {
    const score = scoreCombinado(m.notaPerformance, m.fitComportamental)
    const zonaAuto = classificarZona(score)
    const zonaFinal = m.zonaManual && m.zona ? m.zona : zonaAuto
    let avaliacaoRespostas: Record<number, number> = {}
    if (m.avaliacaoJson) {
      try { avaliacaoRespostas = (JSON.parse(m.avaliacaoJson).respostas ?? {}) as Record<number, number> } catch { /* ignore */ }
    }
    return {
      id: m.id,
      nome: m.nome,
      cargo: m.cargo,
      perfilDisc: m.perfilDisc,
      notaPerformance: m.notaPerformance,
      fitComportamental: m.fitComportamental,
      potencial: m.potencial,
      score,
      zona: zonaFinal,
      zonaManual: m.zonaManual,
      avaliacaoRespostas,
      temAvaliacao: Object.keys(avaliacaoRespostas).length > 0,
    }
  })

  return (
    <MatrizClient
      teamId={team.id}
      teamNome={team.nome}
      teamDescricao={team.descricao}
      members={members}
      employeesDisponiveis={employeesDisponiveis}
    />
  )
}
