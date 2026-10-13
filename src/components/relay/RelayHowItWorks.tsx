import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useInView, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { Check, Paperclip } from "lucide-react";
import { Em, LogoMark, RELAY_SHELL, SectionIntro } from "./shared";
import { streamSignal } from "./streamSignal";

/**
 * How it works: three steps pinned on the left, one glass panel on the right
 * that swaps between the inbox, the traced review and the approval. Each
 * panel plays its own short animation when it appears. Below lg the steps
 * stack and each panel plays when scrolled into view.
 */

const steps = [
  {
    n: "01",
    title: "Forward the inbox",
    body: "Every email and attachment is read and sorted: new order, update, cancellation, or not an order.",
  },
  {
    n: "02",
    title: "Review a traced draft",
    body: "A form that mirrors your TMS. Every value points to the line it came from.",
  },
  {
    n: "03",
    title: "Approve, and it exports",
    body: "Nothing leaves without your click. Each approval teaches the agent.",
  },
];

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

/* ---------- the glass frame ---------- */

const Panel = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className="relay-glass relative overflow-hidden rounded-2xl">
    <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
      <div className="flex items-center gap-2.5">
        <LogoMark size={22} />
        <span className="font-mono text-[12px] text-th-heading">Petaron agent</span>
      </div>
      <span className="font-mono text-[11px] text-th-muted">{label}</span>
    </div>
    <div className="relative h-[400px] p-4">{children}</div>
  </div>
);

const Inset = ({ className = "", children }: { className?: string; children: ReactNode }) => (
  <div className={`relay-glass-inset rounded-xl ${className}`}>{children}</div>
);

/* ---------- step 1: the inbox ---------- */

const attachments = ["ORDER_48291.pdf", "packing_list.xlsx"];

const Inbox = ({ play }: { play: boolean }) => {
  // 1-2: attachments read, 3: the queue row appears, 4: it is sorted
  const beats = useBeats(play, [1200, 1600, 2100, 2900]);
  const sorted = beats >= 4;
  return (
    <div className="flex h-full flex-col gap-3">
      <Inset className="relative overflow-hidden p-4">
        <div className="flex items-center justify-between font-mono text-[11px] text-th-muted">
          <span>Rotterdam Distribution B.V. · Planning</span>
          <span>07 Jul, 09:41</span>
        </div>
        <p className="mt-2 font-body text-[15px] font-medium text-th-heading">Transport request PO 48291</p>
        <p className="mt-1.5 font-body text-[13px] leading-relaxed text-th-body">
          Good morning, attached is the order for pickup Thursday at our Antwerp site, 2 trucks, delivery in Hamburg by Friday 16:00.
        </p>
        <div className="mt-3 flex gap-2">
          {attachments.map((a, i) => {
            const read = beats > i;
            return (
              <span
                key={a}
                className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-1 font-mono text-[11px] transition-colors duration-500 ${
                  read ? "border-ac-1/50 bg-ac-1/10 text-th-heading" : "border-th-line text-th-muted"
                }`}
              >
                {read ? <Check className="h-3 w-3 text-ac-1" /> : <Paperclip className="h-3 w-3" />}
                {a}
              </span>
            );
          })}
        </div>
        {/* the reading sheen */}
        <motion.div
          className="pointer-events-none absolute inset-y-0 w-28 bg-gradient-to-r from-transparent via-ac-1/15 to-transparent"
          initial={{ left: "-30%" }}
          animate={play ? { left: "115%" } : { left: "-30%" }}
          transition={{ duration: 1.5, delay: 0.3, ease: "easeInOut" }}
        />
      </Inset>

      <motion.div
        className="mt-auto"
        initial={{ opacity: 0, y: 8 }}
        animate={beats >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <p className="mb-2 px-1 font-mono text-[11px] text-th-muted">orders</p>
        <Inset className="flex items-center justify-between px-4 py-3">
          <div className="min-w-0">
            <p className="truncate font-body text-[13px] text-th-heading">Rotterdam Distribution B.V. · PO 48291</p>
            <p className="font-mono text-[11px] text-th-muted">Antwerp to Hamburg · 2 trucks · 07 Jul, 09:41</p>
          </div>
          <span
            className={`shrink-0 rounded-md px-2 py-0.5 font-mono text-[11px] transition-colors duration-500 ${
              sorted ? "bg-ac-1 font-medium text-th-page" : "border border-th-line text-th-muted"
            }`}
          >
            {sorted ? "new order" : "reading"}
          </span>
        </Inset>
      </motion.div>
    </div>
  );
};

/* ---------- step 2: the traced review ---------- */

const doc = [
  "ORDER CONFIRMATION · PO 48291",
  "Consignor: Rotterdam Distribution B.V.",
  "Load site: Antwerp, Quay 730",
  "Load from: 14/07/2026 08:00",
  "Unload site: Hamburg, Dock 4",
  "Goods: 24 pallets, gross weight 3,240 kg",
];

const traces = [
  { field: "Consignor", value: "Rotterdam Distribution B.V.", line: 1 },
  { field: "Load Site", value: "Antwerp, Quay 730", line: 2 },
  { field: "Load From", value: "14/07/2026, 08:00", line: 3 },
  { field: "Unload Site", value: "Hamburg, Dock 4", line: 4 },
  { field: "Gross Weight", value: "3,240 kg", line: 5 },
  { field: "Unload Site Code", value: "", line: -1 },
];

const SCAN_START = 0.4;
const SCAN_LEN = 2.6;

const Trace = ({ play }: { play: boolean }) => {
  const box = useRef<HTMLDivElement>(null);
  const lineEls = useRef<(HTMLSpanElement | null)[]>([]);
  const fieldEls = useRef<(HTMLDivElement | null)[]>([]);
  const [paths, setPaths] = useState<string[]>([]);

  useLayoutEffect(() => {
    const measure = () => {
      const b = box.current?.getBoundingClientRect();
      if (!b) return;
      setPaths(
        traces.map((tr, i) => {
          if (tr.line < 0) return "";
          const l = lineEls.current[tr.line]?.getBoundingClientRect();
          const f = fieldEls.current[i]?.getBoundingClientRect();
          if (!l || !f) return "";
          const x1 = l.right - b.left + 6;
          const y1 = l.top + l.height / 2 - b.top;
          const x2 = f.left - b.left;
          const y2 = f.top + f.height / 2 - b.top;
          const m = (x1 + x2) / 2;
          return `M ${x1} ${y1} C ${m} ${y1}, ${m} ${y2}, ${x2} ${y2}`;
        }),
      );
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (box.current) ro.observe(box.current);
    return () => ro.disconnect();
  }, []);

  // each value lights the moment the scan line passes its source line
  const at = (line: number) => (SCAN_START + ((line + 0.5) / doc.length) * SCAN_LEN) * 1000;
  const beats = useBeats(
    play,
    traces.map((t) => (t.line < 0 ? (SCAN_START + SCAN_LEN) * 1000 + 300 : at(t.line))),
  );
  const litLine = (line: number) => {
    const i = traces.findIndex((t) => t.line === line);
    return i >= 0 && beats > i;
  };

  return (
    <div ref={box} className="relative grid h-full grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-10">
      <Inset className="relative overflow-hidden p-4">
        <p className="font-mono text-[10px] text-th-faint">ORDER_48291.pdf · page 1</p>
        <div className="mt-3 space-y-3">
          {doc.map((line, i) => (
            <div key={line}>
              <span
                ref={(el) => (lineEls.current[i] = el)}
                className={`inline-block rounded px-1 font-mono text-[11px] leading-5 transition-colors duration-500 ${
                  litLine(i) ? "bg-ac-1/15 text-th-heading" : "text-th-muted"
                } ${i === 0 ? "text-th-body" : ""}`}
              >
                {line}
              </span>
            </div>
          ))}
        </div>
        {/* the scan line */}
        <motion.div
          className="pointer-events-none absolute inset-x-0 h-px bg-ac-1 shadow-[0_0_14px_2px_rgb(var(--ac-1)/0.6)]"
          initial={{ top: "0%", opacity: 0 }}
          animate={play ? { top: ["4%", "96%"], opacity: [0, 1, 1, 0] } : { top: "0%", opacity: 0 }}
          transition={{ duration: SCAN_LEN, delay: SCAN_START, ease: "linear", times: [0, 0.05, 0.95, 1] }}
        />
      </Inset>

      <div className="flex flex-col gap-2">
        {traces.map((t, i) => {
          const lit = beats > i;
          const unsettled = t.line < 0;
          return (
            <div
              key={t.field}
              ref={(el) => (fieldEls.current[i] = el)}
              className={`rounded-lg border px-3 py-1.5 transition-all duration-500 ${
                !lit
                  ? "border-th-line/60 bg-th-page/30"
                  : unsettled
                    ? "border-amber-400/60 bg-amber-400/5 shadow-[0_0_20px_rgb(251_191_36/0.15)]"
                    : "border-ac-1/50 bg-ac-1/[0.06] shadow-[0_0_20px_rgb(var(--ac-1)/0.12)]"
              }`}
            >
              <p className="font-mono text-[10px] text-th-muted">{t.field}</p>
              <p className={`font-body text-[13px] leading-5 ${unsettled && lit ? "text-amber-300" : "text-th-heading"}`}>
                {lit ? (unsettled ? "Not settled · 2 candidates" : t.value) : <span className="text-th-faint">—</span>}
              </p>
            </div>
          );
        })}
      </div>

      {/* fibers from each quote to its field */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden>
        <defs>
          <filter id="relay-fiber-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>
        {paths.map((d, i) =>
          d && beats > i ? (
            <g key={traces[i].field}>
              <motion.path
                d={d}
                fill="none"
                stroke="rgb(var(--ac-1))"
                strokeWidth="4"
                strokeOpacity="0.35"
                filter="url(#relay-fiber-glow)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, ease: EASE }}
              />
              <motion.path
                d={d}
                fill="none"
                stroke="rgb(var(--ac-1))"
                strokeWidth="1.2"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: EASE }}
              />
            </g>
          ) : null,
        )}
      </svg>
    </div>
  );
};

/* ---------- step 3: approve and export ---------- */

const summary = [
  { k: "Consignor", v: "ROTDIS01" },
  { k: "Load Site", v: "ANTQ730" },
  { k: "Unload Site", v: "HAMFRE04", human: true },
];

const Approve = ({ play }: { play: boolean }) => {
  const box = useRef<HTMLDivElement>(null);
  const approveRef = useRef<HTMLSpanElement>(null);
  const tmsRef = useRef<HTMLSpanElement>(null);
  const [pts, setPts] = useState({ ax: 300, ay: 250, tx: 300, ty: 400 });

  useLayoutEffect(() => {
    const b = box.current?.getBoundingClientRect();
    const a = approveRef.current?.getBoundingClientRect();
    const t = tmsRef.current?.getBoundingClientRect();
    if (!b || !a || !t) return;
    setPts({
      ax: a.left + a.width / 2 - b.left,
      ay: a.top + a.height / 2 - b.top,
      tx: t.left + t.width / 2 - b.left,
      ty: t.top + t.height / 2 - b.top,
    });
  }, []);

  // 1: cursor moves, 2: click, 3: packet flies, 4: it lands
  const beats = useBeats(play, [300, 1500, 1750, 2650]);
  useEffect(() => {
    if (beats === 4) streamSignal.surge = 1;
  }, [beats]);

  const flying = beats >= 3;
  const landed = beats >= 4;
  const fiber = `M ${pts.ax} ${pts.ay} C ${pts.ax} ${(pts.ay + pts.ty) / 2}, ${pts.tx} ${(pts.ay + pts.ty) / 2}, ${pts.tx} ${pts.ty}`;

  return (
    <div ref={box} className="relative flex h-full flex-col justify-between">
      <motion.div
        animate={landed ? { opacity: 0.45, filter: "blur(1px)" } : { opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.6 }}
      >
        <Inset className="p-4">
          <div className="flex items-center justify-between font-mono text-[11px]">
            <span className="text-th-body">PO 48291 · Antwerp to Hamburg · 2 trucks</span>
            <AnimatePresence mode="wait" initial={false}>
              {landed ? (
                <motion.span
                  key="ok"
                  className="inline-flex items-center gap-1 rounded-md bg-ac-1 px-2 py-0.5 font-medium text-th-page"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <Check className="h-3 w-3" /> Approved
                </motion.span>
              ) : (
                <motion.span key="rv" className="rounded-md border border-ac-1/50 bg-ac-1/10 px-2 py-0.5 text-ac-1" exit={{ opacity: 0 }}>
                  Ready
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {summary.map((f) => (
              <div
                key={f.k}
                className={`rounded-lg border bg-th-page/30 px-3 py-1.5 ${f.human ? "border-l-2 border-th-line/60 border-l-ac-1" : "border-th-line/60"}`}
              >
                <p className="font-mono text-[10px] text-th-muted">{f.k}</p>
                <p className="font-body text-[13px] leading-5 text-th-heading">{f.v}</p>
                {f.human && <p className="font-mono text-[9px] text-ac-1/80">picked by you</p>}
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-2.5">
            <span className="rounded-full border border-th-line px-3.5 py-1.5 font-body text-[12px] text-th-heading">Save draft</span>
            <motion.span
              ref={approveRef}
              className="rounded-full bg-ac-1 px-3.5 py-1.5 font-body text-[12px] font-medium text-th-page shadow-[0_0_24px_rgb(var(--ac-1)/0.35)]"
              animate={beats === 2 ? { scale: 0.92 } : { scale: 1 }}
              transition={{ duration: 0.15 }}
            >
              Approve
            </motion.span>
            <span className="ml-auto font-mono text-[10px] text-th-muted">nothing leaves until you approve</span>
          </div>
        </Inset>
      </motion.div>

      <div>
        <Inset className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <span
              ref={tmsRef}
              className={`grid h-9 w-9 place-items-center rounded-lg border font-mono text-[12px] transition-colors duration-500 ${
                landed ? "border-ac-1/60 bg-ac-1/15 text-ac-1 shadow-[0_0_24px_rgb(var(--ac-1)/0.3)]" : "border-th-line text-th-muted"
              }`}
            >
              TM
            </span>
            <div>
              <p className="font-body text-[13px] text-th-heading">Your TMS</p>
              <p className="font-mono text-[11px] text-th-muted">{landed ? "order 48291 · exported 09:44" : "waiting for approval"}</p>
            </div>
          </div>
          <span className={`font-mono text-[11px] transition-colors duration-500 ${landed ? "text-ac-1" : "text-th-faint"}`}>
            {landed ? "exported" : "idle"}
          </span>
        </Inset>
      </div>

      {/* the cursor and the packet of light */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden>
        <motion.path
          d={fiber}
          fill="none"
          stroke="rgb(var(--ac-1))"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={flying ? { pathLength: 1, opacity: landed ? 0.35 : 0.9 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: 0.85, ease: "easeInOut" }}
        />
      </svg>
      <motion.span
        className="pointer-events-none absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ac-1 shadow-[0_0_18px_4px_rgb(var(--ac-1)/0.7)]"
        initial={{ opacity: 0 }}
        animate={
          flying
            ? { opacity: [0, 1, 1, 0], left: [pts.ax, pts.ax, pts.tx, pts.tx], top: [pts.ay, pts.ay, pts.ty, pts.ty] }
            : { opacity: 0, left: pts.ax, top: pts.ay }
        }
        transition={{ duration: 0.9, ease: "easeInOut", times: [0, 0.1, 0.9, 1] }}
      />
      <motion.svg
        viewBox="0 0 24 24"
        className="pointer-events-none absolute h-4 w-4 fill-th-heading drop-shadow"
        initial={{ opacity: 0, left: 120, top: 60 }}
        animate={
          beats >= 1 && beats < 3
            ? { opacity: 1, left: pts.ax - 4, top: pts.ay - 3 }
            : { opacity: 0, left: beats >= 3 ? pts.ax - 4 : 120, top: beats >= 3 ? pts.ay - 3 : 60 }
        }
        transition={{ duration: beats >= 3 ? 0.3 : 1.1, ease: EASE }}
      >
        <path d="M5 3l14 8-6 1.5L16 20l-2 1-3-7.5L6 18z" />
      </motion.svg>
    </div>
  );
};

/* ---------- putting it together ---------- */

const labels = ["inbox · 1 new", "review · PO 48291", "approve · PO 48291"];

const StepPanel = ({ i, play }: { i: number; play: boolean }) => (
  <Panel label={labels[i]}>
    {i === 0 && <Inbox play={play} />}
    {i === 1 && <Trace play={play} />}
    {i === 2 && <Approve play={play} />}
  </Panel>
);

const StepText = ({ i, active }: { i: number; active: boolean }) => (
  <div className={`transition-opacity duration-500 ${active ? "opacity-100" : "opacity-40"}`}>
    <span
      key={active ? "on" : "off"}
      className={`font-mono text-[13px] ${active ? "relay-flicker text-ac-1 [text-shadow:0_0_16px_rgb(var(--ac-1)/0.9)]" : "text-th-muted"}`}
    >
      {steps[i].n}
    </span>
    <h3 className="mt-2 font-display text-[26px] font-semibold tracking-[-0.02em] text-th-heading">{steps[i].title}</h3>
    <p className="mt-2 max-w-sm font-body text-[14px] leading-relaxed text-th-body">{steps[i].body}</p>
  </div>
);

const Glow = () => <div className="pointer-events-none absolute -inset-16 rounded-full bg-ac-1/10 blur-[110px]" aria-hidden />;

const Pinned = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [step, setStep] = useState(0);
  const rail = useTransform(scrollYProgress, [0, 1], [0.04, 1]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setStep(Math.min(2, Math.floor(v * 3)));
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
    <div ref={ref} className="relative hidden lg:block" style={{ height: "300vh" }}>
      <div className="sticky top-0 flex h-screen items-center">
        <div className="grid w-full grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] items-center gap-16">
          <div className="relative pl-8">
            <div className="absolute inset-y-1 left-0 w-px bg-th-line/70" />
            <motion.div className="absolute left-0 top-1 w-px origin-top bg-ac-1 shadow-[0_0_10px_rgb(var(--ac-1))]" style={{ height: "calc(100% - 8px)", scaleY: rail }} />
            <ol className="space-y-10">
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
          From inbox to TMS, in <Em>three steps</Em>.
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
