import { useRef, type ReactNode } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Em, LogoMark } from "./shared";

/**
 * The lime plate: opens out of the logo as you scroll in, then holds in the
 * upper part of the screen for a stretch of scrolling and finally scrolls on
 * with the page, whole. Nothing folds or fades; the next section (its
 * `children`, the calculator) follows after it.
 */
const SPRING = { stiffness: 80, damping: 24, mass: 0.4 };

export const RelayPlate = ({ children }: { children?: ReactNode }) => {
  const wrapRef = useRef<HTMLDivElement>(null);

  // from the plate's top entering the screen until it pins
  const { scrollYProgress: inRaw } = useScroll({ target: wrapRef, offset: ["start end", "start start"] });
  const pin = useSpring(inRaw, SPRING);

  const scale = useTransform(pin, [0, 0.75], [0.1, 1]);
  const radius = useTransform(pin, [0, 0.75], [96, 40]);
  const text = useTransform(pin, [0.55, 0.85], [0, 1]);
  const textY = useTransform(pin, [0.55, 0.85], [16, 0]);

  return (
    <>
      <div ref={wrapRef} className="relative pt-[9vh]">
        <div className="sticky top-[9vh] mx-auto w-full max-w-[1240px] px-6 md:px-8">
          <div className="relative flex h-[64vh] min-h-[420px] items-center justify-center">
            <motion.div
              className="absolute inset-0 bg-ac-1"
              style={{ scale, borderRadius: radius, transformOrigin: "50% 50%" }}
            />
            <motion.div className="relay-on-lime relative z-10 flex flex-col items-center px-6 text-center" style={{ opacity: text, y: textY }}>
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
        {/* the stretch of scrolling the plate holds still for */}
        <div aria-hidden className="h-[55vh]" />
      </div>
      {children}
    </>
  );
};
