import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Em, LogoMark } from "./shared";

/**
 * The lime plate: opens out of the logo as you scroll in, holds one line,
 * and folds back as you scroll past.
 */
export const RelayPlate = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const p = useSpring(scrollYProgress, { stiffness: 80, damping: 24, mass: 0.4 });
  const scale = useTransform(p, [0, 0.35, 0.65, 1], [0.1, 1, 1, 0.1]);
  const radius = useTransform(p, [0, 0.35, 0.65, 1], [96, 40, 40, 96]);
  const text = useTransform(p, [0.28, 0.4, 0.6, 0.72], [0, 1, 1, 0]);
  const textY = useTransform(p, [0.28, 0.4, 0.6, 0.72], [16, 0, 0, -16]);

  return (
    <section ref={ref} className="relative py-6">
      <div className="mx-auto w-full max-w-[1240px] px-6 md:px-8">
        <div className="relative flex h-[64vh] min-h-[420px] items-center justify-center">
          <motion.div
            className="absolute inset-0 bg-ac-1"
            style={{ scale, borderRadius: radius, transformOrigin: "50% 50%" }}
          />
          <motion.div
            className="relative z-10 flex flex-col items-center px-6 text-center"
            style={{ opacity: text, y: textY }}
          >
            <span className="font-mono text-[12px] text-th-page/60">| what we actually sell</span>
            <h2 className="mt-5 max-w-3xl font-display text-[32px] font-semibold leading-[1.1] tracking-[-0.03em] text-th-page sm:text-[48px]">
              Your team runs the business.
              <span className="block">
                Let the AI agent handle the <Em dark>orders</Em>.
              </span>
            </h2>
            <div className="mt-10">
              <LogoMark size={56} inverse />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
