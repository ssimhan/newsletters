# Implementation Progress

✅ **Stage 1 — Project Scaffolding & Config: Complete**  
- Installed VS Code and Node v24.  
- Verified Git (`v2.39.5 Apple`).  
- Cloned repo successfully via VS Code.  
- Created `.env` and `.env.example` files.  
- Added:
  - `src/config.js`
  - `src/utils/github.js`
  - `src/utils/markdown.js`
  - `scripts/smoke-commit.js`
- Verified `npm run smoke` commits `docs/SMOKE.md` to GitHub.
- Committed and pushed successfully.  

Next: **Stage 2 — Substack Ingest**  
→ Build the Substack RSS → Markdown pipeline and test with  
`https://lennysnewsletter.substack.com/feed`

# Implementation Plan — Auto-Ingest (VS Code + Claude Code + GitHub)

This plan breaks the project into clear, testable stages. Each stage lists goals, tasks, and a **Test/Validation** you’ll run before moving on.

---

## Stage 0 — Prereqs & Environment Sanity Check

**Goal:** Ensure your local environment can run Node.js scripts and push to GitHub.

**Tasks**
- [ ] Install Node.js v18+ (recommend v20).
- [ ] Confirm `git` works and you can push to `ssimhan/newsletters`.
- [ ] Open the repo in **VS Code**.
- [ ] Install the **Claude Code** VS Code extension (already installed) and sign in.
- [ ] Create a **Personal Access Token** in GitHub with `repo` scope and save as a secret locally (in `.env`) and in GitHub Actions later.

**Test / Validation**
- Run: `node -v` (expect v18+).
- Run in repo: `git pull` then `git push` (no errors).
- Create a dummy Node file `hello.js`:
  ```js
  console.log("hello");
````

Run `node hello.js` and expect `hello`.

**Exit Criteria**

* You can run Node locally and push commits to `main`.

---

## Stage 1 — Project Scaffolding & Config

**Goal:** Create the Node.js scaffolding to support all ingestion types.

**Tasks**

* [ ] Add `package.json` and `src/` with folders: `utils/`, `sources/`.
* [ ] Add `.env.example` for `GITHUB_TOKEN`, `GITHUB_OWNER`, `GITHUB_REPO`, `GITHUB_DEFAULT_BRANCH`.
* [ ] Add `src/config.js` and `src/utils/github.js` (Octokit upsert).

**Test / Validation**

* Add a test script `scripts/smoke-commit.js` that writes a trivial file to `docs/SMOKE.md` using your upsert helper.
* Run: `node scripts/smoke-commit.js`.
* Check GitHub repo → file exists with latest timestamp.

**Exit Criteria**

* Programmatic commit to your repo succeeds using the helper.

---

## Stage 2 — Substack Ingest (RSS → Markdown)

**Goal:** Pull a Substack RSS feed, convert to Markdown with frontmatter, and commit into `/substack/`.

**Tasks**

* [ ] Implement `src/sources/substack.js`:

  * Parse RSS via `fast-xml-parser`.
  * Prefer `content:encoded` HTML; fallback to `description`.
  * Convert HTML → Markdown via Turndown.
  * Save MD with YAML frontmatter (title, url, date, author, source=substack).
* [ ] Implement `src/utils/markdown.js` (frontmatter + filename sanitization).
* [ ] Add CLI entry `src/cli.js substack --feed`.

**Test / Validation**

* Run:

  ```bash
  SUBSTACK_FEED="https://lennysnewsletter.substack.com/feed" node src/cli.js substack --feed $SUBSTACK_FEED
  ```
* Verify new files appear in `/substack/` in GitHub with sensible slugs and frontmatter.

**Exit Criteria**

* At least 3 recent posts are committed with correct frontmatter and readable Markdown.

---

## Stage 3 — Podcast Ingest (RSS + Transcript Fallbacks)

**Goal:** Pull podcast feed items, convert show notes/transcripts to Markdown, commit into `/podcasts/`.

**Tasks**

* [ ] Implement `src/sources/podcast.js`:

  * Parse feed.
  * Use `<content:encoded>` or description; map transcript if present.
  * Convert to Markdown; add `transcript: true|false` in frontmatter.
* [ ] Add CLI command: `podcast --feed`.

**Test / Validation**

* Run:

  ```bash
  PODCAST_FEED="https://feeds.simplecast.com/xyz" node src/cli.js podcast --feed $PODCAST_FEED
  ```
* Verify `/podcasts/` contains MD files with frontmatter and body.

**Exit Criteria**

* At least 2 podcast items committed; transcript flag set correctly where applicable.

---

## Stage 4 — Web Page Ingest (Single URL)

**Goal:** Fetch a single URL, extract main content, convert to Markdown, and commit into `/web/`.

**Tasks**

* [ ] Implement `src/sources/web.js`:

  * `fetch` HTML, `extractMainContent()` (strip nav/aside/footer/script).
  * Fix relative links, convert to Markdown.
  * Use `<title>` as fallback for frontmatter title.
* [ ] Add CLI command: `web --url`.

**Test / Validation**

* Run:

  ```bash
  URL="https://example.com/article" node src/cli.js web --url $URL
  ```
* Verify `/web/` contains a new MD with main content (not just boilerplate).

**Exit Criteria**

* One well-formed Markdown file appears in `/web/` with readable content and working absolute links.

---

## Stage 5 — Standardization & Frontmatter Quality

**Goal:** Ensure uniform metadata and filenames across all sources.

**Tasks**

* [ ] Confirm `toMarkdownFile()` outputs identical key ordering and newline termination.
* [ ] Enforce slug format: `YYYY-MM-DD-title.md`.
* [ ] Add unit-like checks (simple Node script) to validate:

  * Required frontmatter keys present.
  * Date is ISO `YYYY-MM-DD`.
  * Title exists and < 120 chars.

**Test / Validation**

* Run: `node scripts/validate-frontmatter.js`.
* Expect a list of files and “OK” status; any invalid file prints a reason and exits non-zero.

**Exit Criteria**

* Validation script returns success across `/substack`, `/podcasts`, `/web`.

---

## Stage 6 — GitHub Actions (Cron) & Secrets

**Goal:** Automate daily sync in GitHub Actions.

**Tasks**

* [ ] Add `.github/workflows/sync.yml` to:

  * Checkout → setup Node → install → `npm run all`.
  * Use repository secrets: `PAT_REPO`, `SUBSTACK_FEED`, `PODCAST_FEED`.
* [ ] Add `npm run all` in `package.json`.

**Test / Validation**

* Manually trigger the workflow (`workflow_dispatch`).
* Confirm successful run and new commits.

**Exit Criteria**

* Scheduled run (cron) produces commits without manual intervention.

---

## Stage 7 — Logging, Idempotency & Duplicate Control

**Goal:** Avoid duplicate commits and capture simple logs.

**Tasks**

* [ ] Track processed item IDs (e.g., link GUID hashes) in a lightweight JSON file in `/docs/state.json` or use frontmatter check by URL.
* [ ] Before committing, skip if `url` already exists in the repo (search via GitHub API list or cached state).
* [ ] Log summaries per run to `/docs/logs/YYYY-MM-DD.md` (append).

**Test / Validation**

* Re-run the same feed commands twice.
* Verify second run **does not** create duplicates and **does** write a run log entry.

**Exit Criteria**

* No duplicates on re-run; logs show a clean summary.

---

## Stage 8 — Error Handling & Retries

**Goal:** Make the CLI resilient to transient errors.

**Tasks**

* [ ] Wrap network calls with try/catch; implement 2–3 basic retries (exponential backoff).
* [ ] Fail individual items without failing the whole batch; aggregate errors into the log file.
* [ ] Exit non-zero if > N critical failures (configurable).

**Test / Validation**

* Temporarily simulate a failing URL/feed.
* Confirm the run completes with errors captured in `/docs/logs/` and a non-zero exit if threshold exceeded.

**Exit Criteria**

* Failures are visible, contained, and actionable without halting all ingestion.

---

## Stage 9 — Human-in-the-Loop Quality Pass (Claude Code)

**Goal:** Use Claude for quick cleanup/summarization when needed (manual step).

**Tasks**

* [ ] Open a generated Markdown post in VS Code.
* [ ] Prompt Claude: “Rewrite this for readability, keep structure, preserve quotes, remove boilerplate, do not alter links.”
* [ ] Save edited MD back to the repo.

**Test / Validation**

* Pick one Substack file and run a cleanup pass. Ensure the MD remains valid under the validator script.

**Exit Criteria**

* Claude-edited file passes validation and remains human-readable with preserved metadata.

---

## Stage 10 — Backfill & One-Time Imports

**Goal:** Ingest historical content in controlled batches.

**Tasks**

* [ ] Add `--limit` and `--since` flags to `substack`/`podcast` for controlled backfills.
* [ ] Maintain simple progress markers in `/docs/state.json`.

**Test / Validation**

* Run a backfill with `--limit 5`, verify only 5 new files.
* Re-run with the same flags; no duplicates.

**Exit Criteria**

* Backfill works in small, repeatable batches.

---

## Stage 11 — Documentation & README Update

**Goal:** Reflect the new VS Code + Claude workflow publicly.

**Tasks**

* [ ] Update top-level `README.md` with:

  * Requirements, quickstart, `.env` variables.
  * CLI commands and examples.
  * How to enable the GitHub Actions workflow.
  * Troubleshooting section.
* [ ] Add `docs/` pages for “Architecture”, “Validation Rules”, and “Common Errors”.

**Test / Validation**

* Fresh clone the repo on another machine (or Codespaces).
* Follow README only; confirm a successful Substack ingest.

**Exit Criteria**

* README supports a clean, first-time setup without external help.

---

## Stage 12 — Stretch Goals (Optional)

**Options**

* [ ] Add YouTube/Spotify transcript ingestion.
* [ ] Add Claude summarizer step before commit (opt-in flag `--summarize`).
* [ ] Tag collections: generate `docs/tags/*.md` from frontmatter.
* [ ] Notion/Obsidian export (local script).

**Test / Validation**

* Each feature includes a small CLI flag and a success path verified by the validator and run logs.

---

## Rollback Plan

* If a run produces bad files, revert the specific commit via GitHub UI.
* Use a branch for large backfills; merge only after validator passes.
* Keep `.env` out of version control; rotate `PAT_REPO` if it leaks.

---

```
```
