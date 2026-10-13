import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useInView, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { FileText } from "lucide-react";
import { Em, LogoMark, RELAY_SHELL, SectionIntro } from "./shared";
import { streamSignal } from "./streamSignal";

/**
 * How it works: the five steps of the live site, pinned on the left, with one
 * glass panel on the right that shows a flattened dashboard card per step
 * (the live site's screens without sidebar, top bar or split views). Each
 * card plays one short animation when it appears. Below lg the steps stack.
 */

const steps = [
  {
    n: "01",
    title: "Every order lands in one queue",
    body: "Emails, PDFs and forwarded threads arrive in one inbox, sorted into orders and everything else.",
  },
  {
    n: "02",
    title: "Every attachment gets read",
    body: "PDFs, scans, spreadsheets and forwarded emails are all read, whatever they are called.",
  },
  {
    n: "03",
    title: "Every value traces back to its source",
    body: "Each field shows where it was read from. Anything uncertain is flagged for a person, not guessed.",
  },
  {
    n: "04",
    title: "Matched to your TMS",
    body: "Customers and sites are matched to the codes your TMS already uses. What the agent cannot settle is left for you.",
  },
  {
    n: "05",
    title: "Nothing moves until your team says so",
    body: "Review, save a draft, or approve. Only approval pushes the order to your TMS.",
  },
];

const labels = ["Orders", "PO 48291 · Documents", "PO 48291 · Review", "PO 48291 · TMS codes", "PO 48291 · Approve"];

/** Counts how many of the given millisecond marks have passed since `play` went true. */
const useBeats = (play: boolean, beats: number[]) => {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!play) {
      setN(0);
      return;
    }
    const ids = beats.map((ms, i) => setTimeout(() => setN(i + 1), ms));
    return () => ids.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [play]);
  return n;
};

const EASE = [0.22, 1, 0.36, 1] as const;
const stagger = (count: number, from = 300, gap = 160) => Array.from({ length: count }, (_, i) => from + i * gap);

/* ---------- the glass frame ---------- */

const Panel = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className="relay-glass relative overflow-hidden rounded-2xl">
    <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
      <div className="flex items-center gap-2.5">
        <LogoMark size={22} />
        <span className="font-mono text-[12px] text-th-heading">Petaron</span>
      </div>
      <span className="font-mono text-[11px] text-th-muted">{label}</span>
    </div>
    <div className="dash is-glass relay-flat p-4">{children}</div>
  </div>
);

const Field = ({ label, value, state, on = true }: { label: string; value?: string; state?: "empty-required" | "active"; on?: boolean }) => (
  <div className={`dash-field${on && state ? ` is-${state}` : ""}`}>
    <em>{label}</em>
    <motion.span className="v" initial={{ opacity: 0 }} animate={{ opacity: on ? 1 : 0 }} transition={{ duration: 0.35 }}>
      {value ?? ""}
    </motion.span>
  </div>
);

/* ---------- 01: the orders queue ---------- */

type Row = { status: "review" | "processing" | "completed" | "none"; subject: string; reference: string; route: string; received: string };

const rows: Row[] = [
  { status: "review", subject: "Pickup Thursday, 24 pallets to Hamburg", reference: "PO 48291", route: "Rotterdam → Hamburg", received: "14:32" },
  { status: "processing", subject: "Reefer container, temp-controlled", reference: "PO 48114", route: "Gothenburg → Bremerhaven", received: "14:20" },
  { status: "review", subject: "Bulk salt, 3 trucks Monday", reference: "SO 79697", route: "Wesseling → Antwerp", received: "11:05" },
  { status: "completed", subject: "Weekly consolidation, Antwerp to Lyon", reference: "PO 47960", route: "Antwerp → Lyon", received: "Yesterday" },
  { status: "completed", subject: "Two containers ex Piraeus", reference: "PO 47812", route: "Piraeus → Milan", received: "Yesterday" },
  { status: "none", subject: "Re: Invoice #4471, payment confirmation", reference: "—", route: "—", received: "Yesterday" },
];

const chip: Record<Row["status"], { cls: string; label: string }> = {
  review: { cls: "amber", label: "Needs review" },
  processing: { cls: "grey", label: "Processing" },
  completed: { cls: "green", label: "Completed" },
  none: { cls: "outline", label: "No order" },
};

const OrdersScreen = ({ play }: { play: boolean }) => {
  const beats = useBeats(play, stagger(rows.length, 250, 140));
  return (
    <div className="dash-table">
      <div className="dash-tr is-head">
        <span>Status</span>
        <span>Subject</span>
        <span>Reference</span>
        <span className="dash-col-lg">Route</span>
        <span className="dash-col-lg dash-td-num">Received</span>
      </div>
      {rows.map((r, i) => (
        <motion.div
          key={r.reference + i}
          className={`dash-tr${r.status === "completed" ? " is-done" : ""}${r.status === "none" ? " is-none" : ""}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: beats > i ? 1 : 0 }}
          transition={{ duration: 0.35 }}
        >
          <span className="dash-chip-cell">
            <span className={`dash-chip ${chip[r.status].cls}`}>{chip[r.status].label}</span>
          </span>
          <span className="dash-td-ellipsis">{r.subject}</span>
          <span className="dash-td-mono">{r.reference}</span>
          <span className="dash-col-lg dash-td-ellipsis">{r.route}</span>
          <span className="dash-col-lg dash-td-num">{r.received}</span>
        </motion.div>
      ))}
    </div>
  );
};

/* ---------- 02: the documents ---------- */

const documents = [
  { name: "ORDER_48291.pdf", kind: "PDF · 3 pages" },
  { name: "packing_list.xlsx", kind: "Spreadsheet" },
  { name: "FW_ booking confirmation.eml", kind: "Forwarded email" },
  { name: "dock_photo.jpg", kind: "Scan" },
];

const DocumentsScreen = ({ play }: { play: boolean }) => {
  const beats = useBeats(play, stagger(documents.length, 500, 420));
  return (
    <div className="dash-card">
      {documents.map((d, i) => {
        const read = beats > i;
        return (
          <div
            key={d.name}
            className="flex items-center gap-2 px-3 py-2.5"
            style={{ borderBottom: i < documents.length - 1 ? "1px solid var(--dash-border)" : undefined, color: "var(--dash-text)" }}
          >
            <FileText className="h-3 w-3 shrink-0" style={{ color: "var(--dash-text-3)" }} />
            <div className="min-w-0 flex-1">
              <p className="truncate">{d.name}</p>
              <p style={{ color: "var(--dash-text-3)", fontSize: "var(--dash-fs-xs)" }}>{d.kind}</p>
            </div>
            <span className={`dash-chip ${read ? "green" : "grey"}`}>{read ? "Read" : "Reading"}</span>
          </div>
        );
      })}
    </div>
  );
};

/* ---------- 03: traced to its source ---------- */

const ReviewScreen = ({ play }: { play: boolean }) => {
  // six order fields, then the weight, then its quote
  const beats = useBeats(play, stagger(8, 300, 220));
  return (
    <div className="dash-card">
      <div className="dash-form">
        <p className="dash-section">Order</p>
        <div className="dash-fields">
          <Field label="Customer" value="Rotterdam Distribution B.V." on={beats > 0} />
          <Field label="Reference" value="PO 48291" on={beats > 1} />
          <Field label="Pickup" value="14/07, 08:00" on={beats > 2} />
          <Field label="Delivery" value="Hamburg, Dock 4" on={beats > 3} />
          <Field label="Delivery postcode" state="empty-required" on={beats > 4} />
          <Field label="Quantity" value="24 pallets" on={beats > 5} />
        </div>
        <p className="dash-section">Weight</p>
        <div className="dash-fields">
          <Field label="Gross weight" value="3,240 kg" state="active" on={beats > 6} />
        </div>
        <motion.div className="dash-quote" initial={{ opacity: 0 }} animate={{ opacity: beats > 7 ? 1 : 0 }} transition={{ duration: 0.4 }}>
          "Total weight: 3,240 kg" — read from the email
        </motion.div>
      </div>
    </div>
  );
};

/* ---------- 04: matched to your TMS ---------- */

const matches = [
  { label: "Customer", name: "Rotterdam Distribution B.V.", code: "ROTDIS01", ok: true },
  { label: "Delivery site", name: "Hamburg Freight GmbH, Dock 4", code: "HAMFRE02", ok: true },
  { label: "Invoice to", name: "NL Purchasing Organization", code: "", ok: false },
];

const MatchScreen = ({ play }: { play: boolean }) => {
  const beats = useBeats(play, stagger(matches.length + 1, 500, 450));
  return (
    <div className="dash-card">
      <div className="dash-form">
        <p className="dash-section">Matched to your TMS</p>
        {matches.map((m, i) => {
          const on = beats > i;
          const matched = on && m.ok;
          return (
            <div key={m.label}>
              <p style={{ color: "var(--dash-text-3)", fontSize: "var(--dash-fs-xs)" }}>{m.label}</p>
              <div className={`dash-picker${matched ? "" : " is-empty"}`}>
                <span>{matched ? `${m.code} — ${m.name}` : on ? "Pick a code" : "Matching…"}</span>
                {matched ? <span className="dash-chip green">Matched</span> : on ? <span className="dash-chip amber">For you</span> : null}
              </div>
            </div>
          );
        })}
        <p className="dash-section">Filled from past orders</p>
        <div className="dash-fields">
          <Field label="Incoterm" value="FCA" on={beats > 3} />
          <Field label="Department" value="Export" on={beats > 3} />
        </div>
      </div>
    </div>
  );
};

/* ---------- 05: approve ---------- */

const ApproveScreen = ({ play }: { play: boolean }) => {
  // 1: the button is pressed, 2: the order is in the TMS
  const beats = useBeats(play, [1500, 2300]);
  const approved = beats >= 2;
  useEffect(() => {
    if (beats === 2) streamSignal.surge = 1;
  }, [beats]);
  return (
    <div className="dash-card">
      <div className="dash-form">
        <div className="flex items-center justify-between gap-2">
          <p className="dash-section">PO 48291 · Rotterdam → Hamburg</p>
          <span className={`dash-chip ${approved ? "green" : "amber"}`}>{approved ? "Completed" : "Needs review"}</span>
        </div>
        <div className={`dash-audit${approved ? "" : " is-warn"}`}>
          {approved ? "Order created in your TMS. No one typed a thing." : "1 field to confirm before this order can go: the carrier rate looks higher than usual."}
        </div>
        <p className="dash-section">Summary</p>
        <div className="dash-fields is-three">
          <Field label="Customer" value="Rotterdam Distribution B.V." />
          <Field label="Pickup" value="14/07, 08:00" />
          <Field label="Delivery" value="Hamburg, Dock 4" />
          <Field label="Quantity" value="24 pallets" />
          <Field label="Weight" value="3,240 kg" />
          <Field label="Carrier rate" value="€1,180" state={approved ? undefined : "active"} />
        </div>
        <hr className="dash-divider" />
        <div className="dash-actions">
          <span className="dash-btn">Save draft</span>
          <motion.span className="dash-btn is-primary" animate={{ scale: beats === 1 ? 0.94 : 1 }} transition={{ duration: 0.15 }}>
            {approved ? "Approved" : "Approve"}
          </motion.span>
        </div>
        <p className="dash-toast">{approved ? "Pushed to your TMS." : beats === 1 ? "Approving…" : ""}</p>
      </div>
    </div>
  );
};

/* ---------- putting it together ---------- */

const StepPanel = ({ i, play }: { i: number; play: boolean }) => (
  <Panel label={labels[i]}>
    {i === 0 && <OrdersScreen play={play} />}
    {i === 1 && <DocumentsScreen play={play} />}
    {i === 2 && <ReviewScreen play={play} />}
    {i === 3 && <MatchScreen play={play} />}
    {i === 4 && <ApproveScreen play={play} />}
  </Panel>
);

const StepText = ({ i, active }: { i: number; active: boolean }) => (
  <div className={`transition-opacity duration-500 ${active ? "opacity-100" : "opacity-40"}`}>
    <span
      key={active ? "on" : "off"}
      className={`font-mono text-[12px] ${active ? "relay-flicker text-ac-1 [text-shadow:0_0_16px_rgb(var(--ac-1)/0.9)]" : "text-th-muted"}`}
    >
      {steps[i].n}
    </span>
    <h3 className="mt-1.5 font-display text-[21px] font-semibold leading-tight tracking-[-0.02em] text-th-heading">{steps[i].title}</h3>
    <p className="mt-1.5 max-w-sm font-body text-[13px] leading-relaxed text-th-body">{steps[i].body}</p>
  </div>
);

const Glow = () => <div className="pointer-events-none absolute -inset-10 rounded-full bg-ac-1/[0.06] blur-[100px]" aria-hidden />;

const Pinned = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [step, setStep] = useState(0);
  const rail = useTransform(scrollYProgress, [0, 1], [0.04, 1]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setStep(Math.min(steps.length - 1, Math.floor(v * steps.length)));
  });

  // while the block is pinned, ask the stream for a packet at the panel's height
  useEffect(() => {
    const onScroll = () => {
      const r = ref.current?.getBoundingClientRect();
      if (!r) return;
      const pinned = r.top <= 0 && r.bottom >= window.innerHeight;
      streamSignal.pulseOn = pinned;
      if (pinned) streamSignal.pulseY = window.scrollY + window.innerHeight * 0.5;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      streamSignal.pulseOn = false;
    };
  }, []);

  return (
    <div ref={ref} className="relative hidden lg:block" style={{ height: `${100 + steps.length * 80}vh` }}>
      <div className="sticky top-0 flex h-screen items-center">
        <div className="grid w-full grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] items-center gap-16">
          <div className="relative pl-8">
            <div className="absolute inset-y-1 left-0 w-px bg-th-line/70" />
            <motion.div
              className="absolute left-0 top-1 w-px origin-top bg-ac-1 shadow-[0_0_10px_rgb(var(--ac-1))]"
              style={{ height: "calc(100% - 8px)", scaleY: rail }}
            />
            <ol className="space-y-7">
              {steps.map((s, i) => (
                <li key={s.n}>
                  <StepText i={i} active={i === step} />
                </li>
              ))}
            </ol>
          </div>
          <div className="relative">
            <Glow />
            <AnimatePresence mode="wait" initial={false}>
              {/* no filter here: a filter on an ancestor stops the glass's backdrop blur from seeing the canvas */}
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                <StepPanel i={step} play />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

const Stacked = ({ i }: { i: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-25% 0px" });
  return (
    <div ref={ref} className="space-y-6">
      <StepText i={i} active={inView} />
      <div className="relative">
        <Glow />
        <StepPanel i={i} play={inView} />
      </div>
    </div>
  );
};

export const RelayHowItWorks = () => (
  <section id="how" className={`relative scroll-mt-20 pt-16 ${RELAY_SHELL}`}>
    <SectionIntro
      eyebrow="how it works"
      title={
        <>
          From your inbox to your TMS, <Em>one order at a time</Em>.
        </>
      }
      aside="Forward the order inbox. The agent reads, drafts, and waits for your approval."
    />
    <Pinned />
    <div className="mt-16 space-y-20 pb-20 lg:hidden">
      {steps.map((_, i) => (
        <Stacked key={i} i={i} />
      ))}
    </div>
  </section>
);
