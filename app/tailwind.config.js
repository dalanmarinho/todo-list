/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

const colorsCustom = {
  ...colors,
  ...{
    "custom-gray": {
      "100": "#F2F2F2",
      "200": "#D9D9D9",
      "300": "#808080",
      "400": "#333333",
      "500": "#262626",
      "600": "#1A1A1A",
      "700": "#0D0D0D",
    },
    "custom-purple": {
      DEFAULT: "#8284FA",
      "dark": "#5E60CE",
    },
    "custom-blue": {
      DEFAULT: "#4EA8DE",
      "dark": "#1E6F9F",
    }
  },
}

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'Inter': ['Inter', 'sans-serif'],
      },
    },
    colors: colorsCustom

  },
  plugins: [],
};

