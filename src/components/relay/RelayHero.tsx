import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Play } from "lucide-react";
import { useContact } from "@/components/petaron/contact-context";
import { CalButton, LogoMark, buttonVariants } from "./shared";
import { RelayHeroLoop } from "./RelayHeroLoop";

const navLinks = [
  { label: "Product", href: "/preview/relay#process" },
  { label: "How it works", href: "/preview/relay#how" },
  { label: "Calculator", href: "/preview/relay#calculator" },
  { label: "FAQ", href: "/preview/relay#faq" },
  { label: "About", href: "/preview/relay/about" },
];

export const RelayNav = () => (
  <header className="relative z-20 mx-auto flex w-full max-w-[1240px] items-center justify-between px-6 py-5 md:px-8">
    <Link to="/preview/relay" className="flex items-center gap-2.5">
      <LogoMark size={28} />
      <span className="font-body text-[17px] font-medium tracking-tight text-th-heading">Petaron</span>
    </Link>
    <nav className="hidden items-center gap-8 md:flex">
      {navLinks.map((l) => (
        <Link key={l.label} to={l.href} className="font-body text-[14px] text-th-body transition hover:text-th-heading">
          {l.label}
        </Link>
      ))}
    </nav>
    <div className="flex items-center gap-3">
      <span className="hidden items-center gap-2 rounded-full border border-th-line bg-th-surface/60 px-4 py-2 font-mono text-[12px] text-th-heading sm:flex">
        <span className="h-1.5 w-1.5 rounded-full bg-ac-1 shadow-[0_0_8px_rgb(var(--ac-1))]" />
        all systems normal
      </span>
      <CalButton className="!px-5 !py-2.5">Book a Demo</CalButton>
    </div>
  </header>
);

/* ---------- the tilted glass window: one order on a loop ---------- */

const TiltWindow = () => {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  // resting pose is tilted away like a pane of glass; the pointer nudges it
  const rotateY = useTransform(sx, [-1, 1], [-14, -4]);
  const rotateX = useTransform(sy, [-1, 1], [7, 1]);

  return (
    <div
      ref={ref}
      className="relative"
      style={{ perspective: 1400 }}
      onPointerMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
        my.set(((e.clientY - r.top) / r.height) * 2 - 1);
      }}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      <motion.div
        initial={{ opacity: 0, filter: "blur(16px)", y: 30 }}
        animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        transition={{ duration: 1.4, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ rotateY, rotateX, transformStyle: "preserve-3d" }}
      >
        <RelayHeroLoop />
      </motion.div>
    </div>
  );
};

/* ---------- hero ---------- */

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 18, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export const RelayHero = () => {
  const { openContact } = useContact();
  return (
  <section className="relative overflow-hidden">
    <RelayNav />
    <div className="relative mx-auto grid w-full max-w-[1240px] grid-cols-1 items-center gap-12 px-6 pb-28 pt-16 md:px-8 lg:grid-cols-[minmax(0,1fr)_620px] lg:pt-14">
      <div className="relative z-10">
        <motion.span
          {...rise(0.1)}
          className="inline-flex items-center gap-2 rounded-md border border-th-line bg-th-surface/50 px-3 py-1.5 font-mono text-[12px] text-th-heading"
        >
          <span className="h-1.5 w-1.5 rounded-sm bg-ac-1" />
          free one-month pilot / from email to TMS
        </motion.span>
        <h1 className="mt-7 font-display text-[44px] font-semibold leading-[1.02] tracking-[-0.03em] text-th-heading sm:text-[56px] lg:text-[60px]">
          <motion.span {...rise(0.2)} className="block">
            Automate your
          </motion.span>
          <motion.span
            {...rise(0.35)}
            className="block font-serif text-[48px] font-light tracking-[-0.03em] text-th-heading/90 sm:text-[62px] lg:text-[72px]"
          >
            order entry.
          </motion.span>
        </h1>
        <motion.p {...rise(0.5)} className="mt-7 max-w-md font-body text-[17px] leading-relaxed text-th-body">
          No more manual entry. The moment an order arrives, our AI agent gets to work, side by side with your team, from inbox to TMS.
        </motion.p>
        <motion.div {...rise(0.65)} className="mt-9 flex flex-wrap items-center gap-3">
          <CalButton>Book a Demo for Free</CalButton>
          <button type="button" onClick={openContact} className={buttonVariants.ghost}>
            <Play className="h-3 w-3 fill-current" /> Get in Touch
          </button>
        </motion.div>
        <motion.p {...rise(0.8)} className="mt-6 font-mono text-[12px] text-th-muted">
          runs on your own orders / no card / your TMS stays as it is
        </motion.p>
      </div>
      <div className="relative hidden lg:block">
        <div className="pointer-events-none absolute -inset-20 rounded-full bg-ac-1/10 blur-[120px]" aria-hidden />
        <TiltWindow />
      </div>
    </div>
  </section>
  );
};
