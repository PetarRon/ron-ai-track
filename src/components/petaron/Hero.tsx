import { useEffect, useRef } from "react";
import {
  motion,
  type MotionStyle,
  type MotionValue,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { CTAButtons } from "./CTAButtons";
import { useContact } from "./contact-context";
import { useIsMobile } from "@/hooks/use-mobile";

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

  The section is a tall spacer with the visible hero sticky inside it, so the
  copy holds still for a while before it fades. That extra height is also what
  keeps the curtain off the text: the sticky pane releases at exactly the
  moment the curtain edge reaches the bottom of the viewport, so the two never
  overlap however slow the fade is.

  Phones keep a plain hero that scrolls away normally (same branch as
  prefers-reduced-motion): a multi-viewport hero reads as a stuck page on a
  small screen, and a fixed-height sticky pane would clip the CTAs on a short
  one.
*/

// Timing, as fractions of the pinned window (section height - one viewport).
// A long dead hold reads as a stuck page, so this one is just wide enough that
// a first nudge of the wheel does not dim anything; the lingering comes from
// the curve below instead.
const HOLD_END = 0.08;
const FADE_END = 1;

const clamp = (v: number) => Math.min(1, Math.max(0, v));

// Ease-in, so the copy holds near full strength through the early scroll and
// only drops away at the end. Linear made it feel like it left immediately.
const easeOut = (f: number) => f * f;

export const Hero = () => {
  const { openContact } = useContact();
  const reduce = useReducedMotion();
  const isMobile = useIsMobile();
  const still = reduce || isMobile;

  const ref = useRef<HTMLElement>(null);

  // How far the page scrolls while the hero pane stays pinned. Measured rather
  // than assumed so the timing below lands the same on any viewport height.
  const pinWindow = useRef(600);

  // 0 while the pane is pinned at the top, 1 once it releases.
  //
  // Driven from a plain scroll listener rather than useScroll(): framer-motion
  // maps useScroll-derived values onto a native ScrollTimeline, which in this
  // layout silently stops progressing (the same trap the .mh-fade comment
  // below works around). A hand-set MotionValue stays on the JS path.
  const pinned = useMotionValue(0);
  useEffect(() => {
    if (still) return;
    let frame = 0;
    const measure = () => {
      const height = ref.current?.offsetHeight || 1400;
      pinWindow.current = Math.max(1, height - window.innerHeight);
    };
    const update = () => {
      frame = 0;
      pinned.set(clamp(window.scrollY / pinWindow.current));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onResize = () => {
      measure();
      update();
    };
    measure();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [still, pinned]);

  // Hold, then fade.
  const faded = useTransform(pinned, (p) => clamp((p - HOLD_END) / (FADE_END - HOLD_END)));
  const copyY = useTransform(faded, (f) => -90 * f);
  const copyOpacity = useTransform(faded, (f) => 1 - easeOut(f));
  const auroraOpacity = useTransform(faded, (f) => 1 - 0.8 * easeOut(f));
  const photoY = useTransform(pinned, (p) => `${8 * p}%`);
  const photoScale = useTransform(pinned, (p) => 1.1 + 0.08 * p);

  // Opacity goes through a CSS variable (.mh-fade) rather than the `opacity`
  // style: framer-motion otherwise hands scroll-linked opacity to a native
  // ScrollTimeline animation that never progresses in this layout.
  const fade = (base: MotionStyle, opacity: MotionValue<number>): MotionStyle | undefined =>
    still ? undefined : ({ ...base, "--mh-o": opacity } as unknown as MotionStyle);

  return (
    <section
      ref={ref}
      aria-label="Introduction"
      className={`relative z-0 -mt-[90px] w-full bg-th-page ${still ? "" : "h-[150svh]"}`}
    >
      <div
        className={`${
          still
            ? // min-h, not a fixed h: a short phone has to be able to grow the
              // pane rather than clip the CTAs against overflow-hidden.
              "relative min-h-svh"
            : "sticky top-0 h-svh min-h-[640px]"
        } flex w-full flex-col items-center justify-center overflow-hidden px-5 pb-10 pt-[90px] text-center md:px-8`}
      >
      {/* Photo background with gentle parallax */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden will-change-transform"
        style={still ? undefined : { y: photoY, scale: photoScale }}
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

      {/* Ambient light. Split in two: the outer layer owns the scroll fade and
          the inner one the breathing loop -- a keyframe animating opacity
          outranks .mh-fade, so together they would never let the glow dim. */}
      <motion.div
        className="mh-fade pointer-events-none absolute left-1/2 top-1/2 z-0 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 will-change-[transform,opacity]"
        style={fade({}, auroraOpacity)}
        aria-hidden="true"
      >
        <div className="mh-aurora mh-breathe h-full w-full rounded-[50%] blur-[80px]" />
      </motion.div>

      {/* Copy */}
      <motion.div
        className="mh-fade relative z-10 mx-auto max-w-3xl will-change-transform"
        style={fade({ y: copyY }, copyOpacity)}
      >
        <h1 className="flex flex-col items-center gap-3 text-center font-serif text-[38px] font-normal tracking-tight text-th-heading sm:gap-4 sm:text-[40px] md:gap-5 md:text-[40px] lg:text-[44px]">
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
          className="mx-auto mt-5 max-w-2xl text-lg font-light leading-relaxed text-th-body sm:mt-6 md:text-lg"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          No more manual entry. Petaron.ai works side-by-side with your team, handling order intake, allowing your team to build stronger customer relationships.
        </motion.p>

        <motion.div
          className="mt-6 sm:mt-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <CTAButtons onContact={openContact} />
        </motion.div>
      </motion.div>
      </div>
    </section>
  );
};
