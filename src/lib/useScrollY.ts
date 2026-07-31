import { useEffect, useState } from "react";
import { subscribeScroll } from "./scrollBus";

/**
 * Returns the current window.scrollY, updated on every scroll frame.
 * All callers share a single underlying window scroll listener via scrollBus.
 */
export function useScrollY(): number {
  // Always start at 0 — this ensures server and client render the same
  // initial HTML (scroll position is always 0 on first paint).
  const [y, setY] = useState(0);

  useEffect(() => subscribeScroll(setY), []);

  return y;
}
