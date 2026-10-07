import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Card, Em, RELAY_SHELL, SectionIntro, settle } from "./shared";

/* ---------- mock 1: a run timeline ---------- */

const steps = [
  { name: "read email", ms: 102, done: true },
  { name: "read 2 attachments", ms: 188, done: true },
  { name: "new order, 2 trucks", ms: 36, done: true },
  { name: "match TMS codes", ms: 64, done: true },
  { name: "fill from history", ms: 41, done: true },
  { name: "your review", ms: 0, done: false },
];

const RunTimeline = () => (
  <Card className="p-6 md:p-7">
    <div className="flex items-center justify-between font-mono text-[12px]">
      <span className="text-th-body">PO 48291 · pickup Thursday</span>
      <span className="text-ac-1">processing</span>
    </div>
    <ul className="mt-6 space-y-4">
      {steps.map((s, i) => (
        <li key={s.name} className="grid grid-cols-[150px_1fr_56px] items-center gap-4 font-mono text-[12px]">
          <span className={s.done ? "text-th-heading" : "text-th-muted"}>
            {i === steps.length - 1 && !s.done ? "> " : ""}
            {s.name}
          </span>
          <div className="relative h-2 overflow-hidden rounded-full bg-th-line/50">
            {s.done ? (
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full bg-ac-1"
                initial={{ width: 0 }}
                whileInView={{ width: `${(s.ms / 200) * 100}%` }}
                viewport={{ once: true, margin: "-20% 0px" }}
                transition={{ duration: 0.9, delay: 0.2 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              />
            ) : (
              <motion.div
                className="absolute inset-y-0 left-0 w-6 rounded-full bg-ac-1/60"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              />
            )}
          </div>
          <span className="text-right text-th-muted">{s.done ? `${s.ms} ms` : "waiting"}</span>
        </li>
      ))}
    </ul>
    <div className="mt-6 grid grid-cols-[150px_1fr_56px] gap-4">
      <span />
      <div className="flex justify-between font-mono text-[11px] text-th-faint">
        {["0", "50", "100", "150", "200 ms"].map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
    </div>
  </Card>
);

/* ---------- mock 2: the review card ---------- */

const fields = [
  { label: "Consignor", value: "Rotterdam Distribution B.V.", from: "Read from the email" },
  { label: "Load Site", value: "Antwerp, Quay 730", from: "Read from ORDER_48291.pdf" },
  { label: "Unload Site", value: "Hamburg, Dock 4", from: "Read from ORDER_48291.pdf" },
  { label: "Load Reference", value: "PO 48291", from: "Read from the email" },
  { label: "Unload Site Code", value: "", from: "" },
  { label: "Gross Weight", value: "3,240 kg", from: "Read from the email" },
  { label: "Load From", value: "14/07/2026, 08:00", from: "Read from the email" },
  { label: "Unload Until", value: "15/07/2026, 16:00", from: "Copied from a past order" },
];

const ReviewCard = () => (
  <Card className="p-6 md:p-7">
    <div className="flex items-center justify-between font-mono text-[12px]">
      <span className="text-th-body">review · PO 48291 · Email / Documents / Extracted text</span>
      <span className="rounded-md border border-amber-400/50 bg-amber-400/10 px-2 py-0.5 text-amber-300">Needs review</span>
    </div>
    <dl className="mt-6 grid gap-x-6 gap-y-4 sm:grid-cols-2">
      {fields.map((f) => {
        const empty = !f.value;
        return (
          <div
            key={f.label}
            className={`rounded-lg border px-3.5 py-2.5 ${
              empty ? "border-amber-400/60 bg-amber-400/5 shadow-[0_0_24px_rgb(251_191_36/0.12)]" : "border-th-line/70 bg-th-page/40"
            }`}
          >
            <dt className="font-mono text-[11px] text-th-muted">{f.label}</dt>
            <dd className={`mt-1 font-body text-[14px] ${empty ? "text-amber-300" : "text-th-heading"}`}>
              {empty ? "Not settled, 2 candidates" : f.value}
            </dd>
            <p className="mt-1 font-mono text-[10px] text-th-faint">{f.from || "Pick HAMFRE02 or HAMFRE04"}</p>
          </div>
        );
      })}
    </dl>
    <div className="mt-6 flex items-center gap-3">
      <span className="rounded-full border border-th-line px-4 py-2 font-body text-[13px] text-th-heading">Save draft</span>
      <span className="rounded-full bg-ac-1 px-4 py-2 font-body text-[13px] font-medium text-th-page">Approve</span>
      <span className="rounded-full border border-th-line px-4 py-2 font-mono text-[12px] text-th-heading">XML</span>
      <span className="ml-auto font-mono text-[11px] text-th-muted">nothing leaves until you approve</span>
    </div>
  </Card>
);

/* ---------- mock 3: isometric bars per weekday ---------- */

const bars = [
  { day: "mon", h: 70 },
  { day: "tue", h: 92 },
  { day: "wed", h: 118 },
  { day: "thu", h: 140 },
  { day: "fri", h: 164, lime: true },
  { day: "sat", h: 22 },
];

const IsoBar = ({ x, h, lime, i }: { x: number; h: number; lime?: boolean; i: number }) => {
  const w = 56;
  const base = 200; // y of the bar's front-bottom corner
  const top = base - h;
  const top1 = lime ? "#d9ff5c" : "#3a3f36";
  const left = lime ? "#a9d62f" : "#262a23";
  const right = lime ? "#7fa51f" : "#1a1d18";
  const pts = (arr: [number, number][]) => arr.map((p) => p.join(",")).join(" ");
  return (
    <motion.g
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20% 0px" }}
      transition={{ duration: 0.8, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <polygon
        points={pts([
          [x, top],
          [x + w / 2, top - w / 4],
          [x + w, top],
          [x + w / 2, top + w / 4],
        ])}
        fill={top1}
      />
      <polygon
        points={pts([
          [x, top],
          [x + w / 2, top + w / 4],
          [x + w / 2, top + w / 4 + h],
          [x, top + h],
        ])}
        fill={left}
      />
      <polygon
        points={pts([
          [x + w / 2, top + w / 4],
          [x + w, top],
          [x + w, top + h],
          [x + w / 2, top + w / 4 + h],
        ])}
        fill={right}
      />
    </motion.g>
  );
};

const IsoChart = () => (
  <Card className="p-6 md:p-7">
    <div className="flex items-center gap-6 font-mono text-[12px]">
      <span className="text-th-body">orders completed per weekday</span>
      <span className="text-th-muted">this week</span>
    </div>
    <svg viewBox="0 0 560 260" className="mt-4 w-full" aria-hidden>
      {bars.map((b, i) => (
        <IsoBar key={b.day} x={20 + i * 90} h={b.h} lime={b.lime} i={i} />
      ))}
      {bars.map((b, i) => (
        <text
          key={b.day}
          x={48 + i * 90}
          y={250}
          textAnchor="middle"
          fill={b.lime ? "rgb(var(--th-heading))" : "rgb(var(--th-muted))"}
          fontFamily="var(--font-mono)"
          fontSize="12"
        >
          {b.day}
        </text>
      ))}
    </svg>
  </Card>
);

/* ---------- the section ---------- */

const Feature = ({
  glyph,
  title,
  body,
  mock,
  reverse = false,
}: {
  glyph: string;
  title: string;
  body: string;
  mock: ReactNode;
  reverse?: boolean;
}) => (
  <div className={`grid items-center gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
    <motion.div {...settle()}>
      <span className="font-mono text-[14px] text-th-muted">{glyph}</span>
      <h3 className="mt-4 font-body text-[24px] font-medium tracking-[-0.02em] text-th-heading">{title}</h3>
      <p className="mt-3 max-w-sm font-body text-[15px] leading-relaxed text-th-body">{body}</p>
    </motion.div>
    <motion.div {...settle(0.15)}>{mock}</motion.div>
  </div>
);

export const RelayProcess = () => (
  <section id="process" className={`relative scroll-mt-20 pb-20 pt-24 ${RELAY_SHELL}`}>
    <SectionIntro
      eyebrow="order intake"
      title={
        <>
          Most of an order is <Em>retyping</Em>.
        </>
      }
      aside="Copy this into that. Look up the site code. Check the weight against the PDF. Petaron.ai works side by side with your team: it does the reading and the retyping, and leaves your team the decisions."
    />
    <div className="mt-20 space-y-24">
      <Feature
        glyph="⌘"
        title="Every attachment gets read"
        body="Forward your order inbox. Every email and attachment is read, the message is understood as a new order, an update or a cancellation, and consignor and sites are matched to your TMS codes. What history already knows is filled in; the rest is left empty rather than guessed."
        mock={<RunTimeline />}
      />
      <Feature
        glyph=":)"
        title="Every value traces back to its source"
        body="The form mirrors your TMS screen. Every value shows where it was read from, with the quote highlighted in the document. What the agent could not settle is flagged for a person. Approve, and the order is exported in your TMS format."
        mock={<ReviewCard />}
        reverse
      />
      <Feature
        glyph="↙"
        title="Nothing moves until your team says so"
        body="Review, save a draft, or approve. Only approval exports the order. Every draft, approval and change is kept in an append-only history, and every approval teaches the agent that customer's habits, so the next order needs fewer edits."
        mock={<IsoChart />}
      />
    </div>
  </section>
);
