import type Lenis from "lenis";

/**
 * Shared handle to the smooth-scroll instance so the nav, the practice index
 * and the anchor handler can drive scrolling without prop drilling.
 * When smooth scroll is off (reduced motion) every helper falls back to the
 * browser's native behaviour.
 */
let instance: Lenis | null = null;

export function setLenis(next: Lenis | null) {
  instance = next;
}

export function getLenis() {
  return instance;
}

export function lockScroll(locked: boolean) {
  if (instance) {
    if (locked) instance.stop();
    else instance.start();
  }
  document.documentElement.style.overflow = locked && !instance ? "hidden" : "";
}

export function scrollToTarget(target: string | HTMLElement | number, offset = 0) {
  if (instance) {
    instance.scrollTo(target, { offset, duration: 1.6 });
    return;
  }
  if (typeof target === "number") {
    window.scrollTo({ top: target });
    return;
  }
  const el = typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;
  el?.scrollIntoView({ behavior: "auto", block: "start" });
}
