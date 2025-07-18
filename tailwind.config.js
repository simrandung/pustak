const { transform } = require('typescript');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out'
      },
      keyframes: {
        fadeIn: {
          '0%': {opacity:0, transform: 'translateY(30px)'},
          '100%':{opacity:1,transform: 'translateY(0)'}
        }
      }
    },
  },
  plugins: [],
}

