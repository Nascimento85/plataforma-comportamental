// ============================================================
// POST /api/profile — Atualiza dados do perfil da empresa
// ============================================================
// Apenas o usuário autenticado pode atualizar seu próprio perfil.
// Email é READ-ONLY (não pode ser alterado por aqui).
// ============================================================

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/session'

const schema = z.object({
  name:          z.string().trim().min(2, 'Nome muito curto').max(120).optional(),
  phone:         z.string().trim().min(0).max(40).optional().nullable(),
  whatsapp:      z.string().trim().min(0).max(40).optional().nullable(),
  instagram:     z.string().trim().min(0).max(80).optional().nullable(),
  linkedin:      z.string().trim().min(0).max(120).optional().nullable(),
  birthDate:     z.string().optional().nullable(),
  addressStreet: z.string().trim().min(0).max(200).optional().nullable(),
  addressCity:   z.string().trim().min(0).max(100).optional().nullable(),
  addressState:  z.string().trim().min(0).max(100).optional().nullable(),
  addressZip:    z.string().trim().min(0).max(20).optional().nullable(),
  jobTitle:      z.string().trim().min(0).max(120).optional().nullable(),
  companyName:   z.string().trim().min(0).max(200).optional().nullable(),
})

export async function POST(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 })
    }

    const body = await request.json()
    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0].message },
        { status: 400 }
      )
    }

    const data = parsed.data

    // Normaliza strings vazias para null (consistência no banco)
    const normalize = (v?: string | null) => (v && v.trim().length > 0 ? v.trim() : null)

    const updated = await prisma.company.update({
      where: { id: session.id },
      data: {
        ...(data.name !== undefined        && { name: data.name }),
        phone:         normalize(data.phone),
        whatsapp:      normalize(data.whatsapp),
        instagram:     normalize(data.instagram),
        linkedin:      normalize(data.linkedin),
        birthDate:     data.birthDate ? new Date(data.birthDate) : null,
        addressStreet: normalize(data.addressStreet),
        addressCity:   normalize(data.addressCity),
        addressState:  normalize(data.addressState),
        addressZip:    normalize(data.addressZip),
        jobTitle:      normalize(data.jobTitle),
        companyName:   normalize(data.companyName),
      },
      select: {
        id: true, name: true, email: true, phone: true, whatsapp: true,
        instagram: true, linkedin: true, birthDate: true,
        addressStreet: true, addressCity: true, addressState: true, addressZip: true,
        jobTitle: true, companyName: true,
        isProfileCompletedRewarded: true,
      },
    })

    return NextResponse.json({ ok: true, profile: updated })
  } catch (err) {
    console.error('[api/profile]', err)
    return NextResponse.json({ error: 'Erro interno.' }, { status: 500 })
  }
}
