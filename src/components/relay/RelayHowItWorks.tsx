import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useInView, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { Paperclip } from "lucide-react";
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
    <div className="p-4">{children}</div>
  </div>
);

const Inset = ({ className = "", children }: { className?: string; children: ReactNode }) => (
  <div className={`relay-glass-inset rounded-xl ${className}`}>{children}</div>
);

/* ---------- step 1: one email, sorted ---------- */

const Inbox = ({ play }: { play: boolean }) => {
  const beats = useBeats(play, [1400]);
  const sorted = beats >= 1;
  return (
    <Inset className="p-4">
      <div className="flex items-center justify-between font-mono text-[11px] text-th-muted">
        <span>Rotterdam Distribution B.V. · Planning</span>
        <span>07 Jul, 09:41</span>
      </div>
      <p className="mt-2 font-body text-[15px] font-medium text-th-heading">Transport request PO 48291</p>
      <p className="mt-1.5 font-body text-[13px] leading-relaxed text-th-body">
        Good morning, attached is the order for pickup Thursday at our Antwerp site, 2 trucks, delivery in Hamburg by Friday 16:00.
      </p>
      <div className="mt-4 flex items-center gap-2">
        {["ORDER_48291.pdf", "packing_list.xlsx"].map((a) => (
          <span key={a} className="inline-flex items-center gap-1.5 rounded-md border border-th-line px-2 py-1 font-mono text-[11px] text-th-body">
            <Paperclip className="h-3 w-3" />
            {a}
          </span>
        ))}
        <span
          className={`ml-auto rounded-md px-2 py-1 font-mono text-[11px] transition-colors duration-500 ${
            sorted ? "bg-ac-1 font-medium text-th-page" : "border border-th-line text-th-muted"
          }`}
        >
          {sorted ? "new order" : "reading"}
        </span>
      </div>
    </Inset>
  );
};

/* ---------- step 2: the fields fill in, each with its source ---------- */

const fields = [
  { k: "Consignor", v: "Rotterdam Distribution B.V.", from: "from the email" },
  { k: "Load Site", v: "Antwerp, Quay 730", from: "from ORDER_48291.pdf" },
  { k: "Unload Site", v: "Hamburg, Dock 4", from: "from ORDER_48291.pdf" },
  { k: "Gross Weight", v: "3,240 kg", from: "from packing_list.xlsx" },
  { k: "Load From", v: "14/07/2026, 08:00", from: "from the email" },
  { k: "Unload Site Code", v: "", from: "2 candidates" },
];

const Review = ({ play }: { play: boolean }) => {
  const beats = useBeats(play, fields.map((_, i) => 500 + i * 350));
  return (
    <div className="grid grid-cols-2 gap-2">
      {fields.map((f, i) => {
        const on = beats > i;
        const open = !f.v;
        return (
          <div
            key={f.k}
            className={`rounded-lg border px-3 py-2 transition-colors duration-500 ${
              !on ? "border-th-line/60" : open ? "border-amber-400/60" : "border-ac-1/40"
            }`}
          >
            <p className="font-mono text-[10px] text-th-muted">{f.k}</p>
            <motion.p
              className={`font-body text-[13px] leading-5 ${open ? "text-amber-300" : "text-th-heading"}`}
              initial={{ opacity: 0 }}
              animate={on ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {open ? "Not settled" : f.v}
            </motion.p>
            <motion.p
              className="font-mono text-[10px] text-th-muted"
              initial={{ opacity: 0 }}
              animate={on ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
            >
              {f.from}
            </motion.p>
          </div>
        );
      })}
    </div>
  );
};

/* ---------- step 3: approve, then the TMS row lights ---------- */

const Approve = ({ play }: { play: boolean }) => {
  // 1: the button is pressed, 2: the order has landed
  const beats = useBeats(play, [1300, 2200]);
  const landed = beats >= 2;
  useEffect(() => {
    if (beats === 2) streamSignal.surge = 1;
  }, [beats]);
  return (
    <div className="flex flex-col gap-2">
      <Inset className="flex items-center justify-between px-4 py-3">
        <div>
          <p className="font-body text-[13px] text-th-heading">PO 48291 · Antwerp to Hamburg · 2 trucks</p>
          <p className="font-mono text-[11px] text-th-muted">{landed ? "approved 09:44" : "ready for review"}</p>
        </div>
        <motion.span
          className={`rounded-full px-4 py-1.5 font-body text-[12px] font-medium transition-colors duration-500 ${
            landed ? "border border-th-line text-th-muted" : "bg-ac-1 text-th-page"
          }`}
          animate={beats === 1 ? { scale: 0.92 } : { scale: 1 }}
          transition={{ duration: 0.15 }}
        >
          {landed ? "Approved" : "Approve"}
        </motion.span>
      </Inset>
      <Inset className="flex items-center justify-between px-4 py-3">
        <div>
          <p className="font-body text-[13px] text-th-heading">Your TMS</p>
          <p className="font-mono text-[11px] text-th-muted">{landed ? "order 48291 · exported 09:44" : "waiting for approval"}</p>
        </div>
        <span className={`font-mono text-[11px] transition-colors duration-500 ${landed ? "text-ac-1" : "text-th-faint"}`}>
          {landed ? "exported" : "idle"}
        </span>
      </Inset>
    </div>
  );
};

/* ---------- putting it together ---------- */

const labels = ["inbox · 1 new", "review · PO 48291", "approve · PO 48291"];

const StepPanel = ({ i, play }: { i: number; play: boolean }) => (
  <Panel label={labels[i]}>
    {i === 0 && <Inbox play={play} />}
    {i === 1 && <Review play={play} />}
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

const Glow = () => <div className="pointer-events-none absolute -inset-10 rounded-full bg-ac-1/[0.06] blur-[100px]" aria-hidden />;

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
