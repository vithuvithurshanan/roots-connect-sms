// Post-build script: generates .output/public/index.html for Firebase Hosting SPA deployment.
// Reads the built assets folder, finds the main JS + CSS files, and writes a proper shell HTML.
import { readdirSync, writeFileSync } from "fs";
import { join } from "path";

const assetsDir = join(process.cwd(), ".output", "public", "assets");
const files = readdirSync(assetsDir);

const mainJs = files.find((f) => f.startsWith("index-") && f.endsWith(".js"));
const mainCss = files.find((f) => f.endsWith(".css"));

if (!mainJs) {
  console.error("Could not find main JS bundle in .output/public/assets");
  process.exit(1);
}

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Woodcrest Tree Buffalo | Tree Service in Buffalo, NY</title>
    <meta name="description" content="Licensed, insured tree removal, trimming, stump grinding and 24/7 storm response in Buffalo, NY. Free estimates — call 716-333-8772." />
    ${mainCss ? `<link rel="stylesheet" href="/assets/${mainCss}" />` : ""}
    <link rel="icon" href="/favicon.ico" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/assets/${mainJs}"></script>
  </body>
</html>
`;

const outPath = join(process.cwd(), ".output", "public", "index.html");
writeFileSync(outPath, html, "utf8");
console.log(`✓ Generated .output/public/index.html (${mainJs}, ${mainCss})`);
