import { Leaf } from "lucide-react";

/** Infinite scrolling text strip, Rovix-style. */
export function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="group relative flex overflow-hidden border-y border-border bg-bark py-5 text-bark-foreground">
      {[0, 1].map((k) => (
        <div
          key={k}
          aria-hidden={k === 1}
          className="flex shrink-0 animate-marquee items-center gap-8 pr-8 group-hover:[animation-play-state:paused]"
        >
          {row.map((t, i) => (
            <span key={`${t}-${i}`} className="flex items-center gap-8 whitespace-nowrap">
              <span className="font-display text-xl font-bold tracking-tight sm:text-2xl">{t}</span>
              <Leaf className="size-4 text-lime" />
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
