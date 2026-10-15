import { useEffect, useRef } from "react";

/**
 * The page's backdrop: black, with one low glow and a thin curved horizon near
 * the bottom of the screen, like dawn over the edge of the earth. Fixed behind
 * everything and drawn once per resize; the only motion is a slow breath in
 * CSS (`relay-horizon` in src/index.css), still under reduced motion.
 */
const PAGE = "#070806"; // --th-page inside .relay

export const Horizon = () => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const yH = h * 0.8; // where the horizon crests
      const R = Math.max(w * 1.3, 700); // the curve of the earth
      const cx = w / 2;
      const cy = yH + R;

      // the glow above the horizon: a wide, flat ellipse
      const spread = Math.max(w, h) * 0.62;
      ctx.save();
      ctx.translate(cx, yH);
      ctx.scale(1, 0.32);
      const g = ctx.createRadialGradient(0, 0, 0, 0, 0, spread);
      g.addColorStop(0, "rgba(199, 242, 60, 0.2)");
      g.addColorStop(0.5, "rgba(150, 190, 50, 0.07)");
      g.addColorStop(1, "rgba(199, 242, 60, 0)");
      ctx.fillStyle = g;
      ctx.fillRect(-spread, -spread, spread * 2, spread * 2);
      ctx.restore();

      // the earth itself, page-black, so nothing glows below the line
      ctx.fillStyle = PAGE;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fill();

      // the horizon: one hairline, brightest in the middle, gone at the sides
      const line = ctx.createLinearGradient(0, 0, w, 0);
      line.addColorStop(0, "rgba(199, 242, 60, 0)");
      line.addColorStop(0.5, "rgba(214, 250, 110, 0.75)");
      line.addColorStop(1, "rgba(199, 242, 60, 0)");
      const half = Math.asin(Math.min(1, w / 2 / R));
      ctx.strokeStyle = line;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, R, Math.PI * 1.5 - half, Math.PI * 1.5 + half);
      ctx.stroke();
    };

    draw();
    window.addEventListener("resize", draw);
    return () => window.removeEventListener("resize", draw);
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      <canvas ref={ref} className="relay-horizon absolute inset-0 h-full w-full" />
      <span className="relay-grain absolute inset-0" />
    </div>
  );
};
