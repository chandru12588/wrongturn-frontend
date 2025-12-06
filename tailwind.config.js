import { defineConfig } from "tailwindcss";

export default defineConfig({
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#4f46e5",
          600: "#4338ca",
        },
        accent: "#06b6d4",
        muted: "#6b7280",
        danger: "#ef4444",
        bg: "#f8fafc",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
});
