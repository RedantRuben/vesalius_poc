import {
  internalMutationGeneric as internalMutation,
  internalQueryGeneric as internalQuery,
  queryGeneric as query,
} from "convex/server";
import { v } from "convex/values";

type LocaleContent = {
  aboutBody: string;
  aboutTitle: string;
  badgeLabel: string;
  closeLabel: string;
  items: Array<{
    authorName: string;
    body: string;
    excerpt: string;
    heroImage?: {
      alt: string;
      caption?: string;
      src: string;
    };
    id: string;
    legacySlugs: string[];
    publishedAt: string;
    question: string;
    slug: string;
    tags: string[];
  }>;
  noResults: string;
  placeholder: string;
  readMoreLabel: string;
  supportButtonLabel: string;
  tagsTitle: string;
  title: string;
};

function createEmptyLocaleContent(): LocaleContent {
  return {
    aboutBody: "",
    aboutTitle: "",
    badgeLabel: "",
    closeLabel: "",
    items: [],
    noResults: "",
    placeholder: "",
    readMoreLabel: "",
    supportButtonLabel: "",
    tagsTitle: "",
    title: "",
  };
}

export const getContent = query({
  args: {},
  handler: async (ctx) => {
    const state = await ctx.db
      .query("faqCmsState")
      .withIndex("by_key", (queryBuilder) => queryBuilder.eq("key", "singleton"))
      .unique();

    if (!state?.currentVersion) {
      return null;
    }

    const [articles, bodyChunks, localeSettings] = await Promise.all([
      ctx.db
        .query("faqArticles")
        .withIndex("by_version", (queryBuilder) => queryBuilder.eq("version", state.currentVersion))
        .collect(),
      ctx.db
        .query("faqArticleBodyChunks")
        .withIndex("by_version", (queryBuilder) => queryBuilder.eq("version", state.currentVersion))
        .collect(),
      ctx.db
        .query("faqLocaleSettings")
        .withIndex("by_version", (queryBuilder) => queryBuilder.eq("version", state.currentVersion))
        .collect(),
    ]);

    const content = new Map<string, LocaleContent>();

    for (const localeSetting of localeSettings) {
      content.set(localeSetting.locale, {
        aboutBody: localeSetting.aboutBody,
        aboutTitle: localeSetting.aboutTitle,
        badgeLabel: localeSetting.badgeLabel,
        closeLabel: localeSetting.closeLabel,
        items: [],
        noResults: localeSetting.noResults,
        placeholder: localeSetting.placeholder,
        readMoreLabel: localeSetting.readMoreLabel,
        supportButtonLabel: localeSetting.supportButtonLabel,
        tagsTitle: localeSetting.tagsTitle,
        title: localeSetting.title,
      });
    }

    const bodyChunksByArticleId = new Map<string, Array<{ chunk: string; chunkIndex: number }>>();

    for (const bodyChunk of bodyChunks) {
      const chunks = bodyChunksByArticleId.get(bodyChunk.articleId) ?? [];
      chunks.push({
        chunk: bodyChunk.chunk,
        chunkIndex: bodyChunk.chunkIndex,
      });
      bodyChunksByArticleId.set(bodyChunk.articleId, chunks);
    }

    const sortedArticles = [...articles].sort((left, right) => {
      if (left.locale === right.locale) {
        return left.position - right.position;
      }

      return left.locale.localeCompare(right.locale);
    });

    for (const article of sortedArticles) {
      const localeContent = content.get(article.locale) ?? createEmptyLocaleContent();
      const articleBody =
        bodyChunksByArticleId
          .get(article.id)
          ?.sort((left, right) => left.chunkIndex - right.chunkIndex)
          .map((entry) => entry.chunk)
          .join("") ?? article.body ?? "";

      localeContent.items.push({
        authorName: article.authorName,
        body: articleBody,
        excerpt: article.excerpt,
        heroImage: article.heroImage,
        id: article.id,
        legacySlugs: article.legacySlugs,
        publishedAt: article.publishedAt,
        question: article.question,
        slug: article.slug,
        tags: article.tags,
      });
      content.set(article.locale, localeContent);
    }

    return Object.fromEntries(content);
  },
});

export const getCurrentVersion = internalQuery({
  args: {},
  returns: v.union(v.string(), v.null()),
  handler: async (ctx) => {
    const state = await ctx.db
      .query("faqCmsState")
      .withIndex("by_key", (queryBuilder) => queryBuilder.eq("key", "singleton"))
      .unique();

    return state?.currentVersion ?? null;
  },
});

export const insertLocaleSettings = internalMutation({
  args: {
    aboutBody: v.string(),
    aboutTitle: v.string(),
    badgeLabel: v.string(),
    closeLabel: v.string(),
    locale: v.string(),
    noResults: v.string(),
    placeholder: v.string(),
    readMoreLabel: v.string(),
    supportButtonLabel: v.string(),
    tagsTitle: v.string(),
    title: v.string(),
    version: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("faqLocaleSettings", args);
    return null;
  },
});

export const insertArticle = internalMutation({
  args: {
    authorName: v.string(),
    excerpt: v.string(),
    heroImage: v.optional(
      v.object({
        alt: v.string(),
        caption: v.optional(v.string()),
        src: v.string(),
      }),
    ),
    id: v.string(),
    legacySlugs: v.array(v.string()),
    locale: v.string(),
    position: v.number(),
    publishedAt: v.string(),
    question: v.string(),
    slug: v.string(),
    tags: v.array(v.string()),
    version: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("faqArticles", args);
    return null;
  },
});

export const insertArticleBodyChunk = internalMutation({
  args: {
    articleId: v.string(),
    chunk: v.string(),
    chunkIndex: v.number(),
    locale: v.string(),
    version: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("faqArticleBodyChunks", args);
    return null;
  },
});

export const activateVersion = internalMutation({
  args: {
    version: v.string(),
  },
  handler: async (ctx, args) => {
    const existingState = await ctx.db
      .query("faqCmsState")
      .withIndex("by_key", (queryBuilder) => queryBuilder.eq("key", "singleton"))
      .unique();

    if (existingState) {
      await ctx.db.patch(existingState._id, { currentVersion: args.version });
      return null;
    }

    await ctx.db.insert("faqCmsState", {
      currentVersion: args.version,
      key: "singleton",
    });

    return null;
  },
});

export const deleteVersion = internalMutation({
  args: {
    version: v.string(),
  },
  handler: async (ctx, args) => {
    const [articles, bodyChunks, localeSettings] = await Promise.all([
      ctx.db
        .query("faqArticles")
        .withIndex("by_version", (queryBuilder) => queryBuilder.eq("version", args.version))
        .collect(),
      ctx.db
        .query("faqArticleBodyChunks")
        .withIndex("by_version", (queryBuilder) => queryBuilder.eq("version", args.version))
        .collect(),
      ctx.db
        .query("faqLocaleSettings")
        .withIndex("by_version", (queryBuilder) => queryBuilder.eq("version", args.version))
        .collect(),
    ]);

    for (const article of articles) {
      await ctx.db.delete(article._id);
    }

    for (const bodyChunk of bodyChunks) {
      await ctx.db.delete(bodyChunk._id);
    }

    for (const localeSetting of localeSettings) {
      await ctx.db.delete(localeSetting._id);
    }

    return null;
  },
});

export const generateUploadUrl = internalMutation({
  args: {},
  returns: v.string(),
  handler: async (ctx) => {
    return ctx.storage.generateUploadUrl();
  },
});

export const getFileUrl = internalQuery({
  args: {
    storageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    return ctx.storage.getUrl(args.storageId);
  },
});
