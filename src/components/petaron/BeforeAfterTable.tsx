"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const rows: { without: string; with: string }[] = [
  {
    without: "5–15 min of copy-pasting per order",
    with: "A ready-to-approve draft in under a minute",
  },
  {
    without: "Typos and missed line items slip through",
    with: "Every field checked before it lands",
  },
  {
    without: "Skilled staff stuck on data entry",
    with: "Your team freed for the work that needs them",
  },
  {
    without: "Volume spikes mean backlogs and overtime",
    with: "Same effort whether it's 10 orders or 1,000",
  },
  {
    without: "Orders wait in the inbox after hours",
    with: "Processed the moment they arrive, 24/7",
  },
];

const withoutCell = "flex items-start gap-2.5 px-5 py-4 md:px-7 border-t border-th-line-subtle";
const withCell = `${withoutCell} bg-ac-pos/[0.06] sm:border-l sm:border-th-line-subtle`;

export const BeforeAfterTable = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-10% 0px" }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-th-line bg-th-surface shadow-[0_0_27px_0_rgba(45,45,45,0.10)]"
  >
    {/* Column headers — hidden on mobile, where the ✕/✓ colour coding carries the meaning */}
    <div className="hidden grid-cols-2 sm:grid">
      <div className="px-5 py-3.5 md:px-7">
        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-th-muted">
          Without Petaron
        </span>
      </div>
      <div className="border-l border-th-line-subtle bg-ac-pos/[0.06] px-5 py-3.5 md:px-7">
        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-ac-pos">
          With Petaron
        </span>
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2">
      {rows.map((row) => (
        <Fragment key={row.without}>
          <div className={withoutCell}>
            <X className="mt-0.5 h-4 w-4 shrink-0 text-ac-neg/70" aria-hidden="true" />
            <span className="text-[13px] leading-relaxed text-th-body md:text-sm">
              {row.without}
            </span>
          </div>
          <div className={withCell}>
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-ac-pos" aria-hidden="true" />
            <span className="text-[13px] font-medium leading-relaxed text-th-heading md:text-sm">
              {row.with}
            </span>
          </div>
        </Fragment>
      ))}
    </div>
  </motion.div>
);
