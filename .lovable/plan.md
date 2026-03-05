

## Plan: Redesign Petaron.ai inspired by baz.co/features

### What baz.co does differently

The baz.co/features page has a distinctive structure: a large centered hero title, then each feature category lives inside a massive full-width rounded container (like a "mega-card") with a category badge, a headline, and a 3-column grid of sub-feature cards inside. The navbar uses a centered pill/rounded style. Everything feels spacious, with generous padding and large border-radius containers. The color palette is similar to what we have (dark navy + accent), but the layout architecture is different.

### Changes

**1. PetaronNavbar.tsx** -- Redesign to match baz's centered pill-style navbar with rounded container, logo left, links centered, CTA right. Add a subtle border and rounded-full or large rounded wrapper around the nav group.

**2. PetaronHero.tsx** -- Simplify to a large centered title (like baz's "Made for Your Coding Workflow"), remove the product mockup from the hero, add category anchor tabs below the title (e.g., "Order Processing ↘", "Integrations ↘", "Security ↘", "ROI ↘") that scroll to sections. Keep the trust bar.

**3. Wrap each major section in a "mega-card"** -- Each section (How It Works, ROI Calculator, Social Proof, Comparison, Trust, FAQ) gets wrapped in a large full-width rounded container (`rounded-3xl bg-card border border-border`) with a category badge pill at the top, matching baz's section containers.

**4. HowItWorks.tsx** -- Restructure into a mega-card with a badge ("HOW IT WORKS"), headline, and 3-column feature cards inside. Each card gets a dark sub-card with icon, title, description -- matching baz's grid layout within sections.

**5. PainPoints.tsx** -- Wrap in mega-card container with badge, keep narrative text but add visual structure.

**6. SocialProof.tsx** -- Wrap in mega-card, keep stats grid + testimonial but style cards to match baz's sub-card pattern.

**7. ComparisonTable.tsx** -- Wrap in mega-card with badge.

**8. TrustSecurity.tsx** -- Wrap in mega-card with badge and 3-column grid of trust items styled as baz-like sub-cards.

**9. ROICalculator.tsx** -- Wrap in mega-card with badge.

**10. FinalCTA.tsx** -- Simplify to a centered one-liner CTA like baz's "Meet your new code review dream team" with a single button.

**11. PetaronFooter.tsx** -- Add a multi-column link layout with SOC/compliance badge, similar to baz's footer structure.

### Files to modify
- `src/components/petaron/PetaronNavbar.tsx`
- `src/components/petaron/PetaronHero.tsx`
- `src/components/petaron/PainPoints.tsx`
- `src/components/petaron/HowItWorks.tsx`
- `src/components/petaron/ROICalculator.tsx`
- `src/components/petaron/SocialProof.tsx`
- `src/components/petaron/ComparisonTable.tsx`
- `src/components/petaron/TrustSecurity.tsx`
- `src/components/petaron/PetaronFAQ.tsx`
- `src/components/petaron/FinalCTA.tsx`
- `src/components/petaron/PetaronFooter.tsx`

No new dependencies needed. All changes use existing Tailwind classes, framer-motion, and lucide-react.

