module.exports = {
  content: [
    './templates/**/*.{html,twig,js}',
    './src/**/*.{vue,js,jsx}',
  ],
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
}
