import { Link, useNavigate } from "@tanstack/react-router";
import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { FadedAside } from "@/components/faded-aside";
import { PageShell } from "@/components/page-shell";
import { office } from "@/lib/content";

export type Values = Record<string, unknown>;
type Row = Record<string, string | string[]>;

export type FieldDef = {
  k: string;
  l: string;
  t?: "text" | "num" | "date" | "email" | "tel" | "sel" | "radio" | "multi" | "area" | "cards";
  o?: string[];
  req?: boolean;
  wide?: boolean;
  ph?: string;
  notSure?: boolean;
  show?: (v: Values, row?: Row) => boolean;
  auto?: string;
};

export type StepDef = {
  id: string;
  title: string;
  intro?: string;
  note?: string;
  fields?: FieldDef[];
  repeat?: { key: string; label: string; max: number; fields: FieldDef[]; addLabel: string };
  after?: FieldDef[];
  show?: (v: Values) => boolean;
};

export const YN = ["Yes", "No"];
export const YNS = ["Yes", "No", "Not sure"];

const inputClass =
  "min-h-11 w-full border border-line bg-paper px-3 text-base text-ink outline-none focus-visible:border-gold";

export const has = (v: Values, k: string, item: string) => Array.isArray(v[k]) && (v[k] as string[]).includes(item);

function str(x: unknown) {
  return Array.isArray(x) ? x.join(", ") : typeof x === "string" ? x.trim() : "";
}

function Input({
  f,
  value,
  onChange,
  idPrefix,
}: {
  f: FieldDef;
  value: string | string[] | undefined;
  onChange: (val: string | string[]) => void;
  idPrefix: string;
}) {
  const id = `${idPrefix}${f.k}`;
  const t = f.t ?? "text";
  const opts = f.o ? (f.notSure && !f.o.includes("Not sure") ? [...f.o, "Not sure"] : f.o) : [];
  const label = (
    <span className="mb-2 block text-xs tracking-widest uppercase text-muted">
      {f.l}
      {f.req ? " *" : ""}
    </span>
  );
  const cls = `block ${f.wide || t === "area" || t === "multi" ? "sm:col-span-2" : ""}`;
  if (t === "cards") {
    return (
      <fieldset className="block sm:col-span-2">
        <legend className="mb-3 block text-xs tracking-widest uppercase text-muted">
          {f.l}
          {f.req ? " *" : ""}
        </legend>
        <div className="grid gap-3 sm:grid-cols-3">
          {opts.map((o) => {
            const on = value === o;
            return (
              <button
                key={o}
                type="button"
                aria-pressed={on}
                onClick={() => onChange(o)}
                className={`min-h-20 border-2 px-4 py-5 text-center text-xl ${
                  on ? "border-navy bg-navy text-cream" : "border-line bg-paper text-ink hover:border-navy"
                }`}
              >
                {o}
              </button>
            );
          })}
        </div>
      </fieldset>
    );
  }
  if (t === "radio" || t === "multi") {
    const arr = Array.isArray(value) ? value : [];
    return (
      <fieldset className={cls}>
        <legend className="mb-2 block text-xs tracking-widest uppercase text-muted">
          {f.l}
          {f.req ? " *" : ""}
        </legend>
        <div className="flex flex-wrap gap-2">
          {opts.map((o) => {
            const on = t === "multi" ? arr.includes(o) : value === o;
            return (
              <button
                key={o}
                type="button"
                aria-pressed={on}
                onClick={() =>
                  t === "multi" ? onChange(on ? arr.filter((x) => x !== o) : [...arr, o]) : onChange(on ? "" : o)
                }
                className={`min-h-11 border px-3 text-sm ${
                  on ? "border-navy bg-navy text-cream" : "border-line bg-paper text-ink"
                }`}
              >
                {o}
              </button>
            );
          })}
        </div>
      </fieldset>
    );
  }
  const v = typeof value === "string" ? value : "";
  return (
    <label htmlFor={id} className={cls}>
      {label}
      {t === "sel" ? (
        <select id={id} value={v} onChange={(e) => onChange(e.target.value)} className={inputClass}>
          <option value="">Select</option>
          {opts.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      ) : t === "area" ? (
        <textarea id={id} rows={3} value={v} placeholder={f.ph} onChange={(e) => onChange(e.target.value)} className={inputClass} />
      ) : (
        <input
          id={id}
          type={t === "num" ? "text" : t}
          inputMode={t === "num" ? "numeric" : undefined}
          autoComplete={f.auto}
          value={v}
          placeholder={f.ph}
          onChange={(e) => onChange(e.target.value)}
          className={inputClass}
        />
      )}
    </label>
  );
}

export const contactStep: StepDef = {
  id: "contact",
  title: "Contact",
  fields: [
    { k: "name", l: "Full name", req: true, wide: true, auto: "name" },
    { k: "phone", l: "Phone", t: "tel", req: true, auto: "tel" },
    { k: "email", l: "Email", t: "email", req: true, auto: "email" },
    { k: "mailing_address", l: "Mailing address", wide: true, auto: "street-address" },
    { k: "zip", l: "ZIP code", t: "num", req: true, auto: "postal-code" },
    { k: "preferred_contact", l: "Preferred contact", t: "sel", o: ["Phone", "Email", "Text"] },
    { k: "best_time", l: "Best time to reach you", t: "sel", o: ["Morning", "Midday", "Afternoon", "Evening", "Any time"] },
  ],
};

export const currentInsuranceFields: FieldDef[] = [
  { k: "effective_date", l: "Desired effective date", t: "date" },
  { k: "current_carrier", l: "Current carrier", ph: "or Not sure / none" },
  { k: "current_premium", l: "Current premium ($)", t: "num" },
  { k: "current_expiration", l: "Current policy expiration", t: "date" },
  {
    k: "referral_source",
    l: "How did you hear about us",
    t: "sel",
    o: ["Google", "Referral from a client", "Referral from a partner", "Social media", "Existing client", "Other"],
  },
  { k: "notes", l: "Anything else we should know", t: "area" },
];

export function QuoteWizard({
  kind,
  eyebrow,
  title,
  intro,
  steps,
}: {
  kind: "Personal" | "Commercial";
  eyebrow: string;
  title: string;
  intro: string;
  steps: StepDef[];
}) {
  const navigate = useNavigate();
  const [v, setV] = useState<Values>({});
  const [i, setI] = useState(0);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const honey = useRef<HTMLInputElement>(null);
  const top = useRef<HTMLDivElement>(null);

  const visible = steps.filter((s) => !s.show || s.show(v));
  const idx = Math.min(i, visible.length - 1);
  const step = visible[idx];
  const last = idx === visible.length - 1;

  const set = (k: string, val: unknown) => setV((p) => ({ ...p, [k]: val }));
  const rows = (key: string) => ((v[key] as Row[] | undefined) ?? [{}]) as Row[];
  const setRow = (key: string, r: number, k: string, val: string | string[]) => {
    const next = rows(key).map((row, j) => (j === r ? { ...row, [k]: val } : row));
    set(key, next);
  };

  function validate(): string {
    const missing = (step.fields ?? [])
      .concat(step.after ?? [])
      .filter((f) => f.req && (!f.show || f.show(v)) && !str(v[f.k]));
    if (missing.length) return `Please fill in: ${missing.map((f) => f.l).join(", ")}.`;
    if (step.id === "contact" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str(v.email)))
      return "Add a complete email address.";
    if (last && v.consent !== "yes") return "Please check the box to confirm we may use this information for your quote.";
    return "";
  }

  function go(d: number) {
    if (d > 0) {
      const msg = validate();
      if (msg) return setError(msg);
    }
    setError("");
    setI(Math.max(0, Math.min(idx + d, visible.length - 1)));
    top.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function payload() {
    const out: Record<string, string> = {};
    for (const s of visible) {
      for (const f of (s.fields ?? []).concat(s.after ?? [])) {
        if (f.show && !f.show(v)) continue;
        const x = str(v[f.k]);
        if (x) out[f.k] = x;
      }
      if (s.repeat) {
        rows(s.repeat.key).forEach((row, j) => {
          for (const f of s.repeat!.fields) {
            if (f.show && !f.show(v, row)) continue;
            const x = str(row[f.k]);
            if (x) out[`${s.repeat!.key}_${j + 1}_${f.k}`] = x;
          }
        });
      }
    }
    out.info_use_consent = v.consent === "yes" ? "yes" : "no";
    out.sms_call_consent = v.sms === "yes" ? "yes" : "no";
    return out;
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!last) return go(1);
    const msg = validate();
    if (msg) return setError(msg);
    if (honey.current?.value) return;
    setSending(true);
    setError("");
    try {
      const data = payload();
      const response = await fetch(`https://formsubmit.co/ajax/${office.email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `${kind} quote request · ${data.name ?? ""}`,
          _template: "table",
          _captcha: "false",
          _honey: "",
          form: `${kind} quote request`,
          ...data,
        }),
      });
      const res = (await response.json().catch(() => null)) as { success?: string } | null;
      if (!response.ok || res?.success === "false") {
        throw new Error(`The office could not receive this request. Call ${office.phoneDisplay}.`);
      }
      await navigate({ to: "/quote/thanks" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "The request did not send. Call the office.");
    } finally {
      setSending(false);
    }
  }

  const pct = Math.round(((idx + 1) / visible.length) * 100);

  return (
    <PageShell>
      <section className="relative overflow-hidden">
        <FadedAside src="/aside-quote.jpg" />
        <div ref={top} className="relative mx-auto grid max-w-6xl scroll-mt-24 gap-10 px-5 py-12 md:grid-cols-12 md:py-16">
          <div className="md:col-span-4">
            <p className="text-xs tracking-widest uppercase text-gold">{eyebrow}</p>
            <h1 className="mt-3 text-4xl text-ink md:text-5xl">{title}</h1>
            <p className="mt-5 text-base leading-relaxed text-ink-soft">{intro}</p>
            <ol className="mt-6 hidden space-y-1 md:block">
              {visible.map((s, j) => (
                <li key={s.id} className={`text-sm ${j === idx ? "font-medium text-navy" : j < idx ? "text-ink-soft" : "text-muted"}`}>
                  {j < idx ? "✓ " : `${j + 1}. `}
                  {s.title}
                </li>
              ))}
            </ol>
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
            <form onSubmit={onSubmit} noValidate className="relative z-10 border border-line bg-cream p-5 md:p-8">
              <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                <input ref={honey} type="text" name="_honey" tabIndex={-1} autoComplete="off" />
              </div>
              <div className="mb-6">
                <div className="flex items-baseline justify-between text-xs tracking-widest uppercase text-muted">
                  <span>
                    Step {idx + 1} of {visible.length}
                  </span>
                  <span>{pct}%</span>
                </div>
                <div className="mt-2 h-1.5 w-full bg-line" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
                  <div className="h-1.5 bg-navy transition-all" style={{ width: `${pct}%` }} />
                </div>
                <h2 className="mt-5 text-2xl text-ink md:text-3xl">{step.title}</h2>
                {step.intro ? <p className="mt-2 text-sm text-ink-soft">{step.intro}</p> : null}
              </div>

              {step.fields ? <Grid>{step.fields.filter((f) => !f.show || f.show(v)).map((f) => (
                <Input key={f.k} f={f} idPrefix="" value={v[f.k] as string} onChange={(x) => set(f.k, x)} />
              ))}</Grid> : null}

              {step.repeat ? (
                <div className="mt-6 space-y-6">
                  {rows(step.repeat.key).map((row, r) => (
                    <div key={r} className="border border-line bg-paper/60 p-4">
                      <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-xs tracking-widest uppercase text-gold">
                          {step.repeat!.label} {r + 1}
                        </h3>
                        {r > 0 ? (
                          <button
                            type="button"
                            className="min-h-11 text-sm text-gold underline-offset-4 hover:underline"
                            onClick={() => set(step.repeat!.key, rows(step.repeat!.key).filter((_, j) => j !== r))}
                          >
                            Remove
                          </button>
                        ) : null}
                      </div>
                      <Grid>
                        {step.repeat!.fields.filter((f) => !f.show || f.show(v, row)).map((f) => (
                          <Input
                            key={f.k}
                            f={f}
                            idPrefix={`${step.repeat!.key}${r}_`}
                            value={row[f.k]}
                            onChange={(x) => setRow(step.repeat!.key, r, f.k, x)}
                          />
                        ))}
                      </Grid>
                    </div>
                  ))}
                  {rows(step.repeat.key).length < step.repeat.max ? (
                    <button
                      type="button"
                      onClick={() => set(step.repeat!.key, [...rows(step.repeat!.key), {}])}
                      className="min-h-11 border border-navy px-4 text-sm text-navy hover:bg-navy hover:text-cream"
                    >
                      + {step.repeat.addLabel}
                    </button>
                  ) : null}
                </div>
              ) : null}

              {step.after ? <div className="mt-6"><Grid>{step.after.filter((f) => !f.show || f.show(v)).map((f) => (
                <Input key={f.k} f={f} idPrefix="" value={v[f.k] as string} onChange={(x) => set(f.k, x)} />
              ))}</Grid></div> : null}

              {step.note ? <p className="mt-5 border-l-2 border-gold pl-3 text-sm text-ink-soft">{step.note}</p> : null}

              {last ? (
                <div className="mt-8 space-y-4 border-t border-line pt-6 text-sm leading-relaxed text-ink-soft">
                  <label className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={v.consent === "yes"}
                      onChange={(e) => set("consent", e.target.checked ? "yes" : "")}
                      className="mt-1 size-5 shrink-0 accent-[#1f3a5f]"
                    />
                    <span>
                      I confirm this information is accurate and I authorize American Heritage Insurance Brokers,
                      Inc. to use it to get insurance quotes for me. A request does not bind coverage. *
                    </span>
                  </label>
                  <label className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={v.sms === "yes"}
                      onChange={(e) => set("sms", e.target.checked ? "yes" : "")}
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
              ) : null}

              {error ? (
                <p role="alert" className="mt-4 text-sm text-gold">
                  {error}
                </p>
              ) : null}
              <div className="mt-8 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  disabled={idx === 0}
                  className="min-h-11 border border-line px-5 text-sm text-ink disabled:invisible"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={sending}
                  className="inline-flex min-h-11 items-center justify-center bg-navy px-6 text-sm font-medium text-cream transition-colors duration-200 hover:bg-ink-soft disabled:opacity-60"
                >
                  {last ? (sending ? "Sending…" : "Send request") : "Next"}
                </button>
              </div>
              <p className="mt-4 text-xs text-muted">* Required. Everything else is optional. This does not bind coverage.</p>
            </form>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function Grid({ children }: { children: ReactNode }) {
  return <div className="grid gap-5 sm:grid-cols-2">{children}</div>;
}
