import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Suspense, lazy } from "react";
import Petaron from "./pages/Petaron";

const About = lazy(() => import("./pages/About"));
const Careers = lazy(() => import("./pages/Careers"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const NotFound = lazy(() => import("./pages/NotFound"));
const RelayPreview = lazy(() => import("./pages/RelayPreview"));
const RelayAbout = lazy(() => import("./pages/RelayAbout"));
const RelayCareers = lazy(() => import("./pages/RelayCareers"));
const RelayPrivacy = lazy(() => import("./pages/RelayPrivacy"));
const RelayTerms = lazy(() => import("./pages/RelayTerms"));
const RelayNotFound = lazy(() => import("./pages/RelayNotFound"));

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
              <Route path="/" element={<Petaron />} />
              <Route path="/about" element={<About />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/preview/relay" element={<RelayPreview />} />
              <Route path="/preview/relay/light" element={<RelayPreview />} />
              <Route path="/preview/relay/dark" element={<RelayPreview dark />} />
              <Route path="/preview/relay/about" element={<RelayAbout />} />
              <Route path="/preview/relay/careers" element={<RelayCareers />} />
              <Route path="/preview/relay/privacy" element={<RelayPrivacy />} />
              <Route path="/preview/relay/terms" element={<RelayTerms />} />
              <Route path="/preview/relay/*" element={<RelayNotFound />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
