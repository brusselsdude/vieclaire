'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Hero from '@/components/Hero';
import BlogCard from '@/components/BlogCard';
import { getDictionary } from '@/i18n';
import { CLUSTERS } from '@/lib/seo';
import { getPostsIndex } from '@/data/postsIndex';
import { posts as legacyPosts } from '@/data/posts';

const POSTS_PER_PAGE = 9;

const toolCards = (lang) => [
  { href: `/${lang}/tools/gross-to-net`, emoji: '💸', title: lang === 'fr' ? 'Calculateur Brut → Net' : lang === 'de' ? 'Brutto-Netto-Rechner' : 'Gross → Net Calculator', desc: lang === 'fr' ? 'Ce que vous ramenez vraiment' : lang === 'de' ? 'Was du wirklich verdienst' : 'What you actually take home', badge: lang === 'fr' ? '5 pays' : lang === 'de' ? '5 Länder' : '5 countries', color: 'from-green-500/10 to-green-600/5 border-green-500/20 hover:border-green-400/40' },
  { href: `/${lang}/tools/compound-interest`, emoji: '📈', title: lang === 'fr' ? 'Intérêts Composés' : lang === 'de' ? 'Zinseszins-Rechner' : 'Compound Interest', desc: lang === 'fr' ? "La magie de l'argent qui travaille" : lang === 'de' ? 'Geld, das für dich arbeitet' : 'The magic of money working for you', badge: lang === 'fr' ? 'Incontournable' : lang === 'de' ? 'Unverzichtbar' : 'Must-try', color: 'from-blue-500/10 to-blue-600/5 border-blue-500/20 hover:border-blue-400/40' },
  { href: `/${lang}/tools/fire-calculator`, emoji: '🔥', title: lang === 'fr' ? 'Calculateur FIRE' : lang === 'de' ? 'FIRE-Rechner' : 'FIRE Calculator', desc: lang === 'fr' ? 'Quand pouvez-vous arrêter de travailler ?' : lang === 'de' ? 'Wann kannst du aufhören zu arbeiten?' : 'When can you stop working?', badge: lang === 'fr' ? 'Populaire' : lang === 'de' ? 'Beliebt' : 'Popular', color: 'from-orange-500/10 to-orange-600/5 border-orange-500/20 hover:border-orange-400/40' },
  { href: `/${lang}/tools/savings-rate`, emoji: '💰', title: lang === 'fr' ? "Taux d'Épargne" : lang === 'de' ? 'Sparquoten-Rechner' : 'Savings Rate', desc: lang === 'fr' ? 'Le chiffre le plus important' : lang === 'de' ? 'Die wichtigste Zahl' : 'The one number that matters', badge: lang === 'fr' ? 'Essentiel' : lang === 'de' ? 'Essenziell' : 'Essential', color: 'from-purple-500/10 to-purple-600/5 border-purple-500/20 hover:border-purple-400/40' },
];

export default function HomePage({ params }) {
  const lang = params.lang;
  const dict = getDictionary(lang);

  const { primaryPosts, secondaryPosts } = useMemo(() => {
    const allIndexed = getPostsIndex();
    const legacy = legacyPosts.filter((p) => p.lang === lang);

    const langPosts = allIndexed.filter((p) => p.lang === lang);
    const legacyLang = legacy.filter((p) => !allIndexed.find((i) => i.slug === p.slug));
    const primary = [...langPosts, ...legacyLang].sort((a, b) => new Date(b.date) - new Date(a.date));

    // EN posts shown as secondary for non-EN users
    const secondary = lang !== 'en'
      ? allIndexed.filter((p) => p.lang === 'en').sort((a, b) => new Date(b.date) - new Date(a.date))
      : [];

    return { primaryPosts: primary, secondaryPosts: secondary };
  }, [lang]);

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const filteredPosts = useMemo(() => {
    if (!search.trim()) return primaryPosts;
    const q = search.toLowerCase();
    return primaryPosts.filter(
      (p) =>
        (p.title || '').toLowerCase().includes(q) ||
        (p.description || '').toLowerCase().includes(q) ||
        (p.category || '').toLowerCase().includes(q)
    );
  }, [primaryPosts, search]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Vie Claire',
            url: `https://www.vieclaire.com/${lang}`,
            description: dict.hero.subtitle,
            inLanguage: lang,
            potentialAction: {
              '@type': 'SearchAction',
              target: { '@type': 'EntryPoint', urlTemplate: `https://www.vieclaire.com/${lang}/blog?q={search_term_string}` },
              'query-input': 'required name=search_term_string',
            },
          }),
        }}
      />
      <Hero dict={dict} lang={lang} />

      {/* Tools strip */}
      <section className="relative -mt-8 z-20 max-w-5xl mx-auto px-6">
        <div className="mb-6">
          <h2 className="font-display text-2xl text-navy-900">{dict.home.toolsTitle}</h2>
          <p className="text-navy-500 mt-1 text-sm">{dict.home.toolsSubtitle}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {toolCards(lang).map((tool) => (
            <Link key={tool.href} href={tool.href} className={`bg-gradient-to-br ${tool.color} border rounded-xl p-5 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 group`}>
              <div className="text-3xl mb-3">{tool.emoji}</div>
              <div className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold bg-white/60 text-navy-600 mb-2">{tool.badge}</div>
              <h3 className="font-display text-base text-navy-900 group-hover:text-green-700 transition-colors">{tool.title}</h3>
              <p className="text-xs text-navy-500 mt-1">{tool.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Topic clusters */}
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-4">
        <h2 className="font-display text-2xl text-navy-900 mb-2">
          {lang === 'fr' ? 'Guides Thématiques' : lang === 'de' ? 'Themen-Guides' : 'Topic Guides'}
        </h2>
        <p className="text-navy-500 text-sm mb-6">
          {lang === 'fr' ? 'Des parcours complets, du débutant à l\'expert.' : lang === 'de' ? 'Vollständige Lernpfade vom Anfänger zum Experten.' : 'Complete learning paths from beginner to confident.'}
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {Object.values(CLUSTERS).map((c) => (
            <Link key={c.pillar} href={`/${lang}/learn/${c.pillar}`} className={`group bg-gradient-to-br ${c.color} rounded-xl p-4 text-white hover:opacity-90 transition-all hover:-translate-y-0.5`}>
              <div className="text-2xl mb-2">{c.emoji}</div>
              <h3 className="font-display text-sm leading-snug">{c.label}</h3>
              <p className="text-xs text-white/60 mt-1">{c.posts.length} articles</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Blog listing */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <div>
            <h2 className="font-display text-3xl text-navy-900">{dict.home.postsTitle}</h2>
            <p className="text-navy-500 mt-1">{search.trim() ? filteredPosts.length : primaryPosts.length} {dict.home.postsSubtitle}</p>
          </div>
          <div className="relative w-full sm:w-80">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input type="text" placeholder={dict.home.search} value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-navy-200 bg-white text-navy-800 text-sm placeholder:text-navy-400 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all" />
          </div>
        </div>

        {paginatedPosts.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedPosts.map((post) => <BlogCard key={post.slug} post={post} lang={lang} dict={dict} />)}
          </div>
        ) : (
          <div className="text-center py-16"><p className="text-navy-400 text-lg">{dict.home.noResults} &ldquo;{search}&rdquo;</p></div>
        )}

        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2 flex-wrap">
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="px-4 py-2 rounded-lg border border-navy-200 text-navy-600 text-sm hover:bg-navy-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">{dict.home.prev}</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 2).reduce((acc, p, i, arr) => { if (i > 0 && p - arr[i - 1] > 1) acc.push({ type: 'ellipsis', key: `e${p}` }); acc.push({ type: 'page', value: p, key: p }); return acc; }, []).map((item) => item.type === 'ellipsis' ? <span key={item.key} className="px-2 text-navy-400">…</span> : <button key={item.key} onClick={() => setPage(item.value)} className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${item.value === page ? 'bg-green-500 text-white' : 'border border-navy-200 text-navy-600 hover:bg-navy-50'}`}>{item.value}</button>)}
            <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-4 py-2 rounded-lg border border-navy-200 text-navy-600 text-sm hover:bg-navy-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">{dict.home.next}</button>
          </div>
        )}
      </section>

      {/* Secondary EN posts (only for FR/DE) */}
      {lang !== 'en' && secondaryPosts.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 pb-8">
          <div className="border-t border-navy-100 pt-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-display text-xl text-navy-700">
                  {lang === 'fr' ? `📰 Articles en Anglais (${secondaryPosts.length})` : `📰 Artikel auf Englisch (${secondaryPosts.length})`}
                </h2>
                <p className="text-sm text-navy-400 mt-1">
                  {lang === 'fr' ? 'Ces articles sont disponibles uniquement en anglais.' : 'Diese Artikel sind nur auf Englisch verfügbar.'}
                </p>
              </div>
              <Link href={`/${lang}/blog`} className="text-sm text-green-600 hover:text-green-700 font-medium transition-colors">
                {lang === 'fr' ? 'Voir tout →' : 'Alle sehen →'}
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {secondaryPosts.slice(0, 6).map((post) => (
                <BlogCard key={post.slug} post={post} lang="en" dict={dict} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section className="bg-gradient-to-r from-green-950 to-navy-900 py-20">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <span className="text-4xl">📬</span>
          <h2 className="font-display text-3xl text-white mt-4 mb-3">{lang === 'fr' ? 'La Finance, Sans la Douleur' : lang === 'de' ? 'Finanzen ohne den Schmerz' : 'Finance, Without the Pain'}</h2>
          <p className="text-white/60 mb-8">{lang === 'fr' ? 'Rejoignez des milliers de lecteurs qui ont décidé de maîtriser leur argent.' : lang === 'de' ? 'Schließe dich Tausenden von Lesern an, die ihr Geld meistern wollen.' : 'Join thousands of readers who decided to master their money (without taking themselves too seriously).'}</p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder={lang === 'fr' ? 'votre@email.com' : lang === 'de' ? 'deine@email.de' : 'your@email.com'} className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-green-400" />
            <button type="submit" className="px-6 py-3 bg-green-500 hover:bg-green-400 text-white font-semibold rounded-xl transition-colors whitespace-nowrap">{lang === 'fr' ? "S'inscrire" : lang === 'de' ? 'Anmelden' : 'Subscribe'}</button>
          </form>
          <p className="text-white/30 text-xs mt-3">{lang === 'fr' ? 'Gratuit. Pas de spam. Désabonnement en 1 clic.' : lang === 'de' ? 'Kostenlos. Kein Spam. 1-Klick-Abmeldung.' : 'Free. No spam. Unsubscribe in 1 click.'}</p>
        </div>
      </section>
    </>
  );
}
