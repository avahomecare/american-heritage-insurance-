import { createFileRoute } from "@tanstack/react-router";
import { FadedAside } from "@/components/faded-aside";
import { PageShell } from "@/components/page-shell";
import { office } from "@/lib/content";

export const Route = createFileRoute("/clients")({
  head: () => ({
    meta: [
      { title: "For clients · American Heritage Insurance Brokers, Inc." },
      {
        name: "description",
        content: "Claims questions, an ID card, or a certificate of insurance.",
      },
    ],
  }),
  component: ClientsPage,
});

const sections = [
  {
    id: "claims",
    title: "Claims questions",
    body: "Call the claim number on your policy — it's well explained there. Then call the office the same day. We are not the claim adjusters. We help you open the claim with the carrier and follow up with you.",
  },
  {
    id: "id-card",
    title: "ID card",
    body: "Auto ID cards come from the carrier once the policy is issued. Call or email the office and we will send the current card. Do not drive on a card from a policy that has already cancelled.",
  },
  {
    id: "certificate",
    title: "Certificate of insurance",
    body: "Email the certificate holder’s name, address, the job or lease, and the limits they asked for. We issue the certificate when the policy allows those limits. A certificate does not change the policy.",
  },
];

function ClientsPage() {
  return (
    <PageShell>
      <section className="relative overflow-hidden">
        <FadedAside src="/aside-clients.jpg" />
        <div className="relative mx-auto max-w-3xl px-5 py-12 md:py-16">
        <p className="text-xs tracking-widest uppercase text-gold">For clients</p>
        <h1 className="mt-3 text-4xl text-ink md:text-5xl">Claims, cards, and certificates.</h1>
        <p className="mt-5 text-base leading-relaxed text-ink-soft">
          Call <a href={office.phoneHref}>{office.phoneDisplay}</a> or email{" "}
          <a href={office.emailHref}>{office.email}</a>. {office.hours}.
        </p>
        <div className="mt-10 space-y-10">
          {sections.map((section) => (
            <article key={section.id} id={section.id} className="scroll-mt-28 border-t border-line pt-6">
              <h2 className="font-display text-2xl text-ink">{section.title}</h2>
              <p className="mt-3 text-base leading-relaxed text-ink-soft">{section.body}</p>
            </article>
          ))}
        </div>
        </div>
      </section>
    </PageShell>
  );
}
