import { createFileRoute } from "@tanstack/react-router";
import { contactStep, currentInsuranceFields, has, QuoteWizard, YNS, type StepDef, type Values } from "@/components/quote-wizard";

export const Route = createFileRoute("/quote/commercial")({
  head: () => ({
    meta: [
      { title: "Commercial quote request · American Heritage Insurance Brokers, Inc." },
      { name: "description", content: "Request a business insurance quote. A request does not bind a policy." },
    ],
  }),
  component: CommercialQuote,
});

const property = (v: Values) => has(v, "coverages", "Commercial Property") || has(v, "coverages", "Business Owner's Policy (BOP)");
const autoOn = (v: Values) => has(v, "coverages", "Commercial Auto");

const steps: StepDef[] = [
  {
    ...contactStep,
    fields: [
      ...contactStep.fields!.slice(0, 1),
      { k: "contact_title", l: "Your title" },
      ...contactStep.fields!.slice(1),
    ],
  },
  {
    id: "business",
    title: "The business",
    fields: [
      { k: "legal_name", l: "Legal business name" },
      { k: "dba", l: "DBA (if any)" },
      { k: "physical_address", l: "Physical address, if different from mailing", wide: true },
      { k: "locations", l: "Number of locations", t: "num" },
      { k: "website", l: "Website" },
      { k: "entity_type", l: "Entity type", t: "sel", o: ["LLC", "Corporation", "S-Corp", "Partnership", "Sole proprietor", "Non-profit"], notSure: true },
      { k: "year_started", l: "Year started", t: "num" },
      { k: "fein", l: "FEIN (optional)" },
      { k: "naics", l: "NAICS code (optional)" },
      { k: "operations", l: "What does the business do", t: "area", req: true, ph: "Describe your operations, products and services" },
    ],
  },
  {
    id: "operations",
    title: "Revenue and people",
    fields: [
      { k: "annual_revenue", l: "Annual revenue ($)", ph: "or Not sure" },
      { k: "annual_payroll", l: "Annual payroll ($)", ph: "or Not sure" },
      { k: "ft_employees", l: "Full-time employees", t: "num" },
      { k: "pt_employees", l: "Part-time employees", t: "num" },
      { k: "subcontractors", l: "Use subcontractors", t: "radio", o: YNS },
      { k: "subcontract_percent", l: "% of work subcontracted", show: (v) => v.subcontractors === "Yes" },
      { k: "subcontract_certs", l: "Collect certificates of insurance from subs", t: "radio", o: YNS, show: (v) => v.subcontractors === "Yes" },
      { k: "work_outside_co", l: "Work outside Colorado", t: "radio", o: YNS },
      { k: "job_titles", l: "Job titles and counts", t: "area", ph: "e.g. 3 installers, 1 office manager" },
    ],
  },
  {
    id: "coverage",
    title: "Coverage wanted",
    fields: [
      {
        k: "coverages",
        l: "Coverages",
        t: "multi",
        o: [
          "General Liability",
          "Business Owner's Policy (BOP)",
          "Commercial Property",
          "Commercial Auto",
          "Workers' Comp",
          "Professional / E&O",
          "Cyber",
          "Umbrella",
          "Bonds",
          "Not sure",
        ],
      },
      { k: "limits", l: "Limits needed", ph: "e.g. 1M/2M, or per contract, or Not sure", wide: true },
      { k: "additional_insured", l: "Need to add additional insureds", t: "radio", o: YNS },
    ],
  },
  {
    id: "property",
    title: "Property",
    show: property,
    fields: [
      { k: "own_lease", l: "Own or lease the building", t: "radio", o: ["Own", "Lease", "Not sure"] },
      { k: "bldg_construction", l: "Construction", t: "sel", o: ["Frame", "Joisted masonry", "Non-combustible", "Masonry non-combustible", "Fire resistive"], notSure: true },
      { k: "bldg_year_built", l: "Year built", t: "num" },
      { k: "bldg_sq_ft", l: "Square feet", t: "num" },
      { k: "bldg_protection", l: "Protection", t: "multi", o: ["Sprinklers", "Burglar alarm", "Fire alarm"] },
      { k: "building_value", l: "Building value ($)", ph: "or Not sure" },
      { k: "bpp_value", l: "Business personal property ($)", ph: "or Not sure" },
      { k: "business_income", l: "Business income coverage", t: "radio", o: YNS },
    ],
  },
  {
    id: "auto",
    title: "Commercial auto",
    show: autoOn,
    fields: [
      { k: "number_of_vehicles", l: "Number of vehicles", t: "num" },
      { k: "number_of_drivers", l: "Number of drivers", t: "num" },
      { k: "garaging_zip", l: "Garaging ZIP", t: "num" },
      { k: "radius", l: "Radius of operation", t: "sel", o: ["Local (under 50 mi)", "Intermediate (50-200 mi)", "Long haul (200+ mi)"], notSure: true },
      { k: "hauling", l: "What do you haul", wide: true, ph: "or None" },
      { k: "vehicle_list", l: "Vehicles: year / make / model / VIN (optional)", t: "area", ph: "One per line" },
    ],
  },
  {
    id: "history",
    title: "Insurance history and notes",
    fields: [
      ...currentInsuranceFields.slice(0, 4),
      { k: "eo_retro_date", l: "E&O retroactive date", t: "date", show: (v) => has(v, "coverages", "Professional / E&O") },
      { k: "losses_5yrs", l: "Losses or claims in the last 5 years", t: "radio", o: YNS },
      { k: "losses_description", l: "Describe losses", t: "area", show: (v) => v.losses_5yrs === "Yes" },
      { k: "cancelled", l: "Policy cancelled or non-renewed in the last 3 years", t: "radio", o: YNS },
      ...currentInsuranceFields.slice(4),
    ],
  },
];

function CommercialQuote() {
  return (
    <QuoteWizard
      kind="Commercial"
      eyebrow="Commercial quote"
      title="Tell us about the business."
      intro="A few short steps. Only the basics are required — we compare quotes from multiple carriers and call you to go over the rest."
      steps={steps}
    />
  );
}
