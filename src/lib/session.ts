// ============================================================
// Autenticação customizada com JWT + cookie HTTP-only
// Substitui NextAuth v5 beta (que tem bugs com Credentials)
// ============================================================

import crypto from 'crypto'
import { cookies } from 'next/headers'

const COOKIE_NAME = 'app-session'
const SEGREDO_DEV = 'dev-secret-super-seguro-apenas-para-teste-local'

/**
 * Segredo que assina o cookie de sessao.
 *
 * Em producao, se NEXTAUTH_SECRET faltar (variavel apagada, servico recriado,
 * deploy sem as envs) o app NAO pode cair no segredo de desenvolvimento: ele
 * esta publico no repositorio, e como o cookie carrega isAdmin, qualquer um
 * forjaria uma sessao de administrador. Melhor a rota falhar alto.
 *
 * A checagem e preguicosa de proposito: se fosse no topo do modulo, o build do
 * Next quebraria em ambientes que so injetam as envs em tempo de execucao.
 */
function segredo(): string {
  const s = process.env.NEXTAUTH_SECRET
  if (s) return s
  if (process.env.NODE_ENV === 'production') {
    throw new Error(
      'NEXTAUTH_SECRET ausente em producao. Configure a variavel no painel antes de servir sessoes.',
    )
  }
  return SEGREDO_DEV
}

export type SessionUser = {
  id: string
  name: string
  email: string
  isAdmin?: boolean
}

// ── JWT mínimo (HS256) usando apenas Node.js crypto ──────────

function b64url(str: string): string {
  return Buffer.from(str).toString('base64url')
}

function createToken(payload: object): string {
  const header = b64url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const body = b64url(JSON.stringify({ ...payload, iat: Math.floor(Date.now() / 1000) }))
  const sig = crypto
    .createHmac('sha256', segredo())
    .update(`${header}.${body}`)
    .digest('base64url')
  return `${header}.${body}.${sig}`
}

function verifyToken(token: string): Record<string, unknown> | null {
  const parts = token.split('.')
  if (parts.length !== 3) return null
  const [header, body, sig] = parts
  const expected = crypto
    .createHmac('sha256', segredo())
    .update(`${header}.${body}`)
    .digest('base64url')
  // Comparacao em tempo constante: `!==` vaza, pelo tempo de resposta, quantos
  // bytes iniciais da assinatura o atacante ja acertou.
  const a = Buffer.from(sig)
  const b = Buffer.from(expected)
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null
  try {
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString())
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) return null
    return payload
  } catch {
    return null
  }
}

// ── API pública ───────────────────────────────────────────────

export async function createSession(user: SessionUser): Promise<void> {
  const exp = Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60 // 30 dias
  const token = createToken({ user, exp })
  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
  })
}

export async function getSession(): Promise<SessionUser | null> {
  const token = cookies().get(COOKIE_NAME)?.value
  if (!token) return null
  const payload = verifyToken(token)
  if (!payload) return null
  return payload.user as SessionUser
}

export async function deleteSession(): Promise<void> {
  cookies().delete(COOKIE_NAME)
}
