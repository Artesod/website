import type { Config } from 'tailwindcss'

// Colorway "Olivia Dark": black caps, rose legends, rose accent keys, cream novelties.
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ground: '#121012',
        panel: '#1b171b',
        well: '#0b090b',
        line: '#2f292e',
        blush: '#f3d9d4',
        muted: '#b7a5a6',
        rose: {
          DEFAULT: '#e8a2a8',
          side: '#b9757c',
          deep: '#d4848b',
        },
        cream: '#efe6dc',
      },
      fontFamily: {
        sans: ['Archivo', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        page: '78rem',
      },
    },
  },
  plugins: [],
} satisfies Config
