module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,ts,tsx,jsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      container: {
        center: true,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
