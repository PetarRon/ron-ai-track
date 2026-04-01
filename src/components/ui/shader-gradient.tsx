"use client";

import { useEffect, useRef } from "react";

interface ShaderGradientProps {
  className?: string;
  speed?: number;
  colors?: { r: number; g: number; b: number }[];
}

export const ShaderGradient = ({
  className = "",
  speed = 0.06,
  colors = [
    { r: 24, g: 204, b: 252 },
    { r: 99, g: 68, b: 245 },
    { r: 174, g: 72, b: 255 },
  ],
}: ShaderGradientProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    const random = (t: number) =>
      (Math.cos(t) + Math.cos(t * 1.3 + 1.3) + Math.cos(t * 1.4 + 1.4)) / 3.0;

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      const lineCount = 8;
      const lineWidth = 0.0012;

      ctx.clearRect(0, 0, w, h);

      for (let l = 0; l < lineCount; l++) {
        const normalizedIndex = l / lineCount;
        const color = colors[l % colors.length];
        const alpha = 0.15 + normalizedIndex * 0.2;

        ctx.strokeStyle = `rgba(${color.r},${color.g},${color.b},${alpha})`;
        ctx.lineWidth = 1 + normalizedIndex * 2;
        ctx.beginPath();

        for (let x = 0; x < w; x += 3) {
          const nx = x / w;
          const horizontalFade = 1.0 - (Math.cos(nx * Math.PI * 2) * 0.5 + 0.5);
          const offset = random(l + nx * 0.5 + time * speed * (1 + normalizedIndex)) * 0.4;
          const yBase = random(nx * 2 + time * speed * 1.5) * horizontalFade * 0.3 + offset;
          const y = h * 0.5 + yBase * h * 0.4;

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.stroke();
      }

      time += 1;
      animationId = requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);
    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, [speed, colors]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
};
