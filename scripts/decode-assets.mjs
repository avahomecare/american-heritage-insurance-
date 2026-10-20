// Decodes base64-encoded binary assets in assets-src/ into public/images/ before the build.
// (Binary files are committed as base64 text; see assets-src/README.)
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const src = "assets-src";
const out = join("public", "images");
mkdirSync(out, { recursive: true });
for (const name of readdirSync(src)) {
  if (!name.endsWith(".b64")) continue;
  const data = Buffer.from(readFileSync(join(src, name), "utf8").replace(/\s+/g, ""), "base64");
  writeFileSync(join(out, name.slice(0, -4)), data);
  console.log(`decoded ${name} -> ${join(out, name.slice(0, -4))} (${data.length} bytes)`);
}
