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
    },
  },
  plugins: [],
}

export default config
