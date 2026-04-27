import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PUBLIC_ROUTES = [
  '/',                 // landing page
  '/login',
  '/register',
  '/forgot-password',  // recuperação de senha
  '/reset-password',   // redefinição de senha (com token)
  '/test',
  '/result',           // página pública de resultado — sem login
  '/amor',             // landing page relacionamentos
  '/amor.html',
  '/empresas',         // landing page corporativa
  '/empresas.html',
  '/kenionascimento-unificada',         // LP unificada (acesso direto)
  '/kenionascimento-unificada.html',
  '/api/auth/login',
  '/api/auth/logout',
  '/api/auth/register',
  '/api/auth/forgot-password',
  '/api/auth/reset-password',
  '/api/webhooks/stripe',  // webhook público — sem cookie de sessão
]

const KENIO_HOSTS = new Set([
  'kenionascimento.com',
  'www.kenionascimento.com',
])

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const host = (request.headers.get('host') || '').toLowerCase()

  // Routing por hostname: kenionascimento.com serve a LP unificada na raiz
  if (KENIO_HOSTS.has(host) && pathname === '/') {
    return NextResponse.rewrite(new URL('/kenionascimento-unificada.html', request.url))
  }

  // Rotas públicas (sem auth)
  const isPublic = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + '/')
  )
  if (isPublic) return NextResponse.next()

  // Verifica cookie de sessão
  const session = request.cookies.get('app-session')?.value
  if (!session) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
