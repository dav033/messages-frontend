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

    fontSize: {
      ow: "0.6rem",
      xs: "0.7rem",
      sm: "0.785rem",
      base: "0.9rem",
      xl: "1.25rem",
      "2xl": "1.563rem",
      "3xl": "1.953rem",
      "4xl": "2.441rem",
      "5xl": "3.052rem",
    },
  },
  plugins: [],
};
export default config;
