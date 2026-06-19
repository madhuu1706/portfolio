import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-7xl font-black text-outline-variant mb-6">404</p>
        <h1 className="text-xl font-bold text-on-surface mb-2">Page not found</h1>
        <p className="text-sm text-secondary mb-8">The page you're looking for doesn't exist or has been moved.</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-on-background text-surface text-sm font-semibold rounded hover:bg-secondary transition-colors"
        >
          Back to portfolio
        </Link>
      </div>
    </div>
  );
}
