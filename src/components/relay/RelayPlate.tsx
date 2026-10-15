import { useRef, type ReactNode } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Em, LogoMark } from "./shared";

/**
 * The lime plate: opens out of the logo as you scroll in, then stays pinned in
 * the middle of the screen while the next section (its `children`, the
 * calculator) scrolls up underneath it. As that section arrives the plate
 * folds away in place and fades out, so the calculator is uncovered where the
 * plate was instead of after a gap. The pinned layer never takes clicks, so the
 * calculator's sliders work through it once the plate has gone.
 */
const SPRING = { stiffness: 80, damping: 24, mass: 0.4 };

export const RelayPlate = ({ children }: { children?: ReactNode }) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const afterRef = useRef<HTMLDivElement>(null);

  // in: from the plate's top entering the screen until it pins
  const { scrollYProgress: inRaw } = useScroll({ target: wrapRef, offset: ["start end", "start start"] });
  // out: from the next section entering at the bottom until its top is a quarter down the screen
  const { scrollYProgress: outRaw } = useScroll({ target: afterRef, offset: ["start end", "start 25%"] });
  const pin = useSpring(inRaw, SPRING);
  const out = useSpring(outRaw, SPRING);

  const scaleIn = useTransform(pin, [0, 0.75], [0.1, 1]);
  const scaleOut = useTransform(out, [0.2, 0.8], [1, 0.1]);
  const scale = useTransform([scaleIn, scaleOut], ([a, b]: number[]) => Math.min(a, b));
  const radiusIn = useTransform(pin, [0, 0.75], [96, 40]);
  const radiusOut = useTransform(out, [0.2, 0.8], [40, 96]);
  const radius = useTransform([radiusIn, radiusOut], ([a, b]: number[]) => Math.max(a, b));
  const fade = useTransform(out, [0.6, 0.9], [1, 0]);

  const textIn = useTransform(pin, [0.55, 0.85], [0, 1]);
  const textOut = useTransform(out, [0.1, 0.3], [1, 0]);
  const text = useTransform([textIn, textOut], ([a, b]: number[]) => Math.min(a, b));
  const textYIn = useTransform(pin, [0.55, 0.85], [16, 0]);
  const textYOut = useTransform(out, [0.1, 0.3], [0, -16]);
  const textY = useTransform([textYIn, textYOut], ([a, b]: number[]) => a + b);

  return (
    <div ref={wrapRef} className="relative">
      <div className="pointer-events-none sticky top-0 z-10 flex h-screen items-center">
        <div className="mx-auto w-full max-w-[1240px] px-6 md:px-8">
          <div className="relative flex h-[64vh] min-h-[420px] items-center justify-center">
            <motion.div
              className="absolute inset-0 bg-ac-1"
              style={{ scale, borderRadius: radius, opacity: fade, transformOrigin: "50% 50%" }}
            />
            <motion.div
              className="relative z-10 flex flex-col items-center px-6 text-center"
              style={{ opacity: text, y: textY }}
            >
              <h2 className="max-w-3xl font-display text-[32px] font-semibold leading-[1.1] tracking-[-0.03em] text-th-page sm:text-[48px]">
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
      </div>
      <div ref={afterRef} className="relative">
        {children}
      </div>
    </div>
  );
};
