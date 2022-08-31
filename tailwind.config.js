module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "blue",
      },
      container: {
        center: true,
        screens: {
          xl: "1200px",
          lg: "1200px"
        },
        padding: {
          DEFAULT: "20px",
        },
      },
    },
  },
  plugins: [
    // require('@tailwindcss/line-clamp'),
  ],
}