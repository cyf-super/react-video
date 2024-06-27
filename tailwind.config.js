/** @type {import('tailwindcss').Config} */
import image from '@/assets/base64/image.json'

export default {
  content: ['./src/**/*.{tsx,,ts,jsx,js}'],
  theme: {
    extend: {
      backgroundImage: {},
      borderColor: {
        // 在这里添加您需要的边框颜色类
        primary: '#3490dc',
        secondary: '#6574cd',
        danger: '#e3342f',
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
    colors: {
      green: '#13ce66',
      // shallowPurple: '#9555ff',
      // deepPurple: '#7131d9',
      // gray: '#E5E5E6',
    },
    textColor: {
      white: '#fff',
      black: '#000',
    },
  },
  plugins: [],
}
