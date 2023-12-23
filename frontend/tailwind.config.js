/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'theme_color': '#00ADEE',
        'content_background': '#EBF9FE',
        'supplement_color': '#132025',
        'icon_border': '#123C4D'
      }
    },
  },
  plugins: [],
}