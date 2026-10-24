import { Button } from "@/components/Button";
import { Img } from "@/components/Img";
import { cta, hero, photography, firm } from "@/lib/content";

/**
 * Hero. Left: the thesis. Right: courthouse stonework inside concentric arches.
 * Scaled and tightened for mobile and small screens so content is immediately visible.
 */
export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden bg-ink">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[12%] top-[2%] -z-10 h-[90vh] w-[90vh] max-w-[120vw] bg-[radial-gradient(closest-side,rgb(21_43_36/0.95),transparent)]"
      />

      <div className="mx-auto grid max-w-[1400px] items-center gap-8 px-5 pt-24 pb-12 sm:pt-28 sm:pb-16 md:px-10 lg:min-h-dvh lg:grid-cols-12 lg:gap-8 lg:py-20">
        <div className="lg:col-span-7">
          <div data-hero className="mb-5 sm:mb-8 flex items-center gap-3">
            <span className="h-px w-6 sm:w-8 bg-gilt opacity-70" aria-hidden />
            <span className="t-label text-gilt">{hero.badge}</span>
          </div>

          <h1 className="display t-hero" data-hero-title>
            <span className="block">{hero.headline[0]}</span>
            <em className="block pb-1">{hero.headline[1]}</em>
          </h1>

          <p
            data-hero
            className="mt-5 sm:mt-8 max-w-[42rem] text-pretty text-[1rem] leading-[1.7] text-stone sm:text-[1.0625rem] md:text-lg"
          >
            {hero.sub}
          </p>

          <div data-hero className="mt-7 sm:mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 md:mt-12">
            <Button href={cta.href}>{cta.label}</Button>
            <Button href="/practice" variant="link">
              Our practice areas
            </Button>
          </div>

          <div
            data-hero
            className="mt-10 sm:mt-14 grid grid-cols-3 divide-x divide-line border-t border-line pt-6 sm:pt-8 md:mt-16"
          >
            {hero.stats.map((s) => (
              <div key={s.label} className="px-3 sm:px-5 first:pl-0 last:pr-0">
                <p className="display text-[clamp(1.75rem,3.2vw,2.8rem)] leading-none text-gilt">
                  {s.value}
                </p>
                <p className="mt-1.5 text-[0.75rem] sm:text-[0.8rem] leading-[1.3] text-stone">{s.label}</p>
              </div>
            ))}
          </div>

          <p data-hero className="mt-6 sm:mt-8 text-[0.75rem] sm:text-[0.78rem] tracking-[0.08em] text-stone/60 uppercase">
            {firm.founded} · {firm.barCouncil}
          </p>
        </div>

        <div className="flex justify-center lg:col-span-5 lg:justify-end">
          <div
            data-hero-arch
            className="relative aspect-[4/5] w-full max-w-[18rem] sm:max-w-[22rem] text-gilt lg:h-[min(calc(100dvh-9rem),42rem)] lg:w-auto lg:max-w-none"
          >
            <svg
              viewBox="0 0 400 500"
              className="absolute inset-0 h-full w-full overflow-visible"
              fill="none"
              aria-hidden
            >
              <path
                className="arch-line"
                pathLength={1}
                d="M1 500V200A199 199 0 0 1 399 200V500"
                stroke="currentColor"
                strokeWidth="0.9"
                strokeOpacity="0.85"
              />
              <path
                className="arch-line"
                pathLength={1}
                d="M15 500V200A185 185 0 0 1 385 200V500"
                stroke="currentColor"
                strokeWidth="0.9"
                strokeOpacity="0.4"
              />
            </svg>

            <div
              data-hero-photo
              className="photo absolute inset-x-[7%] bottom-0 top-[5.6%] overflow-hidden rounded-t-[999px] bg-moss"
            >
              <div data-hero-photo-inner className="absolute inset-0">
                <Img
                  id={photography.hero.id}
                  alt={photography.hero.alt}
                  priority
                  sizes="(min-width: 1024px) 38vw, 85vw"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}