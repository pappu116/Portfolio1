import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          900: "#070a12",
          800: "#0d1322",
          700: "#172033",
          600: "#26334d",
        },
        neon: {
          cyan: "#00f0ff",
          violet: "#a855f7",
          magenta: "#ec4899",
          emerald: "#10b981",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        mono: ["var(--font-jetbrains)", "JetBrains Mono", "Fira Code", "monospace"],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out 3s infinite",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-14px) rotate(0.5deg)" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.5", filter: "blur(30px)" },
          "50%": { opacity: "0.85", filter: "blur(45px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
