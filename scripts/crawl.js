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
