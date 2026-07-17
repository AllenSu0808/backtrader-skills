import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { deriveCategory } from './lib/naming.mjs';
import { extractSummary, buildLlmsTxt } from './lib/llmsTxt.mjs';

const DOCS_DIR = 'docs';
const TITLE_LINE = /^title: "((?:[^"\\]|\\.)*)"$/m;

function parseTitle(markdown) {
  const match = markdown.match(TITLE_LINE);
  return match ? match[1].replace(/\\"/g, '"') : null;
}

const categoryDirs = (await readdir(DOCS_DIR, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

const entries = [];

for (const categoryDir of categoryDirs) {
  const categoryPath = path.join(DOCS_DIR, categoryDir);
  const files = (await readdir(categoryPath)).filter((name) => name.endsWith('.md')).sort();

  for (const fileName of files) {
    const filePath = path.join(categoryPath, fileName);
    const markdown = await readFile(filePath, 'utf8');
    const title = parseTitle(markdown) ?? fileName.replace(/\.md$/, '');
    entries.push({
      category: deriveCategory(title),
      title,
      relPath: `${categoryDir}/${fileName}`,
      summary: extractSummary(markdown),
    });
  }
}

const llmsTxt = buildLlmsTxt(entries);
await writeFile(path.join(DOCS_DIR, 'llms.txt'), llmsTxt, 'utf8');
console.log(`已產出 ${path.join(DOCS_DIR, 'llms.txt')}，共 ${entries.length} 篇文件`);
