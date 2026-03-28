import Link from 'next/link';
import { SITE_URL } from '@/lib/seo';
import { getPostsIndex } from '@/data/postsIndex';
import BlogCard from '@/components/BlogCard';
import { getDictionary } from '@/i18n';

const POSTS_PER_PAGE = 12;
const STATIC_LANGS = ['en', 'fr', 'de'];

export function generateStaticParams() {
  const params = [];
  for (const lang of STATIC_LANGS) {
    const allPosts = getPostsIndex().filter((p) => p.lang === lang);
    const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
    for (let page = 2; page <= Math.max(totalPages, 2); page++) {
      params.push({ lang, page: String(page) });
    }
  }
  return params;
}

export function generateMetadata({ params }) {
  const { lang, page } = params;
  const canonical = `${SITE_URL}/${lang}/blog/page/${page}`;
  const titles = { en: `Blog — Page ${page}`, fr: `Blog — Page ${page}`, de: `Blog — Seite ${page}` };
  return {
    title: titles[lang] || titles.en,
    alternates: {
      canonical,
      languages: { en: `${SITE_URL}/en/blog/page/${page}`, fr: `${SITE_URL}/fr/blog/page/${page}`, de: `${SITE_URL}/de/blog/page/${page}` },
    },
    robots: { index: true, follow: true },
    // Pagination rel links
    other: {
      ...(Number(page) > 2 ? { 'prev': `${SITE_URL}/${lang}/blog/page/${Number(page)-1}` } : { 'prev': `${SITE_URL}/${lang}/blog` }),
      'next': `${SITE_URL}/${lang}/blog/page/${Number(page)+1}`,
    },
  };
}

export default function BlogPageN({ params }) {
  const { lang, page: pageStr } = params;
  const page = Number(pageStr);
  const dict = getDictionary(lang);
  const allLangPosts = getPostsIndex()
    .filter((p) => p.lang === lang)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const totalPages = Math.ceil(allLangPosts.length / POSTS_PER_PAGE);
  const posts = allLangPosts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  if (posts.length === 0) return null;

  const prevHref = page === 2 ? `/${lang}/blog` : `/${lang}/blog/page/${page - 1}`;
  const nextHref = page < totalPages ? `/${lang}/blog/page/${page + 1}` : null;

  return (
    <>
      <section className="relative bg-gradient-to-br from-navy-950 via-navy-900 to-green-950 pt-32 pb-14">
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h1 className="font-display text-3xl text-white mb-2">{dict.blog.title}</h1>
          <p className="text-white/50 text-sm">
            {lang === 'fr' ? `Page ${page} sur ${totalPages}` : lang === 'de' ? `Seite ${page} von ${totalPages}` : `Page ${page} of ${totalPages}`}
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} lang={lang} dict={dict} />
          ))}
        </div>

        {/* Server-rendered pagination — fully crawlable */}
        <nav aria-label="Pagination" className="flex items-center justify-center gap-2 flex-wrap">
          <Link href={prevHref} className="px-4 py-2 rounded-lg border border-navy-200 text-navy-600 text-sm hover:bg-navy-50 transition-colors">
            {dict.home.prev}
          </Link>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={p === 1 ? `/${lang}/blog` : `/${lang}/blog/page/${p}`}
              aria-current={p === page ? 'page' : undefined}
              className={`w-9 h-9 rounded-lg text-sm font-medium flex items-center justify-center transition-colors ${
                p === page ? 'bg-green-500 text-white' : 'border border-navy-200 text-navy-600 hover:bg-navy-50'
              }`}
            >
              {p}
            </Link>
          ))}
          {nextHref && (
            <Link href={nextHref} className="px-4 py-2 rounded-lg border border-navy-200 text-navy-600 text-sm hover:bg-navy-50 transition-colors">
              {dict.home.next}
            </Link>
          )}
        </nav>

        {/* Pagination rel links for SEO */}
        <link rel="prev" href={`${SITE_URL}${prevHref}`} />
        {nextHref && <link rel="next" href={`${SITE_URL}${nextHref}`} />}
      </section>
    </>
  );
}
