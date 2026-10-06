import { motion } from "framer-motion";
import { Card, Em, RELAY_SHELL, SectionIntro, settle } from "./shared";

/*
 * Operator-dashboard mock. Columns, status labels and provenance wording
 * follow the real product's order queue; the rows themselves are placeholders.
 */

type Status = "completed" | "review" | "processing" | "update" | "none";

const statusChip: Record<Status, { label: string; cls: string }> = {
  completed: { label: "Order completed", cls: "border-ac-1/50 bg-ac-1/15 text-ac-1" },
  review: { label: "Needs review", cls: "border-amber-400/50 bg-amber-400/10 text-amber-300" },
  processing: { label: "Processing", cls: "border-th-line bg-th-surface-alt text-th-body" },
  update: { label: "Update", cls: "border-th-heading/40 bg-transparent text-th-heading" },
  none: { label: "No order", cls: "border-th-line bg-transparent text-th-muted" },
};

const rows: { subject: string; ref: string; fields?: [number, number]; verified?: [number, number]; status: Status }[] = [
  { subject: "Pickup Thursday, 24 pallets to Hamburg", ref: "PO 48291", fields: [31, 31], verified: [31, 31], status: "completed" },
  { subject: "Reefer container, temp-controlled", ref: "BK 77120", fields: [28, 31], verified: [27, 28], status: "review" },
  { subject: "Re: 2 trucks Monday, change unload time", ref: "PO 48114", status: "update" },
  { subject: "Bulk salt, 3 trucks Monday", ref: "", fields: [30, 31], verified: [30, 30], status: "processing" },
  { subject: "Re: Invoice #4471, payment confirmation", ref: "", status: "none" },
];

const Ratio = ({ v, warn }: { v?: [number, number]; warn: boolean }) =>
  v ? (
    <span className={`font-mono text-[12px] tabular-nums ${warn ? "text-amber-300" : "text-th-body"}`}>
      {v[0]}/{v[1]}
    </span>
  ) : (
    <span className="font-mono text-[12px] text-th-faint">—</span>
  );

const Queue = () => (
  <Card className="overflow-hidden">
    <div className="flex items-center justify-between gap-4 px-6 pt-6 font-mono text-[12px] md:px-7">
      <span className="text-th-body">orders · today</span>
      <span className="flex items-center gap-2 rounded-md border border-amber-400/40 bg-amber-400/10 px-2.5 py-1 text-amber-300">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-300" /> 1 needs review
      </span>
    </div>
    <div className="mt-5 grid grid-cols-[1fr_72px_54px_60px_124px] gap-3 border-b border-th-line/60 px-6 pb-2 font-mono text-[11px] text-th-muted md:px-7">
      <span>Subject</span>
      <span>Reference</span>
      <span>Fields</span>
      <span>Verified</span>
      <span>Status</span>
    </div>
    <ul>
      {rows.map((r, i) => (
        <motion.li
          key={r.subject}
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08 * i, duration: 0.5 }}
          className="grid grid-cols-[1fr_72px_54px_60px_124px] items-center gap-3 border-b border-th-line/40 px-6 py-3 last:border-0 md:px-7"
        >
          <span className="truncate font-body text-[13px] text-th-heading">{r.subject}</span>
          <span className="font-mono text-[12px] text-th-muted">{r.ref || "—"}</span>
          <Ratio v={r.fields} warn={!!r.fields && r.fields[0] < r.fields[1]} />
          <Ratio v={r.verified} warn={!!r.verified && r.verified[0] < r.verified[1]} />
          <span className={`inline-flex w-fit items-center rounded-md border px-2 py-0.5 font-mono text-[10px] ${statusChip[r.status].cls}`}>
            {statusChip[r.status].label}
          </span>
        </motion.li>
      ))}
    </ul>
    <p className="px-6 pb-5 pt-3 font-mono text-[10px] text-th-faint md:px-7">
      Fields: filled of total. Verified: values whose quote was found in the email or a document.
    </p>
  </Card>
);

const Ring = () => {
  const r = 44;
  const c = 2 * Math.PI * r;
  const pct = 24 / 31;
  return (
    <Card className="flex flex-col p-6 md:p-7">
      <span className="font-mono text-[12px] text-th-body">completed today</span>
      <div className="relative mx-auto my-6 h-[120px] w-[120px]">
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
          <circle cx="50" cy="50" r={r} fill="none" stroke="rgb(var(--th-line))" strokeWidth="6" />
          <motion.circle
            cx="50"
            cy="50"
            r={r}
            fill="none"
            stroke="rgb(var(--ac-1))"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={c}
            initial={{ strokeDashoffset: c }}
            whileInView={{ strokeDashoffset: c * (1 - pct) }}
            viewport={{ once: true, margin: "-20% 0px" }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center whitespace-nowrap font-body text-[24px] font-semibold tracking-tight text-th-heading">
          24<span className="text-[13px] font-normal text-th-muted">/31</span>
        </span>
      </div>
      <span className="font-mono text-[11px] text-th-muted">orders approved and exported</span>
    </Card>
  );
};

const Waiting = () => (
  <Card className="p-6 md:p-7">
    <span className="font-mono text-[12px] text-th-body">waiting on your team</span>
    <div className="mt-5 flex -space-x-2">
      {["RL", "MK", "JS"].map((n, i) => (
        <span
          key={n}
          className="grid h-9 w-9 place-items-center rounded-full border-2 border-th-surface bg-th-surface-alt font-mono text-[10px] text-th-heading"
          style={{ zIndex: 3 - i }}
        >
          {n}
        </span>
      ))}
    </div>
    <p className="mt-4 font-body text-[28px] font-semibold text-amber-300">
      3 <span className="font-mono text-[11px] font-normal text-th-muted">need review</span>
    </p>
    <p className="mt-1 font-body text-[13px] text-th-body">Longest open: 26 minutes. One unload site has two candidate codes.</p>
  </Card>
);

const Changes = () => (
  <Card className="p-6 md:p-7">
    <span className="font-mono text-[12px] text-th-body">updates and cancellations</span>
    <svg viewBox="0 0 280 90" className="mt-5 w-full" aria-hidden>
      <path d="M0 50 C 40 10, 80 10, 120 50 S 200 90, 280 40" fill="none" stroke="rgb(var(--th-line))" strokeWidth="1.5" />
      <motion.path
        d="M0 60 C 40 85, 80 85, 120 45 S 200 5, 280 30"
        fill="none"
        stroke="rgb(var(--ac-1))"
        strokeWidth="1.8"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "-20% 0px" }}
        transition={{ duration: 1.6, ease: "easeInOut" }}
      />
    </svg>
    <div className="mt-3 flex items-center gap-4 font-mono text-[11px] text-th-muted">
      <span className="flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-ac-1" /> landed on the right order
      </span>
      <span className="flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-th-muted" /> last week
      </span>
    </div>
  </Card>
);

const Residency = () => (
  <Card className="p-6 md:p-7">
    <span className="font-mono text-[12px] text-th-body">where your data lives</span>
    <div className="mt-5 grid grid-cols-12 gap-1.5">
      {Array.from({ length: 48 }, (_, i) => (
        <span
          key={i}
          className={`h-2 w-2 rounded-[2px] ${i === 17 ? "bg-ac-1 shadow-[0_0_8px_rgb(var(--ac-1))]" : "bg-th-line/60"}`}
        />
      ))}
    </div>
    <p className="mt-4 font-mono text-[11px] text-th-muted">eu-central · Frankfurt</p>
    <p className="mt-1 font-body text-[13px] text-th-body">
      Hosted in the EU. Invite-only accounts, tenant isolation, and document links that expire.
    </p>
  </Card>
);

export const RelayDashboard = () => (
  <section className={`relative py-20 ${RELAY_SHELL}`}>
    <SectionIntro
      eyebrow="daily view"
      title={
        <>
          A <Em>Tuesday</Em>, seen from Petaron.
        </>
      }
      aside="The queue your team keeps open: what came in, what is drafted, what was exported, and which field still needs a human."
    />
    <div className="mt-14 grid gap-5 lg:grid-cols-3">
      <motion.div {...settle(0.1)} className="lg:col-span-2">
        <Queue />
      </motion.div>
      <motion.div {...settle(0.2)}>
        <Ring />
      </motion.div>
      <motion.div {...settle(0.25)}>
        <Waiting />
      </motion.div>
      <motion.div {...settle(0.3)}>
        <Changes />
      </motion.div>
      <motion.div {...settle(0.35)}>
        <Residency />
      </motion.div>
    </div>
  </section>
);
