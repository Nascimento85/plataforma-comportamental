// ============================================================
// /dashboard/testes — Catálogo unificado de testes.
// Funde as 5 páginas de categoria numa vitrine única com
// filtro por categoria + busca. As páginas de categoria seguem
// no ar como aprofundamento (linkadas em cada aba).
// ============================================================

import type { Metadata } from 'next'
import { getSession } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import { TEST_COUNT } from '@/lib/test-labels'
import CatalogClient from './CatalogClient'
import type { CatalogCategory } from '@/content/test-catalog'

export const metadata: Metadata = { title: 'Catálogo de Testes' }

const VALID_CATS = new Set(['BEHAVIORAL', 'LEADERSHIP', 'CAREER', 'RELATIONSHIPS', 'ARCHETYPES'])

interface PageProps {
  searchParams: { cat?: string }
}

export default async function TestesPage({ searchParams }: PageProps) {
  const session = await getSession()
  const company = await prisma.company.findUnique({
    where: { id: session!.id },
    select: { type: true },
  })
  const accountType: 'PF' | 'PJ' = company?.type === 'PF' ? 'PF' : 'PJ'

  const initialCategory = VALID_CATS.has(searchParams.cat ?? '')
    ? (searchParams.cat as CatalogCategory)
    : null

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif font-semibold text-4xl text-soul-ink leading-tight">
          Catálogo de <span className="text-soul-terracota italic font-normal">Testes</span>
        </h1>
        <p className="text-base text-soul-ink/85 mt-2 font-medium max-w-3xl">
          Os {TEST_COUNT} instrumentos da plataforma em um só lugar. Filtre por categoria,
          compare lado a lado e envie — ou faça — o teste certo para cada pergunta.
        </p>
      </div>

      <CatalogClient accountType={accountType} initialCategory={initialCategory} />
    </div>
  )
}
