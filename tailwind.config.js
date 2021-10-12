const colors = require('tailwindcss/colors')

module.exports = {
  purge: [
    './components/**/*.tsx',
    './components/**/**/*.tsx',
    './components/**/**/**/*.tsx',
    './pages/**/*.tsx',
    './pages/*.tsx',
  ],

  darkMode: false, // or 'media' or 'class'
  theme: {
    //   colors: {
    //     transparent: 'transparent',
    //     primary: '#1e1e24',
    //     secondary: '#fb9f89',
    //     white: '#ffffff',
    //     black: '#000000',
    //     red: '#DF2D16',
    //     blue: '#5386E4',
    //     green: '3E8914',
    //     yellow: '#FFD166',
    //     gray: '#16151a'
    //   },
    backgroundColor: theme => ({
      ...theme('colors'),
      graybg: '#F8F8F8',
      greenbg: '#56C0A4'
    }),
    fontFamily: {
      body: ['"Open Sans"'],
      sans: ['Quicksand', 'Lato', 'sans-serif'],
      serif: ['Montserrat', 'serif']
    },
    extend: {
      colors: {
        transparent: 'transparent',
        greenie: '#56c0a4',
        bluie: '#0b629c',
        yellie: '#D9BA4B',
        lightBlue: colors.sky
      },
      width: {
        '30-p': '30%',
        '45-p': '45%'
      },
      minHeight: {
        40: '10rem'
      },
      zIndex: {
        99: 99,
        999: 999
      },
      height: {
        136: '34rem'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
