import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";

type NavItem =
  | { label: string; type: "hash"; id: string }
  | { label: string; type: "route"; path: string };

const navItems: NavItem[] = [
  { id: "platform", label: "Platform", type: "hash" },
  { id: "process-flow", label: "How it Works", type: "hash" },
  { id: "cost-calculator", label: "Cost Calculator", type: "hash" },
  { path: "/about", label: "About", type: "route" },
  { path: "/careers", label: "Careers", type: "route" },
  { id: "faq", label: "FAQ", type: "hash" },
];

const SCROLL_HIDE_THRESHOLD = 80;

export const Header = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);
  const drawerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = lastY.current;
    lastY.current = y;
    if (y < SCROLL_HIDE_THRESHOLD) {
      setHidden(false);
      return;
    }
    if (y > prev + 4) setHidden(true);
    else if (y < prev - 4) setHidden(false);
  });

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(e.target as Node) &&
        !buttonRef.current?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  const renderNavItem = (item: NavItem, mobile: boolean) => {
    const className = mobile
      ? "flex min-h-[44px] items-center px-4 text-[15px] font-medium text-th-body hover:text-th-heading transition-colors"
      : "hover:text-th-heading transition-colors";

    if (item.type === "route") {
      return (
        <Link key={item.path} to={item.path} className={className}>
          {item.label}
        </Link>
      );
    }
    if (isHome) {
      return (
        <a key={item.id} href={`#${item.id}`} className={className}>
          {item.label}
        </a>
      );
    }
    return (
      <Link key={item.id} to={`/#${item.id}`} className={className}>
        {item.label}
      </Link>
    );
  };

  return (
    <motion.div
      className="sticky top-4 z-50"
      animate={{ y: hidden ? -110 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ type: "spring", stiffness: 280, damping: 30 }}
    >
      <header className="flex items-center rounded-full border border-th-line bg-th-page/60 pl-3 pr-2 sm:pl-4 sm:pr-3 py-2.5 backdrop-blur-xl shadow-2xl">
        <Link to="/" className="flex min-h-[44px] shrink-0 items-center gap-1.5" aria-label="Petaron home">
          <img src="/petaron_logo.svg" alt="" className="h-7 w-7" width={28} height={28} />
          <div className="text-sm font-bold tracking-wide text-th-heading whitespace-nowrap">
            Petaron<span className="hidden sm:inline text-th-muted font-normal text-[11px] ml-1">. AI Solutions</span>
          </div>
        </Link>
        <nav
          className="hidden md:flex flex-1 items-center justify-evenly px-4 text-[13px] font-medium text-th-body"
          aria-label="Primary"
        >
          {navItems.map((item) => renderNavItem(item, false))}
        </nav>
        <button
          ref={buttonRef}
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-nav-drawer"
          aria-label={open ? "Close menu" : "Open menu"}
          className="md:hidden ml-auto flex h-11 w-11 items-center justify-center rounded-full text-th-heading"
        >
          {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav-drawer"
            ref={drawerRef}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="md:hidden mt-2 rounded-2xl border border-th-line bg-th-page/95 backdrop-blur-xl shadow-2xl overflow-hidden"
          >
            <nav className="flex flex-col py-2" aria-label="Primary mobile">
              {navItems.map((item) => renderNavItem(item, true))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
