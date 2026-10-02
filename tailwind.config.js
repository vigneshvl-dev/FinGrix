/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        page: '#0A0D14',
        surface: {
          DEFAULT: '#12161F',
          secondary: '#181E29',
          hover: '#1F2635',
        },
        border: {
          DEFAULT: '#232B38',
          light: '#1E2532',
          dark: '#374151',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#9CA3AF',
          muted: '#6B7280',
        },
        brand: {
          DEFAULT: '#2563EB',
          hover: '#1D4ED8',
          subtle: '#172554',
          active: '#1E3A8A',
        },
        nav: {
          dark: '#080B10',
          text: '#9CA3AF',
        },
        risk: {
          DEFAULT: '#EF4444',
          subtle: '#361215',
          border: '#7F1D1D',
        },
        warning: {
          DEFAULT: '#F59E0B',
          subtle: '#36230C',
          border: '#78350F',
        },
        success: {
          DEFAULT: '#10B981',
          subtle: '#092F20',
          border: '#065F46',
        },
        gibson: '#FFFFFF',
      },
      fontFamily: {
        gibson: ['Gibson', 'Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        sans: ['Gibson', 'Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        card: '6px 6px 14px rgba(0, 0, 0, 0.65), -4px -4px 10px rgba(255, 255, 255, 0.04)',
        modal: '12px 12px 30px rgba(0, 0, 0, 0.8), -8px -8px 24px rgba(255, 255, 255, 0.05)',
        'neu-raised': '6px 6px 14px rgba(0, 0, 0, 0.65), -4px -4px 10px rgba(255, 255, 255, 0.04)',
        'neu-raised-sm': '3px 3px 8px rgba(0, 0, 0, 0.55), -2px -2px 6px rgba(255, 255, 255, 0.04)',
        'neu-raised-lg': '12px 12px 28px rgba(0, 0, 0, 0.75), -8px -8px 20px rgba(255, 255, 255, 0.05)',
        'neu-raised-hover': '8px 8px 18px rgba(0, 0, 0, 0.7), -5px -5px 14px rgba(255, 255, 255, 0.06)',
        'neu-inset': 'inset 3px 3px 7px rgba(0, 0, 0, 0.7), inset -2px -2px 6px rgba(255, 255, 255, 0.04)',
        'neu-inset-sm': 'inset 2px 2px 5px rgba(0, 0, 0, 0.65), inset -1px -1px 3px rgba(255, 255, 255, 0.03)',
        'neu-inset-deep': 'inset 5px 5px 12px rgba(0, 0, 0, 0.8), inset -4px -4px 10px rgba(255, 255, 255, 0.03)',
        'neu-glow-blue': '5px 5px 15px rgba(0, 0, 0, 0.6), -3px -3px 9px rgba(255, 255, 255, 0.04), 0 0 20px rgba(37, 99, 235, 0.35)',
        'neu-glow-emerald': '5px 5px 15px rgba(0, 0, 0, 0.6), -3px -3px 9px rgba(255, 255, 255, 0.04), 0 0 20px rgba(16, 185, 129, 0.35)',
        'neu-glow-red': '5px 5px 15px rgba(0, 0, 0, 0.6), -3px -3px 9px rgba(255, 255, 255, 0.04), 0 0 20px rgba(239, 68, 68, 0.35)',
        'neu-glow-amber': '5px 5px 15px rgba(0, 0, 0, 0.6), -3px -3px 9px rgba(255, 255, 255, 0.04), 0 0 20px rgba(245, 158, 11, 0.35)',
      },
      borderRadius: {
        'subtle': '4px',
        'DEFAULT': '8px',
        'card': '12px',
        'neu': '14px',
        'neu-lg': '20px',
      }
    },
  },
  plugins: [],
}
