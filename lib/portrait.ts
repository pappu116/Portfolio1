// Optional local portrait override.
//
// Drop a cut-out image at public/portrait.png (or .webp / .jpg / .jpeg) and
// it replaces the GitHub avatar in the hero. When no local file exists the
// hero falls back to the API-derived avatar.
//
// This module imports `node:fs`, so it is server-only. That is deliberate:
// importing it from a client component fails the build loudly instead of
// silently shipping filesystem access to the browser.

import fs from "node:fs";
import path from "node:path";

const PORTRAIT_CANDIDATES = [
  "portrait.png",
  "portrait.webp",
  "portrait.jpg",
  "portrait.jpeg",
];

/**
 * Returns the public path of the local portrait, or null when there is none.
 */
export function resolvePortraitSrc(): string | null {
  for (const file of PORTRAIT_CANDIDATES) {
    if (fs.existsSync(path.join(process.cwd(), "public", file))) {
      return `/${file}`;
    }
  }

  return null;
}
