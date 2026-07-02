import { Octokit } from '@octokit/rest';
import { cfg } from '../config.js';

let octokit;

function githubClient() {
  if (!cfg.token) {
    throw new Error('Missing GITHUB_TOKEN in environment (.env).');
  }

  octokit ||= new Octokit({ auth: cfg.token });
  return octokit;
}

export function hasSameContent(remoteFile, content) {
  if (
    !remoteFile ||
    Array.isArray(remoteFile) ||
    remoteFile.type !== 'file' ||
    remoteFile.encoding !== 'base64' ||
    typeof remoteFile.content !== 'string'
  ) {
    return false;
  }

  const remoteContent = Buffer.from(remoteFile.content, 'base64');
  const nextContent = Buffer.from(content, 'utf8');
  return remoteContent.equals(nextContent);
}

export async function upsertFile({ path, content, message }) {
  const client = githubClient();
  let sha;
  try {
    const { data } = await client.repos.getContent({
      owner: cfg.owner, repo: cfg.repo, path, ref: cfg.branch
    });
    sha = data.sha;

    if (hasSameContent(data, content)) {
      return { changed: false, sha };
    }
  } catch (error) {
    if (error?.status !== 404) throw error;
    sha = undefined; // file doesn’t exist
  }

  const { data } = await client.repos.createOrUpdateFileContents({
    owner: cfg.owner,
    repo: cfg.repo,
    path,
    message,
    content: Buffer.from(content, 'utf8').toString('base64'),
    branch: cfg.branch,
    sha
  });

  return { changed: true, sha: data.content?.sha };
}
