/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/*.{html,js}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      spacing: {
        "15": "3.75rem",
        "30": "7.5rem",
        standard: "1.25rem",
        thin: "2px",
        thick: "8px"
      },
      screens: {
        "2xl": "2560px",
        huge: "3000px"
      },
      fontSize: {
        normal: "14px",
        small: "12px",
        large: "24px"
      }
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp")
  ],
  presets: [
    require("./src/bechdel.theme")
  ]
}
