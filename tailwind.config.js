/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      boxShadow: {
        '10xl': 'inset -10px 18px 36px -18px #000000;',
        '9xl': '0 12px 13px -5px rgba(0, 0, 0, 0.9)',
      }
    }
  },
  plugins: [],
}

