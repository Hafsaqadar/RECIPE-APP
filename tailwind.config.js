import daisyui from "daisyui"
/** @type {import('tailwindcss').Config} */
export default {
  important: true,
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  // safelist: [
  //   'bg-[#ECF7D4]', 'bg-[#D6F497]',
  //   'bg-[#F9EFE1]', 'bg-[#F7E0B8]',
  //   'bg-[#FBE5E7]', 'bg-[#FDC6C7]'
  // ],



  theme: {
    extend: {},
  },
  plugins: [ daisyui],
}
