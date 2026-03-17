'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { getDictionary } from '@/i18n';
import { SITE_URL } from '@/lib/seo';

// Tax calculation logic per country (simplified but realistic)
function calculateNetSalary(gross, country, marital, children) {
  let socialContrib = 0;
  let incomeTax = 0;

  switch (country) {
    case 'FR': {
      // France — simplified URSSAF + IR
      const socialRate = 0.2282; // employee share
      socialContrib = gross * socialRate;
      const taxable = gross * 0.9; // 10% abatement
      const tranches = [
        { limit: 11294, rate: 0 },
        { limit: 28797, rate: 0.11 },
        { limit: 82341, rate: 0.30 },
        { limit: 177106, rate: 0.41 },
        { limit: Infinity, rate: 0.45 },
      ];
      let parts = marital === 'married' ? 2 + Math.min(children, 2) * 0.5 : 1 + Math.min(children, 1) * 0.5;
      let taxPerPart = 0;
      let prev = 0;
      for (const t of tranches) {
        const slice = Math.min(taxable / parts, t.limit) - prev;
        if (slice <= 0) break;
        taxPerPart += slice * t.rate;
        prev = t.limit;
      }
      incomeTax = taxPerPart * parts;
      // Family quotient cap
      incomeTax = Math.max(incomeTax, 0);
      break;
    }
    case 'BE': {
      // Belgium
      const socialRate = 0.1307;
      socialContrib = gross * socialRate;
      const taxable = gross - socialContrib;
      const tranches = [
        { limit: 15200, rate: 0.25 },
        { limit: 26830, rate: 0.40 },
        { limit: 46440, rate: 0.45 },
        { limit: Infinity, rate: 0.50 },
      ];
      let tax = 0; let prev = 0;
      for (const t of tranches) {
        const slice = Math.min(taxable, t.limit) - prev;
        if (slice <= 0) break;
        tax += slice * t.rate;
        prev = t.limit;
      }
      incomeTax = tax * 0.93; // communal tax reduction approx
      if (children > 0) incomeTax *= (1 - children * 0.03);
      if (marital === 'married') incomeTax *= 0.9;
      incomeTax = Math.max(incomeTax, 0);
      break;
    }
    case 'CH': {
      // Switzerland — simplified federal + cantonal avg
      socialContrib = gross * 0.065; // AHV/IV/EO/ALV employee
      const taxable = gross - socialContrib;
      // Federal + avg cantonal ≈ combined rate
      const tranches = [
        { limit: 17800, rate: 0 },
        { limit: 31600, rate: 0.077 },
        { limit: 41400, rate: 0.088 },
        { limit: 55200, rate: 0.11 },
        { limit: 72500, rate: 0.13 },
        { limit: 78100, rate: 0.132 },
        { limit: 103600, rate: 0.143 },
        { limit: 134600, rate: 0.15 },
        { limit: 176000, rate: 0.165 },
        { limit: Infinity, rate: 0.178 },
      ];
      let tax = 0; let prev = 0;
      for (const t of tranches) {
        const slice = Math.min(taxable, t.limit) - prev;
        if (slice <= 0) break;
        tax += slice * t.rate;
        prev = t.limit;
      }
      incomeTax = tax;
      if (marital === 'married') incomeTax *= 0.88;
      if (children > 0) incomeTax -= children * 251; // child deduction
      incomeTax = Math.max(incomeTax, 0);
      break;
    }
    case 'DE': {
      // Germany — Einkommensteuer + Sozialabgaben
      socialContrib = gross * 0.2005; // KV+PV+RV+ALV employee
      const taxable = gross - socialContrib;
      const basic = marital === 'married' ? 23208 : 11604;
      let tax = 0;
      if (taxable <= basic) {
        tax = 0;
      } else if (taxable <= (marital === 'married' ? 54058 : 17005)) {
        const z = (taxable - basic) / 10000;
        tax = (979.18 * z + 1400) * z;
        if (marital === 'married') tax *= 2;
      } else if (taxable <= (marital === 'married' ? 504104 : 252102)) {
        const z = (taxable - (marital === 'married' ? 27029 : 17005)) / 10000;
        tax = (192.59 * z + 2397) * z + (marital === 'married' ? 2397 : 1198);
        if (marital === 'married') tax *= 2;
      } else {
        tax = taxable * (marital === 'married' ? 0.42 : 0.42) - (marital === 'married' ? 9336 : 9972);
      }
      incomeTax = Math.max(tax * (1 + 0.055), 0); // +Soli
      incomeTax -= children * 2994; // Kindergeld equivalent
      incomeTax = Math.max(incomeTax, 0);
      break;
    }
    case 'UK': {
      // UK — National Insurance + Income Tax
      socialContrib = Math.max((gross - 12570) * 0.08 + Math.max(gross - 50270, 0) * 0.02, 0);
      const taxable = Math.max(gross - 12570, 0);
      const higher = Math.max(taxable - 37700, 0);
      const add = Math.max(taxable - 125140, 0);
      incomeTax = (taxable - higher - add) * 0.20 + higher * 0.40 + add * 0.45;
      if (marital === 'married') incomeTax -= 252; // marriage allowance
      incomeTax = Math.max(incomeTax, 0);
      break;
    }
    default:
      socialContrib = gross * 0.20;
      incomeTax = gross * 0.15;
  }

  const net = Math.round(gross - socialContrib - incomeTax);
  return {
    gross: Math.round(gross),
    socialContrib: Math.round(socialContrib),
    incomeTax: Math.round(incomeTax),
    net: Math.max(net, 0),
    effectiveRate: ((socialContrib + incomeTax) / gross * 100).toFixed(1),
    netMonthly: Math.round(Math.max(net, 0) / 12),
  };
}

const COUNTRIES = [
  { code: 'FR', flag: '🇫🇷', label: 'France', currency: '€' },
  { code: 'BE', flag: '🇧🇪', label: 'Belgium', currency: '€' },
  { code: 'CH', flag: '🇨🇭', label: 'Switzerland', currency: 'CHF' },
  { code: 'DE', flag: '🇩🇪', label: 'Germany', currency: '€' },
  { code: 'UK', flag: '🇬🇧', label: 'United Kingdom', currency: '£' },
];

function fmt(n, currency = '€') {
  return `${currency}${n.toLocaleString('fr-CH')}`;
}

export default function GrossToNetPage({ params }) {
  const lang = params.lang;
  const dict = getDictionary(lang);
  const t = dict.grossToNet;

  const [country, setCountry] = useState('FR');
  const [gross, setGross] = useState(50000);
  const [marital, setMarital] = useState('single');
  const [children, setChildren] = useState(0);
  const [calculated, setCalculated] = useState(false);

  const currency = COUNTRIES.find((c) => c.code === country)?.currency || '€';

  const result = useMemo(() => {
    if (!calculated) return null;
    return calculateNetSalary(gross, country, marital, children);
  }, [calculated, gross, country, marital, children]);

  const handleCalc = () => setCalculated(true);
  const handleReset = () => { setCalculated(false); setGross(50000); setMarital('single'); setChildren(0); };

  // % bars
  const socialPct = result ? Math.round(result.socialContrib / result.gross * 100) : 0;
  const taxPct = result ? Math.round(result.incomeTax / result.gross * 100) : 0;
  const netPct = result ? Math.round(result.net / result.gross * 100) : 0;

  // WebApplication structured data for SEO
  const toolSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: lang === 'fr' ? 'Calculateur Salaire Brut en Net' : lang === 'de' ? 'Brutto-Netto-Gehaltsrechner' : 'Gross to Net Salary Calculator',
    description: lang === 'fr' ? 'Calculateur gratuit du salaire brut en net pour la France, Belgique, Suisse, Allemagne et Royaume-Uni. Incluant impôts et cotisations sociales.' : lang === 'de' ? 'Kostenloser Brutto-Netto-Rechner für Deutschland, Frankreich, Belgien, Schweiz und UK. Mit Einkommensteuer und Sozialabgaben.' : 'Free gross to net salary calculator for France, Belgium, Switzerland, Germany, and UK. Calculate your take-home pay including income tax and social contributions.',
    url: `${SITE_URL}/${lang}/tools/gross-to-net`,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
    author: { '@type': 'Organization', name: 'Vie Claire', url: SITE_URL },
  };


  return (
    <>
      <section className="relative bg-gradient-to-br from-navy-950 to-navy-900 pt-28 pb-14 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-1/4 w-72 h-72 bg-green-500 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <span className="text-5xl mb-4 block">💸</span>
          <h1 className="font-display text-3xl md:text-4xl text-white mb-3">{t.title}</h1>
          <p className="text-white/60">{t.subtitle}</p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-navy-100 overflow-hidden">
          {/* Country selector */}
          <div className="p-6 border-b border-navy-100">
            <label className="block text-sm font-semibold text-navy-700 mb-3">{t.country}</label>
            <div className="grid grid-cols-5 gap-2">
              {COUNTRIES.map((c) => (
                <button
                  key={c.code}
                  onClick={() => { setCountry(c.code); setCalculated(false); }}
                  className={`flex flex-col items-center gap-1 py-3 px-2 rounded-xl border-2 transition-all ${
                    country === c.code
                      ? 'border-green-500 bg-green-50'
                      : 'border-navy-100 hover:border-green-300'
                  }`}
                >
                  <span className="text-2xl">{c.flag}</span>
                  <span className="text-xs font-medium text-navy-600">{c.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="p-6 grid sm:grid-cols-2 gap-6">
            {/* Gross salary */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-navy-700 mb-1">{t.grossSalary}</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-navy-400 font-semibold">{currency}</span>
                <input
                  type="number"
                  value={gross}
                  onChange={(e) => { setGross(Number(e.target.value)); setCalculated(false); }}
                  min={0}
                  step={1000}
                  className="w-full pl-8 pr-4 py-3 rounded-xl border-2 border-navy-200 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-100 text-navy-800 font-semibold text-lg transition-all"
                />
              </div>
              <input
                type="range"
                min={10000} max={300000} step={1000}
                value={gross}
                onChange={(e) => { setGross(Number(e.target.value)); setCalculated(false); }}
                className="w-full mt-3 accent-green-500"
              />
              <div className="flex justify-between text-xs text-navy-400 mt-1">
                <span>{currency}10k</span>
                <span>{currency}300k</span>
              </div>
            </div>

            {/* Marital status */}
            <div>
              <label className="block text-sm font-semibold text-navy-700 mb-1">{t.maritalStatus}</label>
              <div className="grid grid-cols-2 gap-2">
                {['single', 'married'].map((s) => (
                  <button
                    key={s}
                    onClick={() => { setMarital(s); setCalculated(false); }}
                    className={`py-2.5 rounded-xl border-2 text-sm font-medium transition-all ${
                      marital === s
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-navy-200 text-navy-600 hover:border-green-300'
                    }`}
                  >
                    {s === 'single' ? `👤 ${t.single}` : `👫 ${t.married}`}
                  </button>
                ))}
              </div>
            </div>

            {/* Children */}
            <div>
              <label className="block text-sm font-semibold text-navy-700 mb-1">{t.children}</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => { setChildren((c) => Math.max(0, c - 1)); setCalculated(false); }}
                  className="w-10 h-10 rounded-xl border-2 border-navy-200 text-navy-600 hover:border-green-400 flex items-center justify-center font-bold text-lg transition-all"
                >−</button>
                <span className="flex-1 text-center font-display text-2xl text-navy-800">
                  {children} {children === 1 ? '👶' : children >= 2 ? '👶👶' : ''}
                </span>
                <button
                  onClick={() => { setChildren((c) => Math.min(5, c + 1)); setCalculated(false); }}
                  className="w-10 h-10 rounded-xl border-2 border-navy-200 text-navy-600 hover:border-green-400 flex items-center justify-center font-bold text-lg transition-all"
                >+</button>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="px-6 pb-6 flex gap-3">
            <button
              onClick={handleCalc}
              className="flex-1 py-3 bg-green-500 hover:bg-green-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-green-500/20 hover:-translate-y-0.5 active:translate-y-0"
            >
              💸 {t.calculate}
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-3 border-2 border-navy-200 text-navy-500 hover:border-navy-300 rounded-xl transition-all text-sm"
            >
              {dict.tools.reset}
            </button>
          </div>
        </div>

        {/* Results */}
        {result && (
          <div className="mt-6 animate-fade-up">
            {/* Visual breakdown bar */}
            <div className="bg-white rounded-2xl shadow-sm border border-navy-100 p-6 mb-4">
              <h2 className="font-display text-xl text-navy-900 mb-4">
                {dict.tools.result}
              </h2>
              <div className="flex rounded-xl overflow-hidden h-10 mb-4">
                <div
                  className="bg-navy-700 flex items-center justify-center text-white text-xs font-semibold transition-all"
                  style={{ width: `${socialPct}%` }}
                  title="Social"
                >
                  {socialPct > 8 ? `${socialPct}%` : ''}
                </div>
                <div
                  className="bg-red-400 flex items-center justify-center text-white text-xs font-semibold transition-all"
                  style={{ width: `${taxPct}%` }}
                  title="Tax"
                >
                  {taxPct > 8 ? `${taxPct}%` : ''}
                </div>
                <div
                  className="bg-green-500 flex items-center justify-center text-white text-xs font-semibold transition-all"
                  style={{ width: `${netPct}%` }}
                  title="Net"
                >
                  {netPct > 8 ? `${netPct}%` : ''}
                </div>
              </div>
              <div className="flex flex-wrap gap-4 text-xs text-navy-500 mb-6">
                <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-navy-700" />{t.results.socialContrib}</div>
                <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-red-400" />{t.results.incomeTax}</div>
                <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-green-500" />{t.results.net}</div>
              </div>

              {/* Cards */}
              <div className="grid sm:grid-cols-3 gap-3">
                <div className="bg-navy-50 rounded-xl p-4">
                  <p className="text-xs text-navy-400 mb-1">{t.results.gross}</p>
                  <p className="font-display text-xl text-navy-800">{fmt(result.gross, currency)}</p>
                </div>
                <div className="bg-red-50 rounded-xl p-4">
                  <p className="text-xs text-red-400 mb-1">{t.results.socialContrib}</p>
                  <p className="font-display text-xl text-red-600">−{fmt(result.socialContrib, currency)}</p>
                </div>
                <div className="bg-orange-50 rounded-xl p-4">
                  <p className="text-xs text-orange-400 mb-1">{t.results.incomeTax}</p>
                  <p className="font-display text-xl text-orange-600">−{fmt(result.incomeTax, currency)}</p>
                </div>
              </div>
            </div>

            {/* Net salary hero */}
            <div className="bg-gradient-to-br from-green-600 to-green-500 rounded-2xl p-8 text-center text-white shadow-lg shadow-green-500/30">
              <p className="text-green-100/80 text-sm mb-1">{t.results.net}</p>
              <p className="font-display text-5xl mb-1">{fmt(result.net, currency)}</p>
              <p className="text-green-100/60 text-sm">{dict.tools.annual}</p>
              <div className="mt-4 pt-4 border-t border-white/20 flex justify-around">
                <div>
                  <p className="text-green-100/70 text-xs">{t.results.takeHomeMonthly}</p>
                  <p className="font-display text-2xl">{fmt(result.netMonthly, currency)}</p>
                </div>
                <div>
                  <p className="text-green-100/70 text-xs">{t.results.effectiveRate}</p>
                  <p className="font-display text-2xl">{result.effectiveRate}%</p>
                </div>
              </div>
            </div>

            <p className="text-xs text-navy-400 text-center mt-4 leading-relaxed">{t.disclaimer}</p>
          </div>
        )}

        <div className="mt-8 text-center">
          <Link href={`/${lang}/tools`} className="text-sm text-navy-400 hover:text-green-600 transition-colors">
            ← {lang === 'fr' ? 'Tous les outils' : lang === 'de' ? 'Alle Tools' : 'All tools'}
          </Link>
        </div>
      </div>
    </>
  );
}
