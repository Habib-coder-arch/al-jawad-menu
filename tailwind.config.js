/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Al-Jawad brand tokens
        ember: {
          DEFAULT: "#C1432E", // paprika red — primary accent, CTAs, active states
          dark: "#9A3323",
          light: "#DC5C3F",
        },
        saffron: {
          DEFAULT: "#E8A33D", // saffron gold — prices, highlights
          dark: "#C7852A",
          light: "#F2C169",
        },
        char: {
          DEFAULT: "#1B140F", // deep espresso charcoal — page background
          soft: "#241A13",   // surface / card background
          softer: "#2E2118", // elevated surface (hover, sticky bars)
          line: "#3B2A1E",   // hairline dividers
        },
        cream: {
          DEFAULT: "#F6ECE0", // primary text on dark
          muted: "#C9B8A8",   // secondary text
        },
      },
      fontFamily: {
        display: ["var(--font-cairo)", "Tahoma", "sans-serif"],
        body: ["var(--font-tajawal)", "Tahoma", "sans-serif"],
      },
      boxShadow: {
        card: "0 8px 24px -8px rgba(0,0,0,0.5)",
        pill: "0 4px 14px -4px rgba(193,67,46,0.45)",
      },
      borderRadius: {
        blob: "1.75rem",
      },
    },
  },
  plugins: [],
};
