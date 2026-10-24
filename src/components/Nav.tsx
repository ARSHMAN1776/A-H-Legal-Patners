import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Wordmark } from "@/components/Wordmark";
import { Button } from "@/components/Button";
import { cta, firm, nav } from "@/lib/content";
import { lockScroll } from "@/lib/lenis";
import { cn } from "@/lib/cn";

export function Nav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Escape closes the menu; scroll is locked while it is open.
  useEffect(() => {
    if (!open) return;
    lockScroll(true);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      lockScroll(false);
    };
  }, [open]);

  // Close menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-3 z-[var(--z-nav)] flex justify-center px-3 md:top-6 md:px-6">
      <nav
        aria-label="Primary"
        data-nav
        className={cn(
          "pointer-events-auto relative z-[1] flex w-full max-w-[1080px] items-center justify-between gap-4",
          "rounded-full border border-line bg-ink/75 py-2 pl-5 pr-2 backdrop-blur-xl md:pl-7",
          "shadow-[inset_0_1px_0_rgb(237_232_220/0.07)]",
          "transition-colors duration-700 ease-lux",
        )}
      >
        <Link to="/" aria-label={`${firm.name}, home page`} onClick={() => setOpen(false)}>
          <Wordmark />
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => {
            const isActive =
              item.href === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(item.href);

            return (
              <li key={item.href}>
                <Link
                  to={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "group relative block px-4 py-2 text-[0.8125rem] tracking-[0.04em]",
                    "transition-colors duration-700 ease-lux hover:text-ivory",
                    isActive ? "text-ivory font-medium" : "text-stone",
                  )}
                >
                  {item.label}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-x-4 bottom-1 h-px origin-left bg-gilt",
                      "transition-transform duration-700 ease-lux",
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-50",
                    )}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <Button href={cta.href} size="sm" className="max-lg:hidden">
            {cta.label}
          </Button>

          <button
            type="button"
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="relative grid size-11 place-items-center rounded-full border border-line transition-colors duration-700 ease-lux hover:border-line-strong lg:hidden"
          >
            <span
              aria-hidden
              className={cn(
                "absolute h-px w-5 bg-ivory transition-transform duration-700 ease-lux",
                open ? "rotate-45" : "-translate-y-[3.5px]",
              )}
            />
            <span
              aria-hidden
              className={cn(
                "absolute h-px w-5 bg-ivory transition-transform duration-700 ease-lux",
                open ? "-rotate-45" : "translate-y-[3.5px]",
              )}
            />
          </button>
        </div>
      </nav>

      {/* Full-screen menu (below lg). Lives inside the header's stacking
          context so the toggle button stays above it. */}
      <div
        id="site-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        aria-hidden={!open}
        className={cn(
          "pointer-events-auto fixed inset-0 overscroll-contain transition-[opacity,visibility] duration-700 ease-lux lg:hidden",
          open ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        <div className="absolute inset-0 bg-ink/95 backdrop-blur-3xl" />
        <div className="relative flex min-h-dvh flex-col justify-between px-7 pb-10 pt-28">
          <ul className="flex flex-col gap-1">
            <li className="overflow-hidden">
              <Link
                to="/"
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
                className={cn(
                  "display block py-2 text-[clamp(2.4rem,10vw,3.6rem)] font-light leading-[1.15]",
                  "transition-transform duration-1000 ease-lux",
                  open ? "translate-y-0" : "translate-y-[115%]",
                  location.pathname === "/" ? "text-gilt" : "text-ivory",
                )}
                style={{ transitionDelay: open ? "120ms" : "0ms" }}
              >
                Home
              </Link>
            </li>
            {nav.map((item, i) => {
              const isActive = location.pathname.startsWith(item.href);
              return (
                <li key={item.href} className="overflow-hidden">
                  <Link
                    to={item.href}
                    onClick={() => setOpen(false)}
                    tabIndex={open ? 0 : -1}
                    className={cn(
                      "display block py-2 text-[clamp(2.4rem,10vw,3.6rem)] font-light leading-[1.15]",
                      "transition-transform duration-1000 ease-lux",
                      open ? "translate-y-0" : "translate-y-[115%]",
                      isActive ? "text-gilt" : "text-ivory",
                    )}
                    style={{ transitionDelay: open ? `${180 + i * 80}ms` : "0ms" }}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
            <li className="overflow-hidden">
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
                className={cn(
                  "display block py-2 text-[clamp(2.4rem,10vw,3.6rem)] font-light leading-[1.15]",
                  "transition-transform duration-1000 ease-lux",
                  open ? "translate-y-0" : "translate-y-[115%]",
                  location.pathname === "/contact" ? "text-gilt" : "text-ivory",
                )}
                style={{ transitionDelay: open ? "500ms" : "0ms" }}
              >
                Contact
              </Link>
            </li>
          </ul>

          <div
            className={cn(
              "flex flex-col gap-6 transition-[opacity,transform] duration-1000 ease-lux",
              open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
            )}
            style={{ transitionDelay: open ? "560ms" : "0ms" }}
          >
            <Button href={cta.href} className="self-start" onClick={() => setOpen(false)}>
              {cta.label}
            </Button>
            <div className="flex flex-col gap-2 text-ivory">
              {firm.phones.map((p) => (
                <a key={p.tel} href={`tel:${p.tel}`} className="text-[0.9375rem] text-stone hover:text-ivory">
                  {p.owner}: <span className="text-ivory font-medium">{p.display}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
