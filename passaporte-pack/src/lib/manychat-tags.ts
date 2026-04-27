// ============================================================
// src/lib/manychat-tags.ts
// Envia ao ManyChat a Tag do perfil DISC (perfil_D, perfil_I…)
// + dados do resultado (cor, perfil completo) — para que o flow
// do ManyChat dispare a sequência certa para cada perfil.
//
// Disparar este helper logo após criar o Result/Report.
// ============================================================

import { prisma } from '@/lib/prisma'

const MANYCHAT_BASE = 'https://api.manychat.com/fb'

// Mapa: testType + primaryProfile → tag única
const PROFILE_TAGS: Record<string, string> = {
  // DISC
  'DISC:D':         'perfil_D',
  'DISC:I':         'perfil_I',
  'DISC:S':         'perfil_S',
  'DISC:C':         'perfil_C',
  // Temperamentos
  'TEMPERAMENT:COLERICO':    'temp_colerico',
  'TEMPERAMENT:SANGUINEO':   'temp_sanguineo',
  'TEMPERAMENT:MELANCOLICO': 'temp_melancolico',
  'TEMPERAMENT:FLEUMATICO':  'temp_fleumatico',
  // Eneagrama: 1..9
  ...Object.fromEntries(Array.from({ length: 9 }, (_, i) => [`ENNEAGRAM:${i+1}`, `enea_${i+1}`])),
  // Linguagens do amor
  'LOVE_LANGUAGES:WORDS':       'amor_palavras',
  'LOVE_LANGUAGES:TIME':        'amor_tempo',
  'LOVE_LANGUAGES:GIFTS':       'amor_presente',
  'LOVE_LANGUAGES:SERVICE':     'amor_servico',
  'LOVE_LANGUAGES:TOUCH':       'amor_toque',
  // Arquétipos: 12 tipos (chave = nome interno)
  'ARCHETYPE:HERO':       'arq_heroi',
  'ARCHETYPE:LOVER':      'arq_amante',
  'ARCHETYPE:RULER':      'arq_governante',
  'ARCHETYPE:CREATOR':    'arq_criador',
  'ARCHETYPE:CAREGIVER':  'arq_cuidador',
  'ARCHETYPE:SAGE':       'arq_sabio',
  'ARCHETYPE:MAGICIAN':   'arq_mago',
  'ARCHETYPE:EXPLORER':   'arq_explorador',
  'ARCHETYPE:REBEL':      'arq_rebelde',
  'ARCHETYPE:JESTER':     'arq_bobo',
  'ARCHETYPE:INNOCENT':   'arq_inocente',
  'ARCHETYPE:ORPHAN':     'arq_pessoacomum',
}

/**
 * Envia a tag do perfil para o ManyChat.
 * Deve ser chamado logo após gerar o Result do assessment.
 */
export async function sendProfileTagToManyChat(args: {
  companyId:      string
  testType:       string  // 'DISC' | 'TEMPERAMENT' | …
  primaryProfile: string  // 'D' | 'COLERICO' | …
  resultId:       string
}) {
  const token = process.env.MANYCHAT_API_TOKEN
  if (!token) return { ok: false, error: 'MANYCHAT_API_TOKEN ausente' }

  const tagKey = `${args.testType}:${args.primaryProfile}`
  const tagName = PROFILE_TAGS[tagKey]
  if (!tagName) return { ok: false, error: `tag não mapeada: ${tagKey}` }

  // 1) Resolve subscriber por external_id (companyId)
  const fieldExternal = process.env.MANYCHAT_FIELD_EXTERNAL_ID
  if (!fieldExternal) return { ok: false, error: 'MANYCHAT_FIELD_EXTERNAL_ID ausente' }

  const company = await prisma.company.findUnique({
    where: { id: args.companyId },
    select: { name: true, email: true },
  })

  try {
    const findRes = await fetch(
      `${MANYCHAT_BASE}/subscriber/findByCustomField?field_id=${fieldExternal}&field_value=${args.companyId}`,
      { headers: { Authorization: `Bearer ${token}` } },
    )
    const findJson = await findRes.json()
    const subscriberId = findJson?.data?.[0]?.id
    if (!subscriberId) {
      return { ok: false, error: 'subscriber não encontrado no ManyChat' }
    }

    // 2) Adiciona a tag (cria a tag automaticamente se não existir)
    await fetch(`${MANYCHAT_BASE}/subscriber/addTagByName`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ subscriber_id: subscriberId, tag_name: tagName }),
    })

    // 3) Atualiza custom fields com info do perfil
    await fetch(`${MANYCHAT_BASE}/subscriber/setCustomFields`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        subscriber_id: subscriberId,
        fields: [
          { field_id: process.env.MANYCHAT_FIELD_TEST_TYPE,    field_value: args.testType },
          { field_id: process.env.MANYCHAT_FIELD_PROFILE_KEY,  field_value: args.primaryProfile },
          { field_id: process.env.MANYCHAT_FIELD_RESULT_URL,
            field_value: `${process.env.NEXT_PUBLIC_APP_URL}/result/${args.resultId}` },
        ],
      }),
    })

    return { ok: true, tag: tagName, subscriberId }
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'erro desconhecido'
    console.error('[manychat-tags] falhou:', msg)
    return { ok: false, error: msg }
  }
}
