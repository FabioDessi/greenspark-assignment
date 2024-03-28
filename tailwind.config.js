/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    extend: {
      boxShadow: {
        'gs-shadow': '0px 4px 4px 0px rgba(0, 0, 0, 0.01)'
      },
      colors: {
        'gs-blue': '#2e3a8c',
        'gs-green': '#3B755F',
        'gs-beige': '#F2EBDB',
        'gs-black': '#212121',
        'gs-white': '#F9F9F9',
        'gs-light-green': '#afc6bd'
      },
      fontFamily: {
        cabin: ['Cabin', 'sans-serif', 'system-ui']
      }
    }
  },
  plugins: []
}
