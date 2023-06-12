/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{tsx,,ts,jsx,js}'],
  theme: {
    extend: {},
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '5rem',
        xl: '6rem',
        '2xl': '8rem',
      },
    },
  },
  plugins: [],
}
