# Auto-Ingest Content → Markdown → GitHub

## Overview

This project automates the process of pulling content from different online sources — Substack newsletters, podcast episodes (with transcripts), and webpages — and saving them as clean Markdown files in this GitHub repository.

It’s part of my build-in-public workflow, where I share the full setup for a personal knowledge ingestion system built with free tools and lightweight automation.
The intent is to make it easy for anyone to replicate a similar system using VS Code, Claude Code, and the GitHub API without relying on paid integrations.

---

## Goals

* Automatically fetch and archive my favorite content sources in Markdown format.
* Standardize metadata with YAML frontmatter (title, source, URL, date, etc.).
* Document the full build process publicly so others can learn and adapt it.

---

## 🧩 Repository Structure

```
/.github/workflows/sync.yml     # Main GitHub Actions workflow
/scripts/
  normalize-substack-filenames.sh   # Cleans up Substack filenames
/substack/                        # Auto-generated Substack markdown
/podcasts/                        # Auto-generated podcast markdown
/src/                             # Ingest + validation code
```

---

Each Markdown file follows a consistent frontmatter format:

```yaml
---
source: substack | podcast | web
title: "Example Title"
url: "https://example.com"
date: "YYYY-MM-DD"
author: "Author Name"
transcript: true | false
---
```

---

# 🧠 Newsletters Auto-Sync System

This repository automates pulling your **Substack**, **podcast**, and (soon) **webpage** content into Markdown files stored on GitHub — ready to use for blogs, knowledge bases, or AI-assisted writing tools.

It runs automatically every day via GitHub Actions, cleans up filenames, validates frontmatter, and commits the results to `main`.

---

## ✨ What It Does

| Step               | Description                                                                                |
| ------------------ | ------------------------------------------------------------------------------------------ |
| 1️⃣ **Ingests**    | Pulls new posts from a Substack RSS feed and podcast RSS feed.                             |
| 2️⃣ **Normalizes** | Strips random hash suffixes (like `-abc123.md`) from filenames and keeps everything clean. |
| 3️⃣ **Validates**  | Ensures each Markdown file has valid frontmatter (`title`, `date`, `source`, etc.).        |
| 4️⃣ **Commits**    | Automatically commits any changes back to the repo using a rebase-safe push.               |
| 5️⃣ **Schedules**  | Runs every day at 09:17 UTC, or anytime manually via “Run workflow” in GitHub Actions.     |

---

## 🚀 How to Use This for Your Own Feeds

### 1. Fork or Clone This Repo

* Click **“Use this template”** → **Create a new repository**, or
* Run:

  ```bash
  git clone https://github.com/ssimhan/newsletters.git
  ```

### 2. Add Your Own Feeds

Go to **Settings → Secrets and variables → Actions → New repository secret**, and add:

| Name            | Example                                    | Description                              |
| --------------- | ------------------------------------------ | ---------------------------------------- |
| `PAT_REPO`      | `ghp_xxxxxxxxxxx`                          | Personal Access Token with `repo` scope. |
| `SUBSTACK_FEED` | `https://yournewsletter.substack.com/feed` | Your Substack RSS feed.                  |
| `PODCAST_FEED`  | `https://feeds.simplecast.com/xyz123`      | (Optional) Your podcast RSS feed.        |

> 💡 If you have multiple Substack feeds, you can later replace `SUBSTACK_FEED` with `SUBSTACK_FEEDS` (comma-separated) once multi-feed support is enabled.

### 3. Verify the Workflow

In `.github/workflows/sync.yml`, confirm:

```yaml
DEFAULT_BRANCH: "main"
```

You can also change the cron schedule:

```yaml
schedule:
  - cron: "17 9 * * *"  # Daily 09:17 UTC
```

### 4. Trigger It Manually

Go to your repo’s **Actions** tab → **Auto Ingest (Substack + Podcast)** → **Run workflow** → click **Run**.
The workflow will:

1. Ingest new posts
2. Normalize filenames
3. Validate frontmatter
4. Commit & push back to `main`

### 5. View the Results

Check your `/substack` and `/podcasts` folders — new markdown files should appear, one per article or episode.

Each file looks like:

```markdown
---
title: "The Two Kinds of Growth You Can Drive"
date: 2025-03-28
source: "https://substack.gauravvohra.com/p/the-two-kinds-of-growth-you-can-drive"
---

Your article text here...
```

---

## 🛠️ For Developers

### Local Setup

```bash
npm install
npm run ingest:substack
npm run validate
```

To fix validation issues:

```bash
npm run validate:fix
```

Commit manually if needed:

```bash
npm run commit
```

### GitHub Actions Notes

* The workflow is **rebase-safe**, so pushes never fail with “fetch first” errors.
* It auto-commits only if there are actual file changes.
* You can disable podcast or Substack runs via workflow inputs.

---

## 🧹 Troubleshooting

| Issue                                                                        | Likely Cause                       | Fix                                                                                                                   |
| ---------------------------------------------------------------------------- | ---------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| ❌ `bash: scripts/normalize-substack-filenames.sh: No such file or directory` | Script missing                     | Create `scripts/normalize-substack-filenames.sh` with content from repo.                                              |
| ⚠️ `failed to push some refs`                                                | Rebase not enabled                 | Make sure checkout uses `fetch-depth: 0` and workflow includes rebase-safe push logic.                                |
| 📝 Filenames ending in `-.md`                                                | Old Substack pattern               | Run the workflow once — the normalize script will fix these automatically.                                            |
| 💬 Workflow not showing in Actions                                           | `name:` or YAML indentation broken | Ensure first line in `.github/workflows/sync.yml` is `name: Auto Ingest (Substack + Podcast)` with no leading spaces. |

---

## 🦯 Extending the Project

Planned next steps:

* [ ] Support multiple Substack feeds (`SUBSTACK_FEEDS`)
* [ ] Add web source ingestion (bookmarklet or browser extension)
* [ ] Add duplicate detection and caching
* [ ] Auto-generate summaries or keyword tags

---

## 🧑‍💻 Credits

Originally built by [Sandhya Simhan](https://github.com/ssimhan)
inspired by **Lenny’s Newsletter Product Pass** and open-source automation workflows.

---

**License:** MIT — use freely, adapt for your own content systems.

