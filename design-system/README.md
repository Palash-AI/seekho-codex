# Seekho Design System

This folder contains a standalone Seekho mobile-first, dark-first UI kit.

## Files
- `tokens.seekho.json`: source of truth tokens
- `tailwind.seekho.config.js`: Tailwind theme mapping + utilities
- `components/`: Button, Card, Chip, Input, BottomSheet, Progress
- `examples/`: HomeFeed, PaywallHeader, SearchRow

## Apply Theme
1. Merge or replace your Tailwind config with `design-system/tailwind.seekho.config.js`.
2. Ensure UI font is Inter globally:
   - Example in CSS: `font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;`
3. Wrap app in dark theme:
   - Use class `.theme-dark` or `data-theme="dark"` on root.
4. Keep mobile shell:
   - Canvas baseline `390px`, max shell `480px`.

## Utility Classes
- Background: `bg-app`, `bg-surface`, `bg-elevated`
- Text: `text-primary`, `text-secondary`, `text-muted`
- Border: `border-default`
- Shadow: `shadow-card`, `shadow-elevated`
- Gradient: `gradient-appBg`, `gradient-cardHero`

## Component Notes
- `Button`: supports `primary`, `secondary`, `ghost`; focus, pressed, disabled states included.
- `Input`: supports left icon and search use-case; focus ring/glow included.
- `BottomSheet`: scrim + slide-up motion (240ms, standard easing).
- `Progress`: standard + segmented variants (4px gap).
