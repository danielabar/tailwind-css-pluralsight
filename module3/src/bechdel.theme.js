const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  theme: {
    extends: {
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
      fontFamily: {
        sans: ["Roboto", ...defaultTheme.fontFamily.sans]
      }
    }
  }
}
