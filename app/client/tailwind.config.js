/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './screens/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        oleo: ['Oleo Script', 'cursive'],
        karla: ['Karla', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: {
          dark: '#13334c', // Example custom primary color
          light: '#7D93CD',
          green: '#b6e08c',
          red: '#E9281F',
          lightblue: '#D3E5F9',
        },
        secondary: {
          light: '#FFD699', // Example custom secondary light color
          dark: '#7D93CD', // Example custom secondary dark color
          grey: '#F5F5F5',
        },
        grey: '#F1F1F1',
        lightgrey: '#F5F5F5',
        beige: '#fdfdf3',
        beigeTrans: '#fbfbf8f0',
        // Add more custom colors as needed
      },
    },
  },
  plugins: [],
};
