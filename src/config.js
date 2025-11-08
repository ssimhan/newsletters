import 'dotenv/config';

export const cfg = {
  token: process.env.GITHUB_TOKEN || process.env.PAT_REPO,
  owner: process.env.GITHUB_OWNER || process.env.REPO_OWNER || "ssimhan",
  repo: process.env.GITHUB_REPO || process.env.REPO_NAME || "newsletters",
  branch: process.env.GITHUB_DEFAULT_BRANCH || process.env.DEFAULT_BRANCH || "main"
};

