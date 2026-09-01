/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: {
          950: '#06070B',
          900: '#0B0D14',
          850: '#111522',
          800: '#171D2F',
          700: '#252F4A',
          cyan: '#00F2FE',
          purple: '#7928CA',
          emerald: '#10B981',
          gold: '#F59E0B',
          shadow: 'rgba(11, 13, 20, 0.85)'
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glow-cyan': '0 0 25px -5px rgba(0, 242, 254, 0.3)',
        'glow-purple': '0 0 25px -5px rgba(121, 40, 202, 0.4)',
        'glow-gold': '0 0 25px -5px rgba(245, 158, 11, 0.3)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
      },
      backdropBlur: {
        'glass': '16px',
      }
    },
  },
  plugins: [],
}
