import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="px-4 pb-6">
      <div className="container-page rounded-[2.5rem] bg-primary p-8 text-primary-foreground sm:p-12">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <h2 className="display-lg">
              Trees are our
              <br />
              business.
            </h2>
            <p className="mt-4 max-w-sm text-sm opacity-80">
              Licensed, insured tree care for Buffalo and Western New York. Free estimates, honest
              pricing, clean job sites.
            </p>
            <a
              href={SITE.phoneHref}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-lime px-5 py-3 text-sm font-semibold text-lime-foreground"
            >
              <Phone className="size-4" /> Call {SITE.phone}
            </a>
          </div>

          <div className="text-sm">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] opacity-70">
              Company
            </p>
            <ul className="space-y-2 opacity-90">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/services">Services</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/terms">Terms &amp; Conditions</Link>
              </li>
              <li>
                <Link to="/privacy">Privacy Policy</Link>
              </li>
            </ul>
          </div>

          <div className="text-sm">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] opacity-70">
              Get in touch
            </p>
            <ul className="space-y-3 opacity-90">
              <li className="flex gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0" />
                <span>{SITE.addressLine}</span>
              </li>
              <li className="flex gap-2">
                <Phone className="mt-0.5 size-4 shrink-0" />
                <a href={SITE.phoneHref}>{SITE.phone}</a>
              </li>
              <li className="flex gap-2">
                <Mail className="mt-0.5 size-4 shrink-0" />
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-primary-foreground/20 pt-6 text-xs opacity-70 sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <p>Serving Buffalo, Amherst, Cheektowaga, Tonawanda &amp; WNY.</p>
        </div>
      </div>
    </footer>
  );
}
