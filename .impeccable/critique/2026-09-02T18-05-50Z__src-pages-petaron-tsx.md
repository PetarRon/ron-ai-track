---
target: the homepage
total_score: 23
max_score: 36
na_heuristics: 7
p0_count: 1
p1_count: 4
target_identity: "file:C:\\Users\\ronle\\desktop\\PetaRon\\website\\ron-ai-track\\src\\pages\\Petaron.tsx"
target_fingerprint: "sha256:a476cc267e002626dca3d9bb433848e32950441db54459fda93f88dcd31475ca"
target_path: "C:\\Users\\ronle\\desktop\\PetaRon\\website\\ron-ai-track\\src\\pages\\Petaron.tsx"
timestamp: 2026-09-02T18-05-50Z
slug: src-pages-petaron-tsx
---
Method: dual-agent (A: design review · B: detector + browser evidence)

Target: Petaron.ai home page — `src/pages/Petaron.tsx` and the 14 components it composes. Surface mode: **Persuade**. Assessed against PRODUCT.md (buyer: owner/MD of a 20–200 person forwarder) and DESIGN.md ("The Dispatch Ledger").

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | "Book a Demo for Free" gives no feedback while the Cal.com embed boots; lazy board images render as blank white panels before load. |
| 2 | Match System / Real World | 2 | Copy is operator-literate, but the hero photo is long-haul trucking (the buyer is a broker, not a carrier) and not one of the seven TMS names ever renders on the page. |
| 3 | User Control and Freedom | 3 | Contact modal has Escape + backdrop + close, but no focus trap and focus is never returned to the trigger. |
| 4 | Consistency and Standards | 2 | Playfair renders at 400/500/600/700 across four sections; two incompatible card idioms coexist; every section title is an `h3` with no `h2` on the page. |
| 5 | Error Prevention | 3 | Sliders bounded, form has required fields + honeypot, but orders/day caps at 500 with no numeric entry — a 200-person forwarder silently understates its own pain. |
| 6 | Recognition Rather Than Recall | 2 | The buyer must recall whether his TMS is supported because no integration list renders; nav label "Platform" leads to a section headed "See it in action". |
| 7 | Flexibility and Efficiency | n/a | Single-visit Persuade surface with one conversion path; no repeat-use workflow exists for accelerators to live in. |
| 8 | Aesthetic and Minimalist Design | 2 | Genuinely restrained typography, but six sub-AA contrast failures (worst 1.8:1), 25 instances of sub-11px functional text, and two gradient-clipped headings that render invisible if the background fails to paint. |
| 9 | Error Recovery | 2 | A network/500 failure on the contact form re-enables the button with no message at all — a silent dead end on the sole lead-capture path. |
| 10 | Help and Documentation | 3 | Seven well-aimed FAQ answers in the buyer's language; undercut by being collapsed, unsearchable and last. |
| **Total** | | **23/36** | **Competent surface, unpersuasive argument** |

Applicable maximum 36; heuristic 7 scored n/a.

## Design Specificity Verdict

**LLM assessment.** This page was not authored for freight order intake; it was authored for "a B2B SaaS," and the freight is a skin. Strip the three product screenshots and the word "TMS" and the whole composition — washed hero photo, centred serif headline with an italic second line, alternating image/text rows, three icon cards, a green/red comparison table, a slider ROI calculator, an accordion FAQ, a particle-field wordmark — transfers unchanged to legal-tech, healthcare billing, or AP automation. Nothing about the structure knows what a freight order is.

The North Star recorded in DESIGN.md — "The Dispatch Ledger," the trade's own paperwork rendered with care — appears nowhere in the composition. There is no waybill, no manifest, no rate sheet, no field-mapping table, no ruled column of figures. A ledger page is the single most freight-specific device available and it carries zero evidence risk. Instead the largest image on the page is a stock long-haul truck on a mountain road, which signals *trucking* — an industry this buyer is not in. A forwarder is a broker; their day is documents and screens, not a cab.

The specificity that does exist is unrendered: `data.ts:3-11` holds CargoWise, SAP, Descartes, Scope, Modality, Gmail and Microsoft, and nothing imports it. The one legitimate, non-fabricated proof asset the product owns is dead code.

**Deterministic scan.** CLI detector exit 2, 34 findings across 2 rules — 33 `design-system-font-size` (advisory) and 1 `gradient-text` (warning). `src/pages/Petaron.tsx` itself was clean; everything sits in `src/components/petaron/`.

12 of the 33 font-size findings are false positives caused by DESIGN.md's own notation: it declares ranges with en-dashes (`display: 26px–44px`, `body: 14px–16px`), which the detector cannot parse, so every legitimate in-range value is flagged. The remaining 21 are real: 13px (×8), 11px (×5) and 10px (×8) are undocumented steps sitting in the gaps between the recorded ramp members — a de-facto type scale DESIGN.md never records.

The `gradient-text` match at `Hero.tsx:58` is a true pattern match but the wrong diagnosis: the gradient is a monochrome warm-grey ramp inside the ink palette, not a chromatic one. The real risk it exposes is different — the element is `text-transparent`, so the headline renders invisible if the background fails to paint. The CLI missed a second, more exposed instance at `CTASection.tsx:12`, where the gradient arrives via inline `style` rather than a class and `WebkitTextFillColor: transparent` is set explicitly.

**Visual overlays.** In-page injection succeeded and the overlay rendered 133 nodes; the console reported `[impeccable] 67 anti-patterns found`, unpacking to 83 findings across 15 rules. The assessment tab has since been closed and the overlay server terminated, so nothing is on screen now. Highest-signal live findings the CLI could not see:

- **low-contrast ×6, all below AA 4.5:1.** Worst is the footer copyright at **1.8:1** (`#c3bcb2` on `#faf8f5`). Five more at 3.6–3.8:1 (`text-th-muted`): the calculator headings, both interstitial sell lines, and the footer blurb.
- **undersized-ui-text ×25** — 10px and 9px functional text: the chrome pill, the `01/02/03` board labels, the Email/PDF/Excel and TMS-ready chips, all seven FAQ category tags, and the calculator's slider values.
- **line-length ×9** — seven FAQ answers running ~111 characters per line against a <80 target.
- **skipped-heading** — `h1` followed directly by `h3`; no `h2` exists. Independently found by both assessments.
- **gpt-thin-border-wide-shadow ×15** — partly the project's deliberate 0.75px hairline (false positive), but the 80px blur on FAQ rows and lightbox buttons is genuinely driving the match.
- **nested-cards ×10** and **buried-raster ×2** map onto the deliberate double-frame and noise-texture choices — expected by design.

Console on load: one React error — `fetchPriority` prop warning from `Hero.tsx:54` — plus two React Router v7 future-flag warnings. No uncaught exceptions, no failed resource loads. **No horizontal overflow at 390px** (verified in a true 390px iframe: scrollWidth == clientWidth).

## Overall Impression

The craft is real and the argument is not. Typography, hairlines, restraint and voice are all better than the category deserves — this genuinely does not look like enterprise-logistics blue, which was the whole point. But the page spends its largest surfaces on the weakest evidence and its smallest on the strongest. 1940px goes to screenshots of a dashboard whose numbers are invented; 502px goes to the mechanism, which is the entire case a pre-proof product has. The emotional arc peaks on a large red number telling the visitor what they are losing, then ends on a particle field.

The single biggest opportunity: **the North Star is a ledger and the page has never drawn one.** An order document becoming a structured field table becoming an approved record is the most freight-specific, most mechanism-revealing, most evidence-safe image available — and it would replace the truck, the generic screenshots, and the anxiety peak in one move.

## What's Working

1. **The interstitial sell lines are perfectly calibrated.** At 14–15px in Muted Stone at 45–50% opacity, with no rule, no quote marks and no attribution, they read as a thought you pass rather than a claim you must evaluate. This matters more than it looks: a pull quote demands appraisal and invites "says who?", which is fatal for a product with no citable evidence. By refusing emphasis, the line buys voice without incurring a proof obligation. The most disciplined decision on the page.

2. **The FAQ answers pre-empt the real objections in the right order.** "Does it work with our existing TMS," "Does our team lose control," "What happens when the AI encounters an edge case" are the three questions actually in an MD's head, answered in short declaratives — "It flags it." "Days, not months." — that read as a person talking. Concision reads as confidence in a category defined by fog.

3. **The monochrome ink system is executed with conviction in type and rules.** Warm paper, 0.75px hairlines, regular-weight Playfair at display size, pill-versus-panel discipline. The absence of brand hue forces hierarchy through size and air, which is the right instinct for a buyer who distrusts polish.

## Priority Issues

### [P0] The contact form fails silently — on the only lead-capture path

**Why it matters:** `FinalCTA.tsx:85-161` renders per-field validation only. On a network or 500 failure the submit button simply re-enables with no message, no retry guidance, and no fallback email anywhere on the page. The visitor believes they sent a message that never arrived, and Petaron never learns the lead existed. Every other issue here costs persuasion; this one costs the conversion outright.

**Fix:** Add a submit-level error state — a Cost Red line above the button naming what happened and what to do ("Message didn't send. Try again, or email us directly at …"), plus a real mailto fallback. Same treatment on the Careers form, which shares the pattern.

**Suggested command:** `/impeccable harden`

### [P1] The argument is inverted: 1940px of screenshots, 502px of mechanism

**Why it matters:** PRODUCT.md Principle 4 says a pre-proof product persuades "with mechanism, specificity, and the free pilot offer — never with borrowed credibility." With no logos or testimonials available, mechanism *is* the case. An MD scanning for "what actually changes on my desk" passes three browser-chrome screenshots he cannot read at that size before reaching the only content that answers him. Worse, the first of those screenshots is a metrics dashboard — DESIGN.md's own dashboard-as-hero anti-reference in spirit, and its four tiles (27, 612, 284, 48) read as performance data the product cannot substantiate.

**Fix:** Invert the ratio. Cut the preview from three full board rows to one, and rebuild the process section at the scale currently given to screenshots — as a ledger: the incoming order document on the left, the structured field table it becomes in the middle, the approved record on the right. Then render the seven integration names from `data.ts` as a hairline-ruled row labelled "Pushes into" — a ruled list of names in Ink, never a logo wall, which would read as customers.

**Suggested command:** `/impeccable layout`

### [P1] The human-approval invariant is buried, and it is the adoption argument

**Why it matters:** PRODUCT.md calls human approval "a product invariant, not a configurable setting," and Principle 2 says make it visible, "not a footnote." On the page it is a footnote three times: a 13px line in the smallest section, an unnamed table row, and FAQ item 3 of 7, collapsed. This buyer's stake is "will this break my order flow or cost me a customer." Everything else on the page is upside; this is the only thing that neutralises downside, and it is currently smaller than a screenshot caption.

**Fix:** Give it a named section between the process flow and the calculator — one line at section-heading scale ("Nothing reaches your TMS until a person says so"), one sentence, and the review screenshot cropped to the approve control. ~300px, and the highest-leverage 300px on the page.

**Suggested command:** `/impeccable bolder`

### [P1] The calculator ends on the visitor's loss, and Savings Green is never used

**Why it matters:** `OrderCostCalculator.tsx:149-163` renders one enormous Cost Red annual figure and stops. Verified live: no element on the page uses #166534 for a figure. The page's emotional peak is "you are bleeding €X" — pure anxiety — immediately followed by an ask. An owner who thinks in margin needs the return, not just the burn. DESIGN.md already reserves Savings Green for exactly this ("Calculator savings figures"); the system's own money vocabulary has the resolution built in and the page never spends it.

**Fix:** Pair the figure. Stay inside the evidence constraint by restating the visitor's own arithmetic rather than a Petaron claim: the red total beside "hours returned to your desk each month" in Savings Green, with a one-line note that the figure comes from their inputs. Converts the peak from fear to recovery without inventing a metric.

**Suggested command:** `/impeccable colorize`

### [P1] Two lines of copy breach the evidence constraint

**Why it matters:** `data.ts:112` — "**Most teams** see the impact in the first week" — implies a customer base *and* asserts an unverified performance result. PRODUCT.md is explicit that the pilot client must not be referenced "not named, not anonymised, not counted, **not implied**." This is the exact prohibited construction. `FAQ.tsx:23` — "A few of the things **teams ask most**" — does the same, more softly. Both also fail on their own terms: a hedge like "most" reads as evasion to a sceptical MD.

**Fix:** Rewrite to the offer, which is fully defensible: "The pilot is free for a month on your own orders, so you see the impact before you commit to anything." FAQ intro becomes "Questions worth asking before you start." Both get stronger by dropping the borrowed credibility.

**Suggested command:** `/impeccable clarify`

## Persona Red Flags

**Morgan (owner/MD of a 60-person forwarder — the primary buyer).** Scans for his TMS name and finds none; `data.ts` has CargoWise and the page renders it nowhere, so he cannot answer his first disqualifying question without booking a call. Scans for cost and finds no pricing section and no statement that pricing scales with volume; the free one-month pilot — his lowest-risk entry and the strongest safe offer available — is FAQ item **7 of 7**, collapsed. The CTA says "Book a Demo for Free," where "free" modifies the demo, not the pilot. Reaches the calculator, is told he is losing a large red number, and is given no figure for what he gets back. The single largest image on the page is a truck he doesn't own.

**Jordan (first-timer).** Lands on "Order entry has never been this easy" over a truck photo; nothing in the first screen says what kind of company this is for — the words "freight forwarder" never appear in the hero. Nav item "Platform" leads to a section headed "See it in action," so the label teaches him nothing. Board captions assume he already knows what "review load" is. The middle process chip reads "Data Enrichment & Processing" where its neighbours are concrete nouns.

**Riley (stress tester).** Submits the contact form with the network down and gets nothing — no error, no retry, no fallback address. Tabs into the open modal and walks straight out to the page behind it; there is no focus trap, and closing drops focus to `<body>`. Drags orders/day to the ceiling and hits 500 with no numeric entry. Runs an accessibility check and finds `h1` → `h3` with no `h2`, plus six sub-AA contrast failures. Throttles the connection and finds every below-fold block gated on `opacity: 0` + IntersectionObserver with no CSS fallback — the page degrades to a hero and blank paper. No `prefers-reduced-motion` handling exists anywhere in the codebase.

**Casey (distracted, mobile).** Below `sm`, `BeforeAfterTable.tsx:42` hides the column headers and stacks all ten cells into one column, so the without/with pairing collapses into an undifferentiated list — the comparison stops being a comparison. The calculator stacks three drag-only sliders above the figure they drive, so on a phone the result scrolls out of view while her thumb is on the control; cause and effect are never on screen together. `SparklesSection` animates 80 motion divs below the footer — battery cost after the content ends.

## DESIGN.md Rule Violations

The system was recorded from this code, so these are places the page contradicts itself:

| Rule | Violation | Location |
|---|---|---|
| **The Never-Bold-Serif Rule** | Playfair renders at **600** for Capture/Process/Review, **500** for all seven FAQ questions, **700** for footer column headers. Confirmed by computed style, not inference. Root cause: `index.css:116-118` applies `font-serif` to all `h1`–`h6`, so any weight utility on a heading silently bolds the display face. | `ProcessFlowSection.tsx:55`; `FAQ.tsx:65`; `Footer.tsx:36` |
| **The Uppercase-Is-Metadata Rule** | Footer "PRODUCT / COMPANY / LEGAL" are uppercase, letterspaced 0.2em, **and set in Playfair at 700** — the display serif doing precisely what the rule forbids. | `Footer.tsx:36` |
| **The No-Drop-Shadow Rule** | `0 30px 80px -20px rgba(0,0,0,0.4)`, hover `0 30px 100px -20px rgba(0,0,0,0.55)` — a 30px Y-offset at 40–55% black is a textbook drop shadow, on the three largest objects on the page. Also `shadow-2xl` on header and modal. | `BoardRow.tsx:56`; `Header.tsx:103`; `FinalCTA.tsx:54` |
| **The Double-Frame Rule** | The three board rows are single-bordered cards with the shadow on the outer element. The process cards and calculator implement the rule correctly, so the page contradicts itself. | `BoardRow.tsx:56` vs. `ProcessFlowSection.tsx:41-50` |
| **The Money-Only Rule** | Savings Green used as a decorative column wash across the whole "With Petaron" side (`bg-ac-pos/[0.06]`) and its label — a tint on a column of prose, not a figure. A third leak: `BoardRow.tsx:12-22` uses `bg-ac-pos` for a decorative browser-chrome dot. | `BeforeAfterTable.tsx:31,48-49,59`; `BoardRow.tsx:18` |
| **Anti-reference: playful startup / dark neon** | `SparklesSection` is an 80-particle field behind a ghost wordmark — the last impression on the page. `sparkles.tsx:28` still defaults `particleColor` to `#22d3ee`, cyan, from the abandoned neon theme. | `Petaron.tsx:29` |
| The One Shell Rule · The Hairline Seam Rule · sell-line protections | **Honoured.** Noted because these are the rules most often broken. | — |

## Minor Observations

- **[P2] Contrast and undersized text.** Six sub-AA failures (footer copyright at 1.8:1; five `text-th-muted` items at 3.6–3.8:1) and 25 instances of 9–10px functional text. The awkward part: both interstitial sell lines — the page's best single decision — are among the contrast failures. The intent (quieter than body text) is right and worth keeping; it just has to be achieved with size, weight and space rather than by dropping below 4.5:1. This would be a Priority Issue in a longer list.
- **Dead code from the abandoned theme.** `SectionBadge` still types `tone: "cyan" | "fuchsia"`; `GlowEffect` and `BackgroundBeams` are unused; `featureCards` and `processStages` in `data.ts` never render — and `processStages` contains *better* copy than what ships, including "Human approval before push" as a first-class field, plus the staggered `lg:ml-12` / `lg:ml-24` indents DESIGN.md documents as shipped. The documented design and the shipped design have diverged here.
- **`Hero.tsx:54` throws a React error on every load** — `fetchPriority` should be `fetchpriority` on a DOM element.
- **Five font families load, three are used.** Space Grotesk, Instrument Serif and DM Serif Display are downloaded and never referenced.
- **`Petaron.tsx:24`** inserts a bare gradient hairline between CTASection and FAQ — neither the documented `border-y` seam nor part of any section.
- **`CTASection.tsx:12`** runs the heading shimmer on `repeat: Infinity` indefinitely, adjacent to the primary CTA — a permanently animating element competing with the ask.
- **Heading structure**: every section title is an `h3` and board titles are also `h3`, making them siblings rather than children of their section.

## Questions to Consider

1. **DESIGN.md defines the test — "would this element belong on a well-kept ledger page?" Which element on this home page passes it?** Not the truck, not the browser chrome, not the particle field. The type and hairlines pass; the composition does not. Was the ledger ever a design direction, or only a colour palette?

2. **The page's largest visual is a truck and its loudest figure is red — both belong to the visitor's problem. What single element belongs to the solution, and why is it smaller than the browser chrome drawn around a screenshot?**

3. **If an MD gave this page ninety seconds, would he see the mechanism, the seven TMS names, or the free pilot?** All three are safe to show and all three are currently buried — one in a 502px section, one in unimported code, one in the seventh collapsed FAQ row.
