import { SITE_URL, SITE_NAME } from '@/lib/seo';

// ─── Shared author + publisher blocks ────────────────────────────────────────
const AUTHOR_NILUS = {
  '@type': 'Organization',
  '@id': 'https://www.nilus.be/#organization',
  name: 'NILUS',
  url: 'https://www.nilus.be',
};

const PUBLISHER_VIECLAIRE = {
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/img/logo.png`,
    width: 200,
    height: 60,
  },
};

// ─── Organization schema (sitewide) ──────────────────────────────────────────
export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/img/logo.png`,
      width: 200,
      height: 60,
    },
    sameAs: [],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      url: `${SITE_URL}/en/contact`,
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── WebSite schema (homepage) ────────────────────────────────────────────────
export function WebSiteSchema({ lang = 'en' }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: `${SITE_URL}/${lang}`,
    description:
      'Personal finance education: budgeting, investing, FIRE, and financial tools. Available in English, French, and German.',
    inLanguage: lang,
    publisher: { '@id': `${SITE_URL}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/${lang}/blog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── BlogPosting schema (blog posts) ─────────────────────────────────────────
// Uses @type BlogPosting (subtype of Article) for Google rich results eligibility.
// Author is always NILUS per site policy.
export function BlogPostingSchema({ post, lang, url }) {
  const keywords = [post.category, ...(post.title || '').split(/\s+/).filter(w => w.length > 5)].slice(0, 10).join(', ');
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: post.seoTitle || post.title,
    name: post.title,
    description: post.description,
    url,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: lang,
    author: AUTHOR_NILUS,
    publisher: PUBLISHER_VIECLAIRE,
    image: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/img/og-default.png`,
      width: 1200,
      height: 630,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    isPartOf: { '@id': `${SITE_URL}/#website` },
    articleSection: post.category,
    timeRequired: `PT${post.readTime || 8}M`,
    keywords,
    wordCount: post.readTime ? post.readTime * 230 : undefined,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── ArticleSchema kept for backward compat (not used on blog posts) ─────────
// Prefer BlogPostingSchema for blog posts.
export function ArticleSchema({ post, lang, url }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: post.seoTitle || post.title,
    description: post.description,
    url,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: lang,
    author: AUTHOR_NILUS,
    publisher: PUBLISHER_VIECLAIRE,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    articleSection: post.category,
    timeRequired: `PT${post.readTime || 8}M`,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── BreadcrumbList schema ────────────────────────────────────────────────────
export function BreadcrumbSchema({ crumbs }) {
  // crumbs: [{ name, url }]
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: c.url,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── FAQPage schema (cluster/pillar pages) ────────────────────────────────────
export function FAQSchema({ questions }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: { '@type': 'Answer', text: q.answer },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── WebApplication schema (tools) ───────────────────────────────────────────
export function ToolSchema({ name, description, url }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    '@id': `${url}#app`,
    name,
    description,
    url,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
    author: PUBLISHER_VIECLAIRE,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── CollectionPage schema (cluster pages) ────────────────────────────────────
export function CollectionSchema({ name, description, url, posts }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${url}#collection`,
    name,
    description,
    url,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    hasPart: posts.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.seoTitle || p.title,
      url: `${SITE_URL}/en/blog/${p.slug}`,
      description: p.description,
      author: AUTHOR_NILUS,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
