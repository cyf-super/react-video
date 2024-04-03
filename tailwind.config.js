/** @type {import('tailwindcss').Config} */
import image from '@/assets/base64/image.json'

export default {
  content: ['./src/**/*.{tsx,,ts,jsx,js}'],
  theme: {
    extend: {
      backgroundImage: {
        // video: image.video,
      },
    },
    container: {
      center: true,
      margin: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '5rem',
        xl: '6rem',
        '2xl': '8rem',
      },
    },
    // colors: {
    //   // shallowPurple: '#9555ff',
    //   // deepPurple: '#7131d9',
    //   // gray: '#E5E5E6',
    // },
  },
  plugins: [],
}
