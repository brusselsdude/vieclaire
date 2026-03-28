import { SITE_URL } from '@/lib/seo';
import Breadcrumb from '@/components/Breadcrumb';
import { BreadcrumbSchema } from '@/components/SchemaOrg';

const STATIC_LANGS = ['en', 'fr', 'de'];
export function generateStaticParams() {
  return STATIC_LANGS.map((lang) => ({ lang }));
}

export function generateMetadata({ params }) {
  const { lang } = params;
  const titles = { en: 'Privacy Policy', fr: 'Politique de Confidentialité', de: 'Datenschutzerklärung' };
  const canonical = `${SITE_URL}/${lang}/privacy`;
  return {
    title: titles[lang] || titles.en,
    description: 'How Vie Claire collects, uses, and protects your personal data.',
    alternates: { canonical, languages: { en: `${SITE_URL}/en/privacy`, fr: `${SITE_URL}/fr/privacy`, de: `${SITE_URL}/de/privacy` } },
    robots: { index: true, follow: true },
  };
}

const copy = {
  en: {
    title: 'Privacy Policy', lastUpdated: 'Last updated',
    sections: [
      { title: '1. Who We Are', body: 'Vie Claire ("we", "us", "our") operates the website vieclaire.com, a personal finance education platform. This Privacy Policy explains how we collect, use, and protect information about visitors to our site.' },
      { title: '2. Information We Collect', body: 'We collect minimal information: (a) Information you voluntarily provide when using our contact form, including your name, email address, and message content. This is processed via Formspree (formspree.io). (b) Anonymous analytics data via Google Analytics (GA4), which collects data such as pages visited, time on site, device type, and approximate location. This data is aggregated and cannot identify you personally. (c) We do not use advertising cookies, tracking pixels, or sell your data.' },
      { title: '3. How We Use Your Information', body: 'Contact form submissions are used solely to respond to your inquiry. Analytics data is used to understand how visitors use the site and improve our content. We never use your data for advertising targeting, and we do not share it with third parties for marketing purposes.' },
      { title: '4. Cookies', body: 'We use the following cookies: Google Analytics cookies (_ga, _gid, _gat) — these are analytics cookies that help us understand site usage. They expire after 2 years (_ga) or 24 hours (_gid). You can opt out of Google Analytics by installing the Google Analytics Opt-Out Browser Add-on. We do not use advertising or tracking cookies.' },
      { title: '5. Third-Party Services', body: 'Formspree (formspree.io): processes contact form submissions. See their privacy policy at formspree.io/legal/privacy-policy. Google Analytics: collects anonymous usage statistics. See Google\'s privacy policy at policies.google.com/privacy. Mermaid.js CDN (jsDelivr): loads diagram rendering library. No personal data is collected.' },
      { title: '6. Data Retention', body: 'Contact form submissions are retained for as long as necessary to respond to your inquiry, typically no longer than 12 months. Analytics data is retained for 14 months as per Google Analytics default settings. We do not retain any other personal data.' },
      { title: '7. Your Rights', body: 'Under GDPR (if you are in the EU/EEA), you have the right to: access your personal data, request correction or deletion, object to processing, and lodge a complaint with your supervisory authority. To exercise any of these rights, contact us via the contact page.' },
      { title: '8. Children\'s Privacy', body: 'Our website is not directed at children under 16. We do not knowingly collect personal data from children. If you believe we have inadvertently collected data from a child, please contact us immediately.' },
      { title: '9. Changes to This Policy', body: 'We may update this Privacy Policy from time to time. The date at the top of this page indicates when it was last revised. Continued use of the site after any changes constitutes acceptance of the updated policy.' },
      { title: '10. Contact', body: 'For any privacy-related questions or requests, please use our contact form at vieclaire.com/en/contact.' },
    ],
  },
  fr: {
    title: 'Politique de Confidentialité', lastUpdated: 'Dernière mise à jour',
    sections: [
      { title: '1. Qui Sommes-Nous', body: 'Vie Claire exploite le site vieclaire.com, une plateforme d\'éducation à la finance personnelle. Cette politique explique comment nous collectons, utilisons et protégeons vos informations.' },
      { title: '2. Informations Collectées', body: 'Nous collectons uniquement : (a) Les informations que vous fournissez via le formulaire de contact (nom, email, message), traitées par Formspree. (b) Des données analytiques anonymes via Google Analytics (GA4) : pages visitées, durée de visite, type d\'appareil, localisation approximative. Ces données sont agrégées et ne permettent pas de vous identifier. (c) Nous n\'utilisons pas de cookies publicitaires et ne vendons pas vos données.' },
      { title: '3. Utilisation des Données', body: 'Les soumissions du formulaire de contact sont utilisées uniquement pour répondre à votre demande. Les données analytiques servent à améliorer le contenu du site. Vos données ne sont jamais utilisées à des fins publicitaires.' },
      { title: '4. Cookies', body: 'Nous utilisons uniquement des cookies Google Analytics (_ga, _gid, _gat) pour mesurer l\'audience. Vous pouvez vous opposer à Google Analytics en installant le module complémentaire de désactivation. Aucun cookie publicitaire n\'est utilisé.' },
      { title: '5. Vos Droits (RGPD)', body: 'Conformément au RGPD, vous disposez des droits d\'accès, de rectification, d\'effacement, d\'opposition et de portabilité de vos données. Pour exercer ces droits, contactez-nous via la page contact.' },
      { title: '6. Contact', body: 'Pour toute question relative à la confidentialité, utilisez notre formulaire de contact sur vieclaire.com/fr/contact.' },
    ],
  },
  de: {
    title: 'Datenschutzerklärung', lastUpdated: 'Zuletzt aktualisiert',
    sections: [
      { title: '1. Verantwortlicher', body: 'Vie Claire betreibt die Website vieclaire.com, eine Plattform für persönliche Finanzbildung. Diese Datenschutzerklärung erläutert, wie wir Informationen über Besucher unserer Website erheben, verwenden und schützen.' },
      { title: '2. Erhobene Daten', body: 'Wir erheben nur: (a) Informationen, die Sie freiwillig über das Kontaktformular bereitstellen (Name, E-Mail, Nachricht), verarbeitet über Formspree. (b) Anonyme Analysedaten über Google Analytics (GA4): besuchte Seiten, Verweildauer, Gerätetyp, ungefährer Standort. Diese Daten sind aggregiert und erlauben keine Identifizierung. (c) Wir verwenden keine Werbe-Cookies und verkaufen keine Daten.' },
      { title: '3. Ihre Rechte (DSGVO)', body: 'Gemäß DSGVO haben Sie das Recht auf Auskunft, Berichtigung, Löschung, Widerspruch und Datenportabilität. Zur Ausübung dieser Rechte nutzen Sie bitte unser Kontaktformular.' },
      { title: '4. Kontakt', body: 'Für datenschutzbezogene Fragen nutzen Sie bitte unser Kontaktformular auf vieclaire.com/de/contact.' },
    ],
  },
};

export default function PrivacyPage({ params }) {
  const { lang } = params;
  const c = copy[lang] || copy.en;
  const canonical = `${SITE_URL}/${lang}/privacy`;
  const breadcrumbs = [{ label: 'Vie Claire', href: `/${lang}` }, { label: c.title }];

  return (
    <>
      <BreadcrumbSchema crumbs={[
        { name: 'Vie Claire', url: `${SITE_URL}/${lang}` },
        { name: c.title, url: `${SITE_URL}/${lang}/privacy` },
      ]} />
            <section className="bg-gradient-to-br from-navy-950 to-navy-900 pt-32 pb-16">
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <div className="text-5xl mb-6">🔒</div>
          <h1 className="font-display text-3xl md:text-4xl text-white mb-4">{c.title}</h1>
          <p className="text-white/40 text-sm">{c.lastUpdated}: {new Date().toLocaleDateString(lang === 'fr' ? 'fr-FR' : lang === 'de' ? 'de-DE' : 'en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
      </section>
      <div className="max-w-3xl mx-auto px-6 py-12">
        <Breadcrumb crumbs={breadcrumbs} />
        <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-5 mb-10">
          <p className="text-amber-800 text-sm font-medium">
            {lang === 'fr' ? '🌍 Ce site respecte votre vie privée. Nous ne vendons pas vos données et n\'utilisons pas de cookies publicitaires.' : lang === 'de' ? '🌍 Diese Website respektiert Ihre Privatsphäre. Wir verkaufen keine Daten und verwenden keine Werbe-Cookies.' : '🌍 This site respects your privacy. We do not sell your data or use advertising cookies.'}
          </p>
        </div>
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
