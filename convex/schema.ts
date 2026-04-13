import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const heroImageValidator = v.object({
  alt: v.string(),
  caption: v.optional(v.string()),
  src: v.string(),
});

export default defineSchema({
  faqArticles: defineTable({
    authorName: v.string(),
    body: v.optional(v.string()),
    excerpt: v.string(),
    heroImage: v.optional(heroImageValidator),
    id: v.string(),
    legacySlugs: v.array(v.string()),
    locale: v.string(),
    position: v.number(),
    publishedAt: v.string(),
    question: v.string(),
    slug: v.string(),
    tags: v.array(v.string()),
    version: v.string(),
  })
    .index("by_locale", ["locale"])
    .index("by_locale_and_position", ["locale", "position"])
    .index("by_version", ["version"]),

  faqLocaleSettings: defineTable({
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
  })
    .index("by_locale", ["locale"])
    .index("by_version", ["version"]),

  faqCmsState: defineTable({
    currentVersion: v.string(),
    key: v.string(),
  }).index("by_key", ["key"]),

  faqArticleBodyChunks: defineTable({
    articleId: v.string(),
    chunk: v.string(),
    chunkIndex: v.number(),
    locale: v.string(),
    version: v.string(),
  })
    .index("by_version", ["version"])
    .index("by_version_and_article", ["version", "articleId"]),
});
