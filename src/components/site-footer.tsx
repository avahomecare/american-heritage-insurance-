import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/logo";
import { licenses, office } from "@/lib/content";

const coverage = [
  { to: "/coverage", label: "Personal insurance" },
  { to: "/commercial", label: "Business insurance" },
  { to: "/transportation", label: "Transportation" },
  { to: "/faq", label: "FAQ" },
] as const;

const agency = [
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
  { to: "/clients", hash: "claims", label: "Claims questions" },
  { to: "/clients", hash: "id-card", label: "ID card" },
  { to: "/clients", hash: "certificate", label: "Certificate" },
] as const;

const linkClass = "inline-flex min-h-11 items-center text-white hover:text-[#c4a36a]";

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-navy text-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-14 md:grid-cols-12">
        <div className="md:col-span-4">
          <Link to="/" aria-label="American Heritage Insurance Brokers, Inc. home">
            <Logo variant="header" />
          </Link>
          <p className="mt-5 max-w-sm text-base leading-relaxed text-[#e7e1d6]">
            American Heritage Insurance Brokers, Inc. places personal, commercial, and transportation
            coverage for clients in the Denver metro. We are a brokerage, not a carrier.
          </p>
          <Link
            to="/quote"
            className="mt-6 inline-flex min-h-11 items-center border border-[#c4a36a] px-4 text-[#c4a36a] hover:bg-white/10"
          >
            Get a quote
          </Link>
        </div>

        <nav className="md:col-span-2" aria-label="Coverage">
          <h2 className="text-xs tracking-widest text-[#c4a36a] uppercase">Coverage</h2>
          <ul className="mt-3">
            {coverage.map((item) => (
              <li key={item.label}>
                <Link to={item.to} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="md:col-span-3" aria-label="Agency">
          <h2 className="text-xs tracking-widest text-[#c4a36a] uppercase">Agency</h2>
          <ul className="mt-3">
            {agency.map((item) => (
              <li key={item.label}>
                <Link to={item.to} hash={"hash" in item ? item.hash : undefined} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <address className="not-italic md:col-span-3">
          <h2 className="text-xs tracking-widest text-[#c4a36a] uppercase">Office</h2>
          <p className="mt-4 text-base leading-relaxed text-[#e7e1d6]">
            <a href={office.mapsHref} className="text-white underline-offset-4 hover:underline" target="_blank" rel="noreferrer">
              {office.address}
            </a>
          </p>
          <p className="mt-3 text-base text-[#e7e1d6]">Serving the Denver metro</p>
          <p className="text-base text-[#e7e1d6]">Since {office.founded}</p>
          <p className="text-base text-[#e7e1d6]">{office.hours}</p>
          <p className="mt-3">
            <a href={office.phoneHref} className={linkClass}>
              {office.phoneDisplay}
            </a>
          </p>
          <p>
            <a href={office.emailHref} className={linkClass}>
              {office.email}
            </a>
          </p>
        </address>
      </div>

      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-6 md:flex-row md:items-end md:justify-between">
          <p className="max-w-xl text-sm leading-relaxed text-[#e7e1d6]">
            Submitting a form on this site does not bind coverage, change a policy, or create an
            agency relationship. Coverage is subject to carrier underwriting and the policy contract.
          </p>
          <div className="flex flex-col gap-1 text-sm text-[#e7e1d6]">
            <p>Colorado Agency License #{licenses.agencyNumber}</p>
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <Link to="/privacy" className="text-white underline-offset-4 hover:underline">
                Privacy
              </Link>
              <Link to="/terms" className="text-white underline-offset-4 hover:underline">
                Terms
              </Link>
              <span>© {new Date().getFullYear()} American Heritage Insurance Brokers, Inc.</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
