/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
    "!./node_modules",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Funnel Display', 'sans-serif'],
        heading: ['Funnel Display', 'sans-serif'],
        ko: ['Diphylleia', 'serif'],
        mono: ['monospace'],
      },
    },
  },
  plugins: [],
}