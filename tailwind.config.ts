import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  important: "#ai-chat-root",
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        ivory: "#f5f3ed",
        paper: "#fbfaf7",
        sand: "#cbb799",
        caramel: "#a07856",
        brown: "#6f4d38",
        espresso: "#320f03",
      },
      boxShadow: {
        editorial: "0 24px 70px rgba(50, 15, 3, 0.22)",
      },
      fontFamily: {
        sans: ["Pretendard", "Apple SD Gothic Neo", "sans-serif"],
        serif: ["Noto Serif KR", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
