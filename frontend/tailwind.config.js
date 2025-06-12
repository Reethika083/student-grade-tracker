/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // 🔥 this line enables dark mode based on a class
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
