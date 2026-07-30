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
const EAGER_CHUNK_NAMES = new Set(["SiteLayout", "routes", "clock"]);

// Preloads the LCP hero image (otherwise only discoverable after the JS bundle
// parses/runs in this CSR build) and unblocks the stylesheet from initial render.
function perfHtmlPlugin(): Plugin {
  return {
    name: "perf-html",
    transformIndexHtml(html, ctx) {
      let modulePreloads = "";
      const bundle = ctx.bundle;
      if (bundle) {
        for (const chunk of Object.values(bundle)) {
          if (chunk.type === "chunk" && EAGER_CHUNK_NAMES.has(chunk.name)) {
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
          (_match, attrs: string, href: string) =>
            `<link rel="preload" as="style"${attrs} href="${href}" onload="this.onload=null;this.rel='stylesheet'">\n` +
            `    <noscript><link rel="stylesheet"${attrs} href="${href}"></noscript>`,
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
  build: {
    outDir: "dist/spa",
    emptyOutDir: true,
  },
});
