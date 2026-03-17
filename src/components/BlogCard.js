import Link from 'next/link';

const categoryColors = {
  Budgeting:    'bg-blue-100 text-blue-700',
  Budget:       'bg-blue-100 text-blue-700',
  Budgetierung: 'bg-blue-100 text-blue-700',
  Investing:    'bg-green-100 text-green-700',
  Investieren:  'bg-green-100 text-green-700',
  Income:       'bg-yellow-100 text-yellow-700',
  Savings:      'bg-purple-100 text-purple-700',
  'Indépendance Financière': 'bg-orange-100 text-orange-700',
  FIRE:         'bg-red-100 text-red-700',
  Markets:      'bg-indigo-100 text-indigo-700',
  Mindset:      'bg-orange-100 text-orange-700',
};

export default function BlogCard({ post, lang, dict }) {
  const catColor = categoryColors[post.category] || 'bg-navy-100 text-navy-600';

  // CRITICAL: always use the post's own lang for the URL.
  // An EN post must link to /en/blog/[slug], never /fr/blog/[slug].
  const postLang = post.lang || 'en';
  const href = `/${postLang}/blog/${post.slug}`;

  // Show a language badge if the post is in a different language than the UI
  const isCrossLang = postLang !== lang;

  return (
    <Link
      href={href}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-navy-100 hover:shadow-lg hover:border-green-300 transition-all duration-300 flex flex-col"
    >
      {/* Emoji hero */}
      <div className="bg-gradient-to-br from-navy-900 to-navy-800 h-32 flex items-center justify-center text-6xl group-hover:scale-105 transition-transform duration-300">
        {post.emoji}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${catColor}`}>
            {post.category}
          </span>
          {isCrossLang && (
            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-navy-100 text-navy-500 border border-navy-200">
              {postLang === 'en' ? '🇬🇧 EN' : postLang === 'fr' ? '🇫🇷 FR' : '🇩🇪 DE'}
            </span>
          )}
          <span className="text-xs text-navy-400 ml-auto">
            {post.readTime} {dict?.blog?.minRead || 'min read'}
          </span>
        </div>

        <h3 className="font-display text-lg text-navy-900 leading-snug mb-2 group-hover:text-green-700 transition-colors line-clamp-3">
          {post.seoTitle || post.title}
        </h3>

        <p className="text-sm text-navy-500 leading-relaxed flex-1 line-clamp-3">
          {post.description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-navy-400">
            {new Date(post.date).toLocaleDateString(
              postLang === 'fr' ? 'fr-FR' : postLang === 'de' ? 'de-DE' : 'en-GB',
              { year: 'numeric', month: 'short', day: 'numeric' }
            )}
          </span>
          <span className="text-xs text-green-600 font-medium group-hover:text-green-700 transition-colors">
            {dict?.blog?.readMore || 'Read →'}
          </span>
        </div>
      </div>
    </Link>
  );
}
