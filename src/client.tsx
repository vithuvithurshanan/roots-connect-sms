import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import "./styles.css";

// Shared by two build targets:
//
// 1. Firebase static SPA (vite.spa.config.ts / `npm run build:firebase`):
//    No server rendering — index.html has a bare <div id="root">.
//    Uses createRoot + RouterProvider directly. StartClient is NOT imported
//    so @tanstack/start-storage-context (which pulls in node:async_hooks)
//    never enters the bundle.
//
// 2. TanStack Start SSR (vite.config.ts / `npm run dev`):
//    The server renders the full <html> shell and serializes router state
//    into window.$_TSR.  StartClient reads that state via hydrateStart() so
//    the client router matches the server HTML exactly — no Suspense mismatch.

const rootEl = document.getElementById("root");

if (rootEl) {
  // ── SPA / Firebase hosting path ──────────────────────────────────────────
  const router = createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  declare module "@tanstack/react-router" {
    interface Register {
      router: typeof router;
    }
  }

  createRoot(rootEl).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  );
} else {
  // ── TanStack Start SSR path ───────────────────────────────────────────────
  // Dynamic import keeps StartClient (and its node:async_hooks chain) out of
  // the SPA bundle entirely — Vite tree-shakes the else branch in the SPA
  // build because rootEl is always truthy there (index.html has #root).
  import("@tanstack/react-start/client").then(({ StartClient }) => {
    hydrateRoot(
      document,
      <StrictMode>
        <StartClient />
      </StrictMode>,
    );
  });
}
