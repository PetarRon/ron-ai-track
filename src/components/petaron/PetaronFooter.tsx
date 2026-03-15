const footerLinks = {
  Product: [
    { label: "How It Works", href: "#how-it-works" },
    { label: "Results", href: "#results" },
    { label: "ROI Calculator", href: "#roi-calculator" },
    { label: "FAQ", href: "#faq" },
  ],
  Company: [
    { label: "About", href: "#book-demo" },
    { label: "Careers", href: "#book-demo" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/petaron", external: true },
  ],
};

const legalItems = [
  { label: "Privacy Policy" },
  { label: "Terms of Service" },
  { label: "GDPR" },
];

const PetaronFooter = () => {
  return (
    <footer className="border-t border-border py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <span className="font-display font-bold text-lg block mb-3">
              PetaRon<span className="text-primary">.ai</span>
            </span>
            <a
              href="#book-demo"
              className="text-sm text-primary hover:underline mt-3 block"
            >
              Contact us
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
                      {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Legal column */}
          <div>
            <h4 className="font-display font-semibold text-sm text-foreground mb-4">Legal</h4>
            <ul className="space-y-2.5">
              {legalItems.map((item) => (
                <li key={item.label}>
                  <span className="text-sm text-muted-foreground">
                    {item.label} <span className="text-muted-foreground/50">(coming soon)</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} PetaRon AI. All rights reserved.
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
