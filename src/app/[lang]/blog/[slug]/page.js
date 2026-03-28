import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getDictionary } from '@/i18n';
import { getAllSlugs, getPostsIndex } from '@/data/postsIndex';
import { getPostBySlug } from '@/data/postsRegistry';
import { posts as legacyPosts } from '@/data/posts';
import { SITE_URL, getCrossLinks, getClusterForPost } from '@/lib/seo';
import { BlogPostingSchema, BreadcrumbSchema } from '@/components/SchemaOrg';
import PostContent from '@/components/PostContent';
import Breadcrumb from '@/components/Breadcrumb';

export async function generateStaticParams() {
  const generated = getAllSlugs();
  const legacy    = legacyPosts.map((p) => ({ slug: p.slug, lang: p.lang }));
  const all = [...generated, ...legacy];
  const seen = new Set();
  return all.filter(({ slug, lang }) => {
    const k = `${lang}/${slug}`;
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

function loadPost(slug) {
  const post = getPostBySlug(slug) || legacyPosts.find((p) => p.slug === slug) || null;
  if (!post) return null;
  const indexEntry = getPostsIndex().find((p) => p.slug === slug);
  if (indexEntry?.seoTitle) post.seoTitle = indexEntry.seoTitle;
  return post;
}

export function generateMetadata({ params }) {
  const { slug, lang } = params;
  const post = loadPost(slug);
  if (!post) return {};
  const canonical  = `${SITE_URL}/${lang}/blog/${slug}`;
  const metaTitle  = post.seoTitle || post.title;
  const ogTitle    = post.title;
  return {
    title: metaTitle,
    description: post.description,
    alternates: {
      canonical,
      languages: Object.fromEntries(['en','fr','de'].map((l) => [l, `${SITE_URL}/${l}/blog/${slug}`])),
    },
    openGraph: {
      title: ogTitle, description: post.description, url: canonical,
      type: 'article', publishedTime: post.date, section: post.category,
      siteName: 'Vie Claire',
      locale: lang === 'fr' ? 'fr_FR' : lang === 'de' ? 'de_DE' : 'en_US',
      images: [{ url: `${SITE_URL}/img/og-default.png`, width: 1200, height: 630, alt: ogTitle }],
    },
    twitter: { card: 'summary_large_image', title: metaTitle, description: post.description, site: '@vieclaire' },
    robots: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
  };
}

const catColors = {
  Budgeting: 'bg-blue-100 text-blue-700',
  Investing:  'bg-green-100 text-green-700',
  Income:     'bg-yellow-100 text-yellow-700',
  FIRE:       'bg-red-100 text-red-700',
  Markets:    'bg-indigo-100 text-indigo-700',
  Mindset:    'bg-orange-100 text-orange-700',
};

export default function BlogPostPage({ params }) {
  const { slug, lang } = params;
  const post = loadPost(slug);
  if (!post) notFound();

  const dict      = getDictionary(lang);
  const allPosts  = getPostsIndex();
  const crossLinks = getCrossLinks(slug, allPosts, 5); // 4-5 related articles
  const cluster   = getClusterForPost(slug);
  const catColor  = catColors[post.category] || 'bg-navy-100 text-navy-600';
  const canonical = `${SITE_URL}/${lang}/blog/${slug}`;

  const formattedDate = new Date(post.date).toLocaleDateString(
    lang === 'fr' ? 'fr-FR' : lang === 'de' ? 'de-DE' : 'en-GB',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );

  const breadcrumbs = [
    { label: 'Vie Claire', href: `/${lang}` },
    { label: dict.nav.blog, href: `/${lang}/blog` },
    ...(cluster ? [{ label: cluster.label, href: `/en/learn/${cluster.pillar}` }] : []),
    { label: post.seoTitle || post.title },
  ];

  const relatedTool = cluster?.relatedTools?.[0];
  const toolLabels = {
    'gross-to-net':       { en:'Gross→Net Calculator', fr:'Calculateur Brut→Net', de:'Brutto-Netto-Rechner' },
    'compound-interest':  { en:'Compound Interest',    fr:'Intérêts Composés',    de:'Zinseszins-Rechner' },
    'fire-calculator':    { en:'FIRE Calculator',       fr:'Calculateur FIRE',     de:'FIRE-Rechner' },
    'savings-rate':       { en:'Savings Rate',          fr:"Taux d'Épargne",       de:'Sparquote' },
  };

  return (
    <>
      {/* Structured data — BlogPosting + BreadcrumbList */}
      <BlogPostingSchema post={post} lang={lang} url={canonical} />
      <BreadcrumbSchema crumbs={breadcrumbs.map((c) => ({ name: c.label, url: c.href ? `${SITE_URL}${c.href}` : canonical }))} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-navy-950 via-navy-900 to-green-950 pt-28 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <div className="text-6xl mb-6">{post.emoji}</div>
          <div className="flex items-center justify-center flex-wrap gap-3 mb-6">
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${catColor}`}>{post.category}</span>
            <span className="text-white/30">·</span>
            <span className="text-white/50 text-sm">{post.readTime} {dict.blog.minRead}</span>
            <span className="text-white/30">·</span>
            <time dateTime={post.date} className="text-white/50 text-sm">{formattedDate}</time>
          </div>
          <h1 className="font-display text-3xl md:text-4xl text-white leading-tight mb-4">{post.title}</h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">{post.description}</p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Breadcrumbs — server-side rendered, crawlable */}
        <Breadcrumb crumbs={breadcrumbs} />

        {/* Cluster badge */}
        {cluster && (
          <Link href={`/en/learn/${cluster.pillar}`} className="inline-flex items-center gap-2 bg-green-50 border border-green-200 hover:border-green-400 rounded-xl px-4 py-2.5 mb-8 transition-all group">
            <span className="text-xl">{cluster.emoji}</span>
            <div>
              <p className="text-xs text-green-600 font-semibold uppercase tracking-wide">Topic Guide</p>
              <p className="text-sm text-navy-700 group-hover:text-green-700 transition-colors font-medium">{cluster.label}</p>
            </div>
            <span className="ml-auto text-green-400 group-hover:translate-x-0.5 transition-transform">→</span>
          </Link>
        )}

        {/* Article body */}
        <PostContent post={post} />

        {/* Related articles — 4-5 posts, server-side rendered links */}
        {crossLinks.length > 0 && (
          <aside className="mt-14 border-t border-navy-100 pt-10" aria-label="Related articles">
            <h2 className="font-display text-2xl text-navy-900 mb-2">
              {lang === 'fr' ? 'Articles Recommandés' : lang === 'de' ? 'Empfohlene Artikel' : 'You Should Also Read'}
            </h2>
            <p className="text-sm text-navy-400 mb-6">
              {lang === 'fr' ? 'Continuez votre lecture avec ces articles liés.' : lang === 'de' ? 'Weiter lesen mit diesen verwandten Artikeln.' : 'Continue learning with these related articles.'}
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {crossLinks.slice(0, 5).map((p) => (
                <Link
                  key={p.slug}
                  href={`/${p.lang || lang}/blog/${p.slug}`}
                  className="group bg-white rounded-xl border border-navy-100 hover:border-green-300 p-4 transition-all hover:shadow-md flex flex-col"
                >
                  <span className="text-2xl mb-2">{p.emoji}</span>
                  <span className={`self-start px-2 py-0.5 rounded-full text-xs font-semibold mb-2 ${catColors[p.category] || 'bg-navy-100 text-navy-600'}`}>{p.category}</span>
                  <span className="font-display text-sm text-navy-900 group-hover:text-green-700 transition-colors line-clamp-3 leading-snug flex-1">
                    {p.seoTitle || p.title}
                  </span>
                  <span className="text-xs text-navy-400 mt-2">{p.readTime} {dict.blog.minRead}</span>
                </Link>
              ))}
            </div>
          </aside>
        )}

        {/* Tool CTA */}
        <div className="mt-10 p-8 bg-gradient-to-br from-green-950 to-navy-900 rounded-2xl text-center">
          <span className="text-4xl">🧮</span>
          <h3 className="font-display text-2xl text-white mt-4 mb-2">
            {lang === 'fr' ? "Passez à l'Action" : lang === 'de' ? 'Jetzt handeln' : 'Put It Into Practice'}
          </h3>
          <p className="text-white/60 mb-6 text-sm max-w-sm mx-auto">
            {lang === 'fr' ? "Calculateurs gratuits pour appliquer ce que vous venez d'apprendre." : lang === 'de' ? 'Kostenlose Rechner zum Anwenden des Gelernten.' : 'Use our free calculators to apply what you just learned.'}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {(cluster?.relatedTools || ['compound-interest','savings-rate']).slice(0,3).map((tool) => (
              <Link key={tool} href={`/${lang}/tools/${tool}`} className="inline-flex items-center gap-1.5 bg-green-500 hover:bg-green-400 text-white font-semibold px-4 py-2 rounded-xl transition-colors text-sm">
                {toolLabels[tool]?.[lang] || toolLabels[tool]?.en || tool} →
              </Link>
            ))}
          </div>
        </div>

        {/* Cluster footer */}
        {cluster && (
          <div className="mt-10 p-6 border border-navy-100 rounded-2xl">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{cluster.emoji}</span>
              <div>
                <p className="text-xs text-navy-400 uppercase tracking-widest font-semibold">Part of the guide</p>
                <Link href={`/en/learn/${cluster.pillar}`} className="font-display text-lg text-navy-900 hover:text-green-700 transition-colors">
                  {cluster.label}
                </Link>
              </div>
            </div>
            <p className="text-sm text-navy-500 mb-4">{cluster.description}</p>
            <Link href={`/en/learn/${cluster.pillar}`} className="text-sm font-medium text-green-600 hover:text-green-700 transition-colors">
              {lang === 'fr' ? 'Voir tous les articles →' : lang === 'de' ? 'Alle Artikel sehen →' : 'See all articles in this guide →'}
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
