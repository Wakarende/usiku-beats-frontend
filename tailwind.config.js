/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      colors: {
        library: "#fcdc73",
        yellow: "#faf05d",
      },
    },
  },
  plugins: [require("@designbycode/tailwindcss-text-stroke")],
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
};
