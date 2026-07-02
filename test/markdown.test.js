import assert from 'node:assert/strict';
import test from 'node:test';

import matter from 'gray-matter';

import { toMarkdownFile } from '../src/utils/markdown.js';

test('toMarkdownFile uses the validator canonical frontmatter order', () => {
  const markdown = toMarkdownFile({
    frontmatter: {
      source: 'substack',
      title: 'Example',
      url: 'https://example.com/post',
      date: '2026-07-02',
      author: 'Example Author',
      transcript: false,
    },
    bodyMd: 'Body',
  });
  const keys = Object.keys(matter(markdown).data);

  assert.deepEqual(keys, [
    'title',
    'date',
    'source',
    'url',
    'author',
    'transcript',
  ]);
});
