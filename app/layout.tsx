import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: {
    default: 'Madhumithan P R — Program Operations & AI Workflow Systems',
    template: '%s | Madhumithan P R',
  },
  description:
    'Portfolio of Madhumithan P R — Program Operations, Learner Success, Product Ops, and AI Workflow Systems specialist based in Chennai, India.',
  keywords: ['Product Operations', 'AI Workflows', 'Automation', 'Program Management', 'Content Strategy'],
  authors: [{ name: 'Madhumithan P R' }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://madhumithan.dev',
    siteName: 'Madhumithan P R',
    title: 'Madhumithan P R — Program Operations & AI Workflow Systems',
    description: 'Building robust operational systems, streamlining workflows, and ensuring seamless product execution.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Madhumithan P R — Program Operations & AI Workflow Systems',
    description: 'Building robust operational systems and AI workflow automation.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-background text-on-background`}>
        {children}
      </body>
    </html>
  );
}
