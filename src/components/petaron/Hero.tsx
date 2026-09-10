import { useEffect, useRef } from "react";
import {
  motion,
  type MotionStyle,
  type MotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { CTAButtons } from "./CTAButtons";
import { useContact } from "./contact-context";

const NBSP = String.fromCharCode(160);

const RevealText = ({ text, className = "" }: { text: string; className?: string }) => {
  const words = text.split(" ");

  return (
    <span className={`inline ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block">
          <motion.span
            className="inline-block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 ? NBSP : ""}
        </span>
      ))}
    </span>
  );
};

/*
  Motion hero: scroll curtain and ambient background adapted from 21st.dev "motion-footer".

  The section is sticky at the top of the page; everything after it scrolls
  over it like a curtain (see the opaque wrapper in pages/Petaron.tsx).
  While that happens the copy drifts up and fades.
*/
export const Hero = () => {
  const { openContact } = useContact();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  // 0 at the top of the page, 1 once one hero-height has scrolled past.
  // Driven from window scroll rather than a target: the section is sticky,
  // so its on-screen position never changes and target-based progress stalls.
  const heroHeight = useRef(800);
  useEffect(() => {
    const measure = () => {
      heroHeight.current = ref.current?.offsetHeight || 800;
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);
  const { scrollY } = useScroll();
  const scrollYProgress = useTransform(scrollY, (v) =>
    Math.min(1, Math.max(0, v / heroHeight.current)),
  );

  const copyY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const auroraOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.18]);

  // Opacity goes through a CSS variable (.mh-fade) rather than the `opacity`
  // style: framer-motion otherwise hands scroll-linked opacity to a native
  // ScrollTimeline animation that never progresses in this layout.
  const fade = (base: MotionStyle, opacity: MotionValue<number>): MotionStyle | undefined =>
    reduce ? undefined : ({ ...base, "--mh-o": opacity } as unknown as MotionStyle);

  return (
    <section
      ref={ref}
      aria-label="Introduction"
      className={`${reduce ? "relative" : "sticky"} top-0 z-0 -mt-[90px] flex h-svh min-h-[640px] w-full flex-col items-center justify-center overflow-hidden bg-th-page px-5 pt-[90px] text-center md:px-8`}
    >
      {/* Photo background with gentle parallax */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden will-change-transform"
        style={reduce ? undefined : { y: photoY, scale: photoScale }}
        aria-hidden="true"
      >
        <picture>
          <source srcSet="/hero-bg.avif" type="image/avif" />
          <source srcSet="/hero-bg.webp" type="image/webp" />
          <img
            src="/hero-bg.png"
            alt=""
            width={2400}
            height={1600}
            decoding="async"
            {...{ fetchpriority: "high" }}
            className="h-full w-full object-cover opacity-50"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-b from-th-page/30 via-th-page/50 to-th-page" />
      </motion.div>

      {/* Ambient light */}
      <motion.div
        className="mh-aurora mh-breathe mh-fade pointer-events-none absolute left-1/2 top-1/2 z-0 h-[60vh] w-[80vw] rounded-[50%] blur-[80px] will-change-[transform,opacity]"
        style={fade({}, auroraOpacity)}
        aria-hidden="true"
      />

      {/* Copy */}
      <motion.div
        className="mh-fade relative z-10 mx-auto max-w-3xl will-change-transform"
        style={fade({ y: copyY }, copyOpacity)}
      >
        <h1 className="flex flex-col items-center gap-4 text-center font-serif text-[38px] font-normal tracking-tight text-th-heading sm:text-[40px] md:gap-5 md:text-[40px] lg:text-[44px]">
          <span className="block w-full leading-[1.2] sm:leading-[1.25] [padding-block-end:0.05em]">
            <RevealText text="Order entry has never been this easy" />
          </span>
          <motion.span
            className="mx-auto block w-full max-w-2xl bg-gradient-to-r from-ac-hero-from via-ac-hero-via to-ac-hero-to box-decoration-clone bg-clip-text font-serif text-[26px] italic leading-[1.3] text-transparent [padding-block-end:0.1em] sm:text-[28px] md:text-[28px] lg:text-[34px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            The moment an order arrives
            <br />
            our AI agent gets to work
          </motion.span>
        </h1>

        <motion.p
          className="mx-auto mt-6 max-w-2xl text-lg font-light leading-relaxed text-th-body md:text-lg"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          No more manual entry. Petaron.ai works side-by-side with your team, handling order intake, allowing your team to build stronger customer relationships.
        </motion.p>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <CTAButtons onContact={openContact} />
        </motion.div>
      </motion.div>

    </section>
  );
};
