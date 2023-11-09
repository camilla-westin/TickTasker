/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        nav: "#18222f",
        page: "#f5f5f5",
        card: "#f1f2f3",
        "card-hover": "#f8f8f8",
        "default-text": "#222",
        "blue-accent": "#0084d4",
        "blue-accent-hover": "#009fff",
      },
      fontFamily: {
        roboto: ["Roboto Slab", "sans-serif"],
      },
      boxShadow: {
        card: "0 4px 22px 0 rgba(0, 0, 0, 0.09)",
      },
    },
  },
  plugins: [],
};
