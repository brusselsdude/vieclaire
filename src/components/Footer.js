import Link from 'next/link';
import { CLUSTERS } from '@/lib/seo';

const toolLinks = (lang) => [
  { href: `/${lang}/tools/gross-to-net`,      label: '💸 Gross → Net' },
  { href: `/${lang}/tools/compound-interest`, label: '📈 Compound Interest' },
  { href: `/${lang}/tools/fire-calculator`,   label: '🔥 FIRE Calculator' },
  { href: `/${lang}/tools/savings-rate`,       label: '💰 Savings Rate' },
];

export default function Footer({ dict, lang }) {
  const learnLabel   = lang === 'fr' ? 'Guides Thématiques' : lang === 'de' ? 'Themen-Guides' : 'Topic Guides';
  const quickLabel   = lang === 'fr' ? 'Liens Rapides'      : lang === 'de' ? 'Schnelllinks'   : 'Quick Links';
  const toolsLabel   = lang === 'fr' ? 'Outils'             : lang === 'de' ? 'Tools'           : 'Free Tools';
  const rightsLabel  = lang === 'fr' ? 'Tous droits réservés.' : lang === 'de' ? 'Alle Rechte vorbehalten.' : 'All rights reserved.';

  return (
    <footer className="bg-navy-950 text-white grain-overlay">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="md:col-span-1">
            <Link href={`/${lang}`} className="font-display text-2xl tracking-wide">
              Vie<span className="text-green-400">Claire</span><span className="text-green-400">.</span>
            </Link>
            <p className="mt-1 text-green-400/80 text-xs italic font-body tracking-wide">
              {dict.nav.tagline}
            </p>
            <p className="mt-4 text-navy-300 text-sm leading-relaxed">
              {dict.footer.tagline}
            </p>
            {/* Hreflang language switcher */}
            <div className="mt-6 flex gap-2">
              {[
                { code: 'en', label: 'EN' },
                { code: 'fr', label: 'FR' },
                { code: 'de', label: 'DE' },
              ].map(({ code, label }) => (
                <Link
                  key={code}
                  href={`/${code}`}
                  hrefLang={code}
                  className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                    code === lang
                      ? 'bg-green-500/20 border-green-500/50 text-green-300'
                      : 'border-white/20 text-white/50 hover:border-white/40 hover:text-white/80'
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Topic guides — cluster links */}
          <div>
            <h4 className="text-xs font-body font-semibold uppercase tracking-widest text-green-400 mb-4">
              {learnLabel}
            </h4>
            <div className="space-y-2">
              {Object.values(CLUSTERS).map((c) => (
                <Link
                  key={c.pillar}
                  href={`/${lang}/learn/${c.pillar}`}
                  className="flex items-center gap-2 text-navy-300 hover:text-white transition-colors text-sm group"
                >
                  <span className="text-base">{c.emoji}</span>
                  <span>{c.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-body font-semibold uppercase tracking-widest text-green-400 mb-4">
              {quickLabel}
            </h4>
            <div className="space-y-2">
              {[
                { href: `/${lang}/blog`,        label: lang === 'fr' ? 'Blog & Articles'    : lang === 'de' ? 'Blog & Artikel'       : 'Blog & Articles' },
                { href: `/${lang}/tools`,        label: lang === 'fr' ? 'Outils Financiers'  : lang === 'de' ? 'Finanz-Tools'          : 'Financial Tools' },
                { href: `/${lang}/about`,        label: lang === 'fr' ? 'À Propos'           : lang === 'de' ? 'Über Uns'              : 'About' },
                { href: `/${lang}/learn/financial-independence`, label: lang === 'fr' ? 'Guide FIRE' : lang === 'de' ? 'FIRE-Guide' : 'FIRE Guide' },
                { href: `/${lang}/learn/investing-basics`,       label: lang === 'fr' ? 'Guide Investissement' : lang === 'de' ? 'Investier-Guide' : 'Investing Guide' },
                { href: `/${lang}/learn/budgeting-guide`,        label: lang === 'fr' ? 'Guide Budget' : lang === 'de' ? 'Budget-Guide' : 'Budgeting Guide' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-navy-300 hover:text-white transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Tools */}
          <div>
            <h4 className="text-xs font-body font-semibold uppercase tracking-widest text-green-400 mb-4">
              {toolsLabel}
            </h4>
            <div className="space-y-2">
              {toolLinks(lang).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-navy-300 hover:text-white transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Schema: sitelinks searchbox hint */}
            <div className="mt-6">
              <h4 className="text-xs font-body font-semibold uppercase tracking-widest text-green-400 mb-3">
                {lang === 'fr' ? 'Sujets' : lang === 'de' ? 'Themen' : 'Topics'}
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {['FIRE', 'ETF', 'Budgeting', 'Gold', 'Mindset', 'Markets'].map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-xs bg-navy-800 text-navy-300 rounded-full border border-navy-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Legal disclaimer */}
        <div className="border-t border-navy-800 pt-8 pb-6">
          <div className="bg-navy-900/60 border border-navy-700/50 rounded-xl px-5 py-4">
            <p className="text-xs font-semibold text-navy-400 uppercase tracking-widest mb-2">
              ⚖️ {lang === 'fr' ? 'Avertissement Légal' : lang === 'de' ? 'Rechtlicher Hinweis' : 'Legal Disclaimer'}
            </p>
            <p className="text-xs text-navy-500 leading-relaxed">
              {lang === 'fr'
                ? "Le contenu publié sur Vie Claire est fourni à titre informatif et éducatif uniquement. Il ne constitue pas un conseil financier, fiscal, juridique ou en investissement. Les outils et calculateurs proposés sont des estimations et ne prennent pas en compte votre situation personnelle. Les performances passées ne préjugent pas des performances futures. Consultez un conseiller financier agréé avant de prendre toute décision d'investissement. Vie Claire n'est pas responsable des décisions prises sur la base des informations publiées sur ce site."
                : lang === 'de'
                ? "Die auf Vie Claire veröffentlichten Inhalte dienen ausschließlich zu Informations- und Bildungszwecken. Sie stellen keine Finanz-, Steuer-, Rechts- oder Anlageberatung dar. Die angebotenen Tools und Rechner sind Schätzungen und berücksichtigen nicht Ihre persönliche Situation. Vergangene Wertentwicklungen sind kein verlässlicher Indikator für künftige Ergebnisse. Bitte konsultieren Sie einen zugelassenen Finanzberater, bevor Sie Anlageentscheidungen treffen. Vie Claire übernimmt keine Haftung für Entscheidungen, die auf der Grundlage der auf dieser Website veröffentlichten Informationen getroffen werden."
                : "Content published on Vie Claire is provided for informational and educational purposes only. It does not constitute financial, tax, legal, or investment advice. The tools and calculators provided are estimates only and do not account for your personal circumstances. Past performance is not indicative of future results. Please consult a qualified financial advisor before making any investment decisions. Vie Claire is not liable for any decisions made based on the information published on this site."}
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-navy-400 text-xs">
            &copy; {new Date().getFullYear()} VIE CLAIRE. {rightsLabel}
          </p>
          <div className="flex items-center gap-4 text-xs text-navy-500">
            <Link href={`/${lang}/contact`} className="hover:text-navy-300 transition-colors">
              {lang === 'fr' ? 'Contact' : lang === 'de' ? 'Kontakt' : 'Contact'}
            </Link>
            <span>·</span>
            <Link href={`/${lang}/legal`} className="hover:text-navy-300 transition-colors">
              {lang === 'fr' ? 'Mentions Légales' : lang === 'de' ? 'Impressum' : 'Legal'}
            </Link>
            <span>·</span>
            <Link href="/sitemap.xml" className="hover:text-navy-300 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
