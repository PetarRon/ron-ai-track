"use client";

import { motion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

export const PETARON_SECTION_SHELL = "mx-auto w-full max-w-[1300px] px-5 md:px-8";

export const SectionBadge = ({ children, tone = "cyan" }: { children: ReactNode; tone?: "cyan" | "fuchsia" }) => {
  const toneClass =
    tone === "fuchsia"
      ? "border-ac-2/30 bg-ac-2/10 text-ac-2"
      : "border-ac-1/30 bg-ac-1/10 text-ac-1";

  return (
    <p className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-bold uppercase tracking-widest ${toneClass}`}>
      {children}
    </p>
  );
};

export const SectionHeading = ({
  badge,
  title,
  description,
  tone = "cyan",
  showBadge = false,
}: {
  badge?: ReactNode;
  title: string;
  description: string;
  tone?: "cyan" | "fuchsia";
  showBadge?: boolean;
}) => (
  <div className="text-center mb-12">
    {showBadge && badge && <SectionBadge tone={tone}>{badge}</SectionBadge>}
    <h3 className={`${showBadge ? "mt-5" : ""} text-2xl font-serif font-normal tracking-tight text-th-heading md:text-3xl`}>{title}</h3>
    <p className="mx-auto mt-2 max-w-2xl text-sm text-th-body">{description}</p>
  </div>
);

export const InteractiveHoverButton = ({
  href,
  children,
  onClick,
  ...rest
}: {
  href?: string;
  children: ReactNode;
  onClick?: () => void;
  [key: string]: unknown;
}) => {
  const Tag = href ? "a" : "button";
  const linkProps = href ? { href } : {};

  return (
    <Tag
      {...linkProps}
      onClick={onClick}
      className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-ac-1/50 bg-ac-1 px-7 py-3.5 text-[13px] font-bold text-white shadow-[0_0_24px_rgb(var(--ac-1)/0.35)] transition-all hover:shadow-[0_0_34px_rgb(var(--ac-1)/0.55)]"
      {...rest}
    >
      <span className="absolute left-[20%] top-[40%] h-2 w-2 scale-0 rounded-full bg-ac-3 transition-all duration-500 group-hover:left-0 group-hover:top-0 group-hover:h-full group-hover:w-full group-hover:scale-[1.8]" />
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      <span className="relative z-10 transition-colors duration-300 group-hover:text-white">{children}</span>
    </Tag>
  );
};

export const SpinningLogo = ({ size = 32 }: { size?: number }) => (
  <div
    className="relative rounded-full"
    style={{ width: size, height: size }}
  >
    <motion.div
      className="absolute inset-0 rounded-full"
      style={{
        background: "conic-gradient(from 0deg, rgb(var(--ac-1)), rgb(var(--ac-3)), rgb(var(--ac-2)), rgb(var(--ac-1)))",
      }}
      animate={{ rotate: 360 }}
      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
    />
    <div
      className="absolute rounded-full bg-th-page"
      style={{
        inset: size * 0.15,
      }}
    />
    <motion.div
      className="absolute rounded-full bg-white"
      style={{
        width: size * 0.2,
        height: size * 0.2,
        top: 0,
        left: "50%",
        marginLeft: -(size * 0.1),
        filter: `blur(${size * 0.08}px)`,
      }}
      animate={{ rotate: 360 }}
      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
    />
  </div>
);

export type GlowEffectProps = {
  className?: string;
  style?: CSSProperties;
  colors?: string[];
  mode?: "rotate" | "pulse" | "breathe" | "colorShift" | "flowHorizontal" | "static";
  blur?: "soft" | "medium" | "strong" | "stronger" | "none";
  scale?: number;
  duration?: number;
};

const glowBlurClass = {
  soft: "blur",
  medium: "blur-md",
  strong: "blur-lg",
  stronger: "blur-xl",
  none: "blur-none",
};

export const GlowEffect = ({
  className = "",
  style,
  colors = ["rgb(var(--ac-1))", "rgb(var(--ac-3))", "rgb(var(--ac-2))"],
  mode = "rotate",
  blur = "medium",
  scale = 1,
  duration = 6,
}: GlowEffectProps) => {
  const animations = {
    rotate: {
      background: [
        `conic-gradient(from 0deg at 50% 50%, ${colors.join(", ")})`,
        `conic-gradient(from 360deg at 50% 50%, ${colors.join(", ")})`,
      ],
    },
    pulse: {
      background: colors.map((color) => `radial-gradient(circle at 50% 50%, ${color} 0%, transparent 72%)`),
      scale: [scale, scale * 1.08, scale],
      opacity: [0.4, 0.75, 0.4],
    },
    breathe: {
      background: colors.map((color) => `radial-gradient(circle at 50% 50%, ${color} 0%, transparent 72%)`),
      scale: [scale, scale * 1.04, scale],
    },
    colorShift: {
      background: colors.map((color, index) => {
        const nextColor = colors[(index + 1) % colors.length];
        return `conic-gradient(from 0deg at 50% 50%, ${color} 0%, ${nextColor} 50%, ${color} 100%)`;
      }),
    },
    flowHorizontal: {
      background: colors.map((color, index) => {
        const nextColor = colors[(index + 1) % colors.length];
        return `linear-gradient(to right, ${color}, ${nextColor})`;
      }),
    },
    static: {
      background: `linear-gradient(to right, ${colors.join(", ")})`,
    },
  };

  return (
    <motion.div
      style={{ ...style, "--scale": scale } as CSSProperties}
      animate={animations[mode]}
      transition={{ repeat: Infinity, duration, ease: "linear" }}
      className={`pointer-events-none absolute inset-0 h-full w-full scale-[var(--scale)] transform-gpu ${glowBlurClass[blur]} ${className}`}
    />
  );
};

export const BackgroundBeams = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    {[0, 1, 2, 3].map((i) => (
      <motion.div
        key={i}
        className="absolute h-px w-[120%] bg-gradient-to-r from-transparent via-ac-1/35 to-transparent"
        style={{ top: `${20 + i * 18}%`, left: "-10%" }}
        animate={{ x: ["-8%", "8%", "-8%"], opacity: [0.35, 0.7, 0.35] }}
        transition={{ duration: 7 + i, repeat: Infinity, ease: "easeInOut" }}
      />
    ))}
  </div>
);
