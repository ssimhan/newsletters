import { Octokit } from '@octokit/rest';
import { cfg } from '../config.js';

if (!cfg.token) {
  throw new Error('Missing GITHUB_TOKEN in environment (.env).');
}

const octokit = new Octokit({ auth: cfg.token });

export async function upsertFile({ path, content, message }) {
  let sha;
  try {
    const { data } = await octokit.repos.getContent({
      owner: cfg.owner, repo: cfg.repo, path, ref: cfg.branch
    });
    sha = data.sha;
  } catch (_) {
    sha = undefined; // file doesn’t exist
  }

  await octokit.repos.createOrUpdateFileContents({
    owner: cfg.owner,
    repo: cfg.repo,
    path,
    message,
    content: Buffer.from(content, 'utf8').toString('base64'),
    branch: cfg.branch,
    sha
  });
}
