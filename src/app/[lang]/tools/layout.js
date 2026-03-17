import { SITE_URL } from '@/lib/seo';

const STATIC_LANGS = ['en', 'fr', 'de'];
export function generateStaticParams() {
  return STATIC_LANGS.map((lang) => ({ lang }));
}


export function generateMetadata({ params }) {
  const { lang } = params;
  const canonical = `${SITE_URL}/${lang}/tools`;
  const titles = { en: 'Free Financial Calculators — Gross to Net, FIRE, Compound Interest', fr: 'Calculateurs Financiers Gratuits — Brut Net, FIRE, Intérêts Composés', de: 'Kostenlose Finanzrechner — Brutto-Netto, FIRE, Zinseszins' };
  const descs = {
    en: 'Free online financial calculators: gross to net salary (5 countries), compound interest, FIRE number, and savings rate. No signup required.',
    fr: 'Calculateurs financiers gratuits : salaire brut en net (5 pays), intérêts composés, nombre FIRE, et taux d\'épargne. Sans inscription.',
    de: 'Kostenlose Online-Finanzrechner: Brutto-Netto-Gehalt (5 Länder), Zinseszins, FIRE-Zahl und Sparquote. Ohne Anmeldung.',
  };
  return {
    title: titles[lang] || titles.en,
    description: descs[lang] || descs.en,
    alternates: { canonical, languages: { en: `${SITE_URL}/en/tools`, fr: `${SITE_URL}/fr/tools`, de: `${SITE_URL}/de/tools` } },
    openGraph: { title: titles[lang], description: descs[lang], url: canonical, type: 'website' },
  };
}

export default function ToolsLayout({ children }) { return children; }
