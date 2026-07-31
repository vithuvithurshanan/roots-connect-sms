// Empty stub used by vite.spa.config.ts to replace SSR-only modules
// (@tanstack/start-storage-context) that import node:async_hooks.
// These are never called at runtime in the browser SPA build — they only
// run on the server during SSR. The no-op implementations satisfy Rolldown's
// missing-export check without pulling any Node.js APIs into the bundle.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getStartContext(): any {
  return undefined;
}

export function runWithStartContext<T>(
  _context: unknown,
  fn: () => T,
): T {
  return fn();
}
