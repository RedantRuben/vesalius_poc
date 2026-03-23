import fs from 'fs/promises';
import path from 'path';

const DATA_PATH = path.resolve('src/data/faq-content.json');
const UPLOADS_DIR = path.resolve('public/uploads/faq');
const ODOO_BASE_URL = 'https://vesalius.odoo.com';

const MISSING_SLUGS = [
  'als-de-samenvatting-niet-compleet-is-maar-het-gesprek-wel-kan-ik-de-samenvatting-opnieuw-genereren-7',
  'hoe-kan-ik-de-communicatie-met-patienten-personaliseren-4',
  'hoe-kan-ik-filteren-op-relevante-conversaties-8',
  'hoe-kan-ik-mijn-emails-personaliseren-15',
  'hoe-pas-ik-mijn-wachtwoord-aan-11',
  'hoe-voeg-ik-een-collega-toe-aan-mijn-organisatie-9',
  'mijn-registratie-link-is-verlopen-wat-moet-ik-doen-10',
  'mijn-samenvattingen-staan-in-de-verkeerde-taal-hoe-kan-ik-dit-wijzigen-6',
  'moet-ik-telkens-manueel-credits-toevoegen-aan-mijn-platform-14',
  'wat-is-een-credit-12',
  'wat-moet-ik-doen-als-ik-geen-credits-meer-heb-13',
  'welke-talen-worden-ondersteund-door-de-chatbot-5',
];

function decodeHtml(text = '') {
  return text
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function stripHtml(html = '') {
  return decodeHtml(html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ')).trim();
}

function deriveExcerpt(body) {
  const text = stripHtml(body);
  if (text.length <= 180) {
    return text;
  }

  return `${text.slice(0, 177).trimEnd()}...`;
}

function toAbsoluteUrl(url) {
  if (!url) {
    return '';
  }

  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  return `${ODOO_BASE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
}

function sanitizeFilenamePart(value) {
  return decodeURIComponent(value)
    .normalize('NFKD')
    .replace(/[^\w.-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function extensionFromUrl(url, fallback = '.webp') {
  const cleanUrl = url.split('?')[0];
  const match = cleanUrl.match(/\.([a-zA-Z0-9]+)$/);
  return match ? `.${match[1].toLowerCase()}` : fallback;
}

async function downloadToLocal(remoteUrl, localName) {
  const absoluteUrl = toAbsoluteUrl(remoteUrl);
  const response = await fetch(absoluteUrl, {
    headers: { 'user-agent': 'codex-faq-import/1.0' },
    signal: AbortSignal.timeout(45000),
  });

  if (!response.ok) {
    throw new Error(`Failed to download ${absoluteUrl}: ${response.status}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  const localPath = path.join(UPLOADS_DIR, localName);

  await fs.writeFile(localPath, buffer);

  return `/uploads/faq/${localName}`;
}

function extractFirstMatch(html, pattern) {
  return pattern.exec(html)?.[1]?.trim() ?? '';
}

function extractArticleBody(html) {
  const wrapperIndex = html.indexOf('class="o_wblog_post_content_field o_wblog_read_text"');
  if (wrapperIndex === -1) {
    throw new Error('Unable to locate article body wrapper');
  }

  const bodyStart = html.indexOf('>', wrapperIndex);
  const bodyEnd = html.indexOf('<div class="css_editable_mode_hidden', bodyStart);

  if (bodyStart === -1 || bodyEnd === -1) {
    throw new Error('Unable to slice article body');
  }

  return html
    .slice(bodyStart + 1, bodyEnd)
    .replace(/\s*<\/div>\s*$/, '')
    .trim();
}

function rewriteArticleLinks(body) {
  return body
    .replaceAll('https://vesalius.odoo.com/nl/blog/faq-2/', '/nl/blog/faq-2/')
    .replaceAll('https://www.vesalius.ai/nl/blog/faq-2/', '/nl/blog/faq-2/')
    .replaceAll('https://vesalius.odoo.com/blog/faq-2/', '/blog/faq-2/')
    .replaceAll('https://www.vesalius.ai/blog/faq-2/', '/blog/faq-2/');
}

function normalizeLocalImageMarkup(body) {
  return body
    .replace(
      /(<img\b[^>]*?)\bsrc="\/web\/image[^"]*"([^>]*\bdata-original-src=")(\/uploads\/faq\/[^"?]+)(?:\?[^"]*)?"([^>]*>)/g,
      '$1src="$3"$2$3"$4',
    )
    .replace(/(\/uploads\/faq\/[^"?]+)\?access_token=[^"]+/g, '$1');
}

async function importArticle(slug) {
  const articleUrl = `${ODOO_BASE_URL}/nl/blog/faq-2/${slug}`;
  const response = await fetch(articleUrl, {
    headers: { 'user-agent': 'codex-faq-import/1.0' },
    signal: AbortSignal.timeout(45000),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${articleUrl}: ${response.status}`);
  }

  const html = await response.text();
  const title = decodeHtml(
    extractFirstMatch(html, /<h1 class="o_wblog_post_name"[^>]*>([\s\S]*?)<\/h1>/),
  );
  const publishedAt = decodeHtml(
    extractFirstMatch(html, /<span class="text-muted">([\s\S]*?)<\/span>/),
  );
  const authorName = decodeHtml(
    extractFirstMatch(html, /<div style="line-height:1">\s*<span>([\s\S]*?)<\/span>/),
  );
  const coverPath = extractFirstMatch(
    html,
    /o_wblog_post_page_cover[\s\S]*?background-image: url\(([^)]+)\)/,
  );
  const rawBody = extractArticleBody(html);
  const tags = [
    ...new Set(
      [...html.matchAll(/href="\/nl\/blog\/faq-2\/tag\/[^"#?]+">([^<]+)<\/a>/g)].map((match) =>
        decodeHtml(match[1].trim()),
      ),
    ),
  ];

  const coverLocalPath = coverPath
    ? await downloadToLocal(
        coverPath,
        `${slug}-cover${extensionFromUrl(coverPath, '.webp')}`,
      )
    : '/screen.png';

  let body = rawBody;
  const imageSources = [...new Set([...rawBody.matchAll(/<img[^>]+src="([^"]+)"/g)].map((match) => match[1]))];

  for (const [index, imageSource] of imageSources.entries()) {
    const localImagePath = await downloadToLocal(
      imageSource,
      `${slug}-${index + 1}${extensionFromUrl(imageSource, '.png')}`,
    );

    body = body.replaceAll(imageSource, localImagePath);
    body = body.replaceAll(toAbsoluteUrl(imageSource), localImagePath);
  }

  body = rewriteArticleLinks(body);
  body = normalizeLocalImageMarkup(body);

  const numericSuffix = slug.match(/-(\d+)$/)?.[1] ?? slug;

  return {
    id: `odoo-nl-${numericSuffix}`,
    slug,
    legacySlugs: [],
    question: title,
    excerpt: deriveExcerpt(body),
    publishedAt,
    authorName: authorName || 'Vesalius Team',
    heroImage: {
      src: coverLocalPath,
      alt: title,
      caption: '',
    },
    tags,
    body,
  };
}

async function main() {
  await fs.mkdir(UPLOADS_DIR, { recursive: true });

  const rawData = await fs.readFile(DATA_PATH, 'utf8');
  const data = JSON.parse(rawData);
  const existingSlugs = new Set((data?.nl?.items ?? []).map((item) => item.slug));
  const importedArticles = [];

  for (const slug of MISSING_SLUGS) {
    if (existingSlugs.has(slug)) {
      continue;
    }

    console.error(`Importing ${slug}`);
    const article = await importArticle(slug);
    data.nl.items.push(article);
    importedArticles.push({
      slug: article.slug,
      title: article.question,
      images: (article.body.match(/<img\b/gi) ?? []).length,
    });
  }

  await fs.writeFile(DATA_PATH, `${JSON.stringify(data, null, 2)}\n`);
  console.log(JSON.stringify(importedArticles, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
