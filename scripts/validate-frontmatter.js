// scripts/validate-frontmatter.js
// Usage:
//   node scripts/validate-frontmatter.js
//   node scripts/validate-frontmatter.js --fix
//
// Validates frontmatter in /substack, /podcasts, /web.
// Skips README.md and any non-.md files in those roots.
//
// Rules:
// - required keys: title (<=120 chars), date (YYYY-MM-DD), source
// - filename: YYYY-MM-DD-title.md
// - key order: [title, date, source, url, author, transcript]
// - ensure trailing newline at EOF
//
// With --fix:
// - normalizes date to YYYY-MM-DD
// - reorders keys to canonical order
// - enforces trailing newline
// - renames file to expected slug if needed

import fs from "fs";
import path from "path";
import matter from "gray-matter";

const ROOTS = ["substack", "podcasts", "web"];
const REQUIRED = ["title", "date", "source"];
const KEY_ORDER = ["title", "date", "source", "url", "author", "transcript"];
const FIX = process.argv.includes("--fix");

let failures = 0;
let checked = 0;
const problems = [];

function isISODate(s) {
  return typeof s === "string" && /^\d{4}-\d{2}-\d{2}$/.test(s);
}

function toISODate(input) {
  if (!input) return null;
  if (isISODate(input)) return input;
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return null;
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function slugifyTitle(title) {
  // Simple, safe slugs: lowercase a-z, 0-9, and hyphens only.
  // 1) Lowercase + trim
  // 2) Remove any character that's not a-z, 0-9, space, or hyphen
  // 3) Collapse spaces to hyphens
  // 4) Collapse multiple hyphens
  // 5) Trim leading/trailing hyphens
  return String(title)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")   // drop emojis, $, +, punctuation, etc.
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function reorderKeys(data) {
  const ordered = {};
  for (const k of KEY_ORDER) {
    if (k in data && data[k] !== undefined && data[k] !== null) {
      ordered[k] = data[k];
    }
  }
  for (const k of Object.keys(data)) {
    if (!KEY_ORDER.includes(k)) ordered[k] = data[k];
  }
  return ordered;
}
function safeReadMatter(fullPath) {
  try {
    const raw = fs.readFileSync(fullPath, "utf8");
    return matter(raw, { preserveOrder: true });
  } catch {
    return null;
  }
}

function findAvailableName(root, baseFileName) {
  // If baseFileName exists, append -2, -3, ... before .md
  const base = baseFileName.replace(/\.md$/i, "");
  let i = 2;
  let candidate = `${baseFileName}`;
  while (fs.existsSync(path.join(root, candidate))) {
    candidate = `${base}-${i}.md`;
    i++;
  }
  return candidate;
}

function writeFileWithMatter(fullPath, data, content) {
  const fm = matter.stringify(content.replace(/\s*$/, "") + "\n", data);
  fs.writeFileSync(fullPath, fm, "utf8");
}

function validateAndMaybeFixFile(root, entry) {
  const full = path.join(root, entry);
  const raw = fs.readFileSync(full, "utf8");
  const parsed = matter(raw, { preserveOrder: true });
  let { data, content } = parsed;

  checked++;
  const fileIssues = [];

  // Required keys
  for (const req of REQUIRED) {
    if (!(req in data)) fileIssues.push(`missing key: "${req}"`);
  }

  // Title length
  if (data.title && String(data.title).length > 120) {
    fileIssues.push("title too long (>120 chars)");
  }

  // Date normalization
  const iso = toISODate(data.date);
  if (!iso) fileIssues.push(`invalid date: ${data.date ?? "(missing)"}`);

  // Expected filename
  let expectedName = entry;
  if (iso && data.title) {
    const slug = slugifyTitle(data.title);
    expectedName = `${iso}-${slug}.md`;
    if (entry !== expectedName) {
      fileIssues.push(`filename mismatch → expected "${expectedName}"`);
    }
  }

  // If --fix, apply safe fixes
  if (FIX) {
    let changed = false;

    // normalize date
    if (iso && data.date !== iso) {
      data.date = iso;
      changed = true;
    }

    // reorder keys
    const reordered = reorderKeys(data);
    const sameOrder =
      JSON.stringify(Object.keys(reordered)) ===
      JSON.stringify(Object.keys(data));
    if (!sameOrder) {
      data = reordered;
      changed = true;
    }

    // ensure trailing newline + rewrite
    const needsNewline = !/\n$/.test(raw);
    if (changed || needsNewline) {
      writeFileWithMatter(full, data, content);
    }

    // rename if needed
    // rename if needed (with collision handling: dedupe by url, else suffix -2)
if (iso && data.title) {
  const slug = slugifyTitle(data.title);
  const desired = `${iso}-${slug}.md`;
  const currentFull = path.join(root, entry);
  const desiredFull = path.join(root, desired);

  if (entry !== desired) {
    if (!fs.existsSync(desiredFull)) {
      fs.renameSync(currentFull, desiredFull);
    } else {
      // desired exists — compare URLs to decide dedupe vs suffix
      const existing = safeReadMatter(desiredFull);
      const thisUrl = data.url || null;
      const existingUrl = existing?.data?.url || null;

      if (thisUrl && existingUrl && thisUrl === existingUrl) {
        // duplicate content (same URL) → remove current file
        fs.unlinkSync(currentFull);
      } else {
        // different URLs — keep both, add numeric suffix
        const altName = findAvailableName(root, desired);
        const altFull = path.join(root, altName);
        fs.renameSync(currentFull, altFull);
      }
    }
  }
}

    // Re-read for final state (post-fix checks)
    const raw2 = fs.readFileSync(
      path.join(root, fs.existsSync(full) ? entry : expectedName),
      "utf8"
    );
    const parsed2 = matter(raw2, { preserveOrder: true });
    data = parsed2.data;
    content = parsed2.content;
  }

  if (fileIssues.length) {
    problems.push({ file: path.join(root, entry), issues: fileIssues });
    failures++;
  }
}

for (const root of ROOTS) {
  if (!fs.existsSync(root)) continue;
  for (const e of fs.readdirSync(root)) {
    if (!e.endsWith(".md")) continue;
    if (e.toLowerCase() === "readme.md") continue;
    validateAndMaybeFixFile(root, e);
  }
}

if (problems.length) {
  console.log("Frontmatter validation results:");
  for (const p of problems) {
    console.log(`- ${p.file}`);
    for (const i of p.issues) console.log(`  • ${i}`);
  }
  console.log(`\nChecked: ${checked}, Files with issues: ${failures}`);
  process.exitCode = 1;
} else {
  console.log(`All good! Checked ${checked} files.`);
}