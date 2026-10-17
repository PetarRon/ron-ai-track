import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Em, LogoMark, RELAY_SHELL, settle } from "./shared";

/**
 * The plate: one big panel with the line between the features and the
 * calculator (its `children`). It scrolls with the page like any section; the
 * panel that opens out as you reach it is the CTA (RelayCTA).
 */
export const RelayPlate = ({ children }: { children?: ReactNode }) => (
  <>
    <section className={`relative py-6 md:py-10 ${RELAY_SHELL}`}>
      <motion.div
        {...settle()}
        className="relay-panel bg-ac-1 flex min-h-[300px] flex-col items-center justify-center rounded-[40px] px-6 py-14 text-center md:min-h-[56vh] md:py-20"
      >
        <h2 className="max-w-3xl font-display text-[32px] font-semibold leading-[1.1] tracking-[-0.03em] text-th-page sm:text-[48px]">
          Your team runs the business.
          <span className="block">
            Let the AI agent handle the <Em dark>orders</Em>.
          </span>
        </h2>
        <div className="mt-8 md:mt-10">
          <LogoMark size={56} inverse />
        </div>
      </motion.div>
    </section>
    {children}
  </>
);
