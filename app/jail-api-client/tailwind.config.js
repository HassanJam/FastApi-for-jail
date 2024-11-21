/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // This tells Tailwind to purge unused styles in production
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
