import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { StartClient } from "@tanstack/react-start/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import "./styles.css";

// Shared by two build targets:
//
// 1. TanStack Start SSR (vite.config.ts / `npm run dev`):
//    The server renders the full <html>…</html> shell and serializes router
//    state into window.$_TSR.  StartClient reads that state via hydrateStart()
//    so the client router is rehydrated from the server snapshot — the client's
//    first render matches the server HTML exactly, eliminating the Suspense
//    mismatch that occurred when using a bare RouterProvider with no server state.
//    hydrateRoot(document, ...) attaches React to the server-rendered document.
//
// 2. Firebase static SPA (vite.spa.config.ts / `npm run build:firebase`):
//    No server rendering — index.html has a bare <div id="root">.
//    Falls back to a plain createRouter + RouterProvider + createRoot.render().

const rootEl = document.getElementById("root");

if (rootEl) {
  // ── SPA / Firebase hosting path ──────────────────────────────────────────
  const router = createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  // Type registration only needed once; the SPA router is the only instance
  // in this build so it's safe to register here.
  // eslint-disable-next-line @typescript-eslint/no-namespace
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
  // StartClient internally calls hydrateStart() which:
  //   1. Calls getRouter() from src/router.tsx to get the shared router instance
  //   2. Reads window.$_TSR (the server-serialized router state)
  //   3. Rehydrates the router so the client matches the server HTML exactly
  hydrateRoot(
    document,
    <StrictMode>
      <StartClient />
    </StrictMode>,
  );
}
