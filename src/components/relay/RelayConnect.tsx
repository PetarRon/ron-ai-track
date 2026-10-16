import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Em, LogoMark, RELAY_SHELL, settle } from "./shared";

/**
 * Beyond orders: the agent sits between any two systems and does the field
 * entry. One strip, from-system, agent, to-system, with a pulse running along
 * the lines; every few seconds the pair and its example fields change.
 */

const PAIRS = [
  { from: "Email & PDF", to: "TMS", fields: ["Consignor", "Load site", "Weight"] },
  { from: "Supplier portal", to: "ERP", fields: ["Item code", "Quantity", "Price"] },
  { from: "Spreadsheet", to: "WMS", fields: ["SKU", "Location", "Lot"] },
  { from: "Scanned form", to: "CRM", fields: ["Company", "Contact", "Address"] },
];

const SystemCard = ({ kicker, name }: { kicker: string; name: string }) => (
  <div className="relay-well w-full rounded-2xl border border-white/10 bg-th-page/60 px-4 py-4 text-center sm:w-56">
    <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-th-muted">{kicker}</span>
    <div className="relative mt-2 h-7">
      <AnimatePresence initial={false}>
        <motion.p
          key={name}
          className="absolute inset-0 whitespace-nowrap font-display text-[20px] font-semibold tracking-[-0.02em] text-th-heading"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35 }}
        >
          {name}
        </motion.p>
      </AnimatePresence>
    </div>
  </div>
);

/** the fibre between two cards: a hairline with a streak of light, as thin as the line, running along it */
const Wire = ({ delay }: { delay: number }) => (
  <div className="relative h-10 w-px shrink-0 bg-white/10 sm:h-px sm:w-auto sm:flex-1" aria-hidden>
    <span className="relay-wire-pulse" style={{ animationDelay: `${delay}s` }} />
  </div>
);

export const RelayConnect = () => {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = window.setInterval(() => setI((v) => (v + 1) % PAIRS.length), 3200);
    return () => window.clearInterval(t);
  }, []);
  const pair = PAIRS[i];

  return (
    <section id="connect" className={`relative scroll-mt-20 py-20 ${RELAY_SHELL}`}>
      <div className="mx-auto grid max-w-3xl justify-items-center gap-4 text-center">
        <motion.h2
          {...settle()}
          className="text-balance font-display text-[clamp(28px,4.4vw,44px)] font-semibold leading-[1.08] tracking-[-0.03em] text-th-heading"
        >
          Any two systems. <br className="hidden sm:block" />
          <Em>One AI agent between them.</Em>
        </motion.h2>
        <motion.p {...settle(0.1)} className="max-w-xl font-body text-[15px] leading-relaxed text-th-body">
          Orders into a TMS is where we start. The same agent reads what one system sends, fills the fields the other one needs and checks every value on the way, for any market and any volume.
        </motion.p>
      </div>

      <motion.div
        {...settle(0.15)}
        className="mx-auto mt-12 flex max-w-5xl flex-col items-center gap-0 rounded-[28px] border border-white/10 relay-pane px-5 py-8 sm:flex-row sm:gap-0 sm:px-10 sm:py-10"
      >
        <SystemCard kicker="from" name={pair.from} />
        <Wire delay={0} />
        <div className="flex w-full flex-col items-center gap-3 rounded-2xl border border-ac-1/30 bg-ac-1/[0.06] px-4 py-4 sm:w-72">
          <div className="flex items-center gap-2.5">
            <LogoMark size={26} />
            <span className="font-display text-[16px] font-semibold text-th-heading">AI agent</span>
          </div>
          <div className="relative h-6 w-full">
            <AnimatePresence initial={false}>
              <motion.div
                key={pair.to}
                className="absolute inset-0 flex justify-center gap-1.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {pair.fields.map((f, k) => (
                  <motion.span
                    key={f}
                    className="rounded-md border border-ac-1/40 px-2 py-0.5 font-mono text-[11px] text-ac-1"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 + k * 0.18, duration: 0.3 }}
                  >
                    {f}
                  </motion.span>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
          <span className="font-mono text-[11px] text-th-muted">Reads, matches, fills and checks</span>
        </div>
        <Wire delay={0.6} />
        <SystemCard kicker="to" name={pair.to} />
      </motion.div>
    </section>
  );
};
