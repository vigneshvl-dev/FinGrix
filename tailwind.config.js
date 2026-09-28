/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        page: '#F7F9FC',
        surface: {
          DEFAULT: '#FFFFFF',
          secondary: '#F1F4F8',
          hover: '#F8FAFC',
        },
        border: {
          DEFAULT: '#D9E0E8',
          light: '#E5EAF0',
          dark: '#B0BCCB',
        },
        text: {
          primary: '#172033',
          secondary: '#667085',
          muted: '#94A3B8',
        },
        brand: {
          DEFAULT: '#1769E0',
          hover: '#1358BD',
          subtle: '#EBF3FE',
          active: '#D6E6FD',
        },
        nav: {
          dark: '#101828',
          text: '#475467',
        },
        risk: {
          DEFAULT: '#D92D20',
          subtle: '#FEF3F2',
          border: '#FECDCA',
        },
        warning: {
          DEFAULT: '#B7791F',
          subtle: '#FEF7EC',
          border: '#FDE68A',
        },
        success: {
          DEFAULT: '#198754',
          subtle: '#ECFDF3',
          border: '#A6F4C5',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(16, 24, 40, 0.06), 0 1px 2px 0 rgba(16, 24, 40, 0.04)',
        'modal': '0 12px 24px -4px rgba(16, 24, 40, 0.12), 0 4px 8px -2px rgba(16, 24, 40, 0.06)',
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
