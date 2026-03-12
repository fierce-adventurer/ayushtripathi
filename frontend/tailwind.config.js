/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#09090b', // Deep zinc/black
        surface: '#18181b',    // Slightly lighter for cards/sections
        textPrimary: '#f4f4f5', // Crisp off-white
        textSecondary: '#a1a1aa', // Muted gray for less important text
        accent: '#3b82f6',      // Electric blue for links and AI highlights
      },
      animation: {
        'cursor-blink': 'blink 1s step-end infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Clean, modern, deliberate font
      }
    },
  },
  plugins: [],
}