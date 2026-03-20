/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#222222',
          gray: '#555555',
          lightgray: '#888888',
          red: '#c8102e',
          bg: '#f7f8fa', // The very light grey background seen behind the card
          card: '#ffffff'
        }
      },
      fontFamily: {
        sans: ['Roboto', 'Arial', 'Helvetica', 'sans-serif'], 
      },
      boxShadow: {
        'modern-card': '0 10px 40px -10px rgba(0,0,0,0.08)', // The soft, diffuse shadow from the screenshot
      }
    },
  },
  plugins: [],
}
