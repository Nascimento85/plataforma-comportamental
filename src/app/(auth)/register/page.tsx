import type { Metadata } from 'next'
import RegisterForm from './RegisterForm'

export const metadata: Metadata = { title: 'Criar Empresa — Mapa da Alma' }

export default function RegisterPage() {
  return (
    <main
      className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #1c1a17 0%, #2d2417 55%, #3d2a1c 100%)' }}
    >
      {/* Orb decorativo top-right */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 65%)', transform: 'translate(25%, -30%)' }}
      />
      {/* Orb decorativo bottom-left */}
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(196,99,58,0.10) 0%, transparent 65%)', transform: 'translate(-30%, 30%)' }}
      />

      {/* Mandala decorativa */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04]">
        <svg width="600" height="600" viewBox="0 0 90 90" fill="none">
          <circle cx="45" cy="45" r="42" stroke="white" strokeWidth="0.4" strokeDasharray="4 6"/>
          <circle cx="45" cy="45" r="32" stroke="white" strokeWidth="0.3"/>
          <circle cx="45" cy="45" r="22" stroke="white" strokeWidth="0.3"/>
          <path d="M45 3L48.5 39.5L82 26L55.5 45L82 64L48.5 50.5L45 87L41.5 50.5L8 64L34.5 45L8 26L41.5 39.5Z"
            fill="white" opacity="0.6"/>
        </svg>
      </div>

      <div className="w-full max-w-md relative z-10">

        {/* Logotipo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4"
               style={{ background: 'linear-gradient(135deg, #c9a84c, #d4943a)' }}>
            <svg viewBox="0 0 90 90" fill="none" className="w-8 h-8">
              <path
                d="M45 13L48.5 39.5L72 26L55.5 45L72 64L48.5 50.5L45 77L41.5 50.5L18 64L34.5 45L18 26L41.5 39.5Z"
                fill="rgba(255,255,255,0.3)" stroke="white" strokeWidth="1.5" strokeLinejoin="round"
              />
              <circle cx="45" cy="45" r="4" fill="white" opacity="0.9"/>
            </svg>
          </div>
          <h1 className="font-serif font-light text-2xl text-white mb-1">Mapa da Alma</h1>
          <p className="text-[12px] font-sans" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Cadastre sua empresa e comece a avaliar
          </p>
        </div>

        {/* Card de cadastro */}
        <div
          className="rounded-3xl p-7"
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <RegisterForm />

          <p className="mt-6 text-center text-xs font-sans" style={{ color: 'rgba(255,255,255,0.35)' }}>
            Já tem conta?{' '}
            <a href="/login"
               className="font-medium transition-colors hover:opacity-80"
               style={{ color: '#c9a84c' }}>
              Entrar
            </a>
          </p>
        </div>

        {/* Rodapé */}
        <p className="text-center text-[11px] mt-6 font-sans" style={{ color: 'rgba(255,255,255,0.2)' }}>
          Plataforma Comportamental Arquetípica
        </p>
      </div>
    </main>
  )
}
