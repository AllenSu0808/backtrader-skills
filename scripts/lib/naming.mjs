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
