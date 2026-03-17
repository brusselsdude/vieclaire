'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const languageNames = { en: 'EN', fr: 'FR', de: 'DE' };
const languageLabels = { en: 'English', fr: 'Français', de: 'Deutsch' };

const toolsLinks = (lang) => [
  { href: `/${lang}/tools/gross-to-net`, label: '💸 Gross → Net Calculator', desc: 'Find your real take-home pay', highlight: true },
  { href: `/${lang}/tools/compound-interest`, label: '📈 Compound Interest', desc: 'Watch your money snowball' },
  { href: `/${lang}/tools/fire-calculator`, label: '🔥 FIRE Calculator', desc: 'When can you stop working?' },
  { href: `/${lang}/tools/savings-rate`, label: '💰 Savings Rate', desc: 'The number that matters most' },
];

export default function Navbar({ dict, lang }) {
  const [isOpen, setIsOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const toolsRef = useRef(null);
  const langRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setToolsOpen(false);
    setLangOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handleClick(e) {
      if (toolsRef.current && !toolsRef.current.contains(e.target)) setToolsOpen(false);
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const learnLabel   = lang === 'fr' ? 'Apprendre' : lang === 'de' ? 'Lernen' : 'Learn';
  const contactLabel = lang === 'fr' ? 'Contact'   : lang === 'de' ? 'Kontakt' : 'Contact';
  const navLinks = [
    { href: `/${lang}`,                              label: dict.nav.home },
    { href: `/${lang}/blog`,                          label: dict.nav.blog },
    { href: `/${lang}/learn/financial-independence`,  label: learnLabel, matchPrefix: `/${lang}/learn` },
    { href: `/${lang}/about`,                         label: dict.nav.about },
    { href: `/${lang}/contact`,                       label: contactLabel },
  ];

  const isToolsActive = pathname.includes('/tools');
  const isLearnActive = pathname.includes('/learn');

  // Switch lang: replace /en/ with /fr/ etc.
  const switchLang = (newLang) => {
    return pathname.replace(/^\/[a-z]{2}/, `/${newLang}`);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-navy-950 transition-all duration-300 ${
        scrolled ? 'shadow-lg py-3' : 'py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          href={`/${lang}`}
          className="font-display text-2xl text-white tracking-wide hover:text-green-400 transition-colors"
        >
          Vie<span className="text-green-400">Claire</span>
          <span className="text-green-400">.</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.matchPrefix ? pathname.startsWith(link.matchPrefix) : 
               (link.href !== `/${lang}` && pathname.startsWith(link.href)));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-medium tracking-wide uppercase transition-colors ${
                  isActive ? 'text-green-400' : 'text-white/80 hover:text-white'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-green-400 rounded-full" />
                )}
              </Link>
            );
          })}

          {/* Tools dropdown */}
          <div className="relative" ref={toolsRef}>
            <button
              onClick={() => setToolsOpen(!toolsOpen)}
              className={`relative flex items-center gap-1.5 px-4 py-2 text-sm font-medium tracking-wide uppercase transition-colors ${
                isToolsActive ? 'text-green-400' : 'text-white/80 hover:text-white'
              }`}
            >
              {dict.nav.tools}
              <svg
                className={`w-3 h-3 transition-transform duration-200 ${toolsOpen ? 'rotate-180' : ''}`}
                fill="none" viewBox="0 0 10 6" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M1 1l4 4 4-4" />
              </svg>
              {isToolsActive && (
                <span className="absolute bottom-0 left-4 right-8 h-0.5 bg-green-400 rounded-full" />
              )}
            </button>

            {toolsOpen && (
              <div className="absolute top-full right-0 mt-2 w-64 bg-navy-950 border border-white/15 rounded-xl shadow-2xl overflow-hidden z-[9999]">
                <div className="px-4 py-2 border-b border-white/10">
                  <p className="text-xs font-medium text-white/40 uppercase tracking-widest">
                    Free Financial Tools
                  </p>
                </div>
                {toolsLinks(lang).map((t) => {
                  const active = pathname.startsWith(t.href);
                  return (
                    <Link
                      key={t.href}
                      href={t.href}
                      onClick={() => setToolsOpen(false)}
                      className={`flex flex-col px-4 py-3 transition-colors hover:bg-white/5 ${
                        active ? 'bg-green-600/20' : t.highlight ? 'bg-green-500/10 border-b border-white/5' : ''
                      }`}
                    >
                      <span className={`text-sm font-medium ${active ? 'text-green-400' : t.highlight ? 'text-green-300' : 'text-white/90'}`}>
                        {t.label}
                      </span>
                      <span className="text-xs text-white/40 mt-0.5">{t.desc}</span>
                    </Link>
                  );
                })}
                <div className="px-4 py-2 border-t border-white/10">
                  <Link
                    href={`/${lang}/tools`}
                    onClick={() => setToolsOpen(false)}
                    className="text-xs text-white/40 hover:text-green-400 transition-colors"
                  >
                    {dict.home.viewAll}
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Language switcher */}
          <div className="relative ml-2" ref={langRef}>
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white/70 hover:text-white border border-white/20 hover:border-white/40 rounded-lg transition-all"
            >
              🌐 {languageNames[lang]}
              <svg
                className={`w-3 h-3 transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`}
                fill="none" viewBox="0 0 10 6" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M1 1l4 4 4-4" />
              </svg>
            </button>

            {langOpen && (
              <div className="absolute top-full right-0 mt-2 w-36 bg-navy-950 border border-white/15 rounded-xl shadow-2xl overflow-hidden z-[9999]">
                {Object.entries(languageLabels).map(([code, label]) => (
                  <Link
                    key={code}
                    href={switchLang(code)}
                    onClick={() => setLangOpen(false)}
                    className={`flex items-center gap-2 px-4 py-2.5 text-sm transition-colors hover:bg-white/5 ${
                      code === lang ? 'text-green-400 font-medium' : 'text-white/80'
                    }`}
                  >
                    {code === lang && <span className="w-1 h-1 rounded-full bg-green-400" />}
                    {code !== lang && <span className="w-1 h-1" />}
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white p-2"
          aria-label="Toggle menu"
        >
          <div className="w-6 flex flex-col gap-1.5">
            <span className={`block h-0.5 bg-white transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-0.5 bg-white transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 bg-white transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-6 py-4 bg-navy-950 border-t border-white/10">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== `/${lang}` && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`block py-3 text-sm font-medium tracking-wide uppercase transition-colors ${
                  isActive ? 'text-green-400' : 'text-white/80 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="border-t border-white/10 mt-2 pt-3">
            <p className="text-xs font-medium text-white/30 uppercase tracking-widest mb-2">Tools</p>
            {toolsLinks(lang).map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="block py-2.5 text-sm font-medium text-white/80 hover:text-green-400 transition-colors"
              >
                {t.label}
              </Link>
            ))}
          </div>
          <div className="border-t border-white/10 mt-2 pt-3">
            <p className="text-xs font-medium text-white/30 uppercase tracking-widest mb-2">Language</p>
            {Object.entries(languageLabels).map(([code, label]) => (
              <Link
                key={code}
                href={switchLang(code)}
                className={`block py-2 text-sm ${code === lang ? 'text-green-400 font-medium' : 'text-white/60'}`}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
