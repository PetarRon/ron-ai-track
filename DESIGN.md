---
name: Petaron.ai
description: Freight order intake, set like a well-kept ledger — warm paper, true ink, hairline rules, and no colour that isn't money.
colors:
  page: "#FAF8F5"
  surface: "#FFFFFF"
  surface-alt: "#F4F1EC"
  elevated: "#FFFFFF"
  heading: "#1C1917"
  body: "#574E46"
  muted: "#7A7169"
  faint: "#958F88"
  line: "#E5E0D8"
  line-subtle: "#F0ECE6"
  ink-1: "#1C1917"
  ink-2: "#44403C"
  ink-3: "#78716C"
  savings: "#166534"
  cost: "#B91C1C"
  button-ink: "#161310"
  button-hover-fill: "#E2D8C4"
  button-hover-text: "#2A2000"
  hero-from: "#48403A"
  hero-via: "#302B27"
typography:
  display:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "26px–44px"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  display-italic:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "18px–34px"
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: "normal"
  headline:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "24px–30px"
    fontWeight: 400
    lineHeight: 1.25
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "20px"
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "13px–16px"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
  label:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "10px–12px"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "0.1em"
  meta:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "9px"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.3em"
  mono:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "normal"
rounded:
  control: "12px"
  card: "16px"
  frame: "20px"
  pill: "9999px"
spacing:
  frame-inset: "6px"
  control-y: "14px"
  card: "24px"
  gutter: "20px"
  gutter-wide: "32px"
  section: "64px"
components:
  button-primary:
    backgroundColor: "{colors.button-ink}"
    textColor: "#FFFFFF"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "14px 28px"
  button-primary-hover:
    backgroundColor: "{colors.button-hover-fill}"
    textColor: "{colors.button-hover-text}"
    rounded: "{rounded.pill}"
    padding: "14px 28px"
  button-secondary:
    backgroundColor: "{colors.surface-alt}"
    textColor: "{colors.heading}"
    rounded: "{rounded.pill}"
    padding: "14px 28px"
  button-submit:
    backgroundColor: "{colors.ink-1}"
    textColor: "#FFFFFF"
    rounded: "{rounded.pill}"
    padding: "14px 24px"
    width: "100%"
  input-field:
    backgroundColor: "{colors.surface-alt}"
    textColor: "{colors.heading}"
    rounded: "{rounded.control}"
    padding: "12px 16px"
  card-frame:
    backgroundColor: "transparent"
    rounded: "{rounded.card}"
    padding: "{spacing.frame-inset}"
  card-panel:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.body}"
    rounded: "{rounded.control}"
    padding: "{spacing.card}"
  chip-meta:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    typography: "{typography.meta}"
    rounded: "{rounded.pill}"
    padding: "2px 10px"
  nav-bar:
    backgroundColor: "{colors.page}"
    textColor: "{colors.body}"
    rounded: "{rounded.pill}"
    padding: "10px 8px 10px 12px"
---

# Design System: Petaron.ai

## Overview

**Creative North Star: "The Dispatch Ledger"**

Freight paperwork made calm and exact. The waybill, the manifest, the rate sheet — the trade's own materials, rendered with care instead of chaos. The page is warm stock (#FAF8F5), the type is genuinely ink (#1C1917), the divisions are hairlines rather than boxes, and the figures are set so they can be read at a glance and trusted. Petaron sells the removal of frantic manual work; the interface has to look like the state it delivers, not the state it replaces.

The system is **composed and exact**. Authority comes from size, weight and air — never from colour. This is why the palette is monochrome by construction: `--ac-1`, the "primary accent", is the same value as `--th-heading`, so the brand's accent literally *is* its ink. Only two hues exist in the entire system, deep green (#166534) and deep red (#B91C1C), and they are reserved for money moving in one direction or the other. A ledger has no neon; neither does this.

Density is moderate and deliberately uneven: generous air around headlines and interstitial lines, then tight, information-dense clusters inside the double-framed panels where the product actually demonstrates itself. Motion is ambient and slow — a word-by-word headline reveal, a shimmer that crosses a heading every few seconds, a light that follows the cursor, a header that ducks away on scroll. Nothing bounces, nothing pops, nothing announces itself. The single piece of theatre in the whole system is the primary button, which fills with cream on hover and flips its label to dark.

**Key Characteristics:**
- Warm paper ground with true-ink type; zero brand hue.
- Playfair Display set at regular weight, never bold, with tight tracking.
- Hairline rules and nested double-frames instead of drop shadows.
- Colour reserved exclusively for money: green saves, red costs.
- Pills for anything interactive; 16px rounded rectangles for anything that contains.
- Slow, ambient, non-bouncing motion.

**A test to apply:** *would this element belong on a well-kept ledger page?* A glowing gradient would not. A hairline rule, a precise column of figures, a serif heading and a wide margin all would.

## Colors

A warm greyscale drawn from paper and ink, with exactly two saturated exceptions that both mean money.

### Primary
- **Ink** (#1C1917): The single accent. Headings, primary text, links, focus rings, the solid submit button, the value dots in bulleted lists. Defined twice in `src/index.css` — as `--th-heading` and as `--ac-1` — with the same value, on purpose.
- **Button Ink** (#161310): A half-step darker and warmer than Ink, used only as the resting fill of the primary pill button so it separates from body text on the same cream ground.

### Secondary
- **Slate Ink** (#44403C): Second-rank emphasis. Gradient midpoints, secondary marker dots, the middle stop of the hero subtitle.
- **Stone** (#78716C): Third-rank. Gradient tails, hover states, the lightest of the three ink accents.

### Tertiary
- **Savings Green** (#166534): Money recovered. Calculator savings figures, the EU-hosted badge, positive process states.
- **Cost Red** (#B91C1C): Money spent or lost. Calculator cost figures, form validation errors.

### Neutral
- **Warm Paper** (#FAF8F5): The page ground everywhere, including inside full-width sections. Sections never alternate their fill.
- **Card White** (#FFFFFF): Raised panels — the inner surface of a double-frame, modals, popovers.
- **Inset Linen** (#F4F1EC): Recessed surfaces. Input fields, secondary buttons, icon wells, chips — almost always at partial opacity (`/30`, `/40`, `/50`) so the paper reads through.
- **Body Brown** (#574E46): Running text. Warm enough to sit on cream without the blue cast a neutral grey would bring.
- **Muted Stone** (#7A7169): Labels, captions, chip text, small informational copy (footer copyright, slider range endpoints), and the interstitial sell lines — always at full opacity; quietness comes from size and weight, not alpha. Holds 4.5:1 against both Warm Paper and Card White.
- **Faint Stone** (#958F88): Input placeholders only, plus any genuinely large or decorative text that doesn't carry information on its own. Too light to pass body-text contrast at small sizes — never use it for informational copy that must be read; use Muted Stone instead.
- **Rule** (#E5E0D8): Standard borders — cards, chips, header, outer frames.
- **Whisper Rule** (#F0ECE6): Section dividers and the inner border of a double-frame. Present but barely.

### Named Rules

**The Ink Rule.** The primary accent *is* the heading colour. There is no brand hue in this system. Anything that needs to stand out does it with size, weight, or surrounding space — never by introducing a colour.

**The Money-Only Rule.** #166534 and #B91C1C are the only saturated values in the system, and they may only be applied to a figure, a state, or a badge that is genuinely about money or safety. A green or red that isn't reporting a value is a defect.

**The Paper-Through Rule.** Inset surfaces are set at partial alpha (`bg-th-surface-alt/50`, `bg-th-line/50`) rather than at full opacity, so the warm ground stays visible through every recessed element. Solid fills are for raised surfaces only.

**The Legible-Quiet Rule.** Alpha is for backgrounds, never for informational text. Muted Stone and Faint Stone are used at full opacity; where a text element needs to feel quieter than its neighbours, that comes from a smaller size or a lighter weight, not from an opacity modifier stacked on top of a text-color token. An opacity-dimmed text color is the fastest way to fall below AA contrast.

## Typography

**Display Font:** Playfair Display (with Georgia, serif)
**Body Font:** Inter (with system-ui, sans-serif)
**Label/Mono Font:** JetBrains Mono (with ui-monospace, monospace) — figures inside the product preview only

**Character:** A high-contrast Didone serif set at regular weight against a neutral grotesque. Playfair supplies the editorial authority a ledger page has; Inter carries every piece of information without competing. The pairing works because Playfair is never asked to be loud — it is never bold, never uppercase, and always tracked tight.

### Hierarchy
- **Display** (400, 26→44px stepped at sm/md/lg, line-height 1.2): The hero headline only. Set with `tracking-tight`, revealed word by word.
- **Display Italic** (400 italic, 18→34px, line-height 1.3): The hero's second line, clipped to a three-stop ink gradient (#48403A → #302B27 → #1C1917) running left to right. The one place a gradient touches type.
- **Headline** (400, 24→30px): Section titles and page titles. Serif, regular weight, tracking-tight.
- **Title** (400, 20px): Sub-section headings inside article pages.
- **Body** (400, 13–16px, line-height ~1.625): All running text, in Inter. The hero paragraph drops to 300 for its single appearance at large size. Articles hold to `max-w-3xl`.
- **Label** (700, 10–12px, 0.1em, uppercase): Form field labels, chip text, and small uppercase tags. Bold, wide, small.
- **Meta** (400, 9px, 0.3em, uppercase): Category chips on FAQ rows. The widest tracking in the system, and the smallest type.
- **Mono** (500, 12px): Numeric values inside the dashboard preview and chart tooltips.

### Named Rules

**The Never-Bold-Serif Rule.** Every Playfair heading in this system is weight 400 with `tracking-tight`. The display face is never bolded, never uppercased, and never letterspaced. If a heading isn't carrying enough weight, it gets more size or more space around it — not more stroke.

**The Uppercase-Is-Metadata Rule.** Uppercase plus letterspacing marks something as a label or a category, never as content. Two registers exist: 12px/0.1em/700 for form labels, 9px/0.3em/400 for chips. Headlines are never uppercase.

## Layout

Everything re-enters the same shell: a 1300px max-width container with 20px gutters that open to 32px from `md` up (`mx-auto w-full max-w-[1300px] px-5 md:px-8`, exported as `PETARON_SECTION_SHELL`). Full-bleed sections still place their content in that shell rather than widening it.

Reading width narrows in three fixed steps beneath the shell: `max-w-3xl` for article prose (About, Privacy, Terms), `max-w-4xl` for the FAQ list, `max-w-2xl` for centred hero and CTA copy. Body copy therefore lands near a 65–75 character measure at every level.

Vertical rhythm is 64px section padding (`py-16`) on the home page's stacked sections, dropping to 40–56px on article pages. Interstitial sell lines take 28–32px. Cards use 24px internal padding, tightening to 20px on the three-across process tiles.

The header is a sticky pill inset 16px from the top (`sticky top-4`), floating over content at 60% page opacity with a heavy backdrop blur. It hides on downward scroll past 80px and returns immediately on any upward scroll, via a spring rather than a duration.

Responsive behaviour is breakpoint-stepped, not fluid: type sizes step at `sm`/`md`/`lg` rather than using `clamp()`; three-across card grids collapse to one column; the process flow's staggered indents (`lg:ml-12`, `lg:ml-24`) apply only from `lg` up and flatten below. Nav collapses to a 44px icon button and a rounded drawer at `md`. Every interactive target holds a 44px minimum height on mobile.

### Named Rules

**The One Shell Rule.** Every section — including ones with their own background or border — lays its content out inside the same 1300px/20px/32px shell. Sections never introduce a different container width.

**The Hairline Seam Rule.** Adjacent full-width sections are separated by a single `border-y` hairline in Whisper Rule (#F0ECE6) over the *same* Warm Paper ground. Sections are never distinguished by alternating background fills.

## Elevation & Depth

This system is functionally flat. Depth is carried by hairline borders, warm tonal steps between paper / linen / white, and the physical impression of nested frames — not by lifting objects off the page. What shadows exist are large-radius, low-opacity halos with little or no offset: they read as the paper glowing slightly around a panel rather than as an object casting a shadow.

The signature structure is a **double frame**: an outer container with a 0.75px Rule border and 6–8px of padding, holding an inner panel with a Whisper Rule border, a white fill, and the one soft halo. It reads like a mounted card in a mat — the ledger's own convention of ruling a box around a figure.

### Shadow Vocabulary
- **Panel halo** (`box-shadow: 0 0 27px 0 rgba(45,45,45,0.15)`): The inner panel of a double frame. Zero offset, wide blur. The system's default and most common shadow.
- **Deep lift** (`box-shadow: 0 20px 80px -40px rgba(0,0,0,0.5)`): FAQ rows and other large stacked surfaces. Heavily negative spread, so it stays a suggestion.
- **Pill shadow** (`box-shadow: 0 4px 18px rgba(0,0,0,0.3)`, hover `0 6px 22px rgba(120,108,86,0.3)`): The primary button only — the one element allowed a true offset, because it is the one element meant to feel pressable.
- **Glass edge** (`box-shadow: 0 10px 30px rgba(28,25,23,0.08), inset 0 1px 0 rgba(255,255,255,0.22)`): Glass panels and logo frames, where a white inset top edge simulates a lit lip.

### Named Rules

**The Double-Frame Rule.** The canonical container is two nested borders, not one: outer 0.75px Rule frame with 6–8px padding, inner Whisper Rule panel on white carrying the halo. The shadow belongs to the inner panel. Never put a shadow on the outer frame, and never collapse the pair into a single bordered card.

**The No-Drop-Shadow Rule.** Shadows have zero or minimal Y-offset and blur radii of 27px or more. Anything that reads as a conventional drop shadow — tight, offset, dark — is out of system. The one exception is the primary pill.

## Shapes

Two silhouettes, strictly divided by function. **Anything interactive is a pill** (9999px): buttons, the header bar, chips, badges, the mobile menu button, slider thumbs, marquee frames. **Anything that contains is a rounded rectangle**: 16px for cards, modals, FAQ rows and the mobile drawer; 12px for inputs and the inner panels of double frames; 20px for glass and logo frames. Nothing in the system has a sharp corner, and nothing sits between those two families.

Borders are the primary structural device and are always 1px, except the outer frame of a double-frame, which is 0.75px — a deliberately sub-pixel hairline that renders lighter than everything around it. The base radius token is 12px (`--radius: 0.75rem`), with Tailwind's `md`/`sm` steps derived from it at 10px and 8px.

Icons are Lucide line icons at 1.5px stroke, sitting in 40px pill wells or `rounded-lg` square wells filled with Inset Linen at partial opacity.

### Named Rules

**The Pill-Or-Panel Rule.** If it responds to a click, it is a pill. If it holds content, it is a 12–16px rounded rectangle. There is no third shape, and no square corners.

## Components

### Buttons
- **Shape:** Full pill (9999px) at every size and variant.
- **Primary:** Button Ink (#161310) fill, white 13px/700 label, 14px × 28px padding, hairline white/10 border, pill shadow. On hover a cream disc (#F3EEE2 → #E2D8C4) that sits at 20%/40% inset scales up to 1.8× to flood the button, a white sheen sweeps left to right over 700ms, and the label colour flips to #2A2000. The border warms to #E2D8C4/70. This inversion is the system's one moment of theatre — reserved for the demo-booking CTA.
- **Secondary:** Inset Linen at 50% opacity, Rule border, Ink label at 13px/600, identical pill geometry. Hover raises the fill to Rule at 50%.
- **Submit (forms):** Solid Ink fill, white 14px/700 label, full width, pill. Hover adds a soft ink glow (`0 0 24px rgb(var(--ac-1)/0.4)`); disabled drops to 50% opacity.
- **Focus:** 2px ring in Ink at 20–40% alpha with a 2px offset against the page ground.

### Chips
- **Meta chip (FAQ):** Transparent fill, Rule border, Muted Stone text at 9px/0.3em uppercase, pill, 2px × 10px padding. Sits right-aligned on the question row from `sm` up.
- **Process chip:** Inset Linen at 30%, Rule border, 9px/500 uppercase Muted Stone with wider tracking, pill.
- **Trust badge (footer):** Savings Green or Ink at 50% text with a matching 20%-alpha border, 10px, pill.

### Cards / Containers
- **Corner Style:** 16px for standalone cards; the double-frame pairs a 16px outer with a 12px inner.
- **Background:** Card White for the inner panel; the outer frame is transparent over Warm Paper.
- **Shadow Strategy:** Panel halo on the inner surface only — see The Double-Frame Rule.
- **Border:** 0.75px Rule outside, 1px Whisper Rule inside.
- **Internal Padding:** 24px (20px on three-across tiles), with 6–8px of frame inset between the two borders.
- **FAQ row:** 16px radius, Rule border, Inset Linen at 40% with backdrop blur, deep-lift shadow. Rises 2px on hover; the plus icon rotates 45° into a close over 500ms; the answer expands via a `grid-rows-[0fr]` → `[1fr]` transition rather than a height animation.

### Inputs / Fields
- **Style:** Inset Linen at 50%, 1px Rule border, 12px radius, 12px × 16px padding, 14px Ink text, Faint Stone placeholder.
- **Focus:** Border shifts to Ink and a 2px Ink/20% ring appears. No glow, no scale.
- **Error:** Message in Cost Red at 12px directly beneath the field.
- **Label:** 12px/700 uppercase at 0.1em in Body Brown, 6px above the field.
- **Slider:** 6px Rule track, thumb is a 20px circle in Warm Paper with a 2px Ink border, scaling 1.1× on hover. The filled range is the one place the three ink accents run as a gradient.

### Navigation
- **Style:** A floating pill — Rule border, Warm Paper at 60%, heavy backdrop blur, 16px from the top, above all content.
- **Typography:** 13px/500 Body Brown links, hovering to Ink. Wordmark at 14px/700 Ink with ". AI Solutions" trailing in 11px/400 Muted Stone, hidden below `sm`.
- **Behaviour:** Hides on scroll down past 80px, returns on any 4px upward movement, animated with a spring (stiffness 280, damping 30) rather than a duration.
- **Mobile:** 44px circular menu button; the drawer is a 16px-radius panel at 95% paper with blur, animating 8px down over 180ms, dismissed on Escape or outside click with focus returned to the button.

### Signature: the interstitial sell line
A single centred sentence between sections in Inter at 14–15px, full-opacity Muted Stone, on the same paper ground with no rule, no quotation marks and no attribution. It is deliberately quieter than body text — a line you read on the way past rather than one that stops you — but that quiet comes from its small size and font-normal weight, never from dropping opacity below Muted Stone's own AA-compliant value. Two are in use on the home page. They are the system's only editorial voice element and must never be enlarged, coloured, dimmed with an opacity modifier, or turned into a pull quote.

### Signature: ambient light
A 520px radial field in Ink at 14% alpha, blurred 110px, follows the cursor with a slow spring (stiffness 55, damping 22) across every page, beneath the content and above the ground. A fixed 2.5% multiply-blend noise layer sits over the whole page, and a 0.5px scroll-progress bar in the three ink accents runs along the top. Together these keep the paper feeling lit and textured rather than flat — they must stay this subtle, and none of them may be given a hue.

### Motion grammar
- **Hero reveal:** headline animates word by word, 500ms each on a 60ms stagger, easing `cubic-bezier(0.22, 1, 0.36, 1)`. Subtitle at 600ms, paragraph at 800ms, CTA at 1000ms.
- **Article load:** blocks fade up 16px on an indexed stagger with the same easing.
- **Ambient loops:** heading shimmer sweeps every 3.6s over 1.4s; marquees run 32–36s linear; float-gentle is a 4px, 5s ease-in-out drift; the aurora wash cycles 16s.
- **State changes:** 300ms for colour, 500ms for transform and expansion, 700ms for the button sheen. Accordions are 200ms ease-out.
- **Never:** bounce, overshoot on content, spin, or any transform above 1.1× on an element carrying text.

## Do's and Don'ts

### Do:
- **Do** keep the accent monochrome. Ink (#1C1917) is both the heading colour and the primary accent — if something needs emphasis, give it size, weight or space.
- **Do** reserve #166534 and #B91C1C for money and safety states only, and always attached to a figure or a status.
- **Do** build containers as double frames: 0.75px outer Rule frame, 6–8px inset, 12px inner panel on white with the 27px halo.
- **Do** set every Playfair heading at weight 400 with `tracking-tight`.
- **Do** route all content through the 1300px shell with `px-5 md:px-8`, then narrow to `max-w-3xl` / `max-w-4xl` / `max-w-2xl` for reading.
- **Do** separate full-width sections with a `border-y` Whisper Rule hairline over the same paper ground.
- **Do** let recessed surfaces sit at partial alpha so the warm ground reads through them.
- **Do** hold a 44px minimum touch target on every mobile control.
- **Do** keep motion slow, ambient and non-bouncing; ease with `cubic-bezier(0.22, 1, 0.36, 1)`.
- **Do** keep Muted Stone and Faint Stone at full opacity on text; reach for size and weight when something needs to read quieter.

### Don't:
- **Don't** introduce a brand hue, a coloured gradient, or a glow with a hue. **Confirmed anti-reference: dark neon AI SaaS** — near-black grounds with cyan/fuchsia/violet glow, gradient-filled headlines, neon-bordered cards. This project ran that theme previously and left it deliberately.
- **Don't** reach for corporate navy, steel-blue chrome gradients, uppercase corporate headlines, or square-cornered bordered boxes. **Confirmed anti-reference: enterprise logistics blue** — the house style of the incumbent TMS vendors.
- **Don't** use gradient blobs, multi-hue purple/pink fills, emoji as section markers, 18px+ bubble radii, or exclamation-mark copy. **Confirmed anti-reference: playful startup.**
- **Don't** open a page with metric tiles, KPI rows or charts. **Confirmed anti-reference: dashboard-as-hero** — and doubly so here, because the product has no citable metrics, so such a page could only be furnished with invented figures.
- **Don't** invent numbers, logos, testimonials or customer names anywhere in the interface. Integration logos are integrations, never customers.
- **Don't** bold, uppercase, or letterspace the display serif.
- **Don't** apply a conventional drop shadow. Shadows are wide, near-offsetless halos; the primary pill is the sole exception.
- **Don't** alternate section background fills to create rhythm — use the hairline seam.
- **Don't** introduce a third shape family. Interactive elements are pills; containers are 12–16px rounded rectangles; nothing has square corners.
- **Don't** enlarge, colour, or attribute the interstitial sell lines, or add more than one per section break.
- **Don't** dim a text-color token with an opacity modifier (`text-th-muted/50`) to make it read quieter — it drops below AA contrast. Use Faint Stone only for placeholders and large/decorative text, never for small informational copy.
