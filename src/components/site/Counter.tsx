import { useEffect, useRef, useState } from "react";

/** Animated odometer-style counter that runs once when scrolled into view. */
export function Counter({ value, duration = 1600 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const match = value.match(/^([^\d]*)([\d.,]+)(.*)$/);
    if (!match || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const [, prefix, numRaw, suffix] = match;
    const decimals = numRaw.includes(".") ? numRaw.split(".")[1].length : 0;
    const target = parseFloat(numRaw.replace(/,/g, ""));
    const grouped = numRaw.includes(",");
    const format = (n: number) => {
      const fixed = n.toFixed(decimals);
      return grouped ? Number(fixed).toLocaleString("en-US", { minimumFractionDigits: decimals }) : fixed;
    };

    setDisplay(`${prefix}${format(0)}${suffix}`);

    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setDisplay(`${prefix}${format(target * eased)}${suffix}`);
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration]);

  return <span ref={ref}>{display}</span>;
}
