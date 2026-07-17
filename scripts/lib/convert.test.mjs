import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { convertPages } from './convert.mjs';

test('writes markdown files grouped by category with frontmatter', async () => {
  const tempDir = await mkdtemp(path.join(tmpdir(), 'btdocs-'));
  const docsDir = path.join(tempDir, 'docs');
  const failedPath = path.join(tempDir, 'raw', '_failed.json');

  const pages = [
    {
      url: 'https://www.backtrader.com/docu/cerebro/',
      title: 'Cerebro',
      contentHtml: '<h1>Cerebro</h1><p>Body.</p>',
    },
    {
      url: 'https://www.backtrader.com/docu/quickstart/quickstart/',
      title: 'Quickstart Guide',
      contentHtml: '<h1>Quickstart</h1><p>Body.</p>',
    },
  ];

  const written = await convertPages(
    { pages, failed: [] },
    { docsDir, fetchedDate: '2026-07-17', failedPath }
  );

  assert.equal(written.length, 2);

  const cerebroContent = await readFile(path.join(docsDir, 'cerebro', 'cerebro.md'), 'utf8');
  assert.match(
    cerebroContent,
    /^---\nsource: https:\/\/www\.backtrader\.com\/docu\/cerebro\/\nfetched: 2026-07-17\ntitle: "Cerebro"\n---\n\n# Cerebro/
  );

  const quickstartContent = await readFile(
    path.join(docsDir, 'quickstart-guide', 'quickstart-quickstart.md'),
    'utf8'
  );
  assert.match(quickstartContent, /^---\n/);

  await rm(tempDir, { recursive: true, force: true });
});

test('writes a _failed.json file when some pages failed', async () => {
  const tempDir = await mkdtemp(path.join(tmpdir(), 'btdocs-'));
  const docsDir = path.join(tempDir, 'docs');
  const failedPath = path.join(tempDir, 'raw', '_failed.json');

  await convertPages(
    { pages: [], failed: [{ url: 'https://example.com/x', title: 'X', error: 'boom' }] },
    { docsDir, fetchedDate: '2026-07-17', failedPath }
  );

  const failedContent = JSON.parse(await readFile(failedPath, 'utf8'));
  assert.equal(failedContent.length, 1);
  assert.equal(failedContent[0].error, 'boom');

  await rm(tempDir, { recursive: true, force: true });
});
