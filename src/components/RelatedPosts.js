import Link from 'next/link';

const categoryColors = {
  Budgeting: 'bg-blue-100 text-blue-700',
  Investing:  'bg-green-100 text-green-700',
  FIRE:       'bg-red-100 text-red-700',
  Markets:    'bg-indigo-100 text-indigo-700',
  Mindset:    'bg-orange-100 text-orange-700',
  Income:     'bg-yellow-100 text-yellow-700',
};

export default function RelatedPosts({ posts, lang, dict, title }) {
  if (!posts || posts.length === 0) return null;

  return (
    <aside className="mt-16 border-t border-navy-100 pt-12">
      <h2 className="font-display text-2xl text-navy-900 mb-2">
        {title || (lang === 'fr' ? 'Articles Recommandés' : lang === 'de' ? 'Empfohlene Artikel' : 'You Should Also Read')}
      </h2>
      <p className="text-sm text-navy-400 mb-6">
        {lang === 'fr' ? 'Poursuivez votre lecture avec ces articles liés.' : lang === 'de' ? 'Lese weiter mit diesen verwandten Artikeln.' : 'Continue learning with these related articles.'}
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {posts.map((p) => (
          <Link
            key={p.slug}
            href={`/${p.lang || lang}/blog/${p.slug}`}
            className="group bg-white rounded-xl border border-navy-100 hover:border-green-300 p-4 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 flex flex-col"
          >
            <div className="text-2xl mb-2">{p.emoji}</div>
            <span className={`self-start px-2 py-0.5 rounded-full text-xs font-semibold mb-2 ${categoryColors[p.category] || 'bg-navy-100 text-navy-600'}`}>
              {p.category}
            </span>
            <h3 className="font-display text-sm text-navy-900 group-hover:text-green-700 transition-colors line-clamp-3 leading-snug flex-1">
              {p.seoTitle || p.title}
            </h3>
            <p className="text-xs text-navy-400 mt-2">{p.readTime} {dict?.blog?.minRead || 'min read'}</p>
          </Link>
        ))}
      </div>
    </aside>
  );
}
