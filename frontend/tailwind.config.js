/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        // Brand Colors
        primary: "#007EC5",
        "primary-dark": "#005A91",
        secondary: "#0A88D6",

        // Status Colors
        success: "#16A34A",
        danger: "#DC2626",
        warning: "#F59E0B",

        // Neutral Colors
        background: "#F8FAFC",
        dark: "#0F172A",

        // Keep CSS variable support
        primaryColor: "var(--color-primary)",
      },

      gridTemplateColumns: {
        auto: "repeat(auto-fill, minmax(200px, 1fr))",
      },

      animation: {
        scroll: "scroll 45s linear infinite",
      },

      keyframes: {
        scroll: {
          "0%": {
            transform: "translateX(0)",
          },
          "100%": {
            transform: "translateX(-50%)",
          },
        },
      },
    },
  },

  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".pause-animation": {
          "animation-play-state": "paused",
        },
      });
    },
  ],
};
