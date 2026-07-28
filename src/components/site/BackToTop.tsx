import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const R = 49;
const CIRC = 2 * Math.PI * R;

/** Scroll-progress ring that scrolls back to top, like the Rovix template. */
export function BackToTop() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      setProgress(p);
      setVisible(window.scrollY > 400);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-6 right-6 z-50 grid size-12 place-items-center rounded-full bg-card shadow-lg ring-1 ring-border transition-all duration-500 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <svg className="absolute inset-0 size-full -rotate-90" viewBox="-1 -1 102 102" aria-hidden>
        <circle
          cx="50"
          cy="50"
          r={R}
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          className="text-primary"
          strokeDasharray={CIRC}
          strokeDashoffset={CIRC * (1 - progress)}
          strokeLinecap="round"
        />
      </svg>
      <ArrowUp className="size-4" />
    </button>
  );
}
