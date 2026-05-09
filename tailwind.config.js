/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mango: {
          light: '#F4A12E',
          DEFAULT: '#F4A12E',
          dark: '#E67E22',
        },
        leaf: '#2ECC71',
        softYellow: '#FFD966',
        neutral: {
          white: '#FFFFFF',
          black: '#1E1E1E',
          gray: '#F6F6F6',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Roboto', 'sans-serif'],
        heading: ['Poppins', 'Montserrat', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
