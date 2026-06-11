import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // ── Legado (mantido para compatibilidade) ──────────────────────
        brand: {
          50:  '#f0f4ff',
          100: '#dde7ff',
          200: '#c3d2ff',
          300: '#9ab5ff',
          400: '#6a8fff',
          500: '#4466ff',
          600: '#2a47f5',
          700: '#2135e0',
          800: '#1f2eb5',
          900: '#1f2d8f',
          950: '#141c5c',
        },
        disc: {
          D: '#ef4444',
          I: '#f59e0b',
          S: '#22c55e',
          C: '#3b82f6',
        },

        // ── Design System Arquetípico (soul.*) ─────────────────────────
        soul: {
          // ── TEMA ESCURO corporate cinematic (flip de 11/jun/2026) ──
          ink:        '#f0ece3',   // texto principal (claro sobre carvão)
          cream:      '#17181c',   // fundo base (carvão)
          parchment:  '#1f2126',   // superfícies de cards (grafite)
          mist:       '#3a3d45',   // bordas, separadores, backgrounds hover
          night:      '#101c30',   // navy profundo (navegação, CTAs escuros)

          // Paleta cromática
          terracota:  '#d0764e',   // cor primária — ação, CTAs (clareada p/ dark)
          'terracota-dark':  '#a8522e',
          'terracota-light': '#d4744a',
          'terracota-muted': 'rgba(196,99,58,0.08)',

          amber:      '#d4943a',   // atenção, secundário quente
          'amber-light': '#e8b860',
          'amber-muted': 'rgba(212,148,58,0.10)',

          sage:       '#8fbf8f',   // sucesso, natureza (clareada p/ dark)
          'sage-light': '#96bf9a',
          'sage-muted': 'rgba(122,158,126,0.12)',

          indigo:     '#8fa6da',   // profundidade, insights (clareada p/ dark)
          'indigo-light': '#6b7fb8',
          'indigo-muted': 'rgba(61,79,124,0.10)',

          rose:       '#d99a91',   // detalhe feminino, alertas suaves (clareada p/ dark)
          'rose-light': '#d4a0a0',
          'rose-muted': 'rgba(196,122,114,0.10)',

          gold:       '#d4b35e',   // conquistas, XP, destaque premium (clareada p/ dark)
          'gold-light': '#e8c878',
          'gold-muted': 'rgba(201,168,76,0.12)',
        },
      },

      fontFamily: {
        sans:    ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        serif:   ['var(--font-fraunces)', 'Georgia', 'serif'],
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        // legado
        inter:   ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },

      fontSize: {
        xs:    ['0.8125rem', { lineHeight: '1.25rem' }],   // 13px
        sm:    ['0.9375rem', { lineHeight: '1.5rem' }],    // 15px
        base:  ['1rem',      { lineHeight: '1.625rem' }],  // 16px
        lg:    ['1.125rem',  { lineHeight: '1.75rem' }],   // 18px
        xl:    ['1.25rem',   { lineHeight: '1.875rem' }],  // 20px
        '2xl': ['1.5rem',    { lineHeight: '2rem' }],      // 24px
        '3xl': ['1.875rem',  { lineHeight: '2.375rem' }],  // 30px
        '4xl': ['2.25rem',   { lineHeight: '2.75rem' }],   // 36px
      },

      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.25rem',
        '4xl': '1.5rem',
      },

      boxShadow: {
        soul:  '0 2px 12px rgba(0,0,0,0.30)',
        'soul-md': '0 6px 24px rgba(0,0,0,0.35)',
        'soul-lg': '0 12px 40px rgba(0,0,0,0.42)',
        'soul-xl': '0 20px 60px rgba(0,0,0,0.50)',
        'gold':    '0 4px 16px rgba(201,168,76,0.28)',
        'terra':   '0 6px 18px rgba(196,99,58,0.28)',
      },

      backgroundImage: {
        'soul-sidebar': 'linear-gradient(180deg, #1c1a17 0%, #221e18 100%)',
        'soul-hero':    'linear-gradient(135deg, #1c1a17 0%, #2d2417 50%, #3d2a1c 100%)',
        'soul-gold':    'linear-gradient(135deg, #c9a84c, #d4943a)',
        'soul-terra':   'linear-gradient(135deg, #c4633a, #d4943a)',
        'soul-sage':    'linear-gradient(135deg, #7a9e7e, #96bf9a)',
        'soul-indigo':  'linear-gradient(135deg, #3d4f7c, #6b7fb8)',
      },

      animation: {
        'fade-up':    'fadeUp 0.4s ease both',
        'pulse-soft': 'pulseSoft 2.5s ease-in-out infinite',
      },

      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { boxShadow: '0 0 0 4px rgba(196,99,58,0.10)' },
          '50%':      { boxShadow: '0 0 0 8px rgba(196,99,58,0.06)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
