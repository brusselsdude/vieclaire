import { getDictionary } from '@/i18n';
import { SITE_URL } from '@/lib/seo';
import Link from 'next/link';
import { BreadcrumbSchema, WebSiteSchema } from '@/components/SchemaOrg';
import Breadcrumb from '@/components/Breadcrumb';

const STATIC_LANGS = ['en', 'fr', 'de'];
export function generateStaticParams() {
  return STATIC_LANGS.map((lang) => ({ lang }));
}


export function generateMetadata({ params }) {
  const dict = getDictionary(params.lang);
  const a = dict.about;
  const canonical = `${SITE_URL}/${params.lang}/about`;
  return {
    title: a.title,
    description: a.subtitle + ' — Personal finance education in English, French, and German.',
    alternates: {
      canonical,
      languages: { en: `${SITE_URL}/en/about`, fr: `${SITE_URL}/fr/about`, de: `${SITE_URL}/de/about` },
    },
    openGraph: { title: a.title, description: a.subtitle, url: canonical, type: 'website' },
  };
}

export default function AboutPage({ params }) {
  const dict = getDictionary(params.lang);
  const a = dict.about;
  const paragraphs = a.body.split('\n\n').filter(Boolean);
  const canonical = `${SITE_URL}/${params.lang}/about`;
  const breadcrumbs = [
    { label: 'Vie Claire', href: `/${params.lang}` },
    { label: a.title },
  ];

  return (
    <>
      <BreadcrumbSchema crumbs={breadcrumbs.map((c) => ({ name: c.label, url: c.href ? `${SITE_URL}${c.href}` : canonical }))} />

      <section className="relative bg-gradient-to-br from-navy-950 via-navy-900 to-green-950 pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 right-20 w-80 h-80 bg-green-400 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-64 h-64 bg-green-600 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <div className="text-6xl mb-6">💡</div>
          <h1 className="font-display text-4xl md:text-5xl text-white mb-4">{a.title}</h1>
          <p className="text-green-400 text-lg italic">{a.subtitle}</p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16">
        <Breadcrumb crumbs={breadcrumbs} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {a.values.map((v) => (
            <div key={v.title} className="bg-white rounded-2xl p-6 border border-navy-100 shadow-sm hover:shadow-md hover:border-green-200 transition-all">
              <div className="text-4xl mb-4">{v.emoji}</div>
              <h3 className="font-display text-lg text-navy-900 mb-2">{v.title}</h3>
              <p className="text-sm text-navy-500 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl border border-navy-100 shadow-sm p-8 md:p-12">
            <h2 className="font-display text-3xl text-navy-900 mb-8">
              {params.lang === 'fr' ? 'Notre Histoire' : params.lang === 'de' ? 'Unsere Geschichte' : 'Our Story'}
            </h2>
            <div className="space-y-5">
              {paragraphs.map((p, i) => <p key={i} className="text-navy-600 leading-relaxed">{p}</p>)}
            </div>
          </div>
        </div>
      </section>

      {/* Topic clusters section */}
      <section className="bg-warm-50 border-t border-navy-100 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-display text-3xl text-navy-900 mb-3 text-center">
            {params.lang === 'fr' ? 'Nos Guides Thématiques' : params.lang === 'de' ? 'Unsere Themen-Guides' : 'Our Topic Guides'}
          </h2>
          <p className="text-navy-500 text-center mb-10">
            {params.lang === 'fr' ? 'De zéro à expert, un sujet à la fois.' : params.lang === 'de' ? 'Von null zum Experten, ein Thema auf einmal.' : 'From zero to confident, one topic at a time.'}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { href: `/${params.lang}/learn/financial-independence`, emoji: '🔥', label: 'FIRE & Financial Independence', desc: '6 articles + 3 tools' },
              { href: `/${params.lang}/learn/investing-basics`, emoji: '📈', label: 'Investing for Beginners', desc: '11 articles + 2 tools' },
              { href: `/${params.lang}/learn/budgeting-guide`, emoji: '💡', label: 'Budgeting & Saving', desc: '9 articles + 2 tools' },
              { href: `/${params.lang}/learn/stock-market-guide`, emoji: '📊', label: 'Markets & History', desc: '13 articles + 1 tool' },
              { href: `/${params.lang}/learn/opportunity-cost-guide`, emoji: '🧠', label: 'Financial Mindset', desc: '11 articles + 2 tools' },
              { href: `/${params.lang}/tools`, emoji: '🧮', label: 'Free Financial Tools', desc: '4 interactive calculators' },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="bg-white rounded-2xl p-5 border border-navy-100 hover:border-green-300 hover:shadow-md transition-all group">
                <div className="text-3xl mb-3">{item.emoji}</div>
                <h3 className="font-display text-base text-navy-900 group-hover:text-green-700 transition-colors">{item.label}</h3>
                <p className="text-xs text-navy-400 mt-1">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy-950 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-display text-3xl text-white mb-4">
            {params.lang === 'fr' ? 'Disponible en 3 Langues' : params.lang === 'de' ? 'In 3 Sprachen verfügbar' : 'Available in 3 Languages'}
          </h2>
          <p className="text-white/50 mb-10">
            {params.lang === 'fr' ? "Parce que l'argent parle toutes les langues — et les mauvaises décisions financières aussi." : params.lang === 'de' ? 'Weil Geld jede Sprache spricht — und schlechte Finanzentscheidungen leider auch.' : "Because money speaks every language — and so do bad financial decisions."}
          </p>
          <div className="grid sm:grid-cols-3 gap-6">
            {[{ lang: 'en', flag: '🇬🇧', name: 'English', tagline: 'No-nonsense finance wisdom' }, { lang: 'fr', flag: '🇫🇷', name: 'Français', tagline: 'La finance, sans se prendre la tête' }, { lang: 'de', flag: '🇩🇪', name: 'Deutsch', tagline: 'Finanzen ohne Kopfschmerzen' }].map((l) => (
              <Link key={l.lang} href={`/${l.lang}`} className="bg-white/5 border border-white/10 hover:border-green-500/40 rounded-2xl p-6 transition-all hover:bg-white/10 group">
                <div className="text-4xl mb-3">{l.flag}</div>
                <h3 className="font-display text-xl text-white group-hover:text-green-400 transition-colors">{l.name}</h3>
                <p className="text-white/40 text-sm mt-1">{l.tagline}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-2xl mx-auto px-6 py-20 text-center">
        <h2 className="font-display text-3xl text-navy-900 mb-4">
          {params.lang === 'fr' ? 'Prêt à Maîtriser votre Argent ?' : params.lang === 'de' ? 'Bereit, dein Geld zu meistern?' : 'Ready to Master Your Money?'}
        </h2>
        <p className="text-navy-500 mb-8">
          {params.lang === 'fr' ? "Commencez avec nos outils gratuits ou plongez dans nos articles." : params.lang === 'de' ? 'Starte mit unseren kostenlosen Tools oder tauche in unsere Artikel ein.' : 'Start with our free tools or dive into the articles.'}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href={`/${params.lang}/tools`} className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-lg shadow-green-500/20 hover:-translate-y-0.5">
            🧮 {params.lang === 'fr' ? 'Outils Gratuits' : params.lang === 'de' ? 'Kostenlose Tools' : 'Free Tools'}
          </Link>
          <Link href={`/${params.lang}/blog`} className="inline-flex items-center gap-2 bg-white border border-navy-200 hover:border-green-300 text-navy-800 font-semibold px-6 py-3 rounded-xl transition-all hover:-translate-y-0.5">
            📰 {params.lang === 'fr' ? 'Lire le Blog' : params.lang === 'de' ? 'Blog lesen' : 'Read the Blog'}
          </Link>
        </div>
      </section>
    </>
  );
}
