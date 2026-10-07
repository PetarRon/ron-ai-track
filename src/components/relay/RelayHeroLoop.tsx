import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Activity, BarChart3, Check, Clock, Eye, FileText, Home, Mail, Package, Paperclip, Search, User } from "lucide-react";

/**
 * The hero window: a miniature of the operator dashboard (the `.dash` replica
 * styles in src/index.css, dark glass variant) with one order moving through
 * it on a loop. A new email lands in the Orders queue, the review page opens,
 * the form fills from the email with every phrase highlighted at its source,
 * Approve, back to the queue as Order completed. Rows are placeholders and
 * nothing names a downstream system.
 */

type Status = "processing" | "review" | "completed" | "none";
type Row = { id: string; subject: string; status: Status; fields?: string; received: string };

const chip: Record<Status, { cls: string; label: string }> = {
  processing: { cls: "grey", label: "Processing" },
  review: { cls: "amber", label: "Needs review" },
  completed: { cls: "green", label: "Order completed" },
  none: { cls: "outline", label: "No order" },
};

const base: Row[] = [
  { id: "a", subject: "Pickup Thursday, 24 pallets to Hamburg", status: "completed", fields: "31/31", received: "07 Jul, 09:12" },
  { id: "b", subject: "Reefer container, temp-controlled", status: "completed", fields: "31/31", received: "07 Jul, 08:57" },
  { id: "c", subject: "Weekly consolidation, Antwerp to Lyon", status: "completed", fields: "31/31", received: "07 Jul, 08:40" },
  { id: "d", subject: "Re: Invoice 4471, payment confirmation", status: "none", received: "07 Jul, 08:21" },
  { id: "e", subject: "Two containers ex Piraeus", status: "completed", fields: "31/31", received: "06 Jul, 16:02" },
  { id: "f", subject: "Bulk salt, 3 trucks Monday", status: "completed", fields: "31/31", received: "06 Jul, 14:48" },
  { id: "g", subject: "Re: change unload time, order 48114", status: "completed", fields: "31/31", received: "06 Jul, 11:30" },
];

const incoming: Row = { id: "n1", subject: "Booking request, Rotterdam to Hamburg", status: "processing", received: "07 Jul, 09:41" };
const patch = (r: Row, p: Partial<Row>): Row => ({ ...r, ...p });

type Phase = "queue" | "landed" | "flagged" | "reading" | "approving" | "approved" | "done" | "dashboard";
const script: { name: Phase; ms: number }[] = [
  { name: "queue", ms: 1400 },
  { name: "landed", ms: 1600 },
  { name: "flagged", ms: 1200 },
  { name: "reading", ms: 3800 },
  { name: "approving", ms: 1600 },
  { name: "approved", ms: 3000 },
  { name: "dashboard", ms: 4200 },
];

const rowsFor = (phase: Phase): Row[] => {
  if (phase === "queue") return base;
  if (phase === "landed") return [incoming, ...base];
  if (phase === "done" || phase === "dashboard") return [patch(incoming, { status: "completed", fields: "31/31" }), ...base];
  return [incoming, ...base];
};

/* ---------- the review (Flag Order) page ---------- */

type Field = { section: string; label: string; value: string; span?: 2 };
const formFields: Field[] = [
  { section: "Consignor", label: "Consignor", value: "Rotterdam Distribution B.V.", span: 2 },
  { section: "Load Site", label: "Load Site", value: "Antwerp, Quay 730", span: 2 },
  { section: "Load Site", label: "Date", value: "14/07/2026" },
  { section: "Load Site", label: "Time", value: "08:00" },
  { section: "Unload Site", label: "Unload Site", value: "Hamburg, Dock 4", span: 2 },
  { section: "Unload Site", label: "Date", value: "15/07/2026" },
  { section: "Unload Site", label: "Time", value: "16:00" },
  { section: "Goods", label: "Weight", value: "3,240 kg" },
  { section: "Goods", label: "Packed", value: "Pallets" },
  { section: "Goods", label: "Packages", value: "24" },
];

const Mark = ({ children, on, i }: { children: string; on: boolean; i: number }) =>
  on ? (
    <motion.mark
      className="dash-mark"
      initial={{ backgroundColor: "rgba(171,171,171,0)" }}
      animate={{ backgroundColor: "rgba(171,171,171,0.16)" }}
      transition={{ delay: 0.3 + i * 0.38 }}
    >
      {children}
    </motion.mark>
  ) : (
    <>{children}</>
  );

const Review = ({ phase }: { phase: Phase }) => {
  const reading = phase !== "flagged";
  const decided = phase === "approved";
  const approveRef = useRef<HTMLSpanElement>(null);
  const [target, setTarget] = useState({ x: 200, y: 340 });
  useEffect(() => {
    // offsetLeft/Top are layout values, so the window's 3D tilt does not skew them
    const el = approveRef.current;
    const bar = el?.offsetParent as HTMLElement | null;
    if (el && bar) setTarget({ x: bar.offsetLeft + el.offsetLeft + el.offsetWidth / 2, y: bar.offsetTop + el.offsetTop + el.offsetHeight / 2 });
  }, [phase]);
  return (
    <div className="grid h-full min-h-0 grid-cols-2 gap-2">
      {/* left: source pane */}
      <div className="dash-card min-w-0">
        <div className="dash-pills">
          <span className="dash-pill is-active">
            <Mail className="h-2.5 w-2.5" /> Email <b>1</b>
          </span>
          <span className="dash-pill">
            <FileText className="h-2.5 w-2.5" /> Documents <b>2</b>
          </span>
          <span className="dash-pill">
            <Eye className="h-2.5 w-2.5" /> Text
          </span>
        </div>
        <div className="dash-mono-body" style={{ borderTop: "1px solid var(--dash-border)", padding: 8, overflow: "hidden" }}>
          <span className="dash-chip grey">07 Jul, 09:41</span>
          <p style={{ marginTop: 6, fontWeight: 600, fontFamily: "var(--font-body)", fontSize: "var(--dash-fs)" }}>
            Rotterdam Distribution B.V. · Planning
          </p>
          <p style={{ color: "var(--dash-text-2)", fontFamily: "var(--font-body)" }}>Booking request, Rotterdam to Hamburg</p>
          <p style={{ marginTop: 6, lineHeight: 1.5 }}>
            Hi, please book a pickup at <Mark on={reading} i={1}>Antwerp, Quay 730</Mark> on{" "}
            <Mark on={reading} i={2}>14/07</Mark> at <Mark on={reading} i={3}>08:00</Mark>. Delivery to{" "}
            <Mark on={reading} i={4}>Hamburg, Dock 4</Mark> by <Mark on={reading} i={5}>15/07</Mark>, <Mark on={reading} i={6}>16:00</Mark>.{" "}
            <Mark on={reading} i={9}>24</Mark> <Mark on={reading} i={8}>pallets</Mark>, total weight{" "}
            <Mark on={reading} i={7}>3,240 kg</Mark>. Thanks.
          </p>
        </div>
      </div>

      {/* right: the form */}
      <div className="dash-card relative min-w-0">
        <div className="dash-form" style={{ gap: 14, paddingTop: 14, paddingBottom: 38 }}>
          {["Consignor", "Load Site", "Unload Site", "Goods"].map((section) => (
            <div key={section}>
              <div className="dash-fields" style={{ gap: 8 }}>
                {formFields
                  .filter((f) => f.section === section)
                  .map((f) => {
                    const k = formFields.indexOf(f);
                    return (
                      <div
                        key={f.label}
                        className="dash-field"
                        style={f.span === 2 ? { gridColumn: "1 / -1" } : undefined}
                      >
                        <em>{f.label}</em>
                        <span className="v">
                          {phase === "reading" ? (
                            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 + k * 0.38, duration: 0.3 }}>
                              {f.value}
                            </motion.span>
                          ) : reading ? (
                            f.value
                          ) : null}
                        </span>
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>

        {/* action bar */}
        <div
          className="relay-actions absolute inset-x-0 bottom-0 flex items-center gap-1.5 px-2 py-1.5"
          style={{ borderTop: "1px solid var(--dash-border)", background: "var(--dash-bg)" }}
        >
          {decided ? (
            <motion.span
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-1.5"
              style={{ color: "var(--dash-primary)", fontSize: "var(--dash-fs-sm)" }}
            >
              <Check className="h-3 w-3" /> Approved · order created
            </motion.span>
          ) : (
            <span className="dash-btn">Save draft</span>
          )}
          <motion.span
            ref={approveRef}
            animate={phase === "approving" ? { scale: [1, 0.92, 1] } : { scale: 1 }}
            transition={phase === "approving" ? { delay: 1.1, duration: 0.3 } : { duration: 0.25 }}
            className="dash-btn is-primary ml-auto"
            style={decided ? { opacity: 0.7 } : undefined}
          >
            {decided ? "Approved" : "Approve"}
          </motion.span>
        </div>

        {/* the cursor that picks the code and approves */}
        <AnimatePresence>
          {phase === "approving" && (
            <motion.svg
              key="cursor"
              viewBox="0 0 24 24"
              className="absolute h-4 w-4 drop-shadow"
              style={{ fill: "var(--dash-text)" }}
              initial={{ opacity: 0, left: 110, top: 220 }}
              animate={{ opacity: 1, left: [110, target.x - 4, target.x - 4], top: [220, target.y - 3, target.y - 3] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.3, times: [0, 0.75, 1], ease: [0.22, 1, 0.36, 1] }}
            >
              <path d="M5 3l14 8-6 1.5L16 20l-2 1-3-7.5L6 18z" />
            </motion.svg>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

/* ---------- the dashboard page: stat cards, pipeline sankey, two small charts ---------- */

const stats = [
  { label: "Avg. Processing Time", value: "27", unit: "s", Icon: Clock },
  { label: "Total Emails", value: "612", unit: "", Icon: Mail },
  { label: "Total Conversations", value: "284", unit: "", Icon: Package },
  { label: "Total Attachments", value: "48", unit: "", Icon: Paperclip },
];

type Node = { x: number; y: number; h: number; label: string; color: string; align?: "left" | "right" };
const W = 600;
const nodes: Record<string, Node> = {
  a: { x: 4, y: 18, h: 112, label: "Extracting (210)", color: "var(--dash-text-3)" },
  b: { x: 180, y: 18, h: 112, label: "Processed (210)", color: "var(--dash-text-3)" },
  c: { x: 360, y: 48, h: 82, label: "Order (165)", color: "var(--dash-primary)" },
  d: { x: W - 4, y: 6, h: 24, label: "Non-Order (45)", color: "var(--dash-text-3)", align: "right" },
  e: { x: W - 4, y: 48, h: 72, label: "Passed (160)", color: "var(--dash-primary)", align: "right" },
  f: { x: W - 4, y: 132, h: 8, label: "Awaiting review (5)", color: "var(--dash-amber)", align: "right" },
};

// a ribbon from a slice of one node bar to a slice of another
const ribbon = (x1: number, y1: number, h1: number, x2: number, y2: number, h2: number) => {
  const m = (x1 + x2) / 2;
  return `M ${x1} ${y1} C ${m} ${y1}, ${m} ${y2}, ${x2} ${y2} L ${x2} ${y2 + h2} C ${m} ${y2 + h2}, ${m} ${y1 + h1}, ${x1} ${y1 + h1} Z`;
};

const flows = [
  { d: ribbon(nodes.a.x, nodes.a.y, nodes.a.h, nodes.b.x, nodes.b.y, nodes.b.h), color: "var(--dash-text-3)", o: 0.18 },
  { d: ribbon(nodes.b.x, nodes.b.y, 24, nodes.d.x, nodes.d.y, nodes.d.h), color: "var(--dash-text-3)", o: 0.14 },
  { d: ribbon(nodes.b.x, nodes.b.y + 30, 82, nodes.c.x, nodes.c.y, nodes.c.h), color: "var(--dash-primary)", o: 0.16 },
  { d: ribbon(nodes.c.x, nodes.c.y, 72, nodes.e.x, nodes.e.y, nodes.e.h), color: "var(--dash-primary)", o: 0.22 },
  { d: ribbon(nodes.c.x, nodes.c.y + 74, 8, nodes.f.x, nodes.f.y, nodes.f.h), color: "var(--dash-amber)", o: 0.45 },
];

const Sankey = () => (
  <svg viewBox={`0 0 ${W} 150`} className="mt-1 min-h-0 w-full flex-1" preserveAspectRatio="none" aria-hidden>
    {flows.map((f, i) => (
      <motion.path
        key={i}
        d={f.d}
        fill={f.color}
        initial={{ opacity: 0 }}
        animate={{ opacity: f.o }}
        transition={{ delay: 0.3 + i * 0.12, duration: 0.6 }}
      />
    ))}
    {Object.values(nodes).map((n, i) => (
      <motion.g key={n.label} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 + i * 0.1 }}>
        <rect x={n.x - 2} y={n.y} width="4" height={n.h} rx="1" fill={n.color} />
        <text
          x={n.align === "right" ? n.x - 8 : n.x + 8}
          y={n.y + 10}
          textAnchor={n.align === "right" ? "end" : "start"}
          fill="var(--dash-text-2)"
          fontFamily="var(--font-body)"
          fontSize="11"
        >
          {n.label}
        </text>
      </motion.g>
    ))}
  </svg>
);

const Seg = ({ active }: { active: string }) => (
  <span className="relay-seg">
    {["D", "W", "M"].map((k) => (
      <span key={k} className={k === active ? "is-active" : ""}>
        {k}
      </span>
    ))}
  </span>
);

const Dashboard = () => {
  const r = 26;
  const c = 2 * Math.PI * r;
  const segments = [
    { label: "Validated", share: 0.5, color: "var(--dash-primary)" },
    { label: "Passed", share: 0.34, color: "#e18181" },
    { label: "Non-Order", share: 0.1, color: "var(--dash-text-3)" },
    { label: "Pending Review", share: 0.06, color: "var(--dash-amber)" },
  ];
  let acc = 0;
  const card = "dash-card flex min-h-0 flex-col p-2.5";
  const title = { color: "var(--dash-text)", fontSize: "var(--dash-fs-sm)" } as const;
  return (
    <div className="flex h-full min-h-0 flex-col gap-2">
      <div className="grid grid-cols-4 gap-2">
        {stats.map((k, i) => (
          <motion.div
            key={k.label}
            className="dash-card px-2.5 py-2"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 + i * 0.07, duration: 0.4 }}
          >
            <div className="flex items-start justify-between gap-1">
              <span className="truncate" style={{ color: "var(--dash-text-3)", fontSize: "var(--dash-fs-sm)" }}>
                {k.label}
              </span>
              <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full" style={{ background: "var(--dash-primary)", color: "rgb(var(--th-page))" }}>
                <k.Icon className="h-2.5 w-2.5" />
              </span>
            </div>
            <p className="mt-1 font-body text-[17px] font-semibold leading-none tracking-tight" style={{ color: "var(--dash-text)" }}>
              {k.value}
              <span className="text-[10px] font-normal" style={{ color: "var(--dash-text-2)" }}>
                {k.unit}
              </span>
            </p>
          </motion.div>
        ))}
      </div>

      <div className={card} style={{ flex: "1.1 1 0" }}>
        <div className="flex items-center justify-between" style={title}>
          <span>Agentic Pipeline</span>
          <Seg active="D" />
        </div>
        <Sankey />
      </div>

      <div className="grid min-h-0 grid-cols-[1fr_1.4fr] gap-2" style={{ flex: "1 1 0" }}>
        <div className={card}>
          <div className="flex items-center justify-between" style={title}>
            <span>Conversations Status</span>
            <Seg active="M" />
          </div>
          <div className="flex min-h-0 flex-1 items-center gap-2.5">
            <svg viewBox="0 0 64 64" className="h-[62px] w-[62px] shrink-0 -rotate-90" aria-hidden>
              {segments.map((seg) => {
                const start = acc;
                acc += seg.share;
                return (
                  <motion.circle
                    key={seg.label}
                    cx="32"
                    cy="32"
                    r={r}
                    fill="none"
                    stroke={seg.color}
                    strokeWidth="11"
                    strokeDasharray={`${seg.share * c} ${c}`}
                    initial={{ strokeDashoffset: -start * c + c * 0.2, opacity: 0 }}
                    animate={{ strokeDashoffset: -start * c, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  />
                );
              })}
            </svg>
            <ul className="space-y-1" style={{ fontSize: "var(--dash-fs-xs)", color: "var(--dash-text-2)" }}>
              {segments.map((seg) => (
                <li key={seg.label} className="flex items-center gap-1.5 whitespace-nowrap">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: seg.color }} />
                  {seg.label}
                  <span style={{ color: "var(--dash-text-3)" }}>{Math.round(seg.share * 100)}%</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={card}>
          <div className="flex items-center justify-between" style={title}>
            <span>Emails Throughput</span>
            <Seg active="M" />
          </div>
          <svg viewBox="0 0 300 100" className="mt-1 min-h-0 w-full flex-1" preserveAspectRatio="none" aria-hidden>
            {[0, 25, 50, 75].map((y) => (
              <line key={y} x1="0" x2="300" y1={y + 8} y2={y + 8} stroke="var(--dash-border)" strokeWidth="1" />
            ))}
            <motion.path
              d="M0 70 C 40 60, 60 30, 95 32 S 150 85, 180 80 S 225 10, 255 14 S 285 40, 300 44"
              fill="none"
              stroke="var(--dash-primary)"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.4, duration: 1.4, ease: "easeInOut" }}
            />
          </svg>
          <div className="mt-0.5 flex justify-between" style={{ color: "var(--dash-text-3)", fontSize: "var(--dash-fs-xs)" }}>
            {["Jul 01", "Jul 08", "Jul 15", "Jul 22", "Jul 29"].map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------- the orders queue ---------- */

const Queue = ({ rows }: { rows: Row[] }) => {
  const open = rows.filter((r) => r.status === "review" || r.status === "processing").length;
  return (
    <>
      <div className="flex items-end justify-between gap-2">
        <div className="dash-search">
          <em>Search</em>
          <Search className="h-3 w-3" />
        </div>
        <span className="relay-seg">
          {["D", "W", "M", "All"].map((k) => (
            <span key={k} className={k === "D" ? "is-active" : ""}>
              {k}
            </span>
          ))}
        </span>
      </div>
      <div className="dash-table">
        <div className="dash-tr relay-queue-row is-head">
          <span>Status</span>
          <span>Subject</span>
          <span className="dash-td-num">Fields</span>
          <span className="dash-td-num">Received</span>
        </div>
        <AnimatePresence initial={false}>
          {rows.slice(0, 8).map((r) => {
            const partial = r.fields && r.fields.split("/")[0] !== r.fields.split("/")[1];
            return (
              <motion.div
                key={r.id}
                layout
                initial={{ opacity: 0, y: -14, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 32 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className={`dash-tr relay-queue-row${r.status === "completed" ? " is-done" : ""}${r.status === "none" ? " is-none" : ""}${
                  r.id === "n1" ? " is-hover" : ""
                }`}
              >
                <span className="dash-chip-cell">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={r.status}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.25 }}
                      className={`dash-chip ${chip[r.status].cls}`}
                    >
                      {chip[r.status].label}
                    </motion.span>
                  </AnimatePresence>
                </span>
                <span className="dash-td-ellipsis">{r.subject}</span>
                <span className={`dash-td-num${partial ? " is-error" : ""}`}>{r.fields ?? "—"}</span>
                <span className="dash-td-num" style={{ color: "var(--dash-text-3)" }}>
                  {r.received}
                </span>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
      <p style={{ color: "var(--dash-text-3)", fontSize: "var(--dash-fs-sm)" }}>{open} open · 148 settled in the last week</p>
    </>
  );
};

/* ---------- the window ---------- */

export const RelayHeroLoop = () => {
  const [i, setI] = useState(0);
  const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const phase: Phase = reduced ? "done" : script[i].name;
  const onReview = phase === "flagged" || phase === "reading" || phase === "approving" || phase === "approved";
  const onDashboard = phase === "dashboard";
  const pane = (visible: boolean, hiddenY: number) => ({
    initial: false as const,
    animate: { opacity: visible ? 1 : 0, y: visible ? 0 : hiddenY },
    transition: { duration: 0.3 },
    style: { visibility: visible ? "visible" : "hidden", transitionProperty: "visibility", transitionDelay: visible ? "0s" : "0.3s" } as const,
  });

  useEffect(() => {
    if (reduced) return;
    const t = setTimeout(() => setI((v) => (v + 1) % script.length), script[i].ms);
    return () => clearTimeout(t);
  }, [i, reduced]);

  return (
    <div className="h-[440px] w-[620px] overflow-hidden rounded-2xl shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
      <div className="dash is-glass h-full" aria-hidden="true">
        <aside className="dash-side">
          <div className="dash-brand">
            <img src="/petaron_logo.svg" alt="" className="h-3.5 w-3.5" />
            Petaron
          </div>
          <nav className="dash-nav">
            <span className="dash-nav-item">
              <Home className="h-3 w-3" /> Home
            </span>
            <span className={`dash-nav-item${onDashboard ? " is-active" : ""}`}>
              <BarChart3 className="h-3 w-3" /> Dashboard
            </span>
            <span className={`dash-nav-item${onDashboard ? "" : " is-active"}`}>
              <Package className="h-3 w-3" /> Orders
            </span>
            <span className="dash-nav-item">
              <Activity className="h-3 w-3" /> Health
            </span>
          </nav>
        </aside>
        <header className="dash-top">
          <p className="dash-crumb">{onDashboard ? "Dashboard" : "Orders"}</p>
          <div className="dash-top-right">
            <span className="dash-td-mono">09:41:07</span>
            <span className="dash-hide-sm">Operations</span>
            <span
              className="flex h-5 w-5 items-center justify-center rounded-full"
              style={{ background: "var(--dash-surface)", border: "1px solid var(--dash-border-2)", color: "var(--dash-text-2)" }}
            >
              <User className="h-3 w-3" />
            </span>
          </div>
        </header>
        <div className="dash-main">
          {/* Both pages stay mounted and fade directly: an exit animation under
              the 3D tilt lingered and let the queue show through the review. */}
          <div className="relative h-full min-h-0">
            <motion.div className="absolute inset-0 flex flex-col gap-2.5" {...pane(!onReview && !onDashboard, -6)}>
              <Queue rows={rowsFor(phase)} />
            </motion.div>
            <motion.div className="absolute inset-0" {...pane(onReview, 10)}>
              <Review phase={phase} />
            </motion.div>
            <motion.div className="absolute inset-0" {...pane(onDashboard, 10)}>
              {onDashboard && <Dashboard />}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
