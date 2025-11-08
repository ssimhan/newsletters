import fetch from 'node-fetch';
import { XMLParser } from 'fast-xml-parser';
import TurndownService from 'turndown';
import { upsertFile } from '../utils/github.js';
import { toMarkdownFile, sanitizeFileName } from '../utils/markdown.js';

const parser = new XMLParser({ ignoreAttributes: false });
const turndown = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
});

export async function ingestPodcast(feedUrl) {
  const res = await fetch(feedUrl, { redirect: 'follow' });
  if (!res.ok) throw new Error(`Feed request failed: ${res.status} ${res.statusText}`);
  const xml = await res.text();
  const feed = parser.parse(xml);

  const channel = feed?.rss?.channel;
  const items = channel?.item || [];
  if (!items.length) {
    console.log('No items found in podcast feed.');
    return;
  }

  let count = 0;
  for (const item of items.slice(0, 8)) {
    const title = (item.title || 'Untitled').toString();
    const link = (item.link || '').toString();

    let pubDate = '';
    try {
      pubDate = new Date(item.pubDate).toISOString().slice(0, 10);
    } catch {
      pubDate = new Date().toISOString().slice(0, 10);
    }

    const html = (item['content:encoded'] || item.description || '').toString();
    const bodyMd = html ? turndown.turndown(html) : '';

    const transcript = /transcript/i.test(html);

    const md = toMarkdownFile({
      frontmatter: {
        source: 'podcast',
        title,
        url: link,
        date: pubDate,
        author: (channel?.title || '').toString(),
        transcript
      },
      bodyMd
    });

    const slug = sanitizeFileName(`${pubDate}-${title}`);
    const path = `podcasts/${slug}.md`;

    try {
      await upsertFile({
        path,
        content: md,
        message: `podcast: ${title}`
      });
      count += 1;
    } catch (e) {
      console.error(`skip ${title}: ${e.message}`);
    }
  }

  console.log(`Ingested ${count} podcast items.`);
}
