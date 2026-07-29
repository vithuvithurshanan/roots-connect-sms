import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  component: Contact,
  head: () => ({
    meta: [
      { title: "Contact Woodcrest Tree Buffalo | Free Estimates 716-333-8772" },
      {
        name: "description",
        content:
          "Request a free tree service estimate in Buffalo, NY. Call 716-333-8772 or send us your project details — we reply the same day.",
      },
      { property: "og:title", content: "Contact Woodcrest Tree Buffalo" },
      {
        property: "og:description",
        content: "Free tree service estimates in Buffalo, NY. Call 716-333-8772.",
      },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
});

function GHLForm() {
  useEffect(() => {
    // Load GHL embed script only once
    if (document.querySelector('script[src="https://link.kdlead.com/js/form_embed.js"]')) return;
    const script = document.createElement("script");
    script.src = "https://link.kdlead.com/js/form_embed.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      // cleanup not needed — script stays for page lifetime
    };
  }, []);

  return (
    <iframe
      src="https://link.kdlead.com/widget/form/0ICVSCXmuZ2mZoFFC1R8"
      style={{ width: "100%", height: "871px", border: "none", borderRadius: "8px" }}
      id="inline-0ICVSCXmuZ2mZoFFC1R8"
      data-layout='{"id":"INLINE"}'
      data-trigger-type="alwaysShow"
      data-trigger-value=""
      data-activation-type="alwaysActivated"
      data-activation-value=""
      data-deactivation-type="neverDeactivate"
      data-deactivation-value=""
      data-form-name="Woodcrest Tree buffalo ny"
      data-height="871"
      data-layout-iframe-id="inline-0ICVSCXmuZ2mZoFFC1R8"
      data-form-id="0ICVSCXmuZ2mZoFFC1R8"
      title="Woodcrest Tree buffalo ny"
    />
  );
}

function Contact() {
  return (
    <SiteLayout>
      <section className="px-4 pt-24 sm:pt-28">
        <div className="container-page">
          <p className="eyebrow">Contact</p>
          <h1 className="display-xl mt-4 max-w-3xl">Free estimate, no pressure</h1>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.4fr]">

            {/* Left — contact info cards */}
            <div className="space-y-4">
              <div className="rounded-[2.5rem] bg-primary p-8 text-primary-foreground">
                <p className="eyebrow text-primary-foreground/70">Call the crew</p>
                <a href={SITE.phoneHref} className="mt-3 block font-display text-4xl font-bold">
                  {SITE.phone}
                </a>
                <p className="mt-3 text-sm opacity-80">
                  Fastest way to reach us — storm calls answered around the clock.
                </p>
              </div>

              <ul className="space-y-4 rounded-[2.5rem] border border-border bg-card p-8 text-sm">
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span>
                    {SITE.street}
                    <br />
                    {SITE.city}, NY {SITE.zip}
                  </span>
                </li>
                <li className="flex gap-3">
                  <Mail className="mt-0.5 size-4 shrink-0 text-primary" />
                  <a href={`mailto:${SITE.email}`} className="underline underline-offset-4">
                    {SITE.email}
                  </a>
                </li>
                <li className="flex gap-3">
                  <Clock className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span>{SITE.hours}</span>
                </li>
              </ul>
            </div>

            {/* Right — GHL embedded form */}
            <div className="overflow-hidden rounded-[2.5rem] border border-border bg-card p-2">
              <GHLForm />
            </div>

          </div>
        </div>
      </section>
      <div className="h-16" />
    </SiteLayout>
  );
}
