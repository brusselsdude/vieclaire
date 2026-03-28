import { SITE_URL } from '@/lib/seo';
import Breadcrumb from '@/components/Breadcrumb';
import { BreadcrumbSchema } from '@/components/SchemaOrg';

const STATIC_LANGS = ['en', 'fr', 'de'];
export function generateStaticParams() {
  return STATIC_LANGS.map((lang) => ({ lang }));
}

export function generateMetadata({ params }) {
  const { lang } = params;
  const titles = { en: 'Terms of Use', fr: "Conditions d'Utilisation", de: 'Nutzungsbedingungen' };
  const canonical = `${SITE_URL}/${lang}/terms`;
  return {
    title: titles[lang] || titles.en,
    description: 'Terms of use for Vie Claire — the rules and conditions for using our personal finance education website.',
    alternates: { canonical, languages: { en: `${SITE_URL}/en/terms`, fr: `${SITE_URL}/fr/terms`, de: `${SITE_URL}/de/terms` } },
    robots: { index: true, follow: true },
  };
}

const copy = {
  en: {
    title: 'Terms of Use', lastUpdated: 'Last updated',
    intro: 'By accessing and using vieclaire.com, you agree to be bound by these Terms of Use. If you do not agree, please do not use this website.',
    sections: [
      { title: '1. Acceptance of Terms', body: 'These Terms of Use govern your access to and use of Vie Claire (vieclaire.com). By using the site, you agree to these terms in full. We reserve the right to modify these terms at any time.' },
      { title: '2. Educational Purpose Only', body: 'All content on Vie Claire is provided for informational and educational purposes only. Nothing on this site constitutes financial, tax, legal, or investment advice. Always consult a qualified professional before making financial decisions. Past performance is not indicative of future results.' },
      { title: '3. Accuracy of Information', body: 'We make reasonable efforts to ensure accuracy but cannot guarantee that all information is current or complete. Financial laws, tax regulations, and market conditions change frequently. Use information on this site as a starting point for your own research, not as a definitive guide.' },
      { title: '4. Calculator Tools', body: 'The financial calculators and tools on this site provide estimates only. They use simplified models and do not account for your individual circumstances, tax situation, or risk profile. Results should not be relied upon for financial decision-making without professional advice.' },
      { title: '5. Intellectual Property', body: 'All content on vieclaire.com — including text, tools, design, and code — is the property of Vie Claire and protected by copyright law. You may share short excerpts for personal or educational use with proper attribution and a link. Commercial reproduction requires written permission.' },
      { title: '6. User Conduct', body: 'You agree not to: scrape or automatically extract content, attempt to interfere with site functionality, use the site for any illegal purpose, or misrepresent content from this site as your own.' },
      { title: '7. Third-Party Links', body: 'This site may contain links to third-party websites. We are not responsible for the content, accuracy, or practices of external sites. Links do not constitute endorsement.' },
      { title: '8. Limitation of Liability', body: 'Vie Claire and its operators shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of this site or reliance on its content, including any financial losses or investment decisions.' },
      { title: '9. Governing Law', body: 'These terms are governed by the laws of Belgium. Any disputes shall be subject to the exclusive jurisdiction of the courts of Brussels.' },
      { title: '10. Contact', body: 'Questions about these terms? Use our contact form at vieclaire.com/en/contact.' },
    ],
  },
  fr: {
    title: "Conditions d'Utilisation", lastUpdated: 'Dernière mise à jour',
    intro: "En accédant à vieclaire.com, vous acceptez d'être lié par ces conditions d'utilisation.",
    sections: [
      { title: '1. Acceptation des Conditions', body: "Ces conditions régissent votre utilisation de Vie Claire (vieclaire.com). En utilisant le site, vous acceptez l'intégralité de ces conditions." },
      { title: '2. Caractère Éducatif', body: "Tout le contenu de Vie Claire est fourni à titre informatif et éducatif uniquement. Rien ne constitue un conseil financier, fiscal, juridique ou en investissement. Consultez toujours un professionnel qualifié avant toute décision financière." },
      { title: '3. Propriété Intellectuelle', body: "Tout le contenu de vieclaire.com est la propriété de Vie Claire et protégé par le droit d'auteur. Vous pouvez partager de courts extraits à des fins personnelles ou éducatives avec attribution appropriée." },
      { title: '4. Limitation de Responsabilité', body: "Vie Claire ne saurait être tenu responsable de tout dommage résultant de votre utilisation du site ou de toute décision financière basée sur son contenu." },
      { title: '5. Contact', body: "Questions ? Utilisez notre formulaire de contact sur vieclaire.com/fr/contact." },
    ],
  },
  de: {
    title: 'Nutzungsbedingungen', lastUpdated: 'Zuletzt aktualisiert',
    intro: 'Durch den Zugriff auf vieclaire.com stimmen Sie diesen Nutzungsbedingungen zu.',
    sections: [
      { title: '1. Annahme der Bedingungen', body: 'Diese Nutzungsbedingungen regeln Ihren Zugang zu und die Nutzung von Vie Claire (vieclaire.com). Durch die Nutzung der Website akzeptieren Sie diese Bedingungen vollständig.' },
      { title: '2. Bildungszweck', body: 'Alle Inhalte auf Vie Claire dienen ausschließlich zu Informations- und Bildungszwecken. Nichts auf dieser Website stellt eine Finanz-, Steuer- oder Rechtsberatung dar. Konsultieren Sie immer einen qualifizierten Fachmann.' },
      { title: '3. Haftungsbeschränkung', body: 'Vie Claire haftet nicht für Schäden, die aus der Nutzung der Website oder aus Finanzentscheidungen entstehen, die auf deren Inhalten basieren.' },
      { title: '4. Kontakt', body: 'Fragen? Nutzen Sie unser Kontaktformular auf vieclaire.com/de/contact.' },
    ],
  },
};

export default function TermsPage({ params }) {
  const { lang } = params;
  const c = copy[lang] || copy.en;
  const breadcrumbs = [{ label: 'Vie Claire', href: `/${lang}` }, { label: c.title }];

  return (
    <>
      <BreadcrumbSchema crumbs={[
        { name: 'Vie Claire', url: `${SITE_URL}/${lang}` },
        { name: c.title, url: `${SITE_URL}/${lang}/terms` },
      ]} />
            <section className="bg-gradient-to-br from-navy-950 to-navy-900 pt-32 pb-16">
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <div className="text-5xl mb-6">📋</div>
          <h1 className="font-display text-3xl md:text-4xl text-white mb-4">{c.title}</h1>
          <p className="text-white/40 text-sm">{c.lastUpdated}: {new Date().toLocaleDateString(lang === 'fr' ? 'fr-FR' : lang === 'de' ? 'de-DE' : 'en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
      </section>
      <div className="max-w-3xl mx-auto px-6 py-12">
        <Breadcrumb crumbs={breadcrumbs} />
        <p className="text-navy-600 mb-8 p-4 bg-navy-50 rounded-xl border border-navy-100 text-sm leading-relaxed">{c.intro}</p>
        <div className="space-y-6">
          {c.sections.map((s, i) => (
            <div key={i} className="bg-white rounded-2xl border border-navy-100 p-6">
              <h2 className="font-display text-lg text-navy-900 mb-3">{s.title}</h2>
              <p className="text-navy-600 text-sm leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
