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
      },
      height: {
        "7/100": "7%",
        "83/100": "83%",
        "1/10": "10%",
        "5v": "5vh",
        "10v": "10vh",
				"80v": "80vh",
        "90v": "90vh",
      },
      width: {
        "425": "425px"
      }
    },
    fontFamily: {
      sans: ['Oxygen', 'sans-serif']
    }
  },
  plugins: [],
}
