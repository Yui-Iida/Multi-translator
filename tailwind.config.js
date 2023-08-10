/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["index.html", "./src/script.js"],
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
