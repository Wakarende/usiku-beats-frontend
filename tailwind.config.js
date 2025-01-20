/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      colors: {
        library: "#fcdc73",
        yellow: "#f1ea5c",
      },
    },
    screens: {
      small: "360px",
      medium: { min: "376px", max: "767px" },
      large: { min: "768px", max: "1023px" },
      xl: "1024px",
    },
  },
  plugins: [require("@designbycode/tailwindcss-text-stroke")],
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  corePlugins: {
    animation: true,
  },
};
