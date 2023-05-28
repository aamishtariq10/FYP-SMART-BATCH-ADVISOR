/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js",
    "./node_modules/flowbite/*/.js",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#1a1a1a",
      },
      backgroundImage: {
        "welcome-image":
          "url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80')",
      },
    },
  },
  plugins: [
    // ...
    require("@tailwindcss/forms"),
    require("flowbite/plugin"),
  ],
};
