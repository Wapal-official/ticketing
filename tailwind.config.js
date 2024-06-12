/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: "tw-",
  content: [
    "./components/**/*.vue",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.ts",
    "./nuxt.config.js",
  ],
  theme: {
    extend: {
      colors: {
        "wapal-gray": "#D9D9D9",
        "wapal-primary-blue": "#0029BC",
        "wapal-secondary-blue": "#030537",
        "modal-gray": "#545454",
        error: "#D03050",
        "wapal-pink": "#FF36AB",
        "wapal-background": "#0E0D0D",
        "wapal-success": "#1C452C",
        "wapal-danger": "#7B0707",
        "primary-1": "#8759FF",
        "primary-2": "#9D80FF",
        "primary-tint": "#9D80FF",
        "primary-dark": "#2D2545",
        "primary-light": "#C6BDFF",
        "dark-0": "#C1C2C5",
        "dark-1": "#A6A7AB",
        "dark-2": "#909296",
        "dark-3": "#5D5F65",
        "dark-4": "#383A3F",
        "dark-5": "#2C2E33",
        "dark-6": "#25262B",
        "dark-7": "#1A1B1E",
        "dark-8": "#141517",
        "dark-9": "#101113",
        "utility-red": "#FF5449",
        "utility-green": "#8CD867",
        "utility-yellow": "#FFAD05",
        loonies: {
          primary: "#5B180F",
          "bg-1": "#F8F0E4",
          "bg-2": "#C9AFA4",
        },
      },
      screens: {
        "1xl": "1440px",
        "3xl": "1920px",
      },
      fontFamily: {
        oswald: ["Oswald"],
      },
    },
  },
  plugins: [],
};
