// ============================================================
// Utilitário de perfil — cálculo de preenchimento + helpers
// ============================================================
// Usado em:
//   - /dashboard/profile (status visual + libera botão de validação)
//   - /dashboard (banner gamificação)
//   - APIs (validação de elegibilidade ao código de validação)
// ============================================================

export interface ProfileFields {
  name?: string | null
  email?: string | null
  phone?: string | null
  whatsapp?: string | null
  instagram?: string | null
  linkedin?: string | null
  birthDate?: Date | null
  addressStreet?: string | null
  addressCity?: string | null
  addressState?: string | null
  addressZip?: string | null
  jobTitle?: string | null
  companyName?: string | null
}

/**
 * Lista dos campos OBRIGATÓRIOS para considerar perfil 100% preenchido.
 * Cada item conta como 1 ponto de progresso.
 *
 * Decisão:
 *   - Nome e e-mail são sempre preenchidos (vem do cadastro), conta como 2 base
 *   - Os campos novos do onboarding são os principais para a barra
 *   - Instagram e LinkedIn são opcionais → não entram no cálculo
 *   - Birth date é opcional → não entra no cálculo
 */
export const REQUIRED_PROFILE_FIELDS: (keyof ProfileFields)[] = [
  'name',
  'email',
  'phone',
  'whatsapp',
  'addressStreet',
  'addressCity',
  'addressState',
  'addressZip',
  'jobTitle',
  'companyName',
]

/** Retorna 0–100 — porcentagem de campos obrigatórios preenchidos. */
export function calculateProfileCompletion(profile: ProfileFields): number {
  const total  = REQUIRED_PROFILE_FIELDS.length
  const filled = REQUIRED_PROFILE_FIELDS.filter((field) => {
    const v = profile[field]
    return typeof v === 'string' ? v.trim().length > 0 : Boolean(v)
  }).length
  return Math.round((filled / total) * 100)
}

/** True quando o perfil tem TODOS os campos obrigatórios preenchidos. */
export function isProfileComplete(profile: ProfileFields): boolean {
  return calculateProfileCompletion(profile) === 100
}

/** Lista de campos faltantes (para feedback visual). */
export function missingProfileFields(profile: ProfileFields): (keyof ProfileFields)[] {
  return REQUIRED_PROFILE_FIELDS.filter((field) => {
    const v = profile[field]
    return typeof v === 'string' ? v.trim().length === 0 : !v
  })
}

/**
 * Gera código numérico de 6 dígitos para validação por e-mail.
 * Formato: '000000' a '999999' (sempre com zeros à esquerda).
 */
export function generateValidationCode(): string {
  const n = Math.floor(Math.random() * 1_000_000)
  return String(n).padStart(6, '0')
}
