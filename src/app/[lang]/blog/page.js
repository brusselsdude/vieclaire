'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import BlogCard from '@/components/BlogCard';
import { getDictionary } from '@/i18n';
import { getPostsIndex } from '@/data/postsIndex';
import { posts as legacyPosts } from '@/data/posts';

const categories = ['All', 'Investing', 'FIRE', 'Budgeting', 'Markets', 'Mindset'];

export default function BlogPage({ params }) {
  const lang = params.lang;
  const dict = getDictionary(lang);

  // PRIMARY posts: only those matching the current language
  // SECONDARY posts: EN posts shown to non-EN users as a separate "Also in English" section
  const { primaryPosts, secondaryPosts } = useMemo(() => {
    const allIndexed = getPostsIndex();
    const legacy = legacyPosts.filter((p) => p.lang === lang);

    const langPosts = allIndexed.filter((p) => p.lang === lang);
    const legacyLang = legacy.filter((p) => !allIndexed.find((i) => i.slug === p.slug));
    const primary = [...langPosts, ...legacyLang].sort((a, b) => new Date(b.date) - new Date(a.date));

    // For non-EN users, show EN posts in a secondary section
    const secondary = lang !== 'en'
      ? allIndexed.filter((p) => p.lang === 'en').sort((a, b) => new Date(b.date) - new Date(a.date))
      : [];

    return { primaryPosts: primary, secondaryPosts: secondary };
  }, [lang]);

  const [activeCat, setActiveCat] = useState('All');
  const [search, setSearch] = useState('');
  const [showEN, setShowEN] = useState(false);

  const filteredPrimary = useMemo(() => {
    let p = primaryPosts;
    if (activeCat !== 'All') p = p.filter((post) => post.category === activeCat);
    if (search.trim()) {
      const q = search.toLowerCase();
      p = p.filter((post) =>
        (post.title || '').toLowerCase().includes(q) ||
        (post.description || '').toLowerCase().includes(q)
      );
    }
    return p;
  }, [primaryPosts, activeCat, search]);

  const filteredSecondary = useMemo(() => {
    let p = secondaryPosts;
    if (activeCat !== 'All') p = p.filter((post) => post.category === activeCat);
    if (search.trim()) {
      const q = search.toLowerCase();
      p = p.filter((post) =>
        (post.title || '').toLowerCase().includes(q) ||
        (post.description || '').toLowerCase().includes(q)
      );
    }
    return p;
  }, [secondaryPosts, activeCat, search]);

  const totalCount = filteredPrimary.length + (showEN ? filteredSecondary.length : 0);

  const heroTitle = {
    en: 'Financial Wisdom That Won\'t Put You to Sleep',
    fr: 'Sagesse Financière Sans Jargon',
    de: 'Finanzwissen, das du wirklich verstehst',
  }[lang] || dict.blog.subtitle;

  const enSectionLabel = {
    fr: `📰 Articles en Anglais (${filteredSecondary.length})`,
    de: `📰 Artikel auf Englisch (${filteredSecondary.length})`,
  }[lang];

  return (
    <>
      {/* Breadcrumb schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Vie Claire', item: `https://www.vieclaire.com/${lang}` },
              { '@type': 'ListItem', position: 2, name: dict.nav.blog, item: `https://www.vieclaire.com/${lang}/blog` },
            ],
          }),
        }}
      />
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-navy-950 via-navy-900 to-green-950 pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-72 h-72 bg-green-500 rounded-full blur-3xl" />
          <div className="absolute bottom-5 right-20 w-96 h-96 bg-green-400 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <p className="text-green-400 font-medium tracking-widest uppercase text-sm mb-4">
            📰 {dict.blog.title}
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-white mb-6 leading-tight">
            {heroTitle}
          </h1>
          <p className="text-white/50">
            {primaryPosts.length} {dict.home.postsSubtitle}
            {lang !== 'en' && secondaryPosts.length > 0 && (
              <span className="text-white/30"> · {secondaryPosts.length} en anglais</span>
            )}
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-12">
        {/* Filter bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-10">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  activeCat === cat
                    ? 'bg-green-500 text-white shadow-md'
                    : 'bg-white border border-navy-200 text-navy-600 hover:border-green-300 hover:text-green-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative sm:ml-auto w-full sm:w-72">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder={dict.home.search}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-navy-200 bg-white text-navy-800 text-sm placeholder:text-navy-400 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all"
            />
          </div>
        </div>

        {/* Primary language posts */}
        {filteredPrimary.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrimary.map((post) => (
              <BlogCard key={post.slug} post={post} lang={lang} dict={dict} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <span className="text-4xl">🔍</span>
            <p className="text-navy-400 text-lg mt-4">
              {dict.home.noResults} &ldquo;{search}&rdquo;
            </p>
          </div>
        )}

        {/* Secondary EN posts section (only for FR/DE users) */}
        {lang !== 'en' && filteredSecondary.length > 0 && (
          <div className="mt-16 border-t border-navy-100 pt-10">
            <button
              onClick={() => setShowEN(!showEN)}
              className="flex items-center gap-3 group mb-6"
            >
              <div className="flex-1">
                <h2 className="font-display text-xl text-navy-700 group-hover:text-navy-900 transition-colors text-left">
                  {enSectionLabel}
                </h2>
                <p className="text-sm text-navy-400 mt-0.5 text-left">
                  {lang === 'fr'
                    ? 'Ces articles sont disponibles uniquement en anglais pour l\'instant.'
                    : 'Diese Artikel sind derzeit nur auf Englisch verfügbar.'}
                </p>
              </div>
              <span className={`text-green-500 text-2xl transition-transform duration-200 ${showEN ? 'rotate-45' : ''}`}>
                +
              </span>
            </button>

            {showEN && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSecondary.map((post) => (
                  <BlogCard key={post.slug} post={post} lang={lang} dict={dict} />
                ))}
              </div>
            )}
          </div>
        )}
      </section>
    </>
  );
}
