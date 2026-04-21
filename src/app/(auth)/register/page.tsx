import type { Metadata } from 'next'
import RegisterForm from './RegisterForm'

export const metadata: Metadata = { title: 'Criar Empresa' }

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-50 to-gray-100 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-600 text-white text-2xl font-bold mb-4">
            PC
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Criar conta</h1>
          <p className="text-gray-500 mt-1 text-sm">Cadastre sua empresa e comece a avaliar</p>
        </div>

        <div className="card p-8">
          <RegisterForm />

          <p className="mt-6 text-center text-sm text-gray-500">
            Já tem conta?{' '}
            <a href="/login" className="text-brand-600 font-medium hover:underline">
              Entrar
            </a>
          </p>
        </div>
      </div>
    </main>
  )
}
