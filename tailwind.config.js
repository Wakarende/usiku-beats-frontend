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
      medium: "376px",
      large: "768px",
      xl: "1024px",
    },
  },
  plugins: [require("@designbycode/tailwindcss-text-stroke")],
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  corePlugins: {
    animation: true,
  },
};
