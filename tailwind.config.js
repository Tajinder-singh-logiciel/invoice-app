module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Ensure this points to your source files
  ],
  theme: {
    extend: {
      colors: {
        "sidebar-bg": "#1F2937", // Custom dark background for the sidebar
        "main-bg": "#111827", // Custom dark background for the main content
        "primary-purple": "#7C3AED", // Custom primary purple color
        "drawer-bg": "#1E2139", // Custom dark background for the drawer
        "input-bg": "#252945", // Custom dark background for the input

        // Adding colors from the image
        "purple-light": "#7C5DFA", // RGB: 124, 93, 250 | HSL: 252°, 94%, 67%
        purple: "#9277FF", // RGB: 146, 119, 255 | HSL: 252°, 100%, 73%
        "dark-blue": "#1E2139", // RGB: 30, 33, 57 | HSL: 233°, 31%, 17%
        "blue-dark": "#252945", // RGB: 37, 41, 69 | HSL: 233°, 30%, 21%
        "light-blue": "#DFE3FA", // RGB: 223, 227, 250 | HSL: 231°, 73%, 93%
        "grey-blue": "#888EB0", // RGB: 136, 142, 176 | HSL: 231°, 20%, 61%
        "light-grey-blue": "#7E88C3", // RGB: 126, 136, 195 | HSL: 231°, 37%, 63%
        "dark-grey": "#0C0E16", // RGB: 12, 14, 22 | HSL: 228°, 29%, 7%
        red: "#EC5757", // RGB: 236, 87, 87 | HSL: 0°, 80%, 63%
        pink: "#9277FF", // RGB: 255, 151, 151 | HSL: 0°, 100%, 80%
        "light-bg": "#F8F8FB", // RGB: 248, 248, 251 | HSL: 240°, 27%, 98%
        "black-grey": "#141625", // RGB: 20, 22, 37 | HSL: 233°, 30%, 11%
      },
    },
  },
  plugins: [],
};
