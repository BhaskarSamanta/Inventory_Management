/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
    theme: {
      extend: {
        width: {
          '128': '128px',
          '256': '256px',
          '384': '384px',
          '512': '512px',
          '640': '640px',
          '768': '768px',
          '896': '896px',
          '1024': '1024px',
          '1152': '1152px',
          '1280': '1280px',
          '1536': '1536px',
          '1920': '1920px',
          '2560': '2560px',
          '3000': '3000px',
          '4000': '4000px',
          // Add more custom widths as needed
        },
        height: {
          '128': '128px',
          '256': '256px',
          '384': '384px',
          '512': '512px',
          '640': '640px',
          '768': '768px',
          '896': '896px',
          '1024': '1024px',
          '1152': '1152px',
          '1280': '1280px',
          '1536': '1536px',
          '1920': '1920px',
          '2560': '2560px',
          '3000': '3000px',
          '4000': '4000px',
          // Add more custom heights as needed
        }
      }
    },
  },
  plugins: [require("tailwindcss-animate")],

  
}