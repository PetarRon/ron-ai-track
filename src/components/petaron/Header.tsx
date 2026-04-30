import { Link, useLocation } from "react-router-dom";

const navItems = [
  { id: "platform", label: "Platform", type: "hash" as const },
  { id: "process-flow", label: "How it Works", type: "hash" as const },
  { id: "cost-calculator", label: "Cost Calculator", type: "hash" as const },
  { path: "/about", label: "About", type: "route" as const },
  { path: "/careers", label: "Careers", type: "route" as const },
  { id: "faq", label: "FAQ", type: "hash" as const },
];

export const Header = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <header className="sticky top-4 z-50 flex items-center justify-between rounded-full border border-th-line bg-th-page/60 px-5 py-2.5 backdrop-blur-xl shadow-2xl">
      <Link to="/" className="flex items-center gap-2.5" aria-label="Petaron home">
        <img src="/petaron_logo.svg" alt="" className="h-7 w-7" />
        <div className="text-sm font-bold tracking-wide text-th-heading">
          Petaron<span className="text-th-muted font-normal text-[11px] ml-1">. AI Solutions</span>
        </div>
      </Link>
      <nav className="hidden md:flex items-center gap-7 text-[13px] font-medium text-th-body" aria-label="Primary">
        {navItems.map((item) => {
          if (item.type === "route") {
            return (
              <Link
                key={item.path}
                to={item.path}
                className="hover:text-th-heading transition-colors"
              >
                {item.label}
              </Link>
            );
          }
          if (isHome) {
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="hover:text-th-heading transition-colors"
              >
                {item.label}
              </a>
            );
          }
          return (
            <Link
              key={item.id}
              to={`/#${item.id}`}
              className="hover:text-th-heading transition-colors"
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
};
