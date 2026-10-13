import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const apps = [
  { code: "EM", name: "email" },
  { code: "PD", name: "pdf" },
  { code: "SC", name: "scan" },
  { code: "XL", name: "excel" },
  { code: "DO", name: "word" },
  { code: "FW", name: "forwarded" },
  { code: "TM", name: "tms" },
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

export const RelayIntegrations = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });

  return (
    <section id="integrations" className="relative">
      <div ref={ref} className="relative mx-auto w-full max-w-[1240px] px-6 pb-16 pt-28 md:px-8">
        <Typewriter text="from your inbox to your TMS, one order at a time" active={inView} />

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

      </div>
    </section>
  );
};
