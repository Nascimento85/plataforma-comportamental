import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: {
    default: 'Plataforma Comportamental',
    template: '%s | Plataforma Comportamental',
  },
  description:
    'Avaliações comportamentais DISC, MBTI, Eneagrama e Temperamentos para empresas e equipes.',
  keywords: ['DISC', 'MBTI', 'Eneagrama', 'avaliação comportamental', 'RH', 'gestão de pessoas'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body>{children}</body>
    </html>
  )
}
