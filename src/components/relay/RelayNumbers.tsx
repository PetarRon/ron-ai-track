import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "framer-motion";
import { Em, RELAY_SHELL, SectionIntro, settle } from "./shared";

/*
 * Results from the latest internal evaluation (September 2026) on one
 * customer's real orders: 19 orders, about 510 field checks. Re-measured
 * every release; update these three figures from the eval run, never by hand.
 */
const kpis = [
  {
    label: "fields correct, first pass",
    value: 92,
    suffix: "%",
    note: "of ~510 field checks, before anyone touched the draft",
    bars: [70, 74, 78, 83, 86, 88, 90, 92],
  },
  {
    label: "orders with zero edits",
    value: 2,
    suffix: " in 3",
    note: "approved exactly as drafted; the rest needed one or two changes",
    bars: [0, 1, 1, 2, 2, 2, 2, 2],
  },
  {
    label: "wrong TMS party codes",
    value: 0,
    suffix: "",
    note: "consignor and sites: matched or flagged, never guessed",
    bars: [3, 2, 2, 1, 1, 0, 0, 0],
  },
];

const CountUp = ({ to, active }: { to: number; active: boolean }) => {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!active) return;
    const c = animate(0, to, { duration: 1.4, ease: [0.22, 1, 0.36, 1], onUpdate: (x) => setV(Math.round(x)) });
    return () => c.stop();
  }, [active, to]);
  return <>{v}</>;
};

export const RelayNumbers = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  return (
    <section className={`relative py-20 ${RELAY_SHELL}`}>
      <SectionIntro
        eyebrow="measured"
        title={
          <>
            Numbers we did <Em>not</Em> have to explain away.
          </>
        }
        aside="Every minute saved on data entry is a minute with a customer. Measured on a customer's real orders, not a demo set, and re-run on every release."
      />
      <div ref={ref} className="mt-14 grid gap-10 border-t border-th-line/60 pt-10 md:grid-cols-3">
        {kpis.map((k, i) => (
          <motion.div key={k.label} {...settle(0.1 * i)}>
            <span className="font-mono text-[12px] text-th-muted">{k.label}</span>
            <p className="mt-3 font-body text-[52px] font-semibold leading-none tracking-[-0.03em] text-th-heading">
              <CountUp to={k.value} active={inView} />
              <span className="text-[28px] text-th-body">{k.suffix}</span>
            </p>
            <p className="mt-3 max-w-xs font-body text-[13px] leading-relaxed text-th-muted">{k.note}</p>
            <div className="mt-6 flex h-10 items-end gap-1.5">
              {k.bars.map((b, j) => {
                const max = Math.max(...k.bars, 1);
                const last = j === k.bars.length - 1;
                return (
                  <motion.span
                    key={j}
                    className={`w-3 rounded-sm ${last ? "bg-ac-1" : "bg-th-line"}`}
                    initial={{ height: 2 }}
                    whileInView={{ height: 4 + (36 * (k.value === 0 ? max - b : b)) / max }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + j * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  />
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
      <p className="mt-8 font-mono text-[11px] text-th-faint">
        latest internal evaluation, september 2026, on a belgian intermodal operator's live orders
      </p>
    </section>
  );
};
