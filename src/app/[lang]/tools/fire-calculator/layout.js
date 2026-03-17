import { SITE_URL } from '@/lib/seo';

const STATIC_LANGS = ['en', 'fr', 'de'];
export function generateStaticParams() {
  return STATIC_LANGS.map((lang) => ({ lang }));
}

export function generateMetadata({ params }) {
  const lang = params.lang;
  const canonical = `${SITE_URL}/${lang}/tools/fire-calculator`;
  const t = {
    en: { title: 'FIRE Calculator — How Many Years Until Financial Independence?', desc: 'Free FIRE calculator. Find your Financial Independence number and how many years to reach it based on your savings rate, current savings, and expected returns.' },
    fr: { title: 'Calculateur FIRE — Combien d\'Années jusqu\'à l\'Indépendance Financière ?', desc: 'Calculateur FIRE gratuit. Trouvez votre nombre FIRE et combien d\'années pour l\'atteindre selon votre taux d\'épargne et rendement attendu.' },
    de: { title: 'FIRE-Rechner — Wie viele Jahre bis zur finanziellen Freiheit?', desc: 'Kostenloser FIRE-Rechner. Finden Sie Ihre FIRE-Zahl und wie viele Jahre bis zur finanziellen Unabhängigkeit basierend auf Ihrer Sparquote.' },
  };
  const meta = t[lang] || t.en;
  return { title: meta.title, description: meta.desc, alternates: { canonical, languages: { en: `${SITE_URL}/en/tools/fire-calculator`, fr: `${SITE_URL}/fr/tools/fire-calculator`, de: `${SITE_URL}/de/tools/fire-calculator` } }, openGraph: { title: meta.title, description: meta.desc, url: canonical } };
}
export default function Layout({ children }) { return children; }
