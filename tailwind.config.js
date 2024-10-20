import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        '128': '34rem',
      }
    },

    screens:{
     '3xl': '1920px',
    }
    
  },

  plugins: [],

});


