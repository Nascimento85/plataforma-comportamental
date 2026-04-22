import type { Metadata } from 'next'
import LoginForm from './LoginForm'

export const metadata: Metadata = { title: 'Entrar' }

interface PageProps {
  searchParams: { registered?: string }
}

export default function LoginPage({ searchParams }: PageProps) {
  const justRegistered = searchParams.registered === '1'

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-50 to-gray-100 px-4">
      <div className="w-full max-w-md">
        {/* Logo / Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-600 text-white text-2xl font-bold mb-4">
            PC
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Plataforma Comportamental</h1>
          <p className="text-gray-500 mt-1 text-sm">Entre com a conta da sua empresa</p>
        </div>

        {/* Banner pós-cadastro */}
        {justRegistered && (
          <div className="mb-4 flex items-start gap-3 bg-green-50 border border-green-200 rounded-xl px-4 py-4">
            <span className="text-2xl flex-shrink-0">🎉</span>
            <div>
              <p className="text-sm font-semibold text-green-800">Conta criada com sucesso!</p>
              <p className="text-sm text-green-700 mt-0.5">
                Você já tem <strong>4 créditos de bônus</strong> para testar a plataforma.
                Faça login abaixo para começar.
              </p>
            </div>
          </div>
        )}

        {/* Card */}
        <div className="card p-8">
          <LoginForm />

          <p className="mt-6 text-center text-sm text-gray-500">
            Não tem conta?{' '}
            <a href="/register" className="text-brand-600 font-medium hover:underline">
              Criar empresa
            </a>
          </p>
        </div>
      </div>
    </main>
  )
}
