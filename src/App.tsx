import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Suspense, lazy } from "react";
import Home from "./pages/RelayPreview";

const About = lazy(() => import("./pages/RelayAbout"));
const Careers = lazy(() => import("./pages/RelayCareers"));
const Privacy = lazy(() => import("./pages/RelayPrivacy"));
const Terms = lazy(() => import("./pages/RelayTerms"));
const NotFound = lazy(() => import("./pages/RelayNotFound"));

/** links to the old /preview/relay/... addresses land on the page they meant */
const PreviewRedirect = () => {
  const { pathname, hash } = useLocation();
  const page = pathname.replace(/^\/preview\/relay\/?/, "").replace(/\/$/, "");
  const target = ["about", "careers", "privacy", "terms"].includes(page) ? `/${page}` : "/";
  return <Navigate to={`${target}${hash}`} replace />;
};

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/preview/relay/*" element={<PreviewRedirect />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
