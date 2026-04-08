// tailwind.config.js
export default {
  darkMode: 'class', // <--- Esto permite activar el modo oscuro manualmente
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}