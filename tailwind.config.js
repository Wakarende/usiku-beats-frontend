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
      sm: { max: "395px" },
      md: { min: "400px", max: "640px" },
      lg: { min: "641px", max: "1023px" },
      xl: { min: "1024px" },
    },
  },
  plugins: [require("@designbycode/tailwindcss-text-stroke")],
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  corePlugins: {
    animation: true,
  },
};
