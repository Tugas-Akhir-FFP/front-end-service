/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        bg1: "url('/src/assets/background1.png')",
        bgCloud: "url('/src/assets/cloud.jpg')",
        bgOrange: "url('/src/assets/orange.jpg')",
        bgWind: "url('/src/assets/wind.jpg')",
        bgRain: "url('/src/assets/rainfall.jpg')",
        forest: "url('/src/assets/Landing.jpg')",
        asap: "url('/src/assets/asep.jpg')",
        telu: "url('/src/assets/telu.png')",
      },
     
    },
  },
  plugins: [],
}