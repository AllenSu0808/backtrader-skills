import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildFrontmatter } from './frontmatter.mjs';

test('builds a YAML frontmatter block with source, fetched date, and title', () => {
  const result = buildFrontmatter({
    source: 'https://www.backtrader.com/docu/cerebro/',
    fetched: '2026-07-17',
    title: 'Cerebro',
  });
  assert.equal(
    result,
    '---\nsource: https://www.backtrader.com/docu/cerebro/\nfetched: 2026-07-17\ntitle: "Cerebro"\n---\n\n'
  );
});

test('escapes double quotes inside the title', () => {
  const result = buildFrontmatter({
    source: 'https://example.com/x',
    fetched: '2026-07-17',
    title: 'Say "Hello"',
  });
  assert.match(result, /title: "Say \\"Hello\\""/);
});
