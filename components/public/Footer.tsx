import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-surface border-t border-outline-variant py-10">
      <div className="px-4 md:px-6 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="text-xl font-bold text-primary mb-1">M</p>
          <p className="text-sm text-secondary">© {new Date().getFullYear()} Madhumithan P R. All rights reserved.</p>
          <p className="text-xs text-secondary mt-1">Open to internships and full-time opportunities.</p>
        </div>
        <div className="flex gap-6">
          <Link href="/contact" className="text-sm text-secondary hover:text-primary transition-colors">
            Email
          </Link>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-secondary hover:text-primary transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-secondary hover:text-primary transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
