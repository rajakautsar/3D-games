module.exports = {
  content: [
    './resources/views/**/*.blade.php',
    './resources/js/**/*.js',
    './resources/css/**/*.css',
  ],
  theme: {
    extend: {
      colors: {
        dota: {
          gold: '#c8960c',
          red: '#8b0000',
          blue: '#4fc3f7',
          dark: '#050508'
        }
      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        rajdhani: ['Rajdhani', 'sans-serif']
      },
      backgroundImage: {
        'gold-gradient': "linear-gradient(90deg,#c8960c,#f5d060,#c8960c)"
      }
    }
  },
  plugins: [],
}
