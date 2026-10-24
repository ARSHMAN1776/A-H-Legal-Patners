import { Link } from "react-router-dom";
import { Check, ShieldCheck, Scales, Clock, Users, FileText, ArrowUpRight } from "@phosphor-icons/react";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { process as stepsData } from "@/lib/content";

const proceduralStages = [
  {
    step: "01",
    phase: "Forensic Case Audit",
    title: "Documentary Audit & Jurisdictional Discovery",
    desc: "Litigation is frequently won or lost on document hygiene before the first hearing is even fixed. We scrutinize every document, registry entry, and communication for evidentiary vulnerabilities.",
    points: [
      "Certified copies audit from High Court and District Court records",
      "Limitation period analysis under the Limitation Act 1908",
      "Jurisdictional scrutiny: Pecuniary, territorial, and subject-matter jurisdiction",
      "Assessment of opposing counsel's likely preliminary objections",
    ],
  },
  {
    step: "02",
    phase: "Precedent Research",
    title: "Pleadings Formulation & Strategic Framing",
    desc: "A petition or written statement must be built on unassailable legal grounds. We conduct rigorous research across reported superior court authorities (PLD, SCMR, CLD, YLR) to align your case with current precedent.",
    points: [
      "Precision drafting by a founding partner of the High Court",
      "Constitutional grounds formulation under Article 199 of the Constitution",
      "Urgent application for interim stay / ad-interim injunction under Order 39 CPC",
      "Preparation of comprehensive list of dates and chronological timeline",
    ],
  },
  {
    step: "03",
    phase: "Courtroom Advocacy",
    title: "Decisive Oral Advocacy & Motion Hearings",
    desc: "Courtroom advocacy before the Lahore High Court requires concise, authoritative oral submissions. We press for prompt admission, issuance of notices, and urgent stay relief on the very first date of motion.",
    points: [
      "Advocacy conducted exclusively by founding partners",
      "Expedited fixation before urgent motion benches",
      "Immediate rebuttal of counter-affidavits and government replies",
      "Same-day written hearing summary and certified order copy delivery",
    ],
  },
  {
    step: "04",
    phase: "Resolution & Execution",
    title: "Decree Execution, Appellate Safeguards & ADR",
    desc: "A favorable judgment is only valuable if properly enforced or defended on appeal. We maintain end-to-end continuity through execution proceedings, Intra-Court Appeals (ICA), and Supreme Court appeals.",
    points: [
      "Execution of civil decrees, warrants, and possession orders",
      "Intra-Court Appeals (ICA) before Division Benches of the High Court",
      "Civil & Criminal Petitions for Leave to Appeal (CPLA) in the Supreme Court",
      "Structured commercial settlement negotiations when advantageous",
    ],
  },
];

const standards = [
  {
    icon: ShieldCheck,
    title: "Privilege from First Word",
    desc: "Protected by legal professional privilege under Article 9 of the Qanun-e-Shahadat Order 1984. Everything disclosed remains strictly confidential.",
  },
  {
    icon: FileText,
    title: "Written Fee Agreements",
    desc: "Every matter begins with a transparent scope of work and agreed stage fees. No hidden disbursements, no unexpected invoices.",
  },
  {
    icon: Users,
    title: "Partner-Led Continuity",
    desc: "The partner who reviews your documents at the initial consultation is the same partner who prepares the brief and argues before the bench.",
  },
  {
    icon: Clock,
    title: "Same-Day Hearing Debriefs",
    desc: "Following every court appearance, you receive a direct update detailing the bench's observations, orders passed, and next date of hearing.",
  },
];

export function ApproachPage() {
  return (
    <div className="bg-ink">
      <PageHeader
        badge="Methodology & Court Practice"
        title="Our Litigation Approach"
        subtitle="Rigorous preparation, unyielding courtroom advocacy, and candid advice. We believe that good legal work anticipates challenges, speaks plainly, and gives clients total confidence."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Our Approach" },
        ]}
      >
        <Button href="/contact">Schedule case assessment</Button>
      </PageHeader>

      {/* The Core 4 Stages */}
      <section className="py-24 md:py-36">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="max-w-2xl">
            <span className="t-label text-gilt">The Four Phases</span>
            <h2 className="display mt-3 text-[clamp(2.2rem,4vw,3.4rem)] font-light text-ivory">
              From First Audit to Final Enforcement
            </h2>
            <p className="mt-4 text-[1.0625rem] text-stone leading-[1.7]">
              Whether litigating a multi-million rupee commercial dispute or petitioning for fundamental rights before the High Court, our procedural discipline remains identical.
            </p>
          </div>

          <div className="mt-20 grid gap-12 lg:gap-16">
            {proceduralStages.map((stage) => (
              <div
                key={stage.step}
                className="relative rounded-2xl border border-line bg-forest/30 p-8 md:p-12 transition-colors duration-700 hover:border-line-strong"
              >
                <div className="grid gap-8 lg:grid-cols-12 lg:gap-12 items-start">
                  <div className="lg:col-span-4">
                    <span className="display text-5xl md:text-6xl text-gilt/80 font-light block">
                      {stage.step}
                    </span>
                    <span className="t-label mt-2 block text-stone/60 uppercase tracking-widest">
                      Phase: {stage.phase}
                    </span>
                    <h3 className="display mt-4 text-[1.85rem] font-light leading-[1.2] text-ivory">
                      {stage.title}
                    </h3>
                  </div>

                  <div className="lg:col-span-8">
                    <p className="text-[1.0625rem] leading-[1.75] text-stone">
                      {stage.desc}
                    </p>

                    <div className="mt-8 border-t border-line/60 pt-6">
                      <span className="t-label text-gilt block mb-4">Milestones & Safeguards:</span>
                      <ul className="grid sm:grid-cols-2 gap-3">
                        {stage.points.map((pt) => (
                          <li key={pt} className="flex items-start gap-3 text-[0.9375rem] text-ivory/85 leading-[1.6]">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gilt" aria-hidden />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Litigation vs ADR / Out-of-Court Settlement */}
      <section className="border-t border-line bg-deep py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-center">
            <div className="lg:col-span-6">
              <span className="t-label text-gilt">Strategy & Economic Prudence</span>
              <h2 className="display mt-4 text-[clamp(2.2rem,4vw,3.2rem)] font-light text-ivory">
                When to Fight. When to Settle.
              </h2>
              <p className="mt-6 text-[1.0625rem] leading-[1.75] text-stone">
                In Pakistani courts, aggressive litigation is sometimes the only way to preserve rights and freeze unlawful actions through stay orders. In other circumstances, prolonged dispute damages enterprise value and drains personal peace.
              </p>
              <p className="mt-4 text-[1.0625rem] leading-[1.75] text-stone">
                We provide our clients with blunt, realistic cost-benefit analyses. Where a negotiated compromise deed protects your capital better than three years in court, we negotiate from strength with the same ferocity we bring to the courtroom.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button href="/practice">Explore dispute areas</Button>
                <Link
                  to="/questions"
                  className="inline-flex items-center gap-2 text-[0.9375rem] text-stone hover:text-ivory underline underline-offset-4 decoration-line hover:decoration-gilt transition-colors"
                >
                  Read litigation FAQs →
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-2xl border border-line bg-forest/50 p-8 md:p-10">
                <h3 className="display text-2xl text-ivory mb-6">Our Litigation Criteria</h3>
                <ul className="space-y-6">
                  <li className="border-b border-line pb-5">
                    <h4 className="text-[1rem] font-medium text-gilt">Immediate Stay Necessity</h4>
                    <p className="mt-1 text-[0.9375rem] text-stone">
                      Where property title, municipal demolition, bank recovery actions, or arbitrary regulatory notices threaten irreparable harm.
                    </p>
                  </li>
                  <li className="border-b border-line pb-5">
                    <h4 className="text-[1rem] font-medium text-gilt">Clear Evidentiary Supremacy</h4>
                    <p className="mt-1 text-[0.9375rem] text-stone">
                      Where primary documents and registered deeds unambiguously favor our client and trial delay works in our favor.
                    </p>
                  </li>
                  <li>
                    <h4 className="text-[1rem] font-medium text-gilt">Protection of Liberty & Reputation</h4>
                    <p className="mt-1 text-[0.9375rem] text-stone">
                      Immediate pre-arrest bail, quashing of politically motivated or malicious FIRs, and anti-harassment injunctions.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The 4 Firm Commitments / Standards */}
      <section className="border-t border-line bg-ink py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="max-w-2xl">
            <span className="t-label text-gilt">Our Standards</span>
            <h2 className="display mt-3 text-[clamp(2.2rem,4vw,3.2rem)] font-light text-ivory">
              The A&H Client Commitment
            </h2>
            <p className="mt-4 text-[1.0625rem] text-stone">
              The principles governing how we treat every individual, family, and business that places their trust in our chambers.
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {standards.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.title} className="rounded-xl border border-line bg-forest/20 p-8 transition-colors duration-500 hover:border-gilt/60">
                  <Icon size={32} weight="light" className="text-gilt" />
                  <h3 className="display mt-6 text-[1.35rem] leading-[1.2] text-ivory">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-[0.9375rem] leading-[1.65] text-stone">
                    {s.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="border-t border-line bg-gradient-to-r from-forest via-moss to-ink py-20">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <span className="t-label text-gilt">Confidential Case Review</span>
            <h2 className="display mt-2 text-[clamp(2rem,3.5vw,2.8rem)] font-light text-ivory">
              Let us review your legal position.
            </h2>
            <p className="mt-2 text-stone max-w-xl text-[0.9875rem]">
              We evaluate your documents, explain your realistic prospects under Pakistani law, and outline our proposed strategy.
            </p>
          </div>
          <Button href="/contact">Book a consultation</Button>
        </div>
      </section>
    </div>
  );
}
