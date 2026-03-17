import Link from 'next/link';

export default function Breadcrumb({ crumbs }) {
  // crumbs: [{ label, href? }] — last item has no href
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-navy-400 mb-8 flex-wrap">
      {crumbs.map((c, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <span className="text-navy-300">/</span>}
          {c.href ? (
            <Link href={c.href} className="hover:text-green-600 transition-colors">
              {c.label}
            </Link>
          ) : (
            <span className="text-navy-600 font-medium truncate max-w-[200px]">{c.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
