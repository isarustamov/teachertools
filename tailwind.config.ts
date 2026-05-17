import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: { DEFAULT: "#4f46e5", foreground: "#ffffff" },
        emerald: { premium: "#10b981" }
      },
      boxShadow: { glow: "0 24px 80px rgba(79,70,229,.24)" },
      borderRadius: { xl: "1rem", "2xl": "1.5rem", "3xl": "2rem" },
      fontFamily: { sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"] }
    }
  },
  plugins: []
};
export default config;
