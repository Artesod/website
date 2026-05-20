import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        base: '#020c1b',
        surface: '#040f1f',
        border: '#0f2d4a',
        blue: {
          accent: '#2563eb',
          light: '#60a5fa',
        },
        emerald: {
          accent: '#10b981',
          light: '#6ee7b7',
        },
        text: {
          primary: '#f1f5f9',
          secondary: '#64748b',
          muted: '#475569',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      backgroundImage: {
        'gradient-accent': 'linear-gradient(90deg, #2563eb, #10b981)',
        'gradient-accent-diag': 'linear-gradient(135deg, #2563eb, #10b981)',
      },
    },
  },
  plugins: [],
} satisfies Config
