import type { Metadata } from 'next';
import { Navbar } from '@/components/public/Navbar';
import { Footer } from '@/components/public/Footer';
import { Section, SectionHeading } from '@/components/ui';
import { ContactForm } from '@/components/public/ContactForm';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Madhumithan P R for collaborations, internships, and opportunities.',
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <Section>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-5">
              <SectionHeading title="Let's talk." />
              <p className="text-secondary text-base leading-relaxed mb-8">
                I'm open to internships, full-time roles, freelance projects, and interesting collaborations. Reach out and I'll get back to you as soon as possible.
              </p>

              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded bg-surface-container border border-outline-variant flex items-center justify-center">
                    <svg className="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-secondary">Email</p>
                    <p className="text-sm font-medium text-on-surface">hello@madhumithan.dev</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded bg-surface-container border border-outline-variant flex items-center justify-center">
                    <svg className="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-secondary">Location</p>
                    <p className="text-sm font-medium text-on-surface">Chennai, Tamil Nadu, India</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-7">
              <div className="bg-surface border border-outline-variant rounded-lg p-6 md:p-8">
                <ContactForm />
              </div>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
