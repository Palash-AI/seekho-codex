const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./design-system/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        seekho: {
          neutral: {
            white: "#FFFFFF",
            black: "#000000"
          },
          accent: {
            primary: "#F50ACA",
            secondary: "#7F09D6",
            tertiary: "#D3AF37",
            onAccent: "#FFFFFF"
          },
          bg: {
            primary: "#000000",
            secondary: "#0B0B0B"
          },
          surface: {
            default: "#111111",
            elevated: "#1A1A1A"
          },
          border: {
            default: "rgba(255,255,255,0.08)",
            strong: "rgba(255,255,255,0.14)"
          },
          text: {
            primary: "#FFFFFF",
            secondary: "rgba(255,255,255,0.72)",
            muted: "rgba(255,255,255,0.48)",
            disabled: "rgba(255,255,255,0.40)"
          },
          semantic: {
            success: "#22C55E",
            warning: "#F59E0B",
            error: "#EF4444",
            info: "#3B82F6"
          }
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
      borderRadius: {
        seekhoCard: "16px",
        seekhoButton: "12px",
        seekhoChip: "999px",
        seekhoSheet: "20px",
        seekhoInput: "12px"
      },
      boxShadow: {
        seekhoCard: "0 4px 12px rgba(0,0,0,0.35)",
        seekhoElevated: "0 8px 24px rgba(0,0,0,0.50)",
        seekhoCta: "0 0 24px rgba(245,10,202,0.45)",
        seekhoFlagshipGlow: "0 0 40px rgba(127,9,214,0.60)"
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
        seekhoShell: "390px"
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
