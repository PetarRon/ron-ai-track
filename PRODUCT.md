# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary: the owner or managing director of a small-to-midsize freight forwarder** (roughly 20–200 people). They hold the budget and make the call themselves — there is no procurement committee to satisfy. They think in margin, capacity, and headcount, not in field mapping or extraction accuracy: the question in their head is "how much of my team's day is going into retyping orders, and what would I get back if it stopped?" They are not evaluating an AI product on its AI; they are deciding whether this changes the economics of their desk.

Secondary audiences exist but do not drive design decisions: the ops manager or team lead who would run the tool day to day, and the operator who does the entry today and must be shown they keep control rather than lose their job.

## Product Purpose

Petaron.ai removes manual order intake for freight forwarders. When an order arrives — email, PDF, Excel, whatever the customer actually sent — an AI agent reads it, structures the order data, maps it to the forwarder's TMS fields, validates the critical ones, and presents a TMS-ready draft. An operator approves in seconds instead of typing for minutes, and only then does anything reach the TMS.

Success is that a forwarding desk stops spending its day on data entry and spends it on customers instead. The site's job is to make an SMB owner see that trade clearly enough to book a demo or start the free pilot.

## Positioning

Four claims that hold together and that a neighbouring AI-extraction vendor could not truthfully copy in combination:

1. **Built for freight operations from the ground up** — not a general document-AI tool pointed at logistics. The product is shaped around forwarding reality: multi-format orders, carrier rules, TMS field semantics, zero tolerance for a wrong field.
2. **Agentic, not template-based** — no per-sender templates or extraction rules to build and maintain. The agent reads what arrives and reasons about it, so a new customer or a new document format needs no setup work.
3. **Ends in the TMS the forwarder already runs** — human-approved drafts pushed into CargoWise, SAP, Descartes, Scope (Riege), Modality and others. Not a parsed export the team still has to retype. No rip-and-replace.
4. **Speed to value** — live on real mail flow in days, not months, with a free one-month pilot on the customer's own data. Proof before commitment.

## Operating Context

Orders arrive unstructured and unpredictably: email bodies, PDF attachments, spreadsheets, forwarded threads, across Gmail and Microsoft inboxes and portals. Today an operator opens each one, reads it, and retypes it into the TMS. Volume is spiky, deadlines are tight, and an error is expensive — which is why the human approval step is not a nicety but the reason the tool is adoptable at all.

Buyers evaluate against an existing TMS they have already paid for and trained on, and against the memory of implementations that took months.

## Capabilities and Constraints

- Reads incoming emails plus PDF, Excel, and other attachments across channels into one intake stream.
- Structures order data, maps fields, and validates critical details automatically.
- Flags anything the agent is not fully confident about for human review.
- **Human-in-the-loop is absolute**: nothing reaches the TMS without an operator approving it. This is a product invariant, not a configurable setting.
- Integrates with the customer's existing TMS: CargoWise, SAP, Descartes, Scope (Riege), Modality, and others; email via Gmail and Microsoft.
- EU-hosted and GDPR-compliant.
- Onboarding measured in days, not months.
- Free one-month pilot on the customer's actual data; pricing scales with order volume. **No pricing figures are published or decided for the site.**
- Stack (existing): Vite + React 18 + TypeScript, Tailwind + shadcn/ui, framer-motion, react-router. Deployed on Vercel. Contact via Formspree, demo booking via Cal.com.

## Brand Commitments

- Name: **Petaron.ai**. The name is a blend of the two founders' names, **Petar** and **Ron** — and, by coincidence, *petaron* (פתרון) is Hebrew for "solution". This story is on the About page and is durable brand truth.
- Company: Petaron AI, based in the Netherlands. Founders Ron Lev Tabuchov and Petar Paskalev, both publicly credited on the About page with LinkedIn links and a founders photograph (`public/founders.png`).
- Existing assets: `public/petaron_logo.svg`, favicons, hero background (`hero-bg.avif/webp/png`), product screenshots (`petaron-dashboard.png`, `petaron-orders.png`, `petaron-review.png`) and board SVGs.
- Voice in the shipped copy: plain, confident, operator-literate, no hype and no AI mysticism. Short declaratives ("Days, not months." "It flags it."). Serif headlines, sober claims.
- The incumbent visual system is documented in `THEME-GUIDE.md` and driven from `src/index.css` theme tokens; it is design authority for refinement work.

## Evidence on Hand

- **One pilot client is live. It must not be referenced on the site in any form** — not named, not anonymised, not counted, not implied ("our pilot customers", "teams already running Petaron"). The user's instruction is explicit: it does not help right now.
- **There are no citable customers, logos, testimonials, case studies, press mentions, or verified performance metrics.** Nothing in this category may be invented or implied. The logos currently on the site are TMS and email vendors shown as *integrations*, and must never be presented as customers.
- Claims that are safe because they describe the offer or the product rather than results: the free one-month pilot, EU hosting and GDPR compliance, the named TMS integrations, human approval before TMS push, onboarding in days.
- The cost calculator on the homepage is a **visitor-input estimator** — the visitor supplies orders/day, minutes/order, and hourly cost. Its output is the visitor's own arithmetic, not a Petaron performance claim. Any reduction percentage it applies is a modelling assumption and must not be restated elsewhere as a measured result.
- Real product screenshots exist in `public/` and are legitimate evidence of the interface.

## Product Principles

1. **Sell the returned hour, not the model.** The buyer is an owner counting capacity and margin. Lead with what stops happening on their desk; the AI is the mechanism, never the pitch.
2. **Control is the adoption argument.** Human approval before anything reaches the TMS is the answer to the fear the buyer actually has. Make it visible, not a footnote.
3. **Fit into what they already run.** Every claim, flow, and visual should reinforce that the existing TMS, inbox, and process survive intact. Nothing here asks them to change how they work.
4. **Claim only what is true and unattributed.** Pre-proof product: no customers, no metrics, no pilot references. Persuade with mechanism, specificity, and the free pilot offer — never with borrowed credibility.
5. **Operator-literate plainness.** Speak the way freight people speak. Concrete nouns, short sentences, no enterprise-software fog.

## Accessibility & Inclusion

No product-specific standard has been established. The audience is European SMB logistics; English is the only shipped language, with no committed localisation plan.
