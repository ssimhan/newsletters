import fetch from 'node-fetch';
import { XMLParser } from 'fast-xml-parser';
import TurndownService from 'turndown';
import { upsertFile } from '../utils/github.js';
import { toMarkdownFile, sanitizeFileName } from '../utils/markdown.js';
import crypto from 'node:crypto';

const parser = new XMLParser({ ignoreAttributes: false });
const turndown = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
});

export async function ingestSubstack(feedUrl) {
  const res = await fetch(feedUrl, { redirect: 'follow' });
  if (!res.ok) throw new Error(`Feed request failed: ${res.status} ${res.statusText}`);
  const xml = await res.text();
  const feed = parser.parse(xml);

  const items = feed?.rss?.channel?.item || [];
  if (!items.length) {
    console.log('No items found in feed.');
    return;
  }

  let count = 0;
for (const item of items.slice(0, 10)) {
  const title = (item.title || 'Untitled').toString();
  const link = (item.link || '').toString();

  let pubDate = '';
  try {
    pubDate = new Date(item.pubDate).toISOString().slice(0, 10);
  } catch {
    pubDate = new Date().toISOString().slice(0, 10);
  }

  const author =
    (item['dc:creator'] && item['dc:creator'].toString()) ||
    (feed?.rss?.channel?.title?.toString?.() ?? '');

  const html = (item['content:encoded'] || item.description || '').toString();
  const bodyMd = html ? turndown.turndown(html) : '';

  const md = toMarkdownFile({
    frontmatter: {
      source: 'substack',
      title,
      url: link,
      date: pubDate,
      author,
      transcript: false
    },
    bodyMd
  });

  const slugBase = sanitizeFileName(`${pubDate}-${title}`);
  const shortHash = crypto.createHash('sha1').update(link || title).digest('hex').slice(0, 8);
  const path = `substack/${slugBase}-${shortHash}.md`;

  try {
    await upsertFile({
      path,
      content: md,
      message: `substack: ${title}`
    });
    count += 1;
  } catch (e) {
    console.error(`skip ${title}: ${e.message}`);
  }
}
console.log(`Ingested ${count} items from Substack feed.`);
}
