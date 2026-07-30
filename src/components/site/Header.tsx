import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
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
            src="https://res.cloudinary.com/vbblslix/image/upload/f_auto,q_auto,w_144,h_144,c_fit/v1785427012/Create_creativity_logo_Woodcrest_202607291021-Photoroom_pkovw9-ezgif.com-optiwebp_1_hg6exc.webp"
            alt="Woodcrest Tree Buffalo"
            width={144}
            height={144}
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
            href="https://www.facebook.com/profile.php?id=61577337558829"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="inline-flex size-8 items-center justify-center rounded-full text-foreground/70 transition-colors hover:bg-secondary hover:text-foreground"
          >
            {/* Facebook icon */}
            <svg className="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
            </svg>
          </a>
          <a
            href="https://www.instagram.com/woodcresttreebuffalo"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="inline-flex size-8 items-center justify-center rounded-full text-foreground/70 transition-colors hover:bg-secondary hover:text-foreground"
          >
            {/* Instagram icon */}
            <svg className="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
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
