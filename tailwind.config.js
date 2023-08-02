/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["index.html", "./src/*.{html, js}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
