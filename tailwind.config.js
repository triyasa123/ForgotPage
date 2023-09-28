/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}','./test/**/*.{html,ts}'],
  theme: {
    fontFamily:{
      'sans': ['Helvetica', 'Arial', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'base', // only generate global styles
      strategy: 'class', // only generate classes
    }),
  ],
}

