# Best Practices for Adding New Sources (Substack & Podcast Ingest)

This guide explains how non-technical users can add their **own content sources**—like newsletters or podcasts—to the auto-ingest system you just built. The goal: make it clear, repeatable, and easy to extend.

---

## 💡 Overview

Your project automatically pulls content from RSS feeds (like Substack or podcasts) and saves them to Markdown files in your GitHub repo.  Each type of content (newsletter, podcast, webpage) has its own small script that:

1. **Fetches the feed** – reads a public RSS or Atom feed.
2. **Parses the entries** – extracts titles, authors, dates, and content.
3. **Converts to Markdown** – cleans up HTML and adds a frontmatter section.
4. **Commits to GitHub** – saves each item as a `.md` file under a folder (e.g., `/substack/` or `/podcasts/`).

---

## 🧭 Key Folders & Files

| Path                      | Purpose                                       |
| ------------------------- | --------------------------------------------- |
| `src/sources/substack.js` | Logic for newsletter feeds (like Substack).   |
| `src/sources/podcast.js`  | Logic for podcast feeds (like a16z).          |
| `src/utils/github.js`     | Handles pushing files to GitHub.              |
| `src/utils/markdown.js`   | Converts data into Markdown with frontmatter. |
| `src/cli.js`              | Lets you run each type from the terminal.     |

---

## 🧱 How to Add Your Own Source

Here’s the simple 3-step process if you want to pull *your* favorite Substack or podcast instead.

### **Step 1. Find the feed URL**

* **Substack:** go to the author’s site → add `/feed` to the end of the URL.
  Example:
  `https://lennysnewsletter.substack.com/feed`
* **Podcast:** visit the podcast page (Apple, Spotify, or Simplecast) and look for **RSS Feed**.
  Example:
  `https://feeds.simplecast.com/Hb_IuXOo`  (for the a16z podcast)

If you open the link in your browser and see a page full of text starting with `<?xml ...>`, that’s your RSS feed.

---

### **Step 2. Run the ingest command**

Open the terminal in VS Code (``Ctrl + ` ``) and run one of these:

#### For a Substack feed

```bash
node src/cli.js substack --feed "https://YOUR-SUBSTACK-URL/feed"
```

#### For a Podcast feed

```bash
node src/cli.js podcast --feed "https://YOUR-PODCAST-FEED"
```

What happens:

* The script downloads the latest 5–10 posts or episodes.
* Each one becomes a `.md` file under `/substack/` or `/podcasts/`.
* Each file includes metadata like title, date, author, and link.

---

### **Step 3. Check GitHub**

After running the script, go to your repo → you should see new Markdown files appear automatically:

* `/substack/2025-05-08-how-did-you-hear-about-us.md`
* `/podcasts/2025-07-21-ai-and-the-future-of-work.md`

If you don’t see new files, check the VS Code terminal for any error messages (like invalid tokens or bad feed URLs).

---

## ⚙️ Optional: Add Another Content Type

You can copy one of the existing scripts (like `substack.js`) and use it as a template for other sources—like Medium, YouTube, or Notion.
Just save it as `src/sources/medium.js`, then add it to `src/cli.js` the same way Substack and Podcast are wired in.

---

## ✅ Quick Reference Checklist

| Task               | Command                                 | Output                         |
| ------------------ | --------------------------------------- | ------------------------------ |
| Test Substack feed | `node src/cli.js substack --feed <url>` | `.md` files under `/substack/` |
| Test Podcast feed  | `node src/cli.js podcast --feed <url>`  | `.md` files under `/podcasts/` |
| Verify commit      | Check GitHub repo                       | New files + commit message     |
| Add new source     | Copy an existing `src/sources/*.js`     | Add to CLI + test feed         |

---

## 🧩 Tips for Success

* Keep your feed URLs **publicly accessible** (no login required).
* Only include **a few items per run** (10 or fewer) to avoid GitHub rate limits.
* Every feed type saves files into its own folder (`substack`, `podcasts`, `web`), so they stay organized.
* You can rerun commands anytime — the code skips duplicates automatically.

---

### 🎯 Example: Adding Your Favorite Substack

If you love *Every by Dan Shipper*, you’d just run:

```bash
node src/cli.js substack --feed "https://every.to/feed"
```

In a few seconds, you’d have 10 Markdown versions of their posts in `/substack/` — ready for your own notes or analysis.

---

## 💬 Summary

This system is modular and repeatable. If you can copy a URL and run a terminal command, you can plug in *any* feed—Substack, podcast, or other—and automatically capture high-quality Markdown versions in your GitHub repo.

Future updates can add:

* Automatic scheduling (GitHub Actions)
* Feed-specific cleaning rules
* Claude-assisted summaries or tagging

That’s it — you’ve got a working personal content ingester!
