import Link from 'next/link';
import { CLUSTERS } from '@/lib/seo';

const toolLinks = (lang) => [
  { href: `/${lang}/tools/gross-to-net`,      label: '💸 Gross → Net' },
  { href: `/${lang}/tools/compound-interest`, label: '📈 Compound Interest' },
  { href: `/${lang}/tools/fire-calculator`,   label: '🔥 FIRE Calculator' },
  { href: `/${lang}/tools/savings-rate`,       label: '💰 Savings Rate' },
];

export default function Footer({ dict, lang }) {
  const learnLabel  = lang === 'fr' ? 'Guides Thématiques' : lang === 'de' ? 'Themen-Guides'  : 'Topic Guides';
  const quickLabel  = lang === 'fr' ? 'Liens Rapides'      : lang === 'de' ? 'Schnelllinks'   : 'Quick Links';
  const toolsLabel  = lang === 'fr' ? 'Outils'             : lang === 'de' ? 'Tools'           : 'Free Tools';
  const rightsLabel = lang === 'fr' ? 'Tous droits réservés.' : lang === 'de' ? 'Alle Rechte vorbehalten.' : 'All rights reserved.';
  const legalLabel  = lang === 'fr' ? 'Légal'              : lang === 'de' ? 'Rechtliches'    : 'Legal';

  return (
    <footer className="bg-navy-950 text-white grain-overlay">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="md:col-span-1">
            <Link href={`/${lang}`} className="font-display text-2xl tracking-wide">
              Vie<span className="text-green-400">Claire</span><span className="text-green-400">.</span>
            </Link>
            <p className="mt-1 text-green-400/80 text-xs italic font-body tracking-wide">{dict.nav.tagline}</p>
            <p className="mt-4 text-navy-300 text-sm leading-relaxed">{dict.footer.tagline}</p>
            {/* Language switcher */}
            <div className="mt-6 flex gap-2">
              {[{ code: 'en', label: 'EN' }, { code: 'fr', label: 'FR' }, { code: 'de', label: 'DE' }].map(({ code, label }) => (
                <Link key={code} href={`/${code}`} hrefLang={code} className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${code === lang ? 'bg-green-500/20 border-green-500/50 text-green-300' : 'border-white/20 text-white/50 hover:border-white/40 hover:text-white/80'}`}>
                  {label}
                </Link>
              ))}
            </div>
            {/* RSS feeds */}
            <div className="mt-5">
              <p className="text-xs font-semibold text-navy-400 uppercase tracking-widest mb-2">📡 RSS</p>
              <div className="space-y-1">
                <a href="/feed.xml" className="block text-xs text-navy-400 hover:text-green-400 transition-colors">Main feed (EN)</a>
                <a href="/feed-fr.xml" className="block text-xs text-navy-400 hover:text-green-400 transition-colors">Feed français</a>
                <a href="/feed-de.xml" className="block text-xs text-navy-400 hover:text-green-400 transition-colors">Deutsches Feed</a>
              </div>
            </div>
          </div>

          {/* Topic guides */}
          <div>
            <h4 className="text-xs font-body font-semibold uppercase tracking-widest text-green-400 mb-4">{learnLabel}</h4>
            <div className="space-y-2">
              {Object.values(CLUSTERS).slice(0, 7).map((c) => (
                <Link key={c.pillar} href={`/${lang}/learn/${c.pillar}`} className="flex items-center gap-2 text-navy-300 hover:text-white transition-colors text-sm group">
                  <span className="text-base">{c.emoji}</span>
                  <span className="text-xs">{c.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-body font-semibold uppercase tracking-widest text-green-400 mb-4">{quickLabel}</h4>
            <div className="space-y-2">
              {[
                { href: `/${lang}/blog`,     label: lang === 'fr' ? 'Blog' : 'Blog' },
                { href: `/${lang}/tools`,    label: lang === 'fr' ? 'Outils' : lang === 'de' ? 'Tools' : 'Tools' },
                { href: `/${lang}/about`,    label: lang === 'fr' ? 'À Propos' : lang === 'de' ? 'Über Uns' : 'About' },
                { href: `/${lang}/contact`,  label: 'Contact' },
                { href: `/${lang}/sitemap`,  label: lang === 'fr' ? 'Plan du Site' : lang === 'de' ? 'Seitenübersicht' : 'HTML Sitemap' },
                { href: `/${lang}/legal`,    label: lang === 'fr' ? 'Mentions Légales' : lang === 'de' ? 'Impressum' : 'Legal' },
                { href: `/${lang}/privacy`,  label: lang === 'fr' ? 'Confidentialité' : lang === 'de' ? 'Datenschutz' : 'Privacy Policy' },
                { href: `/${lang}/terms`,    label: lang === 'fr' ? "Conditions d'Utilisation" : lang === 'de' ? 'Nutzungsbedingungen' : 'Terms of Use' },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="block text-navy-300 hover:text-white transition-colors text-sm">{link.label}</Link>
              ))}
            </div>
          </div>

          {/* Tools */}
          <div>
            <h4 className="text-xs font-body font-semibold uppercase tracking-widest text-green-400 mb-4">{toolsLabel}</h4>
            <div className="space-y-2">
              {toolLinks(lang).map((link) => (
                <Link key={link.href} href={link.href} className="block text-navy-300 hover:text-white transition-colors text-sm">{link.label}</Link>
              ))}
            </div>
            <div className="mt-6">
              <h4 className="text-xs font-body font-semibold uppercase tracking-widest text-green-400 mb-3">
                {lang === 'fr' ? 'Sujets' : lang === 'de' ? 'Themen' : 'Topics'}
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {['FIRE', 'ETF', 'Gold', 'Inflation', 'Budgeting', 'Mindset'].map((tag) => (
                  <span key={tag} className="px-2 py-0.5 text-xs bg-navy-800 text-navy-300 rounded-full border border-navy-700">{tag}</span>
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
              {lang === 'fr' ? "Le contenu de Vie Claire est fourni à titre informatif et éducatif uniquement. Il ne constitue pas un conseil financier, fiscal ou juridique. Consultez un professionnel réglementé avant toute décision financière importante." : lang === 'de' ? "Die Inhalte von Vie Claire dienen ausschließlich zu Informations- und Bildungszwecken. Sie stellen keine Finanz-, Steuer- oder Rechtsberatung dar. Konsultieren Sie vor wichtigen Finanzentscheidungen einen qualifizierten Fachmann." : "Content on Vie Claire is for informational and educational purposes only. It does not constitute financial, tax, or legal advice. Consult a qualified professional before making important financial decisions."}
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-navy-400 text-xs">&copy; {new Date().getFullYear()} VIE CLAIRE. {rightsLabel}</p>
          <div className="flex items-center flex-wrap gap-3 text-xs text-navy-500">
            <Link href={`/${lang}/privacy`}  className="hover:text-navy-300 transition-colors">{lang === 'fr' ? 'Confidentialité' : lang === 'de' ? 'Datenschutz' : 'Privacy'}</Link>
            <span>·</span>
            <Link href={`/${lang}/terms`}    className="hover:text-navy-300 transition-colors">{lang === 'fr' ? 'Conditions' : lang === 'de' ? 'Nutzungsbedingungen' : 'Terms'}</Link>
            <span>·</span>
            <Link href={`/${lang}/sitemap`}  className="hover:text-navy-300 transition-colors">Sitemap</Link>
            <span>·</span>
            <a href="/sitemap-index.xml"     className="hover:text-navy-300 transition-colors">XML Sitemap</a>
            <span>·</span>
            <a href="/feed.xml"              className="hover:text-navy-300 transition-colors">RSS</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
