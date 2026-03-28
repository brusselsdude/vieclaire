import Link from 'next/link';
import { SITE_URL, CLUSTERS } from '@/lib/seo';
import { getPostsIndex } from '@/data/postsIndex';
import Breadcrumb from '@/components/Breadcrumb';

const STATIC_LANGS = ['en', 'fr', 'de'];
export function generateStaticParams() {
  return STATIC_LANGS.map((lang) => ({ lang }));
}

export function generateMetadata({ params }) {
  const { lang } = params;
  const titles = { en: 'HTML Sitemap', fr: 'Plan du Site', de: 'Seitenübersicht' };
  return {
    title: titles[lang] || titles.en,
    description: 'Complete list of all pages, articles, and tools on Vie Claire.',
    alternates: { canonical: `${SITE_URL}/${lang}/sitemap` },
    robots: { index: true, follow: true },
  };
}

const TOOLS = ['gross-to-net','compound-interest','fire-calculator','savings-rate'];
const TOOL_LABELS = {
  'gross-to-net': { en:'Gross to Net Calculator', fr:'Calculateur Brut → Net', de:'Brutto-Netto-Rechner' },
  'compound-interest': { en:'Compound Interest Calculator', fr:'Intérêts Composés', de:'Zinseszins-Rechner' },
  'fire-calculator': { en:'FIRE Calculator', fr:'Calculateur FIRE', de:'FIRE-Rechner' },
  'savings-rate': { en:'Savings Rate Calculator', fr:"Taux d'Épargne", de:'Sparquoten-Rechner' },
};

export default function SitemapPage({ params }) {
  const { lang } = params;
  const allPosts = getPostsIndex();
  const langPosts = allPosts.filter((p) => p.lang === lang);
  const enPosts = lang !== 'en' ? allPosts.filter((p) => p.lang === 'en') : [];

  const byCategory = {};
  langPosts.forEach((p) => {
    if (!byCategory[p.category]) byCategory[p.category] = [];
    byCategory[p.category].push(p);
  });

  const catOrder = ['FIRE','Investing','Budgeting','Markets','Mindset'];
  const titles = { en: 'HTML Sitemap', fr: 'Plan du Site', de: 'Seitenübersicht' };
  const breadcrumbs = [{ label: 'Vie Claire', href: `/${lang}` }, { label: titles[lang] || titles.en }];

  return (
    <div className="min-h-screen bg-warm-50">
      <section className="bg-gradient-to-br from-navy-950 to-navy-900 pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="text-5xl mb-6">🗺️</div>
          <h1 className="font-display text-3xl md:text-4xl text-white mb-3">{titles[lang] || titles.en}</h1>
          <p className="text-white/50">{allPosts.length} articles · {TOOLS.length} tools · {Object.values(CLUSTERS).length} guides</p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <Breadcrumb crumbs={breadcrumbs} />

        <div className="grid md:grid-cols-2 gap-8">
          {/* Main pages */}
          <section className="bg-white rounded-2xl border border-navy-100 p-6">
            <h2 className="font-display text-lg text-navy-900 mb-4">📄 {lang === 'fr' ? 'Pages Principales' : lang === 'de' ? 'Hauptseiten' : 'Main Pages'}</h2>
            <ul className="space-y-2">
              {[
                { href: `/${lang}`, label: lang === 'fr' ? 'Accueil' : lang === 'de' ? 'Startseite' : 'Home' },
                { href: `/${lang}/blog`, label: lang === 'fr' ? 'Blog' : 'Blog' },
                { href: `/${lang}/tools`, label: lang === 'fr' ? 'Outils' : lang === 'de' ? 'Tools' : 'Tools' },
                { href: `/${lang}/about`, label: lang === 'fr' ? 'À Propos' : lang === 'de' ? 'Über Uns' : 'About' },
                { href: `/${lang}/contact`, label: 'Contact' },
                { href: `/${lang}/legal`, label: lang === 'fr' ? 'Mentions Légales' : lang === 'de' ? 'Impressum' : 'Legal' },
                { href: `/${lang}/privacy`, label: lang === 'fr' ? 'Confidentialité' : lang === 'de' ? 'Datenschutz' : 'Privacy Policy' },
                { href: `/${lang}/terms`, label: lang === 'fr' ? "Conditions d'Utilisation" : lang === 'de' ? 'Nutzungsbedingungen' : 'Terms of Use' },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-navy-600 hover:text-green-600 transition-colors">
                    → {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Tools */}
          <section className="bg-white rounded-2xl border border-navy-100 p-6">
            <h2 className="font-display text-lg text-navy-900 mb-4">🧮 {lang === 'fr' ? 'Outils Financiers' : lang === 'de' ? 'Finanzrechner' : 'Financial Tools'}</h2>
            <ul className="space-y-2">
              {TOOLS.map((tool) => (
                <li key={tool}>
                  <Link href={`/${lang}/tools/${tool}`} className="text-sm text-navy-600 hover:text-green-600 transition-colors">
                    → {TOOL_LABELS[tool][lang] || TOOL_LABELS[tool].en}
                  </Link>
                </li>
              ))}
            </ul>

            <h2 className="font-display text-lg text-navy-900 mt-6 mb-4">📚 {lang === 'fr' ? 'Guides Thématiques' : lang === 'de' ? 'Themen-Guides' : 'Topic Guides'}</h2>
            <ul className="space-y-2">
              {Object.values(CLUSTERS).map((c) => (
                <li key={c.pillar}>
                  <Link href={`/${lang}/learn/${c.pillar}`} className="text-sm text-navy-600 hover:text-green-600 transition-colors">
                    {c.emoji} {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Articles by category */}
        <div className="mt-10 space-y-8">
          {catOrder.map((cat) => {
            const catPosts = byCategory[cat] || [];
            if (catPosts.length === 0) return null;
            return (
              <section key={cat} className="bg-white rounded-2xl border border-navy-100 p-6">
                <h2 className="font-display text-lg text-navy-900 mb-4">
                  {catPosts[0]?.emoji} {cat} ({catPosts.length})
                </h2>
                <ul className="grid sm:grid-cols-2 gap-1.5">
                  {catPosts.sort((a,b) => new Date(b.date) - new Date(a.date)).map((p) => (
                    <li key={p.slug}>
                      <Link href={`/${lang}/blog/${p.slug}`} className="text-sm text-navy-600 hover:text-green-600 transition-colors block truncate">
                        → {p.seoTitle || p.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}

          {/* EN articles for FR/DE */}
          {lang !== 'en' && enPosts.length > 0 && (
            <section className="bg-white rounded-2xl border border-navy-100 p-6">
              <h2 className="font-display text-lg text-navy-900 mb-4">
                🇬🇧 {lang === 'fr' ? `Articles en Anglais (${enPosts.length})` : `Artikel auf Englisch (${enPosts.length})`}
              </h2>
              <ul className="grid sm:grid-cols-2 gap-1.5">
                {enPosts.slice(0, 30).map((p) => (
                  <li key={p.slug}>
                    <Link href={`/en/blog/${p.slug}`} className="text-sm text-navy-600 hover:text-green-600 transition-colors block truncate">
                      → {p.seoTitle || p.title}
                    </Link>
                  </li>
                ))}
              </ul>
              {enPosts.length > 30 && (
                <Link href="/en/blog" className="text-sm text-green-600 hover:text-green-700 mt-3 block">
                  {lang === 'fr' ? `Voir les ${enPosts.length - 30} autres articles →` : `Weitere ${enPosts.length - 30} Artikel →`}
                </Link>
              )}
            </section>
          )}
        </div>

        {/* RSS feeds */}
        <div className="mt-8 bg-green-50 border border-green-200 rounded-2xl p-5">
          <h2 className="font-display text-lg text-green-800 mb-3">📡 RSS Feeds</h2>
          <ul className="space-y-1.5">
            {[
              { url: '/feed.xml', label: 'Main Feed (EN)' },
              { url: '/feed-en.xml', label: 'English Articles' },
              { url: '/feed-fr.xml', label: 'Articles en Français' },
              { url: '/feed-de.xml', label: 'Deutsche Artikel' },
            ].map((f) => (
              <li key={f.url}>
                <a href={f.url} className="text-sm text-green-700 hover:text-green-900 transition-colors">
                  📡 {f.label} — {SITE_URL}{f.url}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
