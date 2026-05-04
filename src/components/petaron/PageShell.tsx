import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getCalApi } from "@calcom/embed-react";
import { Helmet } from "react-helmet-async";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import ContactForm from "./FinalCTA";
import { ContactContext } from "./contact-context";
import { Header } from "./Header";

const MouseTracker = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const x = useTransform(mouseX, (v) => v - 260);
  const y = useTransform(mouseY, (v) => v - 260);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[2] overflow-hidden" aria-hidden="true">
      <motion.div
        className="absolute h-[520px] w-[520px] rounded-full blur-[110px] opacity-55"
        style={{
          background:
            "radial-gradient(circle, rgb(var(--ac-1) / 0.14) 0%, rgb(var(--ac-2) / 0.05) 42%, transparent 72%)",
          x,
          y,
        }}
        transition={{ type: "spring", stiffness: 55, damping: 22, mass: 0.45 }}
      />
    </div>
  );
};

interface PageShellProps {
  children: ReactNode;
}

export const PageShell = ({ children }: PageShellProps) => {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.2 });
  const location = useLocation();
  const [contactOpen, setContactOpen] = useState(false);

  const initCal = useCallback(async () => {
    const cal = await getCalApi({ namespace: "30min" });
    cal("ui", {
      cssVarsPerTheme: {
        light: { "cal-brand": "#000000" },
        dark: { "cal-brand": "#fafafa" },
      },
      hideEventTypeDetails: false,
      layout: "month_view",
    });
  }, []);

  useEffect(() => {
    initCal();
  }, [initCal]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("contact") === "1" || location.hash === "#contact") {
      setContactOpen(true);
    }
  }, [location.hash, location.search]);

  useEffect(() => {
    if (!location.hash || location.hash === "#contact") return;
    const id = location.hash.slice(1);
    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return true;
      }
      return false;
    };
    if (tryScroll()) return;
    const t = setTimeout(tryScroll, 200);
    return () => clearTimeout(t);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (location.hash) return;
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname, location.hash]);

  const openContact = useCallback(() => setContactOpen(true), []);

  return (
    <ContactContext.Provider value={{ openContact }}>
      <Helmet>
        <html lang="en" />
        <script type="application/ld+json">
          {JSON.stringify(organizationJsonLd())}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(websiteJsonLd())}
        </script>
      </Helmet>
      <main className="relative min-h-screen overflow-hidden bg-th-page text-th-heading selection:bg-ac-1 selection:text-black">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-ac-1 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>

        <MouseTracker />
        <div className="noise-overlay z-10 pointer-events-none" aria-hidden="true" />
        <motion.div
          className="fixed left-0 top-0 z-[100] h-0.5 w-full origin-left bg-gradient-to-r from-ac-2 via-ac-3 to-ac-1"
          style={{ scaleX: progress }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10"
          aria-hidden="true"
        />

        <div className="relative mx-auto w-full max-w-[1300px] px-5 pt-5 md:px-8 md:pt-6 z-10">
          <Header />
        </div>

        <div id="content">{children}</div>

        <ContactForm open={contactOpen} onClose={() => setContactOpen(false)} />
      </main>
    </ContactContext.Provider>
  );
};
