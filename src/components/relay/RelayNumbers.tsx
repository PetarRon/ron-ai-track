import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "framer-motion";
import { Check } from "lucide-react";
import { Em, RELAY_SHELL, settle } from "./shared";

/*
 * The latest test, shown as a split of the work: a wall of 100 squares, one
 * per field. The AI agent's 92 light up first in a wave, then your team's 8
 * fill in at the end, so the wall reads as work shared, finished and
 * approved, not as errors. Figures are from the latest internal evaluation
 * (September 2026) on one customer's live orders; update them from the eval
 * run, never by hand. Styles: `rn-*` in src/index.css.
 */

const TOTAL = 100;
const CELL = 22;
const GAP = 6;
const RIGHT = 92;

/** the agent's share first, your team's at the end, like a bar filling up */
const CELLS: boolean[] = Array.from({ length: TOTAL }, (_, i) => i < RIGHT);
/** when the agent's wave has passed, your team's squares follow */
const TEAM_AT = 1.5;

const STATS = [
  { value: "2 in 3", label: "orders approved without a single edit" },
  { value: "97%", label: "of load and unload sites right the first time" },
  { value: "0", label: "wrong TMS party codes: matched or flagged, never guessed" },
];

const Wall = ({ on, cols, className = "" }: { on: boolean; cols: number; className?: string }) => (
  <svg
    viewBox={`0 0 ${cols * (CELL + GAP) - GAP} ${(TOTAL / cols) * (CELL + GAP) - GAP}`}
    className={`rn-wall w-full ${on ? "is-on" : ""} ${className}`}
    aria-hidden
  >
    {CELLS.map((agent, i) => {
      const c = i % cols;
      const r = Math.floor(i / cols);
      const delay = agent ? c * (1.2 / cols) + r * 0.04 : TEAM_AT + (i - RIGHT) * 0.09;
      return (
        <rect
          key={i}
          className={`rn-cell ${agent ? "is-agent" : "is-team"}`}
          x={c * (CELL + GAP)}
          y={r * (CELL + GAP)}
          width={CELL}
          height={CELL}
          rx={4}
          style={{ animationDelay: `${delay.toFixed(3)}s` }}
        />
      );
    })}
  </svg>
);

export const RelayNumbers = () => {
  const ref = useRef<HTMLDivElement>(null);
  const on = useInView(ref, { once: true, margin: "-15% 0px" });
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!on) return;
    const a = animate(0, RIGHT, { duration: 1.4, delay: 0.2, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setShown(Math.round(v)) });
    return () => a.stop();
  }, [on]);

  return (
    <section id="results" className={`relative scroll-mt-20 py-20 ${RELAY_SHELL}`}>
      <div className="mx-auto grid max-w-3xl justify-items-center gap-4 text-center">
        <motion.h2
          {...settle()}
          className="text-balance font-display text-[clamp(28px,4.4vw,46px)] font-semibold leading-[1.08] tracking-[-0.03em] text-th-heading"
        >
          Our latest test. <Em>Every field counted.</Em>
        </motion.h2>
        <motion.p {...settle(0.1)} className="max-w-xl font-body text-[15px] leading-relaxed text-th-body">
          Run on a customer&apos;s live orders, not a demo set, and scored field by field before anyone touched the
          draft.
        </motion.p>
      </div>

      <motion.div
        ref={ref}
        {...settle(0.15)}
        className="mt-12 rounded-[28px] border border-white/10 relay-pane"
      >
        <div className="p-6 md:p-10">
          <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
            <div className="flex flex-wrap items-end gap-x-5 gap-y-2">
              <p className="font-display text-[clamp(72px,9vw,112px)] font-semibold leading-[0.85] tracking-[-0.05em] text-ac-1">
                {shown}%
              </p>
              <p className="max-w-[19ch] font-body text-[15px] leading-relaxed text-th-heading">
                of fields typed in for you, right on the first pass.
              </p>
            </div>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {[
                { cls: "is-agent", label: "typed in by the AI agent" },
                { cls: "is-team", label: "finished by your team" },
              ].map((o) => (
                <li key={o.cls} className="flex items-center gap-2.5 font-body text-[13px] text-th-body">
                  <svg viewBox="0 0 14 14" className="h-3.5 w-3.5 shrink-0" aria-hidden>
                    <rect className={`rn-cell ${o.cls}`} x="0.75" y="0.75" width="12.5" height="12.5" rx="2.5" />
                  </svg>
                  {o.label}
                </li>
              ))}
            </ul>
          </div>
          <div
            className="mt-8"
            role="img"
            aria-label={`${RIGHT} of every 100 fields typed in correctly by the AI agent; your team finishes the other ${TOTAL - RIGHT}`}
          >
            <Wall on={on} cols={25} className="hidden sm:block" />
            <Wall on={on} cols={10} className="sm:hidden" />
          </div>
          <p className="mt-6 flex items-center gap-2.5 font-body text-[14px] text-th-heading">
            <Check className="h-4 w-4 shrink-0 text-ac-1" strokeWidth={2.5} aria-hidden />
            Nothing reaches your TMS until someone on your team approves it.
          </p>
        </div>

        <div className="grid divide-y divide-white/10 border-t border-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {STATS.map((s) => (
            <div key={s.value} className="px-6 py-6 md:px-10">
              <p className="font-display text-[30px] font-semibold tracking-[-0.03em] text-th-heading">{s.value}</p>
              <p className="mt-1 font-body text-[13px] leading-relaxed text-th-body">{s.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <p className="mt-5 font-mono text-[11px] text-th-faint">
        Latest internal evaluation, September 2026, on a Belgian intermodal operator&apos;s live orders.
      </p>
    </section>
  );
};
