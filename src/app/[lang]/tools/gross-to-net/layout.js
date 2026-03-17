import { SITE_URL } from '@/lib/seo';

const STATIC_LANGS = ['en', 'fr', 'de'];
export function generateStaticParams() {
  return STATIC_LANGS.map((lang) => ({ lang }));
}

export function generateMetadata({ params }) {
  const lang = params.lang;
  const canonical = `${SITE_URL}/${lang}/tools/gross-to-net`;
  const t = {
    en: { title: 'Gross to Net Salary Calculator — France, Belgium, Germany, Switzerland, UK', desc: 'Calculate your net take-home salary from gross in 5 European countries. Includes income tax, social contributions, and marital status. Free, no signup.' },
    fr: { title: 'Calculateur Salaire Brut en Net — France, Belgique, Allemagne, Suisse, UK', desc: 'Calculez votre salaire net à partir du brut dans 5 pays européens. Inclut impôt sur le revenu, cotisations sociales, situation familiale. Gratuit.' },
    de: { title: 'Brutto-Netto-Rechner — Deutschland, Frankreich, Belgien, Schweiz, UK', desc: 'Berechne dein Nettogehalt aus dem Brutto in 5 europäischen Ländern. Mit Einkommensteuer, Sozialabgaben und Familienstand. Kostenlos.' },
  };
  const meta = t[lang] || t.en;
  return { title: meta.title, description: meta.desc, alternates: { canonical, languages: { en: `${SITE_URL}/en/tools/gross-to-net`, fr: `${SITE_URL}/fr/tools/gross-to-net`, de: `${SITE_URL}/de/tools/gross-to-net` } }, openGraph: { title: meta.title, description: meta.desc, url: canonical } };
}
export default function Layout({ children }) { return children; }
