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

## Build-in-Public Notes

This repository is part of my ongoing “build in public” series — where I share the process of designing lightweight, human-centered systems using AI and automation.
Expect to see evolving scripts, prompts, and structure as the project matures. Pull requests and forks are welcome.

---

## License
MIT License — feel free to copy, adapt, and improve.
