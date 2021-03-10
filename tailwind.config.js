module.exports = {
  purge: [
    './templates/**/*.html',
    './templates/**/*.twig',
    './src/**/*.vue',
    './src/**/*.jsx',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        'default':['HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', 'Helvetica', 'Arial', 'Lucida Grande', 'sans-serif'],
      },
      fontSize: {
      },
      colors: {
        grayBrand: {
          light: '#DADADA',
          DEFAULT: '#373F41',
        }
      },
    },
  },
  variants: {
    extend: {
      textColor: ['visited'],
    }
  },
}
