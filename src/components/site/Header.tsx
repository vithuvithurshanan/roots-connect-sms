import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { ChevronDown, Facebook, Instagram, Menu, Phone, X } from "lucide-react";
import { SITE } from "@/lib/site";
import { SERVICES } from "@/lib/services";
import { CoLabsInvertedCorner } from "@/components/colabs/CoLabsInvertedCorner";

const nav = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services", children: SERVICES },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docH > 0 ? (window.scrollY / docH) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-card/95 shadow-sm backdrop-blur-md ring-1 ring-border/40"
          : "bg-card/70 backdrop-blur-sm ring-1 ring-border/20",
      ].join(" ")}
    >
      {/* CoLabs-style scroll progress bar */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-transparent">
        <div
          className="h-full bg-lime transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
      <div className="mx-auto flex max-w-screen-xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link to="/" className="shrink-0">
          <img
            src="https://res.cloudinary.com/vbblslix/image/upload/v1785338839/Create_creativity_logo_Woodcrest_202607291021-Photoroom_pkovw9.png"
            alt="Woodcrest Tree Buffalo"
            className="h-10 w-auto sm:h-12"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) =>
            item.children ? (
              <div key={item.to} className="group relative">
                <Link
                  to={item.to}
                  className={[
                    "inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    "text-foreground/75 hover:text-foreground hover:bg-secondary",
                  ].join(" ")}
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
                activeProps={{ className: "text-foreground font-semibold" }}
                className="rounded-full px-4 py-2 text-sm font-medium transition-colors text-foreground/75 hover:text-foreground hover:bg-secondary"
              >
                {item.label}
              </Link>
            ),
          )}

          <span className="mx-2 h-5 w-px bg-border/50" />

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

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <a
            href={SITE.phoneHref}
            className="group hidden items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-300 hover:scale-[1.03] hover:shadow-md sm:inline-flex"
          >
            <Phone className="size-4 transition-transform duration-500 group-hover:rotate-12" />
            {SITE.phone}
          </a>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-10 items-center justify-center rounded-full bg-secondary text-foreground transition-colors hover:bg-border lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="relative mx-4 mb-3 overflow-hidden rounded-[1.75rem] bg-card p-3 shadow-lg ring-1 ring-border/50 lg:hidden">
          {/* CoLabs corner accents on mobile menu */}
          <CoLabsInvertedCorner position="top-right" fill="currentColor" className="text-border opacity-30" />
          <CoLabsInvertedCorner position="bottom-left" fill="currentColor" className="text-border opacity-30" />
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="block rounded-2xl px-4 py-3 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={SITE.phoneHref}
            className="mt-2 flex items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Phone className="size-4" /> {SITE.phone}
          </a>
        </div>
      )}
    </header>
  );
}
