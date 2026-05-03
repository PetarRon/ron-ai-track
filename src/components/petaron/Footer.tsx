import { Link } from "react-router-dom";

const footerLinks = {
  Product: [
    { label: "How It Works", href: "/#process-flow" },
    { label: "Platform", href: "/#platform" },
    { label: "Cost Calculator", href: "/#cost-calculator" },
    { label: "FAQ", href: "/#faq" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Careers", href: "/careers" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export const Footer = () => (
  <footer className="relative z-10 border-t border-th-line bg-th-page">
    <div className="mx-auto w-full max-w-[1300px] px-5 py-12 md:px-8">
      <div className="grid grid-cols-2 gap-8 md:grid-cols-4 mb-10">
        <div className="col-span-2 md:col-span-1">
          <Link to="/" className="flex items-center gap-2 mb-3" aria-label="Petaron home">
            <img src="/petaron_logo.svg" alt="" className="h-6 w-6" />
            <span className="text-sm font-bold tracking-wide text-th-heading">Petaron.ai</span>
          </Link>
          <p className="text-xs text-th-muted leading-relaxed max-w-xs">
            AI-powered order processing for freight forwarders. From email to TMS.
          </p>
        </div>

        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title}>
            <h4 className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-th-body">{title}</h4>
            <ul className="space-y-1">
              {links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="inline-flex min-h-[36px] items-center text-xs text-th-muted hover:text-th-heading transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-th-line pt-6 flex flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="text-[10px] text-th-faint">
          &copy; {new Date().getFullYear()} Petaron AI. All rights reserved.
        </p>
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-ac-pos/50 border border-ac-pos/20 rounded-full px-2.5 py-0.5">EU-hosted</span>
          <span className="text-[10px] text-ac-1/50 border border-ac-1/20 rounded-full px-2.5 py-0.5">GDPR compliant</span>
        </div>
      </div>
    </div>
  </footer>
);
