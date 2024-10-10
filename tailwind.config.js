/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: { colors: { primary: "#082032" ,secondary:'#2C394B', accent:'#FF4C29', onHover:'#e64425', onClick:'#cc3d21' , dropDown:'#334756'},
      boxShadow: {
        'custom-medium': '0 6px 12px rgba(0, 0, 0, 0.2)',
        'custom-strong': '0 8px 16px rgba(0, 0, 0, 0.4)',
      },
      screens: {
        'compare':'860px',
      },
     },
  },
  plugins: [],
};
