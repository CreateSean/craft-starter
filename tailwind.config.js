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
