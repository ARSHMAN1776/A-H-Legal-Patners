import { Link } from "react-router-dom";
import { process as steps } from "@/lib/content";

/**
 * The only true sequence on the page: four numbered steps with a gilt progress
 * rail. Each step now shows a numbered badge, title, body and a short detail note.
 */
export function Process() {
  return (
    <section id="approach" className="bg-ink py-32 md:py-44">
      <div className="mx-auto grid max-w-[1400px] gap-16 px-5 md:px-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            {/* Section label */}
            <div className="mb-8 flex items-center gap-4">
              <span className="h-px w-8 bg-gilt opacity-70" aria-hidden />
              <span className="t-label text-gilt">How we work</span>
            </div>

            <h2 className="display t-section max-w-[14ch]" data-split>
              {steps.title}
            </h2>
            <p data-reveal className="mt-7 max-w-md">
              {steps.body}
            </p>
            <p data-reveal className="mt-4 t-label text-gilt">
              {steps.tagline}
            </p>

            <div data-reveal className="mt-10">
              <Link
                to="/approach"
                className="t-label inline-flex items-center gap-3 text-gilt hover:text-gilt-soft transition-colors duration-500"
              >
                <span>Explore our full litigation approach</span>
                <span className="h-px w-8 bg-current" aria-hidden />
              </Link>
            </div>
          </div>
        </div>

        <ol data-timeline className="relative pl-9 md:pl-14 lg:col-span-6 lg:col-start-7">
          <span
            aria-hidden
            data-timeline-rail
            className="absolute bottom-0 left-0 top-[1.6rem] w-px bg-line"
          />
          <span
            aria-hidden
            data-timeline-rail
            data-timeline-progress
            className="absolute bottom-0 left-0 top-[1.6rem] w-px origin-top bg-gilt"
          />
          {steps.steps.map((s) => (
            <li key={s.title} data-step className="group py-12 first-of-type:pt-0 last:pb-0 md:py-16 md:first-of-type:pt-0 md:last:pb-0">
              <div className="mb-3 t-label text-stone/50 transition-colors duration-700 group-data-[active=true]:text-gilt">
                {s.number}
              </div>
              <h3 className="display relative text-[clamp(2.4rem,4.2vw,3.6rem)] font-light italic leading-[1.15]">
                <span
                  aria-hidden
                  className="absolute -left-9 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-line-strong bg-ink transition-[background-color,border-color] duration-700 ease-lux md:-left-14 group-data-[active=true]:border-gilt group-data-[active=true]:bg-gilt"
                />
                {s.title}
              </h3>
              <p className="mt-4 max-w-md">{s.body}</p>
              <p className="mt-3 text-[0.8125rem] text-stone/60 italic">{s.detail}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}