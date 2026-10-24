import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scrollToTarget } from "@/lib/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // If navigating with a hash (e.g. /practice#tax), scroll directly to that section
      const timer = setTimeout(() => {
        const id = hash.replace("#", "");
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 180);
      return () => clearTimeout(timer);
    } else {
      // Otherwise scroll to top immediately
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
      scrollToTarget(0, 0);
    }

    // Refresh GSAP triggers for the newly mounted route
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
      const elements = document.querySelectorAll<HTMLElement>("[data-reveal], [data-stagger] > *");
      elements.forEach((el) => {
        if (!el.style.opacity || el.style.opacity === "0") {
          gsap.to(el, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" });
        }
      });
    }, 120);

    return () => clearTimeout(timer);
  }, [pathname, hash]);

  return null;
}
