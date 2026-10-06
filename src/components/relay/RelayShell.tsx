import { type ReactNode, useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { getCalApi } from "@calcom/embed-react";
import ContactForm from "@/components/petaron/FinalCTA";
import { ContactContext } from "@/components/petaron/contact-context";
import { LightStream } from "./LightStream";

/**
 * Page chrome for the Relay direction: dark token scope, the fixed stream of
 * light behind everything, Cal.com init, contact modal, hash scrolling.
 */
export const RelayShell = ({ title, children }: { title: string; children: ReactNode }) => {
  const location = useLocation();
  const [contactOpen, setContactOpen] = useState(false);
  const openContact = useCallback(() => setContactOpen(true), []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const cal = await getCalApi({ namespace: "30min" });
      if (cancelled) return;
      cal("ui", {
        cssVarsPerTheme: { light: { "cal-brand": "#000000" }, dark: { "cal-brand": "#c7f23c" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Scroll to the hash target once the (lazy) page has rendered; top otherwise.
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }
    const id = location.hash.slice(1);
    const go = () => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    const t = setTimeout(go, 120);
    return () => clearTimeout(t);
  }, [location.pathname, location.hash]);

  return (
    <ContactContext.Provider value={{ openContact }}>
      <div className="relay min-h-screen bg-th-page text-th-heading">
        <Helmet>
          <title>{title}</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <LightStream className="z-0" />
        <div className="relative z-10">{children}</div>
        <ContactForm open={contactOpen} onClose={() => setContactOpen(false)} />
      </div>
    </ContactContext.Provider>
  );
};
