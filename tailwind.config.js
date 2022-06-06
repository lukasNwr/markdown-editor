module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.{js, ts, jsx, tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mainBg: "#161619",
        lightShade: "#2c2d30",
        darkShade: "#1e1f22",
        menuShade: "#36383e",
        whiteText: "#f0f1f2",
        lightText: "#98989C",
        darkText: "#6a6b6f",
        accent: "#d76d4c",
      },
      fontFamily: {
        manrope: ["Manrope", "sans-serif"],
        sourceCodePro: ["Source Code Pro", "monospace"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
