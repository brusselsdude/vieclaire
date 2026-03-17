'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { getDictionary } from '@/i18n';
import { SITE_URL } from '@/lib/seo';

function getAssessment(rate, lang) {
  if (lang === 'fr') {
    if (rate < 5) return { emoji: '😬', label: 'Danger Zone', desc: "Un coup dur et vous êtes dans le rouge. Priorité : fonds d'urgence d'abord.", color: 'text-red-600', bg: 'bg-red-50 border-red-200' };
    if (rate < 10) return { emoji: '😐', label: 'Fragile', desc: "Vous épargnez, mais à peine. La moindre dépense imprévue peut tout dérailler.", color: 'text-orange-600', bg: 'bg-orange-50 border-orange-200' };
    if (rate < 20) return { emoji: '🙂', label: 'Pas Mal', desc: "Dans la moyenne. Vous construisez quelque chose, mais doucement. Essayez d'atteindre 20%.", color: 'text-yellow-600', bg: 'bg-yellow-50 border-yellow-200' };
    if (rate < 30) return { emoji: '😊', label: 'Bien !', desc: "Vous êtes clairement au-dessus de la moyenne. Continuez, la liberté financière se rapproche.", color: 'text-green-600', bg: 'bg-green-50 border-green-200' };
    if (rate < 50) return { emoji: '🚀', label: 'Excellent !', desc: "Wow. Vous épargnez sérieusement. Vous avancez vers l'indépendance financière à grande vitesse.", color: 'text-green-700', bg: 'bg-green-50 border-green-300' };
    return { emoji: '🔥', label: 'Territoire FIRE !', desc: "Vous êtes dans la cour des grands. À ce rythme, la retraite anticipée est à votre portée.", color: 'text-orange-600', bg: 'bg-orange-50 border-orange-300' };
  }
  if (lang === 'de') {
    if (rate < 5) return { emoji: '😬', label: 'Gefährlich', desc: "Ein unerwarteter Schlag und Sie sind in den Roten. Priorität: erstmal Notgroschen aufbauen.", color: 'text-red-600', bg: 'bg-red-50 border-red-200' };
    if (rate < 10) return { emoji: '😐', label: 'Fragil', desc: "Sie sparen, aber kaum. Jede unvorhergesehene Ausgabe kann alles zunichte machen.", color: 'text-orange-600', bg: 'bg-orange-50 border-orange-200' };
    if (rate < 20) return { emoji: '🙂', label: 'In Ordnung', desc: "Durchschnittlich. Sie bauen etwas auf, aber langsam. Versuche, 20% zu erreichen.", color: 'text-yellow-600', bg: 'bg-yellow-50 border-yellow-200' };
    if (rate < 30) return { emoji: '😊', label: 'Gut!', desc: "Deutlich über dem Durchschnitt. Weitermachen — die finanzielle Freiheit rückt näher.", color: 'text-green-600', bg: 'bg-green-50 border-green-200' };
    if (rate < 50) return { emoji: '🚀', label: 'Ausgezeichnet!', desc: "Wow. Sie sparen ernsthaft. Finanzielle Unabhängigkeit ist auf dem schnellen Weg.", color: 'text-green-700', bg: 'bg-green-50 border-green-300' };
    return { emoji: '🔥', label: 'FIRE-Territorium!', desc: "In diesem Tempo ist die Frührente in Reichweite. Das ist die Profi-Liga.", color: 'text-orange-600', bg: 'bg-orange-50 border-orange-300' };
  }
  // EN
  if (rate < 5) return { emoji: '😬', label: 'Danger Zone', desc: "One bad month and you're in trouble. Priority one: build a cash buffer.", color: 'text-red-600', bg: 'bg-red-50 border-red-200' };
  if (rate < 10) return { emoji: '😐', label: 'Fragile', desc: "You're saving, barely. Any unexpected expense can derail everything.", color: 'text-orange-600', bg: 'bg-orange-50 border-orange-200' };
  if (rate < 20) return { emoji: '🙂', label: 'Not Bad', desc: "Around average. You're building something, slowly. Try to push to 20%.", color: 'text-yellow-600', bg: 'bg-yellow-50 border-yellow-200' };
  if (rate < 30) return { emoji: '😊', label: 'Good!', desc: "Clearly above average. Keep going — financial freedom is getting closer.", color: 'text-green-600', bg: 'bg-green-50 border-green-200' };
  if (rate < 50) return { emoji: '🚀', label: 'Excellent!', desc: "Wow. You're saving seriously. Financial independence on the express track.", color: 'text-green-700', bg: 'bg-green-50 border-green-300' };
  return { emoji: '🔥', label: 'FIRE Territory!', desc: "At this rate, early retirement is very much within reach. Welcome to the big leagues.", color: 'text-orange-600', bg: 'bg-orange-50 border-orange-300' };
}

// How many years to FI based on savings rate
function yearsToFI(rate) {
  if (rate <= 0) return '∞';
  // Based on Mr. Money Mustache's classic table (assumes 5% real return, 4% withdrawal)
  const table = [
    [5, 66], [10, 51], [15, 43], [20, 37], [25, 32], [30, 28],
    [35, 25], [40, 22], [45, 19], [50, 17], [55, 14.5], [60, 12.5],
    [65, 10.5], [70, 8.5], [75, 7], [80, 5.5], [85, 4], [90, 3], [95, 2],
  ];
  let closest = table[0];
  for (const row of table) {
    if (Math.abs(row[0] - rate) < Math.abs(closest[0] - rate)) closest = row;
  }
  return closest[1];
}

export default function SavingsRatePage({ params }) {
  const lang = params.lang;
  const dict = getDictionary(lang);
  const t = dict.savingsRate;

  const [income, setIncome] = useState(3000);
  const [expenses, setExpenses] = useState(2200);

  const savings = Math.max(0, income - expenses);
  const rate = income > 0 ? Math.round((savings / income) * 100) : 0;
  const assessment = getAssessment(rate, lang);
  const yFI = yearsToFI(rate);

  const donut = Math.max(0, Math.min(100, rate));
  const circumference = 2 * Math.PI * 45;
  const dashOffset = circumference - (donut / 100) * circumference;

  // WebApplication structured data for SEO
  const toolSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: lang === 'fr' ? "Calculateur Taux d'Épargne" : lang === 'de' ? 'Sparquoten-Rechner' : 'Savings Rate Calculator',
    description: lang === 'fr' ? "Calculateur de taux d'épargne gratuit. Entrez vos revenus et dépenses pour calculer votre taux d'épargne et années jusqu'à l'indépendance financière." : lang === 'de' ? 'Kostenloser Sparquoten-Rechner. Einkommen und Ausgaben eingeben, um Sparquote und Jahre bis zur finanziellen Freiheit zu berechnen.' : 'Free savings rate calculator. Enter your income and expenses to find your savings rate, monthly savings, and years to financial independence.',
    url: `${SITE_URL}/${lang}/tools/savings-rate`,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
    author: { '@type': 'Organization', name: 'Vie Claire', url: SITE_URL },
  };


  return (
    <>
      <section className="relative bg-gradient-to-br from-navy-950 to-navy-900 pt-28 pb-14 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-1/4 w-72 h-72 bg-purple-500 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <span className="text-5xl mb-4 block">💰</span>
          <h1 className="font-display text-3xl md:text-4xl text-white mb-3">{t.title}</h1>
          <p className="text-white/60">{t.subtitle}</p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Inputs */}
          <div className="bg-white rounded-2xl shadow-sm border border-navy-100 p-6">
            <div className="space-y-6">
              {[
                { label: t.monthlyIncome, val: income, set: setIncome, min: 500, max: 20000, step: 100, color: 'accent-green-500' },
                { label: t.monthlyExpenses, val: expenses, set: setExpenses, min: 0, max: 20000, step: 100, color: 'accent-red-400' },
              ].map((f) => (
                <div key={f.label}>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-sm font-semibold text-navy-700">{f.label}</label>
                    <span className="font-display text-lg text-navy-800">€{f.val.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min={f.min} max={f.max} step={f.step}
                    value={f.val}
                    onChange={(e) => f.set(Number(e.target.value))}
                    className={`w-full ${f.color}`}
                  />
                  <div className="flex justify-between text-xs text-navy-400 mt-0.5">
                    <span>€{f.min}</span><span>€{f.max.toLocaleString()}</span>
                  </div>
                </div>
              ))}

              {/* Monthly breakdown */}
              <div className="border-t border-navy-100 pt-4 space-y-2">
                {[
                  { label: lang === 'fr' ? 'Revenu' : lang === 'de' ? 'Einkommen' : 'Income', value: income, color: 'text-green-600' },
                  { label: lang === 'fr' ? 'Dépenses' : lang === 'de' ? 'Ausgaben' : 'Expenses', value: -expenses, color: 'text-red-500' },
                  { label: t.results.monthlySavings, value: savings, color: savings >= 0 ? 'text-navy-900 font-bold' : 'text-red-600 font-bold' },
                ].map((r) => (
                  <div key={r.label} className="flex justify-between text-sm">
                    <span className="text-navy-500">{r.label}</span>
                    <span className={r.color}>
                      {r.value < 0 ? '−' : r.value > 0 && r.label !== (lang === 'fr' ? 'Revenu' : lang === 'de' ? 'Einkommen' : 'Income') ? '+' : ''}€{Math.abs(r.value).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Donut + rate */}
          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-2xl shadow-sm border border-navy-100 p-6 flex flex-col items-center">
              <h3 className="font-display text-lg text-navy-900 mb-4">{t.results.savingsRate}</h3>
              <div className="relative">
                <svg width="120" height="120" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="10" />
                  <circle
                    cx="50" cy="50" r="45" fill="none"
                    stroke={rate >= 50 ? '#f97316' : rate >= 20 ? '#22c55e' : rate >= 10 ? '#eab308' : '#ef4444'}
                    strokeWidth="10"
                    strokeDasharray={circumference}
                    strokeDashoffset={dashOffset}
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                    style={{ transition: 'stroke-dashoffset 0.5s ease' }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-display text-3xl text-navy-900">{rate}%</span>
                </div>
              </div>
              <p className="text-2xl mt-2">{assessment.emoji}</p>
              <p className={`font-semibold text-lg mt-1 ${assessment.color}`}>{assessment.label}</p>
            </div>

            {/* Years to FI */}
            <div className="bg-gradient-to-br from-purple-600 to-purple-500 rounded-2xl p-5 text-white text-center">
              <p className="text-purple-200/70 text-xs mb-1">
                {lang === 'fr' ? 'Années jusqu\'à l\'indépendance financière' : lang === 'de' ? 'Jahre bis zur finanziellen Freiheit' : 'Years to Financial Independence'}
              </p>
              <p className="font-display text-4xl">{yFI}</p>
              <p className="text-purple-200/60 text-xs mt-1">
                {lang === 'fr' ? '(règle des 4%, rendement réel 5%)' : lang === 'de' ? '(4%-Regel, 5% Realrendite)' : '(4% rule, 5% real return)'}
              </p>
            </div>
          </div>
        </div>

        {/* Assessment */}
        <div className={`mt-6 border rounded-2xl p-5 ${assessment.bg}`}>
          <div className="flex items-start gap-3">
            <span className="text-3xl">{assessment.emoji}</span>
            <div>
              <h3 className={`font-display text-xl ${assessment.color} mb-1`}>{assessment.label}</h3>
              <p className="text-sm text-navy-600">{assessment.desc}</p>
            </div>
          </div>
        </div>

        {/* Context table */}
        <div className="mt-6 bg-white rounded-2xl shadow-sm border border-navy-100 p-6">
          <h3 className="font-display text-lg text-navy-900 mb-4">
            {lang === 'fr' ? 'Taux d\'Épargne → Années jusqu\'au FIRE' : lang === 'de' ? 'Sparquote → Jahre bis FIRE' : 'Savings Rate → Years to FIRE'}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { rate: 10, years: 51 }, { rate: 20, years: 37 }, { rate: 30, years: 28 },
              { rate: 40, years: 22 }, { rate: 50, years: 17 }, { rate: 60, years: 12.5 },
              { rate: 70, years: 8.5 }, { rate: 80, years: 5.5 },
            ].map((row) => (
              <div
                key={row.rate}
                className={`rounded-xl px-3 py-2.5 text-center transition-all ${
                  Math.abs(row.rate - rate) < 5
                    ? 'bg-green-100 border-2 border-green-400'
                    : 'bg-navy-50 border border-navy-100'
                }`}
              >
                <p className="font-semibold text-navy-700 text-sm">{row.rate}%</p>
                <p className="text-xs text-navy-400">{row.years} {lang === 'fr' ? 'ans' : lang === 'de' ? 'J.' : 'yrs'}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-navy-400 mt-3">
            {lang === 'fr' ? 'Source : calculs basés sur l\'étude MMM / Trinity. Votre situation actuelle est surlignée.' : lang === 'de' ? 'Quelle: Berechnungen basierend auf MMM / Trinity-Studie. Deine Situation ist hervorgehoben.' : 'Based on MMM / Trinity Study calculations. Your current rate is highlighted.'}
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
