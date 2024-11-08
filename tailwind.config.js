import withMT from "@material-tailwind/react/utils/withMT";
import defaultTheme from "tailwindcss/defaultTheme"
export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        '128': '34rem',
      },
      colors: {
        'light-blue': '#DDEFF4',
        'base-blue': '#0396BF',
        'dark-gray-blue': '#C0D8DF',
        'dark-red': '#BF0306'
      },
    },
    screens:{
     '3xl': '1920px',
    },
    fontFamily: {
      sans: ['Ysabeau Office', defaultTheme.fontFamily.sans]
    },
  },

  plugins: [],

});


