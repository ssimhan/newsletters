// scripts/update-plan.js
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

// ---- tiny arg parser ----
const args = process.argv.slice(2);
const getArg = (name, def = "") => {
  const i = args.findIndex(a => a === `--${name}`);
  if (i !== -1 && args[i + 1]) return args[i + 1];
  return def;
};

const planPath = getArg("file", "implementation.md"); // default from your note
const progress = getArg("progress", "").trim();
const next = getArg("next", "").trim();
const stage = getArg("stage", "Stage 6 — GitHub Actions (Cron) & Secrets");

// ---- metadata ----
const now = new Date();
const when = now.toLocaleString("en-US", {
  timeZone: "America/Los_Angeles",
  dateStyle: "medium",
  timeStyle: "short",
});
const branch = execSync("git rev-parse --abbrev-ref HEAD").toString().trim();

// ---- format bullets ----
const toBullets = (txt) =>
  txt
    .split(/\r?\n/)
    .map(s => s.trim())
    .filter(Boolean)
    .map(s => `- ${s}`)
    .join("\n");

const progressBullets = progress ? toBullets(progress) : "- (add details)";
const nextBullets = next ? toBullets(next) : "- (add next steps)";

// ---- block to append ----
const block = `
---

✅ **Progress (${when} PT)** — ${stage}
- Branch: \`${branch}\`

**What moved forward**
${progressBullets}

**Next steps**
${nextBullets}
`;

const abs = path.resolve(process.cwd(), planPath);

// guard: ensure file exists
if (!fs.existsSync(abs)) {
  console.error(`Plan file not found at: ${abs}`);
  process.exit(1);
}

// append
fs.appendFileSync(abs, block, "utf8");

// git add/commit/push
execSync(`git add "${planPath}"`, { stdio: "inherit" });
execSync(`git commit -m "docs(plan): update ${stage} progress"`, { stdio: "inherit" });
execSync(`git push`, { stdio: "inherit" });

console.log(`\n✅ Updated and pushed: ${planPath}`);