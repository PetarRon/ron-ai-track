import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { Mail } from "lucide-react";
import { Em, LogoMark, RELAY_SHELL, SectionIntro } from "./shared";
import { spine, tForY } from "./LightStream";
import { streamSignal } from "./streamSignal";

/**
 * How it works: three steps pinned on the left; on the right the light stream
 * itself is the diagram. Three nodes (inbox, agent, TMS) sit on the stream's
 * spine, and the bright packet on the stream slides from one node to the next
 * as the active step changes. Below lg the steps stack as plain text.
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

/** where each node sits, as a fraction of the pinned viewport's height */
const NODE_Y = [0.24, 0.5, 0.76];

const StepText = ({ i, active }: { i: number; active: boolean }) => (
  <div className={`transition-opacity duration-500 ${active ? "opacity-100" : "opacity-40"}`}>
    <span
      key={active ? "on" : "off"}
      className={`font-mono text-[12px] ${active ? "relay-flicker text-ac-1 [text-shadow:0_0_16px_rgb(var(--ac-1)/0.9)]" : "text-th-muted"}`}
    >
      {steps[i].n}
    </span>
    <h3 className="mt-2 font-display text-[24px] font-semibold leading-tight tracking-[-0.02em] text-th-heading">{steps[i].title}</h3>
    <p className="mt-2 max-w-sm font-body text-[14px] leading-relaxed text-th-body">{steps[i].body}</p>
  </div>
);

const NodeMark = ({ i, active }: { i: number; active: boolean }) => {
  if (i === 1) return <LogoMark size={30} />;
  return (
    <span
      className={`grid h-[30px] w-[30px] place-items-center rounded-lg border font-mono text-[11px] transition-colors duration-500 ${
        active ? "border-ac-1/70 bg-ac-1/15 text-ac-1" : "border-th-line bg-th-surface/80 text-th-muted"
      }`}
    >
      {i === 0 ? <Mail className="h-3.5 w-3.5" /> : "TM"}
    </span>
  );
};

const Pinned = () => {
  const ref = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [step, setStep] = useState(0);
  const [nodes, setNodes] = useState<{ x: number; y: number }[]>([]);
  const rail = useTransform(scrollYProgress, [0, 1], [0.04, 1]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setStep(Math.min(steps.length - 1, Math.floor(v * steps.length)));
  });

  // the nodes follow the stream's spine; the packet is asked to sit on the active one
  const stepRef = useRef(step);
  stepRef.current = step;
  useEffect(() => {
    let frame = 0;
    const place = () => {
      frame = 0;
      const r = ref.current?.getBoundingClientRect();
      const s = stickyRef.current?.getBoundingClientRect();
      if (!r || !s) return;
      const w = window.innerWidth;
      const H = Math.max(document.documentElement.scrollHeight, window.innerHeight);
      setNodes(
        NODE_Y.map((f) => {
          const vy = s.top + s.height * f;
          const p = spine(tForY(window.scrollY + vy, w, H), w, H);
          return { x: p.x - s.left, y: s.height * f };
        }),
      );
      const pinned = r.top <= 0 && r.bottom >= window.innerHeight;
      streamSignal.pulseOn = pinned;
      if (pinned) streamSignal.pulseY = window.scrollY + s.top + s.height * NODE_Y[stepRef.current];
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(place);
    };
    place();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
      streamSignal.pulseOn = false;
    };
  }, []);
  useEffect(() => {
    const s = stickyRef.current?.getBoundingClientRect();
    if (s && streamSignal.pulseOn) streamSignal.pulseY = window.scrollY + s.top + s.height * NODE_Y[step];
  }, [step]);

  return (
    <div ref={ref} className="relative hidden lg:block" style={{ height: `${100 + steps.length * 80}vh` }}>
      <div ref={stickyRef} className="sticky top-0 h-screen">
        <div className="grid h-full grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] items-center gap-16">
          <div className="relative pl-8">
            <div className="absolute inset-y-1 left-0 w-px bg-th-line/70" />
            <motion.div
              className="absolute left-0 top-1 w-px origin-top bg-ac-1 shadow-[0_0_10px_rgb(var(--ac-1))]"
              style={{ height: "calc(100% - 8px)", scaleY: rail }}
            />
            <ol className="space-y-10">
              {steps.map((s, i) => (
                <li key={s.n}>
                  <StepText i={i} active={i === step} />
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* the nodes, pinned to wherever the stream runs at their height */}
        {nodes.map((p, i) => {
          const active = i === step;
          return (
            <div
              key={steps[i].node.name}
              className="absolute flex items-center gap-3"
              style={{ left: p.x, top: p.y, transform: "translate(-15px, -50%)" }}
            >
              <span
                className={`absolute h-2 w-2 rounded-full transition-all duration-500 ${
                  active ? "bg-th-heading shadow-[0_0_18px_4px_rgb(var(--ac-1)/0.7)]" : "bg-ac-1/50"
                }`}
                style={{ left: 15, top: "50%", transform: "translate(-50%, -50%)" }}
              />
              <div className={`transition-opacity duration-500 ${active ? "opacity-100" : "opacity-45"}`} style={{ marginLeft: 22 }}>
                <div className="flex items-center gap-2.5">
                  <NodeMark i={i} active={active} />
                  <div>
                    <p className="font-mono text-[12px] text-th-heading">{steps[i].node.name}</p>
                    <p className="font-mono text-[11px] text-th-muted">{steps[i].node.detail}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
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
    <div className="mt-16 space-y-14 pb-20 lg:hidden">
      {steps.map((_, i) => (
        <Stacked key={i} i={i} />
      ))}
    </div>
  </section>
);
