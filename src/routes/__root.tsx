import {
  Outlet,
  Link,
  createRootRoute,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Woodcrest Tree Buffalo | Tree Service in Buffalo, NY" },
      {
        name: "description",
        content:
          "Licensed, insured tree removal, trimming, stump grinding and 24/7 storm response in Buffalo, NY. Free estimates — call 716-333-8772.",
      },
      { name: "author", content: "Woodcrest Tree Buffalo" },
      { property: "og:site_name", content: "Woodcrest Tree Buffalo" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      // Fonts are loaded asynchronously (stylesheet swapped in via onload),
      // so preconnect hints time out before the request fires. Use dns-prefetch
      // instead — cheaper, no timeout, still shaves DNS lookup time.
      { rel: "dns-prefetch", href: "https://fonts.googleapis.com" },
      { rel: "dns-prefetch", href: "https://fonts.gstatic.com" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700;12..96,800&family=DM+Sans:wght@400;500;600&display=swap",
      },
      { rel: "icon", href: "https://res.cloudinary.com/vbblslix/image/upload/f_png,q_auto,w_180,h_180,c_fit/v1785427012/Create_creativity_logo_Woodcrest_202607291021-Photoroom_pkovw9-ezgif.com-optiwebp_1_hg6exc.webp", type: "image/png" },
      { rel: "apple-touch-icon", href: "https://res.cloudinary.com/vbblslix/image/upload/f_png,q_auto,w_180,h_180,c_fit/v1785427012/Create_creativity_logo_Woodcrest_202607291021-Photoroom_pkovw9-ezgif.com-optiwebp_1_hg6exc.webp" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Woodcrest Tree Buffalo",
          url: "https://woodcrest-tree-buffalo-ny.web.app",
          telephone: "716-333-8772",
          email: "info@woodcresttreebuffalo.com",
          image: "https://res.cloudinary.com/vbblslix/image/upload/v1785427012/Create_creativity_logo_Woodcrest_202607291021-Photoroom_pkovw9-ezgif.com-optiwebp_1_hg6exc.webp",
          priceRange: "$$",
          address: {
            "@type": "PostalAddress",
            streetAddress: "380 Walnut St",
            addressLocality: "Buffalo",
            addressRegion: "NY",
            postalCode: "14204",
            addressCountry: "US",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: 42.8864,
            longitude: -78.8784,
          },
          areaServed: {
            "@type": "City",
            name: "Buffalo",
            containedInPlace: {
              "@type": "State",
              name: "New York",
            },
          },
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
              opens: "07:00",
              closes: "19:00",
            },
          ],
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "5.0",
            reviewCount: "42",
            bestRating: "5",
            worstRating: "1",
          },
          sameAs: [
            "https://www.facebook.com/profile.php?id=61577337558829",
            "https://www.instagram.com/woodcresttreebuffalo",
          ],
        }),
      },
    ],
  }),

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body suppressHydrationWarning>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  useEffect(() => {
    // Deferred past `load` (with a buffer) so analytics' network round-trips
    // land well outside the initial-navigation critical path — requestIdleCallback
    // alone can still fire early on a page this light.
    let timeoutId: number | undefined;
    const runAnalytics = () => {
      // Dynamic import: keeps Firebase's app/analytics code out of the
      // initial bundle since it's unused until this deferred call anyway.
      timeoutId = window.setTimeout(() => {
        import("../lib/firebase").then(({ initAnalytics }) => initAnalytics());
      }, 3000);
    };
    if (document.readyState === "complete") {
      runAnalytics();
      return;
    }
    window.addEventListener("load", runAnalytics, { once: true });
    return () => {
      window.removeEventListener("load", runAnalytics);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    // Required: nested routes render here. Removing <Outlet /> breaks all child routes.
    <Outlet />
  );
}
