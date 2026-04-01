"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
}

interface SparklesProps {
  text?: string;
  className?: string;
  particleCount?: number;
  particleColor?: string;
  textClassName?: string;
}

export const SparklesSection = ({
  text = "petaron",
  className = "",
  particleCount = 50,
  particleColor = "#22d3ee",
  textClassName = "",
}: SparklesProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generated: Particle[] = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.7 + 0.3,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 4,
    }));
    setParticles(generated);
  }, [particleCount]);

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center overflow-hidden bg-th-page py-20 ${className}`}
    >
      <div className="pointer-events-none absolute inset-0">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              backgroundColor: particleColor,
            }}
            animate={{
              opacity: [0, p.opacity, 0],
              scale: [0, 1, 0],
              y: [0, -20, -40],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      <h2
        className={`relative z-10 text-6xl font-serif font-normal tracking-tight text-th-heading/[0.06] md:text-8xl lg:text-9xl select-none ${textClassName}`}
      >
        {text}
      </h2>
    </div>
  );
};
