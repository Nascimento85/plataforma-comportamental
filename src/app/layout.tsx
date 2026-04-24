import type { Metadata } from 'next'
import { Inter, Fraunces, DM_Sans, Cormorant_Garamond } from 'next/font/google'
import './globals.css'

// -- Legado (mantido para compatibilidade) ---------------------------------
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

// -- Design System Arquetipico --------------------------------------------
const dmSans = DM_Sans({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    style: ['normal', 'italic'],
    variable: '--font-dm-sans',
    display: 'swap',
})

const fraunces = Fraunces({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    style: ['normal', 'italic'],
    variable: '--font-fraunces',
    display: 'swap',
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
        default: 'Psique — Mapa Comportamental',
        template: '%s | Psique',
    },
    description:
        'Plataforma de mapeamento comportamental para empresas: DISC, MBTI, Eneagrama, Arquetipos Junguianos, Temperamentos e Linguagens do Amor.',
    keywords: ['DISC', 'MBTI', 'Eneagrama', 'arquetipos', 'Jung', 'avaliacao comportamental', 'RH', 'mapeamento comportamental'],
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
