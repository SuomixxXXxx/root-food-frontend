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
        'dark-gray-blue': '#C0D8DF'
      },
    },
    screens:{
     '3xl': '1920px',
    },
    fontFamily: {
      sans: ['Ysabeau Office', defaultTheme.fontFamily.sans]
    },
    // valid:{
    //   'bg-light-blue': true,
    //   'bg-base-blue': true,
    //   'width-128': true,
    //   'screen-3xl': true,
    //   'font-family-sans': true,
    // }
  },

  plugins: [],

});


