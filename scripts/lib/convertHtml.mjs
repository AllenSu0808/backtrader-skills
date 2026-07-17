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
