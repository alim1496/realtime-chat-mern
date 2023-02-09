/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'login': "url('/bg-img.jpg')",
      }
    },
    fontFamily: {
      sans: ['Oxygen', 'sans-serif']
    }
  },
  plugins: [],
}
