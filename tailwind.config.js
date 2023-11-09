/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      red: colors.red,
      green: colors.green,
      neutral: colors.neutral,
      blue: colors.blue,
      yellow: colors.yellow,
      primary: "#FFE4C8",
      secondary: "#311C10",
      brazil: "#158641",
      mexico: "#8D1E2E",
      ethiopia: "#928327",
      columbia: "#1C2B4E",
    },
    extend: {
      backgroundImage: {
        bgLogo: "url('/logo.svg')",
      },
    },
  },
  plugins: [],
};
