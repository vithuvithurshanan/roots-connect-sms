import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { BackToTop } from "./BackToTop";
import { Preloader } from "../battalion/Preloader";
import { BattalionBottomTicker } from "../battalion/BattalionBottomTicker";
import { FallingLeavesBackground } from "../battalion/FallingLeavesBackground";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Preloader />
      <FallingLeavesBackground />
      <Header />
      <main className="page-in">{children}</main>

      <Footer />
      <BackToTop />
      <BattalionBottomTicker />
    </div>
  );
}
