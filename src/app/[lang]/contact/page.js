'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getDictionary } from '@/i18n';
import Breadcrumb from '@/components/Breadcrumb';

const FORMSPREE_ID = 'xkoqpgja';

const copy = {
  en: {
    title: 'Contact Us',
    subtitle: "Got a question, a suggestion, or did you find a bug? We actually read every message. (Yes, really.)",
    name: 'Your Name',
    email: 'Your Email',
    subject: 'Subject',
    subjectOptions: [
      { value: '', label: 'What is this about?' },
      { value: 'general', label: '💬 General Question' },
      { value: 'content', label: '📝 Content Feedback' },
      { value: 'tool', label: '🧮 Tool Issue or Suggestion' },
      { value: 'partnership', label: '🤝 Partnership / Collaboration' },
      { value: 'correction', label: '✏️ Factual Correction' },
      { value: 'other', label: '📦 Something Else' },
    ],
    message: 'Your Message',
    messagePlaceholder: "Tell us what's on your mind. The more detail, the better — though 'your ETF calculator is broken' is also a perfectly valid message.",
    send: 'Send Message',
    sending: 'Sending…',
    successTitle: "Message Sent! 🎉",
    successText: "We'll get back to you within 1-3 business days. In the meantime, why not check out one of our tools?",
    successCta: 'Explore Tools',
    errorText: 'Something went wrong. Please try again or email us directly.',
    disclaimer: 'We respond to all messages personally. We do not sell your data, send newsletters without consent, or reply with AI-generated non-answers.',
    faqTitle: 'Quick Answers',
    faqs: [
      { q: 'Is the content on Vie Claire financial advice?', a: 'No. Everything on this site is for educational and informational purposes only. Always consult a qualified financial advisor for decisions specific to your situation.' },
      { q: 'Are the calculators accurate?', a: 'Our calculators use simplified models and real-world tax approximations. They provide estimates only and should not be used as the sole basis for financial decisions.' },
      { q: 'Can you add a tool or article topic?', a: "Absolutely — use the form with 'Tool Issue or Suggestion' and tell us what you'd find most useful." },
      { q: 'Do you accept guest posts or sponsored content?', a: 'We do not accept paid placements or sponsored articles. Editorial independence is non-negotiable.' },
    ],
  },
  fr: {
    title: 'Nous Contacter',
    subtitle: "Une question, une suggestion, ou avez-vous trouvé un bug ? Nous lisons vraiment chaque message. (Si, si.)",
    name: 'Votre Nom',
    email: 'Votre Email',
    subject: 'Sujet',
    subjectOptions: [
      { value: '', label: 'De quoi s\'agit-il ?' },
      { value: 'general', label: '💬 Question Générale' },
      { value: 'content', label: '📝 Retour sur le Contenu' },
      { value: 'tool', label: '🧮 Problème ou Suggestion d\'Outil' },
      { value: 'partnership', label: '🤝 Partenariat / Collaboration' },
      { value: 'correction', label: '✏️ Correction Factuelle' },
      { value: 'other', label: '📦 Autre Chose' },
    ],
    message: 'Votre Message',
    messagePlaceholder: "Dites-nous ce que vous avez en tête. Plus vous donnez de détails, mieux c'est.",
    send: 'Envoyer le Message',
    sending: 'Envoi en cours…',
    successTitle: 'Message Envoyé ! 🎉',
    successText: "Nous vous répondrons dans 1 à 3 jours ouvrables. En attendant, pourquoi ne pas essayer l'un de nos outils ?",
    successCta: 'Explorer les Outils',
    errorText: "Une erreur s'est produite. Veuillez réessayer.",
    disclaimer: 'Nous répondons à tous les messages personnellement. Nous ne vendons pas vos données et ne répondons pas avec des réponses génériques.',
    faqTitle: 'Réponses Rapides',
    faqs: [
      { q: 'Le contenu de Vie Claire est-il un conseil financier ?', a: 'Non. Tout le contenu de ce site est fourni à titre éducatif et informatif uniquement. Consultez toujours un conseiller financier qualifié.' },
      { q: 'Les calculateurs sont-ils précis ?', a: 'Nos calculateurs utilisent des modèles simplifiés et des approximations fiscales. Ils fournissent des estimations uniquement.' },
      { q: 'Puis-je suggérer un outil ou un sujet d\'article ?', a: 'Absolument — utilisez le formulaire avec "Suggestion d\'Outil" et dites-nous ce qui vous serait le plus utile.' },
      { q: 'Acceptez-vous des articles invités ou du contenu sponsorisé ?', a: 'Nous n\'acceptons pas de placements payants ou d\'articles sponsorisés. L\'indépendance éditoriale est non négociable.' },
    ],
  },
  de: {
    title: 'Kontakt',
    subtitle: "Eine Frage, ein Vorschlag oder hast du einen Fehler gefunden? Wir lesen wirklich jede Nachricht. (Ja, wirklich.)",
    name: 'Dein Name',
    email: 'Deine E-Mail',
    subject: 'Betreff',
    subjectOptions: [
      { value: '', label: 'Worum geht es?' },
      { value: 'general', label: '💬 Allgemeine Frage' },
      { value: 'content', label: '📝 Feedback zum Inhalt' },
      { value: 'tool', label: '🧮 Tool-Problem oder Vorschlag' },
      { value: 'partnership', label: '🤝 Partnerschaft / Zusammenarbeit' },
      { value: 'correction', label: '✏️ Sachliche Korrektur' },
      { value: 'other', label: '📦 Etwas anderes' },
    ],
    message: 'Deine Nachricht',
    messagePlaceholder: 'Erzähl uns, was du auf dem Herzen hast. Je mehr Details, desto besser.',
    send: 'Nachricht senden',
    sending: 'Wird gesendet…',
    successTitle: 'Nachricht gesendet! 🎉',
    successText: 'Wir melden uns innerhalb von 1–3 Werktagen. Probier in der Zwischenzeit einen unserer Rechner aus!',
    successCta: 'Tools erkunden',
    errorText: 'Etwas ist schief gelaufen. Bitte versuche es erneut.',
    disclaimer: 'Wir antworten auf alle Nachrichten persönlich. Wir verkaufen deine Daten nicht und antworten nicht mit KI-generierten Nicht-Antworten.',
    faqTitle: 'Schnelle Antworten',
    faqs: [
      { q: 'Ist der Inhalt auf Vie Claire eine Finanzberatung?', a: 'Nein. Alles auf dieser Website dient ausschließlich zu Bildungs- und Informationszwecken. Konsultiere immer einen qualifizierten Finanzberater.' },
      { q: 'Sind die Rechner genau?', a: 'Unsere Rechner verwenden vereinfachte Modelle und Näherungswerte. Sie liefern nur Schätzungen.' },
      { q: 'Kann ich ein Tool oder Artikelthema vorschlagen?', a: 'Absolut — nutze das Formular mit "Tool-Vorschlag" und sag uns, was dir am nützlichsten wäre.' },
      { q: 'Nehmt ihr Gastbeiträge oder gesponserte Inhalte an?', a: 'Wir akzeptieren keine bezahlten Platzierungen oder gesponserten Artikel. Redaktionelle Unabhängigkeit ist nicht verhandelbar.' },
    ],
  },
};

export default function ContactPage({ params }) {
  const lang = params.lang;
  const c = copy[lang] || copy.en;

  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const handleChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const breadcrumbs = [
    { label: 'Vie Claire', href: `/${lang}` },
    { label: c.title },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Vie Claire', item: `https://www.vieclaire.com/${lang}` },
            { '@type': 'ListItem', position: 2, name: c.title, item: `https://www.vieclaire.com/${lang}/contact` },
          ],
        }) }}
      />
            {/* Hero */}
      <section className="relative bg-gradient-to-br from-navy-950 via-navy-900 to-green-950 pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 right-20 w-80 h-80 bg-green-400 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-64 h-64 bg-green-600 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <div className="text-5xl mb-6">✉️</div>
          <h1 className="font-display text-4xl md:text-5xl text-white mb-4">{c.title}</h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto">{c.subtitle}</p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <Breadcrumb crumbs={breadcrumbs} />

        <div className="grid lg:grid-cols-5 gap-12">

          {/* ── Form ── */}
          <div className="lg:col-span-3">
            {status === 'success' ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center">
                <div className="text-5xl mb-4">🎉</div>
                <h2 className="font-display text-2xl text-green-800 mb-3">{c.successTitle}</h2>
                <p className="text-green-700 text-sm mb-6">{c.successText}</p>
                <Link
                  href={`/${lang}/tools`}
                  className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors"
                >
                  {c.successCta} →
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-navy-100 shadow-sm p-8 space-y-5">
                {/* Name + Email */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-navy-700 mb-1.5">{c.name} <span className="text-red-400">*</span></label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      className="w-full px-4 py-2.5 rounded-xl border-2 border-navy-200 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-100 text-navy-800 text-sm transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-navy-700 mb-1.5">{c.email} <span className="text-red-400">*</span></label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="jane@example.com"
                      className="w-full px-4 py-2.5 rounded-xl border-2 border-navy-200 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-100 text-navy-800 text-sm transition-all"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-semibold text-navy-700 mb-1.5">{c.subject} <span className="text-red-400">*</span></label>
                  <select
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-navy-200 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-100 text-navy-800 text-sm transition-all bg-white"
                  >
                    {c.subjectOptions.map((o) => (
                      <option key={o.value} value={o.value} disabled={o.value === ''}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold text-navy-700 mb-1.5">{c.message} <span className="text-red-400">*</span></label>
                  <textarea
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={c.messagePlaceholder}
                    className="w-full px-4 py-3 rounded-xl border-2 border-navy-200 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-100 text-navy-800 text-sm transition-all resize-none"
                  />
                </div>

                {/* Error */}
                {status === 'error' && (
                  <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-600">
                    {c.errorText}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full py-3 bg-green-500 hover:bg-green-400 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all shadow-lg shadow-green-500/20 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
                >
                  {status === 'sending' ? (
                    <>
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      {c.sending}
                    </>
                  ) : (
                    <>{c.send} ✉️</>
                  )}
                </button>

                <p className="text-xs text-navy-400 text-center leading-relaxed">{c.disclaimer}</p>
              </form>
            )}
          </div>

          {/* ── FAQ sidebar ── */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="font-display text-xl text-navy-900 mb-5">{c.faqTitle}</h2>
            {c.faqs.map((faq, i) => (
              <details key={i} className="group bg-white border border-navy-100 rounded-xl overflow-hidden">
                <summary className="flex items-start justify-between px-5 py-4 cursor-pointer font-semibold text-navy-800 text-sm list-none hover:text-green-700 transition-colors gap-3">
                  <span>{faq.q}</span>
                  <span className="text-green-500 text-lg group-open:rotate-45 transition-transform duration-200 flex-shrink-0 leading-none mt-0.5">+</span>
                </summary>
                <div className="px-5 pb-4 text-navy-500 text-sm leading-relaxed border-t border-navy-50 pt-3">
                  {faq.a}
                </div>
              </details>
            ))}

            {/* Legal note box */}
            <div className="mt-6 bg-gold-50 border border-gold-200 rounded-xl p-4">
              <p className="text-xs font-semibold text-gold-700 uppercase tracking-wide mb-2">⚖️ {lang === 'fr' ? 'Rappel Légal' : lang === 'de' ? 'Rechtlicher Hinweis' : 'Legal Reminder'}</p>
              <p className="text-xs text-navy-600 leading-relaxed">
                {lang === 'fr'
                  ? "Vie Claire ne fournit pas de conseil financier personnalisé. Nos contenus sont éducatifs. Pour toute décision financière importante, consultez un professionnel réglementé."
                  : lang === 'de'
                  ? "Vie Claire bietet keine persönliche Finanzberatung an. Unsere Inhalte sind pädagogisch. Für wichtige finanzielle Entscheidungen wenden Sie sich bitte an einen zugelassenen Fachmann."
                  : "Vie Claire does not provide personalised financial advice. Our content is educational. For important financial decisions, please consult a regulated professional."}
              </p>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
