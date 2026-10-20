import { createFileRoute } from "@tanstack/react-router";
import { Check, ContactFields, Field, inputClass, QuoteFormShell, Section } from "@/components/quote-kit";

export const Route = createFileRoute("/quote/personal")({
  head: () => ({
    meta: [
      { title: "Personal quote request · American Heritage Insurance Brokers, Inc." },
      { name: "description", content: "Request an auto or home insurance quote. A request does not bind a policy." },
    ],
  }),
  component: PersonalQuote,
});

function Area({ label, name, placeholder }: { label: string; name: string; placeholder?: string }) {
  return (
    <label htmlFor={name} className="block sm:col-span-2">
      <span className="mb-2 block text-xs tracking-widest uppercase text-muted">{label}</span>
      <textarea id={name} name={name} rows={3} placeholder={placeholder} className={inputClass} />
    </label>
  );
}

function PersonalQuote() {
  return (
    <QuoteFormShell
      kind="Personal"
      eyebrow="Personal quote"
      title="Auto and home."
      intro="Fill in what you know and skip what you don't. We will call you to go over the details."
    >
      <ContactFields />
      <Section title="What are we quoting">
        <Check label="Personal Auto" name="lines" value="Personal Auto" />
        <Check label="Personal Home" name="lines" value="Personal Home" />
      </Section>
      <Section title="Auto">
        <Field label="Number of drivers" name="number_of_drivers" inputMode="numeric" />
        <div className="hidden sm:block" />
        <Area label="Driver names" name="driver_names" placeholder="One name per line" />
        <p className="text-sm text-ink-soft sm:col-span-2">We will call to verify driver details.</p>
        <Area label="Vehicles (year / make / model)" name="vehicles" placeholder="e.g. 2021 Toyota Camry" />
        <Field label="Current auto carrier" name="auto_current_carrier" />
        <Field label="Auto policy expiration" name="auto_expiration" type="date" />
      </Section>
      <Section title="Home">
        <Field label="Property address" name="home_address" autoComplete="street-address" className="sm:col-span-2" />
        <Field label="Year built" name="home_year_built" inputMode="numeric" />
        <Field label="Roof year" name="home_roof_year" inputMode="numeric" />
        <Field label="Current home carrier" name="home_current_carrier" />
        <Field label="Home policy expiration" name="home_expiration" type="date" />
      </Section>
    </QuoteFormShell>
  );
}
