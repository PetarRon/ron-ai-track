# Petaron Website -- Theme & Customisation Guide

Everything you need to change the look and feel of the website lives in **one file**:

```
src/index.css
```

Open it and look for the block starting with `THEME TOKENS`. All changes described
below happen there (or in the `public/` folder for images).

---

## 1. Colours

### Background colours

| Variable | What it controls | Default (R G B) |
|---|---|---|
| `--th-page` | Main page background | `6 7 12` |
| `--th-surface` | Cards, panels | `8 12 22` |
| `--th-surface-alt` | Inset / alternate panels | `6 8 20` |
| `--th-elevated` | Modals, popovers | `11 14 26` |

**Example -- white page:** `--th-page: 255 255 255;`

### Text colours

| Variable | What it controls | Default |
|---|---|---|
| `--th-heading` | Headings, primary text | `255 255 255` |
| `--th-body` | Body copy | `156 163 175` |
| `--th-muted` | Labels, captions | `107 114 128` |
| `--th-faint` | Copyright, fine print | `68 74 88` |

### Border colours

| Variable | What it controls | Default |
|---|---|---|
| `--th-line` | Standard borders | `38 42 54` |
| `--th-line-subtle` | Very faint dividers | `18 22 35` |

### Accent colours

These control buttons, gradients, highlights, and all interactive elements.

| Variable | Tailwind class | Role | Default (R G B) | Hex |
|---|---|---|---|---|
| `--ac-1` | `ac-1` | Primary: buttons, links, glow | `34 211 238` | #22d3ee (cyan) |
| `--ac-2` | `ac-2` | Secondary: highlights | `232 121 249` | #e879f9 (fuchsia) |
| `--ac-3` | `ac-3` | Tertiary: gradients, hover | `167 139 250` | #a78bfa (violet) |
| `--ac-pos` | `ac-pos` | Positive: success, savings | `52 211 153` | #34d399 (emerald) |
| `--ac-neg` | `ac-neg` | Negative: cost, warnings | `244 114 182` | #f472b6 (pink) |

### Hero subtitle (italic line under the main headline)

Darker gradient so it stays legible on light backgrounds. Tailwind: `from-ac-hero-from via-ac-hero-via to-ac-hero-to`.

| Variable | Role | Default (R G B) |
|---|---|---|
| `--ac-hero-from` | Gradient start (left) | `72 64 58` |
| `--ac-hero-via` | Middle | `48 43 39` |
| `--ac-hero-to` | Gradient end (right) | `28 25 23` |

**Example -- even darker:**
```css
--ac-hero-from: 48 43 39;
--ac-hero-via:  35 31 28;
--ac-hero-to:   22 20 18;
```

**Example -- change primary from cyan to green:**
```css
--ac-1: 34 197 94;
```

**Example -- change purple highlights to blue:**
```css
--ac-2: 96 165 250;
--ac-3: 99 102 241;
```

### Colour replacement ideas

Here are some ready-to-paste palettes. Replace the five `--ac-*` variables:

**Ocean Blue**
```css
--ac-1:   59 130 246;    /* blue-500 */
--ac-2:   139 92 246;    /* violet-500 */
--ac-3:   99 102 241;    /* indigo-500 */
--ac-pos: 34 197 94;     /* green-500 */
--ac-neg: 239 68 68;     /* red-500 */
```

**Emerald + Gold**
```css
--ac-1:   16 185 129;    /* emerald-500 */
--ac-2:   245 158 11;    /* amber-500 */
--ac-3:   20 184 166;    /* teal-500 */
--ac-pos: 34 197 94;     /* green-500 */
--ac-neg: 239 68 68;     /* red-500 */
```

**Warm Rose**
```css
--ac-1:   244 63 94;     /* rose-500 */
--ac-2:   249 115 22;    /* orange-500 */
--ac-3:   236 72 153;    /* pink-500 */
--ac-pos: 34 197 94;     /* green-500 */
--ac-neg: 239 68 68;     /* red-500 */
```

**Monochrome (white theme)**
```css
--ac-1:   23 23 23;      /* neutral-900 */
--ac-2:   64 64 64;      /* neutral-700 */
--ac-3:   38 38 38;      /* neutral-800 */
--ac-pos: 34 197 94;     /* green-500 */
--ac-neg: 239 68 68;     /* red-500 */
```

Full Tailwind colour reference (with RGB values):
https://tailwindcss.com/docs/customizing-colors

---

## 2. Fonts

Four font slots control all typography. Edit the CSS variables in `src/index.css`
and update the Google Fonts import on **line 1** if needed.

| Variable | Tailwind class | Default font | Used for |
|---|---|---|---|
| `--font-heading` | `font-serif` | Instrument Serif | Headings, hero title |
| `--font-body` | `font-body` | Inter | Body text, labels |
| `--font-display` | `font-display` | Space Grotesk | Feature titles, badges |
| `--font-mono` | `font-mono` | JetBrains Mono | Code, technical text |

### How to change a font

1. Pick a font from [Google Fonts](https://fonts.google.com/)
2. Add it to the import URL on **line 1** of `src/index.css`
3. Update the CSS variable

**Example -- switch headings to Playfair Display:**
```css
--font-heading: 'Playfair Display', Georgia, serif;
```

### Font replacement ideas

**Modern Sans-Serif (clean tech feel)**
```css
--font-heading: 'Plus Jakarta Sans', system-ui, sans-serif;
--font-body:    'DM Sans', system-ui, sans-serif;
```
Import: `family=Plus+Jakarta+Sans:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600`

**Classic Serif (premium feel)**
```css
--font-heading: 'Playfair Display', Georgia, serif;
--font-body:    'Source Serif 4', Georgia, serif;
```
Import: `family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Source+Serif+4:wght@300;400;500;600`

**Geometric (modern startup)**
```css
--font-heading: 'Outfit', system-ui, sans-serif;
--font-body:    'Nunito Sans', system-ui, sans-serif;
```
Import: `family=Outfit:wght@300;400;500;600;700&family=Nunito+Sans:wght@300;400;500;600`

**Monospace (developer/technical)**
```css
--font-heading: 'Space Grotesk', system-ui, sans-serif;
--font-body:    'IBM Plex Mono', monospace;
```
Import: `family=Space+Grotesk:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@300;400;500;600`

---

## 3. Images

### Hero background image

| File | Location |
|---|---|
| Hero background | `public/hero-bg.png` |

**To change:** Replace `public/hero-bg.png` with your new image (keep the same filename).
No code changes needed. Refresh to see it.

**Opacity control:** Search for `hero-bg.png` in `src/pages/Petaron.tsx`. The
`<img>` has `className="... opacity-25"`. Change the number:

- `opacity-10` -- very subtle
- `opacity-25` -- current
- `opacity-40` -- more visible

### Dashboard images

The "See it in Action" panels reference SVGs in `public/`:
- `public/petaron-board-ops.svg`
- `public/petaron-board-review.svg`
- `public/petaron-board-analytics.svg`

Replace these files with your own screenshots/images.

### Logo images

Integration logos in the scrolling marquee are defined in
`src/components/petaron/data.ts` in the `integrations` array.

---

## 4. Quick-start: Full theme swap

### Dark blue to white + green

In `src/index.css`:

```css
/* Backgrounds */
--th-page:        250 253 250;
--th-surface:     255 255 255;
--th-surface-alt: 240 253 244;
--th-elevated:    255 255 255;

/* Text */
--th-heading:     20 83 45;
--th-body:        71 85 105;
--th-muted:       148 163 184;
--th-faint:       203 213 225;

/* Borders */
--th-line:        209 213 219;
--th-line-subtle: 229 231 235;

/* Accents */
--ac-1:   16 185 129;
--ac-2:   5 150 105;
--ac-3:   20 184 166;
--ac-pos: 34 197 94;
--ac-neg: 239 68 68;
```

---

## 5. Pages & Routes

| Page | Route | File |
|---|---|---|
| Landing page | `/` | `src/pages/Petaron.tsx` |
| About | `/about` | `src/pages/About.tsx` |

- **Careers** -- opens the contact form modal (no separate page).
- **FAQ** -- same-page anchor (`#faq`) on the landing page.

---

## 6. File reference

| What | Where |
|---|---|
| Theme colours, accents, fonts | `src/index.css` (`:root` block) |
| Tailwind colour aliases | `tailwind.config.ts` (`th` and `ac` objects) |
| Hero background image | `public/hero-bg.png` |
| Main page layout & sections | `src/pages/Petaron.tsx` |
| About page | `src/pages/About.tsx` |
| Route definitions | `src/App.tsx` |
| Shared components (button, logo) | `src/components/petaron/shared.tsx` |
| How it Works cards | `src/components/petaron/ProcessFlowSection.tsx` |
| See it in Action tabs | `src/components/petaron/PlatformPreviewSection.tsx` |
| Contact form modal | `src/components/petaron/FinalCTA.tsx` |
| Integration logos data | `src/components/petaron/data.ts` |
| Dashboard images | `public/petaron-board-*.svg` |
