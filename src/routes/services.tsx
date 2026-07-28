import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Phone } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
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
      <section className="px-4 pt-12 sm:pt-20">
        <div className="container-page">
          <p className="eyebrow">Services</p>
          <h1 className="display-xl mt-4 max-w-4xl">Careful tree work, priced up front</h1>
          <p className="mt-6 max-w-2xl text-muted-foreground">
            Every job starts with a free on-site walkthrough. We tell you what the tree needs, what
            it doesn't, and exactly what it costs before a saw comes out of the truck.
          </p>
        </div>
      </section>

      <section className="px-4 py-14">
        <div className="container-page space-y-4">
          {SERVICES.map((s, i) => (
            <article
              key={s.slug}
              className={`grid overflow-hidden rounded-[2.5rem] border border-border bg-card md:grid-cols-2 ${
                i % 2 === 1 ? "md:[&>img]:order-2" : ""
              }`}
            >
              <img
                src={s.image}
                alt={s.alt}
                loading="lazy"
                width={900}
                height={900}
                className="h-72 w-full object-cover md:h-full"
              />
              <div className="p-8 sm:p-10">
                <h2 className="font-display text-3xl font-bold">{s.title}</h2>
                <p className="mt-4 text-muted-foreground">{s.blurb}</p>
                <ul className="mt-6 space-y-3 text-sm">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-start gap-3">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" /> {p}
                    </li>
                  ))}
                </ul>
                <a
                  href={SITE.phoneHref}
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
                >
                  <Phone className="size-4" /> Get a free estimate
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="px-4 pb-20">
        <div className="container-page rounded-[2.5rem] bg-sand p-8 text-sand-foreground sm:p-12">
          <h2 className="display-lg max-w-2xl">Also on the truck</h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {extras.map((e) => (
              <li key={e} className="flex items-start gap-3 text-sm">
                <Check className="mt-0.5 size-4 shrink-0" /> {e}
              </li>
            ))}
          </ul>
          <Link
            to="/contact"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background"
          >
            Book a walkthrough <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
