import { faqSeedContent } from '@/lib/faq/seed';
import { dutchFaqRichBodies } from '@/lib/faq/dutch-rich-articles';
import { escapeHtml, sanitizeRichTextHtml, stripHtml } from '@/lib/faq/html';
import {
  FAQ_LOCALES,
  type FaqArticle,
  type FaqBlock,
  type FaqContentStore,
  type FaqImageAsset,
  type FaqLocale,
  type FaqLocaleContent,
  type LegacyFaqArticle,
  type LegacyFaqContentStore,
  type LegacyFaqLocaleContent,
} from '@/lib/faq/types';

const localeFallbacks = faqSeedContent;
const DEFAULT_FAQ_HERO_IMAGE = '/screen.png';

function asString(value: unknown, fallback = '') {
  return typeof value === 'string' ? value.trim() : fallback;
}

function asStringArray(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => asString(item))
    .filter(Boolean);
}

function createParagraphBlock(text: string, index: number): FaqBlock {
  return {
    id: `paragraph-${index + 1}`,
    type: 'paragraph',
    text,
  };
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/[-\s]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function stripLegacySuffix(value: string) {
  return value.replace(/-\d+$/, '');
}

function getSlugNumericSuffix(value: string) {
  const match = value.match(/-(\d+)$/);
  return match?.[1] ?? '';
}

function deriveExcerptFromBody(body: string, fallback = '') {
  const plainText = stripHtml(body);
  if (!plainText) {
    return fallback;
  }

  const sentenceMatch = plainText.match(/^(.+?[.!?])(\s|$)/);
  const firstSentence = sentenceMatch?.[1]?.trim() || plainText;
  const excerptSource = firstSentence.length > 220 ? `${firstSentence.slice(0, 217).trim()}...` : firstSentence;
  return plainText.length > excerptSource.length ? `${excerptSource.replace(/[.!?]+$/, '')}...` : excerptSource;
}

function normalizeBlock(block: unknown, index: number): FaqBlock | null {
  if (!block || typeof block !== 'object') {
    return null;
  }

  const rawBlock = block as Record<string, unknown>;
  const id = asString(rawBlock.id, `block-${index + 1}`);
  const type = asString(rawBlock.type);

  if (type === 'paragraph') {
    return {
      id,
      type,
      text: asString(rawBlock.text),
    };
  }

  if (type === 'heading') {
    return {
      id,
      type,
      text: asString(rawBlock.text),
      level: rawBlock.level === 3 ? 3 : 2,
    };
  }

  if (type === 'list') {
    return {
      id,
      type,
      items: asStringArray(rawBlock.items),
    };
  }

  if (type === 'image') {
    const src = asString(rawBlock.src);
    if (!src) {
      return null;
    }

    return {
      id,
      type,
      src,
      alt: asString(rawBlock.alt),
      caption: asString(rawBlock.caption),
    };
  }

  return null;
}

function normalizeBlocks(value: unknown, fallbackText: string) {
  const normalized = Array.isArray(value)
    ? value
        .map((block, index) => normalizeBlock(block, index))
        .filter((block): block is FaqBlock => block !== null)
    : [];

  if (normalized.length > 0) {
    return normalized;
  }

  if (fallbackText) {
    return [createParagraphBlock(fallbackText, 0)];
  }

  return [createParagraphBlock('', 0)];
}

function blocksToMarkdown(blocks: FaqBlock[]) {
  return blocks
    .map((block) => {
      if (block.type === 'heading') {
        const tag = block.level === 3 ? 'h3' : 'h2';
        return `<${tag}>${escapeHtml(block.text)}</${tag}>`;
      }

      if (block.type === 'list') {
        const items = block.items
          .map((item) => `<li>${escapeHtml(item)}</li>`)
          .join('');
        return `<ul>${items}</ul>`;
      }

      if (block.type === 'image') {
        const caption = block.caption
          ? `<figcaption>${escapeHtml(block.caption)}</figcaption>`
          : '';

        return `<figure><img src="${escapeHtml(block.src)}" alt="${escapeHtml(block.alt)}" />${caption}</figure>`;
      }

      return `<p>${escapeHtml(block.text)}</p>`;
    })
    .join('')
    .trim();
}

function normalizeHeroImage(value: unknown): FaqImageAsset | undefined {
  if (!value || typeof value !== 'object') {
    return undefined;
  }

  const rawValue = value as Record<string, unknown>;
  const src = asString(rawValue.src);

  if (!src) {
    return undefined;
  }

  return {
    src,
    alt: asString(rawValue.alt),
    caption: asString(rawValue.caption),
  };
}

function normalizeArticle(article: LegacyFaqArticle | Record<string, unknown>, index: number): FaqArticle {
  const rawArticle = article as Record<string, unknown>;
  const fallbackText = asString(rawArticle.answer);
  const legacyBlocks = normalizeBlocks(rawArticle.blocks, fallbackText);
  const body = asString(rawArticle.body, blocksToMarkdown(legacyBlocks));
  const question = asString(rawArticle.question);

  return {
    id: asString(rawArticle.id, `article-${index + 1}`),
    slug: asString(rawArticle.slug, slugify(question) || `faq-article-${index + 1}`),
    legacySlugs: asStringArray(rawArticle.legacySlugs),
    question,
    excerpt: deriveExcerptFromBody(body, asString(rawArticle.excerpt)),
    publishedAt: asString(rawArticle.publishedAt ?? rawArticle.date),
    authorName: asString(rawArticle.authorName, 'Vesalius Team'),
    heroImage:
      normalizeHeroImage(rawArticle.heroImage) ?? {
        alt: question,
        caption: '',
        src: DEFAULT_FAQ_HERO_IMAGE,
      },
    tags: asStringArray(rawArticle.tags),
    body: sanitizeRichTextHtml(body),
  };
}

function normalizeLocaleContent(
  locale: FaqLocale,
  input: LegacyFaqLocaleContent | Record<string, unknown> | undefined,
): FaqLocaleContent {
  const fallback = localeFallbacks[locale];
  const source = input && typeof input === 'object' ? (input as Record<string, unknown>) : {};
  const items = Array.isArray(source.items) ? source.items : fallback.items;

  return {
    badgeLabel: asString(source.badgeLabel, fallback.badgeLabel ?? 'Support & FAQ'),
    title: asString(source.title, fallback.title),
    placeholder: asString(source.placeholder, fallback.placeholder),
    noResults: asString(source.noResults, fallback.noResults),
    aboutTitle: asString(source.aboutTitle, fallback.aboutTitle),
    aboutBody: asString(source.aboutBody, fallback.aboutBody),
    tagsTitle: asString(source.tagsTitle, fallback.tagsTitle),
    supportButtonLabel: asString(
      source.supportButtonLabel,
      fallback.supportButtonLabel ?? 'Submit a ticket',
    ),
    readMoreLabel: asString(source.readMoreLabel, fallback.readMoreLabel ?? 'Read article'),
    closeLabel: asString(source.closeLabel, fallback.closeLabel ?? 'Close article'),
    items: items.map((item, index) => normalizeArticle(item, index)),
  };
}

function getBodyRichnessScore(article: FaqArticle) {
  const plainTextLength = stripHtml(article.body).length;
  const imageCount = (article.body.match(/<img\b/gi) ?? []).length;
  const hasCustomHeroImage =
    Boolean(article.heroImage?.src) && article.heroImage?.src !== DEFAULT_FAQ_HERO_IMAGE;

  return plainTextLength + imageCount * 1500 + (hasCustomHeroImage ? 1200 : 0);
}

function needsArticleBodyFallback(article: FaqArticle, sourceArticle: FaqArticle) {
  const articlePlainTextLength = stripHtml(article.body).length;
  const sourcePlainTextLength = stripHtml(sourceArticle.body).length;

  if (sourcePlainTextLength === 0) {
    return false;
  }

  const articleImageCount = (article.body.match(/<img\b/gi) ?? []).length;
  const sourceImageCount = (sourceArticle.body.match(/<img\b/gi) ?? []).length;

  return (
    articlePlainTextLength < 450 ||
    articlePlainTextLength < sourcePlainTextLength * 0.45 ||
    (sourceImageCount > 0 && articleImageCount === 0)
  );
}

function needsHeroImageFallback(article: FaqArticle, sourceArticle: FaqArticle) {
  const currentHeroSrc = article.heroImage?.src ?? '';
  const sourceHeroSrc = sourceArticle.heroImage?.src ?? '';

  return (
    Boolean(sourceHeroSrc) &&
    sourceHeroSrc !== DEFAULT_FAQ_HERO_IMAGE &&
    (!currentHeroSrc || currentHeroSrc === DEFAULT_FAQ_HERO_IMAGE)
  );
}

function applyCuratedDutchFaqBodies(content: FaqContentStore) {
  for (const article of content.nl.items) {
    const translationKey = getSlugNumericSuffix(article.slug) || stripLegacySuffix(article.slug);
    const translatedBody = dutchFaqRichBodies[translationKey];

    if (!translatedBody) {
      continue;
    }

    article.body = sanitizeRichTextHtml(translatedBody);
    article.excerpt = deriveExcerptFromBody(article.body, article.excerpt);
  }

  return content;
}

function enrichFaqContentWithRichestArticles(content: FaqContentStore) {
  const articleGroups = new Map<string, FaqArticle[]>();

  for (const locale of FAQ_LOCALES) {
    for (const article of content[locale].items) {
      const groupKey = getSlugNumericSuffix(article.slug) || stripLegacySuffix(article.slug);

      if (!articleGroups.has(groupKey)) {
        articleGroups.set(groupKey, []);
      }

      articleGroups.get(groupKey)?.push(article);
    }
  }

  for (const group of articleGroups.values()) {
    if (group.length < 2) {
      continue;
    }

    const richestArticle = group.reduce((bestArticle, currentArticle) =>
      getBodyRichnessScore(currentArticle) > getBodyRichnessScore(bestArticle)
        ? currentArticle
        : bestArticle,
    );

    for (const article of group) {
      if (article === richestArticle) {
        continue;
      }

      if (needsArticleBodyFallback(article, richestArticle)) {
        article.body = richestArticle.body;
        article.excerpt = deriveExcerptFromBody(richestArticle.body, richestArticle.excerpt);
      }

      if (needsHeroImageFallback(article, richestArticle)) {
        article.heroImage = {
          ...richestArticle.heroImage,
          alt: article.heroImage?.alt || article.question || richestArticle.heroImage?.alt || '',
        };
      }
    }
  }

  return content;
}

export function normalizeFaqContent(input: LegacyFaqContentStore | Record<string, unknown>) {
  const source = input as Partial<
    Record<FaqLocale, LegacyFaqLocaleContent | Record<string, unknown> | undefined>
  >;

  const normalizedContent = FAQ_LOCALES.reduce((accumulator, locale) => {
    accumulator[locale] = normalizeLocaleContent(locale, source[locale]);
    return accumulator;
  }, {} as FaqContentStore);

  applyCuratedDutchFaqBodies(normalizedContent);

  return enrichFaqContentWithRichestArticles(normalizedContent);
}

export const defaultFaqContent = normalizeFaqContent(faqSeedContent);

export function getArticlePlainText(article: FaqArticle) {
  return stripHtml(article.body);
}

export function findFaqArticleBySlug(content: FaqContentStore, locale: FaqLocale, slug: string) {
  const normalizedSlug = stripLegacySuffix(slug);

  return content[locale].items.find(
    (item) =>
      item.slug === slug ||
      item.legacySlugs?.includes(slug) ||
      stripLegacySuffix(item.slug) === normalizedSlug ||
      item.legacySlugs?.some((legacySlug) => stripLegacySuffix(legacySlug) === normalizedSlug),
  );
}

export function findFaqArticleRouteMatch(
  content: FaqContentStore,
  locale: FaqLocale,
  slug: string,
) {
  const localeMatch = findFaqArticleBySlug(content, locale, slug);

  if (localeMatch) {
    return localeMatch;
  }

  const normalizedSlug = stripLegacySuffix(slug);
  const localizedItems = content[locale].items;

  for (let index = 0; index < localizedItems.length; index += 1) {
    for (const sourceLocale of FAQ_LOCALES) {
      const sourceArticle = content[sourceLocale].items[index];

      if (!sourceArticle) {
        continue;
      }

      const slugMatches =
        stripLegacySuffix(sourceArticle.slug) === normalizedSlug ||
        sourceArticle.legacySlugs?.some(
          (legacySlug) => stripLegacySuffix(legacySlug) === normalizedSlug,
        );

      if (slugMatches) {
        return localizedItems[index];
      }
    }
  }

  return undefined;
}

export function getArticleExcerpt(article: FaqArticle) {
  return deriveExcerptFromBody(article.body, article.excerpt);
}

export function getArticleHeroImage(article: FaqArticle) {
  return article.heroImage?.src
    ? article.heroImage
    : {
        alt: article.question,
        caption: '',
        src: DEFAULT_FAQ_HERO_IMAGE,
      };
}
