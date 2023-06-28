/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: "tw-",
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
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
        "primary-1":"#FB2576",
        "dark-0":"#C1C2C5",
        "dark-1":"#A6A7AB",
        "dark-2":"#909296",
        "dark-3":"#5D5F65",
        "dark-4":"#383A3F",
        "dark-5":"#2C2E33",
        "dark-6":"#25262B",
        "dark-7":"#1A1B1E",
        "dark-8":"#141517",
        "dark-9":"#101113",
      },
      screens: {
        "1xl": "1440px",
        "3xl": "1920px",
      },
    },
  },
  plugins: [],
};
