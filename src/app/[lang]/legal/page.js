import { getDictionary } from '@/i18n';
import { SITE_URL } from '@/lib/seo';
import { BreadcrumbSchema } from '@/components/SchemaOrg';
import Breadcrumb from '@/components/Breadcrumb';

const STATIC_LANGS = ['en', 'fr', 'de'];
export function generateStaticParams() {
  return STATIC_LANGS.map((lang) => ({ lang }));
}


export function generateMetadata({ params }) {
  const titles = { en: 'Legal Notice & Disclaimer', fr: 'Mentions Légales & Avertissement', de: 'Impressum & Rechtliche Hinweise' };
  const lang = params.lang;
  return {
    title: titles[lang] || titles.en,
    description: 'Legal disclaimer, terms of use, privacy policy, and financial advice notice for Vie Claire.',
    alternates: {
      canonical: `${SITE_URL}/${lang}/legal`,
      languages: { en: `${SITE_URL}/en/legal`, fr: `${SITE_URL}/fr/legal`, de: `${SITE_URL}/de/legal` },
    },
    robots: { index: true, follow: true },
  };
}

const sections = {
  en: [
    {
      title: '⚖️ No Financial Advice',
      content: `All content published on Vie Claire — including articles, blog posts, guides, calculators, and tools — is provided strictly for informational and educational purposes only.

Nothing on this website constitutes, or should be construed as, financial advice, investment advice, tax advice, legal advice, or any other form of professional advice regulated by any financial authority.

The tools and calculators on this site produce estimates based on simplified models and user-provided inputs. They do not account for your personal financial situation, tax status, investment objectives, risk tolerance, or time horizon. Results are approximate and should not be relied upon for financial decision-making.

Before making any investment, savings, or financial planning decisions, you should consult a qualified and regulated financial adviser, tax professional, or legal expert who can assess your individual circumstances.`,
    },
    {
      title: '📊 Past Performance & Forward-Looking Statements',
      content: `Historical financial data, market return figures, and statistical information presented on this site are for illustrative purposes only. Past performance is not indicative of future results.

Any forward-looking statements, projections, or hypothetical scenarios presented on this site are estimates only and carry no guarantee of accuracy. Actual outcomes will differ — sometimes significantly — from any projection or calculator output.`,
    },
    {
      title: '🌐 Accuracy & Availability',
      content: `We make reasonable efforts to ensure the accuracy of the content published on Vie Claire. However, financial regulations, tax laws, market conditions, and economic circumstances change frequently. We cannot guarantee that all information is current, complete, or accurate at the time you read it.

Vie Claire is provided "as is" without warranties of any kind. We reserve the right to modify, update, or remove any content without notice. We accept no liability for any errors, omissions, or inaccuracies in the content.`,
    },
    {
      title: '🔗 Third-Party Links',
      content: `This site may contain links to third-party websites, tools, brokers, or financial services. These links are provided for convenience and informational purposes only. Vie Claire does not endorse, control, or accept responsibility for the content, privacy practices, or services of any third-party site.

Vie Claire does not receive affiliate commissions or payments for recommending any specific financial products, services, or providers unless explicitly disclosed.`,
    },
    {
      title: '🔒 Privacy',
      content: `Vie Claire does not sell, rent, or share your personal data with third parties for marketing purposes. When you use the contact form, the information you provide is transmitted securely to Formspree (our form processing provider) and used solely to respond to your inquiry.

We may use anonymised, aggregated analytics data to improve the site. We do not use tracking cookies for advertising purposes. You can use all tools and calculators on this site without creating an account or providing personal information.`,
    },
    {
      title: '📝 Intellectual Property',
      content: `All original content on Vie Claire — including text, tools, calculators, and design — is the intellectual property of Vie Claire and is protected by applicable copyright law. You may share short excerpts for personal or educational use with clear attribution and a link to the original article.

You may not reproduce, republish, scrape, or commercially exploit any content from this site without prior written permission.`,
    },
    {
      title: '⚙️ Limitation of Liability',
      content: `To the fullest extent permitted by applicable law, Vie Claire and its operators shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of, or inability to use, this website or its content.

This includes — but is not limited to — financial losses, investment losses, or any decisions made in reliance on the information or tools provided on this site.`,
    },
    {
      title: '📬 Contact',
      content: `For legal inquiries, corrections, or content removal requests, please use the contact form at vieclaire.com/en/contact.`,
    },
  ],
  fr: [
    {
      title: '⚖️ Absence de Conseil Financier',
      content: `Tout le contenu publié sur Vie Claire — y compris les articles, guides, calculateurs et outils — est fourni à titre strictement informatif et éducatif.

Rien sur ce site ne constitue, ni ne doit être interprété comme, un conseil financier, un conseil en investissement, un conseil fiscal, un conseil juridique ou toute autre forme de conseil professionnel réglementé par une autorité financière.

Les outils et calculateurs de ce site produisent des estimations basées sur des modèles simplifiés et des données fournies par l'utilisateur. Ils ne tiennent pas compte de votre situation financière personnelle, de votre statut fiscal, de vos objectifs d'investissement, de votre tolérance au risque ou de votre horizon temporel.

Avant de prendre toute décision d'investissement, d'épargne ou de planification financière, consultez un conseiller financier qualifié et réglementé, un expert fiscal ou un juriste.`,
    },
    {
      title: '📊 Performances Passées et Projections',
      content: `Les données financières historiques et les statistiques présentées sur ce site sont fournies à titre illustratif uniquement. Les performances passées ne préjugent pas des performances futures.

Toute projection ou scénario hypothétique présenté sur ce site est une estimation sans garantie d'exactitude. Les résultats réels différeront des projections.`,
    },
    {
      title: '🌐 Exactitude et Disponibilité',
      content: `Nous faisons des efforts raisonnables pour assurer l'exactitude du contenu publié sur Vie Claire. Cependant, les réglementations financières, les lois fiscales et les conditions de marché changent fréquemment. Nous ne pouvons garantir que toutes les informations sont à jour, complètes ou exactes au moment où vous les lisez.

Vie Claire est fourni "tel quel" sans garantie d'aucune sorte. Nous nous réservons le droit de modifier, mettre à jour ou supprimer tout contenu sans préavis.`,
    },
    {
      title: '🔒 Confidentialité',
      content: `Vie Claire ne vend, ne loue ni ne partage vos données personnelles avec des tiers à des fins commerciales. Lorsque vous utilisez le formulaire de contact, les informations que vous fournissez sont transmises de manière sécurisée à Formspree et utilisées uniquement pour répondre à votre demande.

Vous pouvez utiliser tous les outils et calculateurs de ce site sans créer de compte ni fournir d'informations personnelles.`,
    },
    {
      title: '⚙️ Limitation de Responsabilité',
      content: `Dans toute la mesure permise par la loi applicable, Vie Claire et ses opérateurs ne sauraient être tenus responsables de tout dommage direct, indirect, accessoire, consécutif ou punitif résultant de votre utilisation de ce site ou de son contenu.

Cela inclut, sans s'y limiter, les pertes financières, les pertes d'investissement, ou toute décision prise en se fondant sur les informations ou outils fournis sur ce site.`,
    },
    {
      title: '📬 Contact',
      content: `Pour toute demande juridique, correction ou demande de suppression de contenu, utilisez le formulaire de contact sur vieclaire.com/fr/contact.`,
    },
  ],
  de: [
    {
      title: '⚖️ Kein Finanzrat',
      content: `Alle auf Vie Claire veröffentlichten Inhalte — einschließlich Artikel, Ratgeber, Rechner und Tools — dienen ausschließlich zu Informations- und Bildungszwecken.

Nichts auf dieser Website stellt eine Finanzberatung, Anlageberatung, Steuerberatung, Rechtsberatung oder eine andere Form von professioneller Beratung dar, die von einer Finanzbehörde reguliert wird.

Vor jeder Anlage-, Spar- oder Finanzplanungsentscheidung sollten Sie einen qualifizierten und zugelassenen Finanzberater, Steuerberater oder Rechtsexperten konsultieren.`,
    },
    {
      title: '📊 Vergangene Wertentwicklungen',
      content: `Historische Finanzdaten und Statistiken auf dieser Website dienen nur zur Veranschaulichung. Vergangene Wertentwicklungen sind kein verlässlicher Indikator für künftige Ergebnisse.

Jede Projektion oder jedes hypothetische Szenario auf dieser Website ist eine Schätzung ohne Genauigkeitsgarantie.`,
    },
    {
      title: '🔒 Datenschutz',
      content: `Vie Claire verkauft, vermietet oder teilt Ihre personenbezogenen Daten nicht mit Dritten zu Marketingzwecken. Wenn Sie das Kontaktformular nutzen, werden die von Ihnen bereitgestellten Informationen sicher an Formspree übertragen und ausschließlich zur Beantwortung Ihrer Anfrage verwendet.

Sie können alle Tools und Rechner auf dieser Website nutzen, ohne ein Konto zu erstellen oder persönliche Daten anzugeben.`,
    },
    {
      title: '⚙️ Haftungsbeschränkung',
      content: `Im größtmöglichen gesetzlich zulässigen Umfang haften Vie Claire und seine Betreiber nicht für direkte, indirekte, zufällige, Folge- oder Strafschäden, die aus Ihrer Nutzung dieser Website oder ihrer Inhalte entstehen.

Dies umfasst insbesondere finanzielle Verluste, Anlageverluste oder Entscheidungen, die auf der Grundlage der auf dieser Website bereitgestellten Informationen oder Tools getroffen wurden.`,
    },
    {
      title: '📬 Kontakt',
      content: `Für rechtliche Anfragen, Korrekturen oder Anfragen zur Inhaltsentfernung nutzen Sie bitte das Kontaktformular auf vieclaire.com/de/contact.`,
    },
  ],
};

export default function LegalPage({ params }) {
  const lang = params.lang;
  const content = sections[lang] || sections.en;

  const pageTitle = lang === 'fr' ? 'Mentions Légales' : lang === 'de' ? 'Impressum & Rechtliche Hinweise' : 'Legal Notice & Disclaimer';
  const lastUpdated = lang === 'fr' ? 'Dernière mise à jour' : lang === 'de' ? 'Zuletzt aktualisiert' : 'Last updated';

  const breadcrumbs = [
    { label: 'Vie Claire', href: `/${lang}` },
    { label: pageTitle },
  ];

  return (
    <>
      <BreadcrumbSchema crumbs={[
        { name: 'Vie Claire', url: `${SITE_URL}/${lang}` },
        { name: pageTitle, url: `${SITE_URL}/${lang}/legal` },
      ]} />
      <section className="relative bg-gradient-to-br from-navy-950 to-navy-900 pt-32 pb-16">
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <div className="text-5xl mb-6">⚖️</div>
          <h1 className="font-display text-3xl md:text-4xl text-white mb-4">{pageTitle}</h1>
          <p className="text-white/40 text-sm">{lastUpdated}: {new Date().toLocaleDateString(lang === 'fr' ? 'fr-FR' : lang === 'de' ? 'de-DE' : 'en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <Breadcrumb crumbs={breadcrumbs} />

        {/* Big disclaimer banner */}
        <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-6 mb-10">
          <p className="text-amber-800 font-semibold text-sm mb-2">
            {lang === 'fr' ? '⚠️ Information Importante' : lang === 'de' ? '⚠️ Wichtiger Hinweis' : '⚠️ Important Notice'}
          </p>
          <p className="text-amber-700 text-sm leading-relaxed">
            {lang === 'fr'
              ? "Vie Claire est un site éducatif. Les informations publiées ici ne constituent pas un conseil financier, fiscal ou juridique. Consultez toujours un professionnel réglementé avant toute décision financière importante."
              : lang === 'de'
              ? "Vie Claire ist eine Bildungswebsite. Die hier veröffentlichten Informationen stellen keine Finanz-, Steuer- oder Rechtsberatung dar. Konsultieren Sie immer einen zugelassenen Fachmann, bevor Sie wichtige Finanzentscheidungen treffen."
              : "Vie Claire is an educational website. The information published here does not constitute financial, tax, or legal advice. Always consult a regulated professional before making important financial decisions."}
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {content.map((section, i) => (
            <div key={i} className="bg-white rounded-2xl border border-navy-100 p-7">
              <h2 className="font-display text-xl text-navy-900 mb-4">{section.title}</h2>
              <div className="space-y-3">
                {section.content.split('\n\n').map((para, j) => (
                  <p key={j} className="text-navy-600 text-sm leading-relaxed">{para}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
