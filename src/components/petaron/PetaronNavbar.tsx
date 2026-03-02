import { useState, useEffect } from "react";
import { motion } from "framer-motion";

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
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
        <a href="#" className="font-display font-bold text-xl tracking-tight">
          Petaron<span className="text-primary">.ai</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-display font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#book-demo"
            className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-display font-semibold text-sm transition-all hover:shadow-[0_0_24px_hsl(175_85%_45%/0.3)] hover:scale-105"
          >
            Book a Demo
          </a>
        </div>
      </div>
    </nav>
  );
};

export default PetaronNavbar;
