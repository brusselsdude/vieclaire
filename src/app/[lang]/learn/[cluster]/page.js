import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getDictionary } from '@/i18n';
import { CLUSTERS, SITE_URL, getCrossLinks } from '@/lib/seo';
import { getPostsIndex } from '@/data/postsIndex';
import BlogCard from '@/components/BlogCard';
import Breadcrumb from '@/components/Breadcrumb';
import { CollectionSchema, FAQSchema, BreadcrumbSchema } from '@/components/SchemaOrg';

export async function generateStaticParams() {
  const langs = ['en', 'fr', 'de'];
  const params = [];
  for (const lang of langs) {
    for (const cluster of Object.values(CLUSTERS)) {
      params.push({ lang, cluster: cluster.pillar });
    }
  }
  return params;
}

export function generateMetadata({ params }) {
  const cluster = Object.values(CLUSTERS).find((c) => c.pillar === params.cluster);
  if (!cluster) return {};
  const lang = params.lang;
  const canonical = `${SITE_URL}/${lang}/learn/${params.cluster}`;

  const titleMap = {
    'financial-independence': { en: 'Financial Independence & FIRE Guide', fr: 'Guide Indépendance Financière & FIRE', de: 'Finanzielle Freiheit & FIRE Guide' },
    'investing-basics':       { en: 'Investing for Beginners Guide', fr: 'Guide Investissement pour Débutants', de: 'Investieren für Anfänger Guide' },
    'budgeting-guide':        { en: 'Complete Budgeting Guide', fr: 'Guide Complet du Budget', de: 'Vollständiger Budgetierungsguide' },
    'stock-market-guide':     { en: 'Stock Market History & Returns Guide', fr: 'Guide Histoire des Marchés Financiers', de: 'Aktienmarkt Geschichte & Renditen Guide' },
    'opportunity-cost-guide': { en: 'Opportunity Cost in Personal Finance', fr: 'Coût d\'Opportunité en Finance Personnelle', de: 'Opportunitätskosten in der persönlichen Finanzplanung' },
  };

  const title = titleMap[params.cluster]?.[lang] || cluster.label;

  return {
    title,
    description: cluster.description,
    alternates: {
      canonical,
      languages: { en: `${SITE_URL}/en/learn/${params.cluster}`, fr: `${SITE_URL}/fr/learn/${params.cluster}`, de: `${SITE_URL}/de/learn/${params.cluster}` },
    },
    openGraph: { title, description: cluster.description, url: canonical, type: 'website', siteName: 'Vie Claire' },
  };
}

const FAQ_ANSWERS = {
  'financial-independence': [
    { question: 'What is the FIRE number?', answer: 'Your FIRE number is the amount of invested assets needed to retire early. It is calculated by dividing your annual expenses by your safe withdrawal rate (typically 4%). For example, if you spend €30,000 per year, your FIRE number is €750,000.' },
    { question: 'How does the 4% rule work in Europe?', answer: 'The 4% rule suggests you can withdraw 4% of your portfolio per year without running out of money over 30 years. In Europe, a slightly lower rate of 3.5% is often recommended due to capital gains taxes, sequence-of-returns risk over longer retirements, and currency risk.' },
    { question: 'What savings rate do I need for early retirement?', answer: 'At a 50% savings rate, you can reach financial independence in about 17 years from zero. At 70%, in about 8.5 years. The key insight: savings rate determines how quickly you reach FIRE far more than investment returns.' },
    { question: 'Can I achieve FIRE on an average salary?', answer: 'Yes, though it takes longer than on a high income. The most important levers are your savings rate (controllable), investment costs (controllable), and time (controllable). Many people reach FIRE on median incomes by prioritizing housing, transport, and increasing income over time.' },
  ],
  'investing-basics': [
    { question: 'What are the best ETFs for European investors?', answer: 'UCITS-compliant world ETFs tracking the MSCI World or FTSE All-World index are the most popular starting points. Low-cost options include the Amundi MSCI World (IE000BI8OT95), Vanguard FTSE All-World (IE00B3RBWM25), and iShares Core MSCI World (IE00B4L5Y983). Total expense ratios are typically 0.12–0.22% per year.' },
    { question: 'How does compound interest work?', answer: 'Compound interest means earning returns on your returns, not just on your original investment. €10,000 invested at 7% annually becomes €14,026 after 5 years, €19,672 after 10 years, and €76,123 after 30 years — without adding a single euro. The longer the time horizon, the more dramatic the effect.' },
    { question: 'What is dollar-cost averaging?', answer: 'Dollar-cost averaging (DCA) means investing a fixed amount at regular intervals regardless of market price. When prices fall, your fixed amount buys more shares. When prices rise, it buys fewer. Over time, this results in an average purchase price lower than the market average high, reducing timing risk.' },
  ],
  'budgeting-guide': [
    { question: 'What is the 50/30/20 budget rule?', answer: 'The 50/30/20 rule allocates 50% of after-tax income to needs (housing, food, transport), 30% to wants (entertainment, dining, hobbies), and 20% to savings and debt repayment. It is a starting framework — many financial independence seekers flip the model to 50% savings.' },
    { question: 'How do I track my expenses effectively?', answer: 'The most effective method is automated categorization through a budgeting app linked to your bank accounts. Alternatives include weekly manual review of bank statements and the envelope system. The key is reviewing spending weekly and comparing monthly to your budget — not perfect tracking, but consistent awareness.' },
    { question: 'What is a realistic savings rate to aim for?', answer: 'Most financial advisors recommend a minimum of 15-20% savings rate. For financial independence, 30-50% is needed to make meaningful progress. The single most impactful action is automating savings transfers on payday so the money is never available to spend.' },
  ],
  'stock-market-guide': [
    { question: 'What are average stock market returns over 100 years?', answer: 'The US stock market has returned approximately 9.8% annually in nominal terms and 6.5-7% in real (inflation-adjusted) terms over the last century. European markets have averaged slightly lower returns. These figures include dividends reinvested and span major crashes, wars, and economic crises.' },
    { question: 'How long does it take markets to recover after a crash?', answer: 'Recovery time varies significantly. The 2020 COVID crash recovered in about 5 months. The 2008 financial crisis took about 5 years to new highs. The 1929 crash took 25 years for a full nominal recovery. However, investors who continued investing during downturns typically recovered much faster due to buying at lower prices.' },
    { question: 'Is gold a good inflation hedge?', answer: 'Gold has been an inconsistent inflation hedge. Over very long periods (decades), gold has roughly preserved purchasing power. However, over shorter 5-10 year periods, it has sometimes massively outperformed and sometimes badly underperformed inflation. Stocks have historically been a more reliable long-term inflation hedge.' },
  ],
  'opportunity-cost-guide': [
    { question: 'What is opportunity cost in personal finance?', answer: 'Opportunity cost is the value of the next best alternative you give up when making a financial decision. Spending €20,000 on a new car does not just cost €20,000 — it costs €20,000 plus all the investment returns that money could have generated. At 7% over 20 years, that €20,000 would become €77,394.' },
    { question: 'What is the opportunity cost of not investing early?', answer: 'Delaying investing by 10 years can roughly halve your final wealth. An investor who starts at 25 instead of 35, contributing the same monthly amount, typically ends up with 2x more at retirement — entirely due to compound interest having more time to work. The first years of investing are the most valuable.' },
    { question: 'How does lifestyle inflation destroy wealth?', answer: 'Lifestyle inflation means increasing spending as income rises, preventing any wealth accumulation despite earning more. If you earn €50k at 25 and €80k at 35 but your lifestyle costs rise by the same amount, your savings rate and wealth trajectory may not improve at all. Each spending increase also compounds — you give up both the money and its future returns.' },
  ],
};

export default function ClusterPage({ params }) {
  const cluster = Object.values(CLUSTERS).find((c) => c.pillar === params.cluster);
  if (!cluster) notFound();

  const lang    = params.lang;
  const dict    = getDictionary(lang);
  const allPosts = getPostsIndex();
  const clusterPosts = cluster.posts
    .map((s) => allPosts.find((p) => p.slug === s))
    .filter(Boolean);

  const faqData = FAQ_ANSWERS[params.cluster] || cluster.keyQuestions.map((q) => ({ question: q, answer: 'See our detailed articles below.' }));

  const canonical = `${SITE_URL}/${lang}/learn/${params.cluster}`;
  const breadcrumbs = [
    { label: 'Vie Claire', href: `/${lang}` },
    { label: dict.nav.blog, href: `/${lang}/blog` },
    { label: cluster.label },
  ];

  const titleMap = {
    'financial-independence': { en: 'Financial Independence & FIRE', fr: 'Indépendance Financière & FIRE', de: 'Finanzielle Freiheit & FIRE' },
    'investing-basics':       { en: 'Investing for Long-Term Wealth', fr: 'Investir sur le Long Terme', de: 'Langfristig Investieren' },
    'budgeting-guide':        { en: 'Budgeting & Saving Money', fr: 'Budget & Épargne', de: 'Budgetierung & Sparen' },
    'stock-market-guide':     { en: 'Markets & Asset History', fr: 'Marchés & Historique des Actifs', de: 'Märkte & Asset-Geschichte' },
    'opportunity-cost-guide': { en: 'Opportunity Cost & Financial Mindset', fr: 'Coût d\'Opportunité & Mindset', de: 'Opportunitätskosten & Mindset' },
  };
  const pageTitle = titleMap[params.cluster]?.[lang] || cluster.label;

  return (
    <>
      <CollectionSchema name={pageTitle} description={cluster.description} url={canonical} posts={clusterPosts} />
      <FAQSchema questions={faqData} />
      <BreadcrumbSchema crumbs={breadcrumbs.map((c) => ({ name: c.label, url: c.href ? `${SITE_URL}${c.href}` : canonical }))} />

      {/* Hero */}
      <section className={`relative bg-gradient-to-br ${cluster.color} pt-32 pb-20 overflow-hidden`}>
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-10 left-20 w-80 h-80 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-10 w-64 h-64 bg-white rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 text-center text-white">
          <div className="text-6xl mb-5">{cluster.emoji}</div>
          <div className="inline-block bg-white/15 border border-white/30 rounded-full px-4 py-1 text-sm font-medium mb-6 uppercase tracking-widest">
            Topic Guide
          </div>
          <h1 className="font-display text-4xl md:text-5xl mb-6 leading-tight">{pageTitle}</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">{cluster.description}</p>
          <div className="flex flex-wrap justify-center gap-3">
            {cluster.relatedTools.map((tool) => {
              const toolLabels = { 'gross-to-net': '💸 Gross→Net', 'compound-interest': '📈 Compound Interest', 'fire-calculator': '🔥 FIRE Calculator', 'savings-rate': '💰 Savings Rate' };
              return (
                <Link key={tool} href={`/${lang}/tools/${tool}`} className="inline-flex items-center gap-1.5 bg-white/20 hover:bg-white/30 border border-white/30 text-white font-semibold px-4 py-2 rounded-xl transition-all text-sm">
                  {toolLabels[tool] || tool} →
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <Breadcrumb crumbs={breadcrumbs} />

        {/* Stats bar */}
        <div className="flex flex-wrap gap-6 mb-12 p-5 bg-white rounded-2xl border border-navy-100 shadow-sm">
          <div><span className="font-display text-2xl text-green-600">{clusterPosts.length}</span><p className="text-xs text-navy-400 mt-0.5">Articles</p></div>
          <div className="w-px bg-navy-100" />
          <div><span className="font-display text-2xl text-green-600">{clusterPosts.reduce((s, p) => s + p.readTime, 0)}</span><p className="text-xs text-navy-400 mt-0.5">Total min read</p></div>
          <div className="w-px bg-navy-100" />
          <div><span className="font-display text-2xl text-green-600">{cluster.relatedTools.length}</span><p className="text-xs text-navy-400 mt-0.5">Free tools</p></div>
          <div className="w-px bg-navy-100" />
          <div><span className="font-display text-2xl text-green-600">Free</span><p className="text-xs text-navy-400 mt-0.5">Always</p></div>
        </div>

        {/* Article grid */}
        <h2 className="font-display text-2xl text-navy-900 mb-6">
          {lang === 'fr' ? 'Tous les Articles' : lang === 'de' ? 'Alle Artikel' : 'All Articles in This Guide'}
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {clusterPosts.map((post) => (
            <BlogCard key={post.slug} post={post} lang={lang} dict={dict} />
          ))}
        </div>

        {/* FAQ section */}
        <div className="mb-16">
          <h2 className="font-display text-2xl text-navy-900 mb-8">
            {lang === 'fr' ? 'Questions Fréquentes' : lang === 'de' ? 'Häufige Fragen' : 'Frequently Asked Questions'}
          </h2>
          <div className="space-y-4">
            {faqData.map((item, i) => (
              <details key={i} className="group bg-white border border-navy-100 rounded-2xl overflow-hidden">
                <summary className="flex items-center justify-between px-6 py-4 cursor-pointer font-semibold text-navy-800 list-none hover:text-green-700 transition-colors">
                  {item.question}
                  <span className="text-green-500 text-lg group-open:rotate-45 transition-transform duration-200 flex-shrink-0 ml-3">+</span>
                </summary>
                <div className="px-6 pb-5 text-navy-600 text-sm leading-relaxed border-t border-navy-50 pt-4">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* Other cluster links */}
        <div>
          <h2 className="font-display text-2xl text-navy-900 mb-6">
            {lang === 'fr' ? 'Autres Guides Thématiques' : lang === 'de' ? 'Weitere Themen-Guides' : 'Explore Other Topic Guides'}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.values(CLUSTERS)
              .filter((c) => c.pillar !== params.cluster)
              .map((c) => (
                <Link key={c.pillar} href={`/${lang}/learn/${c.pillar}`} className={`group bg-gradient-to-br ${c.color} rounded-2xl p-5 text-white hover:opacity-90 transition-all hover:-translate-y-0.5`}>
                  <div className="text-3xl mb-2">{c.emoji}</div>
                  <h3 className="font-display text-base leading-snug mb-1">{c.label}</h3>
                  <p className="text-xs text-white/60">{c.posts.length} articles</p>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
