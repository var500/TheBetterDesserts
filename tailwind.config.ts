import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      fontFamily: {
        playfair: ["Playfair Display", "ui-serif", "serif"],
        serif: ["ui-serif", "Georgia", "serif"],
        sans: ["ui-sans-serif", "-apple-system", "system-ui", "sans-serif"],
      },
      colors: {
        primary: {
          dark: "#1A243F",
          light: "#F5F0E6",
        },
        dessert: {
          cream: "#F5F0E6",
          navy: "#1A243F",
        },
      },
      spacing: {
        "62.5": "15.625rem",
      },
      animation: {
        "infinite-scroll": "infinite-scroll 30s linear infinite",
      },
      keyframes: {
        "infinite-scroll": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(calc(-50% - 0.5rem))" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
