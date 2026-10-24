import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";
import { scrollToTarget, setLenis } from "@/lib/lenis";

gsap.registerPlugin(ScrollTrigger, SplitText);

const q = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  gsap.utils.toArray<T>(sel, root as Element);

/** Wait for the two display faces so SplitText measures real line breaks. */
async function fontsReady() {
  if (!("fonts" in document)) return;
  const wanted = [
    '400 1em "Cormorant Garamond"',
    'italic 300 1em "Cormorant Garamond"',
    '1em "Geist Variable"',
  ];
  await Promise.race([
    Promise.all(wanted.map((f) => document.fonts.load(f))).then(() => document.fonts.ready),
    new Promise((r) => setTimeout(r, 2500)),
  ]);
}

/**
 * Every animation on the page lives here, driven by data attributes in the
 * markup. Each effect answers one question: what does this motion say?
 *
 *   [data-split]     headings: masked line reveal, so reading order is clear
 *   [data-reveal]    single blocks rise into place as they enter
 *   [data-stagger]   groups arrive in sequence, left to right / top to bottom
 *   [data-lit]       manifesto words brighten with scroll, pacing the reading
 *   [data-clip]      wide image opens up, marking a change of scale
 *   [data-timeline]  the approach line draws as the matter progresses
 *   [data-magnetic]  primary buttons lean toward the pointer (feedback)
 *
 * Everything below runs inside gsap.matchMedia, so visitors who ask for
 * reduced motion get a fully visible, static page (see the CSS overrides).
 */
export function MotionProvider() {
  useEffect(() => {
    window.__slfReady = true;
    const root = document.documentElement;
    const mm = gsap.matchMedia();
    let cancelled = false;

    // ------------------------------------------------------------------
    // Reduced motion: static page, but the timeline should read as complete.
    // ------------------------------------------------------------------
    mm.add("(prefers-reduced-motion: reduce)", () => {
      q("[data-step]").forEach((s) => (s.dataset.active = "true"));
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // ---------------- smooth scroll, synced with ScrollTrigger --------
      const lenis = new Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
      setLenis(lenis);
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      // ---------------- intro curtain + hero choreography ---------------
      const intro = document.getElementById("intro");
      const introVisible = !!intro && getComputedStyle(intro).display !== "none";
      if (introVisible) lenis.stop();

      const start = async () => {
        await fontsReady();
        if (cancelled) return;

        const title = document.querySelector<HTMLElement>("[data-hero-title]");
        const nav = document.querySelector<HTMLElement>("[data-nav]");
        const photo = document.querySelector<HTMLElement>("[data-hero-photo]");
        const photoInner = document.querySelector<HTMLElement>("[data-hero-photo-inner]");
        const lines = q<SVGPathElement>(".arch-line");
        const heroBits = q("[data-hero]");

        const tl = gsap.timeline({
          defaults: { ease: "expo.out" },
          onComplete: () => {
            try {
              sessionStorage.setItem("slf-intro", "1");
            } catch {
              /* private mode: the intro simply plays again next visit */
            }
            root.classList.add("intro-seen");
            lenis.start();
          },
        });

        let heroAt = 0.15;

        if (introVisible && intro) {
          // The seal draws itself: arch lines first, then keystone, monogram and wordmark.
          const inner = intro.querySelector<HTMLElement>("[data-intro-inner]");
          const urdu = intro.querySelector<HTMLElement>("[data-intro-urdu]");
          const sealLines = q<SVGPathElement>(".seal-line", intro);
          const panel = intro.querySelector<SVGPathElement>(".seal-panel");
          const key = intro.querySelector<SVGPathElement>(".seal-key");
          const letters = q<SVGPathElement>(".seal-letter", intro);
          const rule = intro.querySelector<SVGPathElement>(".seal-rule");
          const lp = intro.querySelector<SVGPathElement>(".seal-lp");
          if (inner) {
            tl.fromTo(sealLines, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.5, ease: "power3.inOut", stagger: 0.2 }, 0.1);
            if (panel) tl.fromTo(panel, { opacity: 0 }, { opacity: 1, duration: 1.1, ease: "power2.out" }, 0.6);
            if (key) tl.fromTo(key, { opacity: 0, y: -18 }, { opacity: 1, y: 0, duration: 0.8, ease: "back.out(1.7)" }, 1.0);
            if (letters.length)
              tl.fromTo(letters, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.12 }, 0.95);
            if (rule) tl.fromTo(rule, { opacity: 0 }, { opacity: 0.8, duration: 0.6 }, 1.55);
            if (lp) tl.fromTo(lp, { opacity: 0 }, { opacity: 1, duration: 0.8 }, 1.65);
            if (urdu) tl.fromTo(urdu, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.8 }, 1.8);
            tl.to(inner, { opacity: 0, y: -14, duration: 0.5, ease: "power2.in" }, 2.75).to(
              intro,
              { yPercent: -100, duration: 1.05, ease: "expo.inOut" },
              3.0,
            );
            heroAt = 3.35;
          }
        }

        // Nav drops in
        if (nav) tl.fromTo(nav, { opacity: 0, y: -26 }, { opacity: 1, y: 0, duration: 1.2 }, heroAt + 0.3);

        // Arches draw themselves, then the courthouse rises inside them
        if (lines.length)
          tl.to(lines, { strokeDashoffset: 0, duration: 2.0, ease: "power3.inOut", stagger: 0.3 }, heroAt);
        if (photo)
          tl.fromTo(
            photo,
            { clipPath: "inset(100% 0% 0% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: "expo.inOut" },
            heroAt + 0.3,
          );
        if (photoInner)
          tl.fromTo(photoInner, { scale: 1.32 }, { scale: 1, duration: 2.4, ease: "expo.out" }, heroAt + 0.3);

        // Headline: masked lines
        if (title) {
          const split = SplitText.create(title, {
            type: "lines",
            mask: "lines",
            linesClass: "split-line",
          });
          gsap.set(title, { opacity: 1 });
          tl.from(split.lines, { yPercent: 118, duration: 1.4, stagger: 0.12 }, heroAt + 0.1);
        }

        // Sub copy + CTAs
        if (heroBits.length)
          tl.fromTo(
            heroBits,
            { opacity: 0, y: 26 },
            { opacity: 1, y: 0, duration: 1.2, stagger: 0.14 },
            heroAt + 0.5,
          );
      };
      void start();

      // ---------------- scroll-driven effects ---------------------------
      const setup = async () => {
        await fontsReady();
        if (cancelled) return;

        // Section headings: masked line reveal
        q("[data-split]").forEach((el) => {
          gsap.set(el, { opacity: 1 });
          SplitText.create(el, {
            type: "lines",
            mask: "lines",
            linesClass: "split-line",
            autoSplit: true,
            onSplit: (self) =>
              gsap.from(self.lines, {
                yPercent: 118,
                duration: 1.5,
                ease: "expo.out",
                stagger: 0.12,
                scrollTrigger: { trigger: el, start: "top 88%", once: true },
              }),
          });
        });

        // Single blocks
        q("[data-reveal]").forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 38 },
            {
              opacity: 1,
              y: 0,
              duration: 1.4,
              ease: "expo.out",
              scrollTrigger: { trigger: el, start: "top 90%", once: true },
            },
          );
        });

        // Groups, in sequence
        q("[data-stagger]").forEach((parent) => {
          gsap.fromTo(
            Array.from(parent.children),
            { opacity: 0, y: 44 },
            {
              opacity: 1,
              y: 0,
              duration: 1.4,
              ease: "expo.out",
              stagger: 0.13,
              scrollTrigger: { trigger: parent, start: "top 86%", once: true },
            },
          );
        });

        // Manifesto: words brighten as the reader moves through the sentence
        q("[data-lit]").forEach((el) => {
          const words = q(".lit-word", el);
          gsap.fromTo(
            words,
            { opacity: 0.14 },
            {
              opacity: 1,
              ease: "none",
              duration: 0.5,
              stagger: 0.14,
              scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 50%", scrub: 0.6 },
            },
          );
        });

        // Wide library plate opens from the sides while the image settles
        q("[data-clip]").forEach((el) => {
          const inner = el.querySelector<HTMLElement>("[data-clip-inner]");
          gsap.fromTo(
            el,
            { clipPath: "inset(0% 17% 0% 17%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              ease: "none",
              scrollTrigger: { trigger: el, start: "top 92%", end: "top 20%", scrub: true },
            },
          );
          if (inner)
            gsap.fromTo(
              inner,
              { scale: 1.3, yPercent: -7 },
              {
                scale: 1.05,
                yPercent: 7,
                ease: "none",
                scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
              },
            );
        });

        // Approach timeline
        q("[data-timeline]").forEach((list) => {
          const steps = q("[data-step]", list);
          const bar = list.querySelector<HTMLElement>("[data-timeline-progress]");
          const rails = q("[data-timeline-rail]", list);
          const first = steps[0];
          const last = steps[steps.length - 1];
          if (!bar || !first || !last) return;

          const place = () => {
            // Vertical centre of each step's heading, measured from the list's top edge
            const listTop = list.getBoundingClientRect().top;
            const centre = (step: HTMLElement) => {
              const h = step.querySelector<HTMLElement>("h3");
              if (!h) return 0;
              const r = h.getBoundingClientRect();
              return r.top - listTop + r.height / 2;
            };
            const top = centre(first);
            const bottom = list.getBoundingClientRect().height - centre(last);
            rails.forEach((r) => {
              r.style.top = `${top}px`;
              r.style.bottom = `${bottom}px`;
            });
          };
          place();
          ScrollTrigger.addEventListener("refreshInit", place);

          gsap.fromTo(
            bar,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: "none",
              scrollTrigger: {
                trigger: first,
                endTrigger: last,
                start: "top 62%",
                end: "top 62%",
                scrub: 0.5,
              },
            },
          );
          steps.forEach((step) =>
            ScrollTrigger.create({
              trigger: step,
              start: "top 62%",
              onEnter: () => (step.dataset.active = "true"),
              onLeaveBack: () => (step.dataset.active = "false"),
            }),
          );
        });

        ScrollTrigger.refresh();
      };
      void setup();

      // ---------------- magnetic primary buttons ------------------------
      const cleanups: Array<() => void> = [];
      if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        q("[data-magnetic]").forEach((el) => {
          const xTo = gsap.quickTo(el, "x", { duration: 0.9, ease: "power3" });
          const yTo = gsap.quickTo(el, "y", { duration: 0.9, ease: "power3" });
          const move = (e: PointerEvent) => {
            const r = el.getBoundingClientRect();
            xTo((e.clientX - (r.left + r.width / 2)) * 0.22);
            yTo((e.clientY - (r.top + r.height / 2)) * 0.3);
          };
          const leave = () => {
            xTo(0);
            yTo(0);
          };
          el.addEventListener("pointermove", move);
          el.addEventListener("pointerleave", leave);
          cleanups.push(() => {
            el.removeEventListener("pointermove", move);
            el.removeEventListener("pointerleave", leave);
          });
        });
      }

      const onLoad = () => ScrollTrigger.refresh();
      window.addEventListener("load", onLoad);

      return () => {
        cancelled = true;
        cleanups.forEach((fn) => fn());
        window.removeEventListener("load", onLoad);
        gsap.ticker.remove(tick);
        lenis.destroy();
        setLenis(null);
      };
    });

    // ------------------------------------------------------------------
    // Anchor links: glide with Lenis when available, native otherwise.
    // ------------------------------------------------------------------
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const a = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a) return;
      const hash = a.getAttribute("href") ?? "";
      if (hash.length < 2) return;
      const target = hash === "#top" ? 0 : document.querySelector<HTMLElement>(hash);
      if (target === null) return;
      e.preventDefault();
      scrollToTarget(target, 0);
      history.replaceState(null, "", hash);
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelled = true;
      document.removeEventListener("click", onClick);
      mm.revert();
    };
  }, []);

  return null;
}
