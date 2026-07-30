import { lazy, Suspense, type ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { BackToTop } from "./BackToTop";
import { useDelayedMount } from "@/lib/useDelayedMount";

// Lazy-loaded: purely decorative (fixed-position overlays, zero layout
// footprint) — keeping them out of the critical bundle noticeably shrinks
// what must download before first paint, especially on slow connections.
const Preloader = lazy(() => import("../battalion/Preloader").then((m) => ({ default: m.Preloader })));
const FallingLeavesBackground = lazy(() =>
  import("../battalion/FallingLeavesBackground").then((m) => ({ default: m.FallingLeavesBackground })),
);
// framer-motion-dependent and doesn't need to appear instantly — delaying
// the mount keeps its chunk (and framer-motion itself) from being fetched
// during the initial-load critical window at all.
const BattalionBottomTicker = lazy(() =>
  import("../battalion/BattalionBottomTicker").then((m) => ({ default: m.BattalionBottomTicker })),
);

export function SiteLayout({ children }: { children: ReactNode }) {
  // Delay decorative overlays so they don't compete with the LCP image and
  // critical JS during the first paint window. The leaves rAF loop is the
  // heaviest piece: deferring its mount keeps the main thread clear while
  // the hero image loads and the first contentful paint settles.
  const showLeaves = useDelayedMount(1500);
  const showTicker = useDelayedMount(2000);

  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={null}>
        <Preloader />
      </Suspense>
      {showLeaves && (
        <Suspense fallback={null}>
          <FallingLeavesBackground />
        </Suspense>
      )}
      <Header />
      <main className="page-in">{children}</main>

      <Footer />
      <BackToTop />
      {showTicker && (
        <Suspense fallback={null}>
          <BattalionBottomTicker />
        </Suspense>
      )}
    </div>
  );
}
