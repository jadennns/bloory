// COLORS PALLETE ARE FROM DOGEHOUSE TV SOURCE
// https://github.com/benawad/dogehouse/blob/staging/kibbeh/src/styles/globals.css

module.exports = {
  content: ["./src/pages/**/*.tsx", "./src/components/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        button: "var(--color-button-text)",
        transparent: "transparent",
        primary: {
          100: "var(--color-primary-100)",
          200: "var(--color-primary-200)",
          300: "var(--color-primary-300)",
          600: "var(--color-primary-600)",
          700: "var(--color-primary-700)",
          800: "var(--color-primary-800)",
          900: "var(--color-primary-900)",
        },
        secondary: {
          DEFAULT: "var(--color-secondary)",
          "washed-out": "var(--color-secondary-washed-out)",
        },
        accent: {
          DEFAULT: "var(--color-accent)",
          hover: "var(--color-accent-hover)",
          disabled: "var(--color-accent-disabled)",
        },
        black: "#000",
        swatch: {
          1: "#040505",
          2: "#a3a2aa",
          3: "#787986",
          4: "#5d5f6c",
          5: "#3b3940",
          6: "#ccd3d5",
          7: "#1135ea"
        }
      },
    },
  },
  variants: {
    scrollbar: ["dark"],
  },
  plugins: [require("tailwind-scrollbar"), require("@tailwindcss/line-clamp")],
};
