import { lazy, Suspense, type ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { BackToTop } from "./BackToTop";
import { Preloader } from "../battalion/Preloader";
import { useDelayedMount } from "@/lib/useDelayedMount";

// Preloader is a static import (not lazy): it renders unconditionally on
// every single load with no delay gate, so wrapping it in React.lazy()
// bought no bundle-size benefit (it doesn't use framer-motion) while
// forcing it through an async Suspense boundary during SSR — the server
// and client can resolve that boundary at different times, which is what
// was causing a hydration mismatch on every route.
//
// FallingLeavesBackground stays lazy: it's gated by useDelayedMount below,
// so it renders as `false` (nothing) on both the server and the client's
// first pass — no Suspense boundary exists yet at hydration time.
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
  // ALL decorative overlays (Preloader, leaves, ticker) are gated behind
  // useDelayedMount so they are absent from both the server-rendered HTML
  // and the client's hydration pass — their rendered output is always
  // consistent (nothing) at hydration time, which eliminates the mismatch.
  //
  // Preloader uses useDelayedMount(0): setTimeout(..., 0) fires after the
  // first useEffect flush, which is post-hydration. The Preloader appears
  // on the very next event-loop tick — imperceptible to users — and covers
  // the screen as intended.
  const showPreloader = useDelayedMount(0);
  const showLeaves = useDelayedMount(1500);
  const showTicker = useDelayedMount(2000);

  return (
    <div className="min-h-screen bg-background" suppressHydrationWarning>
      {showPreloader && <Preloader />}
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
