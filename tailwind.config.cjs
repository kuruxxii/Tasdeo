/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      "white": "#ffffff",
      "base": "rgba(23, 23, 25, 0.73)",
      "bright": "#EFEE56",
      "nav": "#303032",
    },
    extend: {},
  },
  plugins: [],
}