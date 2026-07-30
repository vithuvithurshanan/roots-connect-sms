import { createFileRoute, Link } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { ArrowRight, Leaf, Phone, ShieldCheck, Clock, Star, TreePine, Zap } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Reveal } from "@/components/site/Reveal";
import { LazyMount } from "@/components/site/LazyMount";
import { Counter } from "@/components/site/Counter";
import { Marquee } from "@/components/site/Marquee";
import { SERVICES } from "@/lib/services";
import { SITE } from "@/lib/site";
import { useDelayedMount } from "@/lib/useDelayedMount";
const hero = "https://res.cloudinary.com/vbblslix/image/upload/v1785426714/hero-canopy_wnewi5-ezgif.com-optiwebp_sk08zp.webp";
import { CoLabsInvertedCorner } from "@/components/colabs/CoLabsInvertedCorner";
import { CoLabsPill } from "@/components/colabs/CoLabsPill";
import { CoLabsButton } from "@/components/colabs/CoLabsButton";

// Lazy-loaded and time-delayed: below-the-fold, framer-motion-heavy
// scroll-jack section with an unusual layout (h-[250vh] on desktop), so it's
// gated by a delay rather than IntersectionObserver visibility — a
// placeholder guessing its real height would risk a layout-shift pop-in.
// The delay keeps its chunk (and framer-motion) out of the initial-load
// critical window without needing to guess that height.
const BattalionScrollCards = lazy(() =>
  import("@/components/battalion/BattalionScrollCards").then((m) => ({ default: m.BattalionScrollCards })),
);
// Lazy-loaded: framer-motion-dependent (parallax scroll effect). Combined
// with the LazyMount visibility-gate around its usage below, this defers
// both the chunk fetch (a static import wouldn't) and the mount (which is
// what actually triggers framer-motion's reflow-causing measurement).
const BattalionParallaxImage = lazy(() =>
  import("@/components/battalion/BattalionParallaxImage").then((m) => ({ default: m.BattalionParallaxImage })),
);

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Woodcrest Tree Buffalo | Tree Removal & Trimming in Buffalo NY" },
      {
        name: "description",
        content:
          "Woodcrest Tree Buffalo provides tree removal, pruning, stump grinding and 24/7 storm cleanup across Buffalo and Western New York. Free estimates: 716-333-8772.",
      },
      { property: "og:title", content: "Woodcrest Tree Buffalo | Buffalo NY Tree Service" },
      {
        property: "og:description",
        content:
          "Licensed and insured Buffalo arborists. Tree removal, trimming, stump grinding and emergency storm response.",
      },
      { property: "og:url", content: "https://woodcrest-tree-buffalo-ny.web.app/" },
    ],
    links: [{ rel: "canonical", href: "https://woodcrest-tree-buffalo-ny.web.app/" }],
  }),
});

const stats = [
  { value: "18+", label: "Years of experience" },
  { value: "4,200", label: "Trees serviced" },
  { value: "24/7", label: "Storm response" },
  { value: "5.0", label: "Review rating" },
];

function Home() {
  const showScrollCards = useDelayedMount(2000);

  return (
    <SiteLayout>

      {/* ── HERO BENTO GRID ── */}
      <section className="px-4 pt-24 pb-6 sm:pt-28 sm:pb-8">
        <div className="container-page grid gap-3 lg:grid-cols-[1.6fr_1fr] lg:grid-rows-[auto_auto]">

          {/* Main image card — left, spans 2 rows on lg. Not wrapped in <Reveal>: it
              holds the LCP image, and Reveal's opacity-0-until-observed fade-in would
              delay when the browser considers it painted. */}
          <div
            data-leaf-roof="true"
            className="relative overflow-hidden rounded-[2.5rem] lg:row-span-2 min-h-[520px]"
          >
            <img
              src={hero}
              alt="Sunlight through green tree canopy in Buffalo NY"
              width={1408}
              height={1200}
              fetchPriority="high"
              className="absolute inset-0 h-full w-full object-cover"
            />
            {/* gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            {/* text */}
            <div className="absolute inset-x-0 bottom-0 p-8 sm:p-10">
              <CoLabsPill variant="lime" className="mb-2">
                Buffalo · New York
              </CoLabsPill>
              <h1 className="display-xl mt-3 max-w-xl text-white leading-[1.1]">
                Buffalo's trees, in the right hands
              </h1>
              <p className="mt-3 max-w-md text-sm text-white/75">
                Removal, pruning, stump grinding and storm cleanup from a crew that treats your
                property like its own.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <CoLabsButton href={SITE.phoneHref} variant="lime">
                  <Phone className="size-4 inline mr-1" /> {SITE.phone}
                </CoLabsButton>
                <CoLabsButton href="/services" variant="outline">
                  Our services
                </CoLabsButton>
              </div>
            </div>
          </div>

          {/* Top-right — free estimate card */}
          <Reveal
            immediate
            from="right"
            data-leaf-roof="true"
            className="group relative flex flex-col justify-between rounded-[2.5rem] bg-lime p-7 text-lime-foreground overflow-hidden"
          >
            <CoLabsInvertedCorner position="bottom-right" fill="#0c140d" className="opacity-25" />
            <div>
              <CoLabsPill variant="dark" className="text-white">
                Free estimate
              </CoLabsPill>
              <p className="mt-4 font-display text-2xl font-bold leading-snug">
                Got a tree that worries you? We'll look at it today.
              </p>
            </div>
            <CoLabsButton href={SITE.phoneHref} variant="dark" className="mt-6 w-fit">
              Call now
            </CoLabsButton>
          </Reveal>

          {/* Bottom-right — 2-col mini grid */}
          <div className="grid grid-cols-2 gap-3">
            {/* stat */}
            <Reveal
              immediate
              data-leaf-roof="true"
              className="relative overflow-hidden flex flex-col justify-between rounded-[2rem] bg-primary p-6 text-primary-foreground"
            >
              <CoLabsInvertedCorner position="top-right" fill="currentColor" className="opacity-15" />
              <TreePine className="size-7 opacity-60" />
              <div>
                <p className="font-display text-4xl font-bold">4,200+</p>
                <p className="mt-1 text-xs opacity-70">Trees safely serviced</p>
              </div>
            </Reveal>

            {/* storm card */}
            <Reveal
              immediate
              data-leaf-roof="true"
              className="relative overflow-hidden flex flex-col justify-between rounded-[2rem] bg-bark p-6 text-bark-foreground"
            >
              <CoLabsInvertedCorner position="top-right" fill="currentColor" className="opacity-15" />
              <Zap className="size-7 opacity-60" />
              <div>
                <p className="font-display text-2xl font-bold">24/7</p>
                <p className="mt-1 text-xs opacity-70">Storm response</p>
              </div>
            </Reveal>

            {/* where we work — spans 2 cols */}
            <Reveal
              immediate
              data-leaf-roof="true"
              className="relative overflow-hidden col-span-2 rounded-[2rem] bg-sand p-6 text-sand-foreground"
            >
              <CoLabsPill variant="outline">
                Where we work
              </CoLabsPill>
              <p className="mt-3 font-display text-xl font-bold">{SITE.city}, NY</p>
              <p className="mt-1 text-xs opacity-70">{SITE.hours}</p>
              <Link
                to="/contact"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold underline underline-offset-4"
              >
                Request a quote <ArrowRight className="size-3" />
              </Link>
            </Reveal>
          </div>

        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="mt-10 sm:mt-14">
        <Marquee
          items={["Tree Removal", "Crown Pruning", "Stump Grinding", "24/7 Storm Response"]}
        />
      </div>

      {/* ── STATS ROW ── */}
      <section className="px-4 py-14 sm:py-20">
        <div className="container-page">
          <Reveal>
            <h2 className="display-lg max-w-3xl">
              Fully licensed, fully insured, and genuinely careful with your yard.
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal
                key={s.label}
                delay={i * 100}
                data-leaf-roof="true"
                className="hover-lift rounded-[2rem] border border-border bg-card p-7"
              >
                <p className="font-display text-4xl font-bold text-primary">
                  <Counter value={s.value} />
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── HORIZONTAL SCROLL FEATURES ── */}
      {showScrollCards && (
        <Suspense fallback={null}>
          <BattalionScrollCards />
        </Suspense>
      )}

      {/* ── SERVICES BENTO ── */}
      <section className="px-4 py-16 sm:py-24">
        <div className="container-page">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <CoLabsPill variant="outline">Our services</CoLabsPill>
              <h2 className="display-lg mt-3 max-w-2xl">Everything a tree needs, in one crew</h2>
            </div>
            <CoLabsButton href="/services" variant="outline">
              All services
            </CoLabsButton>
          </Reveal>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {SERVICES.map((s, i) => (
              <Reveal
                as="article"
                key={s.slug}
                delay={(i % 2) * 120}
                data-leaf-roof="true"
                className="hover-lift group relative overflow-hidden rounded-[2.5rem] border border-border bg-card"
              >
                <CoLabsInvertedCorner position="bottom-right" fill="currentColor" className="opacity-15" />
                <LazyMount className="h-64 w-full">
                  <Suspense fallback={null}>
                    <BattalionParallaxImage
                      src={s.image}
                      alt={s.alt}
                      width={900}
                      height={900}
                      className="h-full w-full"
                    />
                  </Suspense>
                </LazyMount>
                <div className="p-7">
                  <h3 className="font-display text-2xl font-bold">{s.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{s.blurb}</p>
                  <ul className="mt-4 space-y-2 text-sm">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-center gap-2">
                        <Leaf className="size-4 text-primary" /> {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="px-4 pb-16 sm:pb-24">
        <Reveal
          from="zoom"
          className="container-page relative overflow-hidden rounded-[2.5rem] bg-bark p-8 text-bark-foreground sm:p-14"
        >
          <CoLabsInvertedCorner position="top-right" fill="currentColor" className="opacity-20" />
          <CoLabsPill variant="lime" className="text-lime">Why Woodcrest</CoLabsPill>
          <h2 className="display-lg mt-3 max-w-3xl">
            No guesswork, no surprise invoices, no wrecked lawns.
          </h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {[
              {
                icon: ShieldCheck,
                title: "Licensed & insured",
                text: "Full liability and workers' comp coverage — certificates provided before we start.",
              },
              {
                icon: Clock,
                title: "On time, every time",
                text: "Scheduled windows we actually keep, plus text updates as your job progresses.",
              },
              {
                icon: Star,
                title: "Spotless finish",
                text: "Chips hauled, logs stacked where you want them, and the site raked clean.",
              },
            ].map((f, i) => (
              <Reveal key={f.title} delay={i * 140} className="group">
                <f.icon className="size-6 text-lime transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-110" />
                <h3 className="mt-4 text-xl font-bold">{f.title}</h3>
                <p className="mt-2 text-sm opacity-80">{f.text}</p>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── REVIEWS ── */}
      <section className="px-4 pb-16 sm:pb-24">
        <div className="container-page">
          <Reveal>
            <CoLabsPill variant="outline">Neighbors say</CoLabsPill>
          </Reveal>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                quote:
                  "A huge silver maple was leaning over our garage. Woodcrest took it down in a day and you'd never know a crew had been here.",
                name: "Dana R.",
                area: "Allentown",
              },
              {
                quote:
                  "Called at 6am after the November storm. They had the limb off our roof before noon and documented everything for insurance.",
                name: "Mike T.",
                area: "South Buffalo",
              },
              {
                quote:
                  "Fair quote, no upsell, and the pruning made our backyard feel twice as bright.",
                name: "Priya S.",
                area: "Elmwood Village",
              },
            ].map((r, i) => (
              <Reveal
                key={r.name}
                delay={i * 120}
                data-leaf-roof="true"
                className="hover-lift relative overflow-hidden rounded-[2rem] border border-border bg-card p-7"
              >
                <CoLabsInvertedCorner position="bottom-right" fill="currentColor" className="opacity-15" />
                <div className="flex gap-1 text-primary">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="size-4 fill-current" />
                  ))}
                </div>
                <p className="mt-4 text-sm text-muted-foreground">"{r.quote}"</p>
                <footer className="mt-5 text-sm font-semibold">
                  {r.name} · <span className="text-muted-foreground">{r.area}</span>
                </footer>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

    </SiteLayout>
  );
}
