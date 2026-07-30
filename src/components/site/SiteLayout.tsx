import { lazy, Suspense, type ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { BackToTop } from "./BackToTop";

// Lazy-loaded: purely decorative (fixed-position overlays, zero layout
// footprint) and framer-motion/canvas-heavy — keeping them out of the
// critical bundle noticeably shrinks what must download before first paint,
// especially on slow connections.
const Preloader = lazy(() => import("../battalion/Preloader").then((m) => ({ default: m.Preloader })));
const BattalionBottomTicker = lazy(() =>
  import("../battalion/BattalionBottomTicker").then((m) => ({ default: m.BattalionBottomTicker })),
);
const FallingLeavesBackground = lazy(() =>
  import("../battalion/FallingLeavesBackground").then((m) => ({ default: m.FallingLeavesBackground })),
);

export function SiteLayout({ children }: { children: ReactNode }) {
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
      <Suspense fallback={null}>
        <BattalionBottomTicker />
      </Suspense>
    </div>
  );
}
