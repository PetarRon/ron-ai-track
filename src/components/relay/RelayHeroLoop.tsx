import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Activity, BarChart3, Check, Eye, FileText, Home, Mail, Package, Search } from "lucide-react";

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
  { id: "a", subject: "Pickup Thursday, 24 pallets to Hamburg", status: "completed", fields: "31/31", received: "06 Oct, 09:12" },
  { id: "b", subject: "Reefer container, temp-controlled", status: "completed", fields: "31/31", received: "06 Oct, 08:57" },
  { id: "c", subject: "Weekly consolidation, Antwerp to Lyon", status: "completed", fields: "31/31", received: "06 Oct, 08:40" },
  { id: "d", subject: "Re: Invoice 4471, payment confirmation", status: "none", received: "06 Oct, 08:21" },
  { id: "e", subject: "Two containers ex Piraeus", status: "completed", fields: "31/31", received: "05 Oct, 16:02" },
  { id: "f", subject: "Bulk salt, 3 trucks Monday", status: "completed", fields: "31/31", received: "05 Oct, 14:48" },
  { id: "g", subject: "Re: change unload time, order 48114", status: "completed", fields: "31/31", received: "05 Oct, 11:30" },
];

const incoming: Row = { id: "n1", subject: "Booking request, Rotterdam to Hamburg", status: "processing", received: "06 Oct, 09:41" };
const patch = (r: Row, p: Partial<Row>): Row => ({ ...r, ...p });

type Phase = "queue" | "landed" | "flagged" | "reading" | "approving" | "approved" | "done";
const script: { name: Phase; ms: number }[] = [
  { name: "queue", ms: 1400 },
  { name: "landed", ms: 1600 },
  { name: "flagged", ms: 1200 },
  { name: "reading", ms: 3800 },
  { name: "approving", ms: 1600 },
  { name: "approved", ms: 1800 },
  { name: "done", ms: 2600 },
];

const rowsFor = (phase: Phase): Row[] => {
  if (phase === "queue") return base;
  if (phase === "landed") return [incoming, ...base];
  if (phase === "done") return [patch(incoming, { status: "completed", fields: "31/31" }), ...base];
  return [incoming, ...base];
};

/* ---------- the review (Flag Order) page ---------- */

type Field = { section: string; label: string; value: string; span?: 2 };
const formFields: Field[] = [
  { section: "Consignor", label: "Consignor", value: "Rotterdam Distribution B.V.", span: 2 },
  { section: "Load Site", label: "Load Site", value: "Antwerp, Quay 730", span: 2 },
  { section: "Load Site", label: "Date", value: "11 Sep 2026" },
  { section: "Load Site", label: "Time", value: "08:00" },
  { section: "Unload Site", label: "Unload Site", value: "Hamburg, Dock 4", span: 2 },
  { section: "Unload Site", label: "Date", value: "12 Sep 2026" },
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
          <span className="dash-chip grey">06 Oct, 09:41</span>
          <p style={{ marginTop: 6, fontWeight: 600, fontFamily: "var(--font-body)", fontSize: "var(--dash-fs)" }}>
            planning@rotterdam-distribution.example
          </p>
          <p style={{ color: "var(--dash-text-2)", fontFamily: "var(--font-body)" }}>Booking request, Rotterdam to Hamburg</p>
          <p style={{ marginTop: 6, lineHeight: 1.5 }}>
            Hi, please book a pickup at <Mark on={reading} i={1}>Antwerp, Quay 730</Mark> on{" "}
            <Mark on={reading} i={2}>11 Sep</Mark> at <Mark on={reading} i={3}>08:00</Mark>. Delivery to{" "}
            <Mark on={reading} i={4}>Hamburg, Dock 4</Mark> by <Mark on={reading} i={5}>12 Sep</Mark>, <Mark on={reading} i={6}>16:00</Mark>.{" "}
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
          <AnimatePresence mode="wait" initial={false}>
            {decided ? (
              <motion.span
                key="next"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="dash-btn is-primary ml-auto"
                style={{ boxShadow: "0 0 14px 2px rgb(var(--ac-1) / 0.4)" }}
              >
                Go next →
              </motion.span>
            ) : (
              <motion.span
                key="approve"
                exit={{ opacity: 0 }}
                animate={phase === "approving" ? { scale: [1, 0.92, 1] } : { scale: 1 }}
                transition={phase === "approving" ? { delay: 1.1, duration: 0.3 } : { duration: 0.25 }}
                className="dash-btn is-primary ml-auto"
              >
                Approve
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* the cursor that picks the code and approves */}
        <AnimatePresence>
          {phase === "approving" && (
            <motion.svg
              key="cursor"
              viewBox="0 0 24 24"
              className="absolute h-4 w-4 drop-shadow"
              style={{ fill: "var(--dash-text)" }}
              initial={{ opacity: 0, left: 120, top: 260 }}
              animate={{ opacity: 1, left: [120, 222, 222], top: [240, 330, 330] }}
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
            <span className="dash-nav-item">
              <BarChart3 className="h-3 w-3" /> Dashboard
            </span>
            <span className="dash-nav-item is-active">
              <Package className="h-3 w-3" /> Orders
            </span>
            <span className="dash-nav-item">
              <Activity className="h-3 w-3" /> Health
            </span>
          </nav>
        </aside>
        <header className="dash-top">
          <p className="dash-crumb">
            Orders
            {onReview && (
              <>
                <span>&gt;</span>Flag Order
              </>
            )}
          </p>
          <div className="dash-top-right">
            <span className="dash-td-mono">09:41:07</span>
            <span className="dash-hide-sm">ops@yourcompany · demo</span>
            <span
              className="flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-semibold"
              style={{ background: "var(--dash-surface)", border: "1px solid var(--dash-border-2)", color: "var(--dash-text-2)" }}
            >
              OP
            </span>
          </div>
        </header>
        <div className="dash-main">
          <div className="relative h-full min-h-0">
            <AnimatePresence initial={false}>
              {onReview ? (
                <motion.div
                  key="review"
                  className="absolute inset-0"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.35 }}
                >
                  <Review phase={phase} />
                </motion.div>
              ) : (
                <motion.div
                  key="queue"
                  className="absolute inset-0 flex flex-col gap-2.5"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.35 }}
                >
                  <Queue rows={rowsFor(phase)} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
