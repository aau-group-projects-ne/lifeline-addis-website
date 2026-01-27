/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: false, // 🔥 disables dark mode entirely
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#E01F29", // red color for buttons/links
        "background-light": "#f6f7f8",
      },
      fontFamily: {
        display: ["Manrope", "sans-serif"],
      },
    },
  },
  plugins: [],
};
