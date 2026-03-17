import { SITE_URL } from '@/lib/seo';

const STATIC_LANGS = ['en', 'fr', 'de'];
export function generateStaticParams() {
  return STATIC_LANGS.map((lang) => ({ lang }));
}

export function generateMetadata({ params }) {
  const lang = params.lang;
  const canonical = `${SITE_URL}/${lang}/tools/savings-rate`;
  const t = {
    en: { title: 'Savings Rate Calculator — The One Number That Predicts Financial Freedom', desc: 'Free savings rate calculator. Enter your income and expenses to see your savings rate, monthly savings, and exactly how many years to financial independence.' },
    fr: { title: 'Calculateur Taux d\'Épargne — Le Chiffre qui Prédit votre Liberté Financière', desc: 'Calculateur de taux d\'épargne gratuit. Entrez vos revenus et dépenses pour voir votre taux d\'épargne et le nombre d\'années jusqu\'à l\'indépendance financière.' },
    de: { title: 'Sparquoten-Rechner — Die Zahl, die finanzielle Freiheit vorhersagt', desc: 'Kostenloser Sparquoten-Rechner. Geben Sie Einkommen und Ausgaben ein, um Ihre Sparquote und Jahre bis zur finanziellen Unabhängigkeit zu sehen.' },
  };
  const meta = t[lang] || t.en;
  return { title: meta.title, description: meta.desc, alternates: { canonical, languages: { en: `${SITE_URL}/en/tools/savings-rate`, fr: `${SITE_URL}/fr/tools/savings-rate`, de: `${SITE_URL}/de/tools/savings-rate` } }, openGraph: { title: meta.title, description: meta.desc, url: canonical } };
}
export default function Layout({ children }) { return children; }
