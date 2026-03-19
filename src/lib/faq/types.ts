export const FAQ_LOCALES = ['en', 'nl', 'fr'] as const;

export type FaqLocale = (typeof FAQ_LOCALES)[number];

export type FaqBlock =
  | {
      id: string;
      type: 'paragraph';
      text: string;
    }
  | {
      id: string;
      type: 'heading';
      text: string;
      level: 2 | 3;
    }
  | {
      id: string;
      type: 'list';
      items: string[];
    }
  | {
      id: string;
      type: 'image';
      src: string;
      alt: string;
      caption?: string;
    };

export interface FaqImageAsset {
  src: string;
  alt: string;
  caption?: string;
}

export interface FaqArticle {
  id: string;
  slug: string;
  question: string;
  excerpt: string;
  publishedAt: string;
  authorName: string;
  heroImage?: FaqImageAsset;
  tags: string[];
  body: string;
}

export interface FaqLocaleContent {
  badgeLabel: string;
  title: string;
  placeholder: string;
  noResults: string;
  aboutTitle: string;
  aboutBody: string;
  tagsTitle: string;
  supportButtonLabel: string;
  readMoreLabel: string;
  closeLabel: string;
  items: FaqArticle[];
}

export type FaqContentStore = Record<FaqLocale, FaqLocaleContent>;

export interface LegacyFaqArticle {
  id: string;
  slug?: string;
  question: string;
  excerpt: string;
  answer?: string;
  date?: string;
  publishedAt?: string;
  authorName?: string;
  heroImage?: FaqImageAsset;
  tags: string[];
  body?: string;
  blocks?: FaqBlock[];
}

export interface LegacyFaqLocaleContent {
  badgeLabel?: string;
  title: string;
  placeholder: string;
  noResults: string;
  aboutTitle: string;
  aboutBody: string;
  tagsTitle: string;
  supportButtonLabel?: string;
  readMoreLabel?: string;
  closeLabel?: string;
  items: LegacyFaqArticle[];
}

export type LegacyFaqContentStore = Record<FaqLocale, LegacyFaqLocaleContent>;
