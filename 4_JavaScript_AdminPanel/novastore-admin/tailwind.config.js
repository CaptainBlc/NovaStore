/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#E8EAF6',
          100: '#C5CAE9',
          500: '#3949AB',
          600: '#303F9F',
          700: '#283593',
          800: '#1A237E',
          900: '#0D1B5E',
        },
        accent: {
          400: '#FF8A00',
          500: '#FF6D00',
          600: '#E65100',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
