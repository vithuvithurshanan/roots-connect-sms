const { onRequest } = require("firebase-functions/v2/https");
const { createServer } = require("http");

// Lazy-load the Nitro server so cold starts are faster
let nitroHandler;
async function getNitroHandler() {
  if (!nitroHandler) {
    // Nitro node-server exposes a `handler` (Node.js IncomingMessage/ServerResponse style)
    const mod = await import("../.output/server/index.mjs");
    nitroHandler = mod.handler ?? mod.default;
  }
  return nitroHandler;
}

exports.ssr = onRequest(
  {
    region: "us-central1",
    memory: "512MiB",
    timeoutSeconds: 60,
  },
  async (req, res) => {
    const handler = await getNitroHandler();
    return handler(req, res);
  }
);
