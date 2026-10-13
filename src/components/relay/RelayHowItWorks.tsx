import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import { Mail } from "lucide-react";
import { Em, Eyebrow, LogoMark, RELAY_SHELL, settle } from "./shared";
import { streamSignal } from "./streamSignal";

/**
 * How it works: a centred timeline. One vertical line down the middle fills
 * with scroll, a packet of light rides its tip, the stops (inbox, agent, TMS)
 * sit to its left and the step text to its right. Each stop lights as the tip
 * reaches it; reaching the TMS sends a surge down the page's light stream.
 * Below lg the steps stack as plain text.
 */

const steps = [
  {
    n: "01",
    title: "Every order lands in one queue",
    body: "Emails, PDFs and forwarded threads arrive in one inbox, sorted into orders and everything else.",
    node: { name: "inbox", detail: "PO 48291 · 2 attachments" },
  },
  {
    n: "02",
    title: "Every value traces back to its source",
    body: "Each field shows where it was read from. Anything uncertain is flagged for a person, not guessed.",
    node: { name: "agent", detail: "30 of 31 fields · 1 for you" },
  },
  {
    n: "03",
    title: "Nothing moves until your team says so",
    body: "Review, save a draft, or approve. Only approval pushes the order to your TMS.",
    node: { name: "your TMS", detail: "exported after approval" },
  },
];

const StepText = ({ i, active }: { i: number; active: boolean }) => (
  <div className={`transition-opacity duration-500 ${active ? "opacity-100" : "opacity-35"}`}>
    <span
      key={active ? "on" : "off"}
      className={`font-mono text-[12px] ${active ? "relay-flicker text-ac-1 [text-shadow:0_0_16px_rgb(var(--ac-1)/0.9)]" : "text-th-muted"}`}
    >
      {steps[i].n}
    </span>
    <h3 className="mt-2 font-display text-[24px] font-semibold leading-tight tracking-[-0.02em] text-th-heading">{steps[i].title}</h3>
    <p className="mt-2 max-w-[340px] font-body text-[14px] leading-relaxed text-th-body">{steps[i].body}</p>
  </div>
);

const NodeMark = ({ i, active }: { i: number; active: boolean }) => {
  if (i === 1) return <LogoMark size={34} />;
  return (
    <span
      className={`grid h-[34px] w-[34px] place-items-center rounded-lg border font-mono text-[11px] transition-colors duration-500 ${
        active ? "border-ac-1/70 bg-ac-1/15 text-ac-1" : "border-th-line bg-th-surface/80 text-th-muted"
      }`}
    >
      {i === 0 ? <Mail className="h-4 w-4" /> : "TM"}
    </span>
  );
};

const Node = ({ i, active }: { i: number; active: boolean }) => (
  <div className={`flex items-center justify-end gap-3 text-right transition-opacity duration-500 ${active ? "opacity-100" : "opacity-40"}`}>
    <div>
      <p className="font-mono text-[12px] text-th-heading">{steps[i].node.name}</p>
      <p className="font-mono text-[11px] text-th-muted">{steps[i].node.detail}</p>
    </div>
    <NodeMark i={i} active={active} />
  </div>
);

const Pinned = () => {
  const ref = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const fracs = useRef<number[]>(steps.map((_, i) => i / (steps.length - 1)));
  const [rail, setRail] = useState({ top: 0, height: 0 });
  const [step, setStep] = useState(0);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });
  // the tip reaches the last stop a little before the pin ends, then holds
  const tip = useTransform(smooth, [0.06, 0.8], [0, 1], { clamp: true });
  const tipPct = useTransform(tip, (t) => `${t * 100}%`);
  // the packet's tail fades in as it leaves the first stop, so it never pokes above the line
  const tail = useTransform(tip, [0, 0.08], [0, 1]);

  useMotionValueEvent(tip, "change", (t) => {
    let next = 0;
    fracs.current.forEach((f, i) => {
      if (t >= f - 0.01) next = i;
    });
    setStep(next);
  });

  // the order landing in the TMS pushes a surge through the background stream
  useEffect(() => {
    if (step === steps.length - 1) streamSignal.surge = 1;
  }, [step]);

  // the line runs from the first stop's dot to the last one's
  useLayoutEffect(() => {
    const measure = () => {
      const list = listRef.current;
      if (!list) return;
      const lt = list.getBoundingClientRect().top;
      const ys = dotRefs.current.map((d) => {
        const r = d?.getBoundingClientRect();
        return r ? r.top + r.height / 2 - lt : 0;
      });
      const span = ys[ys.length - 1] - ys[0] || 1;
      fracs.current = ys.map((y) => (y - ys[0]) / span);
      setRail({ top: ys[0], height: span });
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (listRef.current) ro.observe(listRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative hidden lg:block" style={{ height: `${100 + steps.length * 80}vh` }}>
      <div className="sticky top-0 flex h-screen items-center">
        <div className="relative mx-auto w-full max-w-[980px]">
          {/* track and fill, under the dots */}
          <div className="pointer-events-none absolute left-1/2 w-px -translate-x-1/2 bg-th-line/70" style={{ top: rail.top, height: rail.height }}>
            <motion.div className="absolute inset-x-0 top-0 bg-ac-1 shadow-[0_0_10px_rgb(var(--ac-1))]" style={{ height: tipPct }} />
          </div>

          <ol ref={listRef} className="relative space-y-20">
            {steps.map((s, i) => {
              const active = i === step;
              const passed = i < step;
              return (
                <li key={s.n} className="grid grid-cols-[minmax(0,1fr)_104px_minmax(0,1fr)] items-center">
                  <Node i={i} active={active} />
                  <span className="justify-self-center">
                    <span
                      ref={(el) => (dotRefs.current[i] = el)}
                      className={`block h-2.5 w-2.5 rounded-full border transition-all duration-500 ${
                        active
                          ? "border-white bg-white shadow-[0_0_16px_4px_rgb(var(--ac-1)/0.7)]"
                          : passed
                            ? "border-ac-1 bg-ac-1"
                            : "border-th-line bg-th-page"
                      }`}
                    />
                  </span>
                  <StepText i={i} active={active} />
                </li>
              );
            })}
          </ol>

          {/* the packet riding the tip, over everything */}
          <div className="pointer-events-none absolute left-1/2 w-px -translate-x-1/2" style={{ top: rail.top, height: rail.height }}>
            <motion.div className="absolute left-0 top-0" style={{ top: tipPct }}>
              <motion.span
                className="absolute bottom-0 left-0 h-14 w-[3px] -translate-x-1/2 rounded-full bg-gradient-to-b from-transparent via-ac-1/60 to-white"
                style={{ opacity: tail }}
              />
              <span className="absolute left-0 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_14px_5px_rgb(var(--ac-1)/0.8)]" />
            </motion.div>
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
    <div ref={ref}>
      <StepText i={i} active={inView} />
    </div>
  );
};

export const RelayHowItWorks = () => (
  <section id="how" className={`relative scroll-mt-20 pt-16 ${RELAY_SHELL}`}>
    <div className="mx-auto max-w-2xl text-center">
      <motion.div {...settle()}>
        <Eyebrow>how it works</Eyebrow>
      </motion.div>
      <motion.h2
        {...settle(0.1)}
        className="mt-6 font-display text-[34px] font-semibold leading-[1.08] tracking-[-0.03em] text-th-heading sm:text-[44px]"
      >
        From your inbox to your TMS, <Em>one order at a time</Em>.
      </motion.h2>
      <motion.p {...settle(0.2)} className="mx-auto mt-5 max-w-md font-body text-[15px] leading-relaxed text-th-body">
        Forward the order inbox. The agent reads, drafts, and waits for your approval.
      </motion.p>
    </div>
    <Pinned />
    <div className="mt-16 space-y-14 pb-20 lg:hidden">
      {steps.map((_, i) => (
        <Stacked key={i} i={i} />
      ))}
    </div>
  </section>
);
