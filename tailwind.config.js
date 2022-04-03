const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './templates/**/*.{html,twig,js}',
    './src/**/*.{vue,js,jsx}',
  ],
  theme: {
    container: {
      center: true,
      padding:'1rem',
    },
    colors: {
      grayBrand: {
        light: '#DADADA',
        DEFAULT: '#373F41',
      },
      white: colors.white,
      black: colors.black,
      transparent: 'transparent',
      current: 'currentColor',
      green: colors.green,
      pink: colors.pink,
      purple: colors.purple,
      gray: colors.gray,
    },
    extend: {
      fontFamily: {
        'default':['HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', 'Helvetica', 'Arial', 'Lucida Grande', 'sans-serif'],
      },
      fontSize: {
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
