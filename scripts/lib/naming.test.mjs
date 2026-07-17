import { test } from 'node:test';
import assert from 'node:assert/strict';
import { slugify, deriveCategory, deriveSlug } from './naming.mjs';

test('slugify lowercases and hyphenates', () => {
  assert.equal(slugify('Data Feeds'), 'data-feeds');
  assert.equal(slugify('Commission Schemes'), 'commission-schemes');
});

test('deriveCategory takes the part before " - "', () => {
  assert.equal(deriveCategory('Cerebro - Memory Savings'), 'Cerebro');
  assert.equal(deriveCategory('Data Feeds - Extending'), 'Data Feeds');
  assert.equal(deriveCategory('Quickstart Guide'), 'Quickstart Guide');
});

test('deriveSlug strips the /docu/ base path and joins segments', () => {
  assert.equal(
    deriveSlug('https://www.backtrader.com/docu/quickstart/quickstart/'),
    'quickstart-quickstart'
  );
  assert.equal(deriveSlug('https://www.backtrader.com/docu/cerebro/'), 'cerebro');
  assert.equal(
    deriveSlug('https://www.backtrader.com/docu/order-creation-execution/oco/oco/'),
    'order-creation-execution-oco-oco'
  );
});

test('deriveSlug returns "index" for the docu root page', () => {
  assert.equal(deriveSlug('https://www.backtrader.com/docu/'), 'index');
});
