import { useState, useSyncExternalStore, type FormEvent } from "react";
import {
  ArrowUpRight,
  CaretDown,
  Check,
  CircleNotch,
  EnvelopeSimple,
  MapPin,
  Phone,
  type Icon,
} from "@phosphor-icons/react";
import { Img } from "@/components/Img";
import { contact, firm, phoneText, photography, practiceGroups } from "@/lib/content";
import { getMatter, getServerMatter, setMatter, subscribeMatter } from "@/lib/matter-store";
import { submitEnquiry, type Enquiry } from "@/lib/enquiry";
import { cn } from "@/lib/cn";

type Status = "idle" | "submitting" | "success" | "error";
type Errors = Partial<Record<keyof Enquiry | "consent", string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values: Enquiry, consent: boolean): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!values.email.trim()) errors.email = "Please enter your email address.";
  else if (!emailPattern.test(values.email.trim()))
    errors.email = "That email address does not look right. Please check it.";
  if (values.message.trim().length < 10)
    errors.message = "Please tell us a little about the matter (at least 10 characters).";
  if (!consent) errors.consent = "Please confirm that you have read this before sending.";
  return errors;
}

type Detail = { icon: Icon; label: string; lines: { text: string; href?: string }[] };

const details: Detail[] = [
  { icon: Phone, label: "Telephone", lines: firm.phones.map((p) => ({ text: p.display, href: `tel:${p.tel}` })) },
  ...(firm.email
    ? [{ icon: EnvelopeSimple, label: "Email", lines: [{ text: firm.email, href: `mailto:${firm.email}` }] }]
    : []),
  { icon: MapPin, label: "Chambers", lines: firm.address.map((text) => ({ text })) },
];

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-[0.8125rem] tracking-[0.04em] text-stone">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-[0.8125rem] leading-snug text-coral">
          {error}
        </p>
      )}
    </div>
  );
}

export function Contact() {
  const matter = useSyncExternalStore(subscribeMatter, getMatter, getServerMatter);
  const [values, setValues] = useState<Omit<Enquiry, "matter">>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  const update =
    (key: keyof typeof values) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((v) => ({ ...v, [key]: e.target.value }));
      if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
    };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const found = validate({ ...values, matter }, consent);
    setErrors(found);
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0];
      document.getElementById(first === "consent" ? "consent" : `enquiry-${first}`)?.focus();
      return;
    }
    setStatus("submitting");
    try {
      await submitEnquiry({ ...values, matter });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const reset = () => {
    setValues({ name: "", email: "", phone: "", message: "" });
    setConsent(false);
    setErrors({});
    setMatter("");
    setStatus("idle");
  };

  const invalid = (k: keyof Errors) => (errors[k] ? true : undefined);
  const describedBy = (k: keyof Errors) => (errors[k] ? `enquiry-${k}-error` : undefined);

  return (
    <section id="contact" className="relative isolate overflow-hidden bg-forest py-32 md:py-44">
      {/* Background plate: gold-lettered law books, pushed far back */}
      <div aria-hidden className="photo absolute inset-0 -z-10 opacity-[0.22]">
        <Img id={photography.contact.id} alt="" sizes="100vw" />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,var(--color-forest),rgb(15_32_27/0.55)_30%,rgb(15_32_27/0.7)_70%,var(--color-deep))]"
      />

      <div className="mx-auto grid max-w-[1400px] gap-16 px-5 md:px-10 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          {/* Section label */}
          <div className="mb-8 flex items-center gap-4">
            <span className="h-px w-8 bg-gilt opacity-70" aria-hidden />
            <span className="t-label text-gilt">Get in touch</span>
          </div>

          <h2 className="display t-section" data-split>
            {contact.title}
          </h2>
          <p data-reveal className="mt-7 max-w-md">
            {contact.body}
          </p>
          <p data-reveal className="mt-4 text-[0.9rem] italic text-stone/70">
            {contact.note}
          </p>

          <ul data-stagger className="mt-14 grid gap-7">
            {details.map(({ icon: Icon, label, lines }) => (
              <li key={label} className="flex items-start gap-5">
                <Icon size={22} weight="light" className="mt-1 shrink-0 text-gilt" aria-hidden />
                <div>
                  <p className="text-[0.8125rem] tracking-[0.04em] text-stone">{label}</p>
                  {lines.map((line) => (
                    <div key={line.text}>
                      {line.href ? (
                        <a
                          href={line.href}
                          className="link-line link-quiet text-[1.0625rem] text-ivory transition-colors duration-700 ease-lux hover:text-gilt-soft"
                        >
                          {line.text}
                        </a>
                      ) : (
                        <p className="text-[1.0625rem] text-ivory">{line.text}</p>
                      )}
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Form: double-bezel plate (outer hairline shell, inner core) */}
        <div data-reveal className="lg:col-span-7">
          <div className="border border-line-strong p-2">
            <div className="bg-ink/90 p-7 shadow-[inset_0_1px_0_rgb(237_232_220/0.08)] md:p-12">
              {status === "success" ? (
                <div role="status" className="fade-up py-10 md:py-16">
                  <span className="grid size-14 place-items-center rounded-full border border-gilt text-gilt">
                    <Check size={24} weight="light" aria-hidden />
                  </span>
                  <h3 className="display t-title mt-8">Message received</h3>
                  <p className="mt-4 max-w-md">
                    Thank you{values.name ? `, ${values.name.split(" ")[0]}` : ""}. A lawyer will reply
                    within one working day. If your matter is urgent, call {phoneText}.
                  </p>
                  <button
                    type="button"
                    onClick={reset}
                    className="link-line mt-9 text-[0.9375rem] tracking-wide"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate aria-busy={status === "submitting"}>
                  <p className="mb-9 text-[0.875rem] text-stone">
                    All fields are required unless marked optional.
                  </p>

                  {status === "error" && (
                    <p
                      role="alert"
                      className="mb-8 border border-coral/50 px-5 py-4 text-[0.9375rem] text-coral"
                    >
                      We could not send your message. Please try again, or call {phoneText}.
                    </p>
                  )}

                  <div className="grid gap-x-10 gap-y-9 md:grid-cols-2">
                    <Field id="enquiry-name" label="Full name" error={errors.name}>
                      <input
                        id="enquiry-name"
                        name="name"
                        autoComplete="name"
                        className="field"
                        value={values.name}
                        onChange={update("name")}
                        aria-invalid={invalid("name")}
                        aria-describedby={describedBy("name")}
                        placeholder="Ayesha Malik"
                      />
                    </Field>
                    <Field id="enquiry-email" label="Email address" error={errors.email}>
                      <input
                        id="enquiry-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        spellCheck={false}
                        className="field"
                        value={values.email}
                        onChange={update("email")}
                        aria-invalid={invalid("email")}
                        aria-describedby={describedBy("email")}
                        placeholder="name@company.com"
                      />
                    </Field>
                    <Field id="enquiry-phone" label="Telephone (optional)">
                      <input
                        id="enquiry-phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        className="field"
                        value={values.phone}
                        onChange={update("phone")}
                        placeholder="+92 300 1234567"
                      />
                    </Field>
                    <Field id="enquiry-matter" label="Area of law (optional)">
                      <div className="relative">
                        <select
                          id="enquiry-matter"
                          name="matter"
                          autoComplete="off"
                          className="field pr-8"
                          value={matter}
                          onChange={(e) => setMatter(e.target.value)}
                        >
                          <option value="">Not sure yet</option>
                          {practiceGroups.map((a) => (
                            <option key={a.slug} value={a.slug}>
                              {a.name}
                            </option>
                          ))}
                        </select>
                        <CaretDown
                          size={16}
                          weight="light"
                          aria-hidden
                          className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-gilt"
                        />
                      </div>
                    </Field>
                    <div className="md:col-span-2">
                      <Field id="enquiry-message" label="How can we help?" error={errors.message}>
                        <textarea
                          id="enquiry-message"
                          name="message"
                          rows={4}
                          autoComplete="off"
                          className="field"
                          value={values.message}
                          onChange={update("message")}
                          aria-invalid={invalid("message")}
                          aria-describedby={describedBy("message")}
                          placeholder="A short summary of what is happening and what you need"
                        />
                      </Field>
                    </div>
                  </div>

                  <div className="mt-9">
                    <label className="flex cursor-pointer items-start gap-4">
                      <input
                        id="consent"
                        type="checkbox"
                        className="peer sr-only"
                        checked={consent}
                        onChange={(e) => {
                          setConsent(e.target.checked);
                          if (errors.consent) setErrors((er) => ({ ...er, consent: undefined }));
                        }}
                        aria-invalid={invalid("consent")}
                        aria-describedby={describedBy("consent")}
                      />
                      <span
                        aria-hidden
                        className={cn(
                          "mt-0.5 grid size-5 shrink-0 place-items-center border transition-colors duration-700 ease-lux",
                          "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-gilt",
                          consent ? "border-gilt bg-gilt text-ink" : "border-line-strong",
                          errors.consent && !consent && "border-coral",
                        )}
                      >
                        {consent && <Check size={13} weight="bold" />}
                      </span>
                      <span className="text-[0.875rem] leading-[1.6] text-stone">
                        I understand that sending this form does not create a lawyer-client
                        relationship, and that I should not include confidential documents.
                      </span>
                    </label>
                    {errors.consent && (
                      <p id="enquiry-consent-error" className="mt-2 text-[0.8125rem] text-coral">
                        {errors.consent}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="group mt-11 inline-flex items-center gap-5 rounded-full bg-gilt py-2 pl-7 pr-2 text-[0.9375rem] font-medium tracking-wide text-ink transition-[transform,background-color,opacity] duration-700 ease-lux hover:bg-gilt-soft active:scale-[0.98] disabled:cursor-wait disabled:opacity-80"
                  >
                    <span className="whitespace-nowrap">
                      {status === "submitting" ? "Sending" : "Send message"}
                    </span>
                    <span className="grid size-10 place-items-center rounded-full bg-ink text-gilt transition-transform duration-700 ease-lux group-enabled:group-hover:-translate-y-px group-enabled:group-hover:translate-x-0.5 group-enabled:group-hover:scale-105">
                      {status === "submitting" ? (
                        <CircleNotch size={18} weight="light" className="animate-spin" aria-hidden />
                      ) : (
                        <ArrowUpRight size={18} weight="light" aria-hidden />
                      )}
                    </span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
