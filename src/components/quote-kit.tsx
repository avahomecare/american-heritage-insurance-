import { Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent, type ReactNode } from "react";
import { FadedAside } from "@/components/faded-aside";
import { PageShell } from "@/components/page-shell";
import { office } from "@/lib/content";

export const inputClass =
  "min-h-11 w-full border border-line bg-paper px-3 text-base text-ink outline-none focus-visible:border-gold";

export function Field({
  label,
  name,
  className,
  type = "text",
  required,
  autoComplete,
  inputMode,
  placeholder,
}: {
  label: string;
  name: string;
  className?: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  inputMode?: "numeric" | "text" | "tel" | "email";
  placeholder?: string;
}) {
  return (
    <label htmlFor={name} className={`block ${className ?? ""}`}>
      <span className="mb-2 block text-xs tracking-widest uppercase text-muted">
        {label}
        {required ? " *" : ""}
      </span>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        inputMode={inputMode}
        placeholder={placeholder}
        className={inputClass}
      />
    </label>
  );
}

export function Check({ label, name, value }: { label: string; name: string; value?: string }) {
  return (
    <label className="flex min-h-11 items-center gap-3 text-base text-ink">
      <input type="checkbox" name={name} value={value ?? "yes"} className="size-5 accent-[#1f3a5f]" />
      {label}
    </label>
  );
}

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <fieldset className="mt-8 first:mt-0">
      <legend className="mb-4 text-xs tracking-widest uppercase text-gold">{title}</legend>
      <div className="grid gap-5 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}

export function ContactFields() {
  return (
    <Section title="Contact">
      <Field label="Full name" name="name" autoComplete="name" required className="sm:col-span-2" />
      <Field label="Phone" name="phone" type="tel" autoComplete="tel" required />
      <Field label="Email" name="email" type="email" autoComplete="email" required />
      <Field label="ZIP code" name="zip" autoComplete="postal-code" inputMode="numeric" />
      <label htmlFor="preferred" className="block">
        <span className="mb-2 block text-xs tracking-widest uppercase text-muted">Preferred contact</span>
        <select id="preferred" name="preferred_contact" className={inputClass}>
          <option>Phone</option>
          <option>Email</option>
          <option>Text</option>
        </select>
      </label>
    </Section>
  );
}

function collect(data: FormData) {
  const out: Record<string, string> = {};
  for (const [key, value] of data.entries()) {
    const v = String(value).trim();
    if (!v) continue;
    out[key] = out[key] ? `${out[key]}, ${v}` : v;
  }
  return out;
}

export function QuoteFormShell({
  kind,
  eyebrow,
  title,
  intro,
  children,
}: {
  kind: "Personal" | "Commercial";
  eyebrow: string;
  title: string;
  intro: string;
  children: ReactNode;
}) {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const fields = collect(new FormData(event.currentTarget));
    // Honeypot: real visitors never see or fill this field.
    if (fields._honey) return;
    if (!fields.name) return setError("Add your name so we know who to call back.");
    if (!fields.phone) return setError("Add a phone number.");
    if (!fields.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
      return setError("Add a complete email address.");
    if (!fields.consent) return setError("Please check the box to confirm we may use this information for your quote.");
    setSending(true);
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${office.email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `${kind} quote request · ${fields.name}`,
          _template: "table",
          _captcha: "false",
          _honey: "",
          form: `${kind} quote request`,
          ...fields,
          sms_call_consent: fields.sms_call_consent ? "yes" : "no",
        }),
      });
      const payload = (await response.json().catch(() => null)) as { success?: string } | null;
      if (!response.ok || payload?.success === "false") {
        throw new Error(`The office could not receive this request. Call ${office.phoneDisplay}.`);
      }
      await navigate({ to: "/quote/thanks" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "The request did not send. Call the office.");
    } finally {
      setSending(false);
    }
  }

  return (
    <PageShell>
      <section className="relative overflow-hidden">
        <FadedAside src="/aside-quote.jpg" />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-5 py-12 md:grid-cols-12 md:py-16">
          <div className="md:col-span-4">
            <p className="text-xs tracking-widest uppercase text-gold">{eyebrow}</p>
            <h1 className="mt-3 text-4xl text-ink md:text-5xl">{title}</h1>
            <p className="mt-5 text-base leading-relaxed text-ink-soft">{intro}</p>
            <p className="mt-6 text-sm text-muted">Prefer to talk?</p>
            <a
              href="tel:7207483893"
              className="mt-2 inline-flex min-h-11 items-center border border-navy px-4 text-base text-navy hover:bg-navy hover:text-cream"
            >
              Call 720.748.3893
            </a>
            <div>
              <Link to="/quote" className="mt-5 inline-flex text-sm text-gold underline-offset-4 hover:underline">
                ← Choose a different quote
              </Link>
            </div>
          </div>
          <div className="md:col-span-8">
            <form onSubmit={onSubmit} noValidate className="relative z-10 border border-line bg-cream p-6 md:p-8">
              <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                <label>
                  Leave this empty
                  <input type="text" name="_honey" tabIndex={-1} autoComplete="off" />
                </label>
              </div>
              {children}
              <Section title="Comments">
                <label htmlFor="comments" className="block sm:col-span-2">
                  <span className="mb-2 block text-xs tracking-widest uppercase text-muted">
                    Anything else we should know
                  </span>
                  <textarea id="comments" name="comments" rows={4} className={inputClass} />
                </label>
              </Section>
              <div className="mt-8 space-y-4 border-t border-line pt-6 text-sm leading-relaxed text-ink-soft">
                <label className="flex items-start gap-3">
                  <input type="checkbox" name="consent" value="yes" className="mt-1 size-5 shrink-0 accent-[#1f3a5f]" />
                  <span>
                    I confirm this information is accurate and I authorize American Heritage Insurance Brokers,
                    Inc. to use it to get insurance quotes for me. A request does not bind coverage. *
                  </span>
                </label>
                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    name="sms_call_consent"
                    value="yes"
                    className="mt-1 size-5 shrink-0 accent-[#1f3a5f]"
                  />
                  <span>
                    Optional: I agree to receive calls and text messages from American Heritage Insurance
                    Brokers, Inc. at the phone number above about my quote, including by automated means.
                    Message and data rates may apply. Message frequency varies. Reply STOP to opt out or HELP
                    for help. Consent is not a condition of purchase. See our{" "}
                    <Link to="/privacy" className="text-gold underline-offset-4 hover:underline">
                      Privacy Policy
                    </Link>
                    .
                  </span>
                </label>
              </div>
              {error ? (
                <p role="alert" className="mt-4 text-sm text-gold">
                  {error}
                </p>
              ) : null}
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  disabled={sending}
                  className="inline-flex min-h-11 items-center justify-center bg-navy px-5 text-sm font-medium text-cream transition-colors duration-200 hover:bg-ink-soft disabled:opacity-60"
                >
                  {sending ? "Sending…" : "Send request"}
                </button>
                <p className="text-xs leading-relaxed text-muted">* Required. This does not bind coverage.</p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
