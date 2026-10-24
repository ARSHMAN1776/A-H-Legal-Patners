import { Link } from "react-router-dom";
import { counsel } from "@/lib/content";
import { cn } from "@/lib/cn";

/**
 * Two founding partners on landing page.
 * Compact and well-proportioned for mobile and small screens.
 */
export function Counsel() {
  return (
    <section id="counsel" className="bg-forest py-16 sm:py-20 md:py-28">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-5 md:px-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            {/* Section label */}
            <div className="mb-5 flex items-center gap-4">
              <span className="h-px w-6 sm:w-8 bg-gilt opacity-70" aria-hidden />
              <span className="t-label text-gilt">Our counsel</span>
            </div>

            <h2 className="display t-section" data-split>
              {counsel.title}
            </h2>
            <p data-reveal className="mt-4 sm:mt-6 max-w-md text-[0.9875rem] text-stone">
              {counsel.body}
            </p>
            <p data-reveal className="mt-3 max-w-md text-[0.875rem] sm:text-[0.9375rem] italic text-stone/70">
              {counsel.tagline}
            </p>

            <div data-reveal className="mt-6 sm:mt-8">
              <Link
                to="/counsel"
                className="t-label inline-flex items-center gap-3 text-gilt hover:text-gilt-soft transition-colors duration-500"
              >
                <span>View complete partner profiles</span>
                <span className="h-px w-6 bg-current" aria-hidden />
              </Link>
            </div>
          </div>
        </div>

        <div data-stagger className="grid grid-cols-2 gap-4 sm:gap-6 lg:col-span-7 lg:gap-8">
          {counsel.people.map((person, i) => (
            <article key={person.name} className={cn("group", i % 2 === 1 && "mt-4 sm:mt-6 lg:mt-16")}>
              {/* Arch plate */}
              <div className="rounded-t-[999px] border border-line-strong p-1 sm:p-1.5 transition-colors duration-700 ease-lux group-hover:border-gilt/60">
                <div className="relative aspect-[3/4] overflow-hidden rounded-t-[999px] bg-[radial-gradient(120%_90%_at_50%_0%,#1d3a31,#0c1a16)]">
                  <span
                    aria-hidden
                    className="display absolute inset-x-0 bottom-[14%] text-center text-[clamp(4.5rem,9vw,9rem)] font-light italic leading-none text-gilt/25 transition-[transform,color] duration-[900ms] ease-lux group-hover:-translate-y-2 group-hover:text-gilt/80"
                  >
                    {person.initial}
                  </span>
                </div>
              </div>

              {/* Name & role */}
              <h3 className="display mt-4 sm:mt-5 text-[clamp(1.25rem,1.9vw,1.85rem)] leading-[1.2]">{person.name}</h3>
              <p className="t-label mt-1 sm:mt-1.5 text-gilt text-[0.75rem] sm:text-[0.8125rem]">{person.role}</p>

              {/* Bio — hidden on mobile for compactness */}
              <p className="mt-3 hidden text-[0.875rem] leading-[1.65] text-stone/80 md:block">
                {person.bio}
              </p>

              {/* Specialisms */}
              <ul className="mt-3 hidden flex-wrap gap-1.5 md:flex">
                {person.specialisms.map((s) => (
                  <li
                    key={s}
                    className="rounded-full border border-line px-2.5 py-0.5 text-[0.68rem] tracking-[0.06em] uppercase text-stone/70"
                  >
                    {s}
                  </li>
                ))}
              </ul>

              {/* Phone */}
              <a
                href={`tel:${person.phone.tel}`}
                className="link-line link-quiet mt-3 block text-[0.875rem] sm:text-[0.9375rem] leading-[1.6] text-stone transition-colors duration-700 ease-lux hover:text-ivory"
              >
                {person.phone.display}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}