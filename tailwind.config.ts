import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#eef2f8",
          100: "#d7e0ec",
          400: "#5678a8",
          600: "#35507f",
          700: "#2c4370",
          900: "#16233f",
        },
        olive: {
          500: "#6b6d0d",
          600: "#5c5d0b",
          700: "#4e5109",
        },
        teal: {
          500: "#2aa89d",
          600: "#1f8981",
        },
        moss: {
          400: "#8cb43c",
          500: "#79a231",
          600: "#628426",
        },
        lime: {
          100: "#f5f9d9",
          300: "#e3ed95",
          400: "#d3e65a",
          500: "#c2d53f",
        },
        danger: {
          500: "#a6472e",
          600: "#8a3a25",
        },
        kertas: "#f5f6f0",
        ink: "#23281f",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-jakarta)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      backgroundImage: {
        "grain": "radial-gradient(circle at 1px 1px, rgba(35,40,31,0.06) 1px, transparent 0)",
      },
    },
  },
  plugins: [],
};
export default config;
