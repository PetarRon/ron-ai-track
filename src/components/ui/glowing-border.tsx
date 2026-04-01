"use client";

import { type ReactNode } from "react";

interface GlowingBorderProps {
  children: ReactNode;
  className?: string;
  colors?: [string, string];
  blur?: number;
  borderWidth?: number;
  borderRadius?: number;
  speed?: string;
}

export const GlowingBorder = ({
  children,
  className = "",
  colors = ["#18CCFC", "#AE48FF"],
  blur = 14,
  borderWidth = 1,
  borderRadius = 28,
  speed = "3s",
}: GlowingBorderProps) => {
  const gradient = `conic-gradient(from var(--glow-angle) at 50% 50%, ${colors[0]}, ${colors[1]}, ${colors[0]})`;

  return (
    <>
      <style>{`
        @property --glow-angle {
          syntax: "<angle>";
          initial-value: 0deg;
          inherits: false;
        }
        @keyframes glowRotate {
          to { --glow-angle: 360deg; }
        }
      `}</style>
      <div
        className={`relative ${className}`}
        style={{ borderRadius, padding: borderWidth }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            borderRadius,
            background: gradient,
            animation: `glowRotate ${speed} linear infinite`,
            opacity: 0.85,
          }}
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            borderRadius,
            background: gradient,
            animation: `glowRotate ${speed} linear infinite`,
            filter: `blur(${blur}px)`,
            opacity: 0.5,
          }}
        />
        <div
          className="relative z-10 h-full w-full"
          style={{ borderRadius: borderRadius - borderWidth }}
        >
          {children}
        </div>
      </div>
    </>
  );
};
