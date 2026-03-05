import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Rubik", "system-ui", "sans-serif"],
        mono: ["Roboto Mono", "Monaco", "Consolas", "monospace"],
      },
      colors: {
        axe: {
          cyan: "#22D3EE",
          "cyan-light": "#67E8F9",
          "cyan-deep": "#06B6D4",
          blue: "#3B82F6",
          "blue-deep": "#2563EB",
          purple: "#7C3AED",
          dark: {
            100: "#07090F",
            200: "#0C1017",
            300: "#111620",
            400: "#171D2A",
            500: "#1E2535",
            600: "#2A3244",
            700: "#374254",
            800: "#465569",
          },
          text: {
            primary: "#E2E8F0",
            secondary: "#8B9AB5",
            muted: "#64748B",
          },
        },
      },
      keyframes: {
        "glow-pulse": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
      },
      animation: {
        "glow-pulse": "glow-pulse 4s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
