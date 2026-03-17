// ─── Site constants ────────────────────────────────────────────────────────────
export const SITE_URL = 'https://www.vieclaire.com';
export const SITE_NAME = 'Vie Claire';
export const SITE_TWITTER = '@vieclaire';

// ─── Topic clusters: pillar page → supporting articles ─────────────────────────
export const CLUSTERS = {
  fire: {
    pillar: 'financial-independence',
    label: 'Financial Independence (FIRE)',
    description: 'Everything you need to achieve financial independence and retire early — from calculating your number to building the right portfolio.',
    emoji: '🔥',
    color: 'from-orange-600 to-red-500',
    posts: [
      'practical-fire-strategy-for-beginners',
      'how-to-calculate-your-financial-independence-number',
      '4-percent-rule-explained-european-investors',
      'how-inflation-affects-financial-independence',
      'reach-financial-independence-average-salary',
      'build-passive-income-with-etfs',
      'how-much-to-invest-monthly-to-reach-financial-freedom',
      'savings-rate-that-changes-your-financial-future',
      'first-100000-euros-hardest-milestone',
      'couple-reached-financial-independence-in-15-years',
      'employee-who-saved-50-percent-of-his-salary',
      'investor-bought-same-etf-every-month-20-years',
      'the-investor-who-ignored-the-market-noise',
      'philosophy-of-financial-independence',
      'real-value-of-financial-independence',
    ],
    relatedTools: ['fire-calculator', 'compound-interest', 'savings-rate'],
    keyQuestions: [
      'What is the FIRE number?',
      'How does the 4% rule work in Europe?',
      'How long does it take to reach financial independence?',
      'What savings rate do I need for early retirement?',
    ],
  },
  investing: {
    pillar: 'investing-basics',
    label: 'Investing for Long-Term Wealth',
    description: 'Build lasting wealth with index funds, ETFs, and proven long-term strategies — without the jargon, fees, or stress.',
    emoji: '📈',
    color: 'from-green-600 to-emerald-500',
    posts: [
      'etf-investing-for-beginners-in-europe',
      'how-compound-interest-builds-wealth-over-time',
      'dollar-cost-averaging-explained',
      'how-to-choose-the-right-etf-portfolio',
      'simple-portfolio-strategy-long-term-wealth',
      'long-term-investing-strategies-that-work',
      'how-to-invest-500-per-month',
      'dividend-investing-vs-index-investing',
      'how-to-rebalance-an-investment-portfolio',
      'biggest-investing-mistakes-beginners-make',
      'stocks-vs-bonds-long-term-returns-explained',
    ],
    relatedTools: ['compound-interest', 'savings-rate'],
    keyQuestions: [
      'What are the best ETFs for European investors?',
      'How does compound interest work?',
      'What is dollar-cost averaging?',
      'Should I invest in dividends or index funds?',
    ],
  },
  budgeting: {
    pillar: 'budgeting-guide',
    label: 'Budgeting & Saving Money',
    description: 'Master your monthly budget, cut unnecessary expenses, and build real savings habits — without feeling like you are on a financial diet.',
    emoji: '💡',
    color: 'from-blue-600 to-cyan-500',
    posts: [
      '50-30-20-budget-rule-explained',
      'best-budget-systems-that-actually-work',
      'how-to-track-expenses-efficiently',
      'automating-your-personal-finances',
      'how-to-live-below-your-means',
      'reduce-monthly-expenses-without-feeling-poor',
      'how-to-save-50-percent-of-your-income',
      'how-to-save-10000-euros-in-one-year',
      'most-effective-ways-to-increase-your-savings-rate',
    ],
    relatedTools: ['savings-rate', 'gross-to-net'],
    keyQuestions: [
      'What is the 50/30/20 budget rule?',
      'How do I track my expenses?',
      'How can I save €10,000 in a year?',
      'What is a good savings rate?',
    ],
  },
  markets: {
    pillar: 'stock-market-guide',
    label: 'Markets & Asset History',
    description: 'Understand how markets actually behave over decades — stock market history, crashes, recoveries, gold vs stocks, and what history teaches investors.',
    emoji: '📊',
    color: 'from-indigo-600 to-violet-500',
    posts: [
      'stock-market-history',
      'stock-market-returns-over-the-last-100-years',
      'long-term-stock-market-returns-explained',
      'biggest-stock-market-crashes-in-history',
      'how-markets-recovered-after-every-major-crash',
      'best-performing-assets-of-the-last-century',
      'gold-vs-stocks-50-years-performance',
      'gold-vs-stocks-vs-real-estate-50-years-of-data',
      'bitcoin-vs-gold-vs-stocks-historical-comparison',
      'gold-vs-inflation-historical-analysis',
      'history-of-gold-prices-over-the-last-100-years',
      'gold-price-cycles-and-what-they-mean-for-investors',
      'why-gold-prices-rise-during-economic-crises',
      'how-economic-cycles-influence-investments',
      'how-inflation-destroys-wealth-over-time',
      'lessons-from-the-2008-financial-crisis',
      'lessons-from-the-dot-com-bubble',
      'why-financial-bubbles-keep-repeating',
      'what-100-years-of-financial-history-teach-investors',
      'inflation-and-monetary-systems',
      'inflation-over-the-last-100-years',
      'end-of-the-gold-standard-explained',
      'history-of-interest-rates-and-their-impact',
      'a-century-of-inflation-how-money-loses-value-over-time',
      'gold-as-an-inflation-hedge-what-history-shows',
      'gold-during-crises-patterns-across-decades',
      'how-inflation-reshapes-investment-outcomes',
      'interest-rates-through-history-and-their-impact-on-investors',
      'real-vs-nominal-returns-historical-comparison',
      'hidden-erosion-of-wealth-through-inflation',
      'long-term-trajectory-of-equity-markets-explained',
      'what-drives-gold-prices-over-the-long-term',
      'what-long-term-data-says-about-staying-invested',
      'why-markets-trend-upward-over-time-and-when-they-dont',
    ],
    relatedTools: ['compound-interest'],
    keyQuestions: [
      'What are average stock market returns over 100 years?',
      'How long does it take markets to recover after a crash?',
      'Is gold a good inflation hedge?',
      'How does Bitcoin compare to gold and stocks historically?',
    ],
  },
  mindset: {
    pillar: 'opportunity-cost-guide',
    label: 'Financial Mindset & Opportunity Cost',
    description: 'Every financial decision has a hidden price. Learn to think in opportunity costs and make smarter money choices in everyday life.',
    emoji: '🧠',
    color: 'from-purple-600 to-pink-500',
    posts: [
      'opportunity-cost-hidden-price-of-every-financial-decision',
      'how-opportunity-cost-explains-most-financial-mistakes',
      'opportunity-cost-in-everyday-life',
      'opportunity-cost-applied',
      'opportunity-cost-and-the-value-of-time',
      'why-every-purchase-is-also-an-investment-decision',
      'spending-vs-investing-how-to-think-about-money',
      'opportunity-cost-of-not-investing-early',
      'opportunity-cost-of-buying-a-new-car',
      'opportunity-cost-of-buying-a-bigger-house',
      'opportunity-cost-of-lifestyle-inflation',
      'the-20000-euro-car-that-actually-cost-70000',
      'psychology-of-money-and-happiness',
      'why-financial-behavior-matters-more-than-income',
      'why-financial-freedom-is-really-about-time',
      'why-freedom-is-the-real-purpose-of-money',
      'concept-of-enough-in-personal-finance',
      'difference-between-a-rich-life-and-an-expensive-life',
      'difference-between-looking-rich-and-being-wealthy',
      'why-patience-is-the-most-underrated-financial-skill',
      'quiet-discipline-behind-long-term-wealth',
    ],
    relatedTools: ['compound-interest', 'savings-rate'],
    keyQuestions: [
      'What is opportunity cost in personal finance?',
      'Is buying a new car a good financial decision?',
      'What is the opportunity cost of not investing early?',
      'How does lifestyle inflation destroy wealth?',
    ],
  },
};

// ─── Cross-link map: slug → array of related slugs ─────────────────────────────
// Built from cluster membership + semantic proximity
export const CROSS_LINKS = {
  // FIRE cluster
  'practical-fire-strategy-for-beginners': [
    'how-to-calculate-your-financial-independence-number',
    '4-percent-rule-explained-european-investors',
    'savings-rate-that-changes-your-financial-future',
    'etf-investing-for-beginners-in-europe',
  ],
  'how-to-calculate-your-financial-independence-number': [
    '4-percent-rule-explained-european-investors',
    'how-inflation-affects-financial-independence',
    'how-much-to-invest-monthly-to-reach-financial-freedom',
    'savings-rate-that-changes-your-financial-future',
  ],
  '4-percent-rule-explained-european-investors': [
    'how-to-calculate-your-financial-independence-number',
    'how-inflation-affects-financial-independence',
    'practical-fire-strategy-for-beginners',
    'stocks-vs-bonds-long-term-returns-explained',
  ],
  'how-inflation-affects-financial-independence': [
    '4-percent-rule-explained-european-investors',
    'gold-vs-inflation-historical-analysis',
    'stocks-vs-bonds-long-term-returns-explained',
    'how-to-calculate-your-financial-independence-number',
  ],
  'reach-financial-independence-average-salary': [
    'practical-fire-strategy-for-beginners',
    'most-effective-ways-to-increase-your-savings-rate',
    'how-to-save-50-percent-of-your-income',
    'how-much-to-invest-monthly-to-reach-financial-freedom',
  ],
  'build-passive-income-with-etfs': [
    'etf-investing-for-beginners-in-europe',
    'dividend-investing-vs-index-investing',
    'how-to-choose-the-right-etf-portfolio',
    'simple-portfolio-strategy-long-term-wealth',
  ],
  // Investing cluster
  'etf-investing-for-beginners-in-europe': [
    'how-to-choose-the-right-etf-portfolio',
    'dollar-cost-averaging-explained',
    'simple-portfolio-strategy-long-term-wealth',
    'biggest-investing-mistakes-beginners-make',
  ],
  'how-compound-interest-builds-wealth-over-time': [
    'first-100000-euros-hardest-milestone',
    'dollar-cost-averaging-explained',
    'opportunity-cost-of-not-investing-early',
    'how-much-to-invest-monthly-to-reach-financial-freedom',
  ],
  'dollar-cost-averaging-explained': [
    'etf-investing-for-beginners-in-europe',
    'biggest-investing-mistakes-beginners-make',
    'how-to-invest-500-per-month',
    'long-term-investing-strategies-that-work',
  ],
  'first-100000-euros-hardest-milestone': [
    'how-compound-interest-builds-wealth-over-time',
    'savings-rate-that-changes-your-financial-future',
    'opportunity-cost-of-not-investing-early',
    'most-effective-ways-to-increase-your-savings-rate',
  ],
  'biggest-investing-mistakes-beginners-make': [
    'etf-investing-for-beginners-in-europe',
    'dollar-cost-averaging-explained',
    'how-to-choose-the-right-etf-portfolio',
    'opportunity-cost-hidden-price-of-every-financial-decision',
  ],
  'dividend-investing-vs-index-investing': [
    'etf-investing-for-beginners-in-europe',
    'simple-portfolio-strategy-long-term-wealth',
    'how-to-rebalance-an-investment-portfolio',
    'stocks-vs-bonds-long-term-returns-explained',
  ],
  'stocks-vs-bonds-long-term-returns-explained': [
    'how-to-rebalance-an-investment-portfolio',
    'simple-portfolio-strategy-long-term-wealth',
    '4-percent-rule-explained-european-investors',
    'long-term-stock-market-returns-explained',
  ],
  'savings-rate-that-changes-your-financial-future': [
    'most-effective-ways-to-increase-your-savings-rate',
    'how-to-save-50-percent-of-your-income',
    'practical-fire-strategy-for-beginners',
    'first-100000-euros-hardest-milestone',
  ],
  // Budgeting cluster
  '50-30-20-budget-rule-explained': [
    'best-budget-systems-that-actually-work',
    'how-to-track-expenses-efficiently',
    'automating-your-personal-finances',
    'savings-rate-that-changes-your-financial-future',
  ],
  'best-budget-systems-that-actually-work': [
    '50-30-20-budget-rule-explained',
    'how-to-track-expenses-efficiently',
    'automating-your-personal-finances',
    'how-to-live-below-your-means',
  ],
  'how-to-save-10000-euros-in-one-year': [
    'most-effective-ways-to-increase-your-savings-rate',
    'reduce-monthly-expenses-without-feeling-poor',
    '50-30-20-budget-rule-explained',
    'how-to-track-expenses-efficiently',
  ],
  'how-to-save-50-percent-of-your-income': [
    'savings-rate-that-changes-your-financial-future',
    'how-to-live-below-your-means',
    'automating-your-personal-finances',
    'opportunity-cost-of-lifestyle-inflation',
  ],
  // Markets cluster
  'stock-market-history': [
    'long-term-stock-market-returns-explained',
    'biggest-stock-market-crashes-in-history',
    'how-markets-recovered-after-every-major-crash',
    'best-performing-assets-of-the-last-century',
  ],
  'biggest-stock-market-crashes-in-history': [
    'how-markets-recovered-after-every-major-crash',
    'stock-market-history',
    'long-term-stock-market-returns-explained',
    'gold-vs-inflation-historical-analysis',
  ],
  'how-markets-recovered-after-every-major-crash': [
    'biggest-stock-market-crashes-in-history',
    'long-term-investing-strategies-that-work',
    'dollar-cost-averaging-explained',
    'stock-market-returns-over-the-last-100-years',
  ],
  'gold-vs-inflation-historical-analysis': [
    'gold-vs-stocks-50-years-performance',
    'gold-price-cycles-and-what-they-mean-for-investors',
    'history-of-gold-prices-over-the-last-100-years',
    'how-inflation-affects-financial-independence',
  ],
  'bitcoin-vs-gold-vs-stocks-historical-comparison': [
    'gold-vs-stocks-50-years-performance',
    'best-performing-assets-of-the-last-century',
    'gold-vs-inflation-historical-analysis',
    'biggest-investing-mistakes-beginners-make',
  ],
  // Mindset cluster
  'opportunity-cost-hidden-price-of-every-financial-decision': [
    'how-opportunity-cost-explains-most-financial-mistakes',
    'opportunity-cost-in-everyday-life',
    'why-every-purchase-is-also-an-investment-decision',
    'spending-vs-investing-how-to-think-about-money',
  ],
  'opportunity-cost-of-buying-a-new-car': [
    'opportunity-cost-of-buying-a-bigger-house',
    'opportunity-cost-of-lifestyle-inflation',
    'how-opportunity-cost-explains-most-financial-mistakes',
    'spending-vs-investing-how-to-think-about-money',
  ],
  'opportunity-cost-of-not-investing-early': [
    'how-compound-interest-builds-wealth-over-time',
    'first-100000-euros-hardest-milestone',
    'opportunity-cost-hidden-price-of-every-financial-decision',
    'dollar-cost-averaging-explained',
  ],
  'opportunity-cost-of-lifestyle-inflation': [
    'how-to-live-below-your-means',
    'opportunity-cost-of-buying-a-new-car',
    'savings-rate-that-changes-your-financial-future',
    'spending-vs-investing-how-to-think-about-money',
  ],

  // ── Batch 2: FIRE stories ────────────────────────────────────────────────
  'couple-reached-financial-independence-in-15-years': [
    'employee-who-saved-50-percent-of-his-salary',
    'practical-fire-strategy-for-beginners',
    'savings-rate-that-changes-your-financial-future',
    'first-100000-euros-hardest-milestone',
  ],
  'employee-who-saved-50-percent-of-his-salary': [
    'couple-reached-financial-independence-in-15-years',
    'how-to-save-50-percent-of-your-income',
    'savings-rate-that-changes-your-financial-future',
    'philosophy-of-financial-independence',
  ],
  'investor-bought-same-etf-every-month-20-years': [
    'dollar-cost-averaging-explained',
    'how-compound-interest-builds-wealth-over-time',
    'why-consistency-beats-intelligence-in-investing',
    'long-term-investing-strategies-that-work',
  ],
  'the-investor-who-ignored-the-market-noise': [
    'investor-bought-same-etf-every-month-20-years',
    'why-patience-is-the-most-underrated-financial-skill',
    'long-term-investing-strategies-that-work',
    'how-markets-recovered-after-every-major-crash',
  ],
  'philosophy-of-financial-independence': [
    'real-value-of-financial-independence',
    'concept-of-enough-in-personal-finance',
    'why-financial-freedom-is-really-about-time',
    'why-freedom-is-the-real-purpose-of-money',
  ],
  'real-value-of-financial-independence': [
    'philosophy-of-financial-independence',
    'why-financial-freedom-is-really-about-time',
    'meaning-of-financial-security',
    'couple-reached-financial-independence-in-15-years',
  ],
  // ── Batch 2: Markets ─────────────────────────────────────────────────────
  'lessons-from-the-2008-financial-crisis': [
    'lessons-from-the-dot-com-bubble',
    'why-financial-bubbles-keep-repeating',
    'how-markets-recovered-after-every-major-crash',
    'psychology-behind-market-booms-and-crashes',
  ],
  'lessons-from-the-dot-com-bubble': [
    'lessons-from-the-2008-financial-crisis',
    'why-financial-bubbles-keep-repeating',
    'psychology-behind-market-booms-and-crashes',
    'most-important-financial-lessons-from-history',
  ],
  'why-financial-bubbles-keep-repeating': [
    'lessons-from-the-2008-financial-crisis',
    'lessons-from-the-dot-com-bubble',
    'psychology-behind-market-booms-and-crashes',
    'how-markets-recovered-after-every-major-crash',
  ],
  'how-inflation-destroys-wealth-over-time': [
    'gold-vs-inflation-historical-analysis',
    'why-cash-loses-value-over-time',
    'inflation-over-the-last-100-years',
    'how-inflation-affects-financial-independence',
  ],
  'inflation-over-the-last-100-years': [
    'how-inflation-destroys-wealth-over-time',
    'gold-vs-inflation-historical-analysis',
    'inflation-and-monetary-systems',
    'why-cash-loses-value-over-time',
  ],
  'what-100-years-of-financial-history-teach-investors': [
    'most-important-financial-lessons-from-history',
    'long-term-trend-of-wealth-creation',
    'best-performing-assets-of-the-last-century',
    'stock-market-returns-over-the-last-100-years',
  ],
  'how-economic-cycles-influence-investments': [
    'history-of-interest-rates-and-their-impact',
    'lessons-from-the-2008-financial-crisis',
    'long-term-stock-market-returns-explained',
    'how-markets-recovered-after-every-major-crash',
  ],
  // ── Batch 2: Mindset ─────────────────────────────────────────────────────
  'the-20000-euro-car-that-actually-cost-70000': [
    'opportunity-cost-of-buying-a-new-car',
    'opportunity-cost-of-lifestyle-inflation',
    'difference-between-looking-rich-and-being-wealthy',
    'why-owning-less-can-make-you-wealthier',
  ],
  'psychology-of-money-and-happiness': [
    'concept-of-enough-in-personal-finance',
    'difference-between-a-rich-life-and-an-expensive-life',
    'why-freedom-is-the-real-purpose-of-money',
    'meaning-of-financial-security',
  ],
  'why-financial-behavior-matters-more-than-income': [
    'two-friends-same-salary-why-one-became-wealthy',
    'why-consistency-beats-intelligence-in-investing',
    'quiet-discipline-behind-long-term-wealth',
    'why-financial-freedom-is-really-about-time',
  ],
  'two-friends-same-salary-why-one-became-wealthy': [
    'why-financial-behavior-matters-more-than-income',
    'difference-between-looking-rich-and-being-wealthy',
    'savings-rate-that-changes-your-financial-future',
    'opportunity-cost-of-lifestyle-inflation',
  ],
  'why-consistency-beats-intelligence-in-investing': [
    'investor-bought-same-etf-every-month-20-years',
    'dollar-cost-averaging-explained',
    'why-patience-is-the-most-underrated-financial-skill',
    'long-term-investing-strategies-that-work',
  ],
  'why-patience-is-the-most-underrated-financial-skill': [
    'why-consistency-beats-intelligence-in-investing',
    'the-investor-who-ignored-the-market-noise',
    'quiet-discipline-behind-long-term-wealth',
    'long-term-investing-strategies-that-work',
  ],
  'concept-of-enough-in-personal-finance': [
    'psychology-of-money-and-happiness',
    'difference-between-a-rich-life-and-an-expensive-life',
    'why-freedom-is-the-real-purpose-of-money',
    'meaning-of-financial-security',
  ],
  'difference-between-looking-rich-and-being-wealthy': [
    'the-20000-euro-car-that-actually-cost-70000',
    'quiet-millionaire-mindset',
    'two-friends-same-salary-why-one-became-wealthy',
    'why-financial-behavior-matters-more-than-income',
  ],
  'quiet-discipline-behind-long-term-wealth': [
    'why-patience-is-the-most-underrated-financial-skill',
    'why-consistency-beats-intelligence-in-investing',
    'why-ordinary-people-can-build-extraordinary-wealth',
    'slow-path-to-wealth-that-actually-works',
  ],
  'why-ordinary-people-can-build-extraordinary-wealth': [
    'quiet-discipline-behind-long-term-wealth',
    'why-consistency-beats-intelligence-in-investing',
    'slow-path-to-wealth-that-actually-works',
    'first-100000-euros-hardest-milestone',
  ],
  'slow-path-to-wealth-that-actually-works': [
    'why-ordinary-people-can-build-extraordinary-wealth',
    'quiet-discipline-behind-long-term-wealth',
    'long-term-investing-strategies-that-work',
    'investor-bought-same-etf-every-month-20-years',
  ],
  'why-financial-freedom-is-really-about-time': [
    'why-freedom-is-the-real-purpose-of-money',
    'philosophy-of-financial-independence',
    'how-money-changes-your-relationship-with-time',
    'real-value-of-financial-independence',
  ],
  'why-freedom-is-the-real-purpose-of-money': [
    'why-financial-freedom-is-really-about-time',
    'philosophy-of-financial-independence',
    'concept-of-enough-in-personal-finance',
    'meaning-of-financial-security',
  ],
  'why-simplicity-is-a-powerful-financial-strategy': [
    'why-owning-less-can-make-you-wealthier',
    'family-who-chose-simplicity-over-luxury',
    'difference-between-a-rich-life-and-an-expensive-life',
    'concept-of-enough-in-personal-finance',
  ],
  'why-owning-less-can-make-you-wealthier': [
    'why-simplicity-is-a-powerful-financial-strategy',
    'family-who-chose-simplicity-over-luxury',
    'opportunity-cost-of-lifestyle-inflation',
    'the-20000-euro-car-that-actually-cost-70000',
  ],

  // ── EN batch 3: Gold & Inflation cluster ────────────────────────────────
  'a-century-of-inflation-how-money-loses-value-over-time': [
    'how-inflation-destroys-wealth-over-time',
    'hidden-erosion-of-wealth-through-inflation',
    'gold-as-an-inflation-hedge-what-history-shows',
    'why-cash-underperforms-over-long-periods',
  ],
  'gold-as-an-inflation-hedge-what-history-shows': [
    'gold-during-crises-patterns-across-decades',
    'gold-vs-fiat-currencies-long-term-comparison',
    'a-century-of-inflation-how-money-loses-value-over-time',
    'gold-vs-inflation-historical-analysis',
  ],
  'gold-during-crises-patterns-across-decades': [
    'gold-as-an-inflation-hedge-what-history-shows',
    'lessons-from-the-2008-financial-crisis',
    'why-financial-bubbles-keep-repeating',
    'how-markets-recovered-after-every-major-crash',
  ],
  'how-inflation-reshapes-investment-outcomes': [
    'a-century-of-inflation-how-money-loses-value-over-time',
    'real-vs-nominal-returns-historical-comparison',
    'inflation-and-asset-allocation',
    'gold-as-an-inflation-hedge-what-history-shows',
  ],
  'real-vs-nominal-returns-historical-comparison': [
    'how-inflation-reshapes-investment-outcomes',
    'long-term-trajectory-of-equity-markets-explained',
    'persistence-of-equity-risk-premiums-over-time',
    'why-cash-underperforms-over-long-periods',
  ],
  'interest-rates-through-history-and-their-impact-on-investors': [
    'history-of-interest-rates-and-their-impact',
    'impact-of-monetary-policy-on-long-term-wealth',
    'how-economic-cycles-influence-investments',
    'real-vs-nominal-returns-historical-comparison',
  ],
  'long-term-trajectory-of-equity-markets-explained': [
    'what-long-term-data-says-about-staying-invested',
    'why-markets-trend-upward-over-time-and-when-they-dont',
    'stock-market-returns-over-the-last-100-years',
    'persistence-of-equity-risk-premiums-over-time',
  ],
  'what-long-term-data-says-about-staying-invested': [
    'long-term-trajectory-of-equity-markets-explained',
    'why-markets-trend-upward-over-time-and-when-they-dont',
    'dollar-cost-averaging-explained',
    'long-term-investing-strategies-that-work',
  ],
  'why-markets-trend-upward-over-time-and-when-they-dont': [
    'what-long-term-data-says-about-staying-invested',
    'how-markets-recovered-after-every-major-crash',
    'biggest-stock-market-crashes-in-history',
    'long-term-trajectory-of-equity-markets-explained',
  ],
  'hidden-erosion-of-wealth-through-inflation': [
    'a-century-of-inflation-how-money-loses-value-over-time',
    'why-cash-underperforms-over-long-periods',
    'long-term-decline-of-purchasing-power-explained',
    'gold-as-an-inflation-hedge-what-history-shows',
  ],
  'why-cash-underperforms-over-long-periods': [
    'hidden-erosion-of-wealth-through-inflation',
    'real-vs-nominal-returns-historical-comparison',
    'how-compound-interest-builds-wealth-over-time',
    'long-term-investing-strategies-that-work',
  ],
  'what-drives-gold-prices-over-the-long-term': [
    'gold-as-an-inflation-hedge-what-history-shows',
    'gold-price-cycles-and-what-they-mean-for-investors',
    'gold-vs-inflation-historical-analysis',
    'gold-during-crises-patterns-across-decades',
  ],
};

// ─── Get cluster for a post slug ───────────────────────────────────────────────
export function getClusterForPost(slug) {
  for (const [key, cluster] of Object.entries(CLUSTERS)) {
    if (cluster.posts.includes(slug)) return { key, ...cluster };
  }
  return null;
}

// ─── Get cross-links for a post (from map, or fallback to same category) ───────
export function getCrossLinks(slug, allPosts, limit = 4) {
  const mapped = CROSS_LINKS[slug];
  if (mapped) {
    return mapped
      .map((s) => allPosts.find((p) => p.slug === s))
      .filter(Boolean)
      .slice(0, limit);
  }
  // Fallback: same category, prefer same lang, different post
  const current = allPosts.find((p) => p.slug === slug);
  if (!current) return [];
  const sameLang = allPosts.filter(
    (p) => p.slug !== slug && p.category === current.category && p.lang === current.lang
  );
  if (sameLang.length >= limit) return sameLang.slice(0, limit);
  // Top up with other-lang posts if needed
  const otherLang = allPosts.filter(
    (p) => p.slug !== slug && p.category === current.category && p.lang !== current.lang
  );
  return [...sameLang, ...otherLang].slice(0, limit);
}

// ─── Full URL helpers ──────────────────────────────────────────────────────────
export function postUrl(lang, slug) {
  return `${SITE_URL}/${lang}/blog/${slug}`;
}
export function clusterUrl(lang, pillar) {
  return `${SITE_URL}/${lang}/learn/${pillar}`;
}
export function toolUrl(lang, tool) {
  return `${SITE_URL}/${lang}/tools/${tool}`;
}
