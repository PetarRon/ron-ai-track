import { type ReactNode, useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getCalApi } from "@calcom/embed-react";
import ContactForm from "@/components/petaron/FinalCTA";
import { ContactContext } from "@/components/petaron/contact-context";
import { SEO } from "@/components/petaron/SEO";
import type { RouteSeo } from "@/lib/seo";

const RELAY_PAGE = "#070806"; // --th-page inside .relay
const RELAY_PAGE_LIGHT = "#f7f7f4"; // --th-page inside .relay.relay-light

// anchors of the previous site, still in emails and posts, and where they live now
const HASH_ALIASES: Record<string, string> = {
  "process-flow": "how",
  "chaos-to-order": "process",
  "cost-calculator": "calculator",
  booking: "demo",
  results: "pilot",
};

/**
 * Page chrome for every page of the site: the token scope (light, or the older
 * dark variant), title and search tags, Cal.com init, the contact modal (also
 * opened by `?contact=1` or `#contact`), and hash scrolling, with the previous
 * site's anchors mapped onto the new sections.
 */
export const RelayShell = ({
  seo,
  light = false,
  children,
}: {
  seo: { route: RouteSeo; jsonLd?: object | object[]; noindex?: boolean };
  light?: boolean;
  children: ReactNode;
}) => {
  const location = useLocation();
  const [contactOpen, setContactOpen] = useState(false);
  const openContact = useCallback(() => setContactOpen(true), []);

  // The default beige sits on <html>/<body> and in the browser's theme colour;
  // it would show as a band at the top when scrolling past the edge or while the
  // page paints, and in a phone's address bar. Matched to the page while mounted.
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

  // ?contact=1 and #contact open the contact form, as on the previous site
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("contact") === "1" || location.hash === "#contact") setContactOpen(true);
  }, [location.search, location.hash]);

  // Scroll to the hash target once the (lazy) page has rendered; top otherwise.
  useEffect(() => {
    if (location.hash === "#contact") return;
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }
    const raw = location.hash.slice(1);
    const id = HASH_ALIASES[raw] ?? raw;
    const go = () => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    const t = setTimeout(go, 120);
    return () => clearTimeout(t);
  }, [location.pathname, location.hash]);

  return (
    <ContactContext.Provider value={{ openContact }}>
      <div className={`relay min-h-screen bg-th-page text-th-heading ${light ? "relay-light" : ""}`}>
        <SEO route={seo.route} jsonLd={seo.jsonLd} noindex={seo.noindex} />
        <div className="relative z-10">{children}</div>
        <ContactForm open={contactOpen} onClose={() => setContactOpen(false)} />
      </div>
    </ContactContext.Provider>
  );
};
