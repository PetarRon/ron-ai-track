import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Footer } from "@/components/petaron/Footer";
import { PageShell } from "@/components/petaron/PageShell";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <PageShell>
      <div className="relative z-10 mx-auto flex min-h-[60vh] w-full max-w-[900px] flex-col items-center justify-center px-5 py-20 text-center md:px-8">
        <h1 className="text-6xl font-serif font-normal text-th-heading md:text-8xl">404</h1>
        <p className="mt-4 text-lg text-th-body">This page does not exist.</p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center justify-center rounded-full border border-th-line bg-th-surface-alt/50 px-7 py-3 text-[13px] font-semibold text-th-heading transition hover:bg-th-line/50"
        >
          Return to home
        </Link>
      </div>
      <Footer />
    </PageShell>
  );
};

export default NotFound;
