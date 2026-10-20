import { createFileRoute } from "@tanstack/react-router";
import { Check, ContactFields, Field, QuoteFormShell, Section } from "@/components/quote-kit";

export const Route = createFileRoute("/quote/commercial")({
  head: () => ({
    meta: [
      { title: "Commercial quote request · American Heritage Insurance Brokers, Inc." },
      { name: "description", content: "Request a business insurance quote. A request does not bind a policy." },
    ],
  }),
  component: CommercialQuote,
});

const coverages = [
  "General Liability",
  "Workers' Comp",
  "Commercial Auto",
  "Business Owner's Policy (BOP)",
  "Professional / E&O",
  "Umbrella",
];

function CommercialQuote() {
  return (
    <QuoteFormShell
      kind="Commercial"
      eyebrow="Commercial quote"
      title="Tell us about the business."
      intro="Fill in what you know. We compare quotes from multiple carriers and call you to go over the details."
    >
      <ContactFields />
      <Section title="Business">
        <Field label="Business name" name="business_name" autoComplete="organization" />
        <Field label="Industry / type of business" name="industry" />
        <Field label="Years in business" name="years_in_business" inputMode="numeric" />
        <Field label="Number of employees" name="employees" inputMode="numeric" />
        <Field label="Annual revenue ($)" name="annual_revenue" inputMode="numeric" />
      </Section>
      <Section title="Coverages wanted">
        {coverages.map((c) => (
          <Check key={c} label={c} name="coverages" value={c} />
        ))}
      </Section>
    </QuoteFormShell>
  );
}
