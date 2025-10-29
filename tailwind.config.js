/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#dc2626", // red-600 as primary
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
};
