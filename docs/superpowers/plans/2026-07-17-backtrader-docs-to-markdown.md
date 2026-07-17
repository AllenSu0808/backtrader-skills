# Backtrader 文件轉 Markdown 工具 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 一次性抓取 backtrader 官方文件站（`https://www.backtrader.com/docu/`）底下全部章節頁面，轉換為本地 Markdown 檔案，並依 llms.txt 慣例產出索引。

**Architecture:** 兩階段管線。(1) 用 `playwright-cli run-code` 在單一瀏覽器工作階段內走訪導覽選單、批次抓取每頁內容，輸出 `raw/crawl-result.json`；(2) 純離線的 Node.js 腳本讀取該檔案，用 `turndown` 轉成 Markdown 並依分類寫入 `docs/`，最後產出 `docs/llms.txt` 索引。兩階段責任分離：階段 1 只做瀏覽器抓取，階段 2 的轉換規則可以反覆調整、除錯，不需要重跑瀏覽器。

**Tech Stack:** Node.js 24（內建 `node:test` 測試框架、ESM `type: module`）、`turndown` 7.2.4、`playwright-cli`。

## Global Constraints

- 抓取範圍僅限 `https://www.backtrader.com/docu/` 底下的頁面，不含站內其他區塊（`../home/`、`../blog/`、`../recipes/`）。
- 索引檔輸出於 `docs/llms.txt`；`docs/llms.txt` 內的連結一律使用相對於 `docs/` 的本地路徑（例如 `cerebro/cerebro.md`），不指向原始網址。
- 每篇 `.md` 開頭必須含 YAML frontmatter，欄位為 `source`、`fetched`、`title`。
- 這是一次性工具，不需要排程重跑或增量更新機制。
- 實際瀏覽器抓取必須透過 `playwright-cli` 執行；HTML → Markdown 轉換在本地離線進行，使用 Node.js + `turndown`。

## 實際站台結構調查結果（供各任務參照）

在寫這份計畫前，已用 `playwright-cli` 實際打開 `https://www.backtrader.com/docu/` 檢查過真實 DOM，結論如下：

- 網站是 MkDocs Material 佈景主題（非原設計文件假設的 Sphinx／ReadTheDocs 樣式）。
- 左側導覽選單的連結 selector：`.md-nav--primary a.md-nav__link`。導覽會把整個網站（Home / 本文件區 / Blog / Recipes）攤平列出，其中只有本文件區的連結 `href` **不會**以 `../` 開頭；用 `href` 是否以 `../` 開頭可以乾淨過濾出僅屬於 `/docu/` 的頁面。目前共 **69 個**符合條件的頁面。
- 內容區塊 selector：`.md-content__inner`（確認過沒有編輯按鈕、頁尾等雜訊元素混在裡面）。
- 頁面標題（導覽連結文字）多數採 `"分類 - 子標題"` 命名慣例（例如 `"Cerebro - Memory Savings"`、`"Data Feeds - Extending"`），沒有 `" - "` 的標題就自成一類（例如 `"Cerebro"`、`"Strategy"`）。這比原設計文件假設的「導覽階層資料夾」更可靠，計畫中以此作為分類依據。
- 程式碼區塊標記為 `.highlight > pre > code`，但 `<pre>` 裡除了 `<code>` 還夾了一個複製按鈕（`<button class="md-clipboard">`）和一個空的 `<span>`，會讓 turndown 內建的 `pre` 規則誤判成 inline code；需要自訂規則直接取 `<code>` 的 `textContent`。
- Admonition 區塊（`<div class="admonition note/tip/...">`，內含 `<p class="admonition-title">`）在多數頁面都會出現，需要自訂規則把它轉成 blockquote，否則會被拆成普通段落，資訊層次會不見。
- 抽樣檢查了 10 個機率最高會有表格的頁面（reference 類頁面），**沒有找到任何 `<table>` 元素**——這代表原設計文件「抽樣挑一篇含表格的頁面檢查」這條驗證假設不成立，Task 8 的驗證步驟已改為挑一篇含 admonition 與程式碼區塊的頁面做抽查。

---

### Task 1: 專案骨架與相依套件

**Files:**
- Create: `package.json`
- Create: `.gitignore`

**Interfaces:**
- Produces: `turndown` 套件安裝在 `node_modules/`，供後續所有任務使用。

- [ ] **Step 1: 寫 package.json**

```json
{
  "name": "backtrader-docs-to-markdown",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "test": "node --test scripts/lib"
  },
  "dependencies": {
    "turndown": "7.2.4"
  }
}
```

- [ ] **Step 2: 安裝相依套件**

Run: `npm install`
Expected: 產生 `node_modules/` 與 `package-lock.json`，指令成功結束（exit code 0）。

- [ ] **Step 3: 驗證套件可載入**

Run: `node -e "import('turndown').then(() => console.log('ok'))"`
Expected: 輸出 `ok`

- [ ] **Step 4: 寫 .gitignore**

```
node_modules/
raw/
.playwright-cli/
```

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json .gitignore
git commit -m "chore: 建立專案骨架並加入 turndown 相依套件"
```

---

### Task 2: 命名規則模組（分類 / 檔名）

**Files:**
- Create: `scripts/lib/naming.mjs`
- Test: `scripts/lib/naming.test.mjs`

**Interfaces:**
- Produces:
  - `slugify(text: string): string`
  - `deriveCategory(navText: string): string`
  - `deriveSlug(url: string): string`

- [ ] **Step 1: 寫失敗測試**

`scripts/lib/naming.test.mjs`:

```js
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
```

- [ ] **Step 2: 執行測試，確認失敗**

Run: `node --test scripts/lib/naming.test.mjs`
Expected: FAIL，錯誤訊息為找不到 `./naming.mjs` 模組。

- [ ] **Step 3: 實作 naming.mjs**

`scripts/lib/naming.mjs`:

```js
const DOCU_BASE_PATH = '/docu/';

export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function deriveCategory(navText) {
  const [firstPart] = navText.split(' - ');
  return firstPart.trim();
}

export function deriveSlug(url) {
  const { pathname } = new URL(url);
  let relativePath = pathname.startsWith(DOCU_BASE_PATH)
    ? pathname.slice(DOCU_BASE_PATH.length)
    : pathname;
  relativePath = relativePath.replace(/\/+$/, '');
  if (relativePath === '') {
    return 'index';
  }
  return slugify(relativePath.replace(/\//g, '-'));
}
```

- [ ] **Step 4: 執行測試，確認通過**

Run: `node --test scripts/lib/naming.test.mjs`
Expected: PASS，4 個測試全過。

- [ ] **Step 5: Commit**

```bash
git add scripts/lib/naming.mjs scripts/lib/naming.test.mjs
git commit -m "feat: 新增分類與檔名的命名規則模組"
```

---

### Task 3: HTML → Markdown 轉換模組

**Files:**
- Create: `scripts/lib/convertHtml.mjs`
- Test: `scripts/lib/convertHtml.test.mjs`

**Interfaces:**
- Produces: `htmlToMarkdown(html: string): string`

- [ ] **Step 1: 寫失敗測試**

`scripts/lib/convertHtml.test.mjs`:

```js
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
```

- [ ] **Step 2: 執行測試，確認失敗**

Run: `node --test scripts/lib/convertHtml.test.mjs`
Expected: FAIL，找不到 `./convertHtml.mjs` 模組。

- [ ] **Step 3: 實作 convertHtml.mjs**

`scripts/lib/convertHtml.mjs`:

```js
import TurndownService from 'turndown';

function createTurndownService() {
  const turndownService = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced',
  });

  turndownService.addRule('highlightBlock', {
    filter: (node) => node.nodeName === 'PRE' && node.querySelector('code'),
    replacement: (_content, node) => {
      const code = node.querySelector('code').textContent.replace(/\n+$/, '');
      return `\n\`\`\`\n${code}\n\`\`\`\n\n`;
    },
  });

  turndownService.addRule('admonition', {
    filter: (node) => node.nodeName === 'DIV' && node.classList.contains('admonition'),
    replacement: (content) => {
      const quoted = content
        .trim()
        .split('\n')
        .map((line) => (line ? `> ${line}` : '>'))
        .join('\n');
      return `\n${quoted}\n\n`;
    },
  });

  return turndownService;
}

export function htmlToMarkdown(html) {
  const turndownService = createTurndownService();
  return `${turndownService.turndown(html).trim()}\n`;
}
```

- [ ] **Step 4: 執行測試，確認通過**

Run: `node --test scripts/lib/convertHtml.test.mjs`
Expected: PASS，3 個測試全過。

- [ ] **Step 5: Commit**

```bash
git add scripts/lib/convertHtml.mjs scripts/lib/convertHtml.test.mjs
git commit -m "feat: 新增 HTML 轉 Markdown 模組，處理程式碼區塊與 admonition"
```

---

### Task 4: Frontmatter 模組

**Files:**
- Create: `scripts/lib/frontmatter.mjs`
- Test: `scripts/lib/frontmatter.test.mjs`

**Interfaces:**
- Produces: `buildFrontmatter({ source: string, fetched: string, title: string }): string`

- [ ] **Step 1: 寫失敗測試**

`scripts/lib/frontmatter.test.mjs`:

```js
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
```

- [ ] **Step 2: 執行測試，確認失敗**

Run: `node --test scripts/lib/frontmatter.test.mjs`
Expected: FAIL，找不到 `./frontmatter.mjs` 模組。

- [ ] **Step 3: 實作 frontmatter.mjs**

`scripts/lib/frontmatter.mjs`:

```js
export function buildFrontmatter({ source, fetched, title }) {
  const escapedTitle = title.replace(/"/g, '\\"');
  return `---\nsource: ${source}\nfetched: ${fetched}\ntitle: "${escapedTitle}"\n---\n\n`;
}
```

- [ ] **Step 4: 執行測試，確認通過**

Run: `node --test scripts/lib/frontmatter.test.mjs`
Expected: PASS，2 個測試全過。

- [ ] **Step 5: Commit**

```bash
git add scripts/lib/frontmatter.mjs scripts/lib/frontmatter.test.mjs
git commit -m "feat: 新增 YAML frontmatter 產生模組"
```

---

### Task 5: 轉換 orchestration（convert）

**Files:**
- Create: `scripts/lib/convert.mjs`
- Test: `scripts/lib/convert.test.mjs`
- Create: `scripts/convert.mjs`（CLI 進入點）

**Interfaces:**
- Consumes: `deriveCategory`, `deriveSlug`, `slugify`（Task 2）、`htmlToMarkdown`（Task 3）、`buildFrontmatter`（Task 4）
- Produces: `convertPages(raw: { pages: Array<{url: string, title: string, contentHtml: string}>, failed: Array<{url: string, title: string, error: string}> }, options: { docsDir: string, fetchedDate: string, failedPath: string }): Promise<Array<{category: string, categorySlug: string, pageSlug: string, filePath: string}>>`

- [ ] **Step 1: 寫失敗測試**

`scripts/lib/convert.test.mjs`:

```js
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
```

- [ ] **Step 2: 執行測試，確認失敗**

Run: `node --test scripts/lib/convert.test.mjs`
Expected: FAIL，找不到 `./convert.mjs` 模組。

- [ ] **Step 3: 實作 convert.mjs（lib）**

`scripts/lib/convert.mjs`:

```js
import { writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { deriveCategory, deriveSlug, slugify } from './naming.mjs';
import { htmlToMarkdown } from './convertHtml.mjs';
import { buildFrontmatter } from './frontmatter.mjs';

export async function convertPages({ pages, failed }, { docsDir, fetchedDate, failedPath }) {
  const written = [];

  for (const pageEntry of pages) {
    const category = deriveCategory(pageEntry.title);
    const categorySlug = slugify(category);
    const pageSlug = deriveSlug(pageEntry.url);
    const dirPath = path.join(docsDir, categorySlug);
    await mkdir(dirPath, { recursive: true });

    const frontmatter = buildFrontmatter({
      source: pageEntry.url,
      fetched: fetchedDate,
      title: pageEntry.title,
    });
    const markdownBody = htmlToMarkdown(pageEntry.contentHtml);
    const filePath = path.join(dirPath, `${pageSlug}.md`);
    await writeFile(filePath, frontmatter + markdownBody, 'utf8');
    written.push({ category, categorySlug, pageSlug, filePath });
  }

  if (failed.length > 0 && failedPath) {
    await mkdir(path.dirname(failedPath), { recursive: true });
    await writeFile(failedPath, JSON.stringify(failed, null, 2), 'utf8');
  }

  return written;
}
```

- [ ] **Step 4: 執行測試，確認通過**

Run: `node --test scripts/lib/convert.test.mjs`
Expected: PASS，2 個測試全過。

- [ ] **Step 5: 寫 CLI 進入點**

`scripts/convert.mjs`:

```js
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
```

- [ ] **Step 6: Commit**

```bash
git add scripts/lib/convert.mjs scripts/lib/convert.test.mjs scripts/convert.mjs
git commit -m "feat: 新增轉換 orchestration，依分類寫出 Markdown 檔案"
```

---

### Task 6: llms.txt 產生模組

**Files:**
- Create: `scripts/lib/llmsTxt.mjs`
- Test: `scripts/lib/llmsTxt.test.mjs`
- Create: `scripts/build-llms-txt.mjs`（CLI 進入點）

**Interfaces:**
- Consumes: `deriveCategory`（Task 2）
- Produces:
  - `extractSummary(markdown: string, maxLength?: number): string`
  - `buildLlmsTxt(entries: Array<{category: string, title: string, relPath: string, summary: string}>): string`

- [ ] **Step 1: 寫失敗測試**

`scripts/lib/llmsTxt.test.mjs`:

```js
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
```

- [ ] **Step 2: 執行測試，確認失敗**

Run: `node --test scripts/lib/llmsTxt.test.mjs`
Expected: FAIL，找不到 `./llmsTxt.mjs` 模組。

- [ ] **Step 3: 實作 llmsTxt.mjs**

`scripts/lib/llmsTxt.mjs`:

```js
export function extractSummary(markdown, maxLength = 100) {
  const body = markdown.replace(/^---\n[\s\S]*?\n---\n\n/, '');
  const lines = body.split('\n').map((line) => line.trim());
  const firstParagraph = lines.find(
    (line) => line && !line.startsWith('#') && !line.startsWith('>') && !line.startsWith('```')
  );
  if (!firstParagraph) {
    return '';
  }
  return firstParagraph.length > maxLength
    ? `${firstParagraph.slice(0, maxLength - 1)}…`
    : firstParagraph;
}

export function buildLlmsTxt(entries) {
  const byCategory = new Map();
  for (const entry of entries) {
    if (!byCategory.has(entry.category)) {
      byCategory.set(entry.category, []);
    }
    byCategory.get(entry.category).push(entry);
  }

  const lines = ['# Backtrader Documentation', ''];
  for (const [category, categoryEntries] of byCategory) {
    lines.push(`## ${category}`);
    for (const entry of categoryEntries) {
      lines.push(`- [${entry.title}](${entry.relPath}): ${entry.summary}`);
    }
    lines.push('');
  }

  return `${lines.join('\n').trim()}\n`;
}
```

- [ ] **Step 4: 執行測試，確認通過**

Run: `node --test scripts/lib/llmsTxt.test.mjs`
Expected: PASS，3 個測試全過。

- [ ] **Step 5: 寫 CLI 進入點**

`scripts/build-llms-txt.mjs`:

```js
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
```

- [ ] **Step 6: Commit**

```bash
git add scripts/lib/llmsTxt.mjs scripts/lib/llmsTxt.test.mjs scripts/build-llms-txt.mjs
git commit -m "feat: 新增 llms.txt 索引產生模組"
```

---

### Task 7: 抓取腳本（playwright-cli run-code）

**Files:**
- Create: `scripts/crawl.js`

**Interfaces:**
- Produces: `raw/crawl-result.json`，結構為 `{ pages: Array<{url: string, title: string, contentHtml: string}>, failed: Array<{url: string, title: string, error: string}> }`

此任務不寫單元測試（需要真實瀏覽器與網路），改用「對真實網站跑一次、檢查輸出檔案結構與頁數」作為驗證。

- [ ] **Step 1: 寫 crawl.js**

`scripts/crawl.js`（內容必須是單一 function expression，會被 `playwright-cli run-code --filename` 包成 `(async page => { ... })` 執行）：

```js
async page => {
  const baseUrl = 'https://www.backtrader.com/docu/';
  await page.goto(baseUrl);

  const navEntries = await page.evaluate(() => {
    const links = [...document.querySelectorAll('.md-nav--primary a.md-nav__link')];
    return links
      .map((a) => ({ href: a.getAttribute('href'), text: a.textContent.trim() }))
      .filter((entry) => entry.href && !entry.href.startsWith('..'));
  });

  const pages = [];
  const failed = [];

  for (const entry of navEntries) {
    const url = new URL(entry.href, baseUrl).toString();
    try {
      await page.goto(url, { waitUntil: 'networkidle' });
      const contentHtml = await page.evaluate(() => {
        const contentEl = document.querySelector('.md-content__inner');
        return contentEl ? contentEl.innerHTML : null;
      });
      if (!contentHtml) {
        failed.push({ url, title: entry.text, error: 'content selector not found' });
        continue;
      }
      pages.push({ url, title: entry.text, contentHtml });
    } catch (error) {
      failed.push({ url, title: entry.text, error: String(error) });
    }
    await page.waitForTimeout(350);
  }

  return { pages, failed };
}
```

- [ ] **Step 2: 建立 raw 目錄**

Run: `mkdir -p raw`
Expected: 建立 `raw/` 資料夾（已在 `.gitignore` 中排除，不會進版控）。

- [ ] **Step 3: 開啟瀏覽器並執行抓取**

Run:
```bash
playwright-cli open
playwright-cli run-code --filename=scripts/crawl.js --raw > raw/crawl-result.json
playwright-cli close
```
Expected: 三個指令都成功結束；`raw/crawl-result.json` 內容為合法 JSON，且非空。整個抓取過程約 69 次頁面導覽，加上每頁間 350ms 延遲，預期耗時數分鐘。

- [ ] **Step 4: 驗證頁數與失敗清單**

Run:
```bash
node -e "const r = JSON.parse(require('fs').readFileSync('raw/crawl-result.json', 'utf8')); console.log('pages:', r.pages.length, 'failed:', r.failed.length);"
```
Expected: `pages: 69 failed: 0`（若 `failed` 不是 0，檢查 `raw/crawl-result.json` 裡 `failed` 陣列的 `error` 訊息，確認是否為暫時性網路問題，可重跑 Step 3）。

- [ ] **Step 5: Commit**

```bash
git add scripts/crawl.js
git commit -m "feat: 新增 playwright-cli 抓取腳本"
```

---

### Task 8: 執行完整管線並做端對端驗證

**Files:**
- Modify: 無新檔案，執行 Task 5、Task 6 產出的 CLI 腳本，產生 `docs/` 與 `docs/llms.txt`

**Interfaces:**
- Consumes: `scripts/convert.mjs`（Task 5）、`scripts/build-llms-txt.mjs`（Task 6）、`raw/crawl-result.json`（Task 7）

- [ ] **Step 1: 執行單元測試總覽，確認全部通過**

Run: `npm test`
Expected: `scripts/lib` 底下所有測試（naming、convertHtml、frontmatter、convert、llmsTxt）全部 PASS。

- [ ] **Step 2: 執行轉換，產生 docs/**

Run: `node scripts/convert.mjs`
Expected: 輸出 `轉換完成：69 篇成功，0 篇失敗`（數字需與 Task 7 Step 4 的 `raw/crawl-result.json` 一致）。

- [ ] **Step 3: 驗證檔案數量與 raw/_failed.json**

Run: `find docs -name "*.md" | wc -l`
Expected: 輸出數字與 `raw/crawl-result.json` 的 `pages.length` 一致（預期 69）。若 `raw/_failed.json` 存在，開檔確認內容並判斷是否需要重跑 Task 7。

- [ ] **Step 4: 產出 llms.txt**

Run: `node scripts/build-llms-txt.mjs`
Expected: 輸出 `已產出 docs/llms.txt，共 69 篇文件`。

- [ ] **Step 5: 驗證 docs/llms.txt 內每個連結都對應到實際存在的檔案**

Run:
```bash
node -e "
const fs = require('fs');
const path = require('path');
const llms = fs.readFileSync('docs/llms.txt', 'utf8');
const links = [...llms.matchAll(/\]\(([^)]+)\)/g)].map((m) => m[1]);
const missing = links.filter((link) => !fs.existsSync(path.join('docs', link)));
console.log('links:', links.length, 'missing:', missing.length);
if (missing.length) console.log(missing);
"
```
Expected: `links: 69 missing: 0`

- [ ] **Step 6: 抽樣品質檢查（人工比對）**

挑 3~5 篇人工比對原網頁與產出的 `.md`：
- 至少一篇含程式碼區塊的頁面（例如 `docs/quickstart-guide/quickstart-quickstart.md`），確認程式碼區塊有正確變成 fenced code block（```` ``` ````），沒有變成一行 inline code。
- 至少一篇含 admonition 的頁面（例如 `docs/cerebro/cerebro.md` 或任一含「Note」區塊的頁面），確認有正確轉成 blockquote（`>` 開頭）。
- 確認每篇檔案開頭都有 `source`、`fetched`、`title` 三個 frontmatter 欄位。

- [ ] **Step 7: Commit**

```bash
git add docs/
git commit -m "feat: 抓取並轉換 backtrader 文件為本地 Markdown，產出 llms.txt 索引"
```
