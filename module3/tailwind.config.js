const defaultTheme = require("tailwindcss/defaultTheme")

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
      colors: {
        primary: {
          "light": "#dae6e9",
          DEFAULT: "#0000ff",
          "dark": "#302b54"
        },
        default: "#ff8833",
        highlight: {
          DEFAULT: "#00FFFF",
          bright: "#80FFFF",
          dark: "#008080"
        }
      },
      fontSize: {
        normal: "14px",
        small: "12px",
        large: "24px"
      },
      fontFamily: {
        sans: ["Roboto", ...defaultTheme.fontFamily.sans]
      }
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp")
  ],
}
