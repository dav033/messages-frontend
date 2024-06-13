import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#eb4034",
        "primary-foreground": "#f5f5f5",
        accent: "#1E3A84",
        "accent-foreground": "#f5f5f5",
        "default-button": "#000",
        "default-button-hover": "#1c1c1c1",
        "default-button-foreground": "#f5f5f5",
      },
    },
  },
  plugins: [],
};
export default config;
