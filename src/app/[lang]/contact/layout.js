import { SITE_URL } from '@/lib/seo';

const STATIC_LANGS = ['en', 'fr', 'de'];
export function generateStaticParams() {
  return STATIC_LANGS.map((lang) => ({ lang }));
}

export function generateMetadata({ params }) {
  const lang = params.lang;
  const canonical = `${SITE_URL}/${lang}/contact`;
  const titles = { en: 'Contact Us', fr: 'Nous Contacter', de: 'Kontakt' };
  const descs = {
    en: 'Get in touch with the Vie Claire team. Questions, feedback, tool suggestions, or corrections — we read every message.',
    fr: "Contactez l'équipe Vie Claire. Questions, retours, suggestions d'outils — nous lisons chaque message.",
    de: 'Nehmen Sie Kontakt mit dem Vie Claire Team auf. Fragen, Feedback, Tool-Vorschläge — wir lesen jede Nachricht.',
  };
  return {
    title: titles[lang] || titles.en,
    description: descs[lang] || descs.en,
    alternates: { canonical, languages: { en: `${SITE_URL}/en/contact`, fr: `${SITE_URL}/fr/contact`, de: `${SITE_URL}/de/contact` } },
  };
}

export default function ContactLayout({ children }) {
  return children;
}
