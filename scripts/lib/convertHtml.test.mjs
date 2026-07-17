import { test } from 'node:test';
import assert from 'node:assert/strict';
import { htmlToMarkdown } from './convertHtml.mjs';

test('converts headings and paragraphs', () => {
  const html = '<h1>Title</h1><p>Body text.</p>';
  assert.equal(htmlToMarkdown(html), '# Title\n\nBody text.\n');
});

test('converts a highlighted code block, ignoring the clipboard button', () => {
  const html =
    '<div class="highlight"><pre id="__code_0"><span></span>' +
    '<button class="md-clipboard md-icon" data-clipboard-target="#__code_0 &gt; code"></button>' +
    '<code>print("hello")\n</code></pre></div>';
  assert.equal(htmlToMarkdown(html), '```\nprint("hello")\n```\n');
});

test('flattens an admonition div into a blockquote', () => {
  const html =
    '<div class="admonition note">' +
    '<p class="admonition-title">Note</p>' +
    '<p>Sample note body.</p>' +
    '</div>';
  assert.equal(htmlToMarkdown(html), '> Note\n>\n> Sample note body.\n');
});
