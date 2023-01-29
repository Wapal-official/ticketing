/** @type {import('tailwindcss').Config} */
module.exports = {
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
        "wapal-pink": "#EA59BE",
        "wapal-background": "#0E0D0D",
      },
    },
  },
  plugins: [],
};
