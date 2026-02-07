/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          50: "#f7f7f4",
          100: "#efeee8",
          200: "#d9d6c8",
          300: "#bdb7a1",
          400: "#9f9479",
          500: "#827658",
          600: "#685f46",
          700: "#504a38",
          800: "#3a352a",
          900: "#25231d"
        },
        ocean: {
          50: "#eef7f7",
          100: "#d4eceb",
          200: "#a7d7d6",
          300: "#78bfbf",
          400: "#4ca6a8",
          500: "#2f8c90",
          600: "#237176",
          700: "#1c575c",
          800: "#173f43",
          900: "#102728"
        },
        gold: {
          100: "#f8f2e8",
          200: "#f2e3c9",
          300: "#e9d1a7",
          400: "#dfbb83",
          500: "#d1a45f",
          600: "#b8894a",
          700: "#8f6a3a",
          800: "#644a2b",
          900: "#3b2b1a"
        }
      },
      fontFamily: {
        display: ['"Playfair Display"', "serif"],
        sans: ['"Manrope"', "system-ui", "sans-serif"]
      },
      boxShadow: {
        soft: "0 12px 40px rgba(16, 39, 40, 0.08)",
        glow: "0 20px 60px rgba(47, 140, 144, 0.25)"
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(120% 120% at 10% 10%, rgba(120, 191, 191, 0.35) 0%, rgba(248, 242, 232, 0.4) 35%, rgba(247, 247, 244, 1) 70%)",
        "section-gradient":
          "radial-gradient(100% 100% at 0% 0%, rgba(239, 238, 232, 0.7) 0%, rgba(247, 247, 244, 1) 65%)"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" }
        }
      },
      animation: {
        float: "float 6s ease-in-out infinite"
      }
    }
  },
  plugins: []
};
