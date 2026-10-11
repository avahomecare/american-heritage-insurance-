import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent, type ReactNode } from "react";
import { FadedAside } from "@/components/faded-aside";
import { PageShell } from "@/components/page-shell";
import { lines, office } from "@/lib/content";

export const Route = createFileRoute("/quote")({
  validateSearch: (search: Record<string, unknown>): { kind?: "personal" | "business" } => {
    if (search.kind === "business") return { kind: "business" };
    if (search.kind === "personal") return { kind: "personal" };
    return {};
  },
  head: () => ({
    meta: [
      { title: "Request a quote · American Heritage Insurance Brokers, Inc." },
      {
        name: "description",
        content:
          "Tell American Heritage Insurance Brokers, Inc. what you need covered. A request does not bind a policy.",
      },
    ],
  }),
  component: QuotePage,
});

type Kind = "personal" | "business";

type FormState = {
  kind: Kind;
  name: string;
  phone: string;
  email: string;
  line: string;
  industry: string;
  employees: string;
  dot: string;
  detail: string;
};

function QuotePage() {
  const search = Route.useSearch();
  const [form, setForm] = useState<FormState>({
    kind: search.kind ?? "personal",
    name: "",
    phone: "",
    email: "",
    line: "",
    industry: "",
    employees: "",
    dot: "",
    detail: "",
  });
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    if (!form.name.trim()) {
      setError("Add your name so we know who to call back.");
      return;
    }
    if (!form.phone.trim() && !form.email.trim()) {
      setError("Add a phone number or an email.");
      return;
    }
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      setError("That email does not look complete.");
      return;
    }
    setSending(true);
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${office.email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `Quote request · ${form.kind} · ${form.name.trim()}`,
          _template: "table",
          _captcha: "false",
          name: form.name.trim(),
          phone: form.phone.trim() || "not provided",
          email: form.email.trim() || "not provided",
          kind: form.kind,
          coverage: form.line || "not specified",
          industry: form.kind === "business" ? form.industry.trim() : "",
          employees: form.kind === "business" ? form.employees.trim() : "",
          dot: form.kind === "business" ? form.dot.trim() : "",
          detail: form.detail.trim(),
        }),
      });
      const payload = (await response.json().catch(() => null)) as { success?: string } | null;
      if (!response.ok || payload?.success === "false") {
        throw new Error("The office could not receive this request. Call (720) 748-3893.");
      }
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "The request did not send. Call the office.");
    } finally {
      setSending(false);
    }
  }

  const personal = lines.filter((line) => line.group === "Personal");
  const commercial = lines.filter((line) => line.group === "Commercial");

  return (
    <PageShell>
      <section className="relative overflow-hidden">
        <FadedAside src="/aside-quote.jpg" />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-5 py-12 md:grid-cols-12 md:py-16">
        <div className="md:col-span-5">
          <p className="text-xs tracking-widest uppercase text-gold">Quote request</p>
          <h1 className="mt-3 text-4xl text-ink md:text-5xl">Tell us what needs to be covered.</h1>
          <p className="mt-5 text-base leading-relaxed text-ink-soft">
            This goes to the office by email. It is a request for a conversation, not an application
            that binds coverage.
          </p>
        </div>
        <div className="md:col-span-7">
          {sent ? (
            <div className="border border-line bg-cream p-8">
              <p className="text-xs tracking-widest uppercase text-gold">Request received</p>
              <h2 className="mt-3 text-3xl text-ink">The office has your note.</h2>
              <p className="mt-4 text-base leading-relaxed text-ink-soft">
                We will follow up at the phone or email you gave. Coverage is not bound.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="relative z-10 border border-line bg-cream p-6 md:p-8" noValidate>
              <fieldset>
                <legend className="mb-3 text-xs tracking-widest uppercase text-muted">
                  What are we quoting
                </legend>
                <div className="grid grid-cols-2 gap-3">
                  {(["personal", "business"] as const).map((kind) => (
                    <button
                      key={kind}
                      type="button"
                      aria-pressed={form.kind === kind}
                      onClick={() => update("kind", kind)}
                      className={`min-h-11 border px-3 text-sm uppercase tracking-widest ${
                        form.kind === kind
                          ? "border-navy bg-navy text-cream"
                          : "border-line bg-paper text-ink"
                      }`}
                    >
                      {kind}
                    </button>
                  ))}
                </div>
              </fieldset>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <Field label="Name" htmlFor="name">
                  <input
                    id="name"
                    name="name"
                    autoComplete="name"
                    required
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    className={inputClass}
                  />
                </Field>
                <Field label="Phone" htmlFor="phone">
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    className={inputClass}
                  />
                </Field>
                <Field label="Email" htmlFor="email" className="sm:col-span-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    className={inputClass}
                  />
                </Field>
                <Field label="Coverage" htmlFor="line" className="sm:col-span-2">
                  <select
                    id="line"
                    name="line"
                    value={form.line}
                    onChange={(e) => update("line", e.target.value)}
                    className={inputClass}
                  >
                    <option value="">Select a line</option>
                    {(form.kind === "personal" ? personal : commercial).map((line) => (
                      <option key={line.id} value={line.title}>
                        {line.title}
                      </option>
                    ))}
                  </select>
                </Field>
                {form.kind === "business" ? (
                  <>
                    <Field label="Industry" htmlFor="industry">
                      <input
                        id="industry"
                        name="industry"
                        value={form.industry}
                        onChange={(e) => update("industry", e.target.value)}
                        className={inputClass}
                      />
                    </Field>
                    <Field label="Employees" htmlFor="employees">
                      <input
                        id="employees"
                        name="employees"
                        inputMode="numeric"
                        value={form.employees}
                        onChange={(e) => update("employees", e.target.value)}
                        className={inputClass}
                      />
                    </Field>
                    <Field label="DOT number, if you run trucks" htmlFor="dot" className="sm:col-span-2">
                      <input
                        id="dot"
                        name="dot"
                        value={form.dot}
                        onChange={(e) => update("dot", e.target.value)}
                        className={inputClass}
                      />
                    </Field>
                  </>
                ) : null}
                <Field label="What should we know" htmlFor="detail" className="sm:col-span-2">
                  <textarea
                    id="detail"
                    name="detail"
                    rows={5}
                    value={form.detail}
                    onChange={(e) => update("detail", e.target.value)}
                    className={inputClass}
                  />
                </Field>
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
                <p className="text-xs leading-relaxed text-muted">
                  Phone or email is required. This does not bind coverage.
                </p>
              </div>
            </form>
          )}
        </div>
        </div>
      </section>
    </PageShell>
  );
}

const inputClass =
  "min-h-11 w-full border border-line bg-paper px-3 text-base text-ink outline-none focus-visible:border-gold";

function Field({
  label,
  htmlFor,
  children,
  className,
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label htmlFor={htmlFor} className={`block ${className ?? ""}`}>
      <span className="mb-2 block text-xs tracking-widest uppercase text-muted">{label}</span>
      {children}
    </label>
  );
}
