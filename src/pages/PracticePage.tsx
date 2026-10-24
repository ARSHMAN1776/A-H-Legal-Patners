import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowUpRight, CheckCircle, ShieldCheck, Scales, Gavel, FileText } from "@phosphor-icons/react";
import { PageHeader } from "@/components/PageHeader";
import { Img } from "@/components/Img";
import { Button } from "@/components/Button";
import { practiceGroups, cta } from "@/lib/content";
import { setMatter } from "@/lib/matter-store";
import { cn } from "@/lib/cn";

const categoryFilters = [
  { label: "All Disciplines", filter: "all" },
  { label: "Superior Courts & Writs", filter: "superior" },
  { label: "Commercial & Corporate", filter: "corporate" },
  { label: "Real Estate & Civil", filter: "civil" },
  { label: "Criminal & White-Collar", filter: "criminal" },
  { label: "Tax & Banking", filter: "tax" },
] as const;

export function PracticePage() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const navigate = useNavigate();

  const filteredGroups = practiceGroups.filter((g) => {
    if (activeTab === "all") return true;
    if (activeTab === "superior") return g.slug === "superior-courts" || g.slug === "litigation";
    if (activeTab === "corporate") return g.slug === "corporate" || g.slug === "advisory" || g.slug === "arbitration";
    if (activeTab === "civil") return g.slug === "property" || g.slug === "family" || g.slug === "litigation";
    if (activeTab === "criminal") return g.slug === "criminal";
    if (activeTab === "tax") return g.slug === "tax" || g.slug === "corporate";
    return true;
  });

  const handleInstruct = (slug: string) => {
    setMatter(slug);
    navigate("/contact");
  };

  return (
    <div className="bg-ink">
      <PageHeader
        badge="Punjab Bar Council · Superior Courts"
        title="Practice Areas & Disciplines"
        subtitle="From urgent constitutional writ petitions before the Lahore High Court to complex corporate transactions and multi-forum civil litigation, our practice is partner-led at every milestone."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Practice Areas" },
        ]}
      >
        <div className="flex flex-col gap-3">
          <Button href="/contact">Book consultation</Button>
          <span className="text-[0.78rem] tracking-wider text-stone/60 text-right uppercase">
            10 Specialist Practice Groups
          </span>
        </div>
      </PageHeader>

      {/* Filter Tabs Bar */}
      <section className="relative border-b border-line bg-forest/25 py-6">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            <span className="t-label text-stone/60 mr-2 shrink-0">Filter:</span>
            {categoryFilters.map((tab) => {
              const isSelected = activeTab === tab.filter;
              return (
                <button
                  key={tab.filter}
                  onClick={() => setActiveTab(tab.filter)}
                  className={cn(
                    "rounded-full px-4 py-1.5 text-[0.8125rem] tracking-wide whitespace-nowrap transition-colors duration-500",
                    isSelected
                      ? "bg-gilt text-ink font-medium"
                      : "border border-line text-stone hover:border-line-strong hover:text-ivory",
                  )}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Practice Directory */}
      <section className="py-20 md:py-32">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="grid gap-12 lg:gap-16">
            {filteredGroups.map((group, index) => (
              <article
                key={group.slug}
                id={group.slug}
                className="group relative rounded-2xl border border-line bg-forest/40 p-6 md:p-10 lg:p-12 transition-colors duration-700 hover:border-line-strong"
              >
                <div className="grid gap-8 lg:grid-cols-12 lg:gap-12 items-start">
                  {/* Left Column: Info & Scope */}
                  <div className="lg:col-span-7">
                    <div className="flex items-center gap-3">
                      <span className="t-label text-gilt">Area 0{index + 1}</span>
                      <span className="h-px w-6 bg-line" aria-hidden />
                      <span className="text-[0.75rem] uppercase tracking-widest text-stone/60">
                        High Court & Superior Jurisdiction
                      </span>
                    </div>

                    <h2 className="display mt-4 text-[clamp(2rem,3.4vw,2.9rem)] font-light leading-[1.12] text-ivory">
                      {group.name}
                    </h2>

                    <p className="mt-5 text-[1.0625rem] leading-[1.75] text-stone">
                      {group.description}
                    </p>

                    {/* Specific Matter Types Handled */}
                    <div className="mt-8 border-t border-line/60 pt-6">
                      <h3 className="t-label text-gilt mb-4">Representative Matters Handled:</h3>
                      <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
                        {group.areas.map((area) => (
                          <div key={area} className="flex items-start gap-2.5 text-[0.875rem] leading-[1.6] text-ivory/85">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gilt" aria-hidden />
                            <span>{area}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action link */}
                    <div className="mt-10 flex flex-wrap items-center gap-5">
                      <button
                        type="button"
                        onClick={() => handleInstruct(group.slug)}
                        className="group/btn inline-flex items-center gap-3 rounded-full bg-gilt px-6 py-2.5 text-[0.875rem] font-medium text-ink transition-colors duration-500 hover:bg-gilt-soft"
                      >
                        <span>Instruct on this matter</span>
                        <ArrowUpRight size={16} weight="bold" className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                      </button>
                      <Link
                        to="/questions"
                        className="text-[0.875rem] text-stone hover:text-ivory underline underline-offset-4 decoration-line hover:decoration-gilt transition-colors"
                      >
                        Questions regarding fees & timeline →
                      </Link>
                    </div>
                  </div>

                  {/* Right Column: Visual Arch Plate */}
                  <div className="lg:col-span-5 flex flex-col items-center">
                    <div className="relative w-full max-w-[20rem] rounded-t-[999px] border border-line-strong p-2">
                      <div className="photo relative aspect-[4/5] overflow-hidden rounded-t-[999px] bg-moss">
                        <Img id={group.image.id} alt={group.image.alt} sizes="(min-width: 1024px) 22rem, 80vw" />
                      </div>
                    </div>
                    <div className="mt-4 text-center">
                      <span className="text-[0.78rem] tracking-wider text-stone/60 uppercase">
                        Led by Advocates High Court
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Structured Instructions Process */}
      <section className="border-t border-line bg-deep py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="max-w-2xl">
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-6 bg-gilt" aria-hidden />
              <span className="t-label text-gilt">How to instruct us</span>
            </div>
            <h2 className="display text-[clamp(2.2rem,4vw,3.2rem)] font-light leading-[1.15] text-ivory">
              Retaining A&H Legal Partners
            </h2>
            <p className="mt-4 text-[1.0625rem] text-stone">
              We maintain a transparent, confidential process for onboarding new individual and corporate matters.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="border-t border-line pt-6">
              <span className="display text-2xl text-gilt font-light">01</span>
              <h3 className="display mt-3 text-xl text-ivory">Initial Consultation</h3>
              <p className="mt-3 text-[0.9375rem] text-stone leading-[1.6]">
                Confidential meeting (in-person at Turner Road or via video conference) to examine your factual matrix and relevant documentation.
              </p>
            </div>

            <div className="border-t border-line pt-6">
              <span className="display text-2xl text-gilt font-light">02</span>
              <h3 className="display mt-3 text-xl text-ivory">Conflict Check</h3>
              <p className="mt-3 text-[0.9375rem] text-stone leading-[1.6]">
                Strict ethical verification to ensure no conflict of interest exists under Punjab Bar Council canons of legal ethics.
              </p>
            </div>

            <div className="border-t border-line pt-6">
              <span className="display text-2xl text-gilt font-light">03</span>
              <h3 className="display mt-3 text-xl text-ivory">Pleadings & Strategy</h3>
              <p className="mt-3 text-[0.9375rem] text-stone leading-[1.6]">
                Direct formulation of grounds, precedent research, and drafting of petitions or contractual safeguards by a senior partner.
              </p>
            </div>

            <div className="border-t border-line pt-6">
              <span className="display text-2xl text-gilt font-light">04</span>
              <h3 className="display mt-3 text-xl text-ivory">Court Presentation</h3>
              <p className="mt-3 text-[0.9375rem] text-stone leading-[1.6]">
                Immediate listing before the relevant bench, moving urgent stay orders, and continuous reporting after every hearing date.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Consultation CTA Banner */}
      <section className="border-t border-line bg-gradient-to-r from-forest via-moss to-ink py-20">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <span className="t-label text-gilt">Confidential Legal Representation</span>
            <h2 className="display mt-2 text-[clamp(2rem,3.5vw,2.8rem)] font-light text-ivory">
              Need immediate legal counsel?
            </h2>
            <p className="mt-2 text-stone max-w-xl text-[0.9875rem]">
              Speak directly with a partner. Emergency petitions before the Lahore High Court are reviewed within hours.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Button href="/contact">{cta.label}</Button>
            <Link
              to="/counsel"
              className="text-[0.9375rem] text-stone hover:text-ivory underline underline-offset-4 decoration-line hover:decoration-gilt transition-colors"
            >
              Meet our advocates →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
