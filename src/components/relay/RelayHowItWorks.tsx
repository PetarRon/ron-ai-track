import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import { RELAY_SHELL } from "./shared";
import { streamSignal } from "./streamSignal";

/**
 * How it works: three steps with a vertical line on their left, the pair
 * centred on the page. Scroll picks the step; the line then fills to that
 * step's dot and a packet of light travels down it and stops exactly on the dot. Reaching the last
 * step sends a surge down the page's light stream. Below lg the steps stack
 * as plain text.
 */

const steps = [
  {
    n: "01",
    title: "Every order lands in one queue",
    body: "Emails, PDFs and forwarded threads arrive in one inbox, sorted into orders and everything else.",
  },
  {
    n: "02",
    title: "Every value traces back to its source",
    body: "Each field shows where it was read from. Anything uncertain is flagged for a person, not guessed.",
  },
  {
    n: "03",
    title: "Nothing moves until your team says so",
    body: "Review, save a draft, or approve. Only approval pushes the order to your TMS.",
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
    <p className="mt-2 max-w-[400px] font-body text-[14px] leading-relaxed text-th-body">{steps[i].body}</p>
  </div>
);

const Pinned = () => {
  const ref = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const fracs = useRef<number[]>(steps.map((_, i) => i / (steps.length - 1)));
  const [rail, setRail] = useState({ top: 0, height: 0 });
  const [step, setStep] = useState(0); // where scroll says the packet should go
  const [lit, setLit] = useState(0); // the last dot the packet has actually reached

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // scroll picks the step; the tip then travels to that step's dot and stops exactly on it
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setStep(Math.min(steps.length - 1, Math.floor(p * steps.length)));
  });
  const tip = useSpring(0, { stiffness: 90, damping: 22 });
  const tipPct = useTransform(tip, (t) => `${t * 100}%`);
  // the tail is never longer than the line already travelled, so nothing shows above the first dot
  const railH = useMotionValue(0);
  const tailH = useTransform([tip, railH], ([t, h]: number[]) => Math.min(56, Math.max(0, t * h)));

  useEffect(() => {
    tip.set(fracs.current[step] ?? 0);
  }, [step, tip]);

  // a dot lights only once the packet's head is on it (within 6px), not when scroll picks the step
  useMotionValueEvent(tip, "change", (t) => {
    const h = railH.get() || 1;
    let reached = 0;
    fracs.current.forEach((f, i) => {
      if (t * h >= f * h - 6) reached = i;
    });
    setLit(reached);
  });

  // the order landing in the TMS pushes a surge through the background stream
  useEffect(() => {
    if (lit === steps.length - 1) streamSignal.surge = 1;
  }, [lit]);

  // the line runs from the first dot to the last
  useLayoutEffect(() => {
    const measure = () => {
      const list = listRef.current;
      if (!list) return;
      const lt = list.getBoundingClientRect().top;
      const ys = dotRefs.current.map((d) => {
        const r = d?.getBoundingClientRect();
        return r ? r.top + r.height / 2 - lt : 0;
      });
      const top = ys[0];
      const span = ys[ys.length - 1] - top || 1;
      fracs.current = ys.map((y) => (y - top) / span);
      railH.set(span);
      setRail({ top, height: span });
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (listRef.current) ro.observe(listRef.current);
    return () => ro.disconnect();
  }, [railH]);

  return (
    <div ref={ref} className="relative hidden lg:block" style={{ height: `${100 + steps.length * 80}vh` }}>
      <div className="sticky top-0 flex h-screen items-center">
        <div className="relative mx-auto w-full max-w-[500px]">
          {/* track and fill, under the dots; x is the centre of the 40px dot column */}
          <div className="pointer-events-none absolute left-5 w-px -translate-x-1/2 bg-th-line/70" style={{ top: rail.top, height: rail.height }}>
            <motion.div className="absolute inset-x-0 top-0 bg-ac-1 shadow-[0_0_10px_rgb(var(--ac-1))]" style={{ height: tipPct }} />
          </div>

          <ol ref={listRef} className="relative space-y-14">
            {steps.map((s, i) => {
              const active = i === lit;
              const passed = i < lit;
              return (
                <li key={s.n} className="grid grid-cols-[40px_minmax(0,1fr)] items-start gap-x-4">
                  <span
                    ref={(el) => (dotRefs.current[i] = el)}
                    className={`mt-[3px] block h-2.5 w-2.5 justify-self-center rounded-full border transition-all duration-200 ${
                      active
                        ? "border-white bg-white shadow-[0_0_16px_4px_rgb(var(--ac-1)/0.7)]"
                        : passed
                          ? "border-ac-1 bg-ac-1"
                          : "border-th-line bg-th-page"
                    }`}
                  />
                  <StepText i={i} active={active} />
                </li>
              );
            })}
          </ol>

          {/* the packet riding the tip, over everything */}
          <div className="pointer-events-none absolute left-5 w-px" style={{ top: rail.top, height: rail.height }}>
            <motion.div className="absolute left-0 top-0" style={{ top: tipPct }}>
              <motion.span
                className="absolute bottom-0 left-0 w-[3px] -translate-x-1/2 rounded-full bg-gradient-to-b from-transparent via-ac-1/60 to-white"
                style={{ height: tailH }}
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
  <section id="how" className={`relative scroll-mt-20 ${RELAY_SHELL}`}>
    <Pinned />
    <div className="space-y-14 pb-20 pt-16 lg:hidden">
      {steps.map((_, i) => (
        <Stacked key={i} i={i} />
      ))}
    </div>
  </section>
);
