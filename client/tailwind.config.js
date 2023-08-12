
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',"./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        electric: "Electric",
        electric2:"Electric2"
      },
    },
  },
  plugins: [require("flowbite/plugin")],
  darkMode: 'class'
};
