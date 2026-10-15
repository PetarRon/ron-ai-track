import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Em, RELAY_SHELL, SectionIntro, settle } from "./shared";

/*
 * Figures:
 * - minutes per order: the live site's own claims ("5-15 min of copy-pasting per
 *   order" versus "a ready-to-approve draft in under a minute");
 * - first-pass accuracy: the latest internal evaluation (September 2026) on one
 *   customer's real orders, 19 orders and about 510 field checks. Re-measured
 *   every release; update these from the eval run, never by hand.
 */

type Bar = { label: string[]; value: number; display: string; lime?: boolean };
type Chart = { title: string; note: string; max: number; ticks: number[]; tick: (t: number) => string; perBlock: number; bars: Bar[] };

const charts: Chart[] = [
  {
    title: "minutes per order",
    note: "Manual entry is 5 to 15 minutes an order; the bar shows the middle. Each block is one minute.",
    max: 15,
    ticks: [0, 5, 10, 15],
    tick: (t) => `${t}`,
    perBlock: 1,
    bars: [
      { label: ["by hand"], value: 10, display: "5–15 min" },
      { label: ["with the", "AI agent"], value: 0.8, display: "< 1 min", lime: true },
    ],
  },
  {
    title: "correct on the first pass",
    note: "Before anyone touched the draft. Each block is 10%.",
    max: 100,
    ticks: [0, 25, 50, 75, 100],
    tick: (t) => `${t}%`,
    perBlock: 10,
    bars: [
      { label: ["all", "fields"], value: 92, display: "92%", lime: true },
      { label: ["site", "fields"], value: 96.8, display: "97%", lime: true },
      { label: ["orders,", "zero edits"], value: 67, display: "2 in 3", lime: true },
    ],
  },
];

/* ---------- the 3D block chart ---------- */

const W = 460;
const H = 310;
const DX = 16; // depth, to the right
const DY = -10; // depth, upwards
const X0 = 46;
const X1 = W - 24 - DX;
const BASE = H - 52;
const TOP = 44;
const GAP = 1.6;

const FACES = {
  lime: { front: "#c7f23c", top: "#e2ff7a", side: "#93b829" },
  grey: { front: "#2c3128", top: "#3d4337", side: "#1d211a" },
};

const Block = ({ x, w, yb, yt, faces, delay, on }: { x: number; w: number; yb: number; yt: number; faces: (typeof FACES)["lime"]; delay: number; on: boolean }) => {
  const xr = x + w;
  return (
    <motion.g
      initial={{ opacity: 0, y: 16 }}
      animate={on ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <polygon points={`${xr},${yt} ${xr + DX},${yt + DY} ${xr + DX},${yb + DY} ${xr},${yb}`} fill={faces.side} />
      <rect x={x} y={yt} width={w} height={Math.max(0, yb - yt)} fill={faces.front} />
      <polygon points={`${x},${yt} ${x + DX},${yt + DY} ${xr + DX},${yt + DY} ${xr},${yt}`} fill={faces.top} />
    </motion.g>
  );
};

const BlockChart = ({ chart }: { chart: Chart }) => {
  const ref = useRef<SVGSVGElement>(null);
  const on = useInView(ref, { once: true, margin: "-12% 0px" });
  const y = (v: number) => BASE - (v / chart.max) * (BASE - TOP);
  const slot = (X1 - X0) / chart.bars.length;
  const bw = Math.min(70, slot * 0.46);

  return (
    <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={`${chart.title}: ${chart.bars.map((b) => `${b.label.join(" ")} ${b.display}`).join(", ")}`}>
      {/* floor and back wall grid */}
      <polygon points={`${X0},${BASE} ${X0 + DX},${BASE + DY} ${X1 + DX},${BASE + DY} ${X1},${BASE}`} fill="rgb(var(--th-line) / 0.35)" />
      {chart.ticks.map((t) => (
        <g key={t}>
          <line x1={X0 + DX} x2={X1 + DX} y1={y(t) + DY} y2={y(t) + DY} stroke="rgb(var(--th-line))" strokeWidth="1" strokeDasharray={t === 0 ? undefined : "3 4"} />
          <text x={X0 + DX - 10} y={y(t) + DY + 4} textAnchor="end" fill="rgb(var(--th-muted))" fontFamily="var(--font-mono)" fontSize="12">
            {chart.tick(t)}
          </text>
        </g>
      ))}
      <line x1={X0 + DX} x2={X0 + DX} y1={TOP + DY} y2={BASE + DY} stroke="rgb(var(--th-line))" />
      <line x1={X0} x2={X1} y1={BASE} y2={BASE} stroke="rgb(var(--th-line))" />
      <line x1={X0} x2={X0 + DX} y1={BASE} y2={BASE + DY} stroke="rgb(var(--th-line))" />

      {/* the bars, block by block from the floor up */}
      {chart.bars.map((b, bi) => {
        const x = X0 + slot * bi + (slot - bw) / 2;
        const faces = b.lime ? FACES.lime : FACES.grey;
        const count = Math.ceil(b.value / chart.perBlock);
        const blocks = Array.from({ length: count }, (_, k) => {
          const lo = k * chart.perBlock;
          const hi = Math.min((k + 1) * chart.perBlock, b.value);
          return { yb: y(lo) - (k === 0 ? 0 : GAP / 2), yt: y(hi) + GAP / 2 };
        });
        const start = 0.15 + bi * 0.35;
        const step = Math.min(0.08, 0.9 / count);
        const done = start + count * step + 0.2;
        return (
          <g key={b.label.join(" ")}>
            {blocks.map((bl, k) => (
              <Block key={k} x={x} w={bw} yb={bl.yb} yt={bl.yt} faces={faces} delay={start + k * step} on={on} />
            ))}
            <motion.text
              x={x + bw / 2 + DX / 2}
              y={y(b.value) + DY - 10}
              textAnchor="middle"
              fill={b.lime ? "rgb(var(--ac-1))" : "rgb(var(--th-heading))"}
              fontFamily="var(--font-mono)"
              fontSize="15"
              fontWeight="600"
              initial={{ opacity: 0 }}
              animate={{ opacity: on ? 1 : 0 }}
              transition={{ delay: done, duration: 0.4 }}
            >
              {b.display}
            </motion.text>
            {b.label.map((line, li) => (
              <text key={line} x={x + bw / 2} y={BASE + 22 + li * 15} textAnchor="middle" fill="rgb(var(--th-body))" fontFamily="var(--font-mono)" fontSize="12">
                {line}
              </text>
            ))}
          </g>
        );
      })}
    </svg>
  );
};

/* ---------- the section ---------- */

export const RelayNumbers = () => (
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
    <div className="mt-14 grid gap-6 md:grid-cols-2">
      {charts.map((c, i) => (
        <motion.div
          key={c.title}
          {...settle(0.1 * i)}
          className="rounded-2xl border border-white/10 bg-[linear-gradient(160deg,rgb(255_255_255/0.04),rgb(255_255_255/0.01)_55%)] p-5 backdrop-blur-md md:p-7"
        >
          <span className="font-mono text-[12px] text-th-muted">{c.title}</span>
          <div className="mt-4">
            <BlockChart chart={c} />
          </div>
          <p className="mt-2 font-body text-[13px] leading-relaxed text-th-muted">{c.note}</p>
        </motion.div>
      ))}
    </div>
    <motion.p {...settle(0.2)} className="mt-8 font-body text-[14px] text-th-body">
      <span className="text-ac-1">0</span> wrong TMS party codes. Consignor and sites are matched or flagged, never guessed.
    </motion.p>
    <p className="mt-3 font-mono text-[11px] text-th-faint">
      accuracy: latest internal evaluation, september 2026, on a belgian intermodal operator&apos;s live orders. minutes: per order, as quoted on this site.
    </p>
  </section>
);
