import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Play } from "lucide-react";
import { useContact } from "@/components/petaron/contact-context";
import { CalButton, LogoMark, buttonVariants } from "./shared";
import { RelayHeroLoop } from "./RelayHeroLoop";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Product", href: "/#process" },
  { label: "How it works", href: "/#how" },
  { label: "Calculator", href: "/#calculator" },
  { label: "FAQ", href: "/#faq" },
  { label: "About", href: "/about" },
];

export const RelayNav = () => (
  <header className="relative z-20 mx-auto flex w-full max-w-[1240px] items-center justify-between px-6 py-5 md:px-8">
    <Link to="/" className="flex items-center gap-2.5">
      <LogoMark size={28} />
      <span className="font-body text-[17px] font-medium tracking-tight text-th-heading">Petaron</span>
    </Link>
    <nav className="hidden items-center gap-5 md:flex lg:gap-8">
      {navLinks.map((l) => (
        <Link
          key={l.label}
          to={l.href}
          // already on the page with no hash to change, the route would not move: scroll up by hand
          onClick={l.label === "Home" ? () => window.scrollTo({ top: 0, behavior: "smooth" }) : undefined}
          className="font-body text-[14px] text-th-body transition hover:text-th-heading"
        >
          {l.label}
        </Link>
      ))}
    </nav>
    <CalButton className="!px-5 !py-2.5">Book a Demo</CalButton>
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
  <section data-flow-head className="relative overflow-hidden">
    <RelayNav />
    <div className="relative mx-auto grid w-full max-w-[1240px] grid-cols-1 items-center gap-12 px-6 pb-14 pt-8 md:px-8 md:pb-28 md:pt-16 lg:grid-cols-[minmax(0,1fr)_620px] lg:pt-14">
      <div className="relative z-10">
        <h1 className="font-display text-[44px] font-semibold leading-[1.02] tracking-[-0.03em] text-th-heading sm:text-[56px] lg:text-[60px]">
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
        <motion.p {...rise(0.8)} className="mt-6 font-body text-[13px] text-th-muted">
          Runs on your own orders · Your TMS stays as it is
        </motion.p>
      </div>
      <div className="relative hidden lg:block">
        <TiltWindow />
      </div>
    </div>
  </section>
  );
};
