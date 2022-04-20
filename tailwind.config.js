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
      red: colors.red,
      gray: colors.gray,
    },
    extend: {
      fontFamily: {
        'default':['HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', 'Helvetica', 'Arial', 'Lucida Grande', 'sans-serif'],
      },
      fontSize: {
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#333',
            a: {
              color: '#3182ce',
              '&:hover': {
                color: '#2c5282',
              },
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
