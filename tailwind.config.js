/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        swiftBlue: '#1a237e',
        swiftGold: '#ffc107',
      }
    },
  },
  plugins: [],
}