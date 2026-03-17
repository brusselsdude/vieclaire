# Vie Claire — Personal Finance Website

**vieclaire.com** — Master your money, master your life. 💸

A modern, multilingual personal finance website built with Next.js 14, Tailwind CSS, and a lot of dark humour about money.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — it will redirect to `/en`.

## Project Structure

```
src/
├── app/
│   ├── [lang]/              # Multilingual routing (en, fr, de)
│   │   ├── page.js          # Homepage with hero, tools strip, blog listing
│   │   ├── blog/
│   │   │   ├── page.js      # Blog listing with category filter & search
│   │   │   └── [slug]/      # Individual post pages
│   │   ├── tools/
│   │   │   ├── page.js      # Tools index
│   │   │   ├── gross-to-net/     # 💸 Gross→Net calculator (FR/BE/CH/DE/UK)
│   │   │   ├── compound-interest/ # 📈 Compound interest with chart
│   │   │   ├── fire-calculator/  # 🔥 FIRE number & years to retire
│   │   │   └── savings-rate/     # 💰 Savings rate with FI table
│   │   └── about/           # About page in 3 languages
│   ├── layout.js            # Root layout
│   └── page.js              # Redirects to /en
├── components/
│   ├── Navbar.js            # Fixed navbar with language switcher + tools dropdown
│   ├── Footer.js            # Multilingual footer
│   ├── Hero.js              # Full-screen hero section
│   └── BlogCard.js          # Blog post card
├── data/
│   └── posts.js             # 8 sample posts in EN, FR, DE
└── i18n/
    └── index.js             # Full translations: EN, FR, DE
```

## Features

- **Multilingual**: English 🇬🇧 · French 🇫🇷 · German 🇩🇪
- **Language switcher** in navbar, URL-based (`/en`, `/fr`, `/de`)
- **4 Financial Tools** — all interactive, no backend required:
  - Gross to Net (5 countries: FR, BE, CH, DE, UK)
  - Compound Interest Calculator with visual chart
  - FIRE Number Calculator with progress tracker
  - Savings Rate Calculator with years-to-FI table
- **Blog** with sample posts, category filters, search
- **Funny** — actually readable financial content
- Green money theme 💚, dark navbar, warm background
- Responsive & mobile-first

## Adding Content

### New blog post
Add an entry to `src/data/posts.js`:
```js
{
  slug: 'my-slug',
  lang: 'en',   // en | fr | de
  title: 'Title',
  description: 'Short description',
  category: 'Budgeting',
  date: '2024-03-20',
  readTime: 6,
  emoji: '💡',
  content: `<p>HTML content here...</p>`,
}
```

### New language
1. Add to `src/i18n/index.js`
2. Add to `locales` array
3. Blog posts with that `lang` value will appear automatically

## Tech Stack

- **Next.js 14** (App Router)
- **Tailwind CSS** with custom navy + green + gold palette
- **DM Serif Display** + **Source Sans 3** fonts (Google Fonts)
- Zero external dependencies beyond Next.js

## Deployment

Works with Vercel (recommended), Netlify, or any Node.js host.

```bash
npm run build
npm start
```

For static export, add `output: 'export'` to `next.config.js`.

---
*Vie Claire — "The Clear Life" in French. Because your bank account shouldn't be a mystery.*
