import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Play } from "lucide-react";

const navLinks = [
  { label: "Product", href: "#product" },
  { label: "How it works", href: "#how" },
  { label: "Customers", href: "#customers" },
  { label: "Pricing", href: "#pricing" },
];

export const RelayNav = () => (
  <header className="relative z-20 mx-auto flex w-full max-w-[1240px] items-center justify-between px-6 py-5 md:px-8">
    <Link to="/" className="flex items-center gap-2.5">
      <span className="grid h-7 w-7 place-items-center rounded-md bg-ac-1 text-th-page">
        <img src="/petaron_logo.svg" alt="" className="h-4 w-4 brightness-0" width={16} height={16} />
      </span>
      <span className="font-body text-[17px] font-medium tracking-tight text-th-heading">Petaron</span>
    </Link>
    <nav className="hidden items-center gap-8 md:flex">
      {navLinks.map((l) => (
        <a key={l.label} href={l.href} className="font-body text-[14px] text-th-body transition hover:text-th-heading">
          {l.label}
        </a>
      ))}
    </nav>
    <div className="flex items-center gap-3">
      <span className="hidden items-center gap-2 rounded-full border border-th-line bg-th-surface/60 px-4 py-2 font-mono text-[12px] text-th-heading sm:flex">
        <span className="h-1.5 w-1.5 rounded-full bg-ac-1 shadow-[0_0_8px_rgb(var(--ac-1))]" />
        all systems normal
      </span>
      <a
        href="#demo"
        className="rounded-full bg-ac-1 px-5 py-2.5 font-body text-[14px] font-medium text-th-page transition hover:brightness-110"
      >
        Book a demo
      </a>
    </div>
  </header>
);

/* ---------- the tilted glass workflow window ---------- */

const Node = ({
  x,
  y,
  title,
  sub,
  w = 176,
}: {
  x: number;
  y: number;
  title: string;
  sub: string;
  w?: number;
}) => (
  <div
    className="absolute rounded-xl border border-th-line bg-th-surface/90 px-4 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.45)]"
    style={{ left: x, top: y, width: w }}
  >
    <div className="font-body text-[14px] font-medium text-th-heading">{title}</div>
    <div className="mt-0.5 font-mono text-[11px] text-th-muted">{sub}</div>
  </div>
);

const WorkflowWindow = () => (
  <div className="relative h-[480px] w-[620px] rounded-2xl border border-th-line bg-th-surface/40 backdrop-blur-md">
    {/* header */}
    <div className="flex items-center gap-4 border-b border-th-line/70 px-7 py-5 font-mono text-[12px]">
      <span className="text-th-heading">Orders over 5000</span>
      <span className="h-3 w-px bg-th-line" />
      <span className="text-th-body">3 steps / 1 branch</span>
      <span className="ml-auto text-th-faint/60">run #4812</span>
    </div>
    {/* tool rail */}
    <div className="absolute left-7 top-[86px] flex flex-col gap-2">
      {["↖", "+", "↻"].map((g) => (
        <span
          key={g}
          className="grid h-7 w-7 place-items-center rounded-md border border-th-line bg-th-surface text-[12px] text-th-body"
        >
          {g}
        </span>
      ))}
    </div>
    <span className="absolute right-7 top-[86px] rounded-md border border-th-line bg-th-surface px-2.5 py-1 font-mono text-[11px] text-th-body">
      100%
    </span>

    {/* connectors */}
    <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 620 480" fill="none" aria-hidden>
      <path d="M -10 230 C 30 230, 50 170, 110 170" stroke="rgb(var(--ac-1))" strokeWidth="1.2" opacity="0.9" />
      <path d="M -10 230 C 30 230, 50 300, 110 300" stroke="rgb(var(--th-line))" strokeWidth="1.2" />
      <path d="M 290 170 C 330 170, 330 240, 370 240" stroke="rgb(var(--ac-1))" strokeWidth="1.2" opacity="0.9" />
      <path d="M 290 300 C 330 300, 330 240, 370 240" stroke="rgb(var(--th-line))" strokeWidth="1.2" />
      <circle cx="-10" cy="230" r="3" fill="rgb(var(--ac-1))" />
      <text x="56" y="192" fill="rgb(var(--th-muted))" fontFamily="var(--font-mono)" fontSize="11">
        true
      </text>
      <text x="56" y="286" fill="rgb(var(--th-muted))" fontFamily="var(--font-mono)" fontSize="11">
        else
      </text>
    </svg>

    {/* the first node hangs over the left edge like in the reference */}
    <div
      className="absolute left-[-96px] top-[204px] rounded-xl border border-th-line bg-th-surface/95 px-4 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.45)]"
      style={{ width: 160 }}
    >
      <div className="font-body text-[14px] font-medium text-th-heading">Order received</div>
      <div className="mt-0.5 font-mono text-[11px] text-th-muted">email</div>
    </div>
    <Node x={110} y={144} title="Amount over 5000" sub="condition" />
    <Node x={110} y={274} title="Push to ERP" sub="system" />
    <Node x={370} y={212} title="Ask sales" sub="waiting on a yes" w={156} />
    <span className="absolute left-[370px] top-[280px] flex items-center gap-1.5 rounded-md border border-th-line bg-th-surface px-2 py-1 font-mono text-[10px] text-th-body">
      <span className="h-1 w-1 rounded-full bg-ac-1" /> 26 min
    </span>

    {/* last runs */}
    <div className="absolute bottom-0 left-0 right-0 border-t border-th-line/60 px-7 py-5 font-mono text-[11px]">
      <div className="text-th-body">last runs</div>
      <div className="mt-2 flex items-center gap-4 text-th-muted">
        <span className="h-1 w-1 rounded-full bg-th-muted" />
        <span>08:41:02</span>
        <span>orders over 5000</span>
        <span className="ml-auto">129 ms</span>
      </div>
      <div className="mt-2 flex items-center gap-4 text-th-muted/50">
        <span className="h-1 w-1 rounded-full bg-th-muted/50" />
        <span>08:39:50</span>
        <span>weekly export</span>
        <span className="ml-auto">88 ms</span>
      </div>
    </div>
  </div>
);

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
        <WorkflowWindow />
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

export const RelayHero = () => (
  <section className="relative overflow-hidden">
    <div className="relay-dots pointer-events-none absolute inset-0" aria-hidden />
    <RelayNav />
    <div className="relative mx-auto grid w-full max-w-[1240px] grid-cols-1 items-center gap-12 px-6 pb-28 pt-16 md:px-8 lg:grid-cols-[minmax(0,1fr)_620px] lg:pt-24">
      <div className="relative z-10">
        <motion.span
          {...rise(0.1)}
          className="inline-flex items-center gap-2 rounded-md border border-th-line bg-th-surface/50 px-3 py-1.5 font-mono text-[12px] text-th-heading"
        >
          <span className="h-1.5 w-1.5 rounded-sm bg-ac-1" />
          open beta / 240 carriers connected
        </motion.span>
        <h1 className="mt-7 font-body text-[44px] font-semibold leading-[1.02] tracking-[-0.03em] text-th-heading sm:text-[56px] lg:text-[60px]">
          <motion.span {...rise(0.2)} className="block">
            Order entry runs
          </motion.span>
          <motion.span
            {...rise(0.35)}
            className="block font-serif text-[48px] font-normal italic tracking-[-0.02em] text-th-heading/90 sm:text-[62px] lg:text-[72px]"
          >
            itself.
          </motion.span>
        </h1>
        <motion.p {...rise(0.5)} className="mt-7 max-w-md font-body text-[17px] leading-relaxed text-th-body">
          Petaron reads every order that lands in your inbox and only pings a person when it matters.
        </motion.p>
        <motion.div {...rise(0.65)} className="mt-9 flex flex-wrap items-center gap-3">
          <a
            href="#demo"
            className="rounded-full bg-ac-1 px-6 py-3 font-body text-[14px] font-medium text-th-page transition hover:brightness-110"
          >
            Book a demo
          </a>
          <a
            href="#how"
            className="flex items-center gap-2 rounded-full border border-th-line bg-th-surface/50 px-6 py-3 font-body text-[14px] font-medium text-th-heading transition hover:bg-th-surface"
          >
            <Play className="h-3 w-3 fill-current" /> Watch an order, 2 minutes
          </a>
        </motion.div>
        <motion.p {...rise(0.8)} className="mt-6 font-mono text-[12px] text-th-muted">
          free pilot for 14 days /
        </motion.p>
      </div>
      <div className="relative hidden lg:block">
        <div className="pointer-events-none absolute -inset-20 rounded-full bg-ac-1/10 blur-[120px]" aria-hidden />
        <TiltWindow />
      </div>
    </div>
  </section>
);
