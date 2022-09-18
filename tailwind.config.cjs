/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}", "./*.html"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      xl: "976px",
      lg: "1440px",
    },
    extend: {
      colors: {
        darkModeElements: 'hsl(209, 23%, 22%)',
        darkModeBackground: 'hsl(207, 26%, 17%)',
        lightModeText: 'hsl(200, 15%, 8%)',
        lightModeInput: 'hsl(0, 0%, 52%)',
        lightModeBackground: 'hsl(0, 0%, 98%)',
        darkModeTextAndLightModeElements: 'hsl(0, 0%, 100%)'
      }
    },
  },
  plugins: [],
}
