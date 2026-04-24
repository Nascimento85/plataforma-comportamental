import type { Metadata } from 'next'
import { Inter, Fraunces, DM_Sans, Cormorant_Garamond } from 'next/font/google'
import './globals.css'

// ── Legado (mantido para compatibilidade) ─────────────────────────────
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

// ── Design System Arquetípico ──────────────────────────────────────────
const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['opsz'],
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400'],
  style: ['italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Psique — Mapa da Alma',
    template: '%s | Psique',
  },
  description:
    'Avaliações comportamentais arquetípicas: DISC, MBTI, Eneagrama, Arquétipos Junguianos e Linguagens do Amor.',
  keywords: ['DISC', 'MBTI', 'Eneagrama', 'arquétipos', 'Jung', 'avaliação comportamental', 'RH'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${dmSans.variable} ${fraunces.variable} ${cormorant.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
