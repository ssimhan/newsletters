import { upsertFile } from '../src/utils/github.js';

const timestamp = new Date().toISOString();
const content = `# Smoke Test

This file was created programmatically.

Timestamp: ${timestamp}
`;

const path = 'docs/SMOKE.md';

upsertFile({
  path,
  content,
  message: `chore: smoke test at ${timestamp}`
}).then(() => {
  console.log('Smoke test committed:', path);
}).catch((e) => {
  console.error('Smoke test failed:', e.message);
  process.exit(1);
});
