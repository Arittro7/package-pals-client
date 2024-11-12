/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        navBar: "0 2px 4px -1px rgba(0,0,0,0.25)",
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
};
