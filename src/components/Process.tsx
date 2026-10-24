import { Link } from "react-router-dom";
import { process as steps } from "@/lib/content";

/**
 * The 4-step sequence on the landing page.
 * Optimized with compact spacing so it doesn't cause excessive scrolling on small screens.
 */
export function Process() {
  return (
    <section id="approach" className="bg-ink py-16 sm:py-20 md:py-28">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-5 md:px-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            {/* Section label */}
            <div className="mb-5 flex items-center gap-4">
              <span className="h-px w-6 sm:w-8 bg-gilt opacity-70" aria-hidden />
              <span className="t-label text-gilt">How we work</span>
            </div>

            <h2 className="display t-section max-w-[14ch]" data-split>
              {steps.title}
            </h2>
            <p data-reveal className="mt-4 sm:mt-6 max-w-md text-[0.9875rem] text-stone">
              {steps.body}
            </p>
            <p data-reveal className="mt-3 t-label text-gilt">
              {steps.tagline}
            </p>

            <div data-reveal className="mt-6 sm:mt-8">
              <Link
                to="/approach"
                className="t-label inline-flex items-center gap-3 text-gilt hover:text-gilt-soft transition-colors duration-500"
              >
                <span>Explore full litigation approach</span>
                <span className="h-px w-6 bg-current" aria-hidden />
              </Link>
            </div>
          </div>
        </div>

        <ol data-timeline className="relative pl-8 sm:pl-10 md:pl-14 lg:col-span-6 lg:col-start-7">
          <span
            aria-hidden
            data-timeline-rail
            className="absolute bottom-0 left-0 top-[1.2rem] w-px bg-line"
          />
          <span
            aria-hidden
            data-timeline-rail
            data-timeline-progress
            className="absolute bottom-0 left-0 top-[1.2rem] w-px origin-top bg-gilt"
          />
          {steps.steps.map((s) => (
            <li key={s.title} data-step className="group py-6 first-of-type:pt-0 last:pb-0 sm:py-8 md:py-10 md:first-of-type:pt-0 md:last:pb-0">
              <div className="mb-2 t-label text-stone/50 text-[0.75rem] sm:text-[0.8125rem] transition-colors duration-700 group-data-[active=true]:text-gilt">
                {s.number}
              </div>
              <h3 className="display relative text-[clamp(1.75rem,2.8vw,2.6rem)] font-light italic leading-[1.2]">
                <span
                  aria-hidden
                  className="absolute -left-8 sm:-left-10 md:-left-14 top-1/2 size-2.5 sm:size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-line-strong bg-ink transition-[background-color,border-color] duration-700 ease-lux group-data-[active=true]:border-gilt group-data-[active=true]:bg-gilt"
                />
                {s.title}
              </h3>
              <p className="mt-2.5 max-w-md text-[0.9375rem] leading-[1.65] text-stone">{s.body}</p>
              <p className="mt-2 text-[0.78rem] text-stone/60 italic">{s.detail}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}