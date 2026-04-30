import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PUBLIC_ROUTES = [
  '/',                 // landing page (LP unificada via rewrite)
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
  '/lp',               // LP unificada (acesso direto)
  '/lp.html',
  '/politica-de-privacidade',  // documento legal LGPD
  '/politica-de-cookies',       // documento legal LGPD
  '/termos-de-uso',             // documento legal
  '/api/auth/login',
  '/api/auth/logout',
  '/api/auth/register',
  '/api/auth/forgot-password',
  '/api/auth/reset-password',
  '/api/webhooks/stripe',  // webhook público — sem cookie de sessão
  '/api/cron',             // crons protegidos por Bearer CRON_SECRET, não por cookie
  '/api/premium/checkout', // checkout chamado da página pública /result/[id]
  '/api/results',          // submissão de teste — protegido por token único do Assessment
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Homepage: serve a LP unificada (substitui a antiga page.tsx azul/branca)
  if (pathname === '/') {
    return NextResponse.rewrite(new URL('/lp.html', request.url))
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
