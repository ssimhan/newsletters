import matter from 'gray-matter';
import fs from "fs";
import path from "path";
import slugify from "slugify";


export function toMarkdownFile({ frontmatter, bodyMd }) {
  const fm = {
    source: frontmatter.source,
    title: frontmatter.title,
    url: frontmatter.url,
    date: frontmatter.date,
    author: frontmatter.author || '',
    transcript: !!frontmatter.transcript
  };
  const file = matter.stringify(bodyMd || '', fm);
  return file.endsWith('\n') ? file : `${file}\n`;
}

export function sanitizeFileName(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\d\- ]+/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 120);
}
// Minimal helper: frontmatter + body → single Markdown string
export function toFrontmatterFile(frontmatter, body) {
  const lines = ["---"];
  for (const [key, val] of Object.entries(frontmatter)) {
    // stringify simple scalars safely
    let out = val;
    if (typeof val === "string") {
      // quote if it has colon, hash, leading/trailing space, or starting with { or [
      out = /[:#{}\[\]\n]|^\s|\s$/.test(val) ? JSON.stringify(val) : val;
    } else if (val === null || val === undefined) {
      out = "";
    }
    lines.push(`${key}: ${out}`);
  }
  lines.push("---", "");
  return lines.join("\n") + (body || "").trim() + "\n";
}

export function toSlug(title) {
  return slugify(title, {
    lower: true,
    strict: true,      // ASCII-only; strips punctuation
    locale: "en",
    trim: true
  });
}

export function canonicalFilename(dateISO, title) {
  return `${dateISO}-${toSlug(title)}.md`;
}

export function writeMarkdownFile(rootDir, dateISO, title, body) {
  const dir = path.join(process.cwd(), rootDir);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const filename = canonicalFilename(dateISO, title);
  const full = path.join(dir, filename);
  fs.writeFileSync(full, body, "utf8");
  return full;
}
