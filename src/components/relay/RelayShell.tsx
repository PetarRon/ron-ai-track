import { type ReactNode, useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { getCalApi } from "@calcom/embed-react";
import ContactForm from "@/components/petaron/FinalCTA";
import { ContactContext } from "@/components/petaron/contact-context";

const RELAY_PAGE = "#070806"; // --th-page inside .relay
const RELAY_PAGE_LIGHT = "#f7f7f4"; // --th-page inside .relay.relay-light

/**
 * Page chrome for the Relay direction: dark token scope on a plain black
 * page, Cal.com init, contact modal, hash scrolling.
 */
export const RelayShell = ({ title, light = false, children }: { title: string; light?: boolean; children: ReactNode }) => {
  const location = useLocation();
  const [contactOpen, setContactOpen] = useState(false);
  const openContact = useCallback(() => setContactOpen(true), []);

  // The live site's beige sits on <html>/<body> and in the browser's theme
  // colour. Here it would show as a light band at the top when scrolling past
  // the edge or while the page paints, and in a phone's address bar; so both go
  // dark while a Relay page is mounted and are restored when it leaves.
  useEffect(() => {
    const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    const prev = {
      meta: meta?.content,
      html: document.documentElement.style.backgroundColor,
      body: document.body.style.backgroundColor,
    };
    const page = light ? RELAY_PAGE_LIGHT : RELAY_PAGE;
    meta?.setAttribute("content", page);
    document.documentElement.style.backgroundColor = page;
    document.body.style.backgroundColor = page;
    return () => {
      if (meta && prev.meta) meta.setAttribute("content", prev.meta);
      document.documentElement.style.backgroundColor = prev.html;
      document.body.style.backgroundColor = prev.body;
    };
  }, [light]);

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
      <div className={`relay min-h-screen bg-th-page text-th-heading ${light ? "relay-light" : ""}`}>
        <Helmet>
          <title>{title}</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <div className="relative z-10">{children}</div>
        <ContactForm open={contactOpen} onClose={() => setContactOpen(false)} />
      </div>
    </ContactContext.Provider>
  );
};
