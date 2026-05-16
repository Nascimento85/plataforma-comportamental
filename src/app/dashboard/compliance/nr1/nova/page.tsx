// ============================================================
// /dashboard/compliance/nr1/nova — formulario de nova coleta
// ============================================================

import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getSession } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import NovaColetaForm from './NovaColetaForm'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prismaAny = prisma as any

export const metadata: Metadata = { title: 'Nova coleta NR-1' }

export default async function NovaColetaPage() {
  const session = await getSession()
  if (!session?.id) redirect('/login')

  const setores = await prismaAny.nR1Setor.findMany({
    where: { companyId: session.id },
    orderBy: { nome: 'asc' },
  })

  return (
    <div className="space-y-6">
      <div>
        <Link href="/dashboard/compliance/nr1" className="text-[13px] font-semibold text-soul-terracota hover:underline">
          ← Coletas
        </Link>
        <h1 className="font-serif font-semibold text-3xl text-soul-ink mt-2 leading-tight">Nova coleta</h1>
        <p className="text-[15px] text-soul-ink/80 font-medium mt-1">
          Cadastre os setores, adicione os convidados e a gente gera os links anônimos.
        </p>
      </div>

      <NovaColetaForm setoresIniciais={setores} />
    </div>
  )
}
