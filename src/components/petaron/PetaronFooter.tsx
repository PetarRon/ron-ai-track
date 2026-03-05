const footerLinks = {
  Product: [
    { label: "How It Works", href: "#how-it-works" },
    { label: "Results", href: "#results" },
    { label: "ROI Calculator", href: "#roi-calculator" },
    { label: "FAQ", href: "#faq" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Careers", href: "#" },
    { label: "LinkedIn", href: "#" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "GDPR", href: "#" },
  ],
};

const PetaronFooter = () => {
  return (
    <footer className="border-t border-border py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <span className="font-display font-bold text-lg block mb-3">
              Petaron<span className="text-primary">.ai</span>
            </span>
            <p className="text-sm text-muted-foreground leading-relaxed">
              AI-powered order processing for freight forwarders.
            </p>
            <a
              href="mailto:hello@petaron.ai"
              className="text-sm text-primary hover:underline mt-3 block"
            >
              hello@petaron.ai
            </a>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-display font-semibold text-sm text-foreground mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Petaron AI. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <span className="text-xs font-display font-medium text-muted-foreground px-3 py-1.5 rounded-full border border-border bg-secondary">
              🇪🇺 EU-hosted
            </span>
            <span className="text-xs font-display font-medium text-muted-foreground px-3 py-1.5 rounded-full border border-border bg-secondary">
              GDPR compliant
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PetaronFooter;
