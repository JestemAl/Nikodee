/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./js/script.js"],
  theme: {
    extend: {
      colors: {
        'brownish': '#424242',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      boxShadow: {
        '13xl': 'inset 10px 18px 36px rgba(0, 0, 0, 0.25)',
        '12xl': '0px 0px 28px 2px rgba(255, 255, 255, 0.25)',
        '11xl': 'inset 0px 30px 60px -15px #000000',
        '10xl': 'inset -10px 18px 36px -18px #000000;',
        '9xl': '0 12px 13px -5px rgba(0, 0, 0, 0.9)',

      },
      fontFamily: {
        body: ['Inter', 'sans-serif'],
        inria: ['Inria Serif', 'sans-serif']
      },
      borderRadius: {
        '2xl': '1.1rem'
      },
    }
  },
  plugins: [],
}

