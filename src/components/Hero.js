import Link from 'next/link';

export default function Hero({ dict, lang }) {
  const h = dict.hero;

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-gradient-to-br from-green-950 via-navy-950 to-navy-900 pt-20">

      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-[-8%] w-96 h-96 bg-green-500 rounded-full blur-3xl opacity-10 animate-pulse" />
        <div className="absolute bottom-10 right-[5%] w-80 h-80 bg-green-400 rounded-full blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '1.4s' }} />
        <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-emerald-600 rounded-full blur-3xl opacity-5 animate-pulse" style={{ animationDelay: '2.5s' }} />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(34,197,94,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.5) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Two-column layout */}
      <div className="relative w-full max-w-6xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT — text content */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-green-500/15 border border-green-500/30 rounded-full px-4 py-1.5 mb-8">
              <span className="text-sm text-green-300 font-medium">{h.badge}</span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-5xl md:text-6xl text-white leading-[1.08] mb-6">
              {h.title}
              <br />
              <span className="text-green-400 italic">{h.titleHighlight}</span>
            </h1>

            <p className="text-lg text-white/65 leading-relaxed mb-10 max-w-lg">
              {h.subtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-12">
              <Link
                href={`/${lang}/blog`}
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white font-semibold px-7 py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-green-500/25 hover:shadow-green-400/30 hover:-translate-y-0.5"
              >
                {h.ctaBlog} <span>→</span>
              </Link>
              <Link
                href={`/${lang}/tools`}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-7 py-3.5 rounded-xl transition-all duration-200 border border-white/20 hover:border-white/40 hover:-translate-y-0.5"
              >
                {h.ctaTools} <span>🧮</span>
              </Link>
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap gap-8 pt-4 border-t border-white/10">
              {[
                { value: '4', label: h.stat1, sub: h.stat1sub },
                { value: '3', label: h.stat2, sub: h.stat2sub },
                { value: '0%', label: h.stat3, sub: h.stat3sub },
              ].map((s, i) => (
                <div key={i} className="flex flex-col">
                  <span className="font-display text-3xl text-green-400 leading-none">{s.value}</span>
                  <span className="text-sm font-semibold text-white/85 mt-1">{s.label}</span>
                  <span className="text-xs text-white/35">{s.sub}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — floating cards stack */}
          <div className="hidden lg:flex flex-col gap-4 items-end">
            {[
              {
                emoji: '💰',
                text: 'Net Salary',
                value: '+€2,847/mo',
                color: 'from-green-500/25 to-green-700/15',
                border: 'border-green-500/25',
                offset: 'ml-8',
              },
              {
                emoji: '📈',
                text: 'Compound Growth',
                value: '7% × 20 yrs',
                color: 'from-blue-500/25 to-blue-700/15',
                border: 'border-blue-500/25',
                offset: 'ml-4',
              },
              {
                emoji: '🔥',
                text: 'FIRE Number',
                value: '€750,000',
                color: 'from-orange-500/25 to-orange-700/15',
                border: 'border-orange-500/25',
                offset: 'ml-12',
              },
              {
                emoji: '💡',
                text: 'Savings Rate',
                value: '28% — Good!',
                color: 'from-purple-500/25 to-purple-700/15',
                border: 'border-purple-500/25',
                offset: 'ml-2',
              },
            ].map((card, i) => (
              <div
                key={i}
                className={`${card.offset} w-56 bg-gradient-to-br ${card.color} border ${card.border} rounded-2xl px-5 py-4 backdrop-blur-sm`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-xl flex-shrink-0">
                    {card.emoji}
                  </div>
                  <div>
                    <p className="text-xs text-white/45 font-medium">{card.text}</p>
                    <p className="text-sm font-semibold text-white mt-0.5">{card.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
