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
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px 0 rgba(0, 0, 0, 0.3)',
        'modal': '0 12px 24px -4px rgba(0, 0, 0, 0.6), 0 4px 8px -2px rgba(0, 0, 0, 0.4)',
      },
      borderRadius: {
        'subtle': '4px',
        'DEFAULT': '6px',
        'card': '8px',
      }
    },
  },
  plugins: [],
}
