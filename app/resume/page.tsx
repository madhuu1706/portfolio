import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Navbar } from '@/components/public/Navbar';
import { Footer } from '@/components/public/Footer';
import { getActiveResume } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Resume',
};

export const revalidate = 60;

export default async function ResumePage() {
  const resume = await getActiveResume();

  if (resume) {
    redirect(resume.public_url);
  }

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center px-4">
          <div className="w-14 h-14 rounded-full bg-surface-container border border-outline-variant flex items-center justify-center mx-auto mb-5">
            <svg className="w-7 h-7 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-on-background mb-2">Resume not available yet</h1>
          <p className="text-sm text-secondary mb-6">A PDF resume hasn't been uploaded yet. Check back soon or reach out directly.</p>
          <a href="/contact" className="text-sm font-semibold text-primary hover:text-surface-tint transition-colors">
            Contact me instead →
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
