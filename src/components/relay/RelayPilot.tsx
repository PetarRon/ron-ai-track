import { useRef, type CSSProperties } from "react";
import { motion, useInView } from "framer-motion";
import { Em, RELAY_SHELL, settle } from "./shared";

/**
 * The pilot, as a timeline: from the first call to a decision on day 30. Four
 * stops on one line; when it scrolls into view each stop lights up in turn and
 * the line fills on to the next. The line runs across on wide screens and
 * down on phones. Facts match the FAQ (live within a week, a free month, no
 * commitment before it ends). Styles: `.relay-pilot` in src/index.css.
 */

const STEPS = [
  {
    when: "Day 1",
    title: "A 30-minute call",
    body: "Show us how orders reach you today and what your TMS needs from them.",
  },
  {
    when: "Week 1",
    title: "Set up on your inbox",
    body: "We connect to your order email flow and configure your fields. Your TMS stays exactly as it is.",
  },
  {
    when: "Weeks 2 to 4",
    title: "Run it beside your team",
    body: "The AI agent drafts every incoming order. Your team approves each one; nothing reaches your TMS without them.",
  },
  {
    when: "Day 30",
    title: "Decide on your own orders",
    body: "You have seen it work on your real volume. The month is free, with no commitment before it ends.",
  },
];

export const RelayPilot = () => {
  const ref = useRef<HTMLOListElement>(null);
  const on = useInView(ref, { once: true, margin: "-20% 0px" });

  return (
    <section id="pilot" className={`relative scroll-mt-20 py-20 ${RELAY_SHELL}`}>
      <div className="mx-auto grid max-w-3xl justify-items-center gap-4 text-center">
        <motion.h2
          {...settle()}
          className="text-balance font-display text-[clamp(28px,4.4vw,44px)] font-semibold leading-[1.08] tracking-[-0.03em] text-th-heading"
        >
          Live on your own orders <Em>within a week.</Em>
        </motion.h2>
        <motion.p {...settle(0.1)} className="max-w-xl font-body text-[15px] leading-relaxed text-th-body">
          Then a free month to watch it work, before you commit to anything.
        </motion.p>
      </div>

      <motion.div {...settle(0.15)} className="mx-auto mt-12 max-w-5xl rounded-[28px] border border-white/10 relay-pane px-6 py-10 md:px-12 md:py-12">
        <ol ref={ref} className={`relay-pilot grid gap-8 md:grid-cols-4 ${on ? "is-on" : ""}`}>
          {STEPS.map((s, i) => (
            <li key={s.when} className="relative pl-9 md:pl-0 md:pt-10" style={{ "--i": i } as CSSProperties}>
              {i < STEPS.length - 1 && (
                <span aria-hidden className="relay-pilot-seg">
                  <span />
                </span>
              )}
              <span aria-hidden className="relay-pilot-dot" />
              <div className="relay-pilot-text">
                <span className="font-mono text-[12px] font-medium text-ac-1">{s.when}</span>
                <h3 className="mt-1.5 font-display text-[19px] font-semibold tracking-[-0.02em] text-th-heading">{s.title}</h3>
                <p className="mt-2 font-body text-[14px] leading-relaxed text-th-body">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </motion.div>
    </section>
  );
};
