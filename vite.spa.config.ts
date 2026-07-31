import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import tsconfigPaths from "vite-tsconfig-paths";

const HERO_IMAGE_URL =
  "https://res.cloudinary.com/vbblslix/image/upload/v1785426714/hero-canopy_wnewi5-ezgif.com-optiwebp_sk08zp.webp";

// Chunks every route needs right away (layout shell + router data) or that the
// home route needs immediately — modulepreloading them lets the browser fetch
// them in parallel with the entry script instead of waiting for it to run and
// discover the dynamic imports (which chains the requests one after another).
// "icons" is the lucide-react bundle (arrow-right, zap, phone, tree-pine …
// all used in the hero above the fold) — preloading it prevents the
// index → icons waterfall that was adding ~60ms to the critical path.
const EAGER_CHUNK_NAMES = new Set(["SiteLayout", "routes", "clock", "icons", "LazyMount", "Reveal"]);

// Preloads the LCP hero image (otherwise only discoverable after the JS bundle
// parses/runs in this CSR build) and unblocks the stylesheet from initial render.
function perfHtmlPlugin(): Plugin {
  return {
    name: "perf-html",
    transformIndexHtml(html, ctx) {
      let modulePreloads = "";
      const bundle = ctx.bundle;
      if (bundle) {
        // Deduplicate by fileName — Vite may emit the same chunk under
        // multiple names when manualChunks merges modules.
        const seen = new Set<string>();
        for (const chunk of Object.values(bundle)) {
          if (
            chunk.type === "chunk" &&
            EAGER_CHUNK_NAMES.has(chunk.name) &&
            !seen.has(chunk.fileName)
          ) {
            seen.add(chunk.fileName);
            modulePreloads += `  <link rel="modulepreload" crossorigin href="/${chunk.fileName}">\n`;
          }
        }
      }
      return html
        .replace(
          "</head>",
          `${modulePreloads}  <link rel="preload" as="image" fetchpriority="high" href="${HERO_IMAGE_URL}">\n  </head>`,
        )
        .replace(
          /<link rel="stylesheet"([^>]*?) href="([^"]+)">/,
          // Use a replacer function so that special $ sequences in attrs/href
          // are never interpreted as replacement pattern tokens.
          (_match, attrs: string, href: string) => [
            `<link rel="preload" as="style"${attrs} href="${href}" onload="this.onload=null;this.rel='stylesheet'">`,
            `    <noscript><link rel="stylesheet"${attrs} href="${href}"></noscript>`,
          ].join("\n"),
        );
    },
  };
}

export default defineConfig({
  plugins: [
    TanStackRouterVite({ autoCodeSplitting: true }),
    react(),
    tailwindcss(),
    tsconfigPaths(),
    perfHtmlPlugin(),
  ],
  resolve: {
    alias: {
      // @tanstack/start-storage-context imports node:async_hooks
      // (AsyncLocalStorage) which doesn't exist in browsers.  In the SPA
      // build there is no SSR so this module is never actually called —
      // replace it with an empty stub so the bundle stays browser-safe.
      "@tanstack/start-storage-context": "/src/lib/empty-stub.ts",
    },
  },
  build: {
    outDir: "dist/spa",
    emptyOutDir: true,
    // Target modern browsers only — avoids legacy transform overhead
    // (e.g. async/await, optional chaining) that adds ~10-15% bundle bloat
    // and extra parse time on the main thread.
    target: ["es2020", "chrome96", "firefox95", "safari15"],
    rollupOptions: {
      output: {
        // Vite/Rollup splits every lucide icon into its own tiny chunk by
        // default. With several icons used in the hero (arrow-right, zap,
        // phone, tree-pine …) this creates a chain of waterfall requests
        // immediately after the entry bundle. Grouping them into a single
        // "icons" chunk means one parallel fetch instead of N serial ones.
        //
        // Small site-utility components (LazyMount, Reveal, CoLabs*) are
        // always needed alongside SiteLayout on every page — co-locating
        // them in a "SiteLayout" chunk eliminates the waterfall where the
        // index route chunk discovers them as separate dynamic dependencies.
        manualChunks(id) {
          if (id.includes("lucide-react")) {
            return "icons";
          }
          // Co-locate always-needed layout helpers with SiteLayout so they
          // load in the same request rather than chaining off the index chunk.
          if (
            id.includes("/components/site/LazyMount") ||
            id.includes("/components/site/Reveal") ||
            id.includes("/components/colabs/CoLabsButton") ||
            id.includes("/components/colabs/CoLabsPill") ||
            id.includes("/components/colabs/CoLabsInvertedCorner")
          ) {
            return "SiteLayout";
          }
        },
      },
    },
  },
});
