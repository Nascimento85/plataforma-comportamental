// ============================================================
// src/lib/manychat.ts
// Camada 5 — Automação de saída para ManyChat
//
// Estratégia:
//   - Quando o saldo de BÔNUS chega a 0  OU  o usuário completa o
//     primeiro teste, agendamos um ScheduledOutreach com
//     scheduledFor = now + 7 dias.
//   - Um cron (`/api/cron/process-outreach`) varre os pendentes a
//     cada 15min e envia o webhook para o ManyChat.
//
// O ManyChat espera "External Request" → POST com JSON. Aqui usamos
// API direta com o token Bearer; troque para n8n/Make se preferir.
// ============================================================

import { prisma } from '@/lib/prisma'

const MANYCHAT_BASE = 'https://api.manychat.com/fb'
const COUPON_50_OFF = process.env.STRIPE_COUPON_50_OFF ?? 'PASSAPORTE50'
const APP_URL       = process.env.NEXT_PUBLIC_APP_URL  ?? 'https://app.example.com'

// Tipos de gatilho que viram outreach
export type OutreachType =
  | 'ZERO_BALANCE_DAY7'   // saldo bônus chegou a 0
  | 'FIRST_TEST_DAY7'     // primeiro teste completado
  | 'PASSPORT_EXPIRED'    // passaporte expirou sem uso

interface OutreachPayload {
  companyId: string
  companyName: string
  email: string
  whatsapp?: string | null
  instagram?: string | null
  trigger: OutreachType
  couponCode: string
  couponUrl: string
  message: string
}

const REENGAGEMENT_MESSAGE =
  'Gostou do seu Mapa? Mapeie sua equipe ou família com 50% de desconto no pacote de 20 créditos.'

// ─── Helpers internos ──────────────────────────────────────────
function buildCouponUrl(companyId: string, coupon = COUPON_50_OFF) {
  const url = new URL(`${APP_URL}/dashboard/credits`)
  url.searchParams.set('coupon', coupon)
  url.searchParams.set('pack',   '20')
  url.searchParams.set('utm_source',   'manychat')
  url.searchParams.set('utm_medium',   'whatsapp')
  url.searchParams.set('utm_campaign', 'passaporte_reengajamento')
  url.searchParams.set('uid', companyId)
  return url.toString()
}

async function buildPayload(companyId: string, trigger: OutreachType): Promise<OutreachPayload | null> {
  const company = await prisma.company.findUnique({
    where: { id: companyId },
    select: { id: true, name: true, email: true, whatsapp: true, instagram: true },
  })
  if (!company) return null

  return {
    companyId:   company.id,
    companyName: company.name,
    email:       company.email,
    whatsapp:    company.whatsapp,
    instagram:   company.instagram,
    trigger,
    couponCode:  COUPON_50_OFF,
    couponUrl:   buildCouponUrl(company.id),
    message:     REENGAGEMENT_MESSAGE,
  }
}

// ─── API pública ───────────────────────────────────────────────
export async function scheduleOutreach(
  companyId: string,
  type: OutreachType,
  daysFromNow = 7,
) {
  // Idempotência: se já existe pendente do mesmo tipo, não duplica
  const exists = await prisma.scheduledOutreach.findFirst({
    where: { companyId, type, status: 'PENDING' },
  })
  if (exists) return exists

  const payload = await buildPayload(companyId, type)
  if (!payload) return null

  const scheduledFor = new Date()
  scheduledFor.setDate(scheduledFor.getDate() + daysFromNow)

  return prisma.scheduledOutreach.create({
    data: {
      companyId,
      type,
      scheduledFor,
      payload: payload as unknown as object,
    },
  })
}

export async function scheduleZeroBalanceOutreach(companyId: string) {
  return scheduleOutreach(companyId, 'ZERO_BALANCE_DAY7', 7)
}

export async function scheduleFirstTestOutreach(companyId: string) {
  return scheduleOutreach(companyId, 'FIRST_TEST_DAY7', 7)
}

export async function schedulePassportExpiredOutreach(companyId: string) {
  return scheduleOutreach(companyId, 'PASSPORT_EXPIRED', 0) // dispara assim que cron roda
}

// ─── Envio efetivo (chamado pelo cron) ────────────────────────
export async function deliverOutreach(outreachId: string): Promise<{ ok: boolean; error?: string }> {
  const o = await prisma.scheduledOutreach.findUnique({ where: { id: outreachId } })
  if (!o) return { ok: false, error: 'not_found' }
  if (o.status !== 'PENDING') return { ok: true } // já processado

  const token = process.env.MANYCHAT_API_TOKEN
  if (!token) {
    // Sem token: marca como FAILED para revisão manual em vez de loop
    await prisma.scheduledOutreach.update({
      where: { id: outreachId },
      data:  { status: 'FAILED', errorMsg: 'MANYCHAT_API_TOKEN ausente' },
    })
    return { ok: false, error: 'MANYCHAT_API_TOKEN ausente' }
  }

  // ManyChat: precisa do subscriber_id (PSID). Estratégia:
  //   1) Busca o subscriber por email (se você sincroniza emails como custom field)
  //   2) Ou armazene o PSID na Company quando o usuário interage no Instagram/WA
  //
  // Para simplificar este pack, usamos /sending/sendContent com user_ref via
  // custom field "external_id" = companyId. Adapte para seu fluxo.
  const payload = o.payload as unknown as OutreachPayload

  try {
    // 1) Resolve subscriber por external_id
    const findRes = await fetch(
      `${MANYCHAT_BASE}/subscriber/findByCustomField?field_id=${process.env.MANYCHAT_FIELD_EXTERNAL_ID}&field_value=${payload.companyId}`,
      { headers: { Authorization: `Bearer ${token}` } },
    )
    const findJson = await findRes.json()
    const subscriberId = findJson?.data?.[0]?.id
    if (!subscriberId) throw new Error('subscriber não encontrado no ManyChat')

    // 2) Atualiza custom fields (cupom + URL)
    await fetch(`${MANYCHAT_BASE}/subscriber/setCustomFields`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        subscriber_id: subscriberId,
        fields: [
          { field_id: process.env.MANYCHAT_FIELD_COUPON,     field_value: payload.couponCode },
          { field_id: process.env.MANYCHAT_FIELD_COUPON_URL, field_value: payload.couponUrl  },
          { field_id: process.env.MANYCHAT_FIELD_TRIGGER,    field_value: payload.trigger    },
        ],
      }),
    })

    // 3) Dispara o flow configurado no ManyChat (Trigger: "Passaporte 50% off")
    const sendRes = await fetch(`${MANYCHAT_BASE}/sending/sendFlow`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        subscriber_id: subscriberId,
        flow_ns:       process.env.MANYCHAT_FLOW_REENGAGE, // "content20240427154212_123456"
      }),
    })

    if (!sendRes.ok) {
      const txt = await sendRes.text()
      throw new Error(`ManyChat sendFlow ${sendRes.status}: ${txt}`)
    }

    await prisma.scheduledOutreach.update({
      where: { id: outreachId },
      data:  {
        status:   'SENT',
        sentAt:   new Date(),
        attempts: { increment: 1 },
        errorMsg: null,
      },
    })
    return { ok: true }
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'erro desconhecido'
    await prisma.scheduledOutreach.update({
      where: { id: outreachId },
      data:  {
        status:   o.attempts >= 4 ? 'FAILED' : 'PENDING',
        attempts: { increment: 1 },
        errorMsg: msg,
      },
    })
    return { ok: false, error: msg }
  }
}
