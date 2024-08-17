/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: "#111B47",
        secondary: "rgba(6, 62, 85, 0.72)",
        "secondary-1": "#063E55",
        tertiary: "#129197",
      },
      fontFamily: {
        body: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
