import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const apps = [
  { code: "EM", name: "email" },
  { code: "PD", name: "pdf" },
  { code: "XL", name: "excel" },
  { code: "ER", name: "erp" },
  { code: "TM", name: "tms" },
  { code: "WA", name: "whatsapp" },
];

const Typewriter = ({ text, active }: { text: string; active: boolean }) => {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active || n >= text.length) return;
    const id = setTimeout(() => setN((v) => v + 1), 38);
    return () => clearTimeout(id);
  }, [active, n, text.length]);
  return (
    <span className="font-mono text-[13px] text-th-body">
      {text.slice(0, n)}
      <span className="ml-0.5 inline-block h-[1em] w-[7px] translate-y-[2px] animate-pulse bg-ac-1/80 align-baseline" />
    </span>
  );
};

// "arrives out of focus and settles": blur + rise on first view
const settle = {
  initial: { opacity: 0, y: 24, filter: "blur(14px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, margin: "-20% 0px" },
  transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] as const },
};

export const RelayIntegrations = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });

  return (
    <section id="how" className="relative">
      <div ref={ref} className="relative mx-auto w-full max-w-[1240px] px-6 py-28 md:px-8">
        <Typewriter text="connects to your inbox, your ERP, and to whatever comes next" active={inView} />

        {/* app row with the travelling dot */}
        <div className="relative mt-10 flex items-start overflow-hidden [mask-image:linear-gradient(to_right,black_55%,transparent_100%)]">
          {apps.map((a, i) => (
            <div key={a.code} className="flex items-start">
              <div className="flex w-14 flex-col items-start gap-5">
                <span
                  className={`grid h-14 w-14 place-items-center rounded-lg border font-mono text-[13px] ${
                    i === 0
                      ? "border-ac-1/60 bg-ac-1/15 text-ac-1 shadow-[0_0_24px_rgb(var(--ac-1)/0.25)]"
                      : "border-th-line bg-th-surface/70 text-th-muted"
                  }`}
                >
                  {a.code}
                </span>
                <span className="font-mono text-[13px] text-th-muted">{a.name}</span>
              </div>
              {i < apps.length - 1 && (
                <div className="relative mt-7 h-px w-[104px] border-t border-dotted border-th-line">
                  {i === 0 && (
                    <motion.span
                      className="absolute -top-[2.5px] h-[5px] w-[5px] rounded-full bg-ac-1 shadow-[0_0_10px_rgb(var(--ac-1))]"
                      animate={{ left: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: "linear", repeatDelay: 0.6 }}
                    />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* next block: eyebrow pill + headline that settles into focus */}
        <div className="mt-40 border-t border-th-line/50 pt-28">
          <motion.span
            {...settle}
            className="inline-flex items-center gap-2 rounded-full border border-th-line bg-th-surface/50 px-3.5 py-1.5 font-body text-[13px] text-th-body"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-ac-1" /> order intake
          </motion.span>
          <motion.h2
            {...settle}
            transition={{ ...settle.transition, delay: 0.15 }}
            className="mt-6 max-w-2xl font-body text-[36px] font-semibold leading-[1.05] tracking-[-0.03em] text-th-heading sm:text-[48px]"
          >
            Most of a dispatcher&apos;s day is retyping what a customer already wrote.
          </motion.h2>
          <motion.div {...settle} transition={{ ...settle.transition, delay: 0.3 }} className="mt-10 h-px w-52 bg-th-line" />
          <motion.p
            {...settle}
            transition={{ ...settle.transition, delay: 0.4 }}
            className="mt-8 max-w-lg font-body text-[16px] leading-relaxed text-th-body"
          >
            Orders arrive as emails, PDFs and spreadsheets. Petaron turns each one into a clean, validated draft, and a
            person only steps in when a field needs a decision.
          </motion.p>
        </div>
      </div>
    </section>
  );
};
