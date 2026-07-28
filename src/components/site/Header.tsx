import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, Facebook, Instagram, Menu, Phone, X } from "lucide-react";
import { SITE } from "@/lib/site";
import { SERVICES } from "@/lib/services";

const nav = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services", children: SERVICES },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-50 px-4 pt-4">
      <div className="container-page flex items-center justify-between gap-3">
        {/* Left cluster: logo pill + nav pill, sitting side by side */}
        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="pointer-events-auto rounded-[1.5rem] bg-card px-5 py-3 shadow-sm"
          >
            <span className="block text-[10px] font-medium leading-none tracking-wide text-muted-foreground">
              Buffalo · New York
            </span>
            <span className="mt-1 block font-display text-2xl font-bold leading-none tracking-tight">
              Woodcrest<span className="text-primary">.</span>
            </span>
          </Link>

          <nav className="pointer-events-auto hidden items-center gap-1 rounded-full bg-card/70 px-3 py-2 shadow-sm ring-1 ring-border/50 backdrop-blur-md lg:flex">
            {nav.map((item) =>
              item.children ? (
                <div key={item.to} className="group relative">
                  <Link
                    to={item.to}
                    activeProps={{ className: "text-foreground" }}
                    className="inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
                  >
                    {item.label}
                    <ChevronDown className="size-3.5 transition-transform group-hover:rotate-180" />
                  </Link>
                  <div className="invisible absolute left-0 top-full w-64 translate-y-1 pt-3 opacity-0 transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="rounded-3xl bg-card p-2 shadow-lg ring-1 ring-border/60">
                      {item.children.map((s) => (
                        <Link
                          key={s.slug}
                          to="/services"
                          hash={s.slug}
                          className="block rounded-2xl px-4 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground"
                        >
                          {s.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.to}
                  to={item.to}
                  activeOptions={{ exact: item.to === "/" }}
                  activeProps={{ className: "text-foreground" }}
                  className="rounded-full px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              ),
            )}
            <span className="mx-2 h-5 w-px bg-border" />
            <a
              href="https://facebook.com"
              aria-label="Facebook"
              className="inline-flex size-8 items-center justify-center rounded-full text-foreground/70 transition-colors hover:bg-secondary hover:text-foreground"
            >
              <Facebook className="size-4" />
            </a>
            <a
              href="https://instagram.com"
              aria-label="Instagram"
              className="inline-flex size-8 items-center justify-center rounded-full text-foreground/70 transition-colors hover:bg-secondary hover:text-foreground"
            >
              <Instagram className="size-4" />
            </a>
          </nav>
        </div>

        {/* Right actions */}
        <div className="pointer-events-auto flex items-center gap-2">
          <a
            href={SITE.phoneHref}
            className="hidden items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-opacity hover:opacity-90 sm:inline-flex"
          >
            <Phone className="size-4" />
            {SITE.phone}
          </a>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-12 items-center justify-center rounded-full bg-card shadow-sm lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="container-page pointer-events-auto mt-2 rounded-[1.75rem] bg-card p-3 shadow-lg lg:hidden">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="block rounded-2xl px-4 py-3 text-sm font-medium hover:bg-secondary"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={SITE.phoneHref}
            className="mt-2 flex items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground"
          >
            <Phone className="size-4" /> {SITE.phone}
          </a>
        </div>
      )}
    </header>
  );
}
