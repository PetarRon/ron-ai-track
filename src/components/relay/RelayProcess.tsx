import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { Em, RELAY_SHELL, settle } from "./shared";

/**
 * The manual way versus Petaron: the live site's comparison table, set on dark
 * glass. Rows arrive one at a time; the cross side stays quiet, the tick side
 * carries the lime.
 */

const rows: { without: string; with: string }[] = [
  { without: "5–15 min of copy-pasting per order", with: "A ready-to-approve draft in under a minute" },
  { without: "Typos and missed line items slip through", with: "Every field checked before it lands" },
  { without: "Skilled staff stuck on data entry", with: "Your team freed for the work that needs them" },
  { without: "Volume spikes mean backlogs and overtime", with: "Same effort whether it's 10 orders or 1,000" },
  { without: "Orders wait in the inbox after hours", with: "Processed the moment they arrive, 24/7" },
];

const cell = "flex items-start gap-3 px-5 py-4 md:px-7";

export const RelayProcess = () => (
  <section id="process" className={`relative scroll-mt-20 py-20 ${RELAY_SHELL}`}>
    <motion.h2
      {...settle()}
      className="mx-auto max-w-3xl text-balance text-center font-display text-[clamp(28px,4.4vw,46px)] font-semibold leading-[1.08] tracking-[-0.03em] text-th-heading"
    >
      Most of an order is retyping. <Em>Let the AI agent do it.</Em>
    </motion.h2>

    <motion.div
      {...settle(0.15)}
      className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-2xl border border-white/10 relay-pane shadow-[0_40px_90px_-40px_rgb(0_0_0/0.9)]"
    >
      {/* column heads from sm up; on phones each pair stacks and the marks carry the meaning */}
      <div className="hidden grid-cols-2 font-mono text-[11px] uppercase tracking-[0.18em] sm:grid">
        <span className="px-5 py-3.5 text-th-muted md:px-7">Without Petaron</span>
        <span className="border-l border-white/[0.06] px-5 py-3.5 text-ac-1 md:px-7">With Petaron</span>
      </div>

      {rows.map((row, i) => (
        <motion.div
          key={row.without}
          className="grid grid-cols-1 border-t border-white/[0.06] sm:grid-cols-2"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.6, delay: 0.25 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={cell}>
            <X className="mt-[3px] h-4 w-4 shrink-0 text-th-faint" aria-hidden />
            <span className="font-body text-[13.5px] leading-relaxed text-th-muted">{row.without}</span>
          </div>
          <div className={`${cell} sm:border-l sm:border-white/[0.06]`}>
            <Check className="mt-[3px] h-4 w-4 shrink-0 text-ac-1" aria-hidden />
            <span className="font-body text-[13.5px] leading-relaxed text-th-heading">{row.with}</span>
          </div>
        </motion.div>
      ))}
    </motion.div>
  </section>
);
