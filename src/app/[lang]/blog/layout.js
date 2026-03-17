import { getDictionary } from '@/i18n';
import { SITE_URL, CLUSTERS } from '@/lib/seo';

const STATIC_LANGS = ['en', 'fr', 'de'];
export function generateStaticParams() {
  return STATIC_LANGS.map((lang) => ({ lang }));
}


export function generateMetadata({ params }) {
  const { lang } = params;
  const dict = getDictionary(lang);
  const canonical = `${SITE_URL}/${lang}/blog`;

  const titles = { en: 'Personal Finance Blog — Tips, Guides & Insights', fr: 'Blog Finance Personnelle — Conseils & Guides', de: 'Persönliche Finanzen Blog — Tipps & Guides' };
  const descs = {
    en: '57 articles on budgeting, investing, FIRE, stock market history, and opportunity cost. Practical personal finance for real humans.',
    fr: '57 articles sur le budget, l\'investissement, le FIRE, les marchés financiers, et le coût d\'opportunité.',
    de: '57 Artikel über Budgetierung, Investieren, FIRE, Börsengeschichte und Opportunitätskosten.',
  };

  return {
    title: titles[lang] || titles.en,
    description: descs[lang] || descs.en,
    alternates: {
      canonical,
      languages: { en: `${SITE_URL}/en/blog`, fr: `${SITE_URL}/fr/blog`, de: `${SITE_URL}/de/blog` },
    },
    openGraph: { title: titles[lang], description: descs[lang], url: canonical, type: 'website' },
  };
}

export default function BlogLayout({ children }) {
  return children;
}
