import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/logo";
import { licenses, office } from "@/lib/content";

export const Route = createFileRoute("/card")({
  head: () => ({
    meta: [
      { title: "American Heritage Insurance Brokers, Inc." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CardPage,
});

function CardPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-navy px-5 py-10 text-white">
      <article className="w-full max-w-md border border-[#c4a36a]/60 bg-navy">
        <header className="border-b border-[#c4a36a]/40 px-6 py-8">
          <Logo variant="header" />
          <p className="mt-6 text-xs tracking-widest text-[#c4a36a] uppercase">Independent brokerage</p>
          <p className="mt-3 text-base leading-relaxed text-[#e7e1d6]">
            Personal, commercial, and transportation coverage. Since {office.founded}.
          </p>
        </header>

        <ul className="divide-y divide-white/10">
          <li>
            <a href={office.phoneHref} className="flex min-h-16 items-center gap-4 px-6 py-4 hover:bg-white/5">
              <Phone aria-hidden className="shrink-0 text-[#c4a36a]" size={20} />
              <span>
                <span className="block text-xs tracking-widest text-[#c4a36a] uppercase">Phone</span>
                <span className="text-lg">{office.phoneDisplay}</span>
              </span>
            </a>
          </li>
          <li>
            <a href={office.emailHref} className="flex min-h-16 items-center gap-4 px-6 py-4 hover:bg-white/5">
              <Mail aria-hidden className="shrink-0 text-[#c4a36a]" size={20} />
              <span>
                <span className="block text-xs tracking-widest text-[#c4a36a] uppercase">Email</span>
                <span className="text-lg break-all">{office.email}</span>
              </span>
            </a>
          </li>
          <li>
            <a
              href={office.mapsHref}
              target="_blank"
              rel="noreferrer"
              className="flex min-h-16 items-center gap-4 px-6 py-4 hover:bg-white/5"
            >
              <MapPin aria-hidden className="shrink-0 text-[#c4a36a]" size={20} />
              <span>
                <span className="block text-xs tracking-widest text-[#c4a36a] uppercase">Office</span>
                <span className="text-base leading-relaxed">{office.address}</span>
              </span>
            </a>
          </li>
        </ul>

        <footer className="border-t border-[#c4a36a]/40 px-6 py-6">
          <p className="text-base text-[#e7e1d6]">{office.hours}</p>
          <p className="mt-2 text-sm text-[#e7e1d6]">Colorado Agency License #{licenses.agencyNumber}</p>
          <a
            href="/ahib.vcf"
            className="mt-6 inline-flex min-h-11 items-center border border-[#c4a36a] px-4 text-[#c4a36a] hover:bg-white/10"
          >
            Save contact
          </a>
        </footer>
      </article>
    </div>
  );
}
