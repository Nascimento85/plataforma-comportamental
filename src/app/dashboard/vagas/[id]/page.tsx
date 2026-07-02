import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { getSession } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import PerfilVagaView from '../PerfilVagaView'
import type { PerfilVaga } from '@/lib/vaga/generate'

export const metadata: Metadata = { title: 'Perfil da Vaga' }
export const dynamic = 'force-dynamic'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prismaAny = prisma as any

export default async function VagaDetailPage({ params }: { params: { id: string } }) {
  const session = await getSession()
  if (!session?.id) redirect('/login')

  const vaga = await prismaAny.jobProfile.findUnique({
    where: { id: params.id },
  }) as { id: string; companyId: string; titulo: string; descricao: string; resultData: string } | null

  if (!vaga || vaga.companyId !== session.id) return notFound()

  let perfil: PerfilVaga | null = null
  try { perfil = JSON.parse(vaga.resultData) as PerfilVaga } catch { perfil = null }

  return (
    <div className="space-y-6 max-w-3xl">
      <Link href="/dashboard/vagas" className="text-sm font-sans transition-colors" style={{ color: 'rgba(240,236,227,0.68)' }}>
        ← Perfil Ideal da Vaga
      </Link>

      {perfil ? (
        <PerfilVagaView perfil={perfil} titulo={vaga.titulo} />
      ) : (
        <div className="bg-soul-parchment rounded-3xl p-8 text-center" style={{ border: '1px solid rgba(58,61,69,0.6)' }}>
          <p className="text-4xl mb-3">⚠️</p>
          <p className="font-serif font-semibold text-lg text-soul-ink">Não foi possível ler este perfil</p>
          <p className="text-sm font-sans mt-1" style={{ color: 'rgba(240,236,227,0.68)' }}>Tente gerar a vaga novamente.</p>
        </div>
      )}
    </div>
  )
}
