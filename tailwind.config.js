/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./Components/**/*.{js,ts,jsx,tsx}",
    "./Context/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      colors: {
        // Background
        "bg-primary": "var(--bg-primary)", // #3f464d
        "bg-secondary": "var(--bg-secondary)", // #2e353d
        "bg-tertiary": "var(--bg-tertiary)", // #22272d
        "bg-accent": "var(--bg-accent)", // #454b57

        // Primary color (yellow)
        primary: {
          DEFAULT: "var(--primary)", // #FFBF00
          hover: "var(--primary-hover)", // #ffc000
        },

        // Texts
        "text-primary": "var(--text-primary)", // #ffffff
        "text-secondary": "var(--text-secondary)", // rgba(255, 255, 255, 0.8)
        "text-tertiary": "var(--text-tertiary)", // rgba(255, 255, 255, 0.6)
      },
      // Custom opacities for white texts
      opacity: {
        80: "0.8",
        60: "0.6",
      },
    },
  },
  plugins: [],
};
