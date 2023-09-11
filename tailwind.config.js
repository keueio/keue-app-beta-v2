/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.slate,
      primary: colors.lime,
      indigo: colors.indigo,
      green: colors.green,
      lime: colors.lime,
      yellow: colors.yellow,
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

