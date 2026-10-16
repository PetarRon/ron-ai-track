import { Link } from "react-router-dom";
import { useContact } from "@/components/petaron/contact-context";
import { LogoMark, RELAY_SHELL } from "./shared";

const columns = {
  Product: [
    { label: "How it works", href: "/#process" },
    { label: "Cost calculator", href: "/#calculator" },
    { label: "FAQ", href: "/#faq" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Careers", href: "/careers" },
  ],
  Legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
};

export const RelayFooter = () => {
  const { openContact } = useContact();
  return (
    <footer className={`relative pb-10 pt-12 ${RELAY_SHELL}`}>
      <div className="grid grid-cols-2 gap-8 border-t border-th-line/60 pt-10 md:grid-cols-5">
        <div className="col-span-2">
          <div className="flex items-center gap-2">
            <LogoMark size={22} />
            <span className="font-body text-[14px] text-th-heading">Petaron Labs</span>
          </div>
          <p className="mt-3 max-w-xs font-body text-[13px] text-th-muted">
            AI-powered order processing for freight forwarders. From email to TMS.
          </p>
          <div className="mt-5 flex items-center gap-2">
            <a
              href="https://www.linkedin.com/company/petaron"
              target="_blank"
              rel="noreferrer"
              aria-label="Petaron on LinkedIn"
              className="grid h-7 w-7 place-items-center rounded-md border border-th-line bg-th-surface font-mono text-[10px] text-th-body transition hover:text-th-heading"
            >
              in
            </a>
            <button
              type="button"
              onClick={openContact}
              aria-label="Get in touch"
              className="grid h-7 w-7 place-items-center rounded-md border border-th-line bg-th-surface font-mono text-[10px] text-th-body transition hover:text-th-heading"
            >
              @
            </button>
            <span className="ml-3 font-mono text-[11px] text-th-muted">EU-hosted · GDPR compliant</span>
          </div>
        </div>
        {Object.entries(columns).map(([title, links]) => (
          <div key={title}>
            <h3 className="font-mono text-[11px] text-th-muted">{title}</h3>
            <ul className="mt-3 space-y-2">
              {links.map((l) => (
                <li key={l.label}>
                  <Link to={l.href} className="font-body text-[13px] text-th-body transition hover:text-th-heading">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mt-10 font-mono text-[11px] text-th-faint">&copy; {new Date().getFullYear()} Petaron AI. All rights reserved.</p>
    </footer>
  );
};
