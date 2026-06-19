'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { cn } from '@/utils/cn';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Experience', href: '/experience' },
  { label: 'Workflows', href: '/workflows' },
  { label: 'Contact', href: '/contact' },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-surface/90 backdrop-blur-sm border-b border-outline-variant">
      <div className="flex items-center justify-between px-4 md:px-6 max-w-6xl mx-auto h-16">
        <Link href="/" className="text-xl font-bold text-primary tracking-tight">M</Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'px-4 py-2 text-xs font-semibold tracking-widest uppercase transition-colors rounded',
                pathname === link.href
                  ? 'text-primary'
                  : 'text-secondary hover:text-on-surface'
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/resume"
            className="ml-4 px-4 py-2 bg-on-background text-surface text-xs font-semibold tracking-widest uppercase rounded hover:bg-secondary transition-colors"
          >
            Resume
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-secondary"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-outline-variant bg-surface py-4 px-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                'px-4 py-3 text-sm font-semibold rounded transition-colors',
                pathname === link.href
                  ? 'text-primary bg-surface-container'
                  : 'text-secondary hover:text-on-surface hover:bg-surface-container'
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/resume"
            onClick={() => setMobileOpen(false)}
            className="mt-2 px-4 py-3 bg-on-background text-surface text-sm font-semibold rounded text-center"
          >
            Resume
          </Link>
        </div>
      )}
    </header>
  );
}
