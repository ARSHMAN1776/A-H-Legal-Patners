import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { Preloader } from "@/components/Preloader";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { MotionProvider } from "@/components/MotionProvider";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Home } from "@/pages/Home";
import { PracticePage } from "@/pages/PracticePage";
import { ApproachPage } from "@/pages/ApproachPage";
import { PartnersPage } from "@/pages/PartnersPage";
import { QuestionsPage } from "@/pages/QuestionsPage";
import { ContactPage } from "@/pages/ContactPage";
import { firm } from "@/lib/content";

export default function App() {
  useEffect(() => {
    document.title = `${firm.name} | ${firm.descriptor}`;
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[var(--z-intro)] focus:rounded-full focus:bg-gilt focus:px-5 focus:py-2.5 focus:text-[0.875rem] focus:font-medium focus:text-ink"
      >
        Skip to content
      </a>
      <Preloader />
      <Nav />
      <main id="main" tabIndex={-1} className="outline-none min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/practice" element={<PracticePage />} />
          <Route path="/approach" element={<ApproachPage />} />
          <Route path="/counsel" element={<PartnersPage />} />
          <Route path="/partners" element={<PartnersPage />} />
          <Route path="/questions" element={<QuestionsPage />} />
          <Route path="/faq" element={<QuestionsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      <MotionProvider />
    </BrowserRouter>
  );
}
