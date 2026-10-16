import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { Play } from "lucide-react";
import { useContact } from "@/components/petaron/contact-context";
import { CalButton, Em, RELAY_SHELL, buttonVariants } from "./shared";

/**
 * The one ask, ahead of the FAQ: the panel opens out from a small square as
 * you scroll to it, then the booking appears on it. Nothing pins; the page
 * scrolls on as normal.
 */
const SPRING = { stiffness: 80, damping: 24, mass: 0.4 };

export const RelayCTA = () => {
  const { openContact } = useContact();
  const ref = useRef<HTMLDivElement>(null);
  const still = useReducedMotion();

  // from the panel's top entering the screen until it is a quarter of the way down
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.25"] });
  const open = useSpring(scrollYProgress, SPRING);
  const scale = useTransform(open, [0, 0.8], [0.1, 1]);
  const radius = useTransform(open, [0, 0.8], [96, 28]);
  const text = useTransform(open, [0.6, 0.95], [0, 1]);
  const textY = useTransform(open, [0.6, 0.95], [16, 0]);

  return (
    <section id="demo" className={`relative scroll-mt-24 py-20 ${RELAY_SHELL}`}>
      <div ref={ref} className="relative">
        <motion.div
          aria-hidden
          className="relay-panel absolute inset-0 bg-ac-1"
          style={still ? { borderRadius: 28 } : { scale, borderRadius: radius, transformOrigin: "50% 50%" }}
        />
        <motion.div
          className="relay-on-lime relative z-10 px-6 py-16 text-center md:px-12 md:py-20"
          style={still ? undefined : { opacity: text, y: textY }}
        >
          <h2 className="mx-auto max-w-2xl text-balance font-display text-[clamp(30px,4.4vw,48px)] font-semibold leading-[1.08] tracking-[-0.03em] text-th-page">
            Ready to automate your <Em dark>order entry</Em>?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl font-body text-[15px] leading-relaxed text-th-page/75">
            Book a 30-minute demo and see Petaron.ai run on your own orders. <br className="hidden md:block" />A free
            one-month pilot, and your TMS stays exactly as it is.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <CalButton variant="dark">Book a Demo for Free</CalButton>
            <button type="button" onClick={openContact} className={buttonVariants.onLime}>
              Get in Touch
            </button>
          </div>
          <Link
            to="/#how"
            className="mt-7 inline-flex items-center gap-2 font-body text-[13px] text-th-page/65 transition hover:text-th-page"
          >
            <Play className="h-3 w-3 fill-current" aria-hidden />
            Not sure yet? Watch it run first
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
