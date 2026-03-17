'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { getDictionary } from '@/i18n';
import { SITE_URL } from '@/lib/seo';

function calcFIRE(annualExpenses, withdrawalRate, currentSavings, monthlySavings, annualReturn) {
  const fireNumber = annualExpenses / (withdrawalRate / 100);
  if (currentSavings >= fireNumber) {
    return { fireNumber, yearsToFire: 0, alreadyFire: true };
  }
  const r = annualReturn / 100;
  let savings = currentSavings;
  let years = 0;
  while (savings < fireNumber && years < 100) {
    savings = savings * (1 + r) + monthlySavings * 12;
    years++;
  }
  return { fireNumber: Math.round(fireNumber), yearsToFire: years, alreadyFire: false, projectedAge: null };
}

function fmt(n) {
  return `€${Math.round(n).toLocaleString('fr-CH')}`;
}

const milestones = (fireNumber) => [
  { pct: 25, label: '25% — "Coast FIRE adjacent"', color: 'bg-yellow-400' },
  { pct: 50, label: '50% — Halfway there! 🎉', color: 'bg-orange-400' },
  { pct: 75, label: '75% — Almost free!', color: 'bg-green-400' },
  { pct: 100, label: '100% — You\'re FIRE! 🔥', color: 'bg-green-600' },
];

export default function FIREPage({ params }) {
  const lang = params.lang;
  const dict = getDictionary(lang);
  const t = dict.fireCalc;

  const [annualExpenses, setAnnualExpenses] = useState(30000);
  const [withdrawalRate, setWithdrawalRate] = useState(4);
  const [currentSavings, setCurrentSavings] = useState(50000);
  const [monthlySavings, setMonthlySavings] = useState(1000);
  const [annualReturn, setAnnualReturn] = useState(7);

  const result = useMemo(
    () => calcFIRE(annualExpenses, withdrawalRate, currentSavings, monthlySavings, annualReturn),
    [annualExpenses, withdrawalRate, currentSavings, monthlySavings, annualReturn]
  );

  const progressPct = Math.min(100, Math.round((currentSavings / result.fireNumber) * 100));

  // WebApplication structured data for SEO
  const toolSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: lang === 'fr' ? 'Calculateur FIRE' : lang === 'de' ? 'FIRE-Rechner' : 'FIRE Number Calculator',
    description: lang === 'fr' ? "Calculateur FIRE gratuit. Calculez votre nombre FIRE et combien d'années avant la retraite anticipée selon votre taux d'épargne." : lang === 'de' ? 'Kostenloser FIRE-Rechner. Berechnen Sie Ihre FIRE-Zahl und wie viele Jahre bis zur Frühpension basierend auf Ihrer Sparquote.' : 'Free FIRE calculator. Calculate your Financial Independence number and how many years until you can retire early based on your savings rate.',
    url: `${SITE_URL}/${lang}/tools/fire-calculator`,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
    author: { '@type': 'Organization', name: 'Vie Claire', url: SITE_URL },
  };


  return (
    <>
      <section className="relative bg-gradient-to-br from-navy-950 to-navy-900 pt-28 pb-14 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-1/4 w-72 h-72 bg-orange-500 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <span className="text-5xl mb-4 block">🔥</span>
          <h1 className="font-display text-3xl md:text-4xl text-white mb-3">{t.title}</h1>
          <p className="text-white/60">{t.subtitle}</p>
          <div className="mt-4 inline-flex gap-4 text-sm text-white/40">
            <span>F — Financial</span>
            <span>I — Independence</span>
            <span>R — Retire</span>
            <span>E — Early</span>
          </div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Inputs */}
        <div className="bg-white rounded-2xl shadow-sm border border-navy-100 p-6 mb-6">
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { label: t.annualExpenses, val: annualExpenses, set: setAnnualExpenses, min: 5000, max: 150000, step: 1000, prefix: '€' },
              { label: t.withdrawalRate, val: withdrawalRate, set: setWithdrawalRate, min: 2, max: 6, step: 0.25, suffix: '%' },
              { label: t.currentSavings, val: currentSavings, set: setCurrentSavings, min: 0, max: 2000000, step: 5000, prefix: '€' },
              { label: t.monthlySavings, val: monthlySavings, set: setMonthlySavings, min: 0, max: 10000, step: 100, prefix: '€' },
              { label: t.annualReturn, val: annualReturn, set: setAnnualReturn, min: 1, max: 15, step: 0.5, suffix: '%' },
            ].map((f) => (
              <div key={f.label} className={f.label === t.annualReturn ? 'sm:col-span-2' : ''}>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-sm font-semibold text-navy-700">{f.label}</label>
                  <span className="font-display text-lg text-orange-600">
                    {f.prefix || ''}{f.val.toLocaleString()}{f.suffix || ''}
                  </span>
                </div>
                <input
                  type="range"
                  min={f.min} max={f.max} step={f.step}
                  value={f.val}
                  onChange={(e) => f.set(Number(e.target.value))}
                  className="w-full accent-orange-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* FIRE Number big result */}
        <div className={`rounded-2xl p-8 text-center mb-6 ${result.alreadyFire ? 'bg-gradient-to-br from-green-600 to-green-500' : 'bg-gradient-to-br from-orange-600 to-orange-500'} text-white shadow-lg`}>
          {result.alreadyFire ? (
            <>
              <p className="text-3xl mb-2">🎉🔥🎉</p>
              <p className="text-2xl font-display mb-1">{t.results.alreadyThere}</p>
              <p className="text-white/70 text-sm">{lang === 'fr' ? `Votre FIRE number était ${fmt(result.fireNumber)}. C'est fait.` : lang === 'de' ? `Ihre FIRE-Zahl war ${fmt(result.fireNumber)}. Geschafft.` : `Your FIRE number was ${fmt(result.fireNumber)}. You're there.`}</p>
            </>
          ) : (
            <>
              <p className="text-orange-100/70 text-sm mb-1">{t.results.fireNumber}</p>
              <p className="font-display text-5xl mb-2">{fmt(result.fireNumber)}</p>
              <p className="text-orange-100/60 text-sm mb-4">
                {lang === 'fr' ? `= ${annualExpenses.toLocaleString()}€ ÷ ${withdrawalRate}% taux de retrait` : lang === 'de' ? `= ${annualExpenses.toLocaleString()}€ ÷ ${withdrawalRate}% Entnahmerate` : `= €${annualExpenses.toLocaleString()} ÷ ${withdrawalRate}% withdrawal rate`}
              </p>
              <div className="border-t border-white/20 pt-4">
                <p className="text-orange-100/70 text-xs mb-1">{t.results.yearsToFire}</p>
                <p className="font-display text-4xl">
                  {result.yearsToFire} {lang === 'fr' ? 'ans' : lang === 'de' ? 'Jahre' : 'years'}
                </p>
              </div>
            </>
          )}
        </div>

        {/* Progress bar */}
        {!result.alreadyFire && (
          <div className="bg-white rounded-2xl shadow-sm border border-navy-100 p-6 mb-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-display text-lg text-navy-900">
                {lang === 'fr' ? 'Votre Progression' : lang === 'de' ? 'Dein Fortschritt' : 'Your Progress'}
              </h3>
              <span className="font-display text-2xl text-orange-500">{progressPct}%</span>
            </div>
            <div className="h-6 bg-navy-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-orange-400 to-orange-500 rounded-full transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-navy-400 mt-1">
              <span>{fmt(currentSavings)}</span>
              <span>{fmt(result.fireNumber)}</span>
            </div>

            {/* Milestones */}
            <div className="mt-4 space-y-2">
              {milestones(result.fireNumber).map((m) => (
                <div key={m.pct} className="flex items-center gap-3 text-sm">
                  <div className={`w-2 h-2 rounded-full ${progressPct >= m.pct ? m.color : 'bg-navy-200'}`} />
                  <span className={progressPct >= m.pct ? 'text-navy-700 font-medium' : 'text-navy-400'}>
                    {m.label}
                  </span>
                  <span className="ml-auto text-xs text-navy-400">{fmt(result.fireNumber * m.pct / 100)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Explainer */}
        <div className="bg-gold-50 border border-gold-200 rounded-2xl p-5">
          <p className="text-sm text-navy-700 leading-relaxed">
            <span className="font-semibold">🤓 </span>
            {lang === 'fr'
              ? `La règle des 4% (étude Trinity, 1998) montre qu'un portefeuille bien diversifié peut soutenir un retrait annuel de 4% sur 30 ans avec un taux de succès historique de 95%+. En France, une règle de 3-3,5% est plus prudente vue la fiscalité sur les plus-values.`
              : lang === 'de'
              ? `Die 4%-Regel (Trinity-Studie, 1998) zeigt, dass ein diversifiziertes Portfolio jährliche Entnahmen von 4% über 30 Jahre mit historisch 95%+ Erfolgsquote tragen kann. In Deutschland ist 3-3,5% aufgrund der Steuerbelastung auf Kapitalerträge konservativer.`
              : `The 4% rule (Trinity Study, 1998) shows a diversified portfolio can sustain 4% annual withdrawals for 30 years with a 95%+ historical success rate. Adjust down to 3-3.5% for longer retirements or higher tax environments.`}
          </p>
        </div>

        <div className="mt-8 text-center">
          <Link href={`/${lang}/tools`} className="text-sm text-navy-400 hover:text-green-600 transition-colors">
            ← {lang === 'fr' ? 'Tous les outils' : lang === 'de' ? 'Alle Tools' : 'All tools'}
          </Link>
        </div>
      </div>
    </>
  );
}
