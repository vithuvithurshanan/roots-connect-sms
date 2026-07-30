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
  const showTicker = useDelayedMount(2000);

  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={null}>
        <Preloader />
        <FallingLeavesBackground />
      </Suspense>
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
