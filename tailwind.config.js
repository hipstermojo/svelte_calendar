module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    fontFamily: {
      'body': ['Poppins', 'sans-serif']
    },
    extend: {
      colors: {
        'bright-yellow': '#ffbd2a'
      },
      height: {
        102: '28rem'
      },
      screens: {
        'xs': {
          'max': '639px'
        }
      }
    },
  },
  variants: {},
  plugins: [],
}