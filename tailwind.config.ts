import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'maintech-red': '#C8102E',
        industrial: {
          yellow: '#FFB703', 
          dark: '#111827',   
          navy: '#1E293B',   
          gray: '#F3F4F6',   
        }
      },
    },
  },
  plugins: [],
};
export default config;
