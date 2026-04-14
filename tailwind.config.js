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
        sans: ['Raleway', 'sans-serif'],
        heading: ['Montserrat', 'sans-serif'],
        mono: ['monospace'], 
      },
    },
  },
  plugins: [],
}