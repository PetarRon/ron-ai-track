import { useEffect, useRef } from "react";

/**
 * The page's backdrop: a night sky. A sparse field of tiny stars in three
 * depths that drift a little as you scroll, a few twinkling; now and then a
 * shooting star, a hairline streak like the pulses elsewhere on the page; and
 * one or two satellites crossing slowly with a faint blink. Fixed behind
 * everything; 30 fps, paused in hidden tabs, only the still stars under
 * reduced motion.
 */

type Star = { x: number; y: number; r: number; a: number; depth: number; tw: number; phase: number; tint: string };
type Meteor = { x: number; y: number; vx: number; vy: number; len: number; age: number; life: number };
type Satellite = { x: number; y: number; vx: number; vy: number; tint: string; phase: number };

const FRAME_MS = 1000 / 30;
const WHITE = "240, 241, 236";
const LIME = "199, 242, 60";
const TEAL = "120, 200, 210";

const rand = (a: number, b: number) => a + Math.random() * (b - a);

function makeStars(w: number, h: number): Star[] {
  const n = Math.round((w * h) / 8000);
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
      tint: roll < 0.08 ? LIME : roll < 0.16 ? TEAL : WHITE,
    };
  });
}

/** a shooting star: starts high, falls across at a shallow angle, gone in about a second */
function makeMeteor(w: number, h: number): Meteor {
  const right = Math.random() < 0.5;
  const angle = rand(0.12, 0.32) * Math.PI;
  const speed = rand(900, 1300);
  return {
    x: rand(0.1, 0.9) * w,
    y: rand(0.04, 0.5) * h,
    vx: Math.cos(angle) * speed * (right ? 1 : -1),
    vy: Math.sin(angle) * speed,
    len: rand(110, 190),
    age: 0,
    life: rand(0.7, 1.1),
  };
}

/** a satellite: enters at one side, crosses in half a minute or so, leaves at the other */
function makeSatellite(w: number, h: number): Satellite {
  const right = Math.random() < 0.5;
  const crossing = rand(28, 48);
  return {
    x: right ? -10 : w + 10,
    y: rand(0.08, 0.85) * h,
    vx: ((w + 20) / crossing) * (right ? 1 : -1),
    vy: rand(-0.12, 0.12) * (h / crossing),
    tint: Math.random() < 0.35 ? LIME : WHITE,
    phase: Math.random() * 3,
  };
}

export const Starfield = () => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let stars: Star[] = [];
    let meteors: Meteor[] = [];
    let satellites: Satellite[] = [];
    let nextMeteor = 1.5;
    let raf = 0;
    let last = 0;
    let prev = performance.now();
    const start = prev;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = makeStars(w, h);
      if (!satellites.length) {
        // one already on its way when the page opens
        const s = makeSatellite(w, h);
        s.x = s.vx > 0 ? w * 0.3 : w * 0.7;
        satellites = [s];
      }
    };

    const draw = (now: number) => {
      const t = (now - start) / 1000;
      const dt = Math.min(0.1, (now - prev) / 1000);
      prev = now;
      const sy = window.scrollY;
      ctx.clearRect(0, 0, w, h);

      // the stars, each depth drifting up at its own pace as the page scrolls
      for (const s of stars) {
        const y = (((s.y * h - sy * s.depth) % h) + h) % h;
        const twinkle = s.tw ? 1 - s.tw * (0.5 + 0.5 * Math.sin(t * 0.9 + s.phase)) : 1;
        ctx.fillStyle = `rgba(${s.tint}, ${s.a * twinkle})`;
        ctx.beginPath();
        ctx.arc(s.x * w, y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      if (reduced) return;

      // satellites: a steady dot with a short flash every couple of seconds
      if (satellites.length < 2 && Math.random() < dt / 14) satellites.push(makeSatellite(w, h));
      satellites = satellites.filter((s) => s.x > -20 && s.x < w + 20);
      for (const s of satellites) {
        s.x += s.vx * dt;
        s.y += s.vy * dt;
        const flash = (t + s.phase) % 2.4 < 0.12 ? 1 : 0;
        ctx.fillStyle = `rgba(${s.tint}, ${0.55 + 0.4 * flash})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, 1 + 0.4 * flash, 0, Math.PI * 2);
        ctx.fill();
        if (flash) {
          const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, 7);
          g.addColorStop(0, `rgba(${s.tint}, 0.35)`);
          g.addColorStop(1, `rgba(${s.tint}, 0)`);
          ctx.fillStyle = g;
          ctx.fillRect(s.x - 7, s.y - 7, 14, 14);
        }
      }

      // shooting stars: a hairline that fades in, streaks, and fades out
      nextMeteor -= dt;
      if (nextMeteor <= 0) {
        meteors.push(makeMeteor(w, h));
        nextMeteor = rand(4.5, 9);
      }
      meteors = meteors.filter((m) => m.age < m.life);
      ctx.lineWidth = 1;
      ctx.lineCap = "round";
      for (const m of meteors) {
        m.age += dt;
        m.x += m.vx * dt;
        m.y += m.vy * dt;
        const k = m.age / m.life;
        const alpha = Math.min(1, k / 0.15) * Math.min(1, (1 - k) / 0.35);
        const speed = Math.hypot(m.vx, m.vy);
        const tx = m.x - (m.vx / speed) * m.len;
        const ty = m.y - (m.vy / speed) * m.len;
        const g = ctx.createLinearGradient(tx, ty, m.x, m.y);
        g.addColorStop(0, `rgba(${LIME}, 0)`);
        g.addColorStop(0.7, `rgba(${LIME}, ${0.35 * alpha})`);
        g.addColorStop(1, `rgba(245, 255, 220, ${0.95 * alpha})`);
        ctx.strokeStyle = g;
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(m.x, m.y);
        ctx.stroke();
        const head = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, 6);
        head.addColorStop(0, `rgba(245, 255, 220, ${0.45 * alpha})`);
        head.addColorStop(1, "rgba(245, 255, 220, 0)");
        ctx.fillStyle = head;
        ctx.fillRect(m.x - 6, m.y - 6, 12, 12);
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
      prev = performance.now();
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
