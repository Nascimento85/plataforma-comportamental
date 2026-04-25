// ============================================================
// /dashboard/profile — Perfil + Gamificação
// ============================================================
// Server component: pega session → busca company → calcula
// preenchimento → renderiza ProfileForm (client) com tudo.
// ============================================================

import { getSession } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import { calculateProfileCompletion } from '@/lib/profile'
import ProfileForm from './ProfileForm'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Meu Perfil' }

export default async function ProfilePage() {
  const session = await getSession()
  if (!session) return null

  const company = await prisma.company.findUnique({
    where: { id: session.id },
    include: { creditBalance: true },
  })
  if (!company) return <p>Empresa não encontrada.</p>

  const completion = calculateProfileCompletion(company)
  const balance    = company.creditBalance?.balance ?? 0

  return (
    <div className="space-y-6 max-w-4xl">

      {/* ════════════════════════════════════════════════════════
          HEADER
      ════════════════════════════════════════════════════════ */}
      <div>
        <h1 className="font-serif font-semibold text-3xl md:text-4xl text-soul-ink leading-tight">
          Meu Perfil
        </h1>
        <p className="text-[15px] text-soul-ink/75 mt-1.5 font-medium">
          Mantenha suas informações atualizadas — algumas aparecem em relatórios e em comunicações da plataforma.
        </p>
      </div>

      {/* ════════════════════════════════════════════════════════
          FORM (client component — recebe dados serializáveis)
      ════════════════════════════════════════════════════════ */}
      <ProfileForm
        initial={{
          name:          company.name,
          email:         company.email,
          phone:         company.phone          ?? '',
          whatsapp:      company.whatsapp       ?? '',
          instagram:     company.instagram      ?? '',
          linkedin:      company.linkedin       ?? '',
          birthDate:     company.birthDate ? company.birthDate.toISOString().slice(0, 10) : '',
          addressStreet: company.addressStreet  ?? '',
          addressCity:   company.addressCity    ?? '',
          addressState:  company.addressState   ?? '',
          addressZip:    company.addressZip     ?? '',
          jobTitle:      company.jobTitle       ?? '',
          companyName:   company.companyName    ?? '',
        }}
        completion={completion}
        balance={balance}
        alreadyRewarded={company.isProfileCompletedRewarded}
      />
    </div>
  )
}
