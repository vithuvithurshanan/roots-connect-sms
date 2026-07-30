import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { SITE } from "@/lib/site";
import { CoLabsInvertedCorner } from "@/components/colabs/CoLabsInvertedCorner";
import { CoLabsPill } from "@/components/colabs/CoLabsPill";

export function Footer() {
  return (
    <footer className="">
      <div className="relative w-full overflow-hidden bg-primary p-8 text-primary-foreground sm:p-12">
        {/* CoLabs signature corner cutouts */}
        <CoLabsInvertedCorner position="top-right" fill="currentColor" className="opacity-25 size-12 sm:size-20" />
        <CoLabsInvertedCorner position="bottom-left" fill="currentColor" className="opacity-15 size-10 sm:size-16" />

        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <img
              src="https://res.cloudinary.com/vbblslix/image/upload/f_auto,q_auto,w_144,h_144,c_fit/v1785338839/Create_creativity_logo_Woodcrest_202607291021-Photoroom_pkovw9.png"
              alt="Woodcrest Tree Buffalo"
              width={144}
              height={144}
              className="h-12 w-auto brightness-0 invert"
            />
            <p className="mt-4 max-w-sm text-sm opacity-80">
              Licensed, insured tree care for Buffalo and Western New York. Free estimates, honest
              pricing, clean job sites.
            </p>
            <a
              href={SITE.phoneHref}
              className="group mt-6 inline-flex items-center gap-3 rounded-full bg-lime px-5 py-3 text-sm font-semibold text-lime-foreground transition-all duration-300 hover:scale-[1.03]"
            >
              <Phone className="size-4 transition-transform duration-500 group-hover:rotate-12" />
              Call {SITE.phone}
            </a>
          </div>

          <div className="text-sm">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] opacity-70">
              Company
            </p>
            <ul className="space-y-2 opacity-90">
              <li>
                <Link to="/" className="transition-opacity hover:opacity-70">Home</Link>
              </li>
              <li>
                <Link to="/services" className="transition-opacity hover:opacity-70">Services</Link>
              </li>
              <li>
                <Link to="/about" className="transition-opacity hover:opacity-70">About</Link>
              </li>
              <li>
                <Link to="/contact" className="transition-opacity hover:opacity-70">Contact</Link>
              </li>
              <li>
                <Link to="/terms" className="transition-opacity hover:opacity-70">Terms &amp; Conditions</Link>
              </li>
              <li>
                <Link to="/privacy" className="transition-opacity hover:opacity-70">Privacy Policy</Link>
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
                <a href={SITE.phoneHref} className="transition-opacity hover:opacity-70">{SITE.phone}</a>
              </li>
              <li className="flex gap-2">
                <Mail className="mt-0.5 size-4 shrink-0" />
                <a href={`mailto:${SITE.email}`} className="transition-opacity hover:opacity-70">{SITE.email}</a>
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

