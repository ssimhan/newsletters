# Auto-Ingest Content → Markdown → GitHub

## Overview

This project automates the process of pulling content from different online sources — Substack newsletters, podcast episodes (with transcripts), and webpages — and saving them as clean Markdown files in this GitHub repository.

It’s part of my build-in-public workflow, where I share the full setup for a personal knowledge ingestion system built with free tools and lightweight automation.
The intent is to make it easy for anyone to replicate a similar system using Google Apps Script, Claude Code, and the GitHub API without relying on paid integrations.

---

## Goals

* Automatically fetch and archive my favorite content sources in Markdown format.
* Standardize metadata with YAML frontmatter (title, source, URL, date, etc.).
* Keep the process free and low-code using Google Sheets + Apps Script.
* Optionally scale to Replit or VS Code when automation limits are reached.
* Document the full build process publicly so others can learn and adapt it.

---

## Structure

```
/substack/    → Markdown files from Substack newsletters
/podcasts/    → Podcast episodes and transcripts
/web/         → Saved webpages and articles
/scripts/     → Google Apps Script code snippets and helpers
/docs/        → Setup and troubleshooting documentation
```

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

## Workflow

1. **Control Center (Google Sheet)**
   Each source and feed URL is tracked in a Google Sheet with columns for:
   Source, Feed URL, Last Fetched, Status, and Notes.

2. **Automation (Google Apps Script)**

   * A time-based trigger runs daily to fetch new Substack and podcast entries.
   * A form or bookmarklet trigger adds webpage URLs to the sheet for processing.
   * The script converts HTML to Markdown using Claude Code (via prompt API or manual step).
   * New Markdown files are committed directly to this repo using GitHub’s REST API.

3. **Migration Checkpoints**

   * If Apps Script limits (runtime or size) are hit, the workflow can migrate to Replit or VS Code.
   * Replit handles heavier transformations using Node.js (turndown, axios, cheerio).

4. **Validation & Logging**

   * Every commit is logged in the Google Sheet for transparency.
   * Failures trigger email notifications and appear in the script log.

---

## Build-in-Public Notes

This repository is part of my ongoing “build in public” series — where I share the process of designing lightweight, human-centered systems using AI and automation.
Expect to see evolving scripts, prompts, and structure as the project matures. Pull requests and forks are welcome.

---

## Future Enhancements

* Add a Replit-based CLI version for faster local sync.
* Include an AI summarizer step before committing Markdown.
* Generate tag-based collections (e.g., ai-marketing.md, creative-tools.md).
* Auto-sync selected notes into Notion or Obsidian for personal use.

---

## License
MIT License — feel free to copy, adapt, and improve.
