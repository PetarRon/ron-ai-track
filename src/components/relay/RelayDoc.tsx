import type { ReactNode } from "react";
import { motion } from "framer-motion";
import type { LegalSection } from "@/components/legal/shared";
import type { RouteSeo } from "@/lib/seo";
import { RelayShell } from "./RelayShell";
import { RelayNav } from "./RelayHero";
import { RelayFooter } from "./RelayFooter";
import { FlowRibbon } from "./RelayFlow";
import { Card, Em, RELAY_SHELL, settle } from "./shared";

/**
 * A long document (privacy policy, terms) in the Relay look: the gradient fills
 * the header, the title pairs the display face with one light accent word, and
 * the text sits on a glass card, each section settling in as it scrolls up.
 */

/** one numbered section of a legal text, in the Relay type */
export const RelayDocSection: LegalSection = ({ title, children }) => (
  <motion.section {...settle()} className="border-t border-th-line/70 py-8 first:border-t-0 first:pt-2 last:pb-2">
    <h2 className="font-display text-[20px] font-semibold tracking-[-0.02em] text-th-heading">{title}</h2>
    <div className="mt-3 space-y-3 font-body text-[15px] leading-relaxed text-th-body [&_strong]:font-semibold [&_strong]:text-th-heading">
      {children}
    </div>
  </motion.section>
);

export const RelayDoc = ({
  seo,
  title,
  accent,
  updated,
  children,
}: {
  seo: RouteSeo;
  title: string;
  accent: string;
  updated: string;
  children: ReactNode;
}) => (
  <RelayShell seo={{ route: seo }} light>
    <FlowRibbon snake={false} />
    <RelayNav />
    <header data-flow-head className={`relative pb-12 pt-14 md:pt-20 ${RELAY_SHELL}`}>
      <div className="mx-auto max-w-3xl">
        <motion.h1
          {...settle()}
          className="font-display text-[40px] font-semibold leading-[1.04] tracking-[-0.03em] text-th-heading sm:text-[56px]"
        >
          {title} <Em>{accent}</Em>
        </motion.h1>
        <motion.p {...settle(0.1)} className="mt-4 font-body text-[14px] text-th-muted">
          Last updated: {updated}
        </motion.p>
      </div>
    </header>
    <main className={`relative pb-24 ${RELAY_SHELL}`}>
      <Card className="mx-auto max-w-3xl px-6 py-6 md:px-12 md:py-10">{children}</Card>
    </main>
    <RelayFooter />
  </RelayShell>
);
