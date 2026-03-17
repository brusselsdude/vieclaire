import Link from 'next/link';
import { getDictionary } from '@/i18n';

const STATIC_LANGS = ['en', 'fr', 'de'];
export function generateStaticParams() {
  return STATIC_LANGS.map((lang) => ({ lang }));
}


export async function generateMetadata({ params }) {
  const dict = getDictionary(params.lang);
  return { title: dict.tools.title, description: dict.tools.subtitle };
}

export default function ToolsPage({ params }) {
  const lang = params.lang;
  const dict = getDictionary(lang);
  const t = dict.tools;

  const tools = [
    {
      href: `/${lang}/tools/gross-to-net`,
      emoji: '💸',
      badge: lang === 'fr' ? '5 PAYS' : lang === 'de' ? '5 LÄNDER' : '5 COUNTRIES',
      badgeColor: 'bg-green-500 text-white',
      title: dict.grossToNet.title,
      subtitle: lang === 'fr' ? 'France · Belgique · Suisse · Allemagne · UK' : lang === 'de' ? 'Deutschland · Frankreich · Belgien · Schweiz · UK' : 'France · Belgium · Switzerland · Germany · UK',
      description: dict.grossToNet.subtitle,
      tags: ['Salary', 'Tax', 'Net Pay', lang === 'fr' ? 'Gratuit' : lang === 'de' ? 'Kostenlos' : 'Free'],
      highlight: true,
    },
    {
      href: `/${lang}/tools/compound-interest`,
      emoji: '📈',
      badge: lang === 'fr' ? 'POPULAIRE' : lang === 'de' ? 'BELIEBT' : 'POPULAR',
      badgeColor: 'bg-blue-500 text-white',
      title: dict.compoundInterest.title,
      subtitle: lang === 'fr' ? 'Visualisez la croissance exponentielle de votre épargne' : lang === 'de' ? 'Visualisiere das exponentielle Wachstum deines Ersparten' : 'Visualise the exponential growth of your savings',
      description: dict.compoundInterest.subtitle,
      tags: ['Investing', 'ETF', 'Long-term', lang === 'fr' ? 'Retraite' : lang === 'de' ? 'Rente' : 'Retirement'],
    },
    {
      href: `/${lang}/tools/fire-calculator`,
      emoji: '🔥',
      badge: 'FIRE',
      badgeColor: 'bg-orange-500 text-white',
      title: dict.fireCalc.title,
      subtitle: lang === 'fr' ? 'Financial Independence, Retire Early — calculé pour vous' : lang === 'de' ? 'Financial Independence, Retire Early — für dich berechnet' : 'Financial Independence, Retire Early — calculated for you',
      description: dict.fireCalc.subtitle,
      tags: ['FIRE', lang === 'fr' ? 'Retraite Anticipée' : lang === 'de' ? 'Frührente' : 'Early Retirement', 'FI', 'Freedom'],
    },
    {
      href: `/${lang}/tools/savings-rate`,
      emoji: '💰',
      badge: lang === 'fr' ? 'ESSENTIEL' : lang === 'de' ? 'ESSENZIELL' : 'ESSENTIAL',
      badgeColor: 'bg-purple-500 text-white',
      title: dict.savingsRate.title,
      subtitle: lang === 'fr' ? 'Un seul chiffre pour tout comprendre de votre situation financière' : lang === 'de' ? 'Eine Zahl, um alles zu verstehen' : 'One number to understand your entire financial situation',
      description: dict.savingsRate.subtitle,
      tags: [lang === 'fr' ? 'Épargne' : lang === 'de' ? 'Sparen' : 'Savings', 'Budget', 'FIRE', lang === 'fr' ? 'Indispensable' : lang === 'de' ? 'Unverzichtbar' : 'Must-know'],
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-navy-950 via-navy-900 to-green-950 pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-green-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-green-400 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <p className="text-green-400 font-medium tracking-widest uppercase text-sm mb-4">
            🧮 {t.badge}
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-white mb-6 leading-tight">
            {t.title}
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">{t.subtitle}</p>
          <p className="mt-4 text-sm text-green-400/70">{t.noSignup}</p>
        </div>
      </section>

      {/* Tools grid */}
      <section className="py-16 bg-warm-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid gap-6">
            {tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className={`group rounded-2xl shadow-sm border transition-all duration-300 overflow-hidden ${
                  tool.highlight
                    ? 'bg-gradient-to-br from-navy-950 to-navy-800 border-green-500/40 hover:border-green-400 hover:shadow-xl hover:shadow-green-100/30'
                    : 'bg-white border-navy-100 hover:shadow-lg hover:border-green-300'
                }`}
              >
                <div className="flex flex-col md:flex-row">
                  <div className={`md:w-24 flex items-center justify-center p-6 text-5xl ${
                    tool.highlight ? 'bg-green-500/10' : 'bg-gradient-to-br from-navy-900 to-navy-800'
                  }`}>
                    {tool.emoji}
                  </div>
                  <div className="flex-1 p-6">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                      <div>
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wide ${tool.badgeColor} mb-2`}>
                          {tool.badge}
                        </span>
                        <h2 className={`font-display text-xl ${tool.highlight ? 'text-white' : 'text-navy-900'} group-hover:text-green-400 transition-colors`}>
                          {tool.title}
                        </h2>
                        <p className={`text-sm mt-0.5 ${tool.highlight ? 'text-green-400/70' : 'text-navy-400'}`}>
                          {tool.subtitle}
                        </p>
                      </div>
                      <span className={`text-sm font-medium hidden md:block ${tool.highlight ? 'text-green-400' : 'text-green-600'} group-hover:translate-x-1 transition-transform`}>
                        {t.calculate} →
                      </span>
                    </div>
                    <p className={`text-sm leading-relaxed ${tool.highlight ? 'text-white/60' : 'text-navy-500'} mb-4 max-w-2xl`}>
                      {tool.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {tool.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`px-2.5 py-0.5 text-xs rounded-full ${
                            tool.highlight ? 'bg-white/10 text-white/60' : 'bg-navy-100 text-navy-500'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom callout */}
      <section className="bg-white border-t border-navy-100 py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <span className="text-4xl">🤓</span>
          <h2 className="font-display text-2xl text-navy-900 mt-4 mb-3">
            {lang === 'fr' ? 'Plus d\'Outils à Venir' : lang === 'de' ? 'Mehr Tools kommen bald' : 'More Tools Coming Soon'}
          </h2>
          <p className="text-navy-500 text-sm">
            {lang === 'fr'
              ? "Simulateur de crédit immobilier, calculateur de retraite, optimisateur fiscal... On bosse dessus (pour de vrai cette fois)."
              : lang === 'de'
              ? "Hypothekenrechner, Rentenrechner, Steueroptimierung... Wir arbeiten daran (diesmal wirklich)."
              : "Mortgage calculator, pension simulator, tax optimizer... We're building them (for real this time)."}
          </p>
        </div>
      </section>
    </>
  );
}
