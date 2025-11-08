// src/sources/substack.js
import fetch from "node-fetch";
import { XMLParser } from "fast-xml-parser";
import TurndownService from "turndown";
import { upsertFile } from "../utils/github.js";
import { toMarkdownFile } from "../utils/markdown.js";
import { canonicalFilename } from "../utils/markdown.js";

const parser = new XMLParser({ ignoreAttributes: false });
const turndown = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced",
});

export async function ingestSubstack(feedUrl) {
  const res = await fetch(feedUrl, { redirect: "follow" });
  if (!res.ok) throw new Error(`Feed request failed: ${res.status} ${res.statusText}`);
  const xml = await res.text();
  const feed = parser.parse(xml);

  const items = feed?.rss?.channel?.item || [];
  if (!items.length) {
    console.log("No items found in feed.");
    return;
  }

  let count = 0;

  // Limit to recent 10 for now; adjust as needed
  for (const item of items.slice(0, 10)) {
    const title = (item.title || "Untitled").toString();
    const link = (item.link || "").toString();

    // Normalize date → YYYY-MM-DD
    let pubDate = "";
    try {
      pubDate = new Date(item.pubDate).toISOString().slice(0, 10);
    } catch {
      pubDate = new Date().toISOString().slice(0, 10);
    }

    const author =
      (item["dc:creator"] && item["dc:creator"].toString()) ||
      (feed?.rss?.channel?.title?.toString?.() ?? "");

    const html = (item["content:encoded"] || item.description || "").toString();
    const bodyMd = html ? turndown.turndown(html) : "";

    // Build markdown (frontmatter + body)
    const md = toMarkdownFile({
      frontmatter: {
        source: "substack",
        title,
        url: link,
        date: pubDate,
        author,
        transcript: false,
      },
      bodyMd,
    });

    // ✅ Canonical filename (no hash suffix)
    const filename = canonicalFilename(pubDate, title); // e.g., 2025-11-08-some-title.md
    const filePath = `substack/${filename}`;

    try {
      // Upsert by canonical path (safe: overwrites same article name)
      await upsertFile({
        path: filePath,
        content: md,
        message: `substack: ${title}`,
      });
      console.log(`Upserted: ${filePath}`);
      count += 1;
    } catch (e) {
      console.error(`skip ${title}: ${e.message}`);
    }
  }

  console.log(`Ingested ${count} items from Substack feed.`);
}