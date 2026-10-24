import { Link } from "react-router-dom";
import { Phone, EnvelopeSimple, Scales, ShieldCheck, GraduationCap, Certificate, ArrowUpRight } from "@phosphor-icons/react";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { firm, cta } from "@/lib/content";

const partners = [
  {
    name: "Azhaar Ahmad Choudhary",
    initial: "A",
    role: "Advocate High Court · Senior Partner",
    bar: "Punjab Bar Council · Lahore High Court Bar Association (LHCBA)",
    standing: "12+ Years at the Bar",
    phone: firm.phones[0],
    email: "azhaar@ahlegalpatners.com",
    focus: [
      "Constitutional Law & Article 199 Writ Petitions",
      "Civil Litigation & Specific Performance of Contracts",
      "Land Revenue, Mutations & Property Title Disputes",
      "Corporate Advisory & Commercial Restructuring",
      "Appeals from Special Tribunals & High Court Revisions",
    ],
    admissions: [
      "Lahore High Court (Principal Seat & Benches)",
      "District & Sessions Courts of Punjab",
      "Banking Courts & Financial Tribunals",
      "Punjab Revenue Authority & Board of Revenue",
    ],
    bio: "Azhaar Ahmad Choudhary is a senior advocate with comprehensive appellate and constitutional experience before the Lahore High Court. His legal practice centers on complex civil disputes, constitutional writ petitions against arbitrary executive action, and strategic corporate governance.",
    quote: "Precision in legal pleadings is the bedrock of appellate victory. If your grounds of law are meticulously framed on day one, you establish an insurmountable advantage before the bench.",
  },
  {
    name: "Haris Ali Choudhary",
    initial: "H",
    role: "Advocate High Court · Managing Partner",
    bar: "Punjab Bar Council · Lahore High Court Bar Association (LHCBA)",
    standing: "Distinguished Trial & Appellate Advocate",
    phone: firm.phones[1],
    email: "haris@ahlegalpatners.com",
    focus: [
      "White-Collar Defence (NAB, FIA, Anti-Corruption)",
      "Urgent Criminal Bails (Pre-arrest & Post-arrest)",
      "Quashing of FIRs under Section 561-A CrPC",
      "Taxation, Customs Valuation & Fiscal References",
      "Family & Succession Law for Overseas Pakistanis",
    ],
    admissions: [
      "Lahore High Court",
      "Special NAB Courts & Accountability Benches",
      "Special Court (Offences in Respect of Banks)",
      "Customs, Excise & Sales Tax Appellate Tribunal",
    ],
    bio: "Haris Ali Choudhary leads the firm's criminal defence, tax, and white-collar regulatory practice. Known for his rapid response in urgent bail matters and thorough cross-examination preparation, he advises prominent business families, executives, and overseas Pakistanis.",
    quote: "In criminal, tax, and regulatory investigations, prompt and assertive action in the first twenty-four hours determines whether liberty and reputation are preserved.",
  },
];

const chamberSupport = [
  {
    title: "Senior Research Associates",
    desc: "Dedicated case law analysts tracking daily reported judgments from the Supreme Court and all provincial High Courts to provide authoritative support to partner pleadings.",
  },
  {
    title: "Registry & Filing Unit",
    desc: "Experienced court clerks managing daily cause lists, urgent motion filings, caveats, and expedited certified copy requisition across Lahore High Court benches.",
  },
  {
    title: "Overseas Client Liaison",
    desc: "Facilitating virtual consultations, document attestation via foreign embassies, and bilingual power of attorney drafting for non-resident Pakistanis.",
  },
];

export function PartnersPage() {
  return (
    <div className="bg-ink">
      <PageHeader
        badge="Punjab Bar Council · High Court of Judicature"
        title="Partners & Counsel"
        subtitle="A&H Legal Partners is built on a single, uncompromising premise: you work directly with named partners of the High Court, from initial case analysis to final oral arguments."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Partners & Counsel" },
        ]}
      >
        <Button href="/contact">Consult with a partner</Button>
      </PageHeader>

      {/* Partners Profiles */}
      <section className="py-24 md:py-36">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="grid gap-20 lg:gap-24">
            {partners.map((partner, index) => (
              <article
                key={partner.name}
                id={partner.initial.toLowerCase()}
                className="rounded-2xl border border-line bg-forest/30 p-8 md:p-12 lg:p-16 transition-colors duration-700 hover:border-line-strong"
              >
                <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-start">
                  {/* Left: Arch plate + Contact links */}
                  <div className="lg:col-span-4 flex flex-col items-center lg:items-start">
                    <div className="relative w-full max-w-[20rem] rounded-t-[999px] border border-line-strong p-2">
                      <div className="relative aspect-[3/4] overflow-hidden rounded-t-[999px] bg-[radial-gradient(120%_90%_at_50%_0%,#1d3a31,#0c1a16)]">
                        <span
                          aria-hidden
                          className="display absolute inset-x-0 bottom-[14%] text-center text-[clamp(6rem,12vw,9.5rem)] font-light italic leading-none text-gilt/35"
                        >
                          {partner.initial}
                        </span>
                      </div>
                    </div>

                    <div className="mt-8 w-full max-w-[20rem] space-y-3">
                      <a
                        href={`tel:${partner.phone.tel}`}
                        className="flex items-center gap-3 rounded-full border border-line px-5 py-2.5 text-[0.875rem] text-stone transition-colors duration-500 hover:border-gilt hover:text-ivory"
                      >
                        <Phone size={16} className="text-gilt" />
                        <span>Direct: {partner.phone.display}</span>
                      </a>
                      <a
                        href={`mailto:${partner.email}`}
                        className="flex items-center gap-3 rounded-full border border-line px-5 py-2.5 text-[0.875rem] text-stone transition-colors duration-500 hover:border-gilt hover:text-ivory break-all"
                      >
                        <EnvelopeSimple size={16} className="text-gilt shrink-0" />
                        <span className="truncate">{partner.email}</span>
                      </a>
                    </div>
                  </div>

                  {/* Right: Bio & Credentials */}
                  <div className="lg:col-span-8">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="t-label text-gilt">{partner.role}</span>
                      <span className="text-stone/40">·</span>
                      <span className="text-[0.8125rem] text-stone">{partner.standing}</span>
                    </div>

                    <h2 className="display mt-3 text-[clamp(2.2rem,4vw,3.2rem)] font-light leading-[1.12] text-ivory">
                      {partner.name}
                    </h2>

                    <p className="mt-2 text-[0.875rem] text-stone/70">
                      {partner.bar}
                    </p>

                    <p className="mt-6 text-[1.0625rem] leading-[1.8] text-stone">
                      {partner.bio}
                    </p>

                    {/* Partner Quote */}
                    <blockquote className="mt-8 border-l-2 border-gilt/60 pl-6 py-2 italic text-ivory/90 text-[1.05rem] leading-[1.7]">
                      "{partner.quote}"
                    </blockquote>

                    {/* Practice Focus Areas */}
                    <div className="mt-10 border-t border-line/60 pt-8">
                      <h3 className="t-label text-gilt mb-4">Core Practice Specialisms:</h3>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {partner.focus.map((f) => (
                          <div key={f} className="flex items-start gap-2.5 text-[0.875rem] text-ivory/85">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gilt" aria-hidden />
                            <span>{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Court Admissions */}
                    <div className="mt-8 border-t border-line/60 pt-6">
                      <h3 className="t-label text-stone/70 mb-3">Court Admissions & Appearances:</h3>
                      <div className="flex flex-wrap gap-2">
                        {partner.admissions.map((adm) => (
                          <span
                            key={adm}
                            className="rounded-full border border-line bg-forest/40 px-3.5 py-1 text-[0.78rem] tracking-wide text-stone"
                          >
                            {adm}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-10">
                      <Button href="/contact">Instruct {partner.name.split(" ")[0]}</Button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* The Chambers Bench & Support Unit */}
      <section className="border-t border-line bg-deep py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="max-w-2xl">
            <span className="t-label text-gilt">Chambers Infrastructure</span>
            <h2 className="display mt-3 text-[clamp(2.2rem,4vw,3.2rem)] font-light text-ivory">
              The Legal Research & Registry Bench
            </h2>
            <p className="mt-4 text-[1.0625rem] text-stone">
              Behind our courtroom advocates stands a dedicated legal research apparatus and registry coordination team situated directly near the Lahore High Court.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {chamberSupport.map((unit) => (
              <div key={unit.title} className="rounded-xl border border-line bg-forest/30 p-8">
                <h3 className="display text-2xl text-ivory font-light">{unit.title}</h3>
                <p className="mt-4 text-[0.9375rem] leading-[1.7] text-stone">
                  {unit.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Direct Partner Attention Matters */}
      <section className="border-t border-line bg-ink py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-center">
            <div className="lg:col-span-6">
              <span className="t-label text-gilt">The A&H Distinction</span>
              <h2 className="display mt-4 text-[clamp(2.2rem,4vw,3.2rem)] font-light text-ivory">
                Why Partner-Led Representation Wins Cases
              </h2>
              <p className="mt-6 text-[1.0625rem] leading-[1.75] text-stone">
                In large legal conglomerates, high-profile partners pitch the client, but the pleadings, legal research, and day-to-day court attendances are frequently delegated to inexperienced junior associates.
              </p>
              <p className="mt-4 text-[1.0625rem] leading-[1.75] text-stone">
                At A&H Legal Partners, we deliberately limit our caseload. Every petition is drafted by a partner. Every motion hearing is argued by a partner. And every client has direct mobile access to the advocate leading their cause.
              </p>
            </div>

            <div className="lg:col-span-6">
              <div className="space-y-4">
                <div className="rounded-xl border border-line bg-forest/30 p-6">
                  <h4 className="text-gilt font-medium text-[1rem]">No Junior Handoffs</h4>
                  <p className="mt-1 text-[0.9375rem] text-stone">
                    Your brief is never passed off to an associate without direct partner oversight and presence before the judge.
                  </p>
                </div>
                <div className="rounded-xl border border-line bg-forest/30 p-6">
                  <h4 className="text-gilt font-medium text-[1rem]">Immediate Decision-Making</h4>
                  <p className="mt-1 text-[0.9375rem] text-stone">
                    When bench questions arise or opposing counsel files surprise rejoinders, your advocate makes instant, authoritative tactical calls.
                  </p>
                </div>
                <div className="rounded-xl border border-line bg-forest/30 p-6">
                  <h4 className="text-gilt font-medium text-[1rem]">Direct Client Communication</h4>
                  <p className="mt-1 text-[0.9375rem] text-stone">
                    You speak directly to your lawyer in plain language, without having to navigate through receptionists or case managers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="border-t border-line bg-gradient-to-r from-forest via-moss to-ink py-20">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <span className="t-label text-gilt">Direct Access</span>
            <h2 className="display mt-2 text-[clamp(2rem,3.5vw,2.8rem)] font-light text-ivory">
              Speak with Azhaar or Haris today.
            </h2>
            <p className="mt-2 text-stone max-w-xl text-[0.9875rem]">
              We are available for meetings at our Turner Road chambers near the Lahore High Court, or via secure telephone consultation.
            </p>
          </div>
          <Button href="/contact">Schedule your consultation</Button>
        </div>
      </section>
    </div>
  );
}
