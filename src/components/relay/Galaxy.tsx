import { useEffect, useRef } from "react";

/**
 * The page's backdrop: deep space. A sparse field of tiny stars in three
 * depths that drift a little as you scroll, and one far-off spiral galaxy,
 * tilted, turning very slowly and easing up the screen as you move down
 * the page. Fixed behind everything; 30 fps, paused in hidden
 * tabs, a still frame under reduced motion.
 */

type Star = { x: number; y: number; r: number; a: number; depth: number; tw: number; phase: number; tint: string };

const FRAME_MS = 1000 / 30;
const LIME = "199, 242, 60";
const TEAL = "120, 200, 210";

const gauss = () => {
  const u = 1 - Math.random();
  const v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
};

function makeStars(w: number, h: number): Star[] {
  const n = Math.round((w * h) / 8500);
  return Array.from({ length: n }, () => {
    const roll = Math.random();
    return {
      x: Math.random(),
      y: Math.random(),
      r: Math.random() < 0.92 ? 0.3 + Math.random() * 0.6 : 0.9 + Math.random() * 0.5,
      a: 0.15 + Math.random() * 0.55,
      depth: [0.015, 0.04, 0.08][Math.floor(Math.random() * 3)],
      tw: Math.random() < 0.2 ? 0.35 + Math.random() * 0.4 : 0,
      phase: Math.random() * Math.PI * 2,
      tint: roll < 0.08 ? LIME : roll < 0.16 ? TEAL : "240, 241, 236",
    };
  });
}

/** a face-on spiral galaxy, drawn once into its own canvas */
function makeGalaxy(size: number) {
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const g = c.getContext("2d");
  if (!g) return c;
  const R = size / 2;
  g.translate(R, R);

  const halo = g.createRadialGradient(0, 0, 0, 0, 0, R);
  halo.addColorStop(0, `rgba(${LIME}, 0.12)`);
  halo.addColorStop(0.3, `rgba(${TEAL}, 0.04)`);
  halo.addColorStop(1, `rgba(${TEAL}, 0)`);
  g.fillStyle = halo;
  g.fillRect(-R, -R, size, size);

  g.globalCompositeOperation = "lighter";
  // a soft haze along the arms first, so they read as clouds of light
  const armPoint = (arm: number, t: number, scatter: number) => {
    const angle = arm * Math.PI + t * 4.4 + gauss() * scatter * (1 - t * 0.4);
    const r = t * R * 0.9 + gauss() * R * 0.025;
    return [Math.cos(angle) * r, Math.sin(angle) * r];
  };
  for (let i = 0; i < 700; i++) {
    const t = 0.08 + Math.pow(Math.random(), 0.8) * 0.9;
    const [x, y] = armPoint(i % 2, t, 0.22);
    const rr = R * (0.03 + Math.random() * 0.05);
    const haze = g.createRadialGradient(x, y, 0, x, y, rr);
    haze.addColorStop(0, `rgba(${Math.random() < 0.5 ? LIME : TEAL}, ${0.05 * (1 - t * 0.6)})`);
    haze.addColorStop(1, "rgba(0, 0, 0, 0)");
    g.fillStyle = haze;
    g.fillRect(x - rr, y - rr, rr * 2, rr * 2);
  }
  g.filter = "blur(0.5px)";
  for (let i = 0; i < 6000; i++) {
    const arm = i % 2;
    const t = Math.pow(Math.random(), 0.75);
    const [x, y] = armPoint(arm, t, 0.32);
    const s = 0.5 + Math.random() * 1.1;
    const col = t < 0.14 ? "255, 248, 225" : Math.random() < 0.55 ? LIME : TEAL;
    g.fillStyle = `rgba(${col}, ${(0.12 + (1 - t) * 0.45) * (0.5 + Math.random() * 0.5)})`;
    g.fillRect(x, y, s, s);
  }
  g.filter = "none";

  const core = g.createRadialGradient(0, 0, 0, 0, 0, R * 0.2);
  core.addColorStop(0, "rgba(255, 250, 235, 0.8)");
  core.addColorStop(0.3, "rgba(240, 240, 210, 0.28)");
  core.addColorStop(1, `rgba(${LIME}, 0)`);
  g.fillStyle = core;
  g.fillRect(-R * 0.2, -R * 0.2, R * 0.4, R * 0.4);
  return c;
}

export const Galaxy = () => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const galaxy = makeGalaxy(560);
    let w = 0;
    let h = 0;
    let stars: Star[] = [];
    let raf = 0;
    let last = 0;
    const start = performance.now();

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = makeStars(w, h);
    };

    const draw = (now: number) => {
      const t = (now - start) / 1000;
      const sy = window.scrollY;
      const max = Math.max(1, document.documentElement.scrollHeight - h);
      const p = Math.min(1, sy / max);
      ctx.clearRect(0, 0, w, h);

      // the galaxy: low and left of centre at the top of the page, in the open
      // band under the hero, easing right and up the screen by the end
      const d = Math.min(w, h) * (w < 640 ? 0.95 : 0.8);
      const gx = w * (w < 640 ? 0.5 : 0.4 + 0.22 * p);
      const gy = h * (0.76 - 0.36 * p);
      ctx.save();
      ctx.globalAlpha = 0.75;
      ctx.globalCompositeOperation = "lighter";
      ctx.translate(gx, gy);
      ctx.rotate(-0.38);
      ctx.scale(1, 0.45);
      ctx.rotate(t * 0.012 + sy * 0.00012);
      ctx.drawImage(galaxy, -d / 2, -d / 2, d, d);
      ctx.restore();

      // the stars, each depth drifting up at its own pace as the page scrolls
      for (const s of stars) {
        const y = (((s.y * h - sy * s.depth) % h) + h) % h;
        const twinkle = s.tw ? 1 - s.tw * (0.5 + 0.5 * Math.sin(t * 0.9 + s.phase)) : 1;
        ctx.fillStyle = `rgba(${s.tint}, ${s.a * twinkle})`;
        ctx.beginPath();
        ctx.arc(s.x * w, y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = (now: number) => {
      if (now - last >= FRAME_MS) {
        last = now;
        draw(now);
      }
      raf = requestAnimationFrame(loop);
    };
    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden && !reduced) raf = requestAnimationFrame(loop);
    };
    const onStill = () => draw(performance.now());

    resize();
    draw(performance.now());
    window.addEventListener("resize", resize);
    if (reduced) {
      window.addEventListener("resize", onStill);
      window.addEventListener("scroll", onStill, { passive: true });
    } else {
      document.addEventListener("visibilitychange", onVisibility);
      raf = requestAnimationFrame(loop);
    }
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("resize", onStill);
      window.removeEventListener("scroll", onStill);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-0 h-full w-full" />;
};
