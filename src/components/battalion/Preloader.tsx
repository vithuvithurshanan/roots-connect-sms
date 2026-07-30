import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// Deliberately framer-motion-free: this is the one thing guaranteed to show
// immediately on every page load, so pulling it in here would drag the
// ~35KB framer-motion chunk back onto the critical path — the whole point of
// lazy-loading it elsewhere (BattalionScrollCards, BattalionParallaxImage,
// BattalionBottomTicker) is that it then only loads once those actually mount.
export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "exiting" | "done">("loading");

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setPhase("exiting"), 300);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 70);

    return () => clearInterval(interval);
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[9999] flex flex-col justify-between bg-[#0e1610] p-8 text-[#e8f5e9]",
        "transition-transform duration-[950ms] ease-[cubic-bezier(0.76,0,0.24,1)]",
        phase === "exiting" ? "-translate-y-full" : "translate-y-0",
      )}
      onTransitionEnd={() => {
        if (phase === "exiting") setPhase("done");
      }}
    >
      {/* Top Brand Mark */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex animate-preloader-fade-up items-center gap-2 font-display text-xl font-bold tracking-tight text-lime">
          <span>WOODCREST</span>
          <span className="size-2 rounded-full bg-lime" />
        </div>
        <span className="animate-preloader-fade-in text-xs uppercase tracking-widest text-white/60">
          Buffalo · NY
        </span>
      </div>

      {/* Center Staggered Text */}
      <div className="my-auto flex flex-col items-center justify-center text-center">
        <div className="overflow-hidden">
          <h1
            className="animate-preloader-slide-up font-display text-4xl font-extrabold sm:text-6xl md:text-7xl"
            style={{ animationDelay: "100ms" }}
          >
            Careful. Precise. Certain.
          </h1>
        </div>
        <div className="mt-3 overflow-hidden">
          <p
            className="animate-preloader-slide-up text-sm font-medium text-lime/90 sm:text-lg"
            style={{ animationDelay: "250ms" }}
          >
            Professional Tree Care Services in Western New York
          </p>
        </div>
      </div>

      {/* Bottom Progress Bar & Counter */}
      <div className="flex items-end justify-between border-t border-white/10 pt-4">
        <div className="w-48 sm:w-64">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full bg-lime transition-[width] duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <div className="animate-preloader-fade-in font-display text-3xl font-bold tracking-tight text-lime sm:text-4xl">
          {Math.min(progress, 100)}%
        </div>
      </div>
    </div>
  );
}
