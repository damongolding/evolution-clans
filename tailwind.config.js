module.exports = {
  purge: {
    content : ["./pages/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}",],
    options :  {
      safelist : ['bg-outlaws','bg-knights','bg-storm', 'bg-fatebringers', 'border-outlaws','border-knights','border-storm', "border-fatebringers"]
    }
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors:{
        darkgrey:`#12171c`,
        darkblue:`#222933`,
        fatebringers: `#000`,
        outlaws: `#2A0035`,
        knights: `#DA0000`,
        storm: `#250061`,
        boot: `rgba(224, 39, 39, 0.89)`,
        yellow: `rgba(255, 206, 31, 1)`,
      },
      spacing: {
        "01": "0.25rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
