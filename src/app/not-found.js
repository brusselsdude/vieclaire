import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-warm-50 flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="text-8xl mb-6">💸</div>
        <h1 className="font-display text-4xl text-navy-900 mb-3">404</h1>
        <p className="text-navy-500 mb-2 text-lg">This page doesn&apos;t exist.</p>
        <p className="text-navy-400 text-sm mb-8">
          Like a pension plan based on lottery tickets — nowhere to be found.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href="/en"
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white font-semibold px-6 py-3 rounded-xl transition-all"
          >
            ← English Home
          </Link>
          <Link
            href="/en/blog"
            className="inline-flex items-center gap-2 bg-white border border-navy-200 hover:border-green-300 text-navy-800 font-semibold px-6 py-3 rounded-xl transition-all"
          >
            Browse Articles
          </Link>
        </div>
      </div>
    </div>
  );
}
