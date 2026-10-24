import { Phone, MapPin, Clock, ShieldCheck } from "@phosphor-icons/react";
import { PageHeader } from "@/components/PageHeader";
import { Contact } from "@/components/Contact";
import { firm } from "@/lib/content";

export function ContactPage() {
  return (
    <div className="bg-ink">
      <PageHeader
        badge="Chambers at Lahore High Court"
        title="Consult With an Advocate"
        subtitle="Confidential meetings by appointment at 1 Turner Road, near the Lahore High Court, or via secure telephone and video conference. Inquiries are reviewed by a partner within hours."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact & Consultation" },
        ]}
      />

      {/* Direct Partner Lines & Chambers Access */}
      <section className="border-b border-line bg-deep/90 py-16 md:py-20">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-start">
            <div className="lg:col-span-6">
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-6 bg-gilt" aria-hidden />
                <span className="t-label text-gilt">Direct Partner Access</span>
              </div>
              <h2 className="display text-[clamp(2.2rem,3.8vw,3.2rem)] font-light leading-[1.15] text-ivory">
                Speak directly with an Advocate of the High Court
              </h2>
              <p className="mt-5 text-[1.0625rem] leading-[1.75] text-stone">
                Our chambers sit two minutes from the Lahore High Court at 1 Turner Road. For urgent injunctions, bails, or business advisory, our partners are accessible directly without gatekeepers or junior delegation.
              </p>
              <div className="mt-8 flex items-center gap-3 text-[0.875rem] text-stone/80">
                <ShieldCheck size={20} className="text-gilt shrink-0" />
                <span>Protected by legal professional privilege under Article 9 Qanun-e-Shahadat Order 1984.</span>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-4">
              <div className="rounded-2xl border border-line bg-forest/40 p-6 md:p-8 transition-colors duration-500 hover:border-line-strong">
                <div className="flex items-center justify-between">
                  <span className="t-label text-gilt">Senior Partner</span>
                  <span className="text-[0.75rem] uppercase tracking-wider text-stone/50">LHCBA</span>
                </div>
                <h3 className="display mt-2 text-2xl text-ivory font-light">
                  Azhaar Ahmad Choudhary
                </h3>
                <p className="mt-1 text-[0.875rem] text-stone">
                  Constitutional Writs, Civil Litigation & Land Revenue
                </p>
                <a
                  href={`tel:${firm.phones[0].tel}`}
                  className="mt-4 inline-flex items-center gap-3 text-[0.9375rem] font-medium text-gilt hover:text-gilt-soft transition-colors"
                >
                  <Phone size={16} />
                  <span>Call directly: {firm.phones[0].display}</span>
                </a>
              </div>

              <div className="rounded-2xl border border-line bg-forest/40 p-6 md:p-8 transition-colors duration-500 hover:border-line-strong">
                <div className="flex items-center justify-between">
                  <span className="t-label text-gilt">Managing Partner</span>
                  <span className="text-[0.75rem] uppercase tracking-wider text-stone/50">LHCBA</span>
                </div>
                <h3 className="display mt-2 text-2xl text-ivory font-light">
                  Haris Ali Choudhary
                </h3>
                <p className="mt-1 text-[0.875rem] text-stone">
                  Criminal Defence, NAB, FIA & Tax Advisory
                </p>
                <a
                  href={`tel:${firm.phones[1].tel}`}
                  className="mt-4 inline-flex items-center gap-3 text-[0.9375rem] font-medium text-gilt hover:text-gilt-soft transition-colors"
                >
                  <Phone size={16} />
                  <span>Call directly: {firm.phones[1].display}</span>
                </a>
              </div>

              <div className="rounded-xl border border-line bg-forest/20 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[0.8125rem] text-stone">
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-gilt shrink-0" />
                  <span>1 Turner Road, Near LHC, Lahore</span>
                </div>
                <div className="flex items-center gap-2 text-stone/60">
                  <Clock size={15} className="shrink-0" />
                  <span>Mon–Sat 9AM–7PM · Urgent 24/7</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The dedicated consultation & enquiry form */}
      <Contact />
    </div>
  );
}
