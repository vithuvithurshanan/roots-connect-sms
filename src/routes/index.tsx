import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Leaf, Phone, ShieldCheck, Clock, Star } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Reveal } from "@/components/site/Reveal";
import { Counter } from "@/components/site/Counter";
import { Marquee } from "@/components/site/Marquee";
import { SERVICES } from "@/lib/services";
import { SITE } from "@/lib/site";
import hero from "@/assets/hero-canopy.jpg";

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
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

const stats = [
  { value: "18+", label: "Years climbing WNY trees" },
  { value: "4,200", label: "Trees safely serviced" },
  { value: "24/7", label: "Storm response" },
  { value: "5.0", label: "Average review rating" },
];

function Home() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="px-4 pt-4">
        <div className="container-page grid gap-4 lg:grid-cols-[1.55fr_1fr]">
          <Reveal from="zoom" className="relative overflow-hidden rounded-[2.5rem]">
            <img
              src={hero}
              alt="Sunlight through a green oak canopy in Buffalo"
              width={1408}
              height={1200}
              className="h-[420px] w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105 sm:h-[560px] lg:h-[660px]"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6 sm:p-10">
              <Reveal delay={200}>
                <h1 className="display-xl max-w-3xl text-background">
                  Buffalo's trees, in the right hands
                </h1>
              </Reveal>
              <Reveal delay={350}>
                <p className="mt-4 max-w-xl text-sm text-background/85 sm:text-base">
                  Removal, pruning, stump grinding and storm cleanup from a crew that treats your
                  property like its own.
                </p>
              </Reveal>
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <Reveal
              from="right"
              delay={150}
              className="hover-lift flex flex-col justify-between rounded-[2.5rem] bg-lime p-7 text-lime-foreground"
            >
              <div>
                <p className="eyebrow text-lime-foreground/70">Free estimate</p>
                <p className="mt-3 font-display text-2xl font-bold leading-tight">
                  Got a tree that worries you? We'll look at it today.
                </p>
              </div>
              <a
                href={SITE.phoneHref}
                className="group mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background transition-transform duration-300 hover:scale-[1.04]"
              >
                <Phone className="size-4 transition-transform duration-500 group-hover:rotate-12" />{" "}
                {SITE.phone}
              </a>
            </Reveal>

            <Reveal
              from="right"
              delay={300}
              className="hover-lift rounded-[2.5rem] bg-sand p-7 text-sand-foreground"
            >
              <p className="eyebrow text-sand-foreground/70">Where we work</p>
              <p className="mt-3 font-display text-2xl font-bold leading-tight">{SITE.city}, NY</p>
              <p className="mt-2 text-sm opacity-80">{SITE.addressLine}</p>
              <p className="mt-4 text-sm opacity-80">{SITE.hours}</p>
              <Link
                to="/contact"
                className="group mt-5 inline-flex items-center gap-2 text-sm font-semibold underline underline-offset-4"
              >
                Request a quote{" "}
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>

        </div>
      </section>

      {/* Marquee */}
      <div className="mt-16 sm:mt-24">
        <Marquee
          items={["Tree Removal", "Crown Pruning", "Stump Grinding", "24/7 Storm Response"]}
        />
      </div>

      {/* Stats */}
      <section className="px-4 py-16 sm:py-24">
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
                delay={i * 120}
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

      {/* Services */}
      <section className="px-4 pb-16 sm:pb-24">
        <div className="container-page">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Our services</p>
              <h2 className="display-lg mt-3 max-w-2xl">Everything a tree needs, in one crew</h2>
            </div>
            <Link
              to="/services"
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold transition-colors hover:bg-foreground hover:text-background"
            >
              All services{" "}
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {SERVICES.map((s, i) => (
              <Reveal
                as="article"
                key={s.slug}
                delay={(i % 2) * 140}
                className="hover-lift group overflow-hidden rounded-[2.5rem] border border-border bg-card"
              >
                <div className="overflow-hidden">
                  <img
                    src={s.image}
                    alt={s.alt}
                    loading="lazy"
                    width={900}
                    height={900}
                    className="h-64 w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                  />
                </div>
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


      {/* Why us */}
      <section className="px-4 pb-16 sm:pb-24">
        <Reveal
          from="zoom"
          className="container-page rounded-[2.5rem] bg-bark p-8 text-bark-foreground sm:p-14"
        >
          <p className="eyebrow text-bark-foreground/70">Why Woodcrest</p>
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

      {/* Reviews */}
      <section className="px-4 pb-16 sm:pb-24">
        <div className="container-page">
          <p className="eyebrow">Neighbors say</p>
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
                delay={i * 130}
                className="hover-lift rounded-[2rem] border border-border bg-card p-7"
              >
                <div className="flex gap-1 text-primary">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-4 fill-current" />
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
