import { createFileRoute } from "@tanstack/react-router";
import { contactStep, currentInsuranceFields, has, QuoteWizard, YN, YNS, type StepDef, type Values } from "@/components/quote-wizard";

export const Route = createFileRoute("/quote/personal")({
  head: () => ({
    meta: [
      { title: "Personal quote request · American Heritage Insurance Brokers, Inc." },
      { name: "description", content: "Request an auto or home insurance quote. A request does not bind a policy." },
    ],
  }),
  component: PersonalQuote,
});

const auto = (v: Values) => has(v, "lines", "Personal Auto");
const home = (v: Values) => has(v, "lines", "Personal Home");
const count = ["1", "2", "3", "4", "5", "6"];

const steps: StepDef[] = [
  contactStep,
  {
    id: "household",
    title: "What are we quoting",
    fields: [
      { k: "lines", l: "Coverage needed", t: "multi", o: ["Personal Auto", "Personal Home"], req: true },
      { k: "own_rent", l: "Do you own or rent", t: "radio", o: ["Own", "Rent", "Other"] },
      { k: "years_at_address", l: "Years at current address", t: "num" },
    ],
  },
  {
    id: "drivers",
    title: "Drivers",
    show: auto,
    fields: [{ k: "number_of_drivers", l: "Number of drivers in the household", t: "sel", o: count, req: true }],
    repeat: {
      key: "driver",
      label: "Driver",
      addLabel: "Add a driver",
      max: 6,
      fields: [
        { k: "first_name", l: "First name" },
        { k: "last_name", l: "Last name" },
        { k: "relationship", l: "Relationship to you", t: "sel", o: ["Self", "Spouse / partner", "Child", "Parent", "Other relative", "Other"] },
        { k: "marital_status", l: "Marital status", t: "sel", o: ["Single", "Married", "Divorced", "Widowed", "Domestic partner"] },
        { k: "years_licensed", l: "Years licensed", t: "num" },
        { k: "occupation", l: "Occupation" },
        { k: "good_student", l: "Good student (B average or better)", t: "radio", o: ["Yes", "No", "N/A"] },
        { k: "incidents", l: "Accidents, violations or claims in the last 5 years", t: "radio", o: YNS },
        { k: "incidents_description", l: "Describe (type and approximate date)", t: "area", show: (_v, r) => r?.incidents === "Yes" },
        { k: "suspended", l: "License ever suspended or revoked", t: "radio", o: YNS },
        { k: "sr22", l: "SR-22 required", t: "radio", o: YNS },
      ],
    },
    note: "We will call to verify driver license and date of birth.",
  },
  {
    id: "vehicles",
    title: "Vehicles",
    show: auto,
    fields: [{ k: "number_of_vehicles", l: "Number of vehicles", t: "sel", o: count, req: true }],
    repeat: {
      key: "vehicle",
      label: "Vehicle",
      addLabel: "Add a vehicle",
      max: 6,
      fields: [
        { k: "vin", l: "VIN (optional)", wide: true },
        { k: "year", l: "Year", t: "num" },
        { k: "make", l: "Make" },
        { k: "model", l: "Model" },
        { k: "trim", l: "Trim" },
        { k: "ownership", l: "Owned, financed or leased", t: "radio", o: ["Owned", "Financed", "Leased"] },
        { k: "lienholder", l: "Lienholder / lessor", show: (_v, r) => r?.ownership === "Financed" || r?.ownership === "Leased" },
        { k: "use", l: "Primary use", t: "radio", o: ["Commute", "Pleasure", "Business", "Rideshare"] },
        { k: "miles_to_work", l: "One-way miles to work", t: "num", show: (_v, r) => r?.use === "Commute" },
        { k: "annual_mileage", l: "Annual mileage", t: "num", ph: "or Not sure" },
        { k: "garaging_address", l: "Garaging address, if different from mailing", wide: true },
        { k: "primary_driver", l: "Primary driver" },
        { k: "anti_theft", l: "Anti-theft device", t: "radio", o: YNS },
        { k: "coverage_type", l: "Coverage wanted", t: "radio", o: ["Liability only", "Full coverage", "Not sure"] },
      ],
    },
  },
  {
    id: "auto-coverage",
    title: "Auto coverage and prior insurance",
    show: auto,
    intro: "Pick what you know. We can explain each option on the call.",
    fields: [
      { k: "auto_limits", l: "Liability limits", t: "sel", o: ["State minimum", "50/100", "100/300", "250/500", "Not sure"] },
      { k: "um_uim", l: "Uninsured / underinsured motorist", t: "radio", o: YNS },
      { k: "medpay", l: "Medical payments (MedPay)", t: "radio", o: YNS },
      { k: "auto_deductible", l: "Comprehensive / collision deductible", t: "sel", o: ["$250", "$500", "$1,000", "$2,500"], notSure: true },
      { k: "rental", l: "Rental reimbursement", t: "radio", o: YNS },
      { k: "towing", l: "Towing / roadside", t: "radio", o: YNS },
      { k: "currently_insured", l: "Currently insured", t: "radio", o: YN },
      { k: "years_with_carrier", l: "Years with current carrier", t: "num" },
      { k: "current_auto_limits", l: "Current liability limits", ph: "e.g. 100/300 or Not sure" },
      { k: "coverage_lapse", l: "Any lapse in coverage", t: "radio", o: YNS },
      { k: "auto_declined", l: "Declined, cancelled or non-renewed in the last 3 years", t: "radio", o: YNS },
    ],
  },
  {
    id: "home-property",
    title: "The home",
    show: home,
    fields: [
      { k: "home_address", l: "Property address", wide: true, ph: "Leave blank if same as mailing" },
      { k: "policy_type", l: "Policy type", t: "radio", o: ["Homeowners (HO)", "Condo", "Renters", "Landlord"], notSure: true },
      { k: "occupancy", l: "Occupancy", t: "sel", o: ["Primary residence", "Secondary / seasonal", "Rented to others", "Vacant"] },
      { k: "year_purchased", l: "Year purchased", t: "num" },
      { k: "for_sale", l: "Currently for sale", t: "radio", o: YN },
      { k: "dwelling_type", l: "Dwelling type", t: "sel", o: ["Single family", "Townhome", "Condo", "Duplex", "Mobile / manufactured"], notSure: true },
      { k: "year_built", l: "Year built", t: "num" },
      { k: "square_feet", l: "Square feet", t: "num" },
      { k: "stories", l: "Stories", t: "sel", o: ["1", "1.5", "2", "3+"] },
      { k: "construction", l: "Construction", t: "sel", o: ["Frame", "Masonry", "Masonry veneer", "Log"], notSure: true },
      { k: "siding", l: "Siding", t: "sel", o: ["Vinyl", "Wood", "Brick", "Stucco", "Fiber cement", "Stone"], notSure: true },
      { k: "foundation", l: "Foundation", t: "sel", o: ["Basement (finished)", "Basement (unfinished)", "Crawl space", "Slab"], notSure: true },
      { k: "garage", l: "Garage", t: "sel", o: ["None", "Attached 1 car", "Attached 2 car", "Attached 3+ car", "Detached", "Carport"] },
      { k: "roof_material", l: "Roof material", t: "sel", o: ["Asphalt shingle", "Impact-resistant shingle", "Tile", "Metal", "Wood shake", "Flat"], notSure: true },
      { k: "roof_year", l: "Roof year", t: "num", ph: "or Not sure" },
      { k: "roof_condition", l: "Roof condition", t: "sel", o: ["Excellent", "Good", "Fair", "Poor"], notSure: true },
      { k: "electrical_updated", l: "Electrical updated (year)", t: "num" },
      { k: "plumbing_updated", l: "Plumbing updated (year)", t: "num" },
      { k: "heating_updated", l: "Heating updated (year)", t: "num" },
      { k: "heating_type", l: "Heating type", t: "sel", o: ["Gas forced air", "Electric", "Boiler", "Heat pump", "Other"], notSure: true },
    ],
  },
  {
    id: "home-protection",
    title: "Safety and coverage",
    show: home,
    fields: [
      { k: "hydrant_feet", l: "Feet to nearest fire hydrant", t: "num", ph: "or Not sure" },
      { k: "fire_station_miles", l: "Miles to fire station", t: "num", ph: "or Not sure" },
      { k: "protection", l: "Protective devices", t: "multi", o: ["Burglar alarm", "Fire alarm (monitored)", "Smoke detectors", "Sprinklers", "Deadbolts"] },
      { k: "wood_stove", l: "Wood stove or fireplace insert", t: "radio", o: YN },
      { k: "dogs", l: "Dogs", t: "radio", o: YN },
      { k: "dog_breeds", l: "Dog breed(s)", show: (v) => v.dogs === "Yes" },
      { k: "pool", l: "Swimming pool", t: "radio", o: ["None", "Fenced", "Not fenced"] },
      { k: "trampoline", l: "Trampoline", t: "radio", o: YN },
      { k: "home_business", l: "Business run from the home", t: "radio", o: YN },
      { k: "home_claims", l: "Property claims in the last 5 years", t: "radio", o: YNS },
      { k: "home_claims_description", l: "Describe claims", t: "area", show: (v) => v.home_claims === "Yes" },
      { k: "mortgagee", l: "Mortgage company", ph: "or None" },
      { k: "mortgage_delinquent", l: "Mortgage payments delinquent", t: "radio", o: YN },
      { k: "dwelling_coverage", l: "Dwelling coverage ($)", ph: "or Not sure" },
      { k: "personal_property", l: "Personal property ($)", ph: "or Not sure" },
      { k: "home_deductible", l: "Deductible", t: "sel", o: ["$1,000", "$2,500", "$5,000", "1%", "2%"], notSure: true },
      { k: "wind_hail_deductible", l: "Wind / hail deductible", t: "sel", o: ["Same as all perils", "1%", "2%", "3%"], notSure: true },
      { k: "scheduled_valuables", l: "Jewelry, art or other valuables to schedule", t: "area" },
      { k: "bundle", l: "Interested in bundling home and auto", t: "radio", o: YNS },
    ],
  },
  {
    id: "finish",
    title: "Current insurance and notes",
    fields: currentInsuranceFields,
  },
];

function PersonalQuote() {
  return (
    <QuoteWizard
      kind="Personal"
      eyebrow="Personal quote"
      title="Auto and home."
      intro="A few short steps. Only the basics are required — skip anything you don't know and we'll cover it on the call."
      steps={steps}
    />
  );
}
