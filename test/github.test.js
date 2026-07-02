import assert from 'node:assert/strict';
import test from 'node:test';

import { hasSameContent } from '../src/utils/github.js';

test('hasSameContent detects identical GitHub file content', () => {
  const content = 'title: Example\nbody\n';
  const remoteFile = {
    type: 'file',
    encoding: 'base64',
    content: Buffer.from(content, 'utf8').toString('base64'),
  };

  assert.equal(hasSameContent(remoteFile, content), true);
});

test('hasSameContent detects changed content', () => {
  const remoteFile = {
    type: 'file',
    encoding: 'base64',
    content: Buffer.from('old content', 'utf8').toString('base64'),
  };

  assert.equal(hasSameContent(remoteFile, 'new content'), false);
});

test('hasSameContent rejects directory responses', () => {
  assert.equal(hasSameContent([], 'content'), false);
});
