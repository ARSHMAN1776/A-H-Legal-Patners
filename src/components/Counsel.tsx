import { Link } from "react-router-dom";
import { counsel, cta } from "@/lib/content";
import { cn } from "@/lib/cn";

/**
 * Two founding partners: arch plates with monogram initials, bios,
 * specialisms and direct contact links.
 */
export function Counsel() {
  return (
    <section id="counsel" className="bg-forest py-32 md:py-44">
      <div className="mx-auto grid max-w-[1400px] gap-16 px-5 md:px-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            {/* Section label */}
            <div className="mb-8 flex items-center gap-4">
              <span className="h-px w-8 bg-gilt opacity-70" aria-hidden />
              <span className="t-label text-gilt">Our counsel</span>
            </div>

            <h2 className="display t-section" data-split>
              {counsel.title}
            </h2>
            <p data-reveal className="mt-7 max-w-md">
              {counsel.body}
            </p>
            <p data-reveal className="mt-4 max-w-md text-[0.9375rem] italic text-stone/70">
              {counsel.tagline}
            </p>

            <div data-reveal className="mt-10 flex flex-col gap-4">
              <Link
                to="/counsel"
                className="t-label inline-flex items-center gap-3 text-gilt hover:text-gilt-soft transition-colors duration-500"
              >
                <span>View complete partner profiles & credentials</span>
                <span className="h-px w-8 bg-current" aria-hidden />
              </Link>
            </div>
          </div>
        </div>

        <div data-stagger className="grid grid-cols-2 gap-5 lg:col-span-7 lg:gap-8">
          {counsel.people.map((person, i) => (
            <article key={person.name} className={cn("group", i % 2 === 1 && "mt-12 lg:mt-20")}>
              {/* Arch plate */}
              <div className="rounded-t-[999px] border border-line-strong p-1.5 transition-colors duration-700 ease-lux group-hover:border-gilt/60">
                <div className="relative aspect-[3/4] overflow-hidden rounded-t-[999px] bg-[radial-gradient(120%_90%_at_50%_0%,#1d3a31,#0c1a16)]">
                  <span
                    aria-hidden
                    className="display absolute inset-x-0 bottom-[14%] text-center text-[clamp(5.5rem,11vw,10.5rem)] font-light italic leading-none text-gilt/25 transition-[transform,color] duration-[900ms] ease-lux group-hover:-translate-y-3 group-hover:text-gilt/80"
                  >
                    {person.initial}
                  </span>
                </div>
              </div>

              {/* Name & role */}
              <h3 className="display mt-7 text-[clamp(1.5rem,2.4vw,2.1rem)] leading-[1.15]">{person.name}</h3>
              <p className="t-label mt-2 text-gilt">{person.role}</p>

              {/* Bio — hidden on mobile for compactness */}
              <p className="mt-4 hidden text-[0.875rem] leading-[1.7] text-stone/80 md:block">
                {person.bio}
              </p>

              {/* Specialisms */}
              <ul className="mt-4 hidden flex-wrap gap-2 md:flex">
                {person.specialisms.map((s) => (
                  <li
                    key={s}
                    className="rounded-full border border-line px-3 py-1 text-[0.7rem] tracking-[0.06em] uppercase text-stone/70"
                  >
                    {s}
                  </li>
                ))}
              </ul>

              {/* Phone */}
              <a
                href={`tel:${person.phone.tel}`}
                className="link-line link-quiet mt-4 block text-[0.9375rem] leading-[1.65] text-stone transition-colors duration-700 ease-lux hover:text-ivory"
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