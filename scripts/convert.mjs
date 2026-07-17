import { readFile } from 'node:fs/promises';
import { convertPages } from './lib/convert.mjs';

const raw = JSON.parse(await readFile('raw/crawl-result.json', 'utf8'));
const fetchedDate = new Date().toISOString().slice(0, 10);

const written = await convertPages(raw, {
  docsDir: 'docs',
  fetchedDate,
  failedPath: 'raw/_failed.json',
});

console.log(`轉換完成：${written.length} 篇成功，${raw.failed.length} 篇失敗`);
