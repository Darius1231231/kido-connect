import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
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
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
      },
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
        // Kido custom colors
        sage: {
          DEFAULT: "hsl(var(--sage-green))",
          deep: "hsl(var(--sage-green-deep))",
          accent: "hsl(var(--sage-green-accent))",
        },
        sand: {
          DEFAULT: "hsl(var(--warm-sand))",
          deep: "hsl(var(--warm-sand-deep))",
          accent: "hsl(var(--warm-sand-accent))",
        },
        lavender: {
          DEFAULT: "hsl(var(--soft-lavender))",
          deep: "hsl(var(--soft-lavender-deep))",
          accent: "hsl(var(--soft-lavender-accent))",
        },
        calm: {
          DEFAULT: "hsl(var(--calm-blue))",
          glow: "hsl(var(--calm-blue-glow))",
        },
        happy: {
          DEFAULT: "hsl(var(--happy-yellow))",
          glow: "hsl(var(--happy-yellow-glow))",
        },
        energy: {
          DEFAULT: "hsl(var(--energy-orange))",
          glow: "hsl(var(--energy-orange-glow))",
        },
        guardian: {
          bg: "hsl(var(--guardian-bg))",
          card: "hsl(var(--guardian-card))",
          text: "hsl(var(--guardian-text))",
          muted: "hsl(var(--guardian-muted))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        squircle: "1.5rem",
        "squircle-sm": "1rem",
        "squircle-lg": "2rem",
        "squircle-xl": "2.5rem",
      },
      boxShadow: {
        neumorphic: "var(--shadow-neumorphic-light)",
        "neumorphic-pressed": "var(--shadow-neumorphic-pressed)",
        soft: "var(--shadow-soft)",
        "glow-calm": "var(--shadow-glow-calm)",
        "glow-happy": "var(--shadow-glow-happy)",
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
        "pulse-gentle": {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.05)", opacity: "0.9" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        bounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-gentle": "pulse-gentle 2s ease-in-out infinite",
        float: "float 3s ease-in-out infinite",
        "bounce-slow": "bounce 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
