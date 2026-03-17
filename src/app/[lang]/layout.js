import { getDictionary, locales } from '@/i18n';
import { SITE_URL } from '@/lib/seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export function generateMetadata({ params }) {
  const { lang } = params;
  return {
    alternates: {
      canonical: `${SITE_URL}/${lang}`,
      languages: {
        en: `${SITE_URL}/en`,
        fr: `${SITE_URL}/fr`,
        de: `${SITE_URL}/de`,
        'x-default': `${SITE_URL}/en`,
      },
    },
  };
}

export default function LangLayout({ children, params }) {
  const dict = getDictionary(params.lang);
  return (
    <>
      <Navbar dict={dict} lang={params.lang} />
      <main className="flex-1">{children}</main>
      <Footer dict={dict} lang={params.lang} />
    </>
  );
}
