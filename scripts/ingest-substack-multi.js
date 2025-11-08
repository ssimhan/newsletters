// scripts/ingest-substack-multi.js
import { execFileSync } from "node:child_process";

const raw =
  process.env.SUBSTACK_FEEDS ||
  process.env.SUBSTACK_FEED || ""; // fallback for single value

const feeds = raw
  .split(/\r?\n|,/)
  .map(s => s.trim())
  .filter(Boolean);

if (feeds.length === 0) {
  console.error("No Substack feeds found. Set SUBSTACK_FEEDS (preferred) or SUBSTACK_FEED.");
  process.exit(0); // don't fail the whole workflow
}

console.log(`Found ${feeds.length} Substack feed(s).`);
for (const feed of feeds) {
  try {
    console.log(`\n➡️  Ingesting: ${feed}`);
    execFileSync(
      "node",
      ["src/cli.js", "substack", "--feed", feed],
      { stdio: "inherit" }
    );
  } catch (err) {
    console.error(`❌ Failed ingest for ${feed}:`, err?.message || err);
    // continue to next feed
  }
}
console.log("\n✅ Substack ingest complete.");