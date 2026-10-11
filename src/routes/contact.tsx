import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent, type ReactNode } from "react";
import { FadedAside } from "@/components/faded-aside";
import { PageShell } from "@/components/page-shell";
import { office } from "@/lib/content";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact · American Heritage Insurance Brokers, Inc." },
      {
        name: "description",
        content:
          "Office address, phone, email, and hours for American Heritage Insurance Brokers, Inc. in Aurora.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    if (!name.trim()) {
      setError("Add your name so we know who to call back.");
      return;
    }
    if (!phone.trim() && !email.trim()) {
      setError("Add a phone number or an email.");
      return;
    }
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("That email does not look complete.");
      return;
    }
    if (!message.trim()) {
      setError("Add a short message.");
      return;
    }
    setSending(true);
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${office.email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `Contact · ${name.trim()}`,
          _template: "table",
          _captcha: "false",
          name: name.trim(),
          phone: phone.trim() || "not provided",
          email: email.trim() || "not provided",
          message: message.trim(),
        }),
      });
      const payload = (await response.json().catch(() => null)) as { success?: string } | null;
      if (!response.ok || payload?.success === "false") {
        throw new Error("The office could not receive this message. Call (720) 748-3893.");
      }
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "The message did not send. Call the office.");
    } finally {
      setSending(false);
    }
  }

  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(office.address)}&output=embed`;

  return (
    <PageShell>
      <section className="relative overflow-hidden">
        <FadedAside src="/aside-contact.jpg" />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-5 py-12 md:grid-cols-2 md:py-16">
        <div>
          <p className="text-xs tracking-widest uppercase text-gold">Contact</p>
          <h1 className="mt-3 text-4xl text-ink md:text-5xl">The office in Aurora.</h1>
          <dl className="mt-8 divide-y divide-line border-y border-line text-base">
            <Row term="Address">
              <a href={office.mapsHref} className="underline-offset-4 hover:underline" target="_blank" rel="noreferrer">
                {office.address}
              </a>
            </Row>
            <Row term="Phone">
              <a href={office.phoneHref} className="text-lg text-ink">
                {office.phoneDisplay}
              </a>
            </Row>
            <Row term="Email">
              <a href={office.emailHref}>{office.email}</a>
            </Row>
            <Row term="Hours">{office.hours}</Row>
          </dl>
          <a
            href={office.phoneHref}
            className="mt-8 inline-flex min-h-12 items-center bg-navy px-5 text-base font-medium text-cream"
          >
            Call {office.phoneDisplay}
          </a>
        </div>

        <div>
          {sent ? (
            <div className="border border-line bg-cream p-8">
              <h2 className="text-3xl text-ink">The office has your message.</h2>
              <p className="mt-4 text-base leading-relaxed text-ink-soft">
                We will follow up at the phone or email you gave.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="relative z-10 border border-line bg-cream p-6" noValidate>
              <h2 className="text-2xl text-ink">Send a message</h2>
              <label className="mt-5 block">
                <span className="mb-2 block text-base text-ink">Name</span>
                <input
                  name="name"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputClass}
                />
              </label>
              <label className="mt-4 block">
                <span className="mb-2 block text-base text-ink">Phone</span>
                <input
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={inputClass}
                />
              </label>
              <label className="mt-4 block">
                <span className="mb-2 block text-base text-ink">Email</span>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass}
                />
              </label>
              <label className="mt-4 block">
                <span className="mb-2 block text-base text-ink">Message</span>
                <textarea
                  name="message"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={inputClass}
                />
              </label>
              {error ? (
                <p role="alert" className="mt-4 text-base text-gold">
                  {error}
                </p>
              ) : null}
              <button
                type="submit"
                disabled={sending}
                className="mt-6 inline-flex min-h-11 items-center bg-navy px-5 text-base font-medium text-cream disabled:opacity-60"
              >
                {sending ? "Sending…" : "Send message"}
              </button>
            </form>
          )}
        </div>
        </div>
      </section>

      <section className="border-t border-line">
        <iframe
          title="Map of American Heritage Insurance Brokers, Inc."
          src={mapSrc}
          className="h-80 w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>

      <section className="mx-auto max-w-6xl px-5 py-8">
        <Link to="/quote" className="text-base text-gold underline-offset-4 hover:underline">
          Request a quote instead
        </Link>
      </section>
    </PageShell>
  );
}

const inputClass =
  "min-h-11 w-full border border-line bg-paper px-3 text-base text-ink outline-none focus-visible:border-gold";

function Row({ term, children }: { term: string; children: ReactNode }) {
  return (
    <div className="grid gap-1 py-4 sm:grid-cols-3">
      <dt className="text-base text-muted">{term}</dt>
      <dd className="text-ink sm:col-span-2">{children}</dd>
    </div>
  );
}
