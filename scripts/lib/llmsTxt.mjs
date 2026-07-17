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
