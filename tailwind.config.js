module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        '77': '19rem',
      },
      gridTemplateColumns: {
        // Simple 16 column grid
        18: "repeat(18, minmax(0, 1fr))",
      },
      colors: {
        blue: {
          dark: "#1c2237",
          light: "#abb9c7",
          primary: "#7685b6",
          secondary: "#323244",
          base: "#212943",
        },
      },
      // fontFamily: {
      //   body: ["Open Sans"],
      // },
    
        fontFamily: {
          body: ['Source Sans Pro', "Open Sans" ],
          // 'serif': [...],
          // 'mono': [...]
        },
      
      gradientColorStops: ["active", "group-hover"],
    },
  },
  variants: {
    extend: {
      opacity: ["disabled"],
      cursor: ["disabled"],
      overflow: ["hover"],
      
    },
  },
  plugins: [],
};
