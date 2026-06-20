import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        base: '#020c1b',
        surface: '#071828',
        border: '#1a3f5c',
        blue: {
          accent: '#3b82f6',
          light: '#93c5fd',
        },
        emerald: {
          accent: '#10b981',
          light: '#6ee7b7',
        },
        text: {
          primary: '#f1f5f9',
          secondary: '#d0e4f7',
          muted: '#b0c8e0',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      backgroundImage: {
        'gradient-accent': 'linear-gradient(90deg, #3b82f6, #10b981)',
        'gradient-accent-diag': 'linear-gradient(135deg, #3b82f6, #10b981)',
      },
    },
  },
  plugins: [],
} satisfies Config
