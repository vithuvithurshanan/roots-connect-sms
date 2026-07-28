import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { z } from "zod";
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

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.string().trim().email("Enter a valid email address").max(255),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number")
    .max(20)
    .regex(/^[0-9+()\-.\s]+$/, "Enter a valid phone number"),
  address: z.string().trim().max(200).optional(),
  message: z.string().trim().min(1, "Tell us about the job").max(1000),
  smsConsent: z.boolean().optional(),
});

function Contact() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      address: String(fd.get("address") ?? ""),
      message: String(fd.get("message") ?? ""),
      smsConsent: fd.get("smsConsent") === "on",
    });

    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      return;
    }
    setErrors({});
    setSent(true);
    e.currentTarget.reset();
  }

  const field =
    "mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary";

  return (
    <SiteLayout>
      <section className="px-4 pt-12 sm:pt-20">
        <div className="container-page">
          <p className="eyebrow">Contact</p>
          <h1 className="display-xl mt-4 max-w-3xl">Free estimate, no pressure</h1>

          <div className="mt-10 grid gap-4 lg:grid-cols-[1fr_1.2fr]">
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

            <div className="rounded-[2.5rem] border border-border bg-card p-8 sm:p-10">
              {sent ? (
                <div className="py-10 text-center">
                  <h2 className="font-display text-2xl font-bold">Thanks — request received</h2>
                  <p className="mt-3 text-sm text-muted-foreground">
                    We'll be in touch shortly. Need it handled now? Call{" "}
                    <a href={SITE.phoneHref} className="font-semibold text-primary">
                      {SITE.phone}
                    </a>
                    .
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-6 rounded-full border border-border px-5 py-3 text-sm font-semibold"
                  >
                    Send another request
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="text-sm font-medium">
                        Full name
                      </label>
                      <input id="name" name="name" maxLength={100} className={field} />
                      {errors.name && (
                        <p className="mt-1 text-xs text-destructive">{errors.name}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="phone" className="text-sm font-medium">
                        Mobile phone
                      </label>
                      <input id="phone" name="phone" maxLength={20} className={field} />
                      {errors.phone && (
                        <p className="mt-1 text-xs text-destructive">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <input id="email" name="email" maxLength={255} className={field} />
                    {errors.email && (
                      <p className="mt-1 text-xs text-destructive">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="address" className="text-sm font-medium">
                      Service address <span className="text-muted-foreground">(optional)</span>
                    </label>
                    <input id="address" name="address" maxLength={200} className={field} />
                  </div>

                  <div>
                    <label htmlFor="message" className="text-sm font-medium">
                      What do you need done?
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      maxLength={1000}
                      className={field}
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-destructive">{errors.message}</p>
                    )}
                  </div>

                  <label className="flex items-start gap-3 rounded-2xl bg-muted p-4 text-xs text-muted-foreground">
                    <input
                      type="checkbox"
                      name="smsConsent"
                      className="mt-0.5 size-4 accent-[var(--primary)]"
                    />
                    <span>
                      I agree to receive recurring automated SMS messages from {SITE.name} at the
                      number provided (estimates, reminders, updates and offers). Consent is not a
                      condition of purchase. Msg &amp; data rates may apply, 4–8 msgs/month. Reply
                      STOP to opt out, HELP for help. See our{" "}
                      <Link to="/privacy" className="text-primary underline">
                        Privacy Policy
                      </Link>{" "}
                      and{" "}
                      <Link to="/terms" className="text-primary underline">
                        Terms
                      </Link>
                      .
                    </span>
                  </label>

                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground"
                  >
                    <Phone className="size-4" /> Request my free estimate
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
      <div className="h-16" />
    </SiteLayout>
  );
}
