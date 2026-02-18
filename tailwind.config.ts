import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./design-system/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        seekho: {
          bg: "#000000",
          surface: "#111111",
          elevated: "#1A1A1A",
          border: "rgba(255,255,255,0.08)",
          text: "#FFFFFF",
          secondary: "rgba(255,255,255,0.72)",
          muted: "rgba(255,255,255,0.48)",
          accent: "#F50ACA",
          accentSecondary: "#7F09D6",
          tertiary: "#D3AF37"
        }
      },
      fontFamily: {
        seekho: [
          "Inter",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif"
        ],
        seekhoLogo: ["Almaz", "serif"]
      },
      fontSize: {
        display: ["20px", { lineHeight: "28px", fontWeight: "600" }],
        title: ["16px", { lineHeight: "20px", fontWeight: "500" }],
        section: ["14px", { lineHeight: "18px", fontWeight: "500" }],
        cardTitle: ["14px", { lineHeight: "20px", fontWeight: "600" }],
        body: ["12px", { lineHeight: "16px", fontWeight: "400" }],
        caption: ["10px", { lineHeight: "14px", fontWeight: "400" }],
        button: ["14px", { lineHeight: "18px", fontWeight: "600" }]
      },
      borderRadius: {
        card: "16px",
        button: "12px",
        chip: "999px",
        input: "12px",
        sheet: "20px",
        seekhoCard: "16px",
        seekhoButton: "12px",
        seekhoChip: "999px",
        seekhoSheet: "20px",
        seekhoInput: "12px"
      },
      spacing: {
        1: "4px",
        2: "8px",
        3: "12px",
        4: "16px",
        5: "20px",
        6: "24px",
        8: "32px",
        10: "40px",
        12: "48px"
      },
      boxShadow: {
        card: "0 4px 12px rgba(0,0,0,0.35)",
        elevated: "0 8px 24px rgba(0,0,0,0.50)",
        cta: "0 0 24px rgba(245,10,202,0.45)",
        flagship: "0 0 40px rgba(127,9,214,0.60)"
      },
      transitionTimingFunction: {
        seekho: "cubic-bezier(0.4, 0, 0.2, 1)"
      },
      transitionDuration: {
        seekhoFast: "120ms",
        seekhoMedium: "240ms",
        seekhoSlow: "360ms"
      },
      maxWidth: {
        seekhoShell: "480px"
      }
    }
  },
  plugins: [
    plugin(function ({ addBase, addUtilities }) {
      addBase({
        ":root": {
          "--seekho-bg-primary": "#000000",
          "--seekho-bg-secondary": "#0B0B0B",
          "--seekho-surface-default": "#111111",
          "--seekho-surface-elevated": "#1A1A1A",
          "--seekho-text-primary": "#FFFFFF",
          "--seekho-text-secondary": "rgba(255,255,255,0.72)",
          "--seekho-text-muted": "rgba(255,255,255,0.48)",
          "--seekho-border-default": "rgba(255,255,255,0.08)"
        },
        ".theme-dark": {
          "--seekho-bg-primary": "#000000",
          "--seekho-bg-secondary": "#0B0B0B",
          "--seekho-surface-default": "#111111",
          "--seekho-surface-elevated": "#1A1A1A",
          "--seekho-text-primary": "#FFFFFF",
          "--seekho-text-secondary": "rgba(255,255,255,0.72)",
          "--seekho-text-muted": "rgba(255,255,255,0.48)",
          "--seekho-border-default": "rgba(255,255,255,0.08)"
        }
      });

      addUtilities({
        ".bg-app": {
          backgroundColor: "var(--seekho-bg-primary)"
        },
        ".bg-surface": {
          backgroundColor: "var(--seekho-surface-default)"
        },
        ".bg-elevated": {
          backgroundColor: "var(--seekho-surface-elevated)"
        },
        ".text-primary": {
          color: "var(--seekho-text-primary)"
        },
        ".text-secondary": {
          color: "var(--seekho-text-secondary)"
        },
        ".text-muted": {
          color: "var(--seekho-text-muted)"
        },
        ".border-default": {
          borderColor: "var(--seekho-border-default)"
        },
        ".shadow-card": {
          boxShadow: "0 4px 12px rgba(0,0,0,0.35)"
        },
        ".shadow-elevated": {
          boxShadow: "0 8px 24px rgba(0,0,0,0.50)"
        },
        ".gradient-appBg": {
          backgroundImage: "linear-gradient(90deg, #7F09D6 0%, #F50ACA 100%)"
        },
        ".gradient-cardHero": {
          backgroundImage: "linear-gradient(90deg, #7F09D6 0%, #F50ACA 50%, #D3AF37 100%)"
        }
      });
    })
  ]
};

export default config;
