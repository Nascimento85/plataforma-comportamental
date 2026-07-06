import type { Metadata } from 'next'
import ExperimenteClient from './ExperimenteClient'
import { resolveExperimenteTests } from '@/lib/experimente'

export const metadata: Metadata = {
  title: 'Experimente grátis — Psique · Mapa Comportamental',
  description: 'Faça até 2 testes comportamentais gratuitos, sem cadastro. Descubra seu perfil na hora.',
}

export const dynamic = 'force-dynamic'

interface PageProps {
  searchParams: { src?: string; tests?: string }
}

export default function ExperimentePage({ searchParams }: PageProps) {
  const src = (searchParams.src ?? '').trim() || null
  const tests = resolveExperimenteTests(searchParams.tests)

  return (
    <div className="min-h-screen" style={{ background: '#17181c' }}>
      {/* Header */}
      <header className="h-14 flex items-center px-6" style={{ background: 'rgba(23,24,28,0.92)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(58,61,69,0.7)' }}>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
               style={{ background: 'linear-gradient(135deg, #c9a84c, #d4943a)' }}>
            <svg viewBox="0 0 90 90" fill="none" className="w-4 h-4">
              <path d="M45 13L48.5 39.5L72 26L55.5 45L72 64L48.5 50.5L45 77L41.5 50.5L18 64L34.5 45L18 26L41.5 39.5Z"
                fill="rgba(255,255,255,0.3)" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
              <circle cx="45" cy="45" r="5" fill="white" opacity="0.9"/>
            </svg>
          </div>
          <span className="font-serif font-semibold text-base" style={{ color: '#f0ece3' }}>Psique <span style={{ color: 'rgba(240,236,227,0.7)' }} className="font-normal">— Mapa Comportamental</span></span>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8 space-y-8">
        {/* Hero */}
        <div className="text-center space-y-3">
          <span className="inline-block text-[12px] font-sans font-bold uppercase tracking-[0.18em] px-3 py-1 rounded-full"
                style={{ background: 'rgba(201,168,76,0.15)', color: '#e8c878' }}>
            Degustação gratuita
          </span>
          <h1 className="font-serif font-semibold text-3xl sm:text-4xl leading-tight" style={{ color: '#f0ece3' }}>
            Descubra seu perfil em minutos
          </h1>
          <p className="text-[15px] font-sans max-w-lg mx-auto" style={{ color: 'rgba(240,236,227,0.72)' }}>
            Escolha até 2 testes, responda na hora e veja seu resultado. Sem cadastro para começar.
            Se gostar, você cria sua conta e leva o mapa para o seu time inteiro.
          </p>
        </div>

        {/* Card do funil */}
        <div className="bg-soul-parchment rounded-3xl p-5 sm:p-7" style={{ border: '1px solid rgba(58,61,69,0.6)' }}>
          <ExperimenteClient src={src} tests={tests} />
        </div>

        <p className="text-center text-[12px] font-sans pb-4" style={{ color: 'rgba(240,236,227,0.4)' }}>
          Seus dados são usados apenas para enviar seu resultado e apresentar a plataforma.
        </p>
      </main>
    </div>
  )
}
