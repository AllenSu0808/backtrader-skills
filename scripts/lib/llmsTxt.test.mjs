import { test } from 'node:test';
import assert from 'node:assert/strict';
import { extractSummary, buildLlmsTxt } from './llmsTxt.mjs';

test('extractSummary skips frontmatter and headings, returns first paragraph', () => {
  const markdown =
    '---\nsource: https://example.com\nfetched: 2026-07-17\ntitle: "Cerebro"\n---\n\n' +
    '# Cerebro\n\nCerebro is the engine that ties everything together.\n';
  assert.equal(
    extractSummary(markdown),
    'Cerebro is the engine that ties everything together.'
  );
});

test('extractSummary truncates long paragraphs', () => {
  const longLine = 'x'.repeat(150);
  const markdown = `# Title\n\n${longLine}\n`;
  const result = extractSummary(markdown, 100);
  assert.equal(result.length, 100);
  assert.ok(result.endsWith('…'));
});

test('buildLlmsTxt groups entries by category and formats links', () => {
  const entries = [
    {
      category: 'Cerebro',
      title: 'Cerebro',
      relPath: 'cerebro/cerebro.md',
      summary: 'Runs everything.',
    },
    {
      category: 'Quickstart Guide',
      title: 'Quickstart Guide',
      relPath: 'quickstart-guide/quickstart-quickstart.md',
      summary: 'Get started fast.',
    },
  ];
  const result = buildLlmsTxt(entries);
  assert.match(result, /^# Backtrader Documentation/);
  assert.match(result, /## Cerebro\n- \[Cerebro\]\(cerebro\/cerebro\.md\): Runs everything\./);
  assert.match(
    result,
    /## Quickstart Guide\n- \[Quickstart Guide\]\(quickstart-guide\/quickstart-quickstart\.md\): Get started fast\./
  );
});
