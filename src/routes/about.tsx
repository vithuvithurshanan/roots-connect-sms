import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SITE } from "@/lib/site";
const hero = "https://res.cloudinary.com/vbblslix/image/upload/f_auto,q_auto/v1785340402/hero-canopy_wnewi5.jpg";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      { title: "About Woodcrest Tree Buffalo | Local Arborists in Buffalo NY" },
      {
        name: "description",
        content:
          "Woodcrest Tree Buffalo is a licensed, insured tree care crew based on Walnut St in Buffalo, NY, caring for Western New York canopies year round.",
      },
      { property: "og:title", content: "About Woodcrest Tree Buffalo" },
      {
        property: "og:description",
        content: "Local, licensed and insured Buffalo arborists caring for WNY trees year round.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
});

function About() {
  return (
    <SiteLayout>
      <section className="px-4 pt-24 sm:pt-28">
        <div className="container-page">
          <p className="eyebrow">About us</p>
          <h1 className="display-xl mt-4 max-w-4xl">Buffalo born, canopy obsessed</h1>
          <div className="mt-10 grid gap-4 lg:grid-cols-[1.2fr_1fr]">
            <img
              src={hero}
              alt="Mature oak canopy backlit by afternoon sun"
              loading="lazy"
              width={1408}
              height={1200}
              className="h-80 w-full rounded-[2.5rem] object-cover sm:h-[460px]"
            />
            <div className="rounded-[2.5rem] border border-border bg-card p-8">
              <p className="text-muted-foreground">
                {SITE.name} started with one bucket truck and a simple rule: leave every property
                better than we found it. Nearly two decades later we're still a small, local crew —
                the same climbers show up, learn your trees, and remember them season to season.
              </p>
              <p className="mt-4 text-muted-foreground">
                We work through Buffalo's lake-effect winters and summer storms, which means we know
                what a stressed silver maple or an ash with borer damage looks like long before it
                becomes a problem on your roof.
              </p>
              <Link
                to="/contact"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
              >
                Talk to our team <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:py-24">
        <div className="container-page grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Trained climbers",
              text: "Every climber is trained in modern rigging, aerial rescue and safe chainsaw practice.",
            },
            {
              title: "Right-sized equipment",
              text: "From hand-carry gear for tight city lots to cranes for the big removals.",
            },
            {
              title: "Straight answers",
              text: "If a tree can be saved with pruning instead of removal, we'll tell you that first.",
            },
          ].map((c) => (
            <div key={c.title} className="rounded-[2rem] border border-border bg-card p-8">
              <h2 className="font-display text-xl font-bold">{c.title}</h2>
              <p className="mt-3 text-sm text-muted-foreground">{c.text}</p>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
