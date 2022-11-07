const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './templates/**/*.{html,twig,js}',
    './src/**/*.{vue,js,jsx}',
  ],
  darkMode:'class',
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
      'white': {
        DEFAULT: '#FFFFFF',
      },
      'black': {
        DEFAULT: '#000000',
      },
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
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.900'),
            a: {
              color: theme('colors.red.500'),
              '&:hover': {
                color: theme('colors.red.700'),
                textDecoration: 'none',
              },
            },
          },
        },
      }),
      // typography: {
      //   DEFAULT: {
      //     css: {
      //       color: '#333',
      //       a: {
      //         color: '#3182ce',
      //         '&:hover': {
      //           color: '#2c5282',
      //         },
      //       },
      //     },
      //   },
      // },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
