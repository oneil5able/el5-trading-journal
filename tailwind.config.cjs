/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",   // all source files
    "./src/pages/**/*.{js,jsx,ts,tsx}", // pages folder (note lowercase)
    "./src/MainLayout.tsx",         // your layout
    "./src/Layout.jsx",             // if you still have Layout.jsx
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
