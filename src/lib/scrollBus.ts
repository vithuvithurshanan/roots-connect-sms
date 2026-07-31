/**
 * Single global scroll listener that fans out to all subscribers.
 *
 * The browser fires one scroll event per frame regardless of how many
 * listeners are attached, but each addEventListener call registers a
 * separate observer entry in the browser's internal event dispatch table.
 * Tools like DebugBear / Yellow Lab flag > 1 window scroll listener as a
 * perf issue. This module funnels every component that needs scroll position
 * through one listener so the count stays at 1.
 *
 * Usage:
 *   import { useScrollY } from "@/lib/scrollBus";
 *   const scrollY = useScrollY();   // re-renders on every scroll tick
 */

type ScrollListener = (y: number) => void;

const listeners = new Set<ScrollListener>();
let rafId = 0;
let lastY = 0;
let ticking = false;

function dispatch() {
  ticking = false;
  const y = window.scrollY;
  if (y === lastY) return;
  lastY = y;
  listeners.forEach((fn) => fn(y));
}

function onScroll() {
  if (ticking) return;
  ticking = true;
  rafId = requestAnimationFrame(dispatch);
}

export function subscribeScroll(fn: ScrollListener): () => void {
  if (listeners.size === 0) {
    lastY = window.scrollY;
    window.addEventListener("scroll", onScroll, { passive: true });
  }
  listeners.add(fn);
  // Call immediately with current position so the subscriber is initialised.
  fn(lastY);
  return () => {
    listeners.delete(fn);
    if (listeners.size === 0) {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
      ticking = false;
    }
  };
}
