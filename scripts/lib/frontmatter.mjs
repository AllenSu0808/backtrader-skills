export function buildFrontmatter({ source, fetched, title }) {
  const escapedTitle = title.replace(/"/g, '\\"');
  return `---\nsource: ${source}\nfetched: ${fetched}\ntitle: "${escapedTitle}"\n---\n\n`;
}
