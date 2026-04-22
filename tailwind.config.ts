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
          D: '#ef4444', // red
          I: '#f59e0b', // amber
          S: '#22c55e', // green
          C: '#3b82f6', // blue
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        xs:   ['0.875rem',  { lineHeight: '1.375rem' }],  // 14px (era 12px)
        sm:   ['1rem',      { lineHeight: '1.625rem' }],  // 16px (era 14px)
        base: ['1.125rem',  { lineHeight: '1.75rem'  }],  // 18px (era 16px)
        lg:   ['1.25rem',   { lineHeight: '1.875rem' }],  // 20px
        xl:   ['1.375rem',  { lineHeight: '2rem'     }],  // 22px
        '2xl':['1.5rem',    { lineHeight: '2.125rem' }],  // 24px
        '3xl':['1.875rem',  { lineHeight: '2.375rem' }],  // 30px
      },
    },
  },
  plugins: [],
}

export default config
