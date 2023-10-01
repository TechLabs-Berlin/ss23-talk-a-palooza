/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './screens/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: '#13334c', // Example custom primary color
          light: '#7D93CD',
          green: '#b6e08c',
        },
        secondary: {
          light: '#FFD699', // Example custom secondary light color
          dark: '#7D93CD', // Example custom secondary dark color
          grey: '#F5F5F5',
        },
        grey: '#F5F5F5',
        // Add more custom colors as needed
      },
    },
  },
  plugins: [],
};
