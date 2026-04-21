// ============================================================
// NextAuth v5 — Configuração de autenticação
// ============================================================

import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'E-mail', type: 'email' },
        password: { label: 'Senha', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const parsed = z.object({
            email: z.string().email(),
            password: z.string().min(6),
          }).safeParse(credentials)

          if (!parsed.success) {
            console.log('[Auth] Credenciais inválidas:', parsed.error)
            return null
          }

          const { email, password } = parsed.data
          console.log('[Auth] Tentando login para:', email)

          const company = await prisma.company.findUnique({
            where: { email },
            select: { id: true, name: true, email: true, passwordHash: true, active: true },
          })

          if (!company) {
            console.log('[Auth] Empresa não encontrada:', email)
            return null
          }
          if (!company.active) {
            console.log('[Auth] Empresa inativa:', email)
            return null
          }

          const passwordMatch = await bcrypt.compare(password, company.passwordHash)
          if (!passwordMatch) {
            console.log('[Auth] Senha incorreta para:', email)
            return null
          }

          console.log('[Auth] Login bem-sucedido:', email)
          return {
            id: company.id,
            name: company.name,
            email: company.email,
          }
        } catch (error) {
          console.error('[Auth] ERRO no authorize:', error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token.id) {
        session.user.id = token.id as string
      }
      return session
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 dias
  },
})
