import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import tsconfigPaths from "vite-tsconfig-paths";

const HERO_IMAGE_URL =
  "https://res.cloudinary.com/vbblslix/image/upload/f_auto,q_auto/v1785340402/hero-canopy_wnewi5.jpg";

// Preloads the LCP hero image (otherwise only discoverable after the JS bundle
// parses/runs in this CSR build) and unblocks the stylesheet from initial render.
function perfHtmlPlugin(): Plugin {
  return {
    name: "perf-html",
    transformIndexHtml(html) {
      return html
        .replace(
          "</head>",
          `  <link rel="preload" as="image" fetchpriority="high" href="${HERO_IMAGE_URL}">\n  </head>`,
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
