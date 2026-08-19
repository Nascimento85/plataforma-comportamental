// ============================================================
// Vínculo entre a degustação e a compra na Hotmart
// ============================================================
// A pessoa faz O Teste do Silêncio sem cadastro: o resultado nasce numa
// conta-vitrine, ligado apenas ao WhatsApp que ela digitou. Depois ela
// compra na Hotmart com o e-mail dela, e o webhook cria uma conta nova.
//
// Sem este vínculo, as duas pontas nunca se encontram: ela paga e cai
// numa conta vazia, sem o resultado que a levou a comprar, e você nunca
// descobre que aquela venda veio do funil.
//
// A ponte é o telefone. O Hotmart manda checkout_phone; a degustação
// guardou o WhatsApp. Comparamos só os dígitos finais, porque os dois
// lados formatam de jeitos diferentes (+55, DDD, espaços, traços).
// ============================================================

import { prisma } from '@/lib/prisma'
import { VITRINE_EMAIL } from '@/lib/experimente'

// O client Prisma gerado localmente pode estar atrás do schema (TrialLead
// entrou depois). Mesma saída que o resto do projeto usa para esse modelo.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prismaAny = prisma as any

/**
 * Gera as formas equivalentes de um telefone brasileiro para comparação.
 *
 * Cortar simplesmente os últimos dígitos seria mais curto e estaria errado:
 * descartaria o DDD, e dois números iguais em cidades diferentes passariam
 * a casar. Como o que está em jogo é anexar o resultado de um teste íntimo
 * à conta de outra pessoa, aqui o DDD fica e o que varia é só o nono dígito.
 */
export function chavesTelefone(bruto: string | null | undefined): string[] {
  let d = (bruto ?? '').replace(/\D+/g, '')
  if ((d.length === 12 || d.length === 13) && d.startsWith('55')) d = d.slice(2) // tira o país
  if (d.length < 10 || d.length > 11) return []

  const ddd = d.slice(0, 2)
  const numero = d.slice(2)
  const chaves = new Set<string>([ddd + numero])

  // Celular ora chega com o nono dígito, ora sem. As duas formas valem.
  if (numero.length === 9 && numero.startsWith('9')) chaves.add(ddd + numero.slice(1))
  if (numero.length === 8) chaves.add(ddd + '9' + numero)

  return [...chaves]
}

/** Dois telefones são a mesma pessoa se compartilham qualquer forma equivalente. */
export function mesmoTelefone(a: string | null | undefined, b: string | null | undefined): boolean {
  const ca = chavesTelefone(a)
  if (!ca.length) return false
  const cb = new Set(chavesTelefone(b))
  return ca.some((k) => cb.has(k))
}

export interface ResultadoVinculo {
  vinculado: boolean
  avaliacoes: number
  leadId?: string
}

/**
 * Procura uma degustação feita com o mesmo telefone e move o resultado
 * para a conta da compradora. Nunca lança: falhar aqui não pode derrubar
 * o provisionamento de uma venda.
 */
export async function vincularDegustacao(
  companyId: string,
  telefoneComprador: string | null | undefined,
): Promise<ResultadoVinculo> {
  if (!chavesTelefone(telefoneComprador).length) return { vinculado: false, avaliacoes: 0 }

  try {
    // Só leads que ainda não foram convertidos, do mais recente para o mais antigo.
    const candidatos: { id: string; whatsapp: string; firstToken: string | null }[] =
      await prismaAny.trialLead.findMany({
        where: { status: 'STARTED' },
        orderBy: { createdAt: 'desc' },
        take: 200,
        select: { id: true, whatsapp: true, firstToken: true },
      })
    const lead = candidatos.find((l) => mesmoTelefone(l.whatsapp, telefoneComprador))
    if (!lead || !lead.firstToken) return { vinculado: false, avaliacoes: 0 }

    // O token leva ao assessment, que leva ao employee anônimo da vitrine.
    const assessment = await prisma.assessment.findUnique({
      where: { token: lead.firstToken },
      select: { employeeId: true, employee: { select: { companyId: true, email: true } } },
    })
    if (!assessment) return { vinculado: false, avaliacoes: 0 }

    // Segurança: só movemos o que ainda pertence à conta-vitrine.
    const vitrine = await prisma.company.findUnique({
      where: { email: VITRINE_EMAIL },
      select: { id: true },
    })
    if (!vitrine || assessment.employee.companyId !== vitrine.id) {
      return { vinculado: false, avaliacoes: 0 }
    }

    const movidas = await prisma.$transaction(async (tx) => {
      await tx.employee.update({
        where: { id: assessment.employeeId },
        data:  { companyId },
      })
      const r = await tx.assessment.updateMany({
        where: { employeeId: assessment.employeeId },
        data:  { companyId },
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (tx as any).trialLead.update({
        where: { id: lead.id },
        data:  { status: 'CONVERTED', convertedCompanyId: companyId, convertedAt: new Date() },
      })
      return r.count
    })

    return { vinculado: true, avaliacoes: movidas, leadId: lead.id }
  } catch (err) {
    console.error('[hotmart/vinculo] falhou ao ligar degustação à compra:', err)
    return { vinculado: false, avaliacoes: 0 }
  }
}
