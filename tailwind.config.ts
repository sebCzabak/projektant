import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./contexts/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#121212",
          light: "#FDFDFD",
        },
        foreground: {
          DEFAULT: "#FDFDFD",
          light: "#121212",
        },
        accent: "#808080",
      },
    },
  },
  plugins: [],
};
export default config;
