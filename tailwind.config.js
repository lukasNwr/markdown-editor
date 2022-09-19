module.exports = {
  mode: "jit",
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
        lightShadeHover: "#3D3E42",
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
      keyframes: {
        scale: {
          "0%": { transform: "scale(1)" },
          "65%": { transform: "scale(0.95)" },
          "80%": { transform: "scale(1.05)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        scale: "scale 500ms ease-in-out",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwind-scrollbar-hide"),
  ],
};
