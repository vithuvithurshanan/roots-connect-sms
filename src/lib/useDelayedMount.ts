import { useEffect, useState } from "react";

/**
 * Returns true only after `delayMs` has elapsed since mount. Used to keep
 * components that don't need to appear instantly (and pull in a heavy
 * dependency like framer-motion) from having their lazy import start
 * fetching immediately — React.lazy + Suspense alone only avoids blocking
 * render; it doesn't delay when the network request for the chunk begins.
 */
export function useDelayedMount(delayMs: number) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setReady(true), delayMs);
    return () => window.clearTimeout(id);
  }, [delayMs]);

  return ready;
}
