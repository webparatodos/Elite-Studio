import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/app/(frontend)/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#0A0A0B',
          900: '#121214',
          800: '#1A1A1D',
          700: '#242428',
          600: '#333338',
        },
        accent: {
          DEFAULT: '#FF2E63',
          soft: '#FF6B93',
          dark: '#C7154A',
        },
        cyan: {
          DEFAULT: '#31E5E5',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        sans: ['var(--font-sans)', 'sans-serif'],
      },
      backgroundImage: {
        'grain-gradient':
          'radial-gradient(120% 120% at 50% 0%, rgba(255,46,99,0.12) 0%, rgba(10,10,11,0) 60%)',
      },
    },
  },
  plugins: [],
}

export default config
