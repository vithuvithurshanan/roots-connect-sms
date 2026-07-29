import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Phone } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Reveal } from "@/components/site/Reveal";
import { BattalionParallaxImage } from "@/components/battalion/BattalionParallaxImage";
import { SERVICES } from "@/lib/services";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/services")({
  component: Services,
  head: () => ({
    meta: [
      { title: "Tree Services in Buffalo NY | Woodcrest Tree Buffalo" },
      {
        name: "description",
        content:
          "Tree removal, crown pruning, stump grinding, lot clearing and emergency storm cleanup across Buffalo and WNY. Free on-site estimates.",
      },
      { property: "og:title", content: "Tree Services in Buffalo NY | Woodcrest Tree Buffalo" },
      {
        property: "og:description",
        content:
          "Removal, pruning, stump grinding and 24/7 storm response from Buffalo's careful tree crew.",
      },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
});

const extras = [
  "Cabling & bracing for weak unions",
  "Lot and fence-line clearing",
  "Hedge and ornamental shaping",
  "Seasonal deep-root fertilization",
  "Emerald ash borer assessments",
  "Firewood and log delivery",
];

function Services() {
  return (
    <SiteLayout>

      {/* ── Hero banner ── */}
      <section className="relative overflow-hidden bg-bark px-4 pt-28 pb-16 text-bark-foreground sm:pt-32 sm:pb-20">
        {/* subtle grid texture */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg,transparent,transparent 39px,currentColor 39px,currentColor 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,currentColor 39px,currentColor 40px)",
          }}
        />
        <div className="container-page relative">
          <Reveal>
            <p className="eyebrow text-bark-foreground/60">Services</p>
            <h1 className="display-xl mt-4 max-w-3xl">
              Careful tree work,<br className="hidden sm:block" /> priced up front
            </h1>
            <p className="mt-5 max-w-xl text-base opacity-75">
              Every job starts with a free on-site walkthrough. We tell you what the tree needs,
              what it doesn't, and exactly what it costs before a saw comes out of the truck.
            </p>
          </Reveal>
          <Reveal delay={120} className="mt-8 flex flex-wrap gap-3">
            <a
              href={SITE.phoneHref}
              className="inline-flex items-center gap-2 rounded-full bg-lime px-6 py-3.5 text-sm font-semibold text-lime-foreground shadow-sm transition-opacity hover:opacity-90"
            >
              <Phone className="size-4" /> Call for a free estimate
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-bark-foreground/25 px-6 py-3.5 text-sm font-semibold transition-colors hover:bg-bark-foreground/10"
            >
              Send a message <ArrowRight className="size-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── Service cards ── */}
      <section className="px-4 py-16 sm:py-24">
        <div className="container-page space-y-6">
          {SERVICES.map((s, i) => (
            <Reveal key={s.slug} delay={i * 80}>
              <article
                id={s.slug}
                className="group grid overflow-hidden rounded-[2.5rem] border border-border bg-card shadow-sm transition-shadow hover:shadow-md md:grid-cols-2"
              >
                {/* Image — alternates sides */}
                <div className={i % 2 === 1 ? "md:order-2" : ""}>
                  <BattalionParallaxImage
                    src={s.image}
                    alt={s.alt}
                    width={900}
                    height={900}
                    className="h-64 w-full md:h-full"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col justify-between p-8 sm:p-10">
                  <div>
                    {/* number badge */}
                    <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      0{i + 1}
                    </span>
                    <h2 className="mt-4 font-display text-3xl font-bold leading-tight">
                      {s.title}
                    </h2>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.blurb}</p>

                    <ul className="mt-6 space-y-2.5 text-sm">
                      {s.points.map((p) => (
                        <li key={p} className="flex items-start gap-3">
                          <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                            <Check className="size-3 text-primary" />
                          </span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href={SITE.phoneHref}
                    className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                  >
                    <Phone className="size-4" /> Get a free estimate
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Also on the truck ── */}
      <section className="px-4 pb-20">
        <div className="container-page">
          <Reveal className="rounded-[2.5rem] bg-primary p-8 text-primary-foreground sm:p-12">
            <p className="eyebrow text-primary-foreground/60">More services</p>
            <h2 className="display-lg mt-3 max-w-2xl">Also on the truck</h2>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {extras.map((e) => (
                <li
                  key={e}
                  className="flex items-center gap-3 rounded-2xl bg-primary-foreground/10 px-4 py-3 text-sm font-medium"
                >
                  <Check className="size-4 shrink-0 text-lime" />
                  {e}
                </li>
              ))}
            </ul>
            <Link
              to="/contact"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-lime px-6 py-3.5 text-sm font-semibold text-lime-foreground transition-opacity hover:opacity-90"
            >
              Book a walkthrough <ArrowRight className="size-4" />
            </Link>
          </Reveal>
        </div>
      </section>

    </SiteLayout>
  );
}
