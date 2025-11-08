import matter from 'gray-matter';

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
