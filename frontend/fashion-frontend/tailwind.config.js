/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'bebas': ['"Bebas Neue"', 'sans-serif'],
        'ysabeau': ['"Ysabeau Infant"', 'sans-serif'],
        'zalando': ['"Zalando Sans SemiExpanded"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
