import type { ReactNode } from "react";
import { motion } from "framer-motion";

export const RELAY_SHELL = "mx-auto w-full max-w-[1240px] px-6 md:px-8";

/** "Arrives out of focus and settles": blur + rise on first view. */
export const settle = (delay = 0) => ({
  initial: { opacity: 0, y: 24, filter: "blur(14px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, margin: "-8% 0px" },
  transition: { duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export const Eyebrow = ({ children }: { children: ReactNode }) => (
  <span className="inline-flex items-center gap-2 rounded-full border border-th-line bg-th-surface/50 px-3.5 py-1.5 font-body text-[13px] text-th-body">
    <span className="h-1.5 w-1.5 rounded-full bg-ac-1" />
    {children}
  </span>
);

/** One light Plex word inside a grotesk headline: the title's second face, no italics. */
export const Em = ({ children, dark = false }: { children: ReactNode; dark?: boolean }) => (
  <em className={`font-serif font-light not-italic tracking-[-0.02em] ${dark ? "text-th-page/80" : "text-th-heading/80"}`}>
    {children}
  </em>
);

export const SectionIntro = ({ eyebrow, title, aside }: { eyebrow: string; title: ReactNode; aside: string }) => (
  <div className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-end">
    <div>
      <motion.div {...settle()}>
        <Eyebrow>{eyebrow}</Eyebrow>
      </motion.div>
      <motion.h2
        {...settle(0.1)}
        className="mt-6 font-display text-[34px] font-semibold leading-[1.08] tracking-[-0.03em] text-th-heading sm:text-[44px]"
      >
        {title}
      </motion.h2>
    </div>
    <motion.p {...settle(0.2)} className="max-w-md font-body text-[15px] leading-relaxed text-th-body lg:justify-self-end lg:pb-2">
      {aside}
    </motion.p>
  </div>
);

export const Card = ({ className = "", children }: { className?: string; children: ReactNode }) => (
  <div className={`relay-card relative rounded-2xl border border-th-line/80 bg-th-surface/85 ${className}`}>{children}</div>
);

const CAL_ATTRS = {
  "data-cal-namespace": "30min",
  "data-cal-link": "ron-lev-tabuchov-tgk0nx/30min",
  "data-cal-config": '{"layout":"month_view","useSlotsViewOnSmallScreen":"true","theme":"dark"}',
};

const BUTTON_BASE =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-body text-[14px] font-medium transition";

export const buttonVariants = {
  lime: `${BUTTON_BASE} bg-ac-1 text-th-page hover:brightness-110`,
  dark: `${BUTTON_BASE} bg-th-page text-th-heading hover:bg-th-surface`,
  ghost: `${BUTTON_BASE} border border-th-line bg-th-surface/50 text-th-heading hover:bg-th-surface`,
  /** outlined, for use on a lime panel: hover deepens the lime, never turns dark */
  onLime: `${BUTTON_BASE} border border-th-page/25 bg-transparent text-th-page hover:border-th-page/50 hover:bg-th-page/[0.06]`,
};

/** the booking buttons: no hover shade of their own, the dot does the hover (`.relay-hb` in src/index.css) */
const CAL_VARIANTS = {
  lime: `${BUTTON_BASE} relay-hb is-lime bg-ac-1 text-th-page`,
  dark: `${BUTTON_BASE} relay-hb is-dark bg-th-page text-th-heading`,
};

/**
 * Opens the Cal.com booking popup (initialised in RelayShell). On hover the dot
 * beside the label spreads to fill the button in the opposite colour while the
 * label slides out and a copy in that colour slides in.
 */
export const CalButton = ({
  children,
  variant = "lime",
  className = "",
}: {
  children: ReactNode;
  variant?: keyof typeof CAL_VARIANTS;
  className?: string;
}) => (
  <button type="button" {...CAL_ATTRS} className={`${CAL_VARIANTS[variant]} ${className}`}>
    <span aria-hidden className="relay-hb-dot" />
    <span className="relay-hb-label">{children}</span>
    <span aria-hidden className="relay-hb-over">
      {children}
    </span>
  </button>
);

/** Brand mark: lime square with the logo, as in the nav. */
export const LogoMark = ({ size = 28, inverse = false }: { size?: number; inverse?: boolean }) => (
  <span
    className={`grid place-items-center rounded-lg ${inverse ? "bg-th-page" : "bg-ac-1"}`}
    style={{ width: size, height: size }}
  >
    <img
      src="/petaron_logo.svg"
      alt=""
      className={inverse ? "relay-logo-lime" : "brightness-0"}
      style={{ width: size * 0.56, height: size * 0.56 }}
      width={size * 0.56}
      height={size * 0.56}
    />
  </span>
);
