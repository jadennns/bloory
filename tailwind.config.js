// COLORS PALLETE ARE FROM DOGEHOUSE TV SOURCE
// https://github.com/benawad/dogehouse/blob/staging/kibbeh/src/styles/globals.css

module.exports = {
  content: ["./src/pages/**/*.tsx", "./src/components/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        swatch: {
          1: "#236bfd",
          2: "#1c1e1f",
          3: "#181a1c",
          4: "rgba(22,24,25,255)",
          5: "#27292d",
          6: "#3c3f3e",
        },
      },
    },
  },
  variants: {
    scrollbar: ["dark"],
  },
  plugins: [require("tailwind-scrollbar"), require("@tailwindcss/line-clamp")],
};
