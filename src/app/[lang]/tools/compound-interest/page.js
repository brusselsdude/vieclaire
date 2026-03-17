'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { getDictionary } from '@/i18n';
import { SITE_URL } from '@/lib/seo';

function calcCompound(initial, monthly, rate, years) {
  const r = rate / 100 / 12;
  const n = years * 12;
  let data = [];
  let balance = initial;
  let totalInvested = initial;

  for (let y = 1; y <= years; y++) {
    for (let m = 0; m < 12; m++) {
      balance = balance * (1 + r) + monthly;
      totalInvested += monthly;
    }
    data.push({
      year: y,
      balance: Math.round(balance),
      totalInvested: Math.round(totalInvested),
      interest: Math.round(balance - totalInvested),
    });
  }
  return data;
}

function fmtK(n) {
  if (n >= 1000000) return `€${(n / 1000000).toFixed(2)}M`;
  if (n >= 1000) return `€${(n / 1000).toFixed(0)}k`;
  return `€${n}`;
}

function fmt(n) {
  return `€${Math.round(n).toLocaleString('fr-CH')}`;
}

export default function CompoundInterestPage({ params }) {
  const lang = params.lang;
  const dict = getDictionary(lang);
  const t = dict.compoundInterest;

  const [initial, setInitial] = useState(10000);
  const [monthly, setMonthly] = useState(300);
  const [rate, setRate] = useState(7);
  const [years, setYears] = useState(25);

  const data = useMemo(() => calcCompound(initial, monthly, rate, years), [initial, monthly, rate, years]);
  const last = data[data.length - 1];
  const totalInvested = last?.totalInvested || 0;
  const finalAmount = last?.balance || 0;
  const interestEarned = last?.interest || 0;
  const multiplier = totalInvested > 0 ? (finalAmount / totalInvested).toFixed(1) : 1;

  // Chart bars
  const maxVal = finalAmount;
  const chartData = data.filter((_, i) => i % Math.max(1, Math.floor(years / 10)) === 0 || i === data.length - 1);

  // WebApplication structured data for SEO
  const toolSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: lang === 'fr' ? "Calculateur d'Intérêts Composés" : lang === 'de' ? 'Zinseszins-Rechner' : 'Compound Interest Calculator',
    description: lang === 'fr' ? "Calculateur gratuit d'intérêts composés. Visualisez la croissance de vos investissements sur le temps avec graphiques interactifs." : lang === 'de' ? 'Kostenloser Zinseszins-Rechner. Sehen Sie wie Ihre Investitionen über die Zeit wachsen mit interaktiven Diagrammen.' : 'Free compound interest calculator. See how your investments grow over time with interactive charts showing total invested vs interest earned.',
    url: `${SITE_URL}/${lang}/tools/compound-interest`,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
    author: { '@type': 'Organization', name: 'Vie Claire', url: SITE_URL },
  };


  return (
    <>
      <section className="relative bg-gradient-to-br from-navy-950 to-navy-900 pt-28 pb-14 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-1/4 w-72 h-72 bg-blue-500 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <span className="text-5xl mb-4 block">📈</span>
          <h1 className="font-display text-3xl md:text-4xl text-white mb-3">{t.title}</h1>
          <p className="text-white/60">{t.subtitle}</p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Controls */}
        <div className="bg-white rounded-2xl shadow-sm border border-navy-100 p-6 mb-6">
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { label: t.initialAmount, val: initial, set: setInitial, min: 0, max: 200000, step: 1000, prefix: '€' },
              { label: t.monthlyContrib, val: monthly, set: setMonthly, min: 0, max: 5000, step: 50, prefix: '€' },
              { label: t.annualRate, val: rate, set: setRate, min: 1, max: 20, step: 0.5, suffix: '%' },
              { label: t.years, val: years, set: setYears, min: 1, max: 50, step: 1, suffix: lang === 'fr' ? ' ans' : lang === 'de' ? ' J.' : ' yrs' },
            ].map((f) => (
              <div key={f.label}>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-sm font-semibold text-navy-700">{f.label}</label>
                  <span className="font-display text-lg text-green-600">
                    {f.prefix || ''}{f.val.toLocaleString()}{f.suffix || ''}
                  </span>
                </div>
                <input
                  type="range"
                  min={f.min} max={f.max} step={f.step}
                  value={f.val}
                  onChange={(e) => f.set(Number(e.target.value))}
                  className="w-full accent-green-500"
                />
                <div className="flex justify-between text-xs text-navy-400 mt-0.5">
                  <span>{f.prefix || ''}{f.min}{f.suffix || ''}</span>
                  <span>{f.prefix || ''}{f.max}{f.suffix || ''}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Results summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { label: t.results.finalAmount, value: fmt(finalAmount), color: 'text-green-600', bg: 'bg-green-50 border-green-100' },
            { label: t.results.totalInvested, value: fmt(totalInvested), color: 'text-navy-700', bg: 'bg-navy-50 border-navy-100' },
            { label: t.results.interestEarned, value: fmt(interestEarned), color: 'text-blue-600', bg: 'bg-blue-50 border-blue-100' },
            { label: t.results.multiplier, value: `×${multiplier}`, color: 'text-orange-600', bg: 'bg-orange-50 border-orange-100' },
          ].map((s) => (
            <div key={s.label} className={`${s.bg} border rounded-xl p-4 text-center`}>
              <p className="text-xs text-navy-400 mb-1">{s.label}</p>
              <p className={`font-display text-xl ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="bg-white rounded-2xl shadow-sm border border-navy-100 p-6">
          <h3 className="font-display text-lg text-navy-900 mb-6">
            {lang === 'fr' ? 'Évolution sur' : lang === 'de' ? 'Entwicklung über' : 'Growth over'} {years} {lang === 'fr' ? 'ans' : lang === 'de' ? 'Jahre' : 'years'}
          </h3>

          <div className="flex items-end gap-1.5 h-40 mb-2">
            {chartData.map((d) => {
              const totalH = Math.round((d.balance / maxVal) * 100);
              const investH = Math.round((d.totalInvested / maxVal) * 100);
              const interestH = totalH - investH;
              return (
                <div key={d.year} className="flex-1 flex flex-col items-center gap-0 relative group">
                  <div className="w-full flex flex-col-reverse" style={{ height: `${totalH}%` }}>
                    <div className="w-full bg-navy-200 rounded-b" style={{ height: `${(investH / totalH) * 100}%` }} />
                    <div className="w-full bg-green-400 rounded-t flex-1" />
                  </div>
                  {/* Tooltip */}
                  <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-navy-900 text-white text-xs rounded-lg px-2 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                    <p className="font-semibold">Y{d.year}: {fmtK(d.balance)}</p>
                    <p className="text-white/60">Invested: {fmtK(d.totalInvested)}</p>
                    <p className="text-green-300">Interest: {fmtK(d.interest)}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between text-xs text-navy-400">
            {chartData.map((d) => (
              <span key={d.year}>Y{d.year}</span>
            ))}
          </div>

          <div className="flex gap-4 mt-4 text-xs text-navy-500">
            <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-navy-200" />{t.results.totalInvested}</div>
            <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-green-400" />{t.results.interestEarned}</div>
          </div>
        </div>

        {/* Fun fact */}
        <div className="mt-6 bg-gold-50 border border-gold-200 rounded-2xl p-5">
          <p className="text-sm text-navy-700 leading-relaxed">
            <span className="font-semibold">💡 </span>
            {lang === 'fr'
              ? `En investissant ${fmt(monthly)}/mois pendant ${years} ans à ${rate}%, les intérêts représentent ${Math.round(interestEarned / finalAmount * 100)}% de votre capital final — soit ${fmt(interestEarned)} que vous n'avez jamais travaillé pour gagner. C'est ça, la magie des intérêts composés.`
              : lang === 'de'
              ? `Durch das Investieren von ${fmt(monthly)}/Monat über ${years} Jahre bei ${rate}% machen Zinsen ${Math.round(interestEarned / finalAmount * 100)}% deines Endkapitals aus — das sind ${fmt(interestEarned)}, für die du nie gearbeitet hast. Das ist die Magie des Zinseszinses.`
              : `By investing ${fmt(monthly)}/month for ${years} years at ${rate}%, interest makes up ${Math.round(interestEarned / finalAmount * 100)}% of your final amount — that's ${fmt(interestEarned)} you never worked a day to earn. That's compound interest.`}
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
