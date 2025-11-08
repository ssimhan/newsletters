// src/sources/web.js
import { JSDOM } from "jsdom";
import TurndownService from "turndown";
import slugify from "slugify";
import { upsertFile } from "../utils/github.js";
import { toFrontmatterFile } from "../utils/markdown.js";

const td = new TurndownService({ headingStyle: "atx" });

function cleanTitle(t) {
  return (t || "Untitled").replace(/\s+/g, " ").trim();
}

async function ingestWeb({ url, commitBranch, commitAuthor }) {
  if (!url) throw new Error("Missing --url");

  // 1️⃣ Fetch HTML
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Fetch failed (${res.status}) for ${url}`);
  const html = await res.text();

  // 2️⃣ Extract main content with Readability
  const dom = new JSDOM(html, { url });
  const { Readability } = await import("@mozilla/readability");
  const reader = new Readability(dom.window.document);
  const article = reader.parse();

  // 3️⃣ Prepare Markdown
  const title = cleanTitle(article?.title || dom.window.document.title || url);
  const mainHTML = article?.content || html;
  const markdown = td.turndown(mainHTML);

  // 4️⃣ File naming + frontmatter
  const dateISO = new Date().toISOString().slice(0, 10);
  const slug = slugify(title, { lower: true, strict: true }).slice(0, 80) || "untitled";
  const filename = `${dateISO}-${slug}.md`;
  const path = `web/${filename}`;

  const frontmatter = { title, url, date: dateISO, source: "web" };
  const body = toFrontmatterFile(frontmatter, markdown);

  // 5️⃣ Commit to GitHub
  await upsertFile({
    path,
    content: body,
    message: `chore(web): ingest ${title}`,
    branch: commitBranch,
    author: commitAuthor,
  });

  return { path, title };
}

export default ingestWeb;