/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      spacing:{
        "custom-10":"10rem"
      }
    },
    fontFamily: {
      custom: ['"Roboto"', 'sans-serif'], // Replace 'Roboto' with your font name
    },
  
  },
  plugins: [],
}

