import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PUBLIC_ROUTES = [
  '/',                 // landing page (nova home preto/dourado via rewrite p/ /inicio.html)
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
  '/inicio',           // nova home preto/dourado (hub completo)
  '/inicio.html',
  '/lp',               // LP antiga (mantida acessível para histórico)
  '/lp.html',
  '/playbook',         // playbooks gratuitos (contratacao, nr1)
  '/nr1',              // coleta NR-1 anônima por token público (LGPD/CFP)
  '/avaliar-lider',    // avaliação de liderança anônima por token público
  '/api/lider',        // APIs públicas da avaliação de liderança (convite + respostas)
  '/avaliacao-360',    // coleta 360° por token público (auto/gestor/pares/subordinados)
  '/api/avaliacao-360',// APIs públicas da avaliação 360° (respostas)
  '/enps',             // coleta eNPS anônima por token público
  '/api/enps',         // APIs públicas do eNPS (respostas)
  '/diagnostico-pme',  // diagnóstico de liderança PME (lead gen público)
  '/api/diagnostico-pme', // APIs públicas do diagnóstico PME
  '/experimente',      // degustação via QR Code (palestras) — sem cadastro
  '/api/experimente',  // API pública do funil de degustação
  '/precos',           // landing pública de planos PJ
  '/politica-de-privacidade',  // documento legal LGPD
  '/politica-de-cookies',       // documento legal LGPD
  '/termos-de-uso',             // documento legal
  '/api/auth/login',
  '/api/auth/logout',
  '/api/auth/register',
  '/api/auth/forgot-password',
  '/api/auth/reset-password',
  '/api/webhooks/stripe',  // webhook público — sem cookie de sessão
  '/api/webhooks/stripe-subscription',  // webhook de assinatura — sem cookie de sessão
  '/api/webhooks/hotmart', // webhook Hotmart — protegido por X-HOTMART-HOTTOK
  '/api/cron',             // crons protegidos por Bearer CRON_SECRET, não por cookie
  '/api/premium/checkout', // checkout chamado da página pública /result/[id]
  '/api/results',          // submissão de teste — protegido por token único do Assessment
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const host = request.headers.get('host') ?? ''

  // Canonical: redireciona www.mapacomportamental.com → mapacomportamental.com
  // com 301 (permanente, bom para SEO). Preserva path + query.
  if (host.startsWith('www.')) {
    const apexHost = host.slice(4) // remove "www."
    const target = new URL(request.url)
    target.host = apexHost
    return NextResponse.redirect(target, 301)
  }

  // Homepage: serve a NOVA home preto/dourado (hub completo com 9 testes,
  // NR-1, downloads gratuitos e CTAs neurovendas). Antes apontava p/ /lp.html.
  if (pathname === '/') {
    return NextResponse.rewrite(new URL('/inicio.html', request.url))
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
