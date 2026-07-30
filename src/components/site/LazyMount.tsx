import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Defers mounting `children` until they're about to scroll into view.
 * Used for BattalionParallaxImage: framer-motion's `useScroll` measures its
 * target's geometry on mount, which forces a synchronous reflow — deferring
 * the mount keeps that off the initial-page-load critical path entirely.
 */
export function LazyMount({
  children,
  rootMargin = "600px",
  className,
}: {
  children: ReactNode;
  rootMargin?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} className={className}>
      {visible ? children : null}
    </div>
  );
}
