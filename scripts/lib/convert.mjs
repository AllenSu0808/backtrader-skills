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
