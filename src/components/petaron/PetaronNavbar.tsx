import { useState, useEffect } from "react";

const navLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Results", href: "#results" },
  { label: "Pricing", href: "#roi-calculator" },
  { label: "FAQ", href: "#faq" },
];

const PetaronNavbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4">
      <div
        className={`flex items-center justify-between gap-6 px-6 py-3 rounded-full border transition-all duration-300 max-w-3xl w-full ${
          scrolled
            ? "bg-card/95 backdrop-blur-xl border-border shadow-lg"
            : "bg-card/60 backdrop-blur-md border-border/50"
        }`}
      >
        {/* Logo */}
        <a href="#" className="font-display font-bold text-lg tracking-tight shrink-0">
          Petaron<span className="text-primary">.ai</span>
        </a>

        {/* Center links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-display font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#book-demo"
          className="bg-primary text-primary-foreground px-5 py-2 rounded-full font-display font-semibold text-sm transition-all hover:shadow-[0_0_24px_hsl(175_85%_45%/0.3)] hover:scale-105 shrink-0"
        >
          Book a Demo
        </a>
      </div>
    </nav>
  );
};

export default PetaronNavbar;
