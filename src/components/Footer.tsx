import { Link } from "react-router-dom";
import { ArrowUp, Phone, EnvelopeSimple, MapPin, ShieldCheck, CaretRight } from "@phosphor-icons/react";
import { Seal } from "@/components/Seal";
import { disclaimer, firm, nav, practiceGroups } from "@/lib/content";
import { scrollToTarget } from "@/lib/lenis";
import { brand } from "@/lib/brand";

export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden border-t-2 border-gilt/40 bg-[#030706] text-stone">
      {/* Top Separation Ribbon */}
      <div className="border-b border-line/60 bg-[#060e0b] py-6">
        <div className="mx-auto flex max-w-[1400px] flex-col sm:flex-row items-center justify-between gap-4 px-5 md:px-10">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-gilt" aria-hidden />
            <span className="t-label text-gilt tracking-widest text-[0.78rem]">
              A&amp;H LEGAL PARTNERS · ADVOCATES HIGH COURT
            </span>
          </div>
          <div className="flex items-center gap-4 text-[0.78rem] tracking-wider text-stone/60 uppercase">
            <span>{firm.founded}</span>
            <span className="text-line-strong">·</span>
            <span>{firm.barCouncil}</span>
            <span className="text-line-strong">·</span>
            <span>Lahore, Pakistan</span>
          </div>
        </div>
      </div>

      {/* Main Footer Directory */}
      <div className="mx-auto max-w-[1400px] px-5 pt-12 pb-10 sm:pt-16 sm:pb-12 md:px-10 md:pt-20 md:pb-16">
        <div className="grid gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-10">
          {/* Column 1: Brand & Credentials */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <Seal className="h-44 w-auto" />
              <p lang="ur" dir="rtl" className="urdu mt-5 text-left text-[1.6rem] text-gilt-soft leading-relaxed">
                {brand.urdu}
              </p>
              <p className="mt-3 max-w-[20rem] text-[0.9875rem] leading-[1.7] text-stone/90">
                {firm.descriptor}.
              </p>
              <p className="mt-2 text-[0.8125rem] text-stone/60">
                High Court of Judicature, Lahore · Subordinate Courts of Punjab
              </p>
            </div>

            <div className="mt-8 rounded-xl border border-line/60 bg-forest/20 p-4 max-w-[20rem]">
              <div className="flex items-center gap-2 text-gilt text-[0.8125rem]">
                <ShieldCheck size={18} />
                <span className="font-medium">Strict Professional Privilege</span>
              </div>
              <p className="mt-1 text-[0.78rem] text-stone/70 leading-[1.5]">
                Client communications protected under Article 9 of the Qanun-e-Shahadat Order 1984.
              </p>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="sm:col-span-1 lg:col-span-2">
            <div className="mb-6 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gilt" />
              <h2 className="t-label text-gilt">The Firm</h2>
            </div>
            <ul className="space-y-3 text-[0.9375rem]">
              <li>
                <Link to="/" className="inline-flex items-center gap-1.5 text-stone transition-colors duration-300 hover:text-ivory">
                  <CaretRight size={12} className="text-gilt/60" />
                  <span>Home</span>
                </Link>
              </li>
              {nav.map((n) => (
                <li key={n.href}>
                  <Link to={n.href} className="inline-flex items-center gap-1.5 text-stone transition-colors duration-300 hover:text-ivory">
                    <CaretRight size={12} className="text-gilt/60" />
                    <span>{n.label}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/contact" className="inline-flex items-center gap-1.5 text-stone transition-colors duration-300 hover:text-ivory">
                  <CaretRight size={12} className="text-gilt/60" />
                  <span>Contact & Consultation</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Key Practice Areas */}
          <div className="sm:col-span-1 lg:col-span-3">
            <div className="mb-6 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gilt" />
              <h2 className="t-label text-gilt">Practice Areas</h2>
            </div>
            <ul className="space-y-2.5 text-[0.875rem]">
              {practiceGroups.slice(0, 7).map((g) => (
                <li key={g.slug}>
                  <Link
                    to={`/practice#${g.slug}`}
                    className="block text-stone transition-colors duration-300 hover:text-ivory truncate"
                  >
                    {g.name}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  to="/practice"
                  className="inline-flex items-center gap-2 text-[0.8125rem] text-gilt hover:text-gilt-soft underline underline-offset-4"
                >
                  <span>View all 10 disciplines →</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Chambers Direct Contact */}
          <div className="sm:col-span-2 lg:col-span-3">
            <div className="mb-6 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gilt" />
              <h2 className="t-label text-gilt">Chambers & Access</h2>
            </div>

            <div className="space-y-3 text-[0.875rem]">
              <div className="rounded-xl border border-line/60 bg-forest/20 p-3.5">
                <p className="text-[0.75rem] text-gilt uppercase tracking-wider">Senior Partner</p>
                <p className="text-ivory font-medium mt-0.5">Azhaar Ahmad Choudhary</p>
                <a
                  href={`tel:${firm.phones[0].tel}`}
                  className="mt-1.5 inline-flex items-center gap-2 text-[0.8125rem] text-gilt hover:underline"
                >
                  <Phone size={13} />
                  <span>{firm.phones[0].display}</span>
                </a>
              </div>

              <div className="rounded-xl border border-line/60 bg-forest/20 p-3.5">
                <p className="text-[0.75rem] text-gilt uppercase tracking-wider">Managing Partner</p>
                <p className="text-ivory font-medium mt-0.5">Haris Ali Choudhary</p>
                <a
                  href={`tel:${firm.phones[1].tel}`}
                  className="mt-1.5 inline-flex items-center gap-2 text-[0.8125rem] text-gilt hover:underline"
                >
                  <Phone size={13} />
                  <span>{firm.phones[1].display}</span>
                </a>
              </div>

              <div className="pt-2 flex items-start gap-2.5 text-[0.8125rem] text-stone/80">
                <MapPin size={16} className="text-gilt shrink-0 mt-0.5" />
                <span>{firm.address.join(", ")}</span>
              </div>

              {firm.email && (
                <div className="flex items-center gap-2.5 text-[0.8125rem] text-stone/80">
                  <EnvelopeSimple size={16} className="text-gilt shrink-0" />
                  <a href={`mailto:${firm.email}`} className="text-stone hover:text-ivory truncate">
                    {firm.email}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Disclaimer Card */}
        <div className="mt-8 sm:mt-12 rounded-xl border border-line/40 bg-forest/10 p-4 sm:p-5 text-[0.78rem] sm:text-[0.8125rem] leading-[1.65] text-stone/75">
          <p>{disclaimer}</p>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-line/60 pt-6 text-[0.78rem] sm:text-[0.8125rem] text-stone/70">
          <p translate="no">
            &copy; {firm.year} {firm.name}. All rights reserved. Admitted before Lahore High Court.
          </p>
          <button
            type="button"
            onClick={() => scrollToTarget(0, 0)}
            className="group inline-flex items-center gap-3 text-ivory transition-colors hover:text-gilt"
          >
            <span className="text-[0.875rem] font-light">Back to top</span>
            <span className="grid size-9 place-items-center rounded-full border border-line-strong transition-[transform,border-color,background-color] duration-500 ease-lux group-hover:-translate-y-0.5 group-hover:border-gilt group-hover:bg-gilt group-hover:text-ink">
              <ArrowUp size={15} weight="light" aria-hidden />
            </span>
          </button>
        </div>
      </div>

      {/* Oversized monogram watermark */}
      <div
        aria-hidden
        translate="no"
        className="display pointer-events-none select-none whitespace-nowrap text-center font-medium leading-[0.78] text-ivory/[0.03]"
        style={{ fontSize: "clamp(8rem, 36vw, 36rem)", transform: "translateY(18%)" }}
      >
        A<span className="font-light italic">&amp;</span>H
      </div>
    </footer>
  );
}
