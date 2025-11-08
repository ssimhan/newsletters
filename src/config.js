import 'dotenv/config';

export const cfg = {
  owner: process.env.GITHUB_OWNER,
  repo: process.env.GITHUB_REPO,
  branch: process.env.GITHUB_DEFAULT_BRANCH || 'main',
  token: process.env.GITHUB_TOKEN,
};
