---
name: Industrial Precision
colors:
  surface: '#0b1326'
  surface-dim: '#0b1326'
  surface-bright: '#31394d'
  surface-container-lowest: '#060e20'
  surface-container-low: '#131b2e'
  surface-container: '#171f33'
  surface-container-high: '#222a3d'
  surface-container-highest: '#2d3449'
  on-surface: '#dae2fd'
  on-surface-variant: '#c3c6d7'
  inverse-surface: '#dae2fd'
  inverse-on-surface: '#283044'
  outline: '#8d90a0'
  outline-variant: '#434655'
  surface-tint: '#b4c5ff'
  primary: '#b4c5ff'
  on-primary: '#002a78'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#0053db'
  secondary: '#4edea3'
  on-secondary: '#003824'
  secondary-container: '#00a572'
  on-secondary-container: '#00311f'
  tertiary: '#ffb3ad'
  on-tertiary: '#68000a'
  tertiary-container: '#cf2c30'
  on-tertiary-container: '#ffecea'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#ffdad7'
  tertiary-fixed-dim: '#ffb3ad'
  on-tertiary-fixed: '#410004'
  on-tertiary-fixed-variant: '#930013'
  background: '#0b1326'
  on-background: '#dae2fd'
  surface-variant: '#2d3449'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  data-mono:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  shortcut-key:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 12px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  container-padding: 16px
  gutter: 12px
  input-height: 32px
  row-height-dense: 28px
---

## Brand & Style

This design system is engineered for high-throughput environments where data density and operational speed are paramount. The "Industrial Modern" aesthetic blends the reliability of enterprise software with the sleekness of contemporary developer tools.

The target audience includes retail managers, floor supervisors, and manufacturing controllers who require split-second recognition of inventory states and financial figures. The UI evokes a sense of **authority, efficiency, and unwavering stability**.

The style is characterized by:
- **High-Density Utility:** Maximizing screen real estate to reduce scrolling and tab-switching.
- **Functional Minimalism:** Removing all non-essential decorative elements to focus on data.
- **Systematic Contrast:** Using color only as a functional signal, never for decoration.

## Colors

The palette is optimized for long-duration use in indoor environments, utilizing a "Deep Charcoal" base to reduce eye strain.

- **Primary (Action Blue):** Used exclusively for interactive elements, primary buttons, and active states.
- **Secondary (Success Green):** Reserved for positive financial data, completed transactions, and "In-Stock" indicators.
- **Tertiary (Alert Red):** Dedicated to critical errors, low stock warnings, and overdue debt.
- **Neutral (Slate/Charcoal):** A tiered scale of grays (Slate 900 to 50) provides the structural foundation and background depth.

**RTL Adaptation:** Color logic remains consistent in RTL; however, directional indicators (like "back" arrows) must be mirrored.

## Typography

The system utilizes **Inter** for its exceptional legibility in UI and **JetBrains Mono** for numeric data and technical labels.

- **Numeric Readability:** All prices, stock quantities, and SKU numbers must use the `data-mono` role to ensure tabular alignment in columns.
- **RTL Considerations:** For Arabic text, Inter's native Arabic support is utilized. Ensure line-height is slightly increased (approx +10%) for Arabic scripts to prevent clipping of descenders.
- **Keyboard Cues:** Use the `shortcut-key` style within a small bordered box to indicate hotkeys (e.g., `F1`, `CTRL+S`).

## Layout & Spacing

This design system employs a **Fixed Fluid Hybrid** model. The main navigation sidebar and utility panels are fixed-width, while the central data grid expands to fill the viewport.

- **Grid:** A 12-column grid with tight 12px gutters.
- **Density:** The "Compact" model is the default. Information-heavy tables use a 28px row height.
- **RTL Layout:** When the locale is set to Arabic, the entire layout mirrors. Sidebar moves to the right, and the data flow starts from the top-right.
- **Breakpoints:**
  - Desktop (Default): 1280px+
  - Large Desktop: 1920px+ (optimizes for secondary dashboard widgets)

## Elevation & Depth

Depth is achieved through **Tonal Layering** rather than traditional shadows, ensuring the UI remains crisp and "flat-performant."

- **Level 0 (Base):** `#0F172A` (Slate 950) - The main application background.
- **Level 1 (Surface):** `#1E293B` (Slate 800) - Cards, table headers, and sidebar.
- **Level 2 (Overlay):** `#334155` (Slate 700) - Modals, dropdown menus, and hovered states.
- **Borders:** Use 1px solid `#334155` for structural separation. Avoid shadows except for floating tooltips, where a minimal 4px blur with 40% opacity is permitted.

## Shapes

The shape language is "Soft-Industrial."
- **Standard Radius:** 4px (0.25rem) for buttons, inputs, and cards. This provides a modern feel without sacrificing the professional, "engineered" look of the system.
- **Data Cells:** 0px radius. Table cells and data grids should remain sharp to maintain vertical and horizontal alignment lines.

## Components

### Buttons & Inputs
- **Primary Action:** Solid Action Blue with white text. High contrast is mandatory.
- **Inputs:** Dark Slate background with a 1px border. On focus, the border changes to Action Blue with a 2px outer glow.
- **Keyboard Shortcuts:** Every primary button must display its associated hotkey in the corner (e.g., "Save [F10]").

### Data Tables (The Core)
- **Headers:** Sticky headers with a distinct Tonal Level 1 background.
- **Alignment:** Numbers (quantities/prices) are always right-aligned (left-aligned in RTL) to ensure decimal points align.
- **Visual Cues:** Rows with "Low Stock" should feature a 4px left-border (right-border in RTL) in Alert Red.

### Status Chips
- Small, uppercase, bold text.
- Use low-opacity backgrounds with high-opacity text of the same color (e.g., Success Green text on 10% opacity Success Green background).

### Navigation
- Vertical sidebar on the left (right for RTL).
- Active states indicated by a solid Action Blue vertical bar and a slight tonal shift in the background.