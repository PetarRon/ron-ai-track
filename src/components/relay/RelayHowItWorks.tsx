import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import { Em, Eyebrow, RELAY_SHELL, settle } from "./shared";
import { streamSignal } from "./streamSignal";

/**
 * How it works: a centred timeline. One vertical line down the middle of the
 * page fills with scroll and a packet of light rides its tip. Each step sits
 * centred under its dot; the line fades out behind the text so it never runs
 * through the words. Reaching the last step sends a surge down the page's
 * light stream. Below lg the steps stack as plain text.
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

const StepText = ({ i, active, center = false }: { i: number; active: boolean; center?: boolean }) => (
  <div className={`transition-opacity duration-500 ${active ? "opacity-100" : "opacity-35"} ${center ? "text-center" : ""}`}>
    <span
      key={active ? "on" : "off"}
      className={`font-mono text-[12px] ${active ? "relay-flicker text-ac-1 [text-shadow:0_0_16px_rgb(var(--ac-1)/0.9)]" : "text-th-muted"}`}
    >
      {steps[i].n}
    </span>
    <h3 className="mt-2 font-display text-[24px] font-semibold leading-tight tracking-[-0.02em] text-th-heading">{steps[i].title}</h3>
    <p className={`mt-2 max-w-[400px] font-body text-[14px] leading-relaxed text-th-body ${center ? "mx-auto" : ""}`}>{steps[i].body}</p>
  </div>
);

/** extra room above and below the line, so the packet's glow is not clipped by the mask */
const PAD = 28;
/** how softly the line fades in and out around a text block */
const FEATHER = 14;

const Pinned = () => {
  const ref = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const fracs = useRef<number[]>(steps.map((_, i) => i / (steps.length - 1)));
  const [rail, setRail] = useState({ top: 0, height: 0, mask: "none" });
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

  // the line runs from the first dot to the last, masked out wherever text sits on it
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

      const stops = ["black 0px"];
      textRefs.current.forEach((el) => {
        const r = el?.getBoundingClientRect();
        if (!r) return;
        const a = r.top - lt - top + PAD;
        const b = r.bottom - lt - top + PAD;
        if (b <= PAD || a >= span + PAD) return;
        stops.push(`black ${a - FEATHER}px`, `transparent ${a}px`, `transparent ${b}px`, `black ${b + FEATHER}px`);
      });
      stops.push("black 100%");
      setRail({ top, height: span, mask: `linear-gradient(to bottom, ${stops.join(", ")})` });
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (listRef.current) ro.observe(listRef.current);
    return () => ro.disconnect();
  }, []);

  const lane = {
    top: rail.top - PAD,
    height: rail.height + PAD * 2,
    maskImage: rail.mask,
    WebkitMaskImage: rail.mask,
  };

  return (
    <div ref={ref} className="relative hidden lg:block" style={{ height: `${100 + steps.length * 80}vh` }}>
      <div className="sticky top-0 flex h-screen items-center">
        <div className="relative mx-auto w-full max-w-[980px]">
          {/* track and fill, under the dots */}
          <div className="pointer-events-none absolute left-1/2 w-16 -translate-x-1/2" style={lane}>
            <div className="absolute left-1/2 w-px -translate-x-1/2 bg-th-line/70" style={{ top: PAD, height: rail.height }}>
              <motion.div className="absolute inset-x-0 top-0 bg-ac-1 shadow-[0_0_10px_rgb(var(--ac-1))]" style={{ height: tipPct }} />
            </div>
          </div>

          <ol ref={listRef} className="relative mx-auto flex max-w-[520px] flex-col items-center gap-14">
            {steps.map((s, i) => {
              const active = i === step;
              const passed = i < step;
              return (
                <li key={s.n} className="flex flex-col items-center gap-5">
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
                  <div ref={(el) => (textRefs.current[i] = el)}>
                    <StepText i={i} active={active} center />
                  </div>
                </li>
              );
            })}
          </ol>

          {/* the packet riding the tip, over everything */}
          <div className="pointer-events-none absolute left-1/2 w-16 -translate-x-1/2" style={lane}>
            <div className="absolute left-1/2 w-px" style={{ top: PAD, height: rail.height }}>
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
