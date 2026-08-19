import type { Metadata } from 'next'
import { Inter, Fraunces, DM_Sans, Cormorant_Garamond, Newsreader, Albert_Sans } from 'next/font/google'
import './globals.css'
import CookieBanner from '@/components/legal/CookieBanner'

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

// -- Identidade da marca (direção 1b do design system) --------------------
// Newsreader nos títulos, Albert Sans na interface. É o par definido no
// canvas de identidade e usado na home e nas telas de entrada.
const newsreader = Newsreader({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600'],
    style: ['normal', 'italic'],
    variable: '--font-newsreader',
    display: 'swap',
})

const albertSans = Albert_Sans({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-albert',
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
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://mapacomportamental.com'),
    // Sem og:image, todo link colado no WhatsApp/Instagram aparecia como caixa
    // vazia. As paginas com dado pessoal sobrescrevem isto com robots noindex.
    openGraph: {
        type: 'website',
        locale: 'pt_BR',
        siteName: 'Mapa Comportamental',
        title: 'Psique — Mapa Comportamental',
        description:
            'Entenda como você decide, lidera e se relaciona: 15 avaliações comportamentais com devolutiva completa.',
        images: [{ url: '/og-mapa.png', width: 1200, height: 630, alt: 'Mapa Comportamental' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Psique — Mapa Comportamental',
        description:
            'Entenda como você decide, lidera e se relaciona: 15 avaliações comportamentais com devolutiva completa.',
        images: ['/og-mapa.png'],
    },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html
            lang="pt-BR"
            className={`${inter.variable} ${dmSans.variable} ${fraunces.variable} ${cormorant.variable} ${newsreader.variable} ${albertSans.variable}`}
        >
            <body>
                {children}
                <CookieBanner />
            </body>
        </html>
    )
}
