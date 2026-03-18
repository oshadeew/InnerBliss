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
        primary: {
          50: '#f5f0ff',
          100: '#ede5ff',
          200: '#ddd0ff',
          300: '#c4abff',
          400: '#a67bff',
          500: '#8b4fff',
          600: '#7c2dff',
          700: '#6d1ee6',
          800: '#5b19be',
          900: '#4c179b',
        },
        rose: {
          50: '#fff5f7',
          100: '#ffe0e6',
        },
        lavender: {
          50: '#f8f5ff',
          100: '#f0eaff',
          200: '#e8d5f5',
        },
        mint: {
          50: '#f0fff7',
          100: '#d5f5e8',
        },
        sky: {
          50: '#f0f8ff',
          100: '#d5e8f5',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'breathe': 'breathe 12s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'heartbeat': 'heartbeat 1s ease-in-out infinite',
      },
      keyframes: {
        breathe: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.7' },
          '25%': { transform: 'scale(1.4)', opacity: '1' },
          '50%': { transform: 'scale(1.4)', opacity: '1' },
          '75%': { transform: 'scale(1)', opacity: '0.7' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '14%': { transform: 'scale(1.15)' },
          '28%': { transform: 'scale(1)' },
          '42%': { transform: 'scale(1.15)' },
          '70%': { transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
