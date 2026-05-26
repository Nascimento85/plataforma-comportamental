// ============================================================
// Auto-cálculo do perfil DISC dominante de um setor NR-1
//
// Lógica: cruza emails dos NR1Convite do setor com Employees
// que fizeram DISC COMPLETED na empresa. Calcula a moda dos
// perfis encontrados.
//
// PRIVACIDADE: o cruzamento é por email do CONVITE (identificado
// por design — admin sabe quem convidou). NÃO toca em NR1Resposta
// (que é anônima). Retorna apenas valor agregado (moda do setor).
// ============================================================

import { prisma } from '@/lib/prisma'
import type { DiscPerfil } from './types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prismaAny = prisma as any

const DISC_LETRAS: ReadonlyArray<DiscPerfil> = ['D', 'I', 'S', 'C']
// Ordem de desempate (caso 2 perfis tenham mesma frequência).
// Critério: D vence (decisão), depois C (qualidade/precisão), I, S.
const DESEMPATE_PRIORIDADE: ReadonlyArray<DiscPerfil> = ['D', 'C', 'I', 'S']

/**
 * Auto-calcula o perfil DISC dominante de um setor a partir dos
 * funcionários convidados que já fizeram DISC na plataforma.
 *
 * @returns 'D' | 'I' | 'S' | 'C' se houver pelo menos 1 DISC concluído
 *          entre os convidados, ou null caso contrário.
 */
export async function calcularDiscDominanteDoSetor(
  setorId:   string,
  companyId: string,
): Promise<DiscPerfil | null> {
  // 1. Coleta emails dos convidados do setor
  const convites = await prismaAny.nR1Convite.findMany({
    where:  { setorId, companyId },
    select: { email: true },
  })
  const emails: string[] = Array.from(
    new Set(
      (convites as Array<{ email: string }>)
        .map(c => c.email?.trim().toLowerCase())
        .filter(Boolean)
    )
  )
  if (emails.length === 0) return null

  // 2. Busca Assessments DISC COMPLETED dos Employees com esses emails
  //    na mesma empresa. Lê primaryProfile do Result.
  const assessments = await prisma.assessment.findMany({
    where: {
      companyId,
      testType: 'DISC',
      status:   'COMPLETED',
      employee: { email: { in: emails } },
      result:   { isNot: null },
    },
    select: {
      result: { select: { primaryProfile: true } },
    },
  })

  // 3. Coleta os perfis (filtra valores fora do enum DISC)
  const profiles: DiscPerfil[] = []
  for (const a of assessments) {
    const p = a.result?.primaryProfile?.trim().toUpperCase()
    if (p && (DISC_LETRAS as ReadonlyArray<string>).includes(p)) {
      profiles.push(p as DiscPerfil)
    }
  }
  if (profiles.length === 0) return null

  // 4. Calcula a moda (perfil mais frequente)
  const counts: Record<DiscPerfil, number> = { D: 0, I: 0, S: 0, C: 0 }
  for (const p of profiles) counts[p]++

  // Maior frequência
  const maxCount = Math.max(...Object.values(counts))

  // Em caso de empate, aplica ordem de desempate
  for (const p of DESEMPATE_PRIORIDADE) {
    if (counts[p] === maxCount) return p
  }

  return null
}

/**
 * Calcula em paralelo o DISC dominante de vários setores.
 * Retorna Map setorId → DiscPerfil | null.
 */
export async function calcularDiscDominantePorSetor(
  setores: Array<{ id: string }>,
  companyId: string,
): Promise<Map<string, DiscPerfil | null>> {
  const entries = await Promise.all(
    setores.map(async (s) => {
      const disc = await calcularDiscDominanteDoSetor(s.id, companyId)
      return [s.id, disc] as const
    })
  )
  return new Map(entries)
}
