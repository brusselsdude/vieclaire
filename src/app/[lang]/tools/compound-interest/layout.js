import { SITE_URL } from '@/lib/seo';

const STATIC_LANGS = ['en', 'fr', 'de'];
export function generateStaticParams() {
  return STATIC_LANGS.map((lang) => ({ lang }));
}

export function generateMetadata({ params }) {
  const lang = params.lang;
  const canonical = `${SITE_URL}/${lang}/tools/compound-interest`;
  const t = {
    en: { title: 'Compound Interest Calculator — See Your Money Grow Over Time', desc: 'Free compound interest calculator. Enter your initial amount, monthly contributions, return rate, and years to see exactly how your investments grow. Interactive chart.' },
    fr: { title: 'Calculateur Intérêts Composés — Visualisez la Croissance de votre Épargne', desc: 'Calculateur d\'intérêts composés gratuit. Entrez votre capital initial, apport mensuel, taux de rendement et durée pour voir la croissance de vos investissements.' },
    de: { title: 'Zinseszins-Rechner — Sehen Sie Ihr Geld wachsen', desc: 'Kostenloser Zinseszins-Rechner. Geben Sie Anfangsbetrag, monatlichen Beitrag, Rendite und Jahre ein, um das Wachstum Ihrer Investitionen zu sehen.' },
  };
  const meta = t[lang] || t.en;
  return { title: meta.title, description: meta.desc, alternates: { canonical, languages: { en: `${SITE_URL}/en/tools/compound-interest`, fr: `${SITE_URL}/fr/tools/compound-interest`, de: `${SITE_URL}/de/tools/compound-interest` } }, openGraph: { title: meta.title, description: meta.desc, url: canonical } };
}
export default function Layout({ children }) { return children; }
